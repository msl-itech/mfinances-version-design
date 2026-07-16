
# Tunnel de vente MFinances — intégration Strategy pattern

Objectif : capturer chaque lead des 4 outils, l'inscrire dans une séquence de 5 emails (J0 → J+30), s'arrêter automatiquement si RDV pris, et permettre de basculer entre 2 moteurs d'envoi (Cloud Lovable ou Odoo) via une seule variable.

## 1. Contrat unique (Strategy pattern)

Fichier `supabase/functions/_shared/email-engine/`:

- `types.ts` — interface `EmailEngine { enroll(...); stop(...) }` et type `SequenceCode = 'A'|'B'|'C'|'D'`.
- `supabase-engine.ts` — insère dans `sequence_enrollments`, cron envoie via `send-transactional-email` (infra Lovable Cloud existante, domaine `notify.mfinances.be` déjà vérifié).
- `odoo-engine.ts` — POST vers `api-connect-odoo` avec tag `seq_A|B|C|D` (réutilise `sendLeadToOdoo` étendu).
- `factory.ts` — lit secret `EMAIL_ENGINE` (`supabase` par défaut, ou `odoo`).

Côté site (React) : appel unique via une edge function `enroll-sequence` qui utilise la factory. Le composant ne connaît que `{ firstName, email, sequence, resultHtml }`.

## 2. Base de données

Migration (grants + RLS obligatoires) :

```
sequence_enrollments
  id uuid pk, email text, first_name text, sequence text ('A'|'B'|'C'|'D'),
  result_html text null, status text ('active'|'stopped'|'completed'),
  stop_reason text null, current_step int default 0,
  enrolled_at timestamptz, next_send_at timestamptz, last_sent_at timestamptz
  unique (email, sequence, status) — évite doublons actifs
```

RLS : lecture/écriture réservée `service_role` (les edge functions gèrent tout).

## 3. Templates (20 emails, endroit neutre)

`supabase/functions/_shared/sequence-templates/index.ts` :
- Objet + fonction `render({ firstName, resultHtml, ctaUrl }) → { subject, html, text }`
- Un fichier par email : `A1.ts` … `D5.ts` (20 fichiers), style cohérent avec templates existants (`bail-pdf-ready.tsx`), CTA rouge #d9342b vers `https://odoo.mfinances.be/appointment/11`.
- Planning : J0, J+2, J+7, J+14, J+30.

## 4. Cron d'envoi

`supabase/functions/process-sequence-queue/index.ts` : lit les lignes `active` dont `next_send_at <= now()`, envoie l'email de l'étape courante, incrémente `current_step`, calcule le nouveau `next_send_at`, met à `completed` après l'étape 5.

pg_cron toutes les 15 min (SQL via `supabase--insert`, contient l'anon key, hors migration).

## 5. Liens croisés (A4→C, B4→D, D4→A)

Les CTA "outil complémentaire" des emails A4/B4/D4 pointent vers les pages outils existantes du site. Aucune logique serveur : si le prospect utilise l'outil, il déclenche naturellement un nouveau `enroll` sur une autre séquence (les deux tournent en parallèle grâce à la contrainte `unique (email, sequence, status)`).

## 6. Arrêt automatique

`stop-sequence` edge function (`{ email, reason }`) : passe toutes les lignes `active` de cet email à `stopped`. Appelée par :
- Webhook Odoo Appointment (`/appointment/11`) — endpoint public documenté.
- Trigger manuel Mika (bouton admin plus tard, hors scope).

## 7. Câblage des 4 outils

Ajout d'un appel `supabase.functions.invoke('enroll-sequence', ...)` juste après l'envoi Odoo existant dans :
- `Tresorerie.tsx` / `Diagnostic.tsx` (séquence A)
- `GenerateurBail.tsx` (séquence B) — passe `resultHtml` = résumé du bail
- `CalculateurQuotite.tsx` / `CalculateurBureau.tsx` (séquence C) — passe résultat calculé
- `ChecklistControleBureauConfirmation.tsx` (séquence D)

Aucune régression : l'appel Odoo lead existant est conservé.

## 8. Config

- Secret `EMAIL_ENGINE` = `supabase` (défaut).
- Réutilise l'infra email Lovable Cloud déjà provisionnée (`notify.mfinances.be`, `send-transactional-email`, pgmq, cron).
- Aucun mot de passe SMTP requis dans ce scénario.
- Bascule Odoo plus tard : changer le secret + créer les 4 campagnes côté Odoo (indépendant du site).

## Détails techniques

- Edge functions concernées : `enroll-sequence` (nouvelle), `stop-sequence` (nouvelle), `process-sequence-queue` (nouvelle). Réutilisent `send-transactional-email` existant pour l'envoi effectif via la queue Cloud.
- 20 templates React Email enregistrés dans `registry.ts` avec noms `seq-A1`…`seq-D5`.
- Idempotency key = `${enrollmentId}-step-${n}` pour éviter les doublons en cas de retry.
- Grants standard : `authenticated`/`anon` = aucun accès direct table ; toutes les écritures passent par edge functions.

## Livrables

1 migration DB · 3 edge functions · 20 templates · 1 fichier engine + factory · 4 wire-ups dans les composants outils · 1 job pg_cron.

Confirmer pour lancer l'implémentation.
