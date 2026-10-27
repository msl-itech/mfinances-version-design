# Roadmap conversion T4 2026 — suivi step by step

Légende : [ ] à faire · [x] fait · (Site) = je peux le faire ici · (Équipe) = hors site (Odoo, Mika, commerciaux)

## Étape 1 — Mesure et RGPD (J1)
- [ ] (Équipe) Rappeler les 11 demandes « Nouveau », motif de perte obligatoire, revenu attendu, fusion doublons Odoo
- [x] (Équipe) Plausible retiré le 27/10/2026 (ajouté le 18/04/2026 par une session antérieure, aucun compte derrière) ; tableau de référence à établir depuis l'export Clarity 20/09 → 19/10
- [ ] (Site) J1.5 Charger Clarity seulement après consentement cookies — attend la décision écrite de Mika

## Étape 2 — Vitesse de l'accueil (J2.1)
- [ ] (Équipe) Mesure PageSpeed avant (sur le site en ligne, avant publication)
- [x] (Site) Titre, sous-titre et boutons du haut de l'accueil visibles sans animation
- [x] (Site) Vérifier/corriger le préchargement de l'image principale
- [x] (Site) Charger chatbot et animations après l'affichage
- [ ] (Équipe) Mesure PageSpeed après publication (objectif LCP mobile < 2,5 s)

## Étape 3 — URL en double (J2.2)
- [x] (Site) URL testées : /tarifs et /tarifs/ répondent toutes deux 200 (www et http déjà redirigés). Canonicals OK.
- [x] (Équipe) Redirections 301 importées dans Encited ; cinq pages et le sitemap vérifiés en ligne lors de l’étape précédente
- [x] (Équipe) Réindexation demandée le 27/10/2026 pour accueil, tarifs, services, DAF, diagnostic, contact et à propos (déjà indexées, selon Search Console rapportée par l’utilisateur)

## Étape 4 — Extraits Google des 7 pages (J2.3)
- [x] (Site) Tableau avant/après titres + descriptions préparé le 27/10/2026 (DAF, intérêts immobilier, tarifs, à propos, requalification loyer, services, horeca) — étape 3 dans le suivi de conversation
- [ ] (Équipe) Validation Mika des propositions avant application ; aucune métadonnée du site modifiée
- [ ] (Site) Mise à jour

## Étape 5 — Doublons Odoo et suivi des envois (J2.4, J2.5)
- [ ] (Site) Chercher une piste ouverte avec le même e-mail avant d'en créer une (fonction serveur submit-lead) + test 3 envois
- [ ] (Site) Événement contact_form_submit déclenché sur chaque formulaire qui crée une piste (chatbot inclus) + note de diagnostic

## Étape 6 — Bouton « Réserver un appel » partout (J4.1)
- [x] (Site) Validation du 27/10 appliquée : appel rouge et diagnostic contour marine sur accueil, tarifs, services et ServicePageHero ; ouverture du rendez-vous Odoo vérifiée
- [x] (Site) Plausible retiré de `index.html` le 27/10/2026 ; Clarity conservé ; appointment_click et contact_form_submit envoyés à Clarity
- [ ] (Site) Bouton principal « Réserver un appel de 20 minutes » dès le premier écran : accueil, tarifs, services, secteurs
- [ ] (Site) Bandeau fixe mobile à partir de 30 % de défilement
- [ ] (Site) Formulaire court (nom, e-mail, téléphone, besoin) en bas des pages services et secteurs
- [ ] (Site) Mesure appointment_click / contact_form_submit par page

## Étape 7 — Encadrés dans le blog (J4.2)
- [ ] (Site) Un encadré par catégorie (fiscalité, trésorerie, création, DAF, contrôle de gestion)
- [ ] (Site) Après le 2e intertitre et en fin d'article, en commençant par les 10 articles les plus vus

## Étape 8 — Guides → rendez-vous (J4.3, J4.4)
- [ ] (Site) Page de confirmation des guides : proposer un créneau
- [ ] (Site) E-mails 2 et 4 des séquences : lien de rendez-vous signé Mika
- [x] (Site) Promesse de rappel personnel sous 72 h conservée ; aucune modification vers 4 h ou 48 h
- [ ] (Équipe) Activité automatique « Appel de qualification » 48 h + vue « Demandes sans activité » dans Odoo

## Étape 9 — Preuve sociale près des boutons (J4.5)
- [ ] (Site) Avis Google à côté des boutons : accueil, tarifs, services
- [ ] (Équipe) 3 cas clients validés par les clients, puis (Site) intégration

## Étape 10 — Pages pilotage (J6.1)
- [ ] (Site) DAF, contrôle de gestion, trésorerie, services : réponse courte en haut, tableau « ce que vous recevez », FAQ 5 questions, liens depuis 5 articles
- [ ] (Équipe) Validation Mika + cas clients chiffrés

## Étape 11 — IA, local, segments (J6.2–J6.4)
- [ ] (Site) Grille GEO 15 questions + réponses sourcées sur les pages
- [ ] (Équipe) Fiche Google + campagne d'avis ; décision Mika ASBL / particuliers
- [ ] (Site) Si décidé : CTA adaptés sur pages ASBL et articles particuliers

## Bilan J+28
- [ ] (Équipe) Comparaison avant/après par source
