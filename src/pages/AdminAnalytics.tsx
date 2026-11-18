import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Users, Send, Lock, CalendarCheck, Mail, Download, AlertTriangle, Lightbulb, Info } from "lucide-react";
import type { ChatbotStats, PeriodDays } from "../../supabase/functions/_shared/chatbot-stats-core";
import { computeInsights, formatDelta, type Insight } from "@/lib/admin-chatbot-insights";
import { downloadCsv } from "@/lib/csv-export";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import SEOHead from "@/components/SEOHead";

type Stats = ChatbotStats;

const PERIODS: PeriodDays[] = [7, 30, 90];

const FUNNEL_LABELS: [string, string][] = [
  ["opened", "Assistant ouvert"],
  ["message_sent", "Question posée"],
  ["article_click", "Article ouvert"],
  ["guide_click", "Guide gratuit ouvert"],
  ["diagnostic_click", "Diagnostic ouvert"],
  ["booking_click", "Clic « Réserver un appel »"],
  ["lead_submitted", "E-mail laissé"],
];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-BE", { day: "2-digit", month: "2-digit" });

const PASSWORD_KEY = "mf_admin_pwd";

// Espace interne : jamais indexé par les moteurs de recherche (mécanisme centralisé SEOHead).
export default function AdminAnalytics() {
  return (
    <>
      <SEOHead
        title="Espace interne | MFinances"
        description="Espace interne MFinances."
        canonical="https://mfinances.be/admin/analytics/"
        noIndex
      />
      <AdminAnalyticsContent />
    </>
  );
}

function AdminAnalyticsContent() {

  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [days, setDays] = useState<PeriodDays>(30);

  const fetchStats = async (pwd: string, period: PeriodDays = days) => {
    setLoading(true);
    setError("");
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot-stats?days=${period}`;
      const resp = await fetch(url, {
        headers: {
          "x-admin-password": pwd,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });
      if (resp.status === 401) {
        setError("Mot de passe incorrect");
        sessionStorage.removeItem(PASSWORD_KEY);
        setAuthed(false);
        return;
      }
      if (!resp.ok) throw new Error("Erreur serveur");
      const data = await resp.json();
      setStats(data);
      setAuthed(true);
      sessionStorage.setItem(PASSWORD_KEY, pwd);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(PASSWORD_KEY);
    if (saved) {
      setPassword(saved);
      fetchStats(saved);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(password);
  };

  // ── Login screen ──
  if (!authed) {
    return (
    <div ref={root} className="min-h-screen flex items-center justify-center bg-secondary p-4">
        <Card className="p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-accent" size={24} />
            <h1 className="font-display text-2xl">Accès administrateur</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="accent" className="w-full rounded-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Se connecter"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  const insights = computeInsights(stats);
  const f = stats.funnel;
  const pf = stats.previousFunnel;
  const periodLabel = `${stats.period.days} derniers jours`;
  const today = new Date().toISOString().slice(0, 10);

  const changePeriod = (d: PeriodDays) => {
    if (d === days || loading) return;
    setDays(d);
    fetchStats(password, d);
  };

  const exportQuestions = () =>
    downloadCsv(
      [
        ["Date", "Page", "Question", "Articles proposés", "Contrôle", "Version des consignes"],
        ...stats.questionsExport.map((q) => [
          new Date(q.date).toLocaleString("fr-BE"),
          q.page ?? "",
          q.question,
          q.articles.join(" | "),
          q.guard === "ok" ? "acceptée" : q.guard === "regenerated" ? "réécrite" : q.guard === "fallback" ? "repli" : "",
          q.version ?? "",
        ]),
      ],
      `assistant-questions-${stats.period.days}j-${today}.csv`,
    );

  const exportFigures = () =>
    downloadCsv(
      [
        ["Indicateur", periodLabel, "Période précédente"],
        ["Visites avec l'assistant", stats.totals.uniqueSessions, stats.previousTotals.uniqueSessions],
        ["Ouvertures", stats.totals.totalOpens, stats.previousTotals.totalOpens],
        ["Messages envoyés", stats.totals.totalMessages, stats.previousTotals.totalMessages],
        ["Questions enregistrées", stats.questionsSummary.total, stats.questionsSummary.previousTotal],
        ...FUNNEL_LABELS.map(([k, label]) => [`Parcours : ${label}`, f[k] ?? 0, pf[k] ?? 0]),
        [],
        ["Page d'ouverture", "Ouvertures", "Visites ayant posé une question"],
        ...stats.topPages.map((p) => [p.path, p.count, p.asked]),
        [],
        ["Article recommandé", "Fois"],
        ...stats.topArticles.map((a) => [a.path, a.count]),
      ],
      `assistant-chiffres-${stats.period.days}j-${today}.csv`,
    );

  return (
    <div className="min-h-screen bg-secondary py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-accent/75 text-[11px] font-bold tracking-[0.15em] uppercase">
              Analytics
            </span>
            <h1 className="font-display text-3xl mt-1">Tableau de bord de l'assistant</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Visites réelles sur mfinances.be uniquement : les essais (aperçu, tests) sont exclus.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => {
              sessionStorage.removeItem(PASSWORD_KEY);
              setAuthed(false);
              setPassword("");
              setStats(null);
            }}
          >
            Déconnexion
          </Button>
        </div>

        {/* Période + exports */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div role="group" aria-label="Période" className="inline-flex rounded-full bg-card border border-border p-1">
            {PERIODS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => changePeriod(d)}
                aria-pressed={days === d}
                className={`min-h-[40px] px-4 rounded-full text-sm font-medium transition-colors ${
                  days === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {d} jours
              </button>
            ))}
            {loading && <Loader2 className="animate-spin text-muted-foreground self-center mx-2" size={16} aria-label="Chargement" />}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-full gap-2" onClick={exportQuestions} disabled={stats.questionsExport.length === 0}>
              <Download size={16} aria-hidden="true" /> Questions (Excel)
            </Button>
            <Button variant="outline" className="rounded-full gap-2" onClick={exportFigures}>
              <Download size={16} aria-hidden="true" /> Chiffres (Excel)
            </Button>
          </div>
        </div>

        {/* Constats */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-xl mb-1">À retenir</h2>
          <p className="text-sm text-muted-foreground mb-4">Constats calculés automatiquement sur les {periodLabel}.</p>
          <ul className="space-y-3">
            {insights.map((i, idx) => (
              <InsightRow key={idx} insight={i} />
            ))}
          </ul>
        </Card>

        {/* Indicateurs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KpiCard icon={<Users size={20} />} label="Visites avec l'assistant" value={stats.totals.uniqueSessions} previous={stats.previousTotals.uniqueSessions} />
          <KpiCard icon={<Send size={20} />} label="Messages envoyés" value={stats.totals.totalMessages} previous={stats.previousTotals.totalMessages} />
          <KpiCard icon={<CalendarCheck size={20} />} label="Clics « Réserver un appel »" value={f.booking_click ?? 0} previous={pf.booking_click ?? 0} />
          <KpiCard icon={<Mail size={20} />} label="E-mails laissés" value={f.lead_submitted ?? 0} previous={pf.lead_submitted ?? 0} />
        </div>

        {/* Courbe */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-xl mb-4">Activité : {periodLabel}</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.series}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickFormatter={(d) => formatDate(d)}
                  minTickGap={16}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
                <Tooltip
                  labelFormatter={(d) => formatDate(String(d))}
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="opens" name="Ouvertures" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="messages" name="Messages" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Parcours */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-xl mb-1">Parcours des visiteurs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Visites ayant atteint chaque étape, et le chiffre de la période précédente. Le rendez-vous final se confirme dans Odoo (source « chatbot »).
          </p>
          <div className="space-y-3">
            {FUNNEL_LABELS.map(([key, label]) => {
              const value = f[key] ?? 0;
              const base = f.opened || 0;
              const p = base > 0 ? Math.round((value / base) * 100) : 0;
              return (
                <div key={key} className="grid grid-cols-[1fr_auto] md:grid-cols-[14rem_1fr_9rem] items-center gap-x-3 gap-y-1">
                  <span className="text-sm">{label}</span>
                  <div className="order-3 md:order-none col-span-2 md:col-span-1 h-3 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${p}%` }} />
                  </div>
                  <span className="text-right text-sm font-bold">
                    {value.toLocaleString("fr-BE")} <span className="text-muted-foreground font-normal">({p} %) · avant {pf[key] ?? 0}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Questions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="font-display text-xl mb-1">Questions sans article</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {stats.questionsSummary.withoutArticle} sur {stats.questionsSummary.total} questions n'ont trouvé aucun article : idées de FAQ ou d'articles.
            </p>
            <QuestionList items={stats.unansweredQuestions.slice(0, 50)} />
          </Card>
          <Card className="p-6">
            <h2 className="font-display text-xl mb-1">Dernières questions</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Courriels et téléphones masqués automatiquement. Conservation 13 mois.
            </p>
            <QuestionList items={stats.recentQuestions} />
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="font-display text-xl mb-1">Contrôle des réponses</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Par version des consignes : réponses acceptées, réécrites une fois, ou remplacées par la réponse de repli.
            </p>
            {stats.guardSummary.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucune question sur la période.</p>
            ) : (
              <div className="space-y-2">
                {stats.guardSummary.map((g) => {
                  const total = g.ok + g.regenerated + g.fallback;
                  return (
                    <div key={g.version} className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-border/50 last:border-0 text-sm">
                      <span className="font-mono">{g.version}</span>
                      <span className="text-muted-foreground">
                        {g.ok} acceptées · {g.regenerated} réécrites · <strong className="text-foreground">{g.fallback} replis</strong>
                        {total > 0 ? ` (${Math.round((g.fallback / total) * 100)} %)` : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
          <Card className="p-6">
            <h2 className="font-display text-xl mb-1">Questions qui ont fini en repli</h2>
            <p className="text-sm text-muted-foreground mb-4">
              À relire : contrôle trop strict, ou information manquante dans les consignes.
            </p>
            <QuestionList items={stats.recentFallbacks} />
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="font-display text-xl mb-4">Pages où l'assistant est ouvert</h2>
            {stats.topPages.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucune donnée sur la période.</p>
            ) : (
              <div className="space-y-2">
                {stats.topPages.map((p) => (
                  <div key={p.path} className="flex items-center justify-between gap-3 py-2 border-b border-border/50 last:border-0">
                    <span className="font-mono text-sm break-all">{p.path}</span>
                    <span className="text-sm whitespace-nowrap">
                      <strong className="text-accent">{p.count}</strong>
                      <span className="text-muted-foreground"> · {p.sessions > 0 ? Math.round((p.asked / p.sessions) * 100) : 0} % posent une question</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card className="p-6">
            <h2 className="font-display text-xl mb-4">Articles les plus recommandés</h2>
            {stats.topArticles.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun article recommandé sur la période.</p>
            ) : (
              <div className="space-y-2">
                {stats.topArticles.map((a) => (
                  <div key={a.path} className="flex items-center justify-between gap-3 py-2 border-b border-border/50 last:border-0">
                    <span className="font-mono text-sm break-all">{a.path}</span>
                    <span className="font-bold text-accent">{a.count}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function InsightRow({ insight }: { insight: Insight }) {
  const Icon = insight.tone === "alerte" ? AlertTriangle : insight.tone === "action" ? Lightbulb : Info;
  const badge =
    insight.tone === "alerte"
      ? "bg-primary text-primary-foreground"
      : insight.tone === "action"
        ? "bg-secondary text-primary border border-primary/20"
        : "bg-muted text-muted-foreground";
  return (
    <li className="flex gap-3">
      <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${badge}`}>
        <Icon size={16} aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-bold text-foreground">{insight.title}</p>
        <p className="text-sm text-muted-foreground">{insight.detail}</p>
      </div>
    </li>
  );
}

function KpiCard({
  icon,
  label,
  value,
  previous,
}: {
  icon?: React.ReactNode;
  label: string;
  value: number;
  previous?: number;
}) {
  return (
    <Card className="p-5">
      {icon && <div className="text-accent mb-2">{icon}</div>}
      <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">{label}</p>
      <p className="font-display text-3xl mt-1">{value.toLocaleString("fr-BE")}</p>
      {previous !== undefined && (
        <p className="text-xs text-muted-foreground mt-1">
          <strong className="text-foreground">{formatDelta(value, previous)}</strong> vs période d'avant ({previous.toLocaleString("fr-BE")})
        </p>
      )}
    </Card>
  );
}

function QuestionList({ items }: { items: { question: string; page: string | null; date: string }[] }) {
  if (items.length === 0) {
    return <p className="text-muted-foreground text-sm">Aucune question pour l'instant.</p>;
  }
  return (
    <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
      {items.map((q, i) => (
        <li key={i} className="py-2 border-b border-border/50 last:border-0">
          <p className="text-sm">{q.question}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDate(q.date)} · <span className="font-mono">{q.page ?? "?"}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
