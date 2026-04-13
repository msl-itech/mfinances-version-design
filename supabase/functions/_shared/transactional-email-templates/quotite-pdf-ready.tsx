import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "MFinances"

interface QuotitePdfReadyProps {
  name?: string
  quotite?: string
  deduction?: string
  downloadUrl?: string
}

const QuotitePdfReadyEmail = ({ name, quotite, deduction, downloadUrl }: QuotitePdfReadyProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Votre rapport de quotiété professionnelle est prêt — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `${name}, votre rapport est prêt !` : 'Votre rapport est prêt !'}
        </Heading>
        <Text style={text}>
          Votre rapport de quotiété professionnelle a été généré avec succès.
          {quotite && deduction && (
            <> Quotiété calculée : <strong>{quotite} %</strong> — Déduction estimée : <strong>{deduction} € / an</strong>.</>
          )}
        </Text>
        {downloadUrl && (
          <Button style={button} href={downloadUrl}>
            Télécharger mon rapport PDF
          </Button>
        )}
        <Hr style={hr} />
        <Text style={text}>
          Ce rapport est basé sur la méthode des surfaces pondérées utilisée en cabinet. Il constitue une documentation justificative 
          pour votre expert-comptable. Conservez-le dans vos archives fiscales (délai légal : 7 ans).
        </Text>
        <Text style={text}>
          Besoin d'un accompagnement personnalisé ? N'hésitez pas à nous contacter pour un diagnostic de votre situation.
        </Text>
        <Text style={footer}>
          Cabinet {SITE_NAME} · ITAA n°50.624.805 · Uccle, Bruxelles
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: QuotitePdfReadyEmail,
  subject: 'Votre rapport de quotiété professionnelle — MFinances',
  displayName: 'Rapport quotiété prêt',
  previewData: { name: 'Jean', quotite: '16,1', deduction: '2 858', downloadUrl: 'https://example.com/rapport.pdf' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '20px 25px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a2744', margin: '0 0 20px', fontFamily: "'Playfair Display', Georgia, serif" }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 20px' }
const button = {
  backgroundColor: '#d9342b',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
  margin: '0 0 20px',
}
const hr = { borderColor: '#e5e7eb', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '20px 0 0', lineHeight: '1.5' }
