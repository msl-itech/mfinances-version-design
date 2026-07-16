// OdooEngine — envoie le lead à l'API api-connect-odoo avec un tag CRM
// nommé `seq_diagnostic_tresorerie`, `seq_generateur_bail`, etc.
// L'API résout le nom → ID Odoo (crée le tag s'il n'existe pas).
// Les campagnes Marketing Automation filtrent sur ces tags côté Odoo.
//
// Activation : EMAIL_ENGINE=odoo dans les secrets Supabase.

import type { EmailEngine, EnrollInput, StopInput } from './types.ts'

const ODOO_API_URL = Deno.env.get('ODOO_API_URL') ?? 'https://api-connect-odoo.vercel.app/api'
const ODOO_HEADERS = {
  'Content-Type': 'application/json',
  'x-signature': Deno.env.get('ODOO_API_SIGNATURE') ?? '',
  'x-client-id': Deno.env.get('ODOO_API_CLIENT_ID') ?? 'client_mfinances',
  'x-company-id': Deno.env.get('ODOO_API_COMPANY_ID') ?? '3',
}

// Mapping code séquence → nom du tag CRM dans Odoo
const SEQUENCE_TAG_NAMES: Record<string, string> = {
  A: 'seq_diagnostic_tresorerie',
  B: 'seq_generateur_bail',
  C: 'seq_calculateur_bureau',
  D: 'seq_checklist_fiscale',
}

export class OdooEngine implements EmailEngine {
  async enroll({ firstName, email, sequence, resultHtml }: EnrollInput) {
    const tagName = SEQUENCE_TAG_NAMES[sequence]
    if (!tagName) {
      throw new Error(`Séquence inconnue: ${sequence}`)
    }

    const res = await fetch(`${ODOO_API_URL}/leads`, {
      method: 'POST',
      headers: ODOO_HEADERS,
      body: JSON.stringify({
        name: `[Tunnel] ${firstName} — ${tagName}`,
        first_name: firstName,
        email_from: email,
        description: resultHtml
          ? `<div><h3>Résultat outil</h3>${resultHtml}</div>`
          : `[Tunnel de vente] Séquence ${sequence}`,
        tag_names: [tagName],
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Odoo enroll failed: ${res.status} ${body}`)
    }

    return { enrolled: true }
  }

  async stop({ email, reason }: StopInput) {
    // Géré côté Odoo Marketing Automation via conditions d'arrêt.
    // Pas d'action côté API pour l'instant.
    console.log('[OdooEngine] stop — géré côté Odoo MA', { email, reason })
    return { stopped: 0 }
  }
}
