import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { articleContent } from "../data/blog-articles-content";
import { blogArticles, blogCategories } from "../data/blog-data";
import { newsroomArticles } from "../data/newsroom-data";
import { sitemapPages, SITE_ORIGIN } from "../data/sitemap-pages";
import { renderSitemapXml } from "../lib/sitemap";

const targets = [
  ["daf-externalise", "daf-externalise-definition"],
  ["creation-societe", "creer-srl-belgique-2026"],
  ["controle-de-gestion", "suis-je-rentable-tpe"],
  ["fiscalite-belgique", "calcul-bureau-a-domicile"],
  ["tresorerie", "anticiper-flux-tresorerie"],
  ["tresorerie", "bfr-recrutement-impact-tresorerie"],
] as const;
const base = "https://mfinances.be";

describe("Six requested editorial revisions", () => {
  for (const [category, slug] of targets) {
    it(`${slug} has at least 1000 useful body words`, () => {
      const text = articleContent[slug].sections.flatMap((s) => s.paragraphs).join(" ");
      const prose = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
      expect(prose.split(/\s+/).length).toBeGreaterThanOrEqual(1000);
    });
    it(`${slug} has four to six contextual internal links to existing pages`, () => {
      const text = articleContent[slug].sections.flatMap((s) => s.paragraphs).join(" ");
      const paths = [...text.matchAll(/\]\((\/[^)]+)\)/g)].map((m) => m[1]);
      expect(paths.length).toBeGreaterThanOrEqual(4);
      expect(paths.length).toBeLessThanOrEqual(6);
      for (const path of paths.filter((p) => p.startsWith("/blog/"))) {
        expect(blogArticles.some((a) => `/blog/${a.categorySlug}/${a.slug}/` === path && a.published)).toBe(true);
      }
    });
    it(`${slug} keeps its URL and receives its actual revision date`, () => {
      const article = blogArticles.find((a) => a.slug === slug);
      expect(article?.canonical).toBe(`${base}/blog/${category}/${slug}/`);
      expect(article?.dateModified).toBe("2026-10-23");
      expect(article?.published).toBe(true);
      const sitemap = renderSitemapXml({ origin: SITE_ORIGIN, pages: sitemapPages, blogArticles, blogCategories, newsroomArticles });
      expect(sitemap).toContain(`<loc>${base}/blog/${category}/${slug}/</loc><lastmod>2026-10-23</lastmod>`);
    });
  }
  it("does not give unrelated articles the revision date", () => {
    const expectedWithDateModified = [
      ...targets.map(([, slug]) => slug),
      "vvprbis-belgique",
      "reserve-liquidation-belgique",
      "requalification-loyer-remuneration",
      "changer-expert-comptable-belgique-pme",
      "expert-comptable-odoo-belgique-pme",
      "cloture-2026-decisions-dirigeant-pme",
      "rapports-odoo-dirigeant-pme",
      "comptabilite-retard-reprise-pme",
      "daf-externalise-ou-salarie-pme",
      "budget-tresorerie-2027-pme",
      "peppol-2027-controles-pme-odoo",
      "marge-chantier-odoo-construction",
      "reporting-mensuel-pme-expert-comptable",
      "inventaire-fin-annee-pme-belgique-2026",
      "inventaire-physique-odoo-18-pme",
      "stocks-dormants-reduction-valeur-fin-annee",
      "travaux-en-cours-inventaire-chantiers-fin-annee",
      "vvprbis-guide-complet-2026",
    ];
    expect(blogArticles.filter((a) => a.dateModified).map((a) => a.slug).sort()).toEqual(expectedWithDateModified.sort());
  });
});