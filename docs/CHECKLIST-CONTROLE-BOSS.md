# Checklist de contrôle — Implémentation MFINANCES
### Contrôle visuel depuis le navigateur web

> **Date de contrôle** : ___________  
> **Contrôlé par** : ___________

---

## Légende

| Symbole | Signification |
|---------|---------------|
| ✅ | Conforme |
| ❌ | Non conforme |
| ⚠️ | Partiel / à revoir |

---

## A. Page « À propos » — `https://mfinances.be/a-propos/`

### Ouvrir la page sur ordinateur

| # | Ce qu'il faut voir | ✅ ❌ ⚠️ | Remarque |
|---|--------------------|----------|----------|
| A1 | La page s'ouvre sans erreur | | |
| A2 | Le titre de l'onglet du navigateur est exactement : **« À propos de MFINANCES \| Expert-comptable & pilotage à Bruxelles »** | | |
| A3 | Le grand titre visible en haut de la page est exactement : **« Pourquoi j'ai créé MFINANCES »** | | |
| A4 | Le contenu existant est toujours présent : histoire, convictions, Mika Musungayi, valeurs du cabinet | | |
| A5 | On voit une section **passerelle vers « Notre organisation »** avant le bouton CTA final | | |
| A6 | Un lien/bouton **« Découvrir notre organisation »** est visible et cliquable | | |
| A7 | Cliquer sur « Découvrir notre organisation » mène bien vers `https://mfinances.be/notre-organisation/` | | |

### Ouvrir la page sur téléphone (ou redimensionner le navigateur < 400 px)

| # | Ce qu'il faut voir | ✅ ❌ ⚠️ | Remarque |
|---|--------------------|----------|----------|
| A8 | La page s'affiche correctement sans défilement horizontal | | |
| A9 | Tous les textes sont lisibles sans zoom | | |
| A10 | Le lien « Découvrir notre organisation » est facilement cliquable (bouton assez grand) | | |

---

## B. Page « Notre organisation » — `https://mfinances.be/notre-organisation/`

### Ouvrir la page sur ordinateur

| # | Ce qu'il faut voir | ✅ ❌ ⚠️ | Remarque |
|---|--------------------|----------|----------|
| B1 | La page s'ouvre sans erreur (pas de page 404) | | |
| B2 | Le titre de l'onglet est exactement : **« Notre organisation \| MFINANCES, Odoo & pilotage financier »** | | |
| B3 | Le grand titre visible en haut est exactement : **« Trois expertises intégrées. Une responsabilité claire. »** | | |
| B4 | On voit les **3 entités nommées** : MFINANCES, MSL ANALYTICA, MSL-iTECH | | |
| B5 | On voit la **chaîne de valeur en texte** : Collecter → Fiabiliser → Analyser → Décider (pas uniquement en image) | | |
| B6 | On voit une section **FAQ** avec des questions qui s'ouvrent/ferment au clic | | |
| B7 | La page se termine par un **bouton/lien vers la page Contact** | | |
| B8 | Les sections apparaissent dans cet ordre logique : Promesse → 3 pôles → Chaîne de valeur → Bénéfices → Organisation → Responsabilité → FAQ → Contact | | |

### Ouvrir la page sur téléphone (ou redimensionner le navigateur < 400 px)

| # | Ce qu'il faut voir | ✅ ❌ ⚠️ | Remarque |
|---|--------------------|----------|----------|
| B9 | La page s'affiche sans défilement horizontal | | |
| B10 | L'organigramme/structure des pôles s'affiche en **liste verticale** (pas en tableau horizontal qui déborde) | | |
| B11 | Les FAQ sont cliquables et lisibles sur mobile | | |
| B12 | Tous les boutons sont facilement cliquables | | |

---

## C. Navigation entre les pages (maillage)

Vérifier les liens ci-dessous en cliquant depuis le site :

| # | Depuis | Lien à trouver | Mène vers | ✅ ❌ ⚠️ | Remarque |
|---|--------|----------------|-----------|----------|----------|
| C1 | `https://mfinances.be/a-propos/` | « Découvrir notre organisation » | `/notre-organisation/` | | |
| C2 | `https://mfinances.be/tarifs/` | « Découvrir notre organisation » (après les forfaits) | `/notre-organisation/` | | |
| C3 | `https://mfinances.be/notre-organisation/` | « Lire notre histoire » ou lien vers À propos | `/a-propos/` | | |
| C4 | `https://mfinances.be/notre-organisation/` | Bouton/lien Contact (CTA fin de page) | `/contact/` | | |
| C5 | **Footer** (visible sur toutes les pages) | « À propos » dans la section « Le cabinet » | `/a-propos/` | | |
| C6 | **Footer** (visible sur toutes les pages) | « Notre organisation » dans la section « Le cabinet » | `/notre-organisation/` | | |

---

## D. Vérification du titre dans l'onglet et l'URL

> Ouvrir chaque URL, regarder la barre d'adresse et l'onglet du navigateur.

| # | URL | URL correcte (se termine par `/`) | Titre de l'onglet correct | ✅ ❌ ⚠️ |
|---|-----|-----------------------------------|--------------------------|----------|
| D1 | `https://mfinances.be/a-propos/` | | « À propos de MFINANCES \| Expert-comptable & pilotage à Bruxelles » | |
| D2 | `https://mfinances.be/notre-organisation/` | | « Notre organisation \| MFINANCES, Odoo & pilotage financier » | |

---

## E. Vérification du partage sur réseaux sociaux (aperçu lien)

> Coller l'URL dans l'outil : **https://www.opengraph.xyz**

| # | URL testée | Image d'aperçu visible | Titre cohérent | Description visible | ✅ ❌ ⚠️ |
|---|------------|------------------------|----------------|---------------------|----------|
| E1 | `https://mfinances.be/a-propos/` | | | | |
| E2 | `https://mfinances.be/notre-organisation/` | | | | |

---

## F. Vérification sur Google Search Console

> Aller sur **https://search.google.com/search-console** → Inspection d'URL

| # | URL inspectée | Page indexable (pas de noindex) | URL canonique = URL de la page | ✅ ❌ ⚠️ | Remarque |
|---|---------------|---------------------------------|-------------------------------|----------|----------|
| F1 | `https://mfinances.be/a-propos/` | | | | |
| F2 | `https://mfinances.be/notre-organisation/` | | | | |

---

## G. Vérification du sitemap

> Ouvrir dans le navigateur : **`https://mfinances.be/sitemap.xml`**

| # | Ce qu'il faut voir | ✅ ❌ ⚠️ | Remarque |
|---|--------------------|----------|----------|
| G1 | L'URL `https://mfinances.be/a-propos/` est présente dans le sitemap | | |
| G2 | L'URL `https://mfinances.be/notre-organisation/` est présente dans le sitemap | | |
| G3 | Les deux URLs ont une date `<lastmod>` récente (date de déploiement) | | |

---

## H. Vérification robots.txt

> Ouvrir dans le navigateur : **`https://mfinances.be/robots.txt`**

| # | Ce qu'il faut voir | ✅ ❌ ⚠️ | Remarque |
|---|--------------------|----------|----------|
| H1 | La ligne `OAI-SearchBot` est présente avec `Allow: /` | | |
| H2 | Le fichier sitemap est référencé en bas (`Sitemap: https://mfinances.be/sitemap.xml`) | | |

---

## I. Points bloquants — à valider AVANT mise en ligne

> Ces points doivent être confirmés même sans accès au code.

| # | Point à valider | Confirmé par | ✅ ❌ | Remarque |
|---|-----------------|--------------|-------|----------|
| I1 | Les pages `/a-propos/` et `/notre-organisation/` sont bien **indexables** par Google (pas bloquées) | | | |
| I2 | Les qualifications juridiques de MSL ANALYTICA et MSL-iTECH sont validées avant publication | | | |
| I3 | Le texte sur la confidentialité des données est validé juridiquement | | | |
| I4 | Aucune promesse tarifaire ou réglementaire non vérifiée n'est publiée | | | |

---

## Récapitulatif

| Section | Items | ✅ | ❌ | ⚠️ |
|---------|-------|----|----|-----|
| A. Page À propos | 10 | | | |
| B. Page Notre organisation | 12 | | | |
| C. Maillage / navigation | 6 | | | |
| D. URL & titre onglet | 2 | | | |
| E. Aperçu réseaux sociaux | 2 | | | |
| F. Google Search Console | 2 | | | |
| G. Sitemap | 3 | | | |
| H. Robots.txt | 2 | | | |
| I. Points bloquants | 4 | | | |
| **TOTAL** | **43** | | | |

---

*Réf. pack : `docs/mfinances_pack_final/` — v25 août 2026*
