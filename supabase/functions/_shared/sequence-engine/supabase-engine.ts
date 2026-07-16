// SupabaseEngine — insère dans sequence_enrollments. Le cron
// `process-sequence-queue` lit ensuite les lignes actives et envoie
// les emails via l'infra Cloud existante (send-transactional-email).

import { createClient } from 'npm:@supabase/supabase-js@2'
import type { EmailEngine, EnrollInput, StopInput } from './types.ts'

export class SupabaseEngine implements EmailEngine {
  private client
  constructor(url: string, serviceKey: string) {
    this.client = createClient(url, serviceKey)
  }

  async enroll({ firstName, email, sequence, resultHtml }: EnrollInput) {
    const normalized = email.toLowerCase().trim()

    // Anti-doublon: si une inscription active existe déjà pour ce couple
    // (email, sequence), on ne fait rien (les CTA croisés peuvent renvoyer
    // le même prospect plusieurs fois sur la même séquence).
    const { data: existing } = await this.client
      .from('sequence_enrollments')
      .select('id')
      .eq('email', normalized)
      .eq('sequence', sequence)
      .eq('status', 'active')
      .maybeSingle()

    if (existing) {
      return { enrolled: false, reason: 'already_active' }
    }

    const { error } = await this.client.from('sequence_enrollments').insert({
      email: normalized,
      first_name: firstName,
      sequence,
      result_html: resultHtml ?? null,
      status: 'active',
      current_step: 0,
      next_send_at: new Date().toISOString(), // J0 = immédiat
    })

    if (error) {
      // 23505 = doublon (course entre 2 inscriptions parallèles) — bénin
      if ((error as any).code === '23505') {
        return { enrolled: false, reason: 'already_active' }
      }
      throw error
    }

    return { enrolled: true }
  }

  async stop({ email, reason }: StopInput) {
    const normalized = email.toLowerCase().trim()
    const { data, error } = await this.client
      .from('sequence_enrollments')
      .update({ status: 'stopped', stop_reason: reason })
      .eq('email', normalized)
      .eq('status', 'active')
      .select('id')
    if (error) throw error
    return { stopped: data?.length ?? 0 }
  }
}
