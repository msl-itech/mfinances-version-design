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
  "/notre-organisation/",
  "/societe-en-veille/",
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

// Contrôle des PDF publiés : bloque la mise en ligne si un PDF de /public est vide ou tronqué
function checkPublicPdfs() {
  return {
    name: "check-public-pdfs",
    async buildStart() {
      const fs = await import("fs/promises");
      const publicDir = path.resolve(__dirname, "public");
      const files: string[] = [];
      async function walk(dir: string) {
        for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) await walk(full);
          else if (entry.name.toLowerCase().endsWith(".pdf")) files.push(full);
        }
      }
      await walk(publicDir);
      const broken: string[] = [];
      for (const file of files) {
        const buf = await fs.readFile(file);
        const head = buf.subarray(0, 5).toString("latin1");
        const tail = buf.subarray(Math.max(0, buf.length - 1024)).toString("latin1");
        if (buf.length < 1024 || head !== "%PDF-" || !tail.includes("%%EOF")) {
          broken.push(`${path.relative(publicDir, file)} (${buf.length} octets)`);
        }
      }
      if (broken.length > 0) {
        throw new Error(`[check-public-pdfs] PDF vide ou tronqué, mise en ligne bloquée : ${broken.join(", ")}`);
      }
    },
  };
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
      checkPublicPdfs(),
      react(),
      mode === "development" && componentTagger(),
      mode === "production" &&
        !process.env.VERCEL &&
        prerender({
          routes: allRoutes,
          renderer: "@prerenderer/renderer-puppeteer",
          rendererOptions: {
            renderAfterTime: 1500,
            headless: true,
            maxConcurrentRoutes: 4,
          },
          postProcess(_renderedRoute: { html: string; route: string }) {
            // Nettoyage : retirer les scripts d'analytics du HTML pré-rendu inutiles
            // (ils s'exécuteront via le bundle JS comme d'habitude)
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
