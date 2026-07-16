// Edge function `enroll-sequence` — point d'entrée unique appelé par les 4 outils.
// Passe par la factory Strategy pattern → Supabase ou Odoo selon EMAIL_ENGINE.
//
// Auth: verify_jwt=false via config.toml. Endpoint public, valide juste l'input.

import { getEmailEngine } from '../_shared/sequence-engine/factory.ts'
import type { SequenceCode } from '../_shared/sequence-engine/types.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const VALID_SEQUENCES: SequenceCode[] = ['A', 'B', 'C', 'D']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const body = await req.json().catch(() => ({}))
    const firstName = String(body.firstName ?? '').trim().slice(0, 120)
    const email = String(body.email ?? '').trim().toLowerCase()
    const sequence = String(body.sequence ?? '').toUpperCase() as SequenceCode
    const resultHtml = body.resultHtml ? String(body.resultHtml).slice(0, 8000) : undefined

    if (!EMAIL_RE.test(email)) {
      return json({ error: 'email invalide' }, 400)
    }
    if (!VALID_SEQUENCES.includes(sequence)) {
      return json({ error: 'sequence invalide (A|B|C|D)' }, 400)
    }
    if (firstName.length === 0) {
      return json({ error: 'firstName requis' }, 400)
    }

    const engine = getEmailEngine()
    const result = await engine.enroll({ firstName, email, sequence, resultHtml })
    return json({ ok: true, ...result }, 200)
  } catch (err) {
    console.error('enroll-sequence error', err)
    return json({ error: err instanceof Error ? err.message : String(err) }, 500)
  }

  function json(payload: unknown, status: number) {
    return new Response(JSON.stringify(payload), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
