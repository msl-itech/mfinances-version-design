# 📌 LISEZMOI — Corrections SEO & fiscales pour mfinances.be (Lovable) — V6.2

Bonjour 👋 Ce dossier contient les corrections pour mfinances.be. La plupart sont **invisibles** (SEO/schémas) ; la version **consolide surtout du contenu fiscal visible** (articles de blog, page Fiscalité, FAQ, calculateurs) mis à jour aux **réformes belges 2026** et **vérifié sur sources officielles**.

> ✋ **Cette version est en attente de validation par Mika.** Ne la mets pas en ligne tant que Mika ne t'a pas donné le **GO** explicite.

## 🆕 Nouveautés V6.2 (au-dessus de la V6.1)
Correctifs ciblés après revue : **VVPRbis** encore à 15 % dans une **FAQ visible** → « précompte réduit, sous conditions » ; **capital SRL** « 1 € » → **aucun capital minimum légal** (CSA 2019) dans la FAQ **et** dans `llms-full.txt` (resynchronisé) ; `faq-data.ts` (dormant) assaini (**DAF en option**, **Basic 275 €**) ; garde-fou **Niveau 0** anti-régression source ajouté à la recette. Détail : `CHANGELOG-V6.2.md`.

## 🆕 Nouveautés V6.1 (au-dessus de la V6)
Corrections issues d'une **contre-vérification fiscale** sur sources officielles : enfant à charge (**~12 000 / 12 300 €**, l'ancien « 5 265 € » était faux), réductions énergie **nuancées** (isolation toit maintenue en Wallonie), mention « véhicule électrique particulier » **retirée**, crédit fonds propres **reformulé** (base relevé 276 J), rémunération dirigeant **présentée au conditionnel** (réforme adoptée le 9/07/2026, publication à confirmer), location meublée **sans slogan « 15 % »** (part mobilière précisée), baisse de prix clarifiée (**+50 %** de volume), et **sources primaires SPF/INASTI/Justel** (n° loi-programme corrigé : 2026003986). Détail : `CHANGELOG-V6.1.md`.

## 🆕 Nouveautés V6 (au-dessus de la V5.1)
Passe fiscale **documentée et traçable** : VVPRbis **18 %**, réserve de liquidation à **deux régimes** (5 %/5 ans anciennes ; **9,8 %/3 ans** nouvelles), rémunération dirigeant **50 000 € pour l'exercice d'imposition 2027**, majoration versements anticipés **précisée** (6,75 % sociétés / 4,50 % personnes physiques), coefficient de revalorisation **5,63 / 5,75**, tranche IPP **49 840 €** datée, INASTI **~890 €/trimestre**, ATN voiture **réf. CO₂ 70/58 g** + plancher 4 %, déductibilité automobile **par cohorte**, déduction pour investissement **sans taux universel**, délai ISOC **7 mois**, suppression du faux « 75 % » téléphone, 60/40 = **règle fiscale** (pas Code civil), et dernières finitions **DAF en option**. **Chaque valeur annuelle précise l'année de revenus et l'exercice d'imposition.**

## 📚 Documents à lire (traçabilité)
- **`CHANGELOG-V6.2.md`** — dernier delta (revue V6.1) ; puis `CHANGELOG-V6.1.md`, `CHANGELOG-V6.md`.
- **`AVANT-APRES.md`** — chaque changement (V6.2 en tête, puis V6.1, V6) en « avant → après ».
- **`SCAN-FISCAL-V6.2.md`** — écarts corrigés à la revue V6.1 ; puis `SCAN-FISCAL-V6.1.md` (matrice complète) + points **à valider par Mika**.
- **`SOURCES-FISCALES-V6.1.md`** — sources **officielles SPF/INASTI/Justel** + dates de consultation.
- Historique : `SCAN-FISCAL-V6.md`, `SOURCES-FISCALES-V6.md`, `CHANGELOG-V6.md`, `CHANGELOG-V5.1.md`, `POINT-1..6_*.md`.

## ⚠️ Règle d'or : remplacer des fichiers entiers
Dans **`fichiers-finaux/`**, chaque fichier est en version finale, **au même chemin** que dans le projet. Tu **remplaces** le fichier existant par celui fourni. **La liste exacte = le contenu du dossier `fichiers-finaux/`.** En plus :

- **1 fichier à CRÉER** : `src/lib/seo-service-schemas.ts` (n'existe pas encore — sans lui, les pages qui l'importent plantent).
- **3 fichiers à SUPPRIMER** (ancienne home V1, non servie) : `src/pages/Index.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/sections/PricingSection.tsx`.
- **1 fichier BACKEND** (Supabase, PAS via OVH) : `supabase/functions/chatbot/index.ts` — se déploie avec les fonctions Supabase.

## 🧾 Fichiers de CONTENU FISCAL modifiés en V6 (à surveiller)
`src/data/article-geo-faqs.ts` · `src/data/faq-data.ts` · `src/data/blog-articles-content.ts` · `src/data/blog-data.ts` · `public/llms-full.txt` · `src/pages/FraisDefendables.tsx` · `src/pages/BureauADomicileHub.tsx` · `src/components/GenerateurBail.tsx` · `src/pages/AccueilV2.tsx` · `src/pages/AccueilV3.tsx`.

## 🏠 Adresse (identique partout)
> **Rue de la Magnanerie 20, 1180 Uccle** — Tél. **+32 2 886 05 50**

## 💶 Forfaits (source = page Tarifs)
Basic 275 € · Essentiel 350 € · Premium 450 € (contrôle de gestion **trimestriel**) · Excellence 650 € (contrôle mensuel + trésorerie prévisionnelle mensuelle **incluse**). **DAF à temps partiel = option 150 € HTVA/h**, réservée aux clients Excellence — jamais « inclus ».

## 🛠️ Sur Lovable
1. **Crée** `seo-service-schemas.ts` ; **supprime** les 3 fichiers V1.
2. Chaque fichier de `fichiers-finaux/` : ouvre l'existant → **Ctrl+A, supprime, colle** la version fournie → sauvegarde.
3. Laisse l'aperçu se reconstruire.

## 🚀 Publication (LovableHTML + OVH)
Coller les fichiers **ne met pas le site à jour en ligne**. Il faut : **(1)** régénérer avec **LovableHTML**, **(2)** ré-uploader sur **OVH**. Le chatbot Supabase se déploie séparément.

## 🧪 Recette obligatoire (APRÈS upload OVH)
```bash
bash recette-seo.sh
```
- **Niveau 1 (technique)** : HTTP 200, title, meta, canonical (présence + destination), H1, JSON-LD.
- **Niveau 2 (métier)** : DAF 150 €/h dans llms.txt, `/accueilv3` en noindex, ITAA Mika sur `/a-propos/`, Basic 275 sur `/tarifs/`, pas d'aggregateRating, 1 seul H1.
- **Niveau 3 (fondations)** : robots.txt, sitemap.xml, redirection www → non-www, redirection http → https.
- **Niveau 4 (anti-régression fiscale, V6)** : contrôle sur `/llms-full.txt` que les **anciennes valeurs interdites** (891,14 ; 5,46 ; 10 oct/20 déc ; « 25 % investissement » ; 60/40 « Code civil » ; « 6,75 % (taux 2026) » ; etc.) **ont disparu** et que les **nouvelles** (18 % ; 9,8 % ; 6,75 % sociétés + 4,50 % PP ; 5,63 ; 890 €/trimestre) **sont bien présentes**.

Le script renvoie un **code d'erreur** si un point échoue. Livraison OK **seulement si la recette est verte** (Niveau 4 inclus, une fois la V6 déployée).

## 🔎 Validation des schémas
Schema Markup Validator (validator.schema.org) sur `/services/comptabilite/` et `/tarifs/` → **Service** et **OfferCatalog** détectés, sans erreur.

Coche au fur et à mesure. 🙌
