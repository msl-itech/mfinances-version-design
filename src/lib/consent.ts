// Consentement cookies : Microsoft Clarity ne se charge qu'après « Accepter ».
export type ConsentChoice = "accepted" | "refused";

const KEY = "mf_cookie_consent_v1";
export const OPEN_CONSENT_EVENT = "mf:open-cookie-consent";
const CLARITY_ID = "xqj4j1699t";

export function getConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "refused" ? v : null;
  } catch {
    return null;
  }
}

let loaded = false;
export function loadClarity(onReady?: () => void) {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const w = window as unknown as { clarity?: ((...a: unknown[]) => void) & { q?: unknown[] } };
  if (!w.clarity) {
    const fn = ((...args: unknown[]) => {
      (fn.q = fn.q || []).push(args);
    }) as ((...a: unknown[]) => void) & { q?: unknown[] };
    w.clarity = fn;
  }
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(s);
  w.clarity("consent");
  onReady?.();
}

export function setConsent(choice: ConsentChoice, onAccept?: () => void) {
  const previous = getConsent();
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    /* navigation privée : choix valable pour cette page seulement */
  }
  if (choice === "accepted") {
    loadClarity(onAccept);
  } else if (previous === "accepted" || loaded) {
    // Retrait du consentement : Clarity efface ses cookies, puis rechargement pour l'arrêter.
    (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity?.("consent", false);
    window.location.reload();
  }
}

export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
