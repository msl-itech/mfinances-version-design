# 🔎 SCAN-FISCAL-V6.md — Matrice de contrôle des affirmations fiscales/chiffrées

> Une correction n'est jamais transformée en certitude sans preuve. Statuts : `CORRIGÉ — CERTAIN` · `CORRIGÉ — SOURCE OFFICIELLE` · `À VALIDER PAR MIKA` · `NON MODIFIÉ — PREUVE INSUFFISANTE` · `NON MODIFIÉ — DÉJÀ CORRECT` · `BACKLOG`.
> Détail des sources : voir **SOURCES-FISCALES-V6.md**. Fichiers miroirs : `blog-articles-content.ts` ↔ `public/llms-full.txt` (corrigés ensemble).

## A. Matrice principale

| Fichier(s) | Article / page | Ancienne affirmation | Nouvelle affirmation | Statut | Source | Année revenus | Exercice imp. |
|---|---|---|---|---|---|---|---|
| blog-articles-content.ts · llms-full.txt · article-geo-faqs.ts · faq-data.ts | VVPRbis | « 20 % la 2e année puis 15 % après 5 ans » | « 20 % au 2ᵉ exercice (apports < 2026), 18 % dès le 3ᵉ exercice ; par exercice, pas 5 ans » | CORRIGÉ — SOURCE OFFICIELLE | Loi-progr. 30/05/2026, art. 269 §2 CIR 92 | distrib. dès 01/07/2026 | selon attribution |
| article-geo-faqs.ts · llms-full.txt · blog-articles-content.ts | Réserve de liquidation | « 5 % après 5 ans, ~14,5 % au total » (valeur unique) | Régimes distingués : anciennes réserves 5 %/5 ans (~13,6 %) ; nouvelles réserves **9,8 %/3 ans (~18 %)** | CORRIGÉ — SOURCE OFFICIELLE | Loi-progr. 30/05/2026 + loi 18/07/2025 | — | nouvelles = EI 2026+ |
| article-geo-faqs.ts · faq-data.ts · llms-full.txt · blog-articles-content.ts | Rémunération min. dirigeant | « 50 000 € depuis l'**EI 2026** ; ATN = 10 000 € sur 50 000 » | « 50 000 € pour l'**EI 2027 (revenus 2026)** ; ATN ne pouvant excéder 20 % de la rémunération » | **À VALIDER PAR MIKA** (loi votée 09/07/2026, non encore publiée au M.B.) | Chambre Doc 56 1243, art. 215 CIR 92 | 2026 | **2027** |
| llms-full.txt · blog-articles-content.ts | Déclaration ISOC — majoration VA | « 6,75 % (taux 2026) » | « 6,75 % pour les **sociétés** (revenus 2026 — EI 2027) ; le taux **personnes physiques** est 4,50 % » | **À VALIDER PAR MIKA** — ⚠️ **déviation de la consigne §7** (voir §B) | Barème EI 2027 (Pyxis) + moteur SPF | 2026 | 2027 |
| article-geo-faqs.ts · llms-full.txt · blog-articles-content.ts | Dates VA | (V5.1 : 10 oct / 20 déc) | 10/04, 10/07, **12/10**, **21/12/2026** | NON MODIFIÉ — DÉJÀ CORRECT (reconfirmé) | SPF / Pyxis | 2026 | 2027 |
| llms-full.txt · blog-articles-content.ts | Requalification loyer — coefficient | « En 2026, il s'établit à **5,46** » | « **5,63** (revenus 2025 — EI 2026) ; **5,75** (revenus 2026 — EI 2027) » | CORRIGÉ — SOURCE OFFICIELLE (5,63) ; **À VALIDER** (5,75) | Doc SPF EI 2026 ; Securex | 2025 / 2026 | 2026 / 2027 |
| llms-full.txt · blog-articles-content.ts | Requalification — exemple chiffré | « 800×5,46=4 368 → plafond 1 457 → excédent 343 » | « 800×5,63=4 504 → plafond 1 502 → excédent 298 » | CORRIGÉ — CERTAIN (arithmétique) | calcul | 2025 | 2026 |
| article-geo-faqs.ts | Combien me payer — tranche IPP 50 % | « au-delà de **46 440 €** en 2025 » | « au-delà de **49 840 €** (revenus 2025 — EI 2026) » | CORRIGÉ — SOURCE OFFICIELLE | Barème SPF EI 2026 | 2025 | 2026 |
| article-geo-faqs.ts · llms-full.txt · blog-articles-content.ts | INASTI minimum | « minimum **annuel** de **891,14 €** » / « minimum annuel ~900 €/trimestre » | « ~**890 € par trimestre** (890,42 € en 2026) » | CORRIGÉ — SOURCE OFFICIELLE (unité) | OECCBB / Xerius | 2026 | — |
| article-geo-faqs.ts · llms-full.txt · blog-articles-content.ts | Voiture — ATN réf. CO₂ | « Pour 2025, réf. **67 g/km** » | « revenus 2026 : **70 g/km** essence, **58 g/km** diesel ; plancher 4 %, max 18 % » | CORRIGÉ — SOURCE OFFICIELLE | AR 17/12/2025 ; SPF | 2026 | 2027 |
| article-geo-faqs.ts · llms-full.txt · blog-articles-content.ts | Voiture — déductibilité thermique | « réduite jusqu'à 0 % pour achats ≥ 2026 ; électrique 100 % jusqu'en 2026 » | Cohortes datées : acquis 07/2023–12/2025 → 50 % (rev. 2026), 25 % (2027), 0 % (2028) ; acquis ≥ 01/2026 → 0 % | CORRIGÉ — SOURCE OFFICIELLE | Loi 25/11/2021 | 2026-2028 | 2027-2029 |
| llms-full.txt · blog-articles-content.ts | Voiture — plancher 4 % électrique | (déjà « plancher 4 % ») | inchangé | NON MODIFIÉ — DÉJÀ CORRECT (confirmé) | SPF | 2026 | 2027 |
| llms-full.txt · blog-articles-content.ts · GenerateurBail.tsx | Louer ses meubles — 60/40 | « le **Code civil** prévoit 60/40 » | « la **réglementation fiscale (AR/CIR 92)**, présomption réfragable » | CORRIGÉ — SOURCE OFFICIELLE | art. 4, 2°, b) AR/CIR 92 | — | — |
| GenerateurBail.tsx | Générateur de bail — taxation meubles | « Taxation mobilier à **7,5 %** » | « ~**15 %** » (30 % × base 50 %) | CORRIGÉ — CERTAIN (cohérence avec le PDF et le contenu) | art. 269 + 4, 2°, b) | — | — |
| llms-full.txt · blog-articles-content.ts | Je paye trop — déduction investissement | « jusqu'à **25 %** de majoration » | « taux réformé (base/thématique/technologique), à vérifier pour l'année de l'investissement » | CORRIGÉ — SOURCE OFFICIELLE | Loi 12/05/2024 | ≥ 2025 | — |
| article-geo-faqs.ts | Déclaration ISOC — délai | « dans les **6 mois** » | « au plus tard le dernier jour du **7ᵉ mois** (depuis EI 2021) » | CORRIGÉ — SOURCE OFFICIELLE | Loi 26/01/2021, art. 310 CIR 92 | — | — |
| article-geo-faqs.ts | Frais mixtes — téléphone | « **75 %** courant et généralement accepté » | « part professionnelle **justifiée**, pas de pourcentage légal unique » | CORRIGÉ — SOURCE OFFICIELLE | art. 49 CIR 92 | — | — |
| FraisDefendables.tsx | FAQ Frais défendables — DAF | « DAF **intégré dans tous les forfaits** » | « DAF en **option** Excellence, 150 € HTVA/h » | CORRIGÉ — CERTAIN (règle commerciale) | MFINANCES | — | — |
| AccueilV2.tsx · AccueilV3.tsx | FAQ accueil — DAF | « Excellence … et **accès DAF** » | « … ; **DAF en option** » | CORRIGÉ — CERTAIN | MFINANCES | — | — |
| BureauADomicileHub.tsx | Hub bureau à domicile | « plus de **1 600 €** d'économie à l'ISOC 25 % » | « environ **1 000 €** (4 000 € × 25 %) » | CORRIGÉ — CERTAIN (arithmétique) | calcul | — | — |
| blog-articles-content.ts · llms-full.txt | Fin déduction intérêts 2026 (cœur) | « supprimée à l'EI 2026 (revenus 2025), sans grand-père, tous emprunts » | inchangé | NON MODIFIÉ — DÉJÀ CORRECT (confirmé) | Circulaire SPF 2026/C/2 ; loi 18/12/2025 | 2025 | 2026 |
| blog-articles-content.ts · llms-full.txt | Fin déduction intérêts — chiffres secondaires | rentes 70/60/50 %, enfant à charge 5 265 €, crédit fonds propres 20 %/7 500 €, suppressions énergie/protection juridique/borne | inchangé | **À VALIDER PAR MIKA** (non vérifié cette passe) | — | 2025-2027 | 2026-2028 |
| (site) | Frais restaurant/cadeaux/amendes | « restaurant 69 % » (sans n° d'article erroné) | inchangé | NON MODIFIÉ — DÉJÀ CORRECT (art. vérifiés) | art. 53 8°bis / 8° / 6° CIR 92 | — | — |
| Tarifs.tsx | Grille tarifs — jeton « 150€ H/HTVA » | rendu visible | « 150 € HTVA / heure » (propre ; le jeton n'existe qu'en condition de code morte) | NON MODIFIÉ — DÉJÀ CORRECT (rendu conforme) | — | — | — |
| (V5.1, revérifié) | Arithmétique déjà corrigée | volume +36 %, BFR 2,9 mois, cuisine 25 %, CalculateurBureau 1 600 €, « professionnelle professionnelle », « 30%2 » | +50 %, 0,95 mois, 37,5 %, 1 000 €, corrigés | NON MODIFIÉ — DÉJÀ CORRECT (0 résidu confirmé) | calcul | — | — |

## B. Points REFUSÉS ou À VALIDER (ne pas deviner)

1. **Majoration VA — consigne §7 non appliquée telle quelle.** La consigne demandait « corriger 6,75 % → 4,50 % pour revenus 2026 ». La vérification officielle montre que **les deux taux coexistent à l'EI 2027** : **6,75 % pour les sociétés (ISOC)**, **4,50 % pour les personnes physiques**. Le moteur SPF que Mika a consulté est dans l'espace *Particuliers* → il affiche logiquement 4,50 %. Comme l'article du site parle explicitement d'une « **ISOC** de 20 000 € », **6,75 % est le taux correct** : je l'ai **maintenu** et **précisé** (mention des deux taux). → **À VALIDER PAR MIKA.** Si Mika confirme que l'article doit rester un contenu « sociétés », c'est terminé ; s'il veut un exemple « personnes physiques », il faudra un second exemple à 4,50 %.
2. **Rémunération dirigeant 50 000 € / ATN 20 % (EI 2027).** Loi **votée le 09/07/2026 mais non encore publiée au Moniteur** au 09/08/2026. Contenu quasi figé → appliqué avec datation EI 2027, mais **statut À VALIDER** jusqu'à publication. Le montant exact « 50 000 € » est la valeur indexée largement relayée (base légale 25 000 € indexée).
3. **Coefficient 5,75 (revenus 2026 — EI 2027)** : PROBABLE (pas de publication SPF/M.B. « EI 2027 » localisée). Utilisé uniquement en mention ; l'exemple chiffré repose sur **5,63 (CERTAIN)**.
4. **Chiffres secondaires de l'article « fin déduction intérêts »** (rentes alimentaires, seuil enfant à charge, crédit fonds propres, suppressions diverses) : non vérifiés → **À VALIDER**.
5. **Seuil IPP 51 070 € (revenus 2026 — EI 2027)** et **« 48 320 € »** proposés : non appliqués (le site utilise 49 840 €, CERTAIN pour revenus 2025).

## C. BACKLOG (non bloquant pour la V6 — §28/§29/§31/§32)

- **H1 visible** en page d'accueil (aujourd'hui `sr-only` + titre commercial en H2). Recommandation : H1 visible et naturel. *Aucun changement de hero dans cette passe (risque design).*
- **JSON-LD Article** : enrichir `image`, `author.url`, `dateModified` (47 articles). Ne pas improviser dates/images.
- **`src/data/fiscal-constants.ts`** : centraliser les constantes fiscales des calculateurs (sans forcer des valeurs non comparables). À faire dans un chantier dédié.
- **Générateur `llms-full.txt`** depuis `blog-articles-content.ts` : à mettre en place de façon déterministe et testée (sinon synchronisation manuelle, comme en V6). Le contrôle anti-régression (Niveau 4 de la recette) sert de garde-fou en attendant.
