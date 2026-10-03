# Détail des modifications (V3.2)

> **Annexe.** Ne suis pas ce document de A à Z : ouvre-le seulement quand une mission de `00-COMMENCER-ICI.md` te le demande.

Pour information. Les numéros correspondent à la liste validée par Mika. Microsoft Clarity n'est pas modifié (décision de Mika).

| N° | Correction | Fichier(s) |
|---|---|---|
| 1 | Nouveau PDF de la checklist trésorerie (4 pages ; l'ancien fichier était vide) | `public/checklist-tresorerie-mfinances.pdf` |
| 2 | Meta description : « 7 erreurs » devient « 5 erreurs » | `src/pages/ChecklistTresorerie.tsx` |
| 3 | Forfaits de l'accueil : « À partir de » sur les 4 formules ; Essentiel « Pour anticiper », situation semestrielle, suivi inclus | `src/pages/AccueilV2.tsx` |
| 4 | Numérotation des sections de l'accueil dans l'ordre (02 à 12) | `src/pages/AccueilV2.tsx`, `src/components/sections/DiagnosticSection.tsx`, `src/components/sections/LeadMagnetSection.tsx` |
| 5 | Le PDF se télécharge même si Odoo ne répond pas ; le lead est envoyé à Odoo ensuite | `src/pages/ChecklistTresorerie.tsx` |
| 6 | Contrôle automatique : la publication est bloquée si un PDF de `public/` est vide ou tronqué | `vite.config.ts` |
| 7 | Article « Pourquoi mon comptable ne m'aide pas ? » sous `/blog/daf-externalise/` (sitemap, lien de la page Fiscalité, llms-full.txt) ; l'ancienne URL affichait « Article introuvable » | `public/sitemap.xml`, `src/pages/Fiscalite.tsx`, `public/llms-full.txt` |
| 8 | Pré-rendu de `/notre-organisation/` et `/societe-en-veille/` ; `/societe-en-veille/` ajouté au sitemap avec sa vraie date de modification (24/09/2026) | `vite.config.ts`, `public/sitemap.xml` |
| 9 | Image de partage : `og-default.webp` au lieu d'une capture Lovable | `index.html` |
| 10 | `noindex` sur `/admin/analytics/` via le composant centralisé `SEOHead` | `src/pages/AdminAnalytics.tsx` |
| 11 | llms.txt : diagnostic en 8 questions (et non 20) | `public/llms.txt` |
| 12 | « À partir de » devant tous les tarifs des quatre formules, partout (plus aucun « dès ») | `src/pages/Tarifs.tsx` (tableau, cartes, pastilles mobiles, FAQ, liste des formules, titre et meta description), `src/components/DiagnosticQuiz.tsx`, `src/data/faq-data.ts`, `src/pages/AccueilV2.tsx` (FAQ), `src/pages/Services.tsx`, `src/pages/Comptabilite.tsx`, `src/pages/DafExternalise.tsx`, `src/pages/EntreprisesCroissance.tsx`, `src/pages/IndependantsStartups.tsx`, `src/pages/CommerceHoreca.tsx`, `src/pages/ProfessionsSante.tsx`, `src/pages/Asbl.tsx`, `src/pages/SocieteExploitation.tsx`, `src/pages/SocieteDeManagement.tsx`, `src/pages/SocieteDeMoyens.tsx`, `src/lib/seo-schemas.ts`, `supabase/functions/chatbot/index.ts` |
| 13 | Forfait Société en veille : 175 € HTVA/mois (au lieu de 275 €) | `src/pages/SocieteEnVeille.tsx` |
| 14 | Sous le portrait de Mika : « FR/EN bilingue » remplacé par « Odoo · Finance connectée » | `src/pages/AccueilV2.tsx` |
| 15 | Page Comptabilité : les témoignages viennent de la même source Google que l'accueil (verbatim et nom Google, mention « Avis Google vérifié ») | `src/pages/Comptabilite.tsx` |
| 16 | Odoo Finance dans l'introduction de la section « Nos solutions » de l'accueil | `src/pages/AccueilV2.tsx` |
| 17 | Synchronisation automatique des avis Google (voir ci-dessous) | `supabase/migrations/20260925080000_google_reviews.sql`, `supabase/functions/sync-google-reviews/index.ts`, `src/hooks/use-google-reviews.ts`, `src/pages/AccueilV2.tsx`, `src/components/sections/EntryPointsBentoSection.tsx`, `src/pages/Contact.tsx`, `src/pages/Comptabilite.tsx`, scripts `SQL/` |
| 18 | Pied de page : rouge #E8393A remplacé par le rouge de la charte (#E62828) ; référentiel de marque livré dans `docs/marque/` | `src/components/Footer.tsx` |
| 19 | Suppression du dossier de doublons `docs/mfinances-corrections-SEO-V6.2/fichiers-finaux/` | Étape 2 du guide |
| 20 | Chargement à la demande : chaque page n'est téléchargée que lorsqu'on la visite, avec préchargement de la page demandée (aucun écran blanc). JavaScript chargé à l'ouverture de l'accueil : 3,0 Mo → 0,96 Mo | `src/App.tsx`, `src/main.tsx`, `src/lib/lazy-page.ts` (nouveau) |
| 21 | Bandeau « 200+ entreprises » : trois vignettes de 2 à 3 ko au lieu de trois photos pleine taille (457 ko) | `src/pages/AccueilV2.tsx`, `src/assets/avatar-mika-96.webp`, `src/assets/avatar-equipe-96.webp`, `src/assets/avatar-daf-96.webp` (nouveaux) |
| 22 | Mesure Clarity du tunnel : balise `environment` (production / preview / developpement) et 9 événements | `src/lib/clarity-events.ts` (nouveau), `src/App.tsx`, `src/pages/Diagnostic.tsx`, `src/pages/ChecklistTresorerie.tsx`, `src/pages/Contact.tsx` |
| 23 | Pré-rendu : chaque page expose son propre `<title>`, sa meta description, son canonical et ses balises Open Graph et Twitter (auparavant, plusieurs pages comme Tarifs, DAF ou Contact gardaient celles de l'accueil). Contrôle : 87 pages sur 87 ont un titre distinct et une seule balise de chaque type | `src/components/SEOHead.tsx`, `index.html` (balises par défaut marquées pour être remplacées ; code Clarity inchangé) |
| 24 | Provenance des leads : page d'entrée, page de conversion et site d'origine ajoutés à chaque lead (bloc « Provenance du contact » dans la description Odoo, et colonnes dans `lead_sources`) | `src/lib/utm-enrich.ts`, `src/App.tsx`, `supabase/migrations/20260926090000_v32_avis_et_provenance.sql` |
| 25 | Clarity : balise `site_version = v3-2026-09` pour comparer les versions successives | `src/lib/clarity-events.ts` |
| 26 | Avis Google : état neutre si la dernière synchronisation réussie date de plus de 30 jours ; un avis n'est supprimé qu'après **3 synchronisations complètes et réussies consécutives** où Google ne le renvoie plus (compteur `missing_sync_count`, remis à 0 dès qu'il réapparaît ; une panne n'incrémente rien) | `src/hooks/use-google-reviews.ts`, `supabase/functions/sync-google-reviews/index.ts`, même migration que le point 24 |
| — | `package-lock.json` resynchronisé avec `package.json` **par rapport au dépôt d'origine** (export du 15/09 : ajout des deux dépendances Lovable manquantes, aucune version modifiée). Identique à celui de la V2 | `package-lock.json` |

## Synchronisation des avis Google — fonctionnement

- **Source unique : Google.** La fonction `sync-google-reviews` récupère tous les avis de la fiche désignée par `GBP_LOCATION_NAME` (obligatoire) et les enregistre **tels quels** (verbatim non modifié, identifiant Google, dates de création et de mise à jour).
- **Sécurité.** La fonction refuse toute exécution sans le secret de synchronisation. Ce secret est généré automatiquement dans Supabase Vault par la migration et n'est transmis que par la tâche planifiée. Le site ne déclenche jamais la synchronisation : il lit seulement les données.
- **Fraîcheur.** La table `google_reviews_summary` conserve la note moyenne, le nombre total d'avis, la fiche synchronisée, la date de la dernière synchronisation réussie (`last_synced_at`), celle de la dernière tentative et la dernière erreur.
- **Panne Google.** En cas d'échec, les dernières données synchronisées restent affichées ; seule l'erreur est enregistrée.
- **Avant la première synchronisation.** Aucun nombre codé en dur : le site affiche « Avis Google vérifiés » sans nombre ni note. Les carrousels affichent les avis de secours déjà présents sur l'accueil.
- **Affichage.** Seuls les avis 4 et 5 étoiles avec un texte apparaissent dans les carrousels (réglage `MIN_RATING`). Les avis longs sont limités à l'écran par CSS (`line-clamp`), sans modifier le texte.

## Événements Clarity (point 22)

| Événement | Déclenché quand |
|---|---|
| `diagnostic_start` | le visiteur répond à la première question du diagnostic |
| `diagnostic_complete` | il répond à la huitième et dernière question |
| `diagnostic_result` | il laisse son e-mail et obtient son résultat |
| `checklist_submit` | il valide le formulaire de la checklist trésorerie |
| `checklist_download` | le PDF de la checklist se télécharge |
| `contact_click` | il clique sur un lien vers la page Contact, un numéro de téléphone ou une adresse e-mail |
| `appointment_click` | il clique sur la prise de rendez-vous en ligne (Odoo) |
| `pricing_cta_click` | sur la page Tarifs, il clique vers le contact, le rendez-vous ou le diagnostic |
| `contact_form_submit` | le formulaire de contact est envoyé |

Le chargement de Clarity dans `index.html` n'est pas modifié. Les appels passent par l'API publique de Clarity ; si Clarity ne se charge pas, le site fonctionne normalement.
