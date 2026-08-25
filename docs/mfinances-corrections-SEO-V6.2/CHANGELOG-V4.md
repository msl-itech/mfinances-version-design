# CHANGELOG — V4

**V4 = version finale.** Elle regroupe tous les correctifs (V3.1 + V3.2) et ajoute un récapitulatif **AVANT / APRÈS** (`AVANT-APRES.md`). Aucun nouveau changement de code depuis la V3.2 : **même code, documentation complétée + version renommée en V4**.

> 📄 Pour voir chaque correction sous forme « avant → après », ouvre **`AVANT-APRES.md`**. Le présent fichier explique le *pourquoi*.

---

## A. Suppression de l'ancienne home V1
Elle n'était **plus servie** (route désactivée dans `App.tsx`). **3 fichiers à SUPPRIMER** :

- `src/pages/Index.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/PricingSection.tsx`

Vérifié : **aucun autre fichier ne les importe** → suppression sans risque, **aucun impact visible** (la vraie home est `AccueilV2.tsx`).

> Dans `App.tsx`, la ligne **commentée** `{/* <Route path="/accueil-v1/" element={<Index />} /> */}` peut être retirée (simple commentaire). Je **n'ai pas** remplacé `App.tsx` en entier pour ne pas risquer d'écraser des routes ajoutées de ton côté.

## B. Cohérence ITAA côté IA — Mika 10.923.614 / MFINANCES 50.624.805
Les surfaces lues par les IA affichent les **deux numéros, correctement attribués** : `public/llms.txt`, `public/llms-full.txt`, et le **chatbot** (`supabase/functions/chatbot/index.ts`).

> ⚠️ **`chatbot/index.ts` est une fonction backend Supabase.** Elle se déploie **avec les fonctions (Lovable/Supabase)** — **pas** via l'upload OVH statique.

## C. Bonus trouvé dans le chatbot
Le chatbot affirmait « Excellence … **inclut DAF + trésorerie** » — la **même erreur** que sur l'accueil. Corrigé : « **trésorerie prévisionnelle mensuelle incluse ; DAF à temps partiel en option, 150 € HTVA/h** ».

---

## Rappel — correctifs V3.1 (déjà intégrés)
1. **Forfaits accueil** (`AccueilV2.tsx` + `AccueilV3.tsx`) : Premium = contrôle de gestion **trimestriel** (plus « mensuel »), « Trésorerie prévisionnelle » retirée de Premium ; Excellence = contrôle mensuel + trésorerie prévisionnelle mensuelle **incluses** + **« DAF à temps partiel en option — 150 € HTVA/h »**.
2. **Comptabilité** : titre → « Nos niveaux d'accompagnement à partir d'Essentiel » + mention Basic 275 € (lien /tarifs/).
3. **ITAA Mika** → 10.923.614 dans les textes visibles (`APropos.tsx`) et les fichiers IA.
4. **Prix d'entrée 275 €** cohérent partout.
5. **`// test`** supprimé de `blog-articles-content.ts`.
6. **POINT-2** réécrit : maillage réel = 47/47 clusters, 28 liens contextuels, 0 orphelin.

## Contrôle final (V4)
- ✅ 0 erreur de transpilation (esbuild) sur tous les fichiers modifiés (y compris le chatbot Deno)
- ✅ Ancienne home V1 supprimée, aucun import résiduel (build sain)
- ✅ Côté IA : Mika = ITAA **10.923.614**, MFINANCES SRL = ITAA **50.624.805** (llms.txt, llms-full.txt, chatbot)
- ✅ Cohérence Accueil = Tarifs = Comptabilité = FAQ = JSON-LD = llms = chatbot
- ✅ Premium = contrôle de gestion trimestriel · DAF Excellence = option 150 € HTVA/h (jamais « inclus »)
- ✅ Basic 275 € partout · `alt` et maillage intacts
