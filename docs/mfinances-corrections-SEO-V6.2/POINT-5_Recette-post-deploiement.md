# POINT 5 — Recette post-déploiement (la preuve du chemin)

## 1. Pourquoi cette étape (pour Mika)
Un code **qui compile** n'est **pas** la garantie qu'il est **correct en ligne**. Entre le code et ce que Google voit réellement, il y a une chaîne :

> **code → pré-rendu (LovableHTML) → fichiers statiques → upload OVH → HTML réellement servi**

À chaque maillon, quelque chose peut « tomber » : un JSON-LD qui n'apparaît pas dans le HTML statique, une page en 404, une mauvaise canonical, ou OVH qui sert encore l'**ancienne** version. La **recette** est le contrôle qui prouve que la chaîne est bonne. C'est le **seul point que je considérais comme bloquant** avant de dire « c'est en production ».

## 2. La checklist de recette (à faire APRÈS l'upload OVH)
1. **Build & dossier déployé** : régénérer le site (LovableHTML), noter précisément le **dossier envoyé sur OVH**.
2. **HTML statique** : ouvrir les fichiers générés de `/services/comptabilite/`, `/tarifs/` et d'un article de blog, et confirmer que **`title`, `meta description`, `canonical` et `JSON-LD`** sont présents **avant** exécution du JavaScript (clic droit → « Afficher le code source »).
3. **Production** : après upload OVH, refaire **exactement** le même contrôle sur l'URL **en ligne** (le HTML servi, pas la version React).
4. **Schémas** : valider `Service` et `OfferCatalog` avec le **Schema Markup Validator** (validator.schema.org), puis inspecter l'URL dans **Google Search Console**.
5. **Liens** : cliquer un échantillon de **liens contextuels et de clusters** → aucun **404**, bonne destination, ancre naturelle.

## 3. Le script automatique fourni : `recette-seo.sh`
Pour rendre ça simple et **répétable**, le ZIP contient un script. Il teste 5 pages représentatives (Accueil, Tarifs, une page Service, un article, une page sectorielle) et vérifie pour chacune : **HTTP 200, title, meta description, canonical, H1, JSON-LD**, et la présence du bon type (`AccountingService`, `OfferCatalog`, `Service`, `FAQPage`).

**Comment le lancer** (sur un ordinateur avec `curl`, après l'upload OVH) :
```bash
bash recette-seo.sh
# ou pour tester une préprod :
bash recette-seo.sh https://url-de-preprod
```
Lecture du résultat : tout en **OK** → la chaîne est bonne. Si des lignes **KO** apparaissent sur `title`/`meta`/`JSON-LD`, c'est le **signal typique** que le HTML servi est la coquille React (pré-rendu non déployé) → il faut vérifier que le build **LovableHTML** a bien été uploadé sur OVH.

## 4. À intégrer comme réflexe
À **chaque** future régénération LovableHTML + upload OVH, relancer `recette-seo.sh`. Cela évite qu'un changement fonctionne parfaitement dans React mais **disparaisse** du HTML généré sans qu'on s'en aperçoive.

> 💡 Je peux aussi lancer cette recette **pour toi** sur le site en ligne une fois que ton webmaster a publié — dis-le moi et je te renvoie le rapport.
