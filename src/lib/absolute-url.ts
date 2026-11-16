import { SITE_ORIGIN } from "@/data/sitemap-pages";

/** Les robots de partage et Google exigent une adresse complète (https://...) pour les images. */
export function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}
