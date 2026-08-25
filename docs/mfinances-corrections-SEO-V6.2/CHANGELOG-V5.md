# CHANGELOG — V5 (consolidation post-revue)

**V5 = version finale consolidée**, produite après une relecture critique. Objectif : **une seule source de vérité** pour l'offre (surtout le DAF), zéro contradiction entre les surfaces, et une recette qui contrôle aussi les **règles métier**. Supersede la V4.

## Phrase source de vérité — DAF (appliquée partout)
> Le forfait **Excellence** inclut le **contrôle de gestion mensuel** et la **trésorerie prévisionnelle mensuelle**. Le **DAF à temps partiel** est une **option réservée aux clients Excellence, facturée 150 € HTVA/heure** selon le temps réellement presté.

## 1. Règle DAF unifiée (🔴 priorité)
Toutes les formulations laissant croire que le DAF est « inclus » ou « dans tous les forfaits » ont été corrigées :
- `public/llms.txt` : « …DAF à temps partiel dans tous ses forfaits » → DAF présenté comme **option Excellence 150 €/h**.
- `src/pages/AccueilV2.tsx` + `AccueilV3.tsx` (FAQ) : « …DAF externalisé … intégrés dans les forfaits » → **DAF en option (150 €/h, Excellence)**.
- `src/pages/Tresorerie.tsx` (FAQ) : « …le contrôle de gestion **et un DAF externalisé** » → trésorerie mensuelle incluse, **DAF en option**.
- `src/pages/ControleDeGestion.tsx` (tableau) : DAF **plus « À la demande » en Premium** → **non disponible en Premium** (réservé Excellence).
- `src/pages/DafExternalise.tsx` : phrase ambiguë « inclus dans les disponibilités mensuelles… » → **« aucune enveloppe forfaitaire : facturé au temps presté, en supplément du forfait Excellence »**.
- `src/pages/Tarifs.tsx` (FAQ affichée + JSON-LD) : « + accès DAF à temps partiel » → **« DAF à temps partiel en option : 150 € HTVA/h »**.
- `src/lib/seo-service-schemas.ts` : l'offre Excellence ne mentionne **plus** le DAF ; le DAF devient une **offre distincte** (UnitPriceSpecification 150 €/h).
- `supabase/functions/chatbot/index.ts` : déjà corrigé en V3.2 (Excellence : trésorerie incluse, DAF en option).

## 2. Erreur fiscale + coquille (🔴)
Article « bureau à domicile » (`blog-articles-content.ts` **et** `llms-full.txt`) :
- Calcul : « 4 000 € de déductions, soit **plus de 1 600 €** d'économie à l'ISOC 25 % » → **environ 1 000 €** (4 000 × 25 %).
- Coquille : « la part professionnelle **professionnelle** » → « la part professionnelle ».

## 3. Avis retirés du JSON-LD Organization (🟠)
`src/lib/seo-schemas.ts` : suppression de `aggregateRating` (5,0 / 16) et des 3 `review`. Motif : avis « self-serving » non éligibles aux étoiles + déconseillé d'agréger des avis d'autres plateformes dans son propre balisage. **Les 16 avis restent affichés sur la page** (conversion) et sur la fiche Google.

## 4. Page /accueilv3 neutralisée (🟠)
`src/pages/AccueilV3.tsx` : `canonical` → `https://mfinances.be/` + **`noIndex`**. La page variante ne s'auto-canonicalise plus et ne sera pas indexée comme quasi-doublon de la home.

## 5. Home = 4 forfaits (décision Mika)
`AccueilV2.tsx` + `AccueilV3.tsx` : ajout de la carte **Basic 275 €** (« Pour être en règle ») → **4 cartes** (Basic / Essentiel / Premium* / Excellence), grille passée en 4 colonnes. Basic sert d'ancrage : il « existe » et met en valeur les 3 formules d'accompagnement.

## 6. Adresse chatbot (🟠)
`chatbot/index.ts` : « 20 Rue de la Magnanerie… » → **« Rue de la Magnanerie 20… »** (NAP identique partout, pour de vrai).

## 7. Recette renforcée — niveau 2 « règles métier » (🟠)
`recette-seo.sh` contrôle désormais aussi, sur le site en ligne : DAF à 150 €/h dans `llms.txt` (et **absence** de « dans tous ses forfaits »), `/accueilv3` en **noindex**, ITAA Mika sur `/a-propos/`, Basic 275 sur `/tarifs/`, **absence d'aggregateRating** sur l'accueil, et **1 seul `<h1>`**. Une recette « verte » atteste maintenant aussi la cohérence commerciale.

## 8. Finitions
Métas `APropos` et `Services` resserrées (plus compactes). `POINT-4` nuancé : l'uniformité NAP est une bonne hygiène, mais son effet SEO direct ne doit pas être surestimé (le local dépend surtout de pertinence/distance/notoriété).

---

## Recommandations de la revue que je n'ai PAS suivies (ou partiellement) — et pourquoi
1. **Passer tout le corpus fiscal 2026 en revue** → **partiel**. J'ai corrigé l'erreur identifiée (1 600 → 1 000 €) + la coquille, et scanné le même motif (« soit X € d'économie ») : aucun autre cas. Mais je **ne réalise pas** une validation fiscale complète des 47 articles — c'est le domaine de Mika (expert-comptable). Je peux lancer un scan systématique des chiffres si tu le souhaites.
2. **Générer `llms-full.txt` automatiquement depuis `blog-articles-content.ts`** → **non fait**. `llms-full.txt` est un fichier curé ; bâtir un générateur fidèle maintenant est risqué et hors périmètre. J'ai corrigé les **deux fichiers en synchro** et je recommande d'adopter ce principe « source unique → génération » pour l'avenir.
3. **Faire du titre visible le `<h1>`** (au lieu du `<h1>` en `sr-only`) → **non fait**. Le motif actuel (H1 riche en mots-clés masqué + accroche marketing visible en h2) est une technique légitime ; le changer troquerait un H1 optimisé contre une accroche, et toucherait le hero. Non bloquant. La recette vérifie qu'il y a **exactement 1 `<h1>`**.
4. **Enrichir le JSON-LD `Article`** (image, `author.url`, `dateModified`) → **reporté**. Cela demande de câbler des données par article (images, dates de modif) sur 47 articles ; je préfère le traiter comme un lot dédié pour ne pas fragiliser cette passe de consolidation. Faisable ensuite si tu veux.
5. **Recette : validation JSON-LD complète + crawl liens cassés + robots/sitemap + www/non-www** → **partiel**. J'ai ajouté les assertions métier à forte valeur ; la validation de schéma et le crawl de liens nécessitent des outils dédiés (Schema Validator, crawler) plutôt qu'un smoke test curl — noté comme étape externe.

## Contrôle final (V5)
- ✅ 0 erreur de transpilation (esbuild) sur les 12 fichiers modifiés · recette `bash -n` OK
- ✅ 0 formulation « DAF inclus / dans tous les forfaits » restante (src + public + supabase)
- ✅ Avis retirés du JSON-LD · `/accueilv3` en noindex + canonical `/`
- ✅ Home à 4 forfaits (Basic 275 visible) · erreur fiscale et coquille corrigées (2 fichiers)
- ✅ ITAA : Mika 10.923.614 / MFINANCES 50.624.805 · NAP identique partout (chatbot inclus)
- ⚠️ Rappel : la V5 n'est pas encore déployée ; un crawl public de `/tarifs` montrant encore « 3 forfaits dès 350 € » = ancienne version en ligne (normal tant que LovableHTML→OVH n'est pas refait).
