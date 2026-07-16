// Contrat unique — Strategy pattern. Le site n'appelle QUE cette interface,
// via l'edge function `enroll-sequence`. La factory choisit l'implémentation
// à partir du secret EMAIL_ENGINE ('supabase' par défaut, 'odoo' à venir).

export type SequenceCode = 'A' | 'B' | 'C' | 'D'
export type StopReason = 'booking' | 'reply' | 'manual'

export interface EnrollInput {
  firstName: string
  email: string
  sequence: SequenceCode
  resultHtml?: string
}

export interface StopInput {
  email: string
  reason: StopReason
}

export interface EmailEngine {
  enroll(input: EnrollInput): Promise<{ enrolled: boolean; reason?: string }>
  stop(input: StopInput): Promise<{ stopped: number }>
}
