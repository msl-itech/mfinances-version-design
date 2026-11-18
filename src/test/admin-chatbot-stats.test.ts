import { describe, expect, it } from "vitest";
import { buildStats, parsePeriod, type EventRow, type QuestionRow } from "../../supabase/functions/_shared/chatbot-stats-core";
import { computeInsights, formatDelta, themeOf } from "@/lib/admin-chatbot-insights";
import { toCsv } from "@/lib/csv-export";
import { isProductionHost, isTestTraffic } from "../../supabase/functions/_shared/production-host";

const NOW = new Date("2026-11-18T12:00:00Z").getTime();
const daysAgo = (d: number) => new Date(NOW - d * 86400000).toISOString();
const ev = (type: string, session: string, d: number, page = "/tarifs/"): EventRow => ({ event_type: type, session_id: session, page_path: page, created_at: daysAgo(d) });
const q = (question: string, d: number, extra: Partial<QuestionRow> = {}): QuestionRow => ({
  question, page_path: "/", article_paths: [], has_article: false, created_at: daysAgo(d), guard_status: "ok", prompt_version: "v4", ...extra,
});

describe("période", () => {
  it("accepte 7, 30, 90 jours ; 30 par défaut", () => {
    expect(parsePeriod("7")).toBe(7);
    expect(parsePeriod("90")).toBe(90);
    expect(parsePeriod("365")).toBe(30);
    expect(parsePeriod(null)).toBe(30);
  });
  it("compare aux 7 jours précédents", () => {
    const s = buildStats(7, [ev("opened", "a", 1), ev("opened", "b", 3), ev("opened", "c", 10), ev("opened", "d", 20)], [], NOW);
    expect(s.totals.totalOpens).toBe(2);
    expect(s.previousTotals.totalOpens).toBe(1);
    expect(s.series).toHaveLength(7);
  });
});

describe("essais exclus", () => {
  it("seul mfinances.be compte", () => {
    expect(isProductionHost("mfinances.be")).toBe(true);
    expect(isProductionHost("www.mfinances.be")).toBe(true);
    expect(isProductionHost("id-preview--x.lovable.app")).toBe(false);
    expect(isProductionHost("localhost")).toBe(false);
  });
  it("une session « test- » est un essai même depuis le vrai site", () => {
    expect(isTestTraffic("https://mfinances.be", "test-guard-1")).toBe(true);
    expect(isTestTraffic("https://mfinances.be", "1795-abc")).toBe(false);
  });
});

describe("constats", () => {
  it("alerte à partir de 10 % de replis sur au moins 5 questions", () => {
    const qs = [q("a", 1), q("b", 1), q("c", 1), q("d", 1), q("e", 1), q("f", 1), q("g", 1), q("h", 1), q("i", 1), q("j", 1, { guard_status: "fallback" })];
    expect(computeInsights(buildStats(30, [], qs, NOW)).some((i) => i.tone === "alerte")).toBe(true);
    const fewer = qs.slice(0, 9);
    expect(computeInsights(buildStats(30, [], fewer, NOW)).some((i) => i.tone === "alerte")).toBe(false);
  });
  it("propose un article à partir de 2 questions sans article sur un même thème", () => {
    const s = buildStats(30, [], [q("Gérez-vous la paie de mes employés ?", 1), q("Et les fiches de paie ?", 2)], NOW);
    expect(computeInsights(s).some((i) => i.title.includes("salaires et paie"))).toBe(true);
    const one = buildStats(30, [], [q("Gérez-vous la paie ?", 1)], NOW);
    expect(computeInsights(one).some((i) => i.title.includes("salaires et paie"))).toBe(false);
  });
  it("signale une page avec 5 ouvertures et moins de 20 % de questions", () => {
    const events = ["a", "b", "c", "d", "e"].map((s) => ev("opened", s, 1, "/services/"));
    expect(computeInsights(buildStats(30, events, [], NOW)).some((i) => i.title.startsWith("/services/"))).toBe(true);
  });
  it("signale l'absence de clic rendez-vous à partir de 10 messages", () => {
    const events = Array.from({ length: 10 }, (_, i) => ev("message_sent", `s${i}`, 1));
    expect(computeInsights(buildStats(30, events, [], NOW)).some((i) => i.title.startsWith("Aucun clic"))).toBe(true);
  });
  it("une question sur la TVA est classée en TVA", () => {
    expect(themeOf("Que comprend la TVA ?")).toBe("TVA");
  });
  it("évolution", () => {
    expect(formatDelta(15, 10)).toBe("+50 %");
    expect(formatDelta(5, 10)).toBe("-50 %");
    expect(formatDelta(3, 0)).toBe("nouveau");
    expect(formatDelta(0, 0)).toBe("=");
  });
});

describe("export Excel", () => {
  it("séparateur « ; », guillemets échappés, formules neutralisées", () => {
    const csv = toCsv([["Question", "Page"], ['=HYPERLINK("x")', "a;b"]]);
    expect(csv.startsWith("\uFEFF")).toBe(true);
    expect(csv).toContain("\"'=HYPERLINK(\"\"x\"\")\";\"a;b\"");
  });
});
