import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// Routes statiques à pré-rendre (pages publiques stables, à fort enjeu SEO)
const staticRoutes = [
  "/",
  "/services/",
  "/services/daf-externalise/",
  "/services/controle-de-gestion/",
  "/services/tresorerie/",
  "/services/comptabilite/",
  "/services/fiscalite/",
  "/services/creation-entreprise/",
  "/tarifs/",
  "/diagnostic/",
  "/qui-nous-accompagnons/",
  "/qui-nous-accompagnons/independants-et-startups/",
  "/qui-nous-accompagnons/commerce-et-horeca/",
  "/qui-nous-accompagnons/professions-de-sante/",
  "/qui-nous-accompagnons/entreprises-en-croissance/",
  "/qui-nous-accompagnons/promoteurs-immobiliers/",
  "/qui-nous-accompagnons/asbl/",
  "/qui-nous-accompagnons/societe-exploitation/",
  "/qui-nous-accompagnons/societe-de-moyens/",
  "/qui-nous-accompagnons/societe-de-management/",
  "/contact/",
  "/a-propos/",
  "/support/",
  "/blog/",
  "/blog/tresorerie/",
  "/blog/daf-externalise/",
  "/blog/controle-de-gestion/",
  "/blog/fiscalite-belgique/",
  "/blog/creation-societe/",
  "/blog/fiscalite-belgique/bureau-a-domicile/",
  "/mentions-legales/",
  "/politique-de-confidentialite/",
  "/politique-de-cookies/",
  "/checklist-tresorerie/",
  "/frais-defendables/",
  "/ressources/calculateur-bureau/",
  "/ressources/generateur-bail/",
  "/ressources/checklist-controle-bureau/",
];

// Charge dynamiquement la liste des articles publiés depuis blog-data.ts
async function loadBlogRoutes(): Promise<string[]> {
  try {
    // Import dynamique TS via tsx-like fallback : on parse le fichier
    const fs = await import("fs/promises");
    const content = await fs.readFile(
      path.resolve(__dirname, "src/data/blog-data.ts"),
      "utf-8"
    );

    // Extraction simple des couples (slug, categorySlug, published) via regex
    const articleBlocks = content.match(/\{[^{}]*slug:\s*"[^"]+",[^{}]*\}/g) || [];
    const routes: string[] = [];
    for (const block of articleBlocks) {
      const slugMatch = block.match(/\bslug:\s*"([^"]+)"/);
      const catMatch = block.match(/categorySlug:\s*"([^"]+)"/);
      const publishedMatch = block.match(/published:\s*(true|false)/);
      if (slugMatch && catMatch && publishedMatch?.[1] === "true") {
        routes.push(`/blog/${catMatch[1]}/${slugMatch[1]}/`);
      }
    }
    return routes;
  } catch (err) {
    console.warn("[prerender] Impossible de charger les routes blog:", err);
    return [];
  }
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const blogRoutes = mode === "production" ? await loadBlogRoutes() : [];
  const allRoutes = [...staticRoutes, ...blogRoutes];

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "production" &&
        prerender({
          routes: allRoutes,
          renderer: "@prerenderer/renderer-puppeteer",
          rendererOptions: {
            renderAfterTime: 1500,
            headless: "new",
            maxConcurrentRoutes: 4,
          },
          postProcess(renderedRoute: any) {
            // Nettoyage : retirer les scripts d'analytics du HTML pré-rendu inutiles
            // (ils s'exécuteront via le bundle JS comme d'habitude)
            return renderedRoute;
          },
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
