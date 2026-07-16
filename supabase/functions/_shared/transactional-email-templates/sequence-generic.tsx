// Template React Email unique et data-driven qui rend n'importe lequel
// des 20 emails du tunnel de vente (voir emails.ts).
//
// Enregistré 20 fois dans le registry sous les noms `seq-A1` .. `seq-D5`,
// avec `subject` dynamique lu depuis le catalogue.

import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { SEQUENCE_EMAILS } from './emails.ts'

interface Props {
  templateName?: string  // 'seq-A1' etc.
  firstName?: string
  resultHtml?: string
}

const SequenceEmail = ({ templateName, firstName, resultHtml }: Props) => {
  const key = templateName ?? 'seq-A1'
  const email = SEQUENCE_EMAILS[key]
  if (!email) {
    return (
      <Html lang="fr" dir="ltr">
        <Head />
        <Body style={main}>
          <Container style={container}>
            <Text style={text}>Template inconnu : {key}</Text>
          </Container>
        </Body>
      </Html>
    )
  }

  const name = firstName?.trim() || ''
  const paragraphs = email.paragraphs.map((p) => p.replace(/\{firstName\}/g, name))
  const insertAt = email.showResult ? (email.resultAfter ?? 1) : -1

  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>{email.subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>MFinances</Heading>
          <Hr style={hr} />
          {paragraphs.map((p, idx) => (
            <React.Fragment key={idx}>
              <Text style={text}>{p}</Text>
              {idx === insertAt && resultHtml && (
                <div
                  style={resultBox}
                  dangerouslySetInnerHTML={{ __html: resultHtml }}
                />
              )}
            </React.Fragment>
          ))}
          {email.cta && (
            <div style={{ textAlign: 'center' as const, margin: '28px 0' }}>
              <Button style={button} href={email.cta.url}>
                {email.cta.label}
              </Button>
            </div>
          )}
          <Hr style={hr} />
          <Text style={footer}>
            Cabinet MFinances · ITAA n°50.624.805 · Uccle, Bruxelles
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Fabrique une entrée de registry pour un email donné.
export function makeSequenceTemplate(templateName: string): TemplateEntry {
  const email = SEQUENCE_EMAILS[templateName]
  return {
    // On wrappe le composant pour figer le templateName (le registry n'envoie
    // que templateData depuis l'appelant).
    component: (props: Props) =>
      SequenceEmail({ ...props, templateName }),
    subject: email?.subject ?? templateName,
    displayName: `Séquence · ${templateName}`,
    previewData: { firstName: 'Jean', resultHtml: '' },
  }
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#1a2744',
  margin: '0 0 12px',
  fontFamily: "'Playfair Display', Georgia, serif",
}
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.65', margin: '0 0 14px' }
const resultBox = {
  background: '#f7f8fb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px 18px',
  margin: '4px 0 18px',
  fontSize: '14px',
  color: '#1a2744',
  lineHeight: '1.6',
}
const button = {
  backgroundColor: '#d9342b',
  color: '#ffffff',
  padding: '13px 26px',
  borderRadius: '999px',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
}
const hr = { borderColor: '#e5e7eb', margin: '18px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '12px 0 0', lineHeight: '1.5' }

export const template = makeSequenceTemplate('seq-A1') satisfies TemplateEntry
