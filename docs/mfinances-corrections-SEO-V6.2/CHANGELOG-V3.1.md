# CHANGELOG — V3.1 (cohérence commerciale + ITAA)

Correctif ciblé au-dessus de la V3. **Aucune régression** sur les `alt`, le maillage ou les schémas déjà validés. Source commerciale de vérité = **`Tarifs.tsx`**.

## 1. Forfaits — page d'accueil corrigée (le point le plus important)
La grille tarifaire de l'accueil (`AccueilV2.tsx`, active sur `/`) contredisait la page Tarifs **et sa propre FAQ**. Corrigé :

- **Premium (450 €)** : « Contrôle de gestion **mensuel** » → **trimestriel** ; suppression de « Trésorerie prévisionnelle » (non incluse en Premium). Nouveau libellé : *contrôle de gestion trimestriel + analyse des écarts*.
- **Excellence (650 €)** : la carte laissait croire que le **DAF était inclus**. Désormais : **contrôle de gestion mensuel + trésorerie prévisionnelle mensuelle (incluses)** et **« DAF à temps partiel en option — 150 € HTVA/h »** (clairement payant, non inclus).

Même correction appliquée à `AccueilV3.tsx` (page `/accueilv3`).

## 2. Page Comptabilité (`Comptabilite.tsx`)
Le titre « Inclus dans tous nos forfaits » masquait l'existence du Basic. Option retenue (B) :

- Titre → **« Nos niveaux d'accompagnement à partir d'Essentiel »**.
- Mention ajoutée : *« Pour les besoins de comptabilité et conformité uniquement, le forfait Basic est disponible à 275 € HTVA/mois. »* (avec lien vers `/tarifs/`).

## 3. Numéros ITAA — propagation éditoriale corrigée
Le JSON-LD faisait **déjà** la bonne distinction. Harmonisation des textes visibles + fichiers IA :

- **Mika Musungayi (personne)** → ITAA **10.923.614** : corrigé dans `APropos.tsx`, `public/llms.txt`, `public/llms-full.txt`.
- **MFINANCES SRL (cabinet)** → ITAA **50.624.805** : **inchangé** là où le cabinet est identifié (Footer, Mentions légales, PDF).

## 4. Prix d'entrée = 275 € partout
Vérifié sur accueil, Tarifs, Comptabilité, FAQ, JSON-LD et llms. (Le seul « 350 » restant en tant que prix d'entrée était l'ancien hero legacy — corrigé aussi, voir §6.)

## 5. Nettoyage
Suppression du commentaire `// test` en fin de `blog-articles-content.ts`.

## 6. Fichiers legacy V1 (non servis) — corrigés par précaution
`PricingSection.tsx` et `HeroSection.tsx` portaient encore l'ancien modèle (Premium mensuel, DAF inclus, « dès 350 € »). Ils ne sont **utilisés que par `Index.tsx`, dont la route est désactivée** (commentée dans `App.tsx`) → **aucun effet sur le site en ligne aujourd'hui**. Corrigés quand même pour que l'ancien modèle n'existe **nulle part**. Remplacement **optionnel** pour le webmaster.

> Si tu préfères, on peut aussi **supprimer complètement** cette ancienne home V1 (`Index.tsx` + ces 2 sections) — dis-le-moi et je prépare ça proprement.

## 7. Maillage — inchangé, note mise à jour
Le maillage n'a pas été touché. `POINT-2` a été corrigé pour refléter l'état réel : **47/47 articles avec cluster, 28 avec lien contextuel, 0 orphelin** (au lieu de l'ancien « 24 articles »).

## 8. Hors périmètre (pour info, à décider plus tard)
- `chatbot/index.ts` (fonction Supabase, **hors ZIP**) contient encore « Mika … ITAA n°50.624.805 » → à passer en **10.923.614** côté backend si tu veux la cohérence totale côté IA.
- `EntreprisesCroissance.tsx` (page audience, **hors ZIP**) titre « Contrôle de gestion mensuel » : formulation orientée clients en croissance, pas une promesse de forfait — à nuancer seulement si tu le souhaites.
- Anciennes citations web « Rue Edith Cavell » : chantier NAP externe, hors site.

## Contrôle final (V3.1)
- ✅ 0 erreur de transpilation (esbuild) sur tous les fichiers modifiés
- ✅ Cohérence Accueil = Tarifs = Comptabilité = FAQ = JSON-LD = llms
- ✅ Mika = ITAA 10.923.614 · MFINANCES SRL = ITAA 50.624.805
- ✅ Basic = 275 € partout (prix d'entrée)
- ✅ Premium = contrôle de gestion trimestriel (jamais mensuel)
- ✅ DAF Excellence = option payante 150 € HTVA/h (jamais présenté comme inclus)
- ✅ `alt` déjà validés : intacts · maillage : intact
