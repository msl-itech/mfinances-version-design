// Helper unique côté site — inscrit un lead dans une séquence email.
// Ne connaît PAS le moteur (Supabase ou Odoo). La factory serveur choisit.
// Non-bloquant : les échecs sont loggés, jamais propagés à l'UI.

import { supabase } from '@/integrations/supabase/client'

export type SequenceCode = 'A' | 'B' | 'C' | 'D'

export interface EnrollSequenceInput {
  firstName: string
  email: string
  sequence: SequenceCode
  /** HTML enrichi du résultat de l'outil (facultatif). Injecté dans l'email J0. */
  resultHtml?: string
}

/**
 * Inscrit un lead dans une séquence email (5 emails J0 → J+30).
 * Aucun await bloquant côté UI recommandé : appeler en fire-and-forget
 * juste après la génération du résultat.
 */
export async function enrollSequence(input: EnrollSequenceInput): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('enroll-sequence', {
      body: input,
    })
    if (error) {
      console.warn('[enrollSequence] error', error)
    }
  } catch (err) {
    console.warn('[enrollSequence] exception', err)
  }
}
