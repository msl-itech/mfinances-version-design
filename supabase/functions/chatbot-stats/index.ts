// Edge function: chatbot-stats
// Returns aggregated chatbot analytics. Protected by ADMIN_DASHBOARD_PASSWORD.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Password gate
  const providedPassword = req.headers.get("x-admin-password") || "";
  const expectedPassword = Deno.env.get("ADMIN_DASHBOARD_PASSWORD") || "";
  if (!expectedPassword || providedPassword !== expectedPassword) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Pull last 90 days of events
    const since = new Date();
    since.setDate(since.getDate() - 90);

    const { data, error } = await supabase
      .from("chatbot_events")
      .select("event_type, session_id, page_path, created_at")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false })
      .limit(10000);

    if (error) throw error;

    const events = data || [];

    // Aggregate metrics
    const sessions = new Set<string>();
    const sessionsToday = new Set<string>();
    const sessionsWeek = new Set<string>();
    const sessionsMonth = new Set<string>();
    let totalOpened = 0;
    let totalMessages = 0;
    const pageCounts: Record<string, number> = {};
    const dailyOpens: Record<string, number> = {};
    const dailyMessages: Record<string, number> = {};

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    for (const e of events) {
      sessions.add(e.session_id);
      const t = new Date(e.created_at).getTime();
      if (now - t < dayMs) sessionsToday.add(e.session_id);
      if (now - t < 7 * dayMs) sessionsWeek.add(e.session_id);
      if (now - t < 30 * dayMs) sessionsMonth.add(e.session_id);

      const dayKey = e.created_at.slice(0, 10);

      if (e.event_type === "opened") {
        totalOpened++;
        dailyOpens[dayKey] = (dailyOpens[dayKey] || 0) + 1;
        if (e.page_path) {
          pageCounts[e.page_path] = (pageCounts[e.page_path] || 0) + 1;
        }
      } else if (e.event_type === "message_sent") {
        totalMessages++;
        dailyMessages[dayKey] = (dailyMessages[dayKey] || 0) + 1;
      }
    }

    // Top pages
    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    // Build last-30-days timeseries
    const series: { date: string; opens: number; messages: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      series.push({
        date: key,
        opens: dailyOpens[key] || 0,
        messages: dailyMessages[key] || 0,
      });
    }

    const avgMessagesPerSession =
      sessions.size > 0 ? Number((totalMessages / sessions.size).toFixed(2)) : 0;

    return new Response(
      JSON.stringify({
        totals: {
          uniqueSessions: sessions.size,
          totalOpens: totalOpened,
          totalMessages,
          avgMessagesPerSession,
        },
        windows: {
          today: sessionsToday.size,
          last7days: sessionsWeek.size,
          last30days: sessionsMonth.size,
        },
        topPages,
        series,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("chatbot-stats error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
