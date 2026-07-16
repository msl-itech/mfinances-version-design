// Planning des 5 étapes de chaque séquence : J0, J+2, J+7, J+14, J+30.
// Utilisé par le cron pour calculer next_send_at, et par le worker pour
// choisir quel template envoyer.

import type { SequenceCode } from './types.ts'

export const STEP_DELAYS_DAYS = [0, 2, 7, 14, 30] as const
export const TOTAL_STEPS = STEP_DELAYS_DAYS.length

export function templateNameFor(sequence: SequenceCode, step: number): string {
  // step est 1-indexé (1..5)
  return `seq-${sequence}${step}`
}

export function nextSendAt(currentStep: number, base: Date = new Date()): Date | null {
  // currentStep = étape venant d'être envoyée. On calcule la date de l'étape suivante.
  if (currentStep >= TOTAL_STEPS) return null
  const delayDays = STEP_DELAYS_DAYS[currentStep] // délai relatif à l'inscription
  const d = new Date(base)
  d.setUTCDate(d.getUTCDate() + delayDays)
  return d
}
