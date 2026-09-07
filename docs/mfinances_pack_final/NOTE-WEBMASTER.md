# NOTE WEBMASTER — MFINANCES
## Refonte `/a-propos/` + nouvelle page `/notre-organisation/`
**Version : 25 août 2026**

---

## Si vous ne lisez que 3 choses avant de commencer

1. **Les quatre fichiers HTML sont des maquettes de référence, pas quatre pages à publier.** En production, il faut une seule URL responsive pour `/a-propos/` et une seule URL responsive pour `/notre-organisation/`. Google traite les variantes desktop/mobile comme des doublons potentiels ; le site actuel est déjà sur une architecture React responsive, il faut la conserver.
2. **Ne pas remplacer l'infrastructure SEO existante.** Le dépôt possède déjà `SEOHead`, des helpers JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt` et `llms-full.txt`. Il faut intégrer les changements dans cette infrastructure, pas créer un système parallèle.
3. **Ne pas transformer “Notre organisation” en page défensive.** L'ordre éditorial doit rester : valeur client → fonctionnement → transparence → objections. Les sujets Maroc/RGPD arrivent après l'explication du bénéfice, pas dans le hero.

---

# 1. Périmètre du pack

Le ZIP contient :
- deux maquettes desktop ;
- deux maquettes mobile ;
- métadonnées SEO finales ;
- snippets `<head>` ;
- JSON-LD ;
- patch sitemap ;
- patch robots OpenAI Search ;
- mise à jour proposée de `llms.txt` ;
- extrait à ajouter à `llms-full.txt` ;
- plan de maillage interne ;
- snippets d'intégration React/Vite ;
- checklist de recette SEO/GEO.

Les maquettes HTML sont volontairement marquées `noindex,nofollow` pour éviter une indexation accidentelle si elles sont déposées sur un serveur de prévisualisation. **Ne jamais conserver ce noindex dans les pages de production.**

---

# 2. Rôle des deux pages

## `/a-propos/` — la promesse et la confiance
Question à laquelle la page répond : **« À qui ai-je affaire et pourquoi ce cabinet existe-t-il ? »**

À conserver :
- récit fondateur ;
- conviction ;
- principes ;
- Mika Musungayi ;
- différence MFINANCES ;
- CTA commercial.

À ajouter : une section courte « Notre organisation » comme passerelle. Elle doit intriguer, pas tout expliquer.

## `/notre-organisation/` — le mécanisme et la preuve
Question à laquelle la page répond : **« Comment MFINANCES est-il organisé pour produire ce niveau d'accompagnement ? »**

Ordre recommandé :
1. promesse opérationnelle ;
2. trois expertises / trois pôles ;
3. chaîne Collecter → Fiabiliser → Analyser → Décider ;
4. bénéfices pour le dirigeant ;
5. organisation humaine ;
6. responsabilité et transparence ;
7. FAQ ;
8. CTA.

---

# 3. Intégration dans la stack actuelle

Le dépôt observé utilise React + React Router + `react-helmet-async` via `SEOHead`.

## À propos
Modifier `src/pages/APropos.tsx` :
- conserver le composant actuel ;
- insérer la passerelle « 07 · Notre organisation » juste avant le CTA final ;
- utiliser `<Link to="/notre-organisation/">` ;
- ne pas dupliquer Header/Footer ;
- conserver les animations existantes uniquement si elles ne dégradent pas le contenu visible et le CLS.

## Notre organisation
Créer `src/pages/NotreOrganisation.tsx` :
- reprendre les tokens/classes existants du site ;
- ne pas recopier le CSS autonome des maquettes en production ;
- réutiliser `Header`, `Footer`, `SEOHead`, `Button`, `Breadcrumb` et les composants de design existants ;
- ajouter la route `/notre-organisation/` dans `src/App.tsx` ;
- ajouter le lien au footer sous « Le cabinet » ;
- ajouter les passerelles depuis `/a-propos/` et `/tarifs/`.

---

# 4. Responsive : règle de production

Les fichiers desktop et mobile montrent l'intention de design. **Ils ne doivent pas devenir deux routes différentes.**

Pour chaque page :
- une seule structure DOM autant que possible ;
- media queries / classes Tailwind pour adapter grille, taille, ordre et espacement ;
- même H1, même texte principal, même canonical ;
- aucune URL `/mobile/`, `?device=mobile` ou sous-domaine `m.` ;
- navigation, CTA et accordéons tactiles accessibles ;
- aucun scroll horizontal.

Sur `/notre-organisation/`, l'organigramme passe d'une structure horizontale desktop à une lecture verticale mobile.

---

# 5. Métadonnées SEO

Utiliser les valeurs du fichier `02-SEO-GEO/metadata.csv` ou les snippets `*-head.html`.

## À propos
- Canonical : `https://mfinances.be/a-propos/`
- H1 : `Pourquoi j'ai créé MFINANCES`
- Indexation : `index,follow`

## Notre organisation
- Canonical : `https://mfinances.be/notre-organisation/`
- H1 : `Trois expertises intégrées. Une responsabilité claire.`
- Indexation : `index,follow`

Les titres et descriptions sont des recommandations éditoriales, pas des limites techniques rigides. Google peut réécrire les snippets selon la requête.

---

# 6. JSON-LD / données structurées

## À propos
Utiliser :
- `AboutPage` ;
- `Person` pour Mika Musungayi ;
- `BreadcrumbList`.

Le dépôt possède déjà `personMikaSchema` et une entité organisation centrale `https://mfinances.be/#organization`. **Réutiliser ces identifiants** plutôt que créer une seconde organisation concurrente.

## Notre organisation
Utiliser :
- `WebPage` ;
- `BreadcrumbList` ;
- `mentions` pour MSL ANALYTICA et MSL-iTECH ;
- `about` pointant vers l'organisation MFINANCES existante.

### Ne pas ajouter `FAQPage`
La FAQ doit rester en HTML visible (`<details>/<summary>` + texte dans le DOM), mais Google a retiré le rich result FAQ en 2026. Ajouter ce schema n'apporte donc pas de bénéfice Search attendu.

### Prudence sur les relations juridiques
Ne pas utiliser `subOrganization` si la relation capitalistique exacte n'est pas celle d'une filiale. Le contenu public retenu parle de **sociétés liées / contrôle commun**. Le schema fourni utilise donc `mentions`, plus neutre.

---

# 7. Sitemap

Le `public/sitemap.xml` existe déjà.

Actions :
- mettre à jour `lastmod` de `/a-propos/` au jour de la mise en production ;
- ajouter `/notre-organisation/` ;
- ne pas ajouter les quatre maquettes ;
- ne pas créer un second sitemap uniquement pour ces deux pages sauf décision d'architecture globale.

Après déploiement : vérifier le statut HTTP 200 et la canonical de chaque URL puis soumettre / resoumettre le sitemap dans Search Console si nécessaire.

---

# 8. robots.txt et visibilité IA

Le robots actuel contient plusieurs règles IA mais **pas de règle explicite `OAI-SearchBot`**.

Pour la visibilité dans ChatGPT Search, ajouter le contenu de `robots-patch-minimal.txt`.

Important :
- `OAI-SearchBot` = découverte / présentation dans ChatGPT Search ;
- `GPTBot` = usage distinct lié à l'entraînement potentiel ;
- ne pas modifier la règle GPTBot sans décision explicite de MFINANCES.

Le patch fourni est volontairement minimal : il ne change pas les choix déjà faits pour Anthropic, Perplexity, Google-Extended, etc.

---

# 9. llms.txt / llms-full.txt

Le site utilise déjà ces fichiers. Ils peuvent être maintenus comme résumé éditorial pour les systèmes qui les consomment, mais :
- ils ne remplacent pas le HTML accessible ;
- ils ne remplacent pas le sitemap ;
- ils ne remplacent pas les canonicals ni le maillage ;
- ils ne garantissent aucune citation IA ;
- Google a précisé en 2026 que `llms.txt` n'est pas nécessaire pour Google Search et n'améliore ni ne dégrade la visibilité/ranking.

Déployer `llms-recommended.txt` seulement après avoir vérifié que les autres informations qu'il contient (tarifs, chiffres, statut des offres) sont toujours actuelles.

Ajouter le contenu de `notre-organisation-llms-full-section.md` dans `llms-full.txt` si ce fichier reste maintenu.

---

# 10. Maillage interne

Le maillage est essentiel pour faire comprendre la relation entre les pages et conduire le prospect.

Minimum :
- `/a-propos/` → `/notre-organisation/` ;
- `/tarifs/` → `/notre-organisation/` ;
- footer → les deux pages ;
- `/notre-organisation/` → `/a-propos/`, `/contact/` et les services pertinents.

Voir `02-SEO-GEO/maillage-interne.md`.

---

# 11. Contenu GEO / citabilité

Pour maximiser la compréhension par les moteurs et assistants :
- conserver les noms exacts `MFINANCES`, `MSL ANALYTICA`, `MSL-iTECH` ;
- expliquer chaque rôle en phrases autonomes et compréhensibles sans contexte ;
- conserver le bloc Collecter → Fiabiliser → Analyser → Décider en texte HTML, pas uniquement en image ;
- garder les réponses FAQ dans le DOM même lorsqu'elles sont repliées ;
- éviter les affirmations vagues de type « solution unique », « meilleur cabinet », « technologie propriétaire » sans preuve ;
- relier Odoo à un bénéfice dirigeant : centraliser, automatiser, comprendre, anticiper ;
- ne pas présenter MFINANCES comme un simple intégrateur ERP.

Le plus important pour Google AI reste un contenu utile, original, accessible et bien indexé : les fondamentaux SEO restent applicables aux fonctionnalités génératives.

---

# 12. Points juridiques / conformité à valider avant publication

Ne pas renforcer les formulations suivantes sans vérification documentaire :
- localisation exacte de l'hébergement ;
- mécanismes de transfert hors EEE ;
- clauses contractuelles types effectivement signées ;
- périmètre exact des accès des sociétés liées ;
- formulation « secret professionnel identique » si elle n'est pas juridiquement validée ;
- qualification juridique exacte de MSL ANALYTICA et MSL-iTECH (société sœur, filiale, contrôle commun, sous-traitant RGPD, etc.).

La maquette utilise volontairement des formulations prudentes.

---

# 13. Images et performance

Réutiliser les assets existants du dépôt :
- `mfinances-team-hero.webp` ;
- `mfinances-equipe-sourire.webp` ou autre asset déjà validé ;
- logo existant.

Règles :
- dimensions explicites `width`/`height` ou aspect-ratio réservé pour limiter le CLS ;
- `loading="lazy"` sous la ligne de flottaison ;
- image hero prioritaire sans lazy si elle constitue le LCP ;
- `alt` descriptif et factuel ;
- WebP/AVIF selon pipeline existant ;
- éviter les images décoratives lourdes en base64 en production : les base64 ne sont utilisées que dans les maquettes autonomes.

---

# 14. Accessibilité

- un seul H1 par page ;
- hiérarchie H2/H3 logique ;
- contrastes conformes ;
- focus visible ;
- boutons et liens réellement interactifs ;
- `<summary>` clavier/tactile ;
- taille cible tactile confortable ;
- `aria-hidden="true"` pour les décorations ;
- respecter `prefers-reduced-motion` pour les animations.

---

# 15. Tracking / mesure

Le dépôt contient déjà un tracking de visite (`RouteTracker`). Ne pas ajouter un second système sans nécessité.

Événements recommandés :
- clic `Découvrir notre organisation` depuis `/a-propos/` ;
- clic `Découvrir notre organisation` depuis `/tarifs/` ;
- clic CTA contact depuis `/notre-organisation/` ;
- ouverture FAQ (facultatif) ;
- profondeur de lecture 50 % / 90 % si l'outil analytics actuel le permet sans alourdir le site.

Nommer les événements de manière stable, par exemple :
- `org_bridge_click_about` ;
- `org_bridge_click_pricing` ;
- `org_contact_click`.

---

# 16. Recette avant mise en ligne

Voir `03-WEBMASTER/QA-SEO-GEO.md`.

Aucun go-live tant que :
- les routes répondent 200 ;
- les canonicals sont correctes ;
- le `noindex` des maquettes n'a pas contaminé les composants de production ;
- le sitemap est mis à jour ;
- `OAI-SearchBot` n'est pas bloqué si la visibilité ChatGPT Search est souhaitée ;
- le contenu principal est présent dans le DOM ;
- les liens internes fonctionnent ;
- les affirmations RGPD sont validées ;
- desktop et mobile affichent la même information essentielle.

---

# 17. Sources techniques revalidées le 25/08/2026

- Google Search Central — canonicalisation : https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Google Search Central — changelog : https://developers.google.com/search/updates
- Google Search Central — AI optimization guide : https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- OpenAI — Publishers & Developers FAQ : https://help.openai.com/en/articles/12627856-publishers-and-developers-faq

Ces règles sont sensibles au temps. Revalider les user-agents, rich results et mécanismes expérimentaux lors de toute refonte future.
