// Mesure du tunnel de conversion dans Microsoft Clarity.
//
// Ce module n'ajoute ni ne modifie le chargement de Clarity (qui reste dans index.html).
// Il se contente d'appeler l'API publique de Clarity :
//   - clarity("set", clé, valeur) : étiquette la session (Custom Tags) ;
//   - clarity("event", nom)       : enregistre une étape du tunnel (Custom Events).
// Les appels passés avant la fin du chargement de Clarity sont mis en file d'attente
// par le script Clarity lui-même. Si Clarity est absent, rien ne se passe.

export type FunnelEvent =
  | "diagnostic_start"
  | "diagnostic_complete"
  | "diagnostic_result"
  | "checklist_submit"
  | "checklist_download"
  | "pricing_cta_click"
  | "contact_click"
  | "contact_form_submit"
  | "appointment_click";

type ClarityApi = (...args: unknown[]) => void;

function getClarity(): ClarityApi | undefined {
  if (typeof window === "undefined") return undefined;
  const api = (window as unknown as { clarity?: ClarityApi }).clarity;
  return typeof api === "function" ? api : undefined;
}

/** Enregistre une étape du tunnel de conversion. */
export function trackEvent(name: FunnelEvent): void {
  try {
    getClarity()?.("event", name);
  } catch {
    /* la mesure ne doit jamais perturber le site */
  }
}

/** Environnement de la session : production (mfinances.be), developpement (localhost) ou preview. */
export function currentEnvironment(hostname: string = window.location.hostname): string {
  if (/^(www\.)?mfinances\.be$/.test(hostname)) return "production";
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]") return "developpement";
  return "preview";
}

/** Étiquette la session pour pouvoir filtrer les vraies visites dans Clarity. */
export function tagSession(): void {
  try {
    const clarity = getClarity();
    if (!clarity) return;
    clarity("set", "environment", currentEnvironment());
    clarity("set", "host", window.location.hostname);
    clarity("set", "site_version", SITE_VERSION);
  } catch {
    /* sans effet sur le site */
  }
}

/** Version du site mise en ligne : permet de comparer les versions successives dans Clarity. */
export const SITE_VERSION = "v3-2026-09";

const APPOINTMENT_URL = "odoo.mfinances.be/appointment";

/**
 * Suivi des clics par délégation : un seul écouteur pour tout le site.
 * - rendez-vous en ligne → appointment_click
 * - lien vers /contact/, téléphone ou e-mail → contact_click
 * - sur la page Tarifs, tout clic vers contact, rendez-vous ou diagnostic → pricing_cta_click en plus
 */
export function installClickTracking(): () => void {
  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const link = target?.closest?.("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") ?? "";

    const isAppointment = href.includes(APPOINTMENT_URL);
    const isContact =
      /^\/contact\/?([?#].*)?$/.test(href) ||
      /mfinances\.be\/contact\/?/.test(href) ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");
    const isDiagnostic = /^\/diagnostic\/?([?#].*)?$/.test(href);

    if (isAppointment) trackEvent("appointment_click");
    else if (isContact) trackEvent("contact_click");

    if (window.location.pathname.startsWith("/tarifs") && (isAppointment || isContact || isDiagnostic)) {
      trackEvent("pricing_cta_click");
    }
  };
  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}
