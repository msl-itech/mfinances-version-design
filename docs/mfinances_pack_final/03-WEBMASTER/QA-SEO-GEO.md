# Checklist QA — SEO / GEO / responsive

## Routes et indexation
- [ ] `/a-propos/` retourne HTTP 200.
- [ ] `/notre-organisation/` retourne HTTP 200.
- [ ] Aucun fichier de maquette desktop/mobile n'est publiquement indexable.
- [ ] Aucun `noindex` sur les deux pages de production.
- [ ] Une seule URL responsive par page.

## Canonical / metadata
- [ ] canonical `/a-propos/` auto-référente.
- [ ] canonical `/notre-organisation/` auto-référente.
- [ ] title unique sur chaque page.
- [ ] meta description unique sur chaque page.
- [ ] OG URL, title, description et image cohérents.
- [ ] `fr_BE` / langue de page cohérente.

## HTML / contenu
- [ ] Un seul H1.
- [ ] H2/H3 dans un ordre logique.
- [ ] Organigramme et chaîne de valeur existent en texte HTML, pas uniquement en image.
- [ ] FAQ présente dans le DOM même repliée.
- [ ] Aucune donnée RGPD non validée.
- [ ] Aucune promesse tarifaire ou réglementaire non vérifiée.

## JSON-LD
- [ ] JSON valide.
- [ ] `@id` organisation MFINANCES cohérent avec le schema global existant.
- [ ] Breadcrumb correct.
- [ ] Aucun `FAQPage` ajouté.
- [ ] MSL ANALYTICA / MSL-iTECH décrites sans relation juridique inventée.

## Maillage
- [ ] À propos → Notre organisation.
- [ ] Tarifs → Notre organisation.
- [ ] Footer → les deux pages.
- [ ] Notre organisation → À propos.
- [ ] Notre organisation → Contact.
- [ ] Liens vers services pertinents.

## Sitemap / robots / GEO
- [ ] sitemap mis à jour.
- [ ] `/notre-organisation/` présente dans le sitemap.
- [ ] `OAI-SearchBot` autorisé si visibilité ChatGPT Search souhaitée.
- [ ] décision GPTBot documentée séparément.
- [ ] WAF/CDN ne bloque pas les crawlers souhaités.
- [ ] `llms.txt` synchronisé si conservé.

## Responsive / UX
- [ ] 320 px sans débordement horizontal.
- [ ] 375 / 390 / 430 px testés.
- [ ] 768 / 1024 / 1440 px testés.
- [ ] CTA accessibles et tactiles.
- [ ] organigramme vertical sur mobile.
- [ ] images sans CLS visible.
- [ ] focus clavier visible.
- [ ] animations compatibles `prefers-reduced-motion`.

## Performance / rendu
- [ ] contenu principal disponible au rendu final et indexable.
- [ ] pas de contenu critique uniquement chargé après interaction.
- [ ] images optimisées.
- [ ] aucun base64 lourd repris des maquettes.
- [ ] vérifier CWV terrain après déploiement.

## Après mise en ligne
- [ ] inspection URL Search Console pour les deux pages.
- [ ] validation canonical sélectionnée par Google.
- [ ] relecture du HTML rendu.
- [ ] test des liens et formulaires.
- [ ] suivi clics passerelle / CTA.
