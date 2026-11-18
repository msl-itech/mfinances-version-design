// Edge function: chatbot-stats
// Statistiques de l'assistant pour l'espace interne. Protégé par ADMIN_DASHBOARD_PASSWORD.
// ?days=7|30|90 (30 par défaut) ; la période précédente de même durée sert de comparaison. Essais exclus.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { clientIp, corsFor, rateLimited, timingSafeEqual } from "../_shared/site-guard.ts";
import { buildStats, parsePeriod } from "../_shared/chatbot-stats-core.ts";

Deno.serve(async (req) => {
  const corsHeaders = corsFor(req);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const providedPassword = req.headers.get("x-admin-password") || "";
  const expectedPassword = Deno.env.get("ADMIN_DASHBOARD_PASSWORD") || "";
  const ip = clientIp(req);
  if (rateLimited(`stats:${ip}`, 30, 15 * 60 * 1000)) {
    return new Response(JSON.stringify({ error: "Trop de tentatives" }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!expectedPassword || !timingSafeEqual(providedPassword, expectedPassword)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const days = parsePeriod(new URL(req.url).searchParams.get("days"));
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Période actuelle + période précédente de même durée.
    const since = new Date(Date.now() - 2 * days * 24 * 60 * 60 * 1000).toISOString();

    const { data: events, error } = await supabase
      .from("chatbot_events")
      .select("event_type, session_id, page_path, created_at")
      .eq("is_test", false)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(20000);
    if (error) throw error;

    // Purge de secours (la suppression planifiée chaque nuit reste la règle).
    const purgeBefore = new Date();
    purgeBefore.setMonth(purgeBefore.getMonth() - 13);
    await supabase.from("chatbot_questions").delete().lt("created_at", purgeBefore.toISOString());

    const { data: questions, error: qError } = await supabase
      .from("chatbot_questions")
      .select("question, page_path, article_paths, has_article, created_at, guard_status, prompt_version")
      .eq("is_test", false)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000);
    if (qError) throw qError;

    return new Response(JSON.stringify(buildStats(days, events || [], questions || [])), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("chatbot-stats error:", err);
    return new Response(JSON.stringify({ error: "Statistiques indisponibles" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
