// OdooEngine — stub prêt pour bascule. Envoie le lead à l'API Odoo
// avec un tag `seq_A|B|C|D`. Les campagnes Odoo Marketing Automation
// filtrent sur ces tags et gèrent J0..J+30 côté Odoo.
//
// Non actif par défaut : requiert EMAIL_ENGINE=odoo et la création
// des 4 campagnes côté Odoo avant activation.

import type { EmailEngine, EnrollInput, StopInput } from './types.ts'

const ODOO_API_URL = 'https://api-connect-odoo.vercel.app/api'
const ODOO_HEADERS = {
  'Content-Type': 'application/json',
  'x-signature': '746b22e105d43521fc87e9ebc40fa1f88524855a7b54a311c4c3a37bcfec886a',
  'x-client-id': 'client_mfinances',
  'x-company-id': '3',
}

export class OdooEngine implements EmailEngine {
  async enroll({ firstName, email, sequence, resultHtml }: EnrollInput) {
    const res = await fetch(`${ODOO_API_URL}/leads`, {
      method: 'POST',
      headers: ODOO_HEADERS,
      body: JSON.stringify({
        name: firstName,
        email_from: email,
        description: `[SEQ:${sequence}]\n${resultHtml ?? ''}`,
        tags: [`seq_${sequence}`],
      }),
    })
    if (!res.ok) {
      throw new Error(`Odoo enroll failed: ${res.status} ${await res.text()}`)
    }
    return { enrolled: true }
  }

  async stop({ email, reason }: StopInput) {
    // À implémenter côté Odoo : POST /leads/mark_stopped avec { email, reason }.
    // Placeholder tant que l'endpoint n'existe pas côté API Odoo.
    console.log('OdooEngine.stop noop', { email, reason })
    return { stopped: 0 }
  }
}
