# 🔁 AVANT / APRÈS — V6.2 (reliquats corrigés après revue de la V6.1)

> Petite passe de consolidation, sans nouveau chantier fiscal ni changement de design. Détail : `CHANGELOG-V6.2.md`.

## VVPRbis dans une FAQ GEO **visible**
**Avant** > « dividendes via VVPRbis **à 15 %** de précompte » (FAQ affichée + JSON-LD FAQPage).
**Après** > « précompte mobilier **réduit** via VVPRbis, **sous conditions** ». **Fichier** > `article-geo-faqs.ts`.

## Capital SRL dans une FAQ GEO **visible**
**Avant** > « le capital minimum légal de la SRL est de **1 €** ».
**Après** > « **aucun capital minimum légal** (CSA 2019) ; apports/patrimoine initial suffisants, justifiés par le plan financier ». Et « sous-capitaliser la société » → « **moyens de départ insuffisants** ». **Fichier** > `article-geo-faqs.ts`.

## `llms-full.txt` resynchronisé avec l'article
**Avant** > « le capital minimum légal **d'1 €** est insuffisant — 15 000 à 25 000 € recommandé ».
**Après** > version **exacte** de l'article (« La SRL n'a plus de capital minimum légal depuis le CSA (2019)… moyens de départ suffisants »). **Fichier** > `llms-full.txt`.

## `faq-data.ts` (fichier dormant) assaini
**Avant** > « DAF **inclus** dans Excellence » ; « forfaits commencent à **350 €** ».
**Après** > « DAF en **option** 150 € HTVA/h, non inclus » ; « **275 €** (Basic) ». **Fichier** > `faq-data.ts`.

---

# 🔁 AVANT / APRÈS — V6.1 (dernières corrections, contre-vérification Mika)

> V6.1 applique la contre-vérification de Mika (sources officielles SPF/INASTI/Justel). Ci-dessous, uniquement les changements V6.1 ; les changements V6 suivent en dessous.

## Enfant à charge (correction d'un montant faux)
**Avant** > « le seuil enfant à charge passe à **5 265 €** en 2026 ».
**Après** > « ressources nettes ≤ **~12 000 € (revenus 2025)** / **12 300 € (revenus 2026)**, plafond unifié ; le calcul tient compte d'exclusions et de déductions ».
**Pourquoi** > 5 265 € était faux ; la loi du 18/12/2025 a fortement relevé et unifié le plafond. **Fichier** > `blog-articles-content.ts`.

## Réductions « économie d'énergie »
**Avant** > « la réduction pour travaux d'économie d'énergie : **supprimée** » (général).
**Après** > « réduction **fédérale** disparue ; **isolation du toit maintenue en Wallonie** (30 %, 4 020/4 120 €), pas à Bruxelles ni en Flandre ».
**Pourquoi** > L'affirmation générale était fausse. **Fichier** > `blog-articles-content.ts`.

## « Avantage véhicule électrique particulier »
**Avant** > « l'avantage sur le véhicule électrique particulier … supprimé ».
**Après** > **mention retirée** (mesure non identifiable) ; la borne de recharge (confirmée) reste. **Fichier** > `blog-articles-content.ts`.

## Crédit d'impôt fonds propres
**Avant** > « 15 000 € de fonds propres augmentés → 3 000 € ».
**Après** > « 15 000 € d'accroissement **pris en compte fiscalement (relevé 276 J)** → 3 000 € (20 %) » + précision que la base n'est pas une simple hausse comptable. **Fichier** > `blog-articles-content.ts`.

## Rémunération dirigeant (conditionnel)
**Avant** > « ce minimum **passe** de 45 000 € à 50 000 € (EI 2027) ».
**Après** > « réforme **adoptée le 9 juillet 2026**, entrée en vigueur **à confirmer à la publication au Moniteur belge** ».
**Pourquoi** > La loi est votée mais pas encore publiée → ne pas la présenter comme définitive. **Fichiers** > `article-geo-faqs.ts`, `faq-data.ts`, `llms-full.txt`, `blog-articles-content.ts`.

## Location meublée (retrait du slogan « 15 % »)
**Avant** > titres/résumés « la **déduction à 15 %** » / « **taxation effective 15 %** ».
**Après** > titre « la fiscalité de la part mobilière » ; « **~15 % sur la part mobilière** » (pas le loyer global). **Fichiers** > `llms-full.txt`, `blog-articles-content.ts`, `blog-data.ts`, `GenerateurBail.tsx`, `BureauADomicileHub.tsx`.

## Baisse de prix
**Avant** > « marge tombe à 22 % — **baisse de 27 % de rentabilité** ».
**Après** > « marge unitaire **30 € → 20 €** ; vendre **+50 %** de volume pour la même marge brute totale ». **Fichiers** > `llms-full.txt`, `blog-articles-content.ts`.

---

# 🔁 AVANT / APRÈS — V6 (à relire sans ouvrir le code)

> Cette version **V6** ajoute une passe fiscale documentée par-dessus tout le travail V3 → V5.1 (SEO, schémas, DAF en option, home 4 forfaits, /accueilv3 noindex, NAP, ITAA…). Le détail V5.1 reste dans `CHANGELOG-V5.1.md`. Ci-dessous : **uniquement les changements V6**, avec « pourquoi » et fichiers. Sources complètes : `SOURCES-FISCALES-V6.md`. Matrice de statut : `SCAN-FISCAL-V6.md`.

---

## ⚠️ Le point à valider en priorité — versements anticipés

**Avant**
> « Sans acomptes, votre société est soumise à une majoration d'impôt de **6,75 % (taux 2026)**. »

**Après**
> « … majoration de **6,75 %** (taux applicable aux **sociétés** pour les revenus 2026 — exercice d'imposition 2027 ; le taux applicable aux **personnes physiques** est de **4,50 %**). »

**Pourquoi**
> La consigne (§7) demandait de passer 6,75 % → 4,50 %. Or la vérification officielle montre que **les deux taux existent** à l'EI 2027 : **6,75 % pour les sociétés**, **4,50 % pour les personnes physiques**. Le moteur SPF que tu as vu (espace *Particuliers*) affiche donc 4,50 %. Comme l'article parle d'une « ISOC de 20 000 € », **6,75 % est correct** — je l'ai gardé et clarifié plutôt que d'introduire une erreur. **À confirmer par toi.**

**Fichiers**
> `public/llms-full.txt`, `src/data/blog-articles-content.ts`.

---

## VVPRbis

**Avant** > « 20 % la 2e année, puis **15 %** après 5 ans » (et confusion avec la réserve).
**Après** > « 20 % au **2ᵉ exercice** (apports < 2026), puis **18 %** dès le 3ᵉ exercice — par exercice, jamais “5 ans / 5 %” ».
**Pourquoi** > Réforme 2026 (loi-programme 30/05/2026) : taux réduit 15 % → 18 % ; le VVPRbis se compte par exercice, pas en années.
**Fichiers** > `article-geo-faqs.ts`, `llms-full.txt`, `blog-articles-content.ts`, `faq-data.ts`.

## Réserve de liquidation

**Avant** > « précompte réduit à **5 % après 5 ans**, soit **~14,5 %** au total » (valeur unique).
**Après** > Deux régimes : **anciennes réserves** (≤ 30/12/2025) = 5 % après 5 ans (~13,6 %) ; **nouvelles réserves** (dès l'exercice 2026) = **9,8 % après 3 ans (~18 %)**.
**Pourquoi** > La réforme 2026 impose de distinguer selon la date de constitution ; un taux unique serait faux.
**Fichiers** > `article-geo-faqs.ts`, `llms-full.txt`, `blog-articles-content.ts`, `faq-data.ts`.

## Rémunération minimale du dirigeant

**Avant** > « 50 000 € **depuis l'exercice d'imposition 2026** … avantages en nature **10 000 € sur les 50 000 €** ».
**Après** > « 50 000 € **pour l'exercice d'imposition 2027 (revenus 2026)** … avantages de toute nature **ne pouvant excéder 20 %** de la rémunération ».
**Pourquoi** > La règle s'applique à l'EI 2027 (les mentions « EI 2026 » étaient périmées). Le « 10 000 € » est une lecture contestée par l'ITAA (c'est un ratio de 20 %). **Loi votée le 09/07/2026, publication M.B. imminente → à valider.**
**Fichiers** > `article-geo-faqs.ts`, `faq-data.ts`, `llms-full.txt`, `blog-articles-content.ts`.

## Coefficient de revalorisation du revenu cadastral

**Avant** > « En 2026, il s'établit à **5,46** » ; exemple « 800 × 5,46 = 4 368 → plafond 1 457 → excédent 343 ».
**Après** > « **5,63** (revenus 2025 — EI 2026) ; **5,75** (revenus 2026 — EI 2027) » ; exemple recalculé « 800 × 5,63 = 4 504 → plafond **1 502** €/an (125 €/mois) → excédent **298** ».
**Pourquoi** > 5,46 était la valeur de l'EI 2025. Datation obligatoire (§26).
**Fichiers** > `llms-full.txt`, `blog-articles-content.ts`.

## Barème IPP — tranche à 50 %

**Avant** > « au-delà de **46 440 €** en 2025 ».
**Après** > « au-delà de **49 840 €** (revenus 2025 — exercice d'imposition 2026) ».
**Pourquoi** > Valeur officielle datée (barème SPF EI 2026).
**Fichiers** > `article-geo-faqs.ts`.

## Cotisation minimale INASTI

**Avant** > « minimum **annuel** de **891,14 €** … cotisations trimestrielles » (contradiction d'unité).
**Après** > « ~**890 € par trimestre** (890,42 € en 2026) ».
**Pourquoi** > Erreur d'unité : le minimum est trimestriel, pas annuel.
**Fichiers** > `article-geo-faqs.ts`, `llms-full.txt`, `blog-articles-content.ts`.

## ATN voiture

**Avant** > « Pour 2025, réf. CO₂ **67 g/km** » ; formule sans coefficient d'âge.
**Après** > « revenus 2026 : **70 g/km** essence/LPG/gaz, **58 g/km** diesel ; % CO₂ entre **plancher 4 %** (électrique) et max 18 % ; formule × coefficient d'âge ».
**Pourquoi** > Références 2026 (AR 17/12/2025) ; une électrique n'a pas « 0 % » mais le plancher 4 %.
**Fichiers** > `article-geo-faqs.ts`, `llms-full.txt`, `blog-articles-content.ts`.

## Déductibilité des voitures thermiques

**Avant** > « déductibilité réduite jusqu'à 0 % pour les achats à partir de 2026 ; électriques 100 % jusqu'en 2026 » (cohortes mélangées).
**Après** > acquis **07/2023–12/2025** : 50 % (rev. 2026), 25 % (2027), 0 % (2028) ; acquis **≥ 01/2026** : 0 % dès l'origine.
**Pourquoi** > « 0 % en 2026 » et « 0 % en 2028 » visent deux cohortes différentes (loi 25/11/2021).
**Fichiers** > `article-geo-faqs.ts`, `llms-full.txt`, `blog-articles-content.ts`.

## Location de meubles — 60/40

**Avant** > « le **Code civil belge** prévoit par défaut 60 % / 40 % ».
**Après** > « la **réglementation fiscale (AR/CIR 92)** — présomption réfragable ».
**Pourquoi** > La clé 60/40 est fiscale (art. 4, 2°, b AR/CIR 92), pas civile.
**Fichiers** > `llms-full.txt`, `blog-articles-content.ts`, `GenerateurBail.tsx`.

## Générateur de bail — taxation des meubles

**Avant** > « Taxation mobilier à **7,5 %** ».
**Après** > « ~**15 %** » (30 % × base 50 %).
**Pourquoi** > Cohérence avec le contenu et le PDF (précompte 30 % sur base réduite de 50 %).
**Fichiers** > `GenerateurBail.tsx`.

## Déduction pour investissement

**Avant** > « jusqu'à **25 %** de majoration sur certains investissements ».
**Après** > « taux réformé (base / thématique / technologique) depuis les investissements 2025, **à vérifier pour l'année** ».
**Pourquoi** > Le 25 % était un taux temporaire COVID terminé fin 2022 ; plus de taux universel.
**Fichiers** > `llms-full.txt`, `blog-articles-content.ts`.

## Délai de dépôt ISOC

**Avant** > « dans les **6 mois** » (FAQ GEO).
**Après** > « au plus tard le dernier jour du **7ᵉ mois** (depuis l'EI 2021) ».
**Pourquoi** > L'ancien délai de 6 mois est abrogé (loi 26/01/2021, art. 310 CIR 92).
**Fichiers** > `article-geo-faqs.ts`.

## Téléphone / internet

**Avant** > « **75 %** pour le téléphone est courant et généralement accepté ».
**Après** > « part professionnelle **justifiée** — pas de pourcentage légal unique ».
**Pourquoi** > Il n'existe pas de forfait légal de 75 % (art. 49 CIR 92).
**Fichiers** > `article-geo-faqs.ts`.

## Bureau à domicile — économie

**Avant** > « 4 000 € de déductions → plus de **1 600 €** à l'ISOC 25 % ».
**Après** > « environ **1 000 €** (4 000 € × 25 %) ».
**Pourquoi** > 1 600 € = 40 %, incohérent avec « ISOC 25 % ».
**Fichiers** > `BureauADomicileHub.tsx`.

## DAF (finition de la règle commerciale)

**Avant** > « le DAF à temps partiel est **intégré dans tous les forfaits** » (FAQ Frais défendables) ; « Excellence … et **accès DAF** » (FAQ accueil).
**Après** > « DAF en **option** Excellence, **150 € HTVA/h** » partout.
**Pourquoi** > Dernières occurrences contradictoires (le reste du site était déjà corrigé en V5).
**Fichiers** > `FraisDefendables.tsx`, `AccueilV2.tsx`, `AccueilV3.tsx`.

---

## Rappel — ce qui vient de V5.1 (déjà dans le ZIP, inchangé)
DAF unifié en option 150 €/h · avis retirés du JSON-LD · home 4 forfaits (Basic 275) · /accueilv3 noindex · adresse « Rue de la Magnanerie 20 » · ITAA Mika 10.923.614 / cabinet 50.624.805 · location mobilier 30 %/~15 % · corrections arithmétiques (+50 %, 0,95 mois, 37,5 %, 1 000 €) · coquilles. **Détail : `CHANGELOG-V5.1.md`.**
