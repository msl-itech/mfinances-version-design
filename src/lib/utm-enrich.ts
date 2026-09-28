/**
 * UTM enrichment + lead source tracking.
 *
 * - `withUtm(lead)` : ajoute utm_source / utm_medium / utm_campaign au payload Odoo
 *   à partir de l'URL courante, du localStorage (première visite) ou du referrer.
 * - `trackLeadSource(...)` : envoie l'événement à la table `lead_sources` du hub Supabase
 *   (fire-and-forget, ne bloque jamais l'UX).
 * - `buildUtmQuery(base)` : construit une URL avec les UTM en query string
 *   (utile pour les CTA sortants type Odoo Appointment).
 */

// ── Hub Supabase (analytics inter-projets, distinct du projet mfinances) ──
const SUPABASE_URL = "https://eetzfukyetyfnsoxspxp.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldHpmdWt5ZXR5Zm5zb3hzcHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MDI5NDksImV4cCI6MjA5NjQ3ODk0OX0.1XbsIHcUqsTx0ak3wRTBR-ei1mXoOaCztKp-u14ry0o";
const SITE_DOMAIN = "mfinances.be";

const UTM_STORAGE_KEY = "mf_utm";

export interface UtmData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

function readStoredUtm(): Partial<UtmData> {
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistUtm(utm: Partial<UtmData>): void {
  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  } catch {
    /* ignore */
  }
}

/**
 * Résout les UTM effectifs :
 *   1. Query string courante (attribution la plus récente)
 *   2. UTM déjà stockés (première visite)
 *   3. Fallback referrer / direct
 */
export function resolveUtm(): UtmData {
  if (typeof window === "undefined") {
    return { utm_source: "direct", utm_medium: "none", utm_campaign: "" };
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl: Partial<UtmData> = {};
  const src = params.get("utm_source");
  const med = params.get("utm_medium");
  const camp = params.get("utm_campaign");
  if (src) fromUrl.utm_source = src;
  if (med) fromUrl.utm_medium = med;
  if (camp) fromUrl.utm_campaign = camp;

  if (Object.keys(fromUrl).length > 0) {
    const merged = { ...readStoredUtm(), ...fromUrl };
    persistUtm(merged);
  }

  const stored = readStoredUtm();

  let utm_source = stored.utm_source || fromUrl.utm_source;
  let utm_medium = stored.utm_medium || fromUrl.utm_medium;
  const utm_campaign = stored.utm_campaign || fromUrl.utm_campaign || "";

  if (!utm_source) {
    const ref = document.referrer;
    if (ref && !ref.includes(SITE_DOMAIN)) {
      try {
        utm_source = new URL(ref).hostname.replace(/^www\./, "");
        utm_medium = utm_medium || "referral";
      } catch {
        utm_source = "direct";
      }
    } else {
      utm_source = "direct";
    }
  }

  return {
    utm_source: utm_source || "direct",
    utm_medium: utm_medium || (utm_source === "direct" ? "none" : "referral"),
    utm_campaign,
  };
}

/** Ajoute les 3 champs UTM au payload d'un lead Odoo. */
// ── Provenance du lead : page d'entrée, page de conversion, référent ─────
// La page d'entrée et le référent sont mémorisés une fois par session (sessionStorage).

const LANDING_KEY = "mf_landing_page";
const REFERRER_KEY = "mf_referrer";

/** À appeler au démarrage du site : mémorise la page d'entrée et le site d'origine de la session. */
export function recordLandingPage(): void {
  try {
    if (typeof window === "undefined" || sessionStorage.getItem(LANDING_KEY)) return;
    sessionStorage.setItem(LANDING_KEY, window.location.pathname + window.location.search);
    let referrer = "";
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      if (ref && ref.hostname !== window.location.hostname) referrer = ref.origin + ref.pathname;
    } catch {
      referrer = "";
    }
    sessionStorage.setItem(REFERRER_KEY, referrer);
  } catch {
    /* stockage indisponible : la provenance restera partielle */
  }
}

export interface LeadProvenance {
  landing_page: string;
  conversion_page: string;
  referrer: string;
}

export function getProvenance(): LeadProvenance {
  let landing = "";
  let referrer = "";
  try {
    landing = sessionStorage.getItem(LANDING_KEY) || "";
    referrer = sessionStorage.getItem(REFERRER_KEY) || "";
  } catch {
    /* ignoré */
  }
  const conversion = typeof window !== "undefined" ? window.location.pathname : "";
  return { landing_page: landing || conversion, conversion_page: conversion, referrer: referrer || "direct" };
}

/**
 * Ajoute au lead Odoo les UTM et un bloc « Provenance » dans la description.
 * La provenance est écrite dans la description (champ texte déjà transmis à Odoo)
 * plutôt que dans de nouveaux champs, pour ne pas dépendre du format accepté par l'API Odoo.
 */
export function withUtm<T extends Record<string, unknown>>(lead: T): T & UtmData {
  const utm = resolveUtm();
  const p = getProvenance();
  const block =
    "Provenance du contact\n" +
    `- Page d'entrée : ${p.landing_page}\n` +
    `- Page de conversion : ${p.conversion_page}\n` +
    `- Référent : ${p.referrer}\n` +
    `- UTM : ${utm.utm_source || "-"} / ${utm.utm_medium || "-"} / ${utm.utm_campaign || "-"}`;
  const existing = typeof lead.description === "string" ? lead.description : "";
  return { ...lead, ...utm, description: existing ? `${existing}\n\n${block}` : block };
}

/** Construit une URL avec les UTM en query string (CTA sortants). */
export function buildUtmQuery(baseUrl: string): string {
  const utm = resolveUtm();
  try {
    const url = new URL(baseUrl);
    if (utm.utm_source) url.searchParams.set("utm_source", utm.utm_source);
    if (utm.utm_medium) url.searchParams.set("utm_medium", utm.utm_medium);
    if (utm.utm_campaign) url.searchParams.set("utm_campaign", utm.utm_campaign);
    return url.toString();
  } catch {
    return baseUrl;
  }
}

// ── trackLeadSource ─────────────────────────────────────────────────────
export interface TrackLeadInput {
  email_from: string;
  name?: string;
  form_name: string;
  [key: string]: unknown;
}

export function trackLeadSource(input: TrackLeadInput): void {
  const utm = resolveUtm();
  const payload = {
    contact_email: input.email_from,
    contact_name: input.name || null,
    form_name: input.form_name,
    site_domain: SITE_DOMAIN,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
  };
  const provenance = getProvenance();

  const send = (body: Record<string, unknown>) =>
    fetch(`${SUPABASE_URL}/rest/v1/lead_sources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
      keepalive: true,
    });

  // Fire-and-forget — ne bloque jamais la soumission du formulaire.
  // Si les colonnes de provenance n'existent pas encore en base (migration non appliquée),
  // on renvoie la ligne sans elles pour ne perdre aucun lead.
  try {
    send({ ...payload, ...provenance })
      .then((res) => (res.ok ? res : send(payload)))
      .catch((err) => {
      console.debug("[trackLeadSource] non-blocking error:", err);
    });
  } catch (err) {
    console.debug("[trackLeadSource] fatal:", err);
  }
}

// ── trackPageView ──────────────────────────────────────────────────────
// Fire-and-forget : envoie chaque page vue avec attribution source.
// Appelé par trackPageVisit() dans visitor-tracker.ts à chaque route change.

let _lastTrackedPath = "";

export function trackPageView(path: string): void {
  // Déduplique les doubles appels sur la même page (React StrictMode, etc.)
  if (path === _lastTrackedPath) return;
  _lastTrackedPath = path;

  const utm = resolveUtm();
  const payload = {
    site_domain: SITE_DOMAIN,
    page_path: path,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    referrer: typeof document !== "undefined" ? document.referrer || null : null,
  };

  try {
    fetch(`${SUPABASE_URL}/rest/v1/page_views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

// ── trackEvent ─────────────────────────────────────────────────────────
// Fire-and-forget : envoie un événement nommé vers la table `custom_events`.
// Utilisation : trackEvent('org_bridge_click_about')

export function trackEvent(eventName: string): void {
  const utm = resolveUtm();
  const payload = {
    site_domain: SITE_DOMAIN,
    event_name: eventName,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
  };

  try {
    fetch(`${SUPABASE_URL}/rest/v1/custom_events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
