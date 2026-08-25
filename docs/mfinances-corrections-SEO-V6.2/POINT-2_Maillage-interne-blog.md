# POINT 2 — Maillage interne (état final réel du corpus)

## 1. En clair (pour Mika)
Le maillage interne relie tes **articles de blog** vers tes **pages de service** (et le diagnostic). C'est un levier SEO prioritaire : il aide Google à comprendre quelles pages font autorité **et** guide le lecteur vers les pages qui convertissent. Deux niveaux sont utilisés :

1. **Liens contextuels dans le texte** — un lien inséré **dans une phrase**, sur des mots-clés déjà présents (le plus fort en SEO : les mots autour du lien donnent le contexte).
2. **Clusters de liens en fin de section** — un bloc « pour aller plus loin » : **service + article complémentaire + diagnostic**.

Il n'y a **pas de « nombre magique »** de liens par page (Google le dit explicitement) : la règle est la **pertinence**, pas un quota.

## 2. État final réel (mesuré sur le fichier livré)
Le blog compte **47 articles**. Après le travail de maillage :

- **47 / 47** articles ont un **cluster `relatedLinks`** en fin de section → **0 article orphelin**.
- **28 / 47** articles ont **en plus** au moins un **lien contextuel dans le texte**.

Autrement dit : chaque article a au minimum un bloc de liens pertinents, et une majorité (~60 %) a aussi un lien tissé dans une phrase.

> ⚠️ Correction documentaire : une version précédente de cette note parlait de « 24 articles ». C'était un **état intermédiaire**, aujourd'hui dépassé. Les chiffres ci-dessus décrivent l'**état réel final** du fichier livré.

## 3. Support technique
`src/pages/BlogArticle.tsx` : le rendu des paragraphes comprend la syntaxe `[texte](/url)` → il affiche un **vrai lien HTML dans la phrase**. Rétrocompatible : un paragraphe sans cette syntaxe s'affiche normalement (pas de `dangerouslySetInnerHTML`).

## 4. Logique des clusters (par thématique)
| Thématique | Lien service | Article complémentaire | + |
|---|---|---|---|
| Trésorerie | /services/tresorerie/ | pilier « anticiper vos flux de trésorerie » | /diagnostic/ |
| DAF | /services/daf-externalise/ | pilier « le DAF externalisé, c'est quoi ? » | /diagnostic/ |
| Contrôle de gestion | /services/controle-de-gestion/ | pilier « le contrôle de gestion, c'est quoi ? » | /diagnostic/ |
| Fiscalité | /services/fiscalite/ | pilier « bien gérer votre ISOC » | /diagnostic/ |
| Création | /services/creation-entreprise/ | pilier « créer sa SRL en 2026 » | /diagnostic/ |

(L'article qui EST le pilier pointe vers un autre article fort de sa thématique, pour éviter qu'il se lie à lui-même.)

## 5. Où c'est appliqué
Tout est dans **`src/data/blog-articles-content.ts`** (liens contextuels + clusters) et **`src/pages/BlogArticle.tsx`** (affichage). Versions finales fournies dans le ZIP.

## 6. Vérifier
- Ouvrir un article : en bas d'une section, un bloc « pour aller plus loin » (service + article + diagnostic) ; sur ~60 % des articles, un ou deux **mots-clés cliquables dans le texte** (couleur accent).
- Les liens mènent bien aux bonnes pages.

## 7. Important (V3.1)
Le maillage **n'a pas été modifié** dans cette passe V3.1 — il était déjà complet. Cette note a simplement été **mise à jour** pour décrire l'état réel du corpus (**47/47 clusters, 28 liens contextuels, 0 orphelin**), et non l'ancien état limité à 24 articles.
