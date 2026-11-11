import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
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

// Charge dynamiquement la liste des articles publiés depuis blog-data.ts via SSR
async function loadBlogRoutes(): Promise<string[]> {
  const { createServer } = await import("vite");
  const server = await createServer({
    root: __dirname,
    configFile: false,
    logLevel: "silent",
    appType: "custom",
    server: { middlewareMode: true, hmr: false, watch: null },
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  });
  try {
    const module = await server.ssrLoadModule("/src/data/blog-data.ts");
    if (!Array.isArray(module.blogArticles)) throw new Error("blogArticles absent");
    const articles = module.blogArticles.filter((a: { published?: boolean }) => a.published === true);
    const routes = articles.map((a: { categorySlug: string; slug: string }) => `/blog/${a.categorySlug}/${a.slug}/`);
    const categories = articles.map((a: { categorySlug: string }) => `/blog/${a.categorySlug}/`);
    return [...new Set<string>([...routes, ...categories])];
  } finally {
    await server.close();
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

// Sitemap généré automatiquement depuis les pages fixes, blog-data.ts et newsroom-data.ts
async function loadSitemapXml(): Promise<string> {
  const { createServer } = await import("vite");
  const server = await createServer({
    configFile: false,
    logLevel: "silent",
    appType: "custom",
    server: { middlewareMode: true, hmr: false, watch: null },
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  });
  try {
    const [{ renderSitemapXml }, blog, news, pages] = await Promise.all([
      server.ssrLoadModule("/src/lib/sitemap.ts"),
      server.ssrLoadModule("/src/data/blog-data.ts"),
      server.ssrLoadModule("/src/data/newsroom-data.ts"),
      server.ssrLoadModule("/src/data/sitemap-pages.ts"),
    ]);
    return renderSitemapXml({
      origin: pages.SITE_ORIGIN,
      pages: pages.sitemapPages,
      blogArticles: blog.blogArticles,
      blogCategories: blog.blogCategories,
      newsroomArticles: news.newsroomArticles,
    });
  } finally {
    await server.close();
  }
}

function generateSitemap() {
  let xml = "";
  return {
    name: "generate-sitemap",
    apply: "build" as const,
    async buildStart() {
      xml = await loadSitemapXml();
    },
    generateBundle(this: { emitFile: (f: { type: "asset"; fileName: string; source: string }) => void }) {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: xml });
    },
  };
}

function serveSitemapInDev() {
  return {
    name: "serve-sitemap-dev",
    apply: "serve" as const,
    configureServer(server: { middlewares: { use: (fn: (req: { url?: string }, res: { setHeader: (k: string, v: string) => void; end: (b: string) => void }, next: () => void) => void) => void }; ssrLoadModule: (id: string) => Promise<Record<string, any>> }) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/sitemap.xml") return next();
        const [{ renderSitemapXml }, blog, news, pages] = await Promise.all([
          server.ssrLoadModule("/src/lib/sitemap.ts"),
          server.ssrLoadModule("/src/data/blog-data.ts"),
          server.ssrLoadModule("/src/data/newsroom-data.ts"),
          server.ssrLoadModule("/src/data/sitemap-pages.ts"),
        ]);
        res.setHeader("Content-Type", "application/xml; charset=utf-8");
        res.end(renderSitemapXml({ origin: pages.SITE_ORIGIN, pages: pages.sitemapPages, blogArticles: blog.blogArticles, blogCategories: blog.blogCategories, newsroomArticles: news.newsroomArticles }));
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const blogRoutes = mode === "production" ? await loadBlogRoutes() : [];
  const allRoutes = Array.from(new Set([...staticRoutes, ...blogRoutes]));

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
      generateSitemap(),
      serveSitemapInDev(),
      imagetools(),
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
      dedupe: ["react", "react-dom", "gsap"],
    },
    optimizeDeps: {
      include: ["gsap", "gsap/ScrollTrigger"],
    },
  };
});
