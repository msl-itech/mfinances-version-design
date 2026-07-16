// Edge function `process-sequence-queue` — worker cron (toutes les 15 min).
// Lit les inscriptions actives dont next_send_at est passé, envoie l'étape courante
// via l'infra Cloud existante `send-transactional-email`, avance le compteur,
// recalcule next_send_at (J+2/7/14/30) ou marque `completed` après l'étape 5.

import { createClient } from 'npm:@supabase/supabase-js@2'
import {
  STEP_DELAYS_DAYS,
  TOTAL_STEPS,
  templateNameFor,
} from '../_shared/sequence-engine/sequence-plan.ts'
import type { SequenceCode } from '../_shared/sequence-engine/types.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const url = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(url, serviceKey)

  // Récupère jusqu'à 100 inscriptions dues.
  const nowIso = new Date().toISOString()
  const { data: due, error } = await supabase
    .from('sequence_enrollments')
    .select('*')
    .eq('status', 'active')
    .lte('next_send_at', nowIso)
    .order('next_send_at', { ascending: true })
    .limit(100)

  if (error) {
    console.error('sequence queue read failed', error)
    return json({ error: error.message }, 500)
  }

  let processed = 0
  const errors: unknown[] = []

  for (const row of due ?? []) {
    const nextStep = row.current_step + 1 // 1..5
    if (nextStep > TOTAL_STEPS) {
      await supabase
        .from('sequence_enrollments')
        .update({ status: 'completed' })
        .eq('id', row.id)
      continue
    }

    const templateName = templateNameFor(row.sequence as SequenceCode, nextStep)
    const idempotencyKey = `seq-${row.id}-step-${nextStep}`

    try {
      const { error: sendErr } = await supabase.functions.invoke(
        'send-transactional-email',
        {
          body: {
            templateName,
            recipientEmail: row.email,
            idempotencyKey,
            templateData: {
              firstName: row.first_name ?? '',
              resultHtml: row.result_html ?? '',
            },
          },
        }
      )
      if (sendErr) throw sendErr

      const enrolledAt = new Date(row.enrolled_at)
      const nextIdx = nextStep // index dans STEP_DELAYS_DAYS pour l'étape SUIVANTE
      let updates: Record<string, unknown> = {
        current_step: nextStep,
        last_sent_at: new Date().toISOString(),
      }

      if (nextStep >= TOTAL_STEPS) {
        updates.status = 'completed'
      } else {
        const next = new Date(enrolledAt)
        next.setUTCDate(next.getUTCDate() + STEP_DELAYS_DAYS[nextIdx])
        updates.next_send_at = next.toISOString()
      }

      await supabase.from('sequence_enrollments').update(updates).eq('id', row.id)
      processed++
    } catch (e) {
      console.error('sequence step send failed', {
        enrollmentId: row.id,
        step: nextStep,
        err: e,
      })
      errors.push({ id: row.id, step: nextStep, error: String(e) })
    }
  }

  return json({ processed, errors, checked: due?.length ?? 0 }, 200)

  function json(payload: unknown, status: number) {
    return new Response(JSON.stringify(payload), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
