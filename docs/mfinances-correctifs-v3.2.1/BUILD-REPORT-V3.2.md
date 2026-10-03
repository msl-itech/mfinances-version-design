# BUILD-REPORT — V3.2 (révision 1)

Remplace le rapport V3. Environnement : Ubuntu 24.04.4 LTS, x86_64, Node.js v22.16.0, npm 10.9.2, 26/09/2026. `package.json` et `package-lock.json` : **identiques à ceux de la V2**, simplement vérifiés comme cohérents (`npm ls --depth=0` sans erreur). La seule modification du lockfile date de la V2, par rapport au dépôt d'origine du 15/09.

## Corrections de la V3.2 (retour du contrôle GPT)

| N° | Correction | Vérification réalisée |
|---|---|---|
| 23 | `<head>` pré-rendu propre à chaque page. Cause trouvée : `react-helmet-async` écrit le `<head>` via `requestAnimationFrame`, suspendu dans les onglets en arrière-plan du pré-rendu (4 pages en parallèle). Correctif : `<Helmet defer={false}>` dans `SEOHead`, et balises par défaut de `index.html` marquées `data-rh="true"` pour être remplacées au lieu d'être dupliquées | Script sur les 87 pages de `dist/` : **87 titres distincts**, 0 page avec le titre de l'accueil hors accueil, **exactement une** balise description, canonical, og:title, og:description, og:image et twitter:title par page, og:title identique au title partout. Code Clarity de `index.html` comparé octet par octet : inchangé |
| 24 | Provenance des leads : `landing_page`, `conversion_page`, `referrer` | Navigateur : `mf_landing_page` enregistré à l'entrée et conservé pendant la navigation (entrée `/`, puis Tarifs → reste `/`) |
| 25 | `site_version = v3-2026-09` | Navigateur : balises `environment`, `host` et `site_version` posées sur chaque page testée |
| 26 | Avis : fraîcheur 30 jours ; suppression uniquement après **3 synchronisations complètes et réussies consécutives** où l'avis est absent (compteur `missing_sync_count` en base, remis à 0 dès que l'avis réapparaît ; une synchronisation en échec n'incrémente rien). Révision 1 : remplace la règle « absent depuis 3 jours », qui pouvait supprimer un avis après une seule synchronisation réussie suivant deux jours de panne | Relecture de code ; non testé contre l'API Google réelle ni sous Deno |

## Commandes

| Commande | Résultat |
|---|---|
| `npx tsc --noEmit -p tsconfig.app.json` | **exit 0** |
| `npm run lint` (projet complet) | exit 1 — **4 erreurs, 12 avertissements**. Les 4 erreurs sont antérieures à la livraison : 2 × `no-empty` dans `src/lib/utm-enrich.ts` (blocs d'origine, déplacés aux lignes 252 et 282 par les ajouts de la V3.2), 1 dans `BlogArticle.tsx`, 1 dans `NotreOrganisation.tsx`. Les 12 avertissements : les 11 d'origine et `react-refresh/only-export-components` sur `App.tsx` (V3) |
| `npm run build` | **exit 0** — « built in 1m 13s », 87 pages pré-rendues |

## Tests navigateur (Chromium 153, build servi localement)

8 pages (accueil, tarifs, contact, DAF, comptabilité, diagnostic, checklist, article le plus visité) : contenu complet, **aucune erreur JavaScript, aucun écran d'attente**, bon `document.title`, une seule meta description. Navigation interne accueil → tarifs : titre mis à jour, une seule meta description.

## Correction d'un critère de recette erroné

Les trois vignettes `avatar-*-96.webp` (moins de 4 ko chacune) sont **intégrées au JavaScript par Vite** sous forme `data:image/webp;base64`. Elles n'apparaissent donc pas comme fichiers séparés dans `dist/assets`. C'est le comportement normal de Vite, et non un défaut. Le critère que j'avais indiqué (« présentes dans `dist/assets` ») était faux.

## Rappels

- Le pré-rendu du build de référence tourne avec un Chromium local. Dans un environnement qui bloque `127.0.0.1` pour Chromium (`ERR_BLOCKED_BY_ADMINISTRATOR`), l'étape de pré-rendu ne peut pas s'exécuter : c'est une contrainte de l'environnement, pas du projet.
- La fonction `sync-google-reviews` n'a été testée ni contre l'API Google réelle, ni sous Deno.
- Le ZIP complet autonome n'est pas régénéré dans cette passe.
