/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as bailPdf } from './bail-pdf-ready.tsx'
import { template as quotitePdf } from './quotite-pdf-ready.tsx'
import { makeSequenceTemplate } from './sequence-generic.tsx'
import { SEQUENCE_EMAILS } from '../sequence-templates/emails.ts'

const sequenceTemplates: Record<string, TemplateEntry> = Object.fromEntries(
  Object.keys(SEQUENCE_EMAILS).map((name) => [name, makeSequenceTemplate(name)])
)

export const TEMPLATES: Record<string, TemplateEntry> = {
  'bail-pdf-ready': bailPdf,
  'quotite-pdf-ready': quotitePdf,
  ...sequenceTemplates,
}
