# CHANGELOG — V3.2

Suite de la V3.1. Deux demandes traitées : **suppression de l'ancienne home V1** et **cohérence des numéros ITAA côté IA** (chatbot + fichiers llms). Aucune régression sur le reste.

## A. Suppression de l'ancienne home V1
Elle n'était **plus servie** (sa route est désactivée dans `App.tsx`). **3 fichiers à SUPPRIMER** du projet :

- `src/pages/Index.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/PricingSection.tsx`

Vérifié : **aucun autre fichier ne les importe** → suppression sans risque, **aucun impact visible** sur le site (la vraie home est `AccueilV2.tsx`).

> Dans `App.tsx`, la ligne **commentée** `{/* <Route path="/accueil-v1/" element={<Index />} /> */}` peut être retirée : c'est un simple commentaire, sans effet. Je **n'ai pas** remplacé `App.tsx` en entier pour ne pas risquer d'écraser des routes que tu aurais ajoutées de ton côté.

## B. Cohérence ITAA côté IA — Mika 10.923.614 / MFINANCES 50.624.805
Les surfaces lues par les IA affichent désormais les **deux numéros, correctement attribués** :

- `public/llms.txt` : ajout de « Cabinet MFINANCES SRL agréé ITAA n°50.624.805 » à côté de Mika (10.923.614).
- `public/llms-full.txt` : en-tête complété de la même façon.
- `supabase/functions/chatbot/index.ts` : « Cabinet MFINANCES SRL (agréé ITAA n°50.624.805), fondé par Mika Musungayi, expert-comptable certifié (ITAA n°10.923.614) ».

> ⚠️ **`chatbot/index.ts` est une fonction backend Supabase.** Elle se déploie **avec les fonctions (Lovable/Supabase)** — **pas** via l'upload OVH statique. Voir la note dans le LISEZMOI.

## C. Bonus trouvé dans le chatbot
Le chatbot affirmait « Excellence … **inclut DAF + trésorerie** » — la **même erreur** que sur l'accueil. Corrigé : « **trésorerie prévisionnelle mensuelle incluse ; DAF à temps partiel en option, 150 € HTVA/h** ».

---

## Rappel — ce qui avait été fait en V3.1
1. **Forfaits accueil** (`AccueilV2.tsx` + `AccueilV3.tsx`) : Premium = contrôle de gestion **trimestriel** (plus « mensuel »), « Trésorerie prévisionnelle » retirée de Premium ; Excellence = contrôle de gestion mensuel + trésorerie prévisionnelle mensuelle **incluses** + **« DAF à temps partiel en option — 150 € HTVA/h »**.
2. **Comptabilité** : titre → « Nos niveaux d'accompagnement à partir d'Essentiel » + mention « …le forfait Basic est disponible à 275 € HTVA/mois » (lien /tarifs/).
3. **ITAA Mika** → 10.923.614 dans les textes visibles (`APropos.tsx`) et les fichiers IA.
4. **Prix d'entrée 275 €** cohérent partout.
5. **`// test`** supprimé de `blog-articles-content.ts`.
6. **POINT-2** réécrit : maillage réel = 47/47 clusters, 28 liens contextuels, 0 orphelin.

## Contrôle final (V3.2)
- ✅ 0 erreur de transpilation (esbuild) sur tous les fichiers modifiés (y compris le chatbot Deno)
- ✅ Ancienne home V1 supprimée, aucun import résiduel (build sain)
- ✅ Côté IA : Mika = ITAA **10.923.614**, MFINANCES SRL = ITAA **50.624.805** (llms.txt, llms-full.txt, chatbot)
- ✅ Cohérence Accueil = Tarifs = Comptabilité = FAQ = JSON-LD = llms = chatbot
- ✅ Premium = contrôle de gestion trimestriel · DAF Excellence = option 150 € HTVA/h (jamais « inclus »)
- ✅ Basic 275 € partout · `alt` et maillage intacts
