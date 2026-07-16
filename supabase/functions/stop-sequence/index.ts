// Edge function `stop-sequence` — coupe toutes les séquences actives d'un email.
// Appelée par le webhook Odoo Appointment (RDV pris) ou par un déclencheur manuel.
//
// Simple protection: header `x-stop-secret` vérifié contre le secret SEQUENCE_STOP_SECRET.

import { getEmailEngine } from '../_shared/sequence-engine/factory.ts'
import type { StopReason } from '../_shared/sequence-engine/types.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-stop-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const VALID_REASONS: StopReason[] = ['booking', 'reply', 'manual']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const secret = Deno.env.get('SEQUENCE_STOP_SECRET')
  if (secret) {
    const provided = req.headers.get('x-stop-secret')
    if (provided !== secret) {
      return json({ error: 'unauthorized' }, 401)
    }
  }

  try {
    const body = await req.json().catch(() => ({}))
    const email = String(body.email ?? '').trim().toLowerCase()
    const reason = String(body.reason ?? 'manual').toLowerCase() as StopReason

    if (!email) return json({ error: 'email requis' }, 400)
    if (!VALID_REASONS.includes(reason)) return json({ error: 'reason invalide' }, 400)

    const engine = getEmailEngine()
    const result = await engine.stop({ email, reason })
    return json({ ok: true, ...result }, 200)
  } catch (err) {
    console.error('stop-sequence error', err)
    return json({ error: err instanceof Error ? err.message : String(err) }, 500)
  }

  function json(payload: unknown, status: number) {
    return new Response(JSON.stringify(payload), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
