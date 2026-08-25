# POINT 1 — Schémas « Service » par page + « OfferCatalog » sur /tarifs/ (V2 corrigée)

## 1. En clair (pour Mika)
Un « schéma » (données structurées JSON-LD) est un bloc invisible qui **explique la page à Google et aux IA**. On ajoute un **`Service`** sur les 6 pages service et un **catalogue d'offres** sur /tarifs/.
Honnêteté sur le bénéfice : les données structurées **aident à la compréhension** (Google + moteurs IA / GEO) ; ce n'est **pas** un gain de classement garanti ni une garantie d'être cité par ChatGPT/Perplexity. On le pose comme **hypothèse raisonnable**, pas comme promesse. Ce n'est **pas** la priorité n°1 (le maillage l'est).

## 2. Corrections apportées après relecture (important)
- ✅ **Validation** : `Service` et `OfferCatalog` **ne sont pas** des « résultats enrichis » Google → on les contrôle avec le **Schema Markup Validator** (validator.schema.org), **pas** avec le Rich Results Test (qui ne montre que les types affichés par Google).
- ✅ **`OfferCatalog`** : on a retiré `provider` (non valide sur ce type). Désormais **chaque offre porte `seller`** (l'entité `#organization`) **et `itemOffered`** (le Service concret vendu par ce forfait) — modèle sémantiquement plus explicite.
- ✅ **Forfait Basic 275 €** : conservé, car il figure bien sur la page tarifs (hero « 4 niveaux à partir de 275 € », tableau, FAQ). Règle Google : le balisage doit refléter le contenu visible → c'est le cas.

## 3. Index des corrections
| # | Fichier | Action |
|---|---|---|
| 1 | `src/lib/seo-service-schemas.ts` | **CRÉER** (contenu fourni dans le ZIP) |
| 2-7 | `Comptabilite / ControleDeGestion / DafExternalise / Tresorerie / Fiscalite / CreationEntreprise.tsx` | +import + `createServiceSchema({…})` dans `schemaJson` |
| 8 | `src/pages/Tarifs.tsx` | +import + `tarifsOfferCatalogSchema` dans `schemaJson` |

> Dans le ZIP, ces fichiers sont déjà en version finale sous `fichiers-finaux/`. Le webmaster remplace / crée, sans rien retaper.

## 4. Vérifier (le bon protocole)
- **Schema Markup Validator** (validator.schema.org) sur `https://mfinances.be/services/comptabilite/` et `/tarifs/` → les blocs **Service** et **OfferCatalog** doivent être détectés **sans erreur**.
- Le **Rich Results Test** de Google, lui, ne montrera **pas** Service/OfferCatalog : c'est **normal** (ces types ne déclenchent pas de résultat enrichi). Ne pas s'en inquiéter.
