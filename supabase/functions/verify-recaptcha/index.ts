import { corsFor, issueHumanPass } from "../_shared/site-guard.ts";

const ALLOWED_RECAPTCHA_HOSTS = [/^(www\.)?mfinances\.be$/, /\.lovable\.app$/, /\.lovableproject\.com$/, /^localhost$/];

Deno.serve(async (req) => {
  const corsHeaders = corsFor(req);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const json = (p: unknown, s: number) =>
    new Response(JSON.stringify(p), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const { token } = await req.json();
    if (!token || typeof token !== "string") return json({ success: false, error: "Token manquant" }, 400);

    const secretKey = Deno.env.get("RECAPTCHA_SECRET_KEY");
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY not configured");
      return json({ success: false, error: "Configuration serveur manquante" }, 500);
    }

    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });
    const result = await verifyResponse.json();
    const hostOk = typeof result.hostname === "string" && ALLOWED_RECAPTCHA_HOSTS.some((re) => re.test(result.hostname));
    const success = result.success === true && hostOk;

    return json({ success, humanPass: success ? await issueHumanPass() : undefined }, 200);
  } catch (error) {
    console.error("Erreur verify-recaptcha:", error);
    return json({ success: false, error: "Erreur serveur" }, 500);
  }
});
