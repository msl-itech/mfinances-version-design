# 🧮 Scan fiscal — liste à vérifier (contenu mfinances.be)

**Posture** : revue de rigueur factuelle du contenu publié, menée comme un expert-comptable belge. **Méthode** : lecture des 47 articles (`blog-articles-content.ts`), de `llms-full.txt`, des FAQ (`faq-data.ts`, `article-geo-faqs.ts`), de `FraisDefendables.tsx`, des pages `Tarifs`/`Comptabilite` et de `CalculateurBureau.tsx`. ~200 affirmations chiffrées scannées.

> ⚠️ **Deux principes de lecture** :
> 1. **Arithmétique & coquilles** = je peux corriger avec certitude (c'est du calcul, pas du droit).
> 2. **Taux, seuils et valeurs annuelles** (ISOC, précompte, salaire dirigeant, coefficients…) = **à valider par toi**, car la loi belge 2025-2026 évolue et je ne tranche pas de règle fiscale à ta place.

> ⚠️ **Duplication** : tout le blog est recopié dans `llms-full.txt`. **Chaque correction doit être faite dans les DEUX fichiers.**

> 🔎 **Découverte importante** : la correction « bureau à domicile » de la V5 n'a touché que l'**article de blog**. La page **`CalculateurBureau.tsx` affiche encore « ~1 600 € »** et **la coquille « professionnelle professionnelle » y subsiste (2×)**. Voir 🔴-1.

## Résumé
**5 🔴 erreurs · 16 🟠 à valider · 3 🟡 coquilles.**

---

## SECTION 1 — Corrigeables immédiatement (arithmétique + coquilles)
*Je les applique dès ton accord (V6). Ce sont des erreurs de calcul ou de frappe, pas des questions de droit.*

### 🔴-1 — Économie ISOC fausse dans le calculateur bureau (+ coquille)
`src/pages/CalculateurBureau.tsx` (hero + schema, lignes ~66, 30, 96).
« 4 000 € de déductions → **~1 600 €** d'économie à l'ISOC » ; or 4 000 × 25 % = **1 000 €** (ou 800 € au taux réduit 20 %). Contredit l'article déjà corrigé. **+ coquille « professionnelle professionnelle » (2×, dont le JSON-LD).** → Corriger en **~1 000 €** et retirer le doublon.

### 🔴-2 — Volume pour compenser une baisse de prix : 36 % → **50 %**
Article `tresorerie-face-concurrence` (blog ~186 / llms-full ~115).
Marge 30 %, prix −10 % → marge unitaire 30→20. Pour maintenir la marge totale : 10/(30−10) = **+50 %** (le « 36 % » est faux). *(« marge tombe à 22 % » et « −27 % de rentabilité » sont corrects.)*

### 🔴-3 — BFR de Sophie : « 2,9 mois de CA » → **~0,95 mois (≈ 29 jours)**
Article `bfr-definition-formule-tpe` (blog ~1914 / llms-full ~435).
CA mensuel = 780 000/12 = 65 000 € ; 61 700/65 000 = **0,95 mois**. Le « 2,9 » vient probablement de « 28,9 **jours** » converti par erreur en mois.

### 🔴-4 — Pièce à usage mixte : 1h30 / 4h ≠ 25 %
Article `piece-usage-mixte-bureau` (blog ~2498 / llms-full ~1351).
1,5/4 = **37,5 %** (le salon juste au-dessus, 3h/8h = 37,5 %, est correct). → Mettre **37,5 %**, ou ajuster les heures.

### 🟡-1 — Chiffre parasite « 30%2 »
Article `calcul-bureau-a-domicile`, FAQ (blog ~2459). « …dépasser **30%2** ? » → « dépasser **30 %** ? ».

### 🟡-2 — Coquille « professionnelle professionnelle » dans le calculateur
`src/pages/CalculateurBureau.tsx` lignes 30 et 96 (cf. 🔴-1).

### 🟡-3 — Jeton « 150€ H/HTVA » (à vérifier au rendu)
`src/pages/Tarifs.tsx` (~224, 245). Format inhabituel dans une condition d'affichage ; vérifier que l'utilisateur voit bien « 150 € HTVA / heure ».

---

## SECTION 2 — À valider par toi (droit fiscal / valeurs annuelles)
*Je propose la correction, tu confirmes (beaucoup dépendent de la loi 2025-2026).*

### 🔴-5 — VVPRbis : « 5 ans » et « 5 % » sont faux (confusion avec la réserve de liquidation)
`vvprbis-belgique` (blog ~761 / llms-full ~921) **et** `faq-data.ts` (~43).
Le VVPRbis donne **20 % dès le 2ᵉ exercice** et **15 % dès le 3ᵉ exercice** suivant l'apport — **aucune** condition de 5 ans, **jamais** 5 %. Le « 5 ans / 5 % » appartient à la **réserve de liquidation**. La bonne version existe déjà dans `article-geo-faqs.ts` (~51). *Quasi-certain, mais je te laisse confirmer car c'est du droit.*

### 🟠 — Points « taux / année » à confirmer
- **A. Précompte location meublé** : articles bureau à domicile écrivent « ~7,5 % effectif (50 % × **15 %**) ». Le précompte mobilier général est **30 %** depuis 2017 → effectif **~15 %**, ce qui **double** la charge et réduit tous les gains annoncés (récurrent 4-5×). **Impact fort.**
- **B. Majoration ISOC** : « 6,75 % (2026) » → le taux a augmenté (≈ 9 % récemment). Ex. 20 000 € → 1 800 € au lieu de 1 350 €.
- **C. Salaire minimum dirigeant** : « 45 000 € en 2026 » → la réforme prévoit **50 000 €** (+ plafond ATN). À trancher, cité partout.
- **D. Réserve de liquidation** : coût effectif écrit « 15 % » (blog) vs « ~14,5 % » (GEO) ; réel **~13,64 %**. Harmoniser.
- **E. Exemple IPP indépendant** : bénéfice 45 000 € → « IPP ~14 000 € » ; or cotisations déductibles → IPP plutôt **~10-11 000 €**, net réel **~24-25 000 €** (pas 22 000).
- **F. Coefficient de revalorisation** : « 5,46 » → vérifier la valeur pour revenus 2025 / ex. 2026.
- **G. Déduction pour investissement** : « jusqu'à 25 % » → régime modifié depuis 1/1/2025 (base ~10 %).
- **H. Références CIR** (restaurant/cadeaux/amendes) : taux (69 %, 50 %) corrects mais numéros d'article douteux (probablement 8°bis / 8° / 6° au lieu de 7° / 1° / 2°). Dans l'article ET l'outil `FraisDefendables.tsx`.
- **I. Plafond 5/3** : basé sur le RC « **indexé** » à deux endroits → doit être le RC « **revalorisé** » (les autres articles le disent correctement).
- **J. ATN voiture** : formule simplifiée (manque base 5,5 % + dégressivité âge + plancher) ; « CO₂ réf 67 g/km 2025 essence » douteux.
- **K. Voiture thermique** : « 0 % dès 2026 » → plutôt **0 % en 2028** selon le calendrier.
- **L. Tranche 50 % IPP** : « 46 440 € (2025) » → plutôt **~48 320 €** pour revenus 2024.
- **M. Cotisations INASTI** : « minimum annuel 891,14 € » → c'est le minimum **trimestriel** (annuel ≈ 3 560 €).
- **N. Téléphone « 75 % généralement accepté »** (FAQ GEO) contredit la ligne du site (« pas de taux légal fixe »). Aligner sur la position correcte.
- **O. Coût employeur** : `quand-faire-appel-daf` utilise 3 500 € → 5 500-6 000 € (×1,57-1,71) alors que le reste du site utilise **×1,33**. Choisir un coefficient unique (ou distinguer « ONSS seule » vs « coût complet »).
- **P. Article « fin déduction intérêts 2026 »** : arithmétique correcte, mais toutes les mesures (seuils 1 800→5 265 €, calendriers, crédit fonds propres) dépendent de la **loi votée** → à valider point par point.

---

## SECTION 3 — Cohérence transversale (à trancher une fois pour toutes)
1. **Coût employeur** : ×1,33 (réf.) vs ×1,5 (FAQ GEO du même article : 3 000 € → 4 500 €) vs ×1,57-1,71 (DAF). → un seul coefficient.
2. **DAF inclus ou option ?** : `faq-data.ts` dit encore « inclus dans Excellence » alors que le site dit « option 150 €/h ». *(faq-data.ts n'est pas utilisé actuellement, mais à corriger si un jour réactivé.)*
3. **Budget DAF/mois** : « 1 500-4 000 € » (blog) vs « 800-2 500 € » (GEO).
4. **Coûts de création société** : Moniteur « 200-350 € » vs « ~160 € » ; total « 2 000-3 000 € » vs « 2 000-4 500 € ».
5. **Délai dépôt ISOC** : « 7 mois » vs « 6 mois ».
6. **Réserve de liquidation** : 15 % vs 14,5 % vs 13,64 % (cf. D).
7. **BFR** : formule simplifiée vs complète ; seuil critique « > 30 jours » vs « > 2 mois de CA ».

---

## SECTION 4 — Zones non auditées (à faire ensuite si tu veux)
- **Logique de calcul des calculateurs** (le code, pas le texte) : `CalculateurBureau`, `BfrCalculator`, `RentabilityCockpit`, `CalculateurQuotite`, `GenerateurBail` — taux et pondérations codés en dur à vérifier.
- **`ChatBot.tsx`, `DiagnosticQuiz.tsx`** : seuils/chiffres non scannés.
- **Valeurs « année en cours »** (regroupées, pour ta validation annuelle) : majoration ISOC, salaire min dirigeant, coefficient de revalorisation, CO₂ réf ATN, tranche 50 % IPP, plafonds/minimum INASTI, déduction investissement, précompte location meublé, mesures réforme 2026.
