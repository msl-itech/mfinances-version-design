import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, MessageCircle, Users, Send, TrendingUp, Lock } from "lucide-react";
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
}

const PASSWORD_KEY = "mf_admin_pwd";

export default function AdminAnalytics() {
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
      <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
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
            <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
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
          <h2 className="font-display text-xl mb-4">Activité — 30 derniers jours</h2>
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
