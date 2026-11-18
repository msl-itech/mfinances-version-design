import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, MessageCircle, Users, Send, TrendingUp, Lock } from "lucide-react";
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

interface Stats {
  totals: {
    uniqueSessions: number;
    totalOpens: number;
    totalMessages: number;
    avgMessagesPerSession: number;
  };
  windows: {
    today: number;
    last7days: number;
    last30days: number;
  };
  topPages: { path: string; count: number }[];
  series: { date: string; opens: number; messages: number }[];
  funnel?: Record<string, number>;
  questionsSummary?: { total: number; withArticle: number; withoutArticle: number };
  topArticles?: { path: string; count: number }[];
  recentQuestions?: { question: string; page: string | null; date: string; articles: string[] }[];
  unansweredQuestions?: { question: string; page: string | null; date: string }[];
  guardSummary?: { version: string; ok: number; regenerated: number; fallback: number }[];
  recentFallbacks?: { question: string; page: string | null; date: string }[];
}

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

  const fetchStats = async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot-stats`;
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

  if (loading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-accent/75 text-[11px] font-bold tracking-[0.15em] uppercase">
              Analytics
            </span>
            <h1 className="font-display text-3xl mt-1">Tableau de bord chatbot</h1>
          </div>
          <Button
            variant="outline"
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

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KpiCard
            icon={<Users size={20} />}
            label="Sessions uniques (90j)"
            value={stats.totals.uniqueSessions}
          />
          <KpiCard
            icon={<MessageCircle size={20} />}
            label="Ouvertures totales"
            value={stats.totals.totalOpens}
          />
          <KpiCard
            icon={<Send size={20} />}
            label="Messages envoyés"
            value={stats.totals.totalMessages}
          />
          <KpiCard
            icon={<TrendingUp size={20} />}
            label="Msg / session"
            value={stats.totals.avgMessagesPerSession}
          />
        </div>

        {/* Time windows */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <KpiCard label="Aujourd'hui" value={stats.windows.today} />
          <KpiCard label="7 derniers jours" value={stats.windows.last7days} />
          <KpiCard label="30 derniers jours" value={stats.windows.last30days} />
        </div>

        {/* Chart */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-xl mb-4">Activité : 30 derniers jours</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.series}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickFormatter={(d) => d.slice(5)}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="opens"
                  name="Ouvertures"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="messages"
                  name="Messages"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Parcours */}
        {stats.funnel && (
          <Card className="p-6 mb-8">
            <h2 className="font-display text-xl mb-1">Parcours des visiteurs (90 j)</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Nombre de visites ayant atteint chaque étape. Le rendez-vous final se confirme dans Odoo (source « chatbot »).
            </p>
            <div className="space-y-2">
              {FUNNEL_LABELS.map(([key, label]) => {
                const value = stats.funnel?.[key] ?? 0;
                const base = stats.funnel?.opened || 0;
                const pct = base > 0 ? Math.round((value / base) * 100) : 0;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="w-56 text-sm">{label}</span>
                    <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-24 text-right text-sm font-bold">
                      {value.toLocaleString("fr-BE")} <span className="text-muted-foreground font-normal">({pct} %)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Questions */}
        {stats.questionsSummary && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="font-display text-xl mb-1">Questions sans article</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {stats.questionsSummary.withoutArticle} sur {stats.questionsSummary.total} questions n'ont trouvé aucun article : idées de FAQ ou d'articles.
              </p>
              <QuestionList items={stats.unansweredQuestions ?? []} />
            </Card>
            <Card className="p-6">
              <h2 className="font-display text-xl mb-1">Dernières questions</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Courriels et téléphones masqués automatiquement. Conservation 13 mois.
              </p>
              <QuestionList items={stats.recentQuestions ?? []} />
            </Card>
          </div>
        )}

        {stats.guardSummary && stats.guardSummary.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="font-display text-xl mb-1">Contrôle des réponses (90 j)</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Par version des consignes : réponses acceptées, réécrites une fois, ou remplacées par la réponse de repli.
              </p>
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
            </Card>
            <Card className="p-6">
              <h2 className="font-display text-xl mb-1">Questions qui ont fini en repli</h2>
              <p className="text-sm text-muted-foreground mb-4">
                À relire : contrôle trop strict, ou information manquante dans les consignes.
              </p>
              <QuestionList items={stats.recentFallbacks ?? []} />
            </Card>
          </div>
        )}

        {stats.topArticles && stats.topArticles.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="font-display text-xl mb-4">Articles les plus recommandés</h2>
            <div className="space-y-2">
              {stats.topArticles.map((a) => (
                <div key={a.path} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="font-mono text-sm">{a.path}</span>
                  <span className="font-bold text-accent">{a.count}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Top pages */}
        <Card className="p-6">
          <h2 className="font-display text-xl mb-4">Top pages d'ouverture</h2>
          {stats.topPages.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucune donnée pour l'instant.</p>
          ) : (
            <div className="space-y-2">
              {stats.topPages.map((p) => (
                <div
                  key={p.path}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <span className="font-mono text-sm">{p.path}</span>
                  <span className="font-bold text-accent">{p.count}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <Card className="p-5">
      {icon && <div className="text-accent mb-2">{icon}</div>}
      <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">{label}</p>
      <p className="font-display text-3xl mt-1">{value.toLocaleString("fr-BE")}</p>
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
