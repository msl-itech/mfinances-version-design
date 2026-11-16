import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { blogArticles } from "@/data/blog-data";
import { extractBlogArticlePaths, redactPii } from "../../supabase/functions/_shared/chatbot-insights";
import { classifyChatLink, getPageGuide } from "@/lib/chatbot-page-context";

describe("questions anonymes de l'assistant", () => {
  it("masque l'adresse e-mail", () => {
    expect(redactPii("écrivez-moi à jean.dupont@exemple.be svp")).toBe("écrivez-moi à [courriel] svp");
  });
  it("masque un numéro de téléphone belge", () => {
    expect(redactPii("appelez le +32 470 12 34 56")).toBe("appelez le [téléphone]");
  });
  it("garde les montants et années", () => {
    expect(redactPii("CA de 250000 € en 2026")).toBe("CA de 250000 € en 2026");
  });
  it("coupe à 500 caractères", () => {
    expect(redactPii("a".repeat(800))).toHaveLength(500);
  });
});

describe("articles recommandés", () => {
  it("repère les articles cités dans la réponse", () => {
    const answer = "Lisez [Inventaire](/blog/comptabilite-odoo/inventaire-physique-odoo-18-pme/) et [tarifs](/tarifs/).";
    expect(extractBlogArticlePaths(answer)).toEqual(["/blog/comptabilite-odoo/inventaire-physique-odoo-18-pme/"]);
  });
});

describe("liens de l'assistant", () => {
  it("le rendez-vous Odoo compte comme rendez-vous", () => {
    expect(classifyChatLink("https://odoo.mfinances.be/appointment/11")).toBe("booking");
  });
  it("un article publié compte comme article", () => {
    expect(classifyChatLink("/blog/comptabilite-odoo/peppol-2027-controles-pme-odoo/")).toBe("article");
  });
  it("la checklist trésorerie est proposée sur les articles trésorerie", () => {
    expect(getPageGuide("/blog/tresorerie/bfr-definition-formule-tpe/")?.href).toBe("/checklist-tresorerie/");
  });
});

describe("catalogue de l'assistant", () => {
  it("contient chaque article publié du blog", () => {
    const catalog = readFileSync(resolve(__dirname, "../../supabase/functions/_shared/blog-catalog.ts"), "utf8");
    const missing = blogArticles
      .filter((a) => a.published)
      .map((a) => `/blog/${a.categorySlug}/${a.slug}/`)
      .filter((path) => !catalog.includes(`(${path})`));
    expect(missing).toEqual([]);
  });
});
