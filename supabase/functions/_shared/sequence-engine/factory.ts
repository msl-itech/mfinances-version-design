// Factory — seul endroit qui connait les deux implémentations.
// Basculer d'un moteur à l'autre = changer le secret EMAIL_ENGINE.

import type { EmailEngine } from './types.ts'
import { SupabaseEngine } from './supabase-engine.ts'
import { OdooEngine } from './odoo-engine.ts'

export function getEmailEngine(): EmailEngine {
  const engine = (Deno.env.get('EMAIL_ENGINE') ?? 'supabase').toLowerCase()
  if (engine === 'odoo') return new OdooEngine()
  const url = Deno.env.get('SUPABASE_URL')!
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  return new SupabaseEngine(url, key)
}
