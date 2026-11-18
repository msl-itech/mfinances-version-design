// Calcul des statistiques de l'assistant (pur TypeScript : utilisé par chatbot-stats et par les tests).
// Les essais (is_test) sont exclus en amont par la requête ; ce module ne fait que compter.

export const ALLOWED_PERIODS = [7, 30, 90] as const;
export type PeriodDays = (typeof ALLOWED_PERIODS)[number];

export function parsePeriod(raw: string | null | undefined): PeriodDays {
  const n = Number(raw);
  return (ALLOWED_PERIODS as readonly number[]).includes(n) ? (n as PeriodDays) : 30;
}

export type EventRow = { event_type: string; session_id: string; page_path: string | null; created_at: string };
export type QuestionRow = {
  question: string;
  page_path: string | null;
  article_paths: string[] | null;
  has_article: boolean;
  created_at: string;
  guard_status: string | null;
  prompt_version: string | null;
};

export const FUNNEL_STEPS = ["opened", "message_sent", "article_click", "guide_click", "diagnostic_click", "booking_click", "lead_submitted"] as const;

const DAY = 24 * 60 * 60 * 1000;

function funnelOf(events: EventRow[]): Record<string, number> {
  const sets: Record<string, Set<string>> = Object.fromEntries(FUNNEL_STEPS.map((k) => [k, new Set<string>()]));
  for (const e of events) sets[e.event_type]?.add(e.session_id);
  return Object.fromEntries(FUNNEL_STEPS.map((k) => [k, sets[k].size]));
}

function totalsOf(events: EventRow[]) {
  const sessions = new Set<string>();
  let opens = 0;
  let messages = 0;
  for (const e of events) {
    sessions.add(e.session_id);
    if (e.event_type === "opened") opens++;
    else if (e.event_type === "message_sent") messages++;
  }
  return {
    uniqueSessions: sessions.size,
    totalOpens: opens,
    totalMessages: messages,
    avgMessagesPerSession: sessions.size > 0 ? Number((messages / sessions.size).toFixed(2)) : 0,
  };
}

/**
 * Découpe les données en période actuelle (les `days` derniers jours) et période précédente
 * (les `days` jours d'avant), puis calcule tout ce que la page affiche.
 */
export function buildStats(days: PeriodDays, events: EventRow[], questions: QuestionRow[], now = Date.now()) {
  const start = now - days * DAY;
  const prevStart = now - 2 * days * DAY;
  const t = (d: string) => new Date(d).getTime();
  const cur = events.filter((e) => t(e.created_at) >= start && t(e.created_at) <= now);
  const prev = events.filter((e) => t(e.created_at) >= prevStart && t(e.created_at) < start);
  const curQ = questions.filter((q) => t(q.created_at) >= start && t(q.created_at) <= now);
  const prevQ = questions.filter((q) => t(q.created_at) >= prevStart && t(q.created_at) < start);

  // Pages : ouvertures, visites qui ont posé une question depuis cette page.
  const pages: Record<string, { opens: number; openSessions: Set<string>; messageSessions: Set<string> }> = {};
  for (const e of cur) {
    if (!e.page_path) continue;
    const p = (pages[e.page_path] ??= { opens: 0, openSessions: new Set(), messageSessions: new Set() });
    if (e.event_type === "opened") {
      p.opens++;
      p.openSessions.add(e.session_id);
    } else if (e.event_type === "message_sent") p.messageSessions.add(e.session_id);
  }
  const topPages = Object.entries(pages)
    .filter(([, v]) => v.opens > 0)
    .map(([path, v]) => {
      const asked = [...v.openSessions].filter((s) => v.messageSessions.has(s)).length;
      return { path, count: v.opens, sessions: v.openSessions.size, asked };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Courbe jour par jour sur la période.
  const daily: Record<string, { opens: number; messages: number }> = {};
  for (const e of cur) {
    const k = e.created_at.slice(0, 10);
    daily[k] ??= { opens: 0, messages: 0 };
    if (e.event_type === "opened") daily[k].opens++;
    else if (e.event_type === "message_sent") daily[k].messages++;
  }
  const series: { date: string; opens: number; messages: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const key = new Date(now - i * DAY).toISOString().slice(0, 10);
    series.push({ date: key, opens: daily[key]?.opens ?? 0, messages: daily[key]?.messages ?? 0 });
  }

  const articleCounts: Record<string, number> = {};
  for (const q of curQ) for (const a of q.article_paths || []) articleCounts[a] = (articleCounts[a] || 0) + 1;
  const topArticles = Object.entries(articleCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  const byVersion: Record<string, { ok: number; regenerated: number; fallback: number }> = {};
  for (const q of curQ) {
    const v = q.prompt_version || "avant contrôle";
    byVersion[v] ??= { ok: 0, regenerated: 0, fallback: 0 };
    const s = q.guard_status as "ok" | "regenerated" | "fallback" | null;
    if (s && s in byVersion[v]) byVersion[v][s]++;
  }
  const guardSummary = Object.entries(byVersion)
    .map(([version, c]) => ({ version, ...c }))
    .sort((a, b) => b.version.localeCompare(a.version));

  const withArticle = curQ.filter((q) => q.has_article).length;
  const toItem = (q: QuestionRow) => ({ question: q.question, page: q.page_path, date: q.created_at });

  return {
    period: { days, start: new Date(start).toISOString(), end: new Date(now).toISOString() },
    totals: totalsOf(cur),
    previousTotals: totalsOf(prev),
    funnel: funnelOf(cur),
    previousFunnel: funnelOf(prev),
    topPages,
    series,
    questionsSummary: { total: curQ.length, withArticle, withoutArticle: curQ.length - withArticle, previousTotal: prevQ.length },
    topArticles,
    recentQuestions: curQ.slice(0, 50).map((q) => ({ ...toItem(q), articles: q.article_paths || [] })),
    unansweredQuestions: curQ.filter((q) => !q.has_article).slice(0, 300).map(toItem),
    guardSummary,
    recentFallbacks: curQ.filter((q) => q.guard_status === "fallback").slice(0, 20).map(toItem),
    questionsExport: curQ.map((q) => ({
      ...toItem(q),
      articles: q.article_paths || [],
      guard: q.guard_status,
      version: q.prompt_version,
    })),
  };
}

export type ChatbotStats = ReturnType<typeof buildStats>;
