# POINT 4 — Adresse (cohérence NAP)

## 1. En clair (pour Mika)

**NAP = Nom / Adresse / Téléphone.** Écrire le **NAP exactement pareil partout** (fiche Google, site, annuaires) est une **bonne hygiène** : ça lève toute ambiguïté sur l'identité et l'emplacement du cabinet. À nuancer toutefois : le classement local de Google repose surtout sur la **pertinence, la distance et la notoriété** — une simple inversion « 20 Rue » / « Rue 20 » ne fait pas perdre de position à elle seule. On harmonise donc par **rigueur et clarté**, sans surestimer l'effet SEO direct.

**Adresse de référence** (= celle de ta fiche Google Business) :

> **Rue de la Magnanerie 20, 1180 Uccle** — Tél. **+32 2 886 05 50**

## 2. Ce qui a été corrigé

Deux points d'incohérence ont été alignés sur la fiche Google :

1. **Ville dans le schéma** : le code indiquait `addressLocality: "Bruxelles"` alors que **1180 = Uccle**. → corrigé en **« Uccle »**.
2. **Format de la rue** : le site écrivait « **20** Rue de la Magnanerie » ; la fiche Google écrit « **Rue de la Magnanerie 20** ». → standardisé partout en **« Rue de la Magnanerie 20 »** (format belge, identique à Google).

> La région « Bruxelles » et le pays « Belgique » restent affichés là où ils l'étaient (Uccle EST en Région de Bruxelles-Capitale) — c'est correct. Seuls la **ville officielle (Uccle)** et le **format de rue** ont été harmonisés.

## 3. Index des fichiers concernés (9 emplacements)

| Fichier | Correction |
|---|---|
| `src/lib/seo-schemas.ts` | `addressLocality` → **Uccle** + rue → **Rue de la Magnanerie 20** |
| `src/components/Footer.tsx` | rue → Rue de la Magnanerie 20 |
| `src/pages/AccueilV2.tsx` | rue → Rue de la Magnanerie 20 |
| `src/pages/APropos.tsx` | rue → Rue de la Magnanerie 20 |
| `src/pages/MentionsLegales.tsx` | rue → Rue de la Magnanerie 20 |
| `src/pages/PolitiqueConfidentialite.tsx` | rue → Rue de la Magnanerie 20 |
| `src/pages/AccueilV3.tsx` | rue → Rue de la Magnanerie 20 *(variante d'accueil inactive, corrigée par cohérence)* |
| `public/llms.txt` | rue → Rue de la Magnanerie 20 |
| `supabase/functions/chatbot/index.ts` | rue → Rue de la Magnanerie 20 *(V5 — backend Supabase)* |

> `src/pages/FraisDefendables.tsx` contenait déjà `addressLocality: "Uccle"` → **rien à changer**.

## 4. Règle pour la suite
À chaque fois que tu écris l'adresse (site, annuaire, signature, réseaux), utilise **exactement** : `Rue de la Magnanerie 20, 1180 Uccle`. Copie-colle pour éviter toute variante.
