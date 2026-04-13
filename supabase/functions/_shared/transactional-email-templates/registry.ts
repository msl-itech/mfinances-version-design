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

export const TEMPLATES: Record<string, TemplateEntry> = {
  'bail-pdf-ready': bailPdf,
  'quotite-pdf-ready': quotitePdf,
}
