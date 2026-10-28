import { describe, expect, it } from "vitest";
import { renderSitemapXml } from "../lib/sitemap";
import { blogArticles, blogCategories } from "../data/blog-data";
import { newsroomArticles } from "../data/newsroom-data";
import { sitemapPages, SITE_ORIGIN } from "../data/sitemap-pages";

const xml = renderSitemapXml({ origin: SITE_ORIGIN, pages: sitemapPages, blogArticles, blogCategories, newsroomArticles });
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

describe("generated sitemap", () => {
  it("only uses mfinances.be addresses", () => {
    expect(locs.every((l) => l.startsWith("https://mfinances.be/"))).toBe(true);
  });
  it("includes the newsroom and its validated article", () => {
    expect(locs).toContain("https://mfinances.be/newsroom/");
    expect(locs).toContain("https://mfinances.be/newsroom/mika-musungayi-finance-connectee-odoo/");
  });
  it("dates the home page 2026-10-27", () => {
    expect(xml).toContain("<loc>https://mfinances.be/</loc><lastmod>2026-10-27</lastmod>");
  });
  it("uses an article's revision date", () => {
    expect(xml).toContain("creer-srl-belgique-2026/</loc><lastmod>2026-10-23</lastmod>");
  });
  it("has no priority or changefreq and no duplicates", () => {
    expect(xml).not.toMatch(/priority|changefreq/);
    expect(new Set(locs).size).toBe(locs.length);
  });
});
