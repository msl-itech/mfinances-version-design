import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "MFinances"

interface BailPdfReadyProps {
  name?: string
  bailType?: string
  downloadUrl?: string
}

const BailPdfReadyEmail = ({ name, bailType, downloadUrl }: BailPdfReadyProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Votre bail professionnel est prêt — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `${name}, votre bail est prêt !` : 'Votre bail est prêt !'}
        </Heading>
        <Text style={text}>
          Votre contrat de bail {bailType ? `(${bailType})` : 'professionnel'} a été généré avec succès. 
          Vous pouvez le télécharger en cliquant sur le bouton ci-dessous.
        </Text>
        {downloadUrl && (
          <Button style={button} href={downloadUrl}>
            Télécharger mon bail PDF
          </Button>
        )}
        <Hr style={hr} />
        <Text style={text}>
          Ce bail est basé sur un modèle utilisé en cabinet. Il doit être validé avant signature 
          selon votre situation spécifique. N'hésitez pas à nous contacter pour un accompagnement personnalisé.
        </Text>
        <Text style={footer}>
          Cabinet {SITE_NAME} · ITAA n°50.624.805 · Uccle, Bruxelles
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: BailPdfReadyEmail,
  subject: 'Votre bail professionnel est prêt — MFinances',
  displayName: 'Bail PDF prêt',
  previewData: { name: 'Jean', bailType: 'Location meublée 60/40', downloadUrl: 'https://example.com/bail.pdf' },
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
