import { blogArticles, blogCategories } from "@/data/blog-data";
import { BOOKING_URL } from "@/lib/appointment";

export interface PageGuide {
  label: string;
  href: string;
}

/** Guide gratuit proposé dans l'assistant selon la page visitée (préfixe le plus long gagnant). */
const PAGE_GUIDES: Array<[string, PageGuide]> = [
  ["/blog/fiscalite-belgique/bureau-a-domicile/", { label: "Checklist contrôle fiscal bureau à domicile", href: "/ressources/checklist-controle-bureau/" }],
  ["/blog/fiscalite-belgique/calcul-bureau-a-domicile/", { label: "Calculateur bureau à domicile", href: "/ressources/calculateur-bureau/" }],
  ["/blog/fiscalite-belgique/piece-usage-mixte-bureau/", { label: "Calculateur bureau à domicile", href: "/ressources/calculateur-bureau/" }],
  ["/blog/fiscalite-belgique/locataire-societe-sous-location-loyer/", { label: "Générateur de bail bureau à domicile", href: "/ressources/generateur-bail/" }],
  ["/blog/fiscalite-belgique/frais-professionnels-deductibles-belgique/", { label: "Frais défendables : 30 postes vérifiés", href: "/frais-defendables/" }],
  ["/blog/fiscalite-belgique/", { label: "Frais défendables : 30 postes vérifiés", href: "/frais-defendables/" }],
  ["/blog/tresorerie/", { label: "Checklist trésorerie gratuite", href: "/checklist-tresorerie/" }],
  ["/services/tresorerie/", { label: "Checklist trésorerie gratuite", href: "/checklist-tresorerie/" }],
  ["/services/fiscalite/", { label: "Frais défendables : 30 postes vérifiés", href: "/frais-defendables/" }],
  ["/blog/", { label: "Diagnostic financier gratuit (8 questions)", href: "/diagnostic/" }],
  ["/services/", { label: "Diagnostic financier gratuit (8 questions)", href: "/diagnostic/" }],
];

export function getPageGuide(path: string): PageGuide | null {
  const p = path.endsWith("/") ? path : `${path}/`;
  for (const [prefix, guide] of PAGE_GUIDES) {
    if (p.startsWith(prefix)) return guide;
  }
  return null;
}

/** Accroches et questions propres à chaque catégorie du blog. */
export const BLOG_CATEGORY_CHAT: Record<string, { proactive: string; suggestions: string[] }> = {
  tresorerie: {
    proactive: "Cet article vous parle ? Je peux vous dire en 2 minutes si votre trésorerie est sous contrôle.",
    suggestions: ["Comment anticiper un trou de trésorerie ?", "C'est quoi le BFR ?", "Combien garder en réserve ?"],
  },
  "fiscalite-belgique": {
    proactive: "Une question sur votre situation fiscale après cette lecture ? Je peux vous orienter tout de suite.",
    suggestions: ["Salaire ou dividendes ?", "C'est quoi le VVPRbis ?", "Bureau à domicile, quels frais ?"],
  },
  "daf-externalise": {
    proactive: "Vous vous demandez si un DAF à temps partiel est utile pour vous ? Je peux vous aider à trancher.",
    suggestions: ["Combien coûte un DAF externalisé ?", "À partir de quelle taille ?", "DAF ou expert-comptable ?"],
  },
  "controle-de-gestion": {
    proactive: "Vous voulez des chiffres pour piloter, pas seulement pour déclarer ? Parlons de vos indicateurs.",
    suggestions: ["Quels KPIs suivre ?", "Comment faire un budget annuel ?", "Comment lire mes écarts ?"],
  },
  "creation-societe": {
    proactive: "Vous préparez la création de votre société ? Je peux vous expliquer les étapes et les coûts.",
    suggestions: ["SRL ou indépendant ?", "Combien coûte une création ?", "Le plan financier est-il obligatoire ?"],
  },
  "comptabilite-odoo": {
    proactive: "Vous travaillez sur Odoo ? Je peux vous dire comment on reprend ou fiabilise votre comptabilité.",
    suggestions: ["Changer d'expert-comptable, comment ?", "Ma comptabilité est en retard", "Peppol dans Odoo, que vérifier ?"],
  },
};

export function getBlogCategorySlug(path: string): string | null {
  const m = /^\/blog\/([a-z0-9-]+)\//.exec(path.endsWith("/") ? path : `${path}/`);
  return m && BLOG_CATEGORY_CHAT[m[1]] ? m[1] : null;
}

/** Adresses du blog que l'assistant a le droit d'afficher (articles publiés + catégories). */
export const ALLOWED_BLOG_PATHS = new Set<string>([
  ...blogCategories.map((c) => c.href),
  ...blogArticles.filter((a) => a.published).map((a) => `/blog/${a.categorySlug}/${a.slug}/`),
]);

export type ChatLinkKind = "booking" | "article" | "diagnostic" | "guide" | "contact" | "other";

const GUIDE_PATHS = ["/checklist-tresorerie/", "/ressources/", "/frais-defendables/"];

export function classifyChatLink(href: string): ChatLinkKind {
  if (href.startsWith(BOOKING_URL) || href.includes("odoo.mfinances.be/appointment")) return "booking";
  const path = href.split(/[?#]/)[0];
  if (ALLOWED_BLOG_PATHS.has(path.endsWith("/") ? path : `${path}/`) && /^\/blog\/[^/]+\/[^/]+\/?$/.test(path)) return "article";
  if (path.startsWith("/diagnostic")) return "diagnostic";
  if (GUIDE_PATHS.some((g) => path.startsWith(g))) return "guide";
  if (path.startsWith("/contact") || href.startsWith("tel:") || href.startsWith("mailto:")) return "contact";
  return "other";
}
