// submit-lead : relais protégé vers le connecteur Odoo.
// La clé Odoo reste côté serveur. Origine du site exigée + limite de débit.
// Un laissez-passer reCAPTCHA (humanPass) est vérifié lorsqu'il est fourni.

import { clientIp, corsFor, isAllowedOrigin, rateLimited, verifyHumanPass } from '../_shared/site-guard.ts'

const ODOO_API_URL = Deno.env.get('ODOO_API_URL') ?? 'https://api-connect-odoo.vercel.app/api'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Deno.serve(async (req) => {
  const cors = corsFor(req)
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  const json = (p: unknown, s: number) =>
    new Response(JSON.stringify(p), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } })

  if (req.method !== 'POST') return json({ error: 'method' }, 405)
  if (!isAllowedOrigin(req.headers.get('origin'))) return json({ error: 'origine non autorisée' }, 403)
  if (rateLimited(`lead:${clientIp(req)}`, 10, 10 * 60 * 1000)) return json({ error: 'trop de demandes' }, 429)

  const signature = Deno.env.get('ODOO_API_SIGNATURE')
  if (!signature) return json({ error: 'configuration manquante' }, 500)

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'corps invalide' }, 400)
  }

  const { action, humanPass, leadId, data } = body as {
    action?: string; humanPass?: unknown; leadId?: unknown; data?: Record<string, unknown>
  }
  if (!data || typeof data !== 'object') return json({ error: 'data requis' }, 400)
  if (JSON.stringify(data).length > 20000) return json({ error: 'trop volumineux' }, 400)
  if (humanPass !== undefined && !(await verifyHumanPass(humanPass))) {
    return json({ error: 'vérification anti-robot expirée' }, 403)
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-signature': signature,
    'x-client-id': Deno.env.get('ODOO_API_CLIENT_ID') ?? 'client_mfinances',
    'x-company-id': Deno.env.get('ODOO_API_COMPANY_ID') ?? '3',
  }

  let url = `${ODOO_API_URL}/leads`
  let method = 'POST'
  if (action === 'update') {
    if (!Number.isInteger(leadId) || (leadId as number) <= 0) return json({ error: 'leadId invalide' }, 400)
    url = `${ODOO_API_URL}/leads/${leadId}`
    method = 'PUT'
  } else {
    if (!EMAIL_RE.test(String(data.email_from ?? ''))) return json({ error: 'email invalide' }, 400)
    if (!String(data.name ?? '').trim()) return json({ error: 'name requis' }, 400)
  }

  try {
    const res = await fetch(url, { method, headers, body: JSON.stringify(data) })
    const text = await res.text()
    if (!res.ok) {
      console.error('Odoo error', res.status, text.slice(0, 500))
      return json({ error: 'odoo', status: res.status }, 502)
    }
    let leadIdOut: number | undefined
    try { leadIdOut = JSON.parse(text).lead_id } catch { /* vide */ }
    return json({ ok: true, lead_id: leadIdOut }, 200)
  } catch (err) {
    console.error('submit-lead exception', err)
    return json({ error: 'réseau' }, 502)
  }
})
