# 📋 CHANGELOG-V6.2.md — Correctifs ciblés (revue Mika sur la V6.1)

> V6.2 = petite passe de consolidation demandée après revue de la V6.1. **Aucun nouveau chantier fiscal, aucun changement de design.** On corrige 4 reliquats (dont 2 FAQ GEO visibles + injectées en JSON-LD FAQPage), on resynchronise `llms-full.txt`, on assainit un fichier dormant, et on renforce l'anti-régression. Format : **Problème → Fichier(s) → Correction → Source → Certitude.**

## Reliquats corrigés

**1. VVPRbis encore à 15 % dans une FAQ GEO active (le plus important)**
- `src/data/article-geo-faqs.ts` (article `srl-vs-independant-belgique`) — ces FAQ sont **affichées** (bloc « Réponses directes » via `getArticleGeoFaqs()` dans `BlogArticle.tsx`) et injectées dans le **JSON-LD FAQPage**.
- Problème : « la possibilité de distribuer des dividendes via VVPRbis à **15 %** de précompte ».
- Correction : « la possibilité de bénéficier d'un **précompte mobilier réduit** sur les dividendes via le régime VVPRbis, **sous conditions** » (le détail 18 % / régime 2026 est expliqué dans l'article dédié).
- Source : loi-programme 30/05/2026, art. 269 §2 CIR 92. **CORRIGÉ — SOURCE OFFICIELLE.**

**2. FAQ GEO : « capital minimum légal de la SRL est de 1 € »**
- `src/data/article-geo-faqs.ts` (article `creer-srl-belgique-2026`, FAQ visible + JSON-LD).
- Problème : la SRL n'a **pas** de capital minimum légal ; « 1 € » est incorrect.
- Correction : « Depuis le CSA (2019), **aucun capital minimum légal** n'est exigé ; les fondateurs doivent prévoir des **apports et un patrimoine initial suffisants**, justifiés par le plan financier (2 premières années) ». La formule « **sous-capitaliser la société** » (autre FAQ) devient « **prévoir des moyens de départ insuffisants** ».
- Source : Code des Sociétés et des Associations (CSA), 2019. **CORRIGÉ — SOURCE OFFICIELLE.**

**3. `llms-full.txt` désynchronisé de l'article (capital SRL)**
- `public/llms-full.txt` (article `erreurs-creation-societe-belgique`, « Erreur 2 »).
- Problème : `llms-full.txt` gardait « le capital minimum légal d'1 € est insuffisant — un capital réel de 15 000 à 25 000 € est recommandé », alors que l'article source (`blog-articles-content.ts`) était déjà corrigé. **Preuve concrète que la synchronisation manuelle a divergé.**
- Correction : reprise **exacte** de la version de l'article (« La SRL n'a plus de capital minimum légal depuis le CSA (2019)… moyens de départ suffisants… »).
- **CORRIGÉ — CERTAIN (resync).**

**4. `faq-data.ts` (fichier dormant) — ancien discours DAF + prix**
- `src/data/faq-data.ts` (actuellement non importé, mais assaini pour éviter une résurgence future).
- Corrections : DAF « inclus dans le forfait Excellence » → **option Excellence 150 € HTVA/h, non incluse** (3 occurrences) ; « les forfaits commencent à **350 €** » → « **275 €** (Basic) » ; « les deux fonctions sont intégrées » → « complémentaires ».
- **CORRIGÉ — CERTAIN (règle commerciale MFINANCES).**

## Corrections documentaires & garde-fous

**5. `CHANGELOG-V6.1.md`** — suppression de la référence secondaire « Attentia 12 020 € » ; seule la valeur officielle SPF **12 000 € (revenus 2025)** / 12 300 € (revenus 2026) est conservée (règle : ne pas ajouter une source secondaire divergente quand la source SPF existe).

**6. `recette-seo.sh` — nouveau Niveau 0 (anti-régression SOURCE, pré-déploiement)** : lancé depuis le dossier livré (présence de `fichiers-finaux/`), il vérifie l'absence, dans les fichiers source, de : « à 15 % de précompte », « VVPRbis à 15 % », « capital minimum légal de la SRL est de 1 », « capital minimum légal d'1 € », « sous-capitaliser la société », « inclus dans le forfait Excellence », « inclut le DAF externalisé », « forfaits commencent à 350 », « 5 265 », « 891,14 », « véhicule électrique particulier », « professionnelle professionnelle ». La formulation historique « **taux relevé de 15 % à 18 %** » reste autorisée (contrôle contextuel). Le Niveau 4 (servi) reçoit en plus l'absence de « capital minimum légal d'1 € ».

**7. `SCAN-FISCAL-V6.2.md` et `AVANT-APRES.md`** mis à jour (voir ces fichiers).

## Note d'architecture (rappel backlog)
La divergence article ↔ `llms-full.txt` du point 3 confirme le risque : à terme, **générer `llms-full.txt` depuis `blog-articles-content.ts`** ou, a minima, conserver le contrôle automatique (Niveau 0/4) comme garde-fou. Non bloquant pour V6.2.

## Fichiers modifiés en V6.2
`src/data/article-geo-faqs.ts` · `src/data/faq-data.ts` · `public/llms-full.txt` · `recette-seo.sh` · docs. Tous les `.ts`/`.tsx` présents transpilent sans erreur (esbuild).
