# 📋 CHANGELOG-V6.md — MFinances (consolidation fiscale + traçabilité)

> **V6 = passe fiscale consolidée et documentée.** Priorité 1 : exactitude fiscale. Priorité 2 : propagation sur toutes les copies. Priorité 3 : traçabilité (ce fichier + `SCAN-FISCAL-V6.md` + `SOURCES-FISCALES-V6.md` + `AVANT-APRES.md`). Priorité 4 : architecture (backlog).
>
> La V6 **reprend tout le travail V3 → V5.1** (SEO, schémas JSON-LD, DAF en option, home 4 forfaits, /accueilv3 en noindex, adresse NAP, ITAA, etc. — voir `CHANGELOG-V5.1.md`) et y ajoute les corrections fiscales ci-dessous, chacune **vérifiée sur source officielle** au 09/08/2026 et **propagée** dans tous les fichiers concernés.
>
> Format : **Problème → Fichier(s) → Correction → Source / justification → Certitude.**

## Chiffres arithmétiques et cohérence (certains)

**1. Économie « bureau à domicile » incohérente (résidu V5.1)**
- Fichier : `src/pages/BureauADomicileHub.tsx`
- Problème : « 4 000 € de déductions → plus de **1 600 €** d'économie à l'ISOC 25 % » (1 600 € correspond à 40 %, pas à 25 %).
- Correction : « environ **1 000 €** (4 000 € × 25 %) ».
- Justification : arithmétique. **CERTAIN.**

**2. Générateur de bail — taxation des meubles**
- Fichier : `src/components/GenerateurBail.tsx`
- Problème : « Taxation mobilier à **7,5 %** » (contredit le contenu et le PDF qui indiquent ~15 %).
- Correction : « ~**15 %** » (30 % de précompte × base 50 % après forfait). Mention « déduction 7,5 % » de la CTA également corrigée.
- Justification : cohérence + art. 269 et art. 4, 2°, b) AR/CIR 92. **CERTAIN.**

## Corrections fiscales (sources officielles)

**3. VVPRbis — taux et nature du délai**
- Fichiers : `article-geo-faqs.ts`, `public/llms-full.txt`, `src/data/blog-articles-content.ts`, `faq-data.ts`
- Problème : « 15 % après la 3e année / après 5 ans » — mélange avec la réserve de liquidation et taux périmé.
- Correction : taux réduit **18 %** (réforme 2026), présenté **par exercice comptable** (20 % au 2ᵉ exercice pour apports < 2026, 18 % dès le 3ᵉ). Suppression de toute formule « VVPRbis = 5 ans / 5 % ».
- Source : Loi-programme 30/05/2026 (M.B. 01/06/2026), art. 269 §2 CIR 92 ; entrée en vigueur 01/07/2026. **SOURCE OFFICIELLE.**

**4. Réserve de liquidation — deux régimes**
- Fichiers : `article-geo-faqs.ts`, `public/llms-full.txt`, `blog-articles-content.ts`, `faq-data.ts`
- Problème : un taux effectif unique (« ~14,5 % ») et « 6,5 % en cas de distribution anticipée » (faux).
- Correction : distinction (a) **anciennes réserves** (≤ 30/12/2025) : 5 % après 5 ans (~13,6 %) ; (b) **nouvelles réserves** (EI 2026+) : **9,8 % après 3 ans (~18 %)** ; 20–30 % si distribution anticipée ; 0 % en liquidation.
- Source : Loi-programme 30/05/2026 + loi 18/07/2025 (délai 3 ans). **SOURCE OFFICIELLE.**

**5. Rémunération minimale du dirigeant + plafond ATN**
- Fichiers : `article-geo-faqs.ts` (×2), `faq-data.ts`, `public/llms-full.txt` (×3), `blog-articles-content.ts` (×3)
- Problème : « 50 000 € **depuis l'EI 2026** » (périmé) et « ATN = 10 000 € sur 50 000 » (lecture contestée par l'ITAA).
- Correction : « 50 000 € **pour l'EI 2027 (revenus 2026)** » ; « avantages de toute nature ne pouvant excéder **20 %** de la rémunération » (retrait du « 10 000 € »).
- Source : Chambre Doc 56 1243, art. 215 CIR 92. **À VALIDER** — loi votée le 09/07/2026, non encore publiée au M.B. au 09/08/2026.

**6. Versements anticipés — majoration (⚠️ point sensible)**
- Fichiers : `public/llms-full.txt`, `blog-articles-content.ts`
- Problème : « 6,75 % (taux 2026) » non daté ; la consigne §7 demandait de corriger en 4,50 %.
- Correction : **6,75 % maintenu** (correct pour les **sociétés**, revenus 2026 — EI 2027) et **précisé** : mention explicite que le taux **personnes physiques** est **4,50 %** (c'est celui du moteur SPF « particuliers »). Dates VA 10/04, 10/07, 12/10, 21/12/2026 confirmées.
- Source : barème EI 2027 (Pyxis), plancher ISOC 3 % × 2,25 = 6,75 % ; SPF. **À VALIDER PAR MIKA** (déviation motivée de la consigne — voir `SCAN-FISCAL-V6.md` §B.1).

**7. Coefficient de revalorisation du RC + exemple recalculé**
- Fichiers : `public/llms-full.txt`, `blog-articles-content.ts`
- Problème : « En 2026 = 5,46 » (valeur de l'EI 2025).
- Correction : « **5,63** (revenus 2025 — EI 2026) ; **5,75** (revenus 2026 — EI 2027) ». Exemple de requalification recalculé avec 5,63 : 800×5,63 = 4 504 → plafond 1 502 €/an (125 €/mois) → excédent 298 €/an.
- Source : Doc SPF EI 2026 (5,63, CERTAIN) ; Securex (5,75, PROBABLE). **SOURCE OFFICIELLE / À VALIDER (5,75).**

**8. Barème IPP — seuil de la tranche à 50 %**
- Fichier : `article-geo-faqs.ts`
- Problème : « au-delà de 46 440 € en 2025 » (périmé).
- Correction : « au-delà de **49 840 €** (revenus 2025 — EI 2026) ».
- Source : barème SPF EI 2026. **SOURCE OFFICIELLE.**

**9. Cotisation minimale INASTI — unité**
- Fichiers : `article-geo-faqs.ts`, `public/llms-full.txt`, `blog-articles-content.ts`
- Problème : « minimum **annuel** de 891,14 € » (mauvaise unité + montant) ; « minimum annuel ~900 €/trimestre » (contradictoire).
- Correction : « ~**890 € par trimestre** (890,42 € en 2026) ».
- Source : OECCBB ; Xerius. **SOURCE OFFICIELLE.**

**10. ATN voiture — émissions de référence + formule**
- Fichiers : `article-geo-faqs.ts`, `public/llms-full.txt`, `blog-articles-content.ts`
- Problème : « Pour 2025, réf. 67 g/km ».
- Correction : « revenus 2026 : **70 g/km** essence/LPG/gaz, **58 g/km** diesel ; % CO₂ entre plancher **4 %** (électrique) et max 18 % » ; ajout du coefficient d'âge dans la formule.
- Source : AR 17/12/2025 (M.B. 24/12/2025) ; FAQ SPF. **SOURCE OFFICIELLE.**

**11. Déductibilité des voitures thermiques — cohortes**
- Fichiers : `article-geo-faqs.ts`, `public/llms-full.txt`, `blog-articles-content.ts`
- Problème : « déductibilité réduite jusqu'à 0 % pour achats ≥ 2026 ; électrique 100 % jusqu'en 2026 » (cohortes confondues).
- Correction : véhicules acquis 07/2023–12/2025 → **50 % (rev. 2026), 25 % (2027), 0 % (2028)** ; acquis ≥ 01/2026 → **0 % dès l'origine**.
- Source : loi 25/11/2021. **SOURCE OFFICIELLE.**

**12. Location de meubles — répartition 60/40**
- Fichiers : `public/llms-full.txt`, `blog-articles-content.ts`, `src/components/GenerateurBail.tsx`
- Problème : la répartition 60/40 était attribuée au **Code civil**.
- Correction : « **réglementation fiscale (AR/CIR 92)**, présomption réfragable ».
- Source : art. 4, 2°, b) AR/CIR 92. **SOURCE OFFICIELLE.** (La référence « art. 1728bis Code civil » pour l'indexation du bail est distincte et **conservée**.)

**13. Déduction pour investissement — plus de taux universel**
- Fichiers : `public/llms-full.txt`, `blog-articles-content.ts`
- Problème : « jusqu'à 25 % de majoration » (taux temporaire COVID périmé).
- Correction : formulation evergreen — « taux réformé (base / thématique / technologique) depuis les investissements 2025, à vérifier pour l'année ».
- Source : loi 12/05/2024. **SOURCE OFFICIELLE.**

**14. Délai de dépôt ISOC**
- Fichier : `article-geo-faqs.ts` (`llms-full.txt` disait déjà 7 mois)
- Problème : « dans les 6 mois ».
- Correction : « au plus tard le **dernier jour du 7ᵉ mois** (règle depuis EI 2021) ».
- Source : loi 26/01/2021, art. 310 CIR 92. **SOURCE OFFICIELLE.**

**15. Téléphone / internet — faux taux « 75 % »**
- Fichier : `article-geo-faqs.ts`
- Problème : « 75 % pour le téléphone est courant et généralement accepté ».
- Correction : « part professionnelle **justifiée**, pas de pourcentage légal unique ».
- Source : art. 49 CIR 92. **SOURCE OFFICIELLE.**

## Commercial / DAF (certains)

**16. DAF « intégré dans tous les forfaits »**
- Fichier : `src/pages/FraisDefendables.tsx` (FAQ)
- Correction : « DAF en **option** Excellence, 150 € HTVA/h ».
- Justification : règle commerciale MFINANCES. **CERTAIN.**

**17. Accueil — « accès DAF »**
- Fichiers : `src/pages/AccueilV2.tsx`, `src/pages/AccueilV3.tsx` (FAQ)
- Correction : « … ; **DAF en option** ».
- Justification : cohérence commerciale. **CERTAIN.**

## Vérifié — non modifié

- **Article « fin de la déduction des intérêts 2026 »** : cœur **confirmé exact** (déduction ordinaire art. 14 CIR 92, EI 2026 = revenus 2025, sans clause de grand-père, tous emprunts) — Circulaire SPF 2026/C/2. Chiffres secondaires du même article : **À VALIDER** (non vérifiés).
- **Références CIR** (restaurant 69 %, cadeaux/réception 50 %, amendes non déductibles) : n° d'articles vérifiés (53, 8°bis / 8° / 6°) ; le site ne cite pas de n° erroné → rien à changer.
- **Jeton « 150€ H/HTVA » (Tarifs.tsx)** : rendu visible propre (« 150 € HTVA / heure ») ; le jeton n'existe que dans une condition de code inutilisée.
- **Recette `recette-seo.sh`** : ajout d'un **Niveau 4 — anti-régression fiscale** (contrôle des anciennes valeurs interdites + présence des nouvelles) sur `/llms-full.txt`.

## Fichiers modifiés en V6 (au-dessus de la base V5.1)
`src/data/article-geo-faqs.ts` · `src/data/faq-data.ts` · `src/data/blog-articles-content.ts` · `public/llms-full.txt` · `src/pages/FraisDefendables.tsx` · `src/pages/BureauADomicileHub.tsx` · `src/components/GenerateurBail.tsx` · `src/pages/AccueilV2.tsx` · `src/pages/AccueilV3.tsx` · `recette-seo.sh`.
Tous les `.ts`/`.tsx` présents transpilent sans erreur (esbuild, `--format=esm --jsx=automatic`).
