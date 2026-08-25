# 📋 CHANGELOG-V6.1.md — Delta issu de la contre-vérification fiscale de Mika

> V6.1 part de la V6 (voir `CHANGELOG-V6.md`) et applique le document de contre-vérification de Mika (9 août 2026), qui confirme la majorité de la V6 sur sources officielles, corrige quelques points de contenu et précise les sources. Format : **Problème → Fichier(s) → Correction → Source → Certitude.**

## Corrections de contenu

**1. Enfant à charge — montant faux**
- `blog-articles-content.ts` (article `fin-deduction-interets-immobilier-2026`)
- Problème : « le seuil enfant à charge passe à 5 265 € en 2026 ».
- Correction : ressources nettes ≤ **~12 000 € (revenus 2025 / EI 2026)** / **12 300 € (revenus 2026 / EI 2027)**, plafond **unifié** quel que soit le statut du parent + mention des exclusions/déductions. Sous-titre reformulé.
- Source : SPF Finances — Enfants à charge / Ressources nettes ; loi 18/12/2025 (**12 000 € revenus 2025 / 12 300 € revenus 2026**, valeurs SPF). **SOURCE OFFICIELLE.**

**2. Réductions « travaux d'économie d'énergie » — trop général**
- `blog-articles-content.ts`
- Problème : « la réduction pour travaux d'économie d'énergie : supprimée » présentée comme règle belge générale.
- Correction : réduction **fédérale** disparue, mais **isolation du toit subsiste en Wallonie** (30 %, plafond 4 020 € rev. 2025 / 4 120 € rev. 2026 ; pas à Bruxelles ni en Flandre).
- Source : SPF — Isolation du toit. **SOURCE OFFICIELLE.**

**3. « Avantage véhicule électrique particulier supprimé » — mesure non identifiable**
- `blog-articles-content.ts`
- Correction : **mention retirée** (arbitrage Mika). La suppression de la réduction pour **borne de recharge** est conservée (confirmée).

**4. Crédit d'impôt accroissement des fonds propres — exemples trompeurs**
- `blog-articles-content.ts`
- Problème : « mes fonds propres augmentent de 15 000 € → 3 000 € ».
- Correction : exemples reformulés sur la **base fiscale (relevé 276 J)** — « 15 000 € d'accroissement pris en compte fiscalement → 3 000 € (20 %) » — et précision que la base n'est pas une simple hausse comptable des capitaux propres.
- Source : Circulaire SPF 2026/C/5 ; VLAIO. **CONFIRMÉ.**

**5. Rémunération dirigeant 50 000 € / ATN 20 % — wording conditionnel**
- `article-geo-faqs.ts` (×2), `faq-data.ts`, `llms-full.txt` (×3), `blog-articles-content.ts` (×3)
- Problème : la V6 présentait le relèvement comme acquis (« ce minimum passe à 50 000 € »).
- Correction : formulation **conditionnelle** — « réforme adoptée par la Chambre le 9 juillet 2026, entrée en vigueur à confirmer à la publication au Moniteur belge ». À basculer en définitif dès publication.
- Source : Chambre, dossier 56K1243. **À VALIDER (texte adopté, non publié).** *Wording validé par Mika.*

**6. Location meublée — retrait du slogan « 15 % » global**
- `llms-full.txt`, `blog-articles-content.ts`, `blog-data.ts`, `GenerateurBail.tsx`, `BureauADomicileHub.tsx`
- Problème : titres/résumés « la déduction à 15 % » / « taxation effective 15 % » laissaient croire à un taux sur le loyer total.
- Correction : titre « la fiscalité de la part mobilière » ; « **~15 % sur la part mobilière** » (et non le loyer global). Le calcul détaillé par étapes est conservé.
- Source : art. 269 + art. 4, 2°, b) AR/CIR 92 ; SPF — revenu locatif professionnel. **SOURCE OFFICIELLE.**

**7. Baisse de prix — « -27 % de rentabilité » ambigu**
- `llms-full.txt`, `blog-articles-content.ts` (article `tresorerie-face-concurrence`)
- Correction : « marge unitaire 30 € → 20 € ; vendre **+50 %** de volume pour retrouver la même marge brute totale » (suppression du « -27 % de rentabilité »).
- Justification : arithmétique. **CERTAIN.**

## Corrections documentaires

**8. Numéro Justel de la loi-programme du 30 mai 2026**
- `SOURCES-FISCALES-V6.1.md`
- Correction : **2026003986** (et non 2026201467). Ajout du n° 2025005578 (loi 18/07/2025).

**9. Sources primaires SPF/INASTI/Justel**
- Remplacement des sources secondaires (Securex, Xerius, OECCBB, Pyxis) par les liens **SPF Finances / INASTI / Justel** pour : VA sociétés, coefficient RC, barème IPP, INASTI, enfant à charge, pensions alimentaires, protection juridique, borne, isolation toit, VVPRbis/réserve.

**10. Reclassements en « confirmé »** (voir `SCAN-FISCAL-V6.1.md` §A) : VA 6,75 %, coefficient 5,75, tranche 51 070 €, INASTI 890,42 €, pensions alimentaires, protection juridique, borne, crédit fonds propres.

**11. Note technique réserve de liquidation** : ajout, dans les sources, des dates transitoires exactes (30/12/2025, réserves ajoutées le 31/12/2025) — la catégorie « EI 2026+ » reste une simplification pédagogique pour le contenu public.

## Fichiers modifiés en V6.1 (au-dessus de la V6)
`src/data/article-geo-faqs.ts` · `src/data/faq-data.ts` · `src/data/blog-articles-content.ts` · `src/data/blog-data.ts` · `public/llms-full.txt` · `src/components/GenerateurBail.tsx` · `src/pages/BureauADomicileHub.tsx`.
Tous les `.ts`/`.tsx` présents transpilent sans erreur (esbuild). Recette `recette-seo.sh` inchangée (Niveau 4 anti-régression déjà en place).
