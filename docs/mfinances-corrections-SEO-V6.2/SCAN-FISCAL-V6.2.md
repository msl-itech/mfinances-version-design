# 🔎 SCAN-FISCAL-V6.2.md — Écarts trouvés à la revue V6.1 et corrigés

> Complément à `SCAN-FISCAL-V6.1.md`. La revue de Mika a montré que le verdict V6.1 « NON MODIFIÉ — DÉJÀ CORRECT » était **trop optimiste** sur 4 points : ils viennent d'être corrigés en V6.2. Le reste de la matrice V6.1 reste valable.

## Écarts détectés puis corrigés

| Fichier(s) | Page / contexte | Ancienne affirmation | Nouvelle affirmation | Statut V6.2 | Source |
|---|---|---|---|---|---|
| `article-geo-faqs.ts` | FAQ GEO `srl-vs-independant` (**visible + JSON-LD FAQPage**) | « dividendes via VVPRbis **à 15 %** de précompte » | « précompte mobilier **réduit** via VVPRbis, **sous conditions** » | **CORRIGÉ — SOURCE OFFICIELLE** | loi-progr. 30/05/2026, art. 269 §2 |
| `article-geo-faqs.ts` | FAQ GEO `creer-srl-belgique-2026` (**visible + JSON-LD**) | « le capital minimum légal de la SRL est de **1 €** » | « **aucun capital minimum légal** (CSA 2019) ; moyens/patrimoine initial suffisants, plan financier » | **CORRIGÉ — SOURCE OFFICIELLE** | CSA 2019 |
| `article-geo-faqs.ts` | FAQ `erreurs-creation` | « **sous-capitaliser** la société » | « prévoir des **moyens de départ insuffisants** » | **CORRIGÉ — CERTAIN** | CSA 2019 |
| `public/llms-full.txt` | article `erreurs-creation` (Erreur 2) | « capital minimum légal **d'1 €** insuffisant — 15 000 à 25 000 € recommandé » | resync **exact** avec l'article : « plus de capital minimum légal depuis le CSA (2019)… » | **CORRIGÉ — CERTAIN (resync)** | source éditoriale `blog-articles-content.ts` |
| `faq-data.ts` (dormant) | DAF / tarifs | « DAF **inclus** dans Excellence » (×3) ; « forfaits commencent à **350 €** » | « DAF **option** 150 €/h, non inclus » ; « **275 €** (Basic) » | **CORRIGÉ — CERTAIN** | règle commerciale MFINANCES |

## Point d'architecture confirmé
La divergence `article` ↔ `llms-full.txt` (ligne ci-dessus) **prouve** que la synchronisation manuelle peut diverger. Garde-fou ajouté : **Niveau 0** (anti-régression source) dans `recette-seo.sh`. Recommandation backlog maintenue : générer `llms-full.txt` depuis la source, ou conserver ce contrôle automatique.

## Statuts inchangés
Tous les autres points de `SCAN-FISCAL-V6.1.md` restent valables (VA 6,75 %, VVPRbis 18 %, réserve 9,8 %, coefficient 5,63/5,75, tranche IPP, INASTI 890,42 €, ATN, enfant à charge 12 000/12 300 €, etc.). Les 2 points « à valider » restent : **rémunération dirigeant 50 000 €/ATN 20 %** (texte adopté, publication à confirmer) et **exemple location dirigeant → sa société** (qualification selon contrat).

## Verdict V6.2
Les 4 reliquats étaient petits et très ciblés — désormais corrigés, avec garde-fous anti-régression. **GO POUR REVUE FINALE MIKA**, puis, sous réserve d'un dernier contrôle rapide du ZIP V6.2, **GO webmaster** (le seul point qui reste en veille est la publication au Moniteur de la réforme « rémunération dirigeant »).
