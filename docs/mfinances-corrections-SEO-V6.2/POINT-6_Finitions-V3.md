# POINT 6 — Finitions V3 (après 3ᵉ relecture)

Corrections de finition et de cohérence, sans refaire le travail. Résumé de ce qui a changé depuis la V2.

## 1. Maillage interne — plus aucun article orphelin
Le blog compte **47 articles**. Avant, 12 articles publiés n'avaient **aucun** lien (ni contextuel, ni bloc). Ils sont désormais intégrés : **+12 clusters** (service + article complémentaire + diagnostic) et **+4 liens contextuels** là où une expression s'y prêtait.
Bilan : les **36 articles publiés** utiles au parcours SEO ont maintenant au moins un lien pertinent. (Les autres articles avaient déjà leurs propres liens dans le code d'origine — on ne surcharge pas inutilement.)

## 2. Schéma `Service` — `servicePhone` corrigé
`ServiceChannel.servicePhone` attend un **`ContactPoint`**, pas une chaîne. Corrigé :
`servicePhone: { "@type": "ContactPoint", telephone: "+3228860550", contactType: "customer service" }`.

## 3. `priceRange` aligné sur le catalogue
`priceRange` passe de « 350€ - 650€ » à **« 275€ - 650€ HTVA/mois »**, cohérent avec le catalogue d'offres qui inclut le Basic à 275 €.

## 4. `sameAs` LinkedIn — bon slug
`linkedin.com/company/mfinances` → **`linkedin.com/company/mfinancessrl`** (page entreprise réelle, confirmée par recherche web).

## 5. Prix d'entrée harmonisé à 275 € (hypothèse — réversible)
La page tarifs et le balisage affichaient déjà le **Basic 275 €**, mais l'accueil, `llms.txt`, un article et une meta annonçaient encore « à partir de 350 € ». J'ai **harmonisé partout à 275 €** (le Basic devient l'entrée annoncée), pour supprimer l'incohérence.
Endroits alignés : FAQ d'accueil (AccueilV2 + variantes Index/AccueilV3), meta de la page Services, `llms.txt`, `llms-full.txt`, article « coût de création ».
⚠️ **Si tu préfères mettre en avant 350 € (Essentiel) comme prix d'appel** et garder Basic comme option secondaire, dis-le : je réaligne dans l'autre sens en 2 minutes.

## 6. Recette renforcée (`recette-seo.sh`)
Ajout d'un **code de sortie** (`exit 1` si un contrôle échoue → utilisable en CI) et d'un contrôle de la **destination de la canonical** (et non plus seulement sa présence).

## 7. Hors ZIP (chantier séparé, à ne pas mélanger)
Nettoyer les anciennes **citations web « Rue Edith Cavell »** (ex. Companyweb, experts-comptables.be) pour cohérence NAP externe. C'est **hors du site/ZIP** — à traiter à part, quand tu veux.
