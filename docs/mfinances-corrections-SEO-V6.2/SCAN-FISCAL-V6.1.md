# 🔎 SCAN-FISCAL-V6.1.md — Matrice de contrôle (mise à jour après contre-vérification Mika)

> V6.1 = V6 + intégration de la contre-vérification de Mika (sources officielles SPF/INASTI/Justel). Détail des sources : **SOURCES-FISCALES-V6.1.md**. Statuts : `CONFIRMÉ — SOURCE OFFICIELLE` · `CORRIGÉ — SOURCE OFFICIELLE` · `CORRIGÉ — CERTAIN` · `À VALIDER PAR MIKA` · `NON MODIFIÉ — DÉJÀ CORRECT`.

## A. Points RECLASSÉS en confirmé (étaient « à valider » en V6)

| Point | Ancien statut V6 | Nouveau statut V6.1 | Valeur retenue |
|---|---|---|---|
| Majoration VA **ISOC 6,75 %** (rev. 2026 / EI 2027) | À VALIDER (déviation §7) | **CONFIRMÉ — SOURCE OFFICIELLE** | 6,75 % sociétés ; 4,50 % personnes physiques. Mika a rectifié son commentaire « 4,50 % ». |
| Coefficient revalorisation **5,75** (rev. 2026 / EI 2027) | À VALIDER (probable) | **CONFIRMÉ — SOURCE OFFICIELLE** | 5,63 (rev. 2025) / 5,75 (rev. 2026) ; indexation RC 2,2446 / 2,3000 |
| Tranche IPP 50 % **51 070 €** (rev. 2026) | Probable (non utilisé) | **CONFIRMÉ — SOURCE OFFICIELLE** | 49 840 € (rev. 2025, utilisé) / 51 070 € (rev. 2026) |
| **INASTI 890,42 €/trimestre** | SOURCE OFFICIELLE (OECCBB) | **CONFIRMÉ — source primaire INASTI** | 890,42 €/trim. sur base 17 374,08 € |
| Pensions alimentaires 70/60/50 % | À VALIDER | **CONFIRMÉ — SOURCE OFFICIELLE** | 70 % (2025), 60 % (2026), 50 % (dès 2027) |
| Assurance protection juridique supprimée | À VALIDER | **CONFIRMÉ — SOURCE OFFICIELLE** | dès EI 2026 |
| Borne de recharge supprimée | À VALIDER | **CONFIRMÉ — SOURCE OFFICIELLE** | dès EI 2026 (dépenses ≤ 31/08/2024) |
| Crédit fonds propres 20 % / 7 500 € / remboursable | À VALIDER | **CONFIRMÉ** (exemples reformulés, base 276 J) | Circ. 2026/C/5 |

## B. Nouvelles corrections V6.1 (issues de la contre-vérification)

| Fichier(s) | Page | Ancienne affirmation | Nouvelle affirmation | Statut | Année / EI |
|---|---|---|---|---|---|
| blog-articles-content.ts | fin-deduction-interets | « le seuil enfant à charge passe à **5 265 €** » | « ressources nettes ≤ **~12 000 € (rev. 2025)** / **12 300 € (rev. 2026)**, unifié ; calcul avec exclusions/déductions » | **CORRIGÉ — SOURCE OFFICIELLE** | 2025 / 2026 |
| blog-articles-content.ts | fin-deduction-interets | « réduction travaux d'économie d'énergie : **supprimée** » (général) | « réduction fédérale disparue ; **isolation du toit subsiste en Wallonie** (30 %, 4 020/4 120 €), pas à Bruxelles ni en Flandre » | **CORRIGÉ — SOURCE OFFICIELLE** | 2025 / 2026 |
| blog-articles-content.ts | fin-deduction-interets | « l'avantage sur le **véhicule électrique particulier** … supprimé » | **mention retirée** (mesure non identifiable) — borne de recharge conservée | **RETIRÉ** (arbitrage Mika) | — |
| blog-articles-content.ts | fin-deduction-interets | exemples fonds propres « 15 000 € → 3 000 € » | « 15 000 € d'accroissement **pris en compte fiscalement (relevé 276 J)** → 3 000 € (20 %) » + précision base | **CORRIGÉ — SOURCE OFFICIELLE** | — |
| article-geo-faqs.ts · faq-data.ts · llms-full.txt · blog-articles-content.ts | rémunération / ISOC | « ce minimum **passe** à 50 000 € (EI 2027) » (assertif) | « réforme **adoptée le 9/07/2026**, entrée en vigueur **à confirmer à la publication** » (conditionnel) | **À VALIDER — TEXTE ADOPTÉ NON PUBLIÉ** | 2026 / 2027 |
| llms-full.txt · blog-articles-content.ts · blog-data.ts · GenerateurBail.tsx · BureauADomicileHub.tsx | louer-meubles | titres/slogans « **déduction / taxation à 15 %** » (global) | « **~15 % sur la part mobilière** » ; titre « la fiscalité de la part mobilière » | **CORRIGÉ — SOURCE OFFICIELLE** | — |
| llms-full.txt · blog-articles-content.ts | tresorerie-face-concurrence | « marge tombe à 22 % — **baisse de 27 % de rentabilité** » (ambigu) | « marge unitaire 30 € → 20 € ; vendre **+50 %** de volume pour la même marge brute » | **CORRIGÉ — CERTAIN** | — |
| SOURCES-FISCALES | loi-programme 30/05/2026 | n° Justel **2026201467** | **2026003986** | **CORRIGÉ** | — |

## C. Reste « À VALIDER PAR MIKA »

1. **Rémunération dirigeant 50 000 € / ATN 20 %** : présenté en **conditionnel** (réforme adoptée le 9/07/2026, publication M.B. non localisée au 09/08/2026). À basculer en définitif dès publication. *Mika a validé ce wording conditionnel.*
2. **Exemple « location du dirigeant à sa propre société »** : briques de calcul documentées, mais la qualification exacte (ventilation, requalification) dépend du contrat → prudence, pas de slogan « 15 % ». *Mika a validé cette approche.*

## D. NON MODIFIÉ — DÉJÀ CORRECT (rappel, confirmé par Mika)

VVPRbis 18 % · réserve 9,8 %/3 ans (dates transitoires précisées en note) · dates VA 10/04-10/07-12/10-21/12 · ATN plancher 4 % / min 1 690 € · déductibilité auto par cohorte · déduction investissement sans taux universel · délai ISOC 7ᵉ mois · téléphone sans « 75 % » · références CIR 53 8°bis/8°/6° · cœur « fin déduction intérêts » (Circ. 2026/C/2).

## E. BACKLOG (inchangé, non bloquant)
H1 visible (§31) · JSON-LD Article image/author.url/dateModified (§32) · `fiscal-constants.ts` (§28) · générateur `llms-full.txt` (§29).
