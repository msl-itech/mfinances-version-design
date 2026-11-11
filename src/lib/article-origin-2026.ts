/** Allowed editorial origins. No personal data or secrets. */
const origins: Record<string, { title: string; path: string; need: string }> = {
  "changer-expert-comptable-belgique-pme": {
    "title": "Changer d'expert-comptable en Belgique : comment réussir la transition dans une PME ?",
    "path": "/blog/comptabilite-odoo/changer-expert-comptable-belgique-pme/",
    "need": "Changer d'expert-comptable"
  },
  "expert-comptable-odoo-belgique-pme": {
    "title": "Expert-comptable Odoo en Belgique : comment choisir le bon partenaire pour votre PME ?",
    "path": "/blog/comptabilite-odoo/expert-comptable-odoo-belgique-pme/",
    "need": "Comptabilité Odoo"
  },
  "cloture-2026-decisions-dirigeant-pme": {
    "title": "Clôture au 31 décembre 2026 : 9 décisions à prendre maintenant quand on dirige une PME",
    "path": "/blog/controle-de-gestion/cloture-2026-decisions-dirigeant-pme/",
    "need": "Trésorerie et pilotage financier"
  },
  "rapports-odoo-dirigeant-pme": {
    "title": "Comptabilité dans Odoo : les 6 rapports qu'un dirigeant de PME devrait lire chaque mois",
    "path": "/blog/controle-de-gestion/rapports-odoo-dirigeant-pme/",
    "need": "Comptabilité Odoo"
  },
  "comptabilite-retard-reprise-pme": {
    "title": "Comptabilité en retard en PME : comment reprendre le dossier sans bloquer l'activité ?",
    "path": "/blog/comptabilite-odoo/comptabilite-retard-reprise-pme/",
    "need": "Comptabilité Odoo"
  },
  "daf-externalise-ou-salarie-pme": {
    "title": "DAF externalisé ou directeur financier salarié : que choisir pour une PME en croissance ?",
    "path": "/blog/daf-externalise/daf-externalise-ou-salarie-pme/",
    "need": "DAF à temps partiel"
  },
  "budget-tresorerie-2027-pme": {
    "title": "Budget 2027 et trésorerie : les décisions qu'une PME doit préparer avant janvier",
    "path": "/blog/controle-de-gestion/budget-tresorerie-2027-pme/",
    "need": "Trésorerie et pilotage financier"
  },
  "peppol-2027-controles-pme-odoo": {
    "title": "Peppol en 2027 : sept contrôles pour fiabiliser la facturation de votre PME dans Odoo",
    "path": "/blog/comptabilite-odoo/peppol-2027-controles-pme-odoo/",
    "need": "Comptabilité Odoo"
  },
  "marge-chantier-odoo-construction": {
    "title": "Marge par chantier : comment piloter une PME de construction avec Odoo ?",
    "path": "/blog/controle-de-gestion/marge-chantier-odoo-construction/",
    "need": "Trésorerie et pilotage financier"
  },
  "reporting-mensuel-pme-expert-comptable": {
    "title": "Reporting financier mensuel : que demander à votre expert-comptable quand votre PME grandit ?",
    "path": "/blog/controle-de-gestion/reporting-mensuel-pme-expert-comptable/",
    "need": "Trésorerie et pilotage financier"
  },
  "inventaire-fin-annee-pme-belgique-2026": {
    "title": "Inventaire de fin d'année 2026 : ce que le dirigeant d'une PME belge doit préparer",
    "path": "/blog/controle-de-gestion/inventaire-fin-annee-pme-belgique-2026/",
    "need": "Comptabilité Odoo"
  },
  "inventaire-physique-odoo-18-pme": {
    "title": "Inventaire physique dans Odoo 18 : huit étapes pour clôturer avec des stocks fiables",
    "path": "/blog/comptabilite-odoo/inventaire-physique-odoo-18-pme/",
    "need": "Comptabilité Odoo"
  },
  "stocks-dormants-reduction-valeur-fin-annee": {
    "title": "Stocks dormants dans Odoo : comment préparer leur valorisation à la clôture ?",
    "path": "/blog/controle-de-gestion/stocks-dormants-reduction-valeur-fin-annee/",
    "need": "Comptabilité Odoo"
  },
  "travaux-en-cours-inventaire-chantiers-fin-annee": {
    "title": "Travaux en cours au 31 décembre : comment préparer l'inventaire d'une PME de construction ?",
    "path": "/blog/controle-de-gestion/travaux-en-cours-inventaire-chantiers-fin-annee/",
    "need": "Trésorerie et pilotage financier"
  }
};
export const articleSlugs2026 = new Set(Object.keys(origins));
const allowedNeeds = ["Changer d'expert-comptable", "Comptabilité Odoo", "Comptabilité et déclarations fiscales", "Création d'entreprise", "DAF à temps partiel", "Optimisation fiscale", "Trésorerie et pilotage financier"];

function normal(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u2019/g, "'").toLowerCase().trim(); }
export function readArticleOrigin2026(params: URLSearchParams) {
 const slug = params.get("article") || ""; const entry = Object.prototype.hasOwnProperty.call(origins, slug) ? origins[slug] : undefined;
 const requested = params.get("besoin") || "";
 const need = allowedNeeds.find(n => normal(n) === normal(requested)) || entry?.need || "";
 return { slug: entry ? slug : "", title: entry?.title || "", path: entry?.path || "", need };
}
export function escapeContactHtml2026(value: string): string {
 const entities: Record<string,string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
 return value.replace(/[&<>"']/g, c => entities[c]);
}
export function originDescription2026(origin: ReturnType<typeof readArticleOrigin2026>): string {
 if (!origin.slug) return "";
 return `<p><strong>Article d'origine :</strong> ${escapeContactHtml2026(origin.title)}</p><p><strong>URL de l'article :</strong> https://mfinances.be${escapeContactHtml2026(origin.path)}</p><p><strong>Identifiant article :</strong> ${escapeContactHtml2026(origin.slug)}</p>`;
}
export function confirmedOdooLead2026(result: { success?: boolean; message?: string; lead_id?: unknown }): boolean {
 return result.success === true && result.message === "ok" && typeof result.lead_id === "number" && Number.isFinite(result.lead_id) && result.lead_id > 0;
}
