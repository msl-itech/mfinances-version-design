/**
 * Pages fixes du sitemap, avec la date de leur dernière modification de contenu réelle.
 * Quand le contenu visible d'une page change, mettre à jour sa date `lastmod` ici.
 * Les articles du blog et de la newsroom sont ajoutés automatiquement depuis leurs données.
 */
export interface SitemapPage {
  path: string;
  lastmod?: string;
}

export const SITE_ORIGIN = "https://mfinances.be";

export const sitemapPages: SitemapPage[] = [
  { path: "/", lastmod: "2026-10-27" },
  { path: "/a-propos/", lastmod: "2026-10-27" },
  { path: "/notre-organisation/", lastmod: "2026-10-27" },
  { path: "/societe-en-veille/", lastmod: "2026-10-27" },
  { path: "/tarifs/", lastmod: "2026-10-27" },
  { path: "/diagnostic/", lastmod: "2026-10-27" },
  { path: "/contact/", lastmod: "2026-10-27" },
  { path: "/support/", lastmod: "2026-09-28" },
  { path: "/checklist-tresorerie/", lastmod: "2026-09-28" },
  { path: "/frais-defendables/", lastmod: "2026-09-28" },
  { path: "/services/", lastmod: "2026-10-27" },
  { path: "/services/daf-externalise/", lastmod: "2026-10-27" },
  { path: "/services/controle-de-gestion/", lastmod: "2026-10-27" },
  { path: "/services/tresorerie/", lastmod: "2026-10-27" },
  { path: "/services/comptabilite/", lastmod: "2026-10-27" },
  { path: "/services/fiscalite/", lastmod: "2026-10-27" },
  { path: "/services/creation-entreprise/", lastmod: "2026-10-27" },
  { path: "/qui-nous-accompagnons/", lastmod: "2026-09-28" },
  { path: "/qui-nous-accompagnons/independants-et-startups/", lastmod: "2026-09-28" },
  { path: "/qui-nous-accompagnons/commerce-et-horeca/", lastmod: "2026-09-28" },
  { path: "/qui-nous-accompagnons/professions-de-sante/", lastmod: "2026-09-28" },
  { path: "/qui-nous-accompagnons/entreprises-en-croissance/", lastmod: "2026-09-28" },
  { path: "/qui-nous-accompagnons/promoteurs-immobiliers/", lastmod: "2026-09-28" },
  { path: "/qui-nous-accompagnons/asbl/", lastmod: "2026-09-28" },
  { path: "/qui-nous-accompagnons/societe-exploitation/", lastmod: "2026-09-28" },
  { path: "/qui-nous-accompagnons/societe-de-moyens/", lastmod: "2026-09-28" },
  { path: "/qui-nous-accompagnons/societe-de-management/", lastmod: "2026-09-28" },
  { path: "/blog/fiscalite-belgique/bureau-a-domicile/", lastmod: "2026-08-10" },
  { path: "/ressources/calculateur-bureau/", lastmod: "2026-08-10" },
  { path: "/ressources/generateur-bail/", lastmod: "2026-08-10" },
  { path: "/ressources/checklist-controle-bureau/", lastmod: "2026-07-22" },
  { path: "/mentions-legales/", lastmod: "2026-08-10" },
  { path: "/politique-de-confidentialite/", lastmod: "2026-08-10" },
  { path: "/politique-de-cookies/", lastmod: "2026-10-28" },
];
