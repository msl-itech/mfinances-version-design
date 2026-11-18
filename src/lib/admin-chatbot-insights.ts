// Constats automatiques affichés en haut des statistiques de l'assistant.
// Règles simples et explicables : chaque constat dit ce qui se passe et quoi faire.
import { anyTermMatches } from "../../supabase/functions/_shared/chatbot-guard";
import type { ChatbotStats } from "../../supabase/functions/_shared/chatbot-stats-core";

export type Insight = { tone: "alerte" | "action" | "info"; title: string; detail: string };

/** En dessous, les constats sont signalés comme indicatifs. */
export const MIN_OPENS_FOR_CONCLUSIONS = 20;
/** Questions sans article sur un même thème à partir desquelles on propose un article ou une FAQ. */
export const MIN_QUESTIONS_PER_THEME = 2;
/** Part des réponses remplacées par le repli au-delà de laquelle on alerte (avec au moins 5 questions). */
export const FALLBACK_ALERT_RATE = 0.1;
/** Page « muette » : au moins 5 ouvertures, moins de 20 % des visites posent une question. */
export const QUIET_PAGE_MIN_OPENS = 5;
export const QUIET_PAGE_MAX_RATE = 0.2;
/** Assez de questions pour s'étonner de l'absence de clic « Réserver un appel ». */
export const NO_BOOKING_MIN_MESSAGES = 10;
export const MAX_INSIGHTS = 5;

export const QUESTION_THEMES: readonly { label: string; terms: readonly string[] }[] = [
  { label: "salaires et paie", terms: ["salaire*", "paie", "fiche* de paie", "sd worx", "rémunération*", "secrétariat social"] },
  { label: "TVA", terms: ["tva", "franchise", "assujetti*", "peppol", "facturation électronique"] },
  { label: "création d'entreprise", terms: ["créer", "création", "créé*", "srl", "statuts", "capital", "plan financier"] },
  { label: "trésorerie", terms: ["trésorerie", "cash", "bfr", "liquidité*", "prévisionnel"] },
  { label: "impôts (ISOC, IPP)", terms: ["impôt*", "isoc", "ipp", "déclaration*", "vvprbis", "dividende*"] },
  { label: "Odoo", terms: ["odoo", "logiciel", "inventaire"] },
  { label: "tarifs", terms: ["prix", "tarif*", "combien", "coût*", "coûte", "forfait*", "devis"] },
  { label: "bureau à domicile et frais", terms: ["bureau", "domicile", "loyer", "frais", "voiture", "déductible*"] },
  { label: "changer de comptable", terms: ["changer", "nouveau comptable", "quitter", "transition"] },
  { label: "horaires et rendez-vous", terms: ["horaire*", "rendez-vous", "rdv", "délai*", "disponible*", "adresse"] },
];

export function themeOf(question: string): string | null {
  for (const t of QUESTION_THEMES) if (anyTermMatches(question, t.terms)) return t.label;
  return null;
}

const pct = (n: number) => `${Math.round(n * 100)} %`;

export function computeInsights(stats: ChatbotStats): Insight[] {
  const out: Insight[] = [];
  const opens = stats.funnel.opened ?? 0;
  const days = stats.period.days;

  if (opens < MIN_OPENS_FOR_CONCLUSIONS) {
    out.push({
      tone: "info",
      title: `Encore peu de données : ${opens} ouverture${opens > 1 ? "s" : ""} sur ${days} jours`,
      detail: "Les constats ci-dessous sont indicatifs. Élargissez la période pour plus de recul.",
    });
  }

  // Réponses remplacées par le repli.
  const totalQ = stats.guardSummary.reduce((s, g) => s + g.ok + g.regenerated + g.fallback, 0);
  const fallbacks = stats.guardSummary.reduce((s, g) => s + g.fallback, 0);
  if (totalQ >= 5 && fallbacks / totalQ >= FALLBACK_ALERT_RATE) {
    out.push({
      tone: "alerte",
      title: `${pct(fallbacks / totalQ)} des réponses ont fini en repli`,
      detail: "Relisez « Questions qui ont fini en repli » : contrôle trop strict ou information manquante dans les consignes.",
    });
  }

  // Thèmes de questions restées sans article.
  const themes: Record<string, number> = {};
  for (const q of stats.unansweredQuestions) {
    const t = themeOf(q.question);
    if (t) themes[t] = (themes[t] || 0) + 1;
  }
  Object.entries(themes)
    .filter(([, n]) => n >= MIN_QUESTIONS_PER_THEME)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .forEach(([label, n]) =>
      out.push({
        tone: "action",
        title: `${n} questions sur « ${label} » sans article`,
        detail: "Idée d'article ou de réponse FAQ à faire valider par Mika.",
      }),
    );

  // Pages où l'on ouvre l'assistant sans poser de question.
  stats.topPages
    .filter((p) => p.count >= QUIET_PAGE_MIN_OPENS && p.sessions > 0 && p.asked / p.sessions < QUIET_PAGE_MAX_RATE)
    .slice(0, 1)
    .forEach((p) =>
      out.push({
        tone: "action",
        title: `${p.path} : ${p.count} ouvertures, ${pct(p.asked / p.sessions)} posent une question`,
        detail: "Revoir l'accroche et les questions suggérées de cette page.",
      }),
    );

  // Rendez-vous.
  const bookings = stats.funnel.booking_click ?? 0;
  const prevBookings = stats.previousFunnel.booking_click ?? 0;
  if (stats.totals.totalMessages >= NO_BOOKING_MIN_MESSAGES && bookings === 0) {
    out.push({
      tone: "action",
      title: `Aucun clic « Réserver un appel » malgré ${stats.totals.totalMessages} messages`,
      detail: "Vérifier que l'assistant propose bien le rendez-vous et que le bouton est visible.",
    });
  } else if (bookings > 0 || prevBookings > 0) {
    out.push({
      tone: "info",
      title: `${bookings} clic${bookings > 1 ? "s" : ""} « Réserver un appel » (${prevBookings} la période d'avant)`,
      detail: "Le rendez-vous final se confirme dans Odoo, source « chatbot ».",
    });
  }

  if (out.length === 0 || out.every((i) => i.tone === "info" && i.title.startsWith("Encore peu"))) {
    out.push({ tone: "info", title: "Rien d'anormal sur la période", detail: "Aucune page, aucun thème ni aucun contrôle ne demande d'action." });
  }
  return out.slice(0, MAX_INSIGHTS);
}

/** Évolution par rapport à la période précédente, en texte court (« +25 % », « nouveau », « = »). */
export function formatDelta(current: number, previous: number): string {
  if (previous === 0) return current === 0 ? "=" : "nouveau";
  const d = Math.round(((current - previous) / previous) * 100);
  return d === 0 ? "=" : `${d > 0 ? "+" : ""}${d} %`;
}
