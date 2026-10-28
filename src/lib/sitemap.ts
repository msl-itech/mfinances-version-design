import type { BlogArticle, BlogCategory } from "@/data/blog-data";
import type { NewsroomArticle } from "@/data/newsroom-data";
import type { SitemapPage } from "@/data/sitemap-pages";

interface SitemapInput {
  origin: string;
  pages: SitemapPage[];
  blogArticles: BlogArticle[];
  blogCategories: BlogCategory[];
  newsroomArticles: NewsroomArticle[];
}

const latest = (dates: (string | undefined)[]) =>
  dates.filter((d): d is string => !!d && /^\d{4}-\d{2}-\d{2}/.test(d)).map((d) => d.slice(0, 10)).sort().pop();

/** Construit la liste des URL du sitemap (adresse toujours sur le domaine principal, jamais sur le champ canonical). */
export function buildSitemapEntries(input: SitemapInput): SitemapPage[] {
  const articles = input.blogArticles.filter((a) => a.published);
  const news = input.newsroomArticles.filter((a) => a.validated);
  const articleDate = (a: BlogArticle) => latest([a.dateModified, a.date]);
  const newsDate = (a: NewsroomArticle) => latest([a.dateModified, a.eventDate]);

  const entries: SitemapPage[] = [
    ...input.pages,
    { path: "/blog/", lastmod: latest(articles.map(articleDate)) },
    ...input.blogCategories.map((c) => ({
      path: `/blog/${c.slug}/`,
      lastmod: latest(articles.filter((a) => a.categorySlug === c.slug).map(articleDate)),
    })),
    ...articles.map((a) => ({ path: `/blog/${a.categorySlug}/${a.slug}/`, lastmod: articleDate(a) })),
    ...(news.length ? [{ path: "/newsroom/", lastmod: latest(news.map(newsDate)) }] : []),
    ...news.map((a) => ({ path: `/newsroom/${a.slug}/`, lastmod: newsDate(a) })),
  ];

  const seen = new Map<string, SitemapPage>();
  for (const e of entries) if (!seen.has(e.path)) seen.set(e.path, e);
  return [...seen.values()];
}

export function renderSitemapXml(input: SitemapInput): string {
  const urls = buildSitemapEntries(input)
    .map((e) => `  <url><loc>${input.origin}${e.path}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
