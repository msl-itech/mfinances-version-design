/**
 * Visitor Tracker — collecte les signaux de navigation pour le chatbot.
 * localStorage (persistant) : visitCount, source, utm_campaign, diagnosticDone, checklistDownloaded, sector, prenom
 * sessionStorage (session)  : pages[], startTime, behaviorScore
 */

const TRACKER_KEY = "mf_tracker";
const SESSION_KEY = "mf_session";

// ── Types ──
interface TrackerData {
  visitCount: number;
  source: string;
  utm_campaign: string;
  utm_medium: string;
  diagnosticDone: boolean;
  checklistDownloaded: boolean;
  sector: string | null;
  prenom: string | null;
}

interface SessionData {
  pages: string[];
  startTime: number;
  behaviorScore: number;
}

export interface MFContext {
  pages: string[];
  visitCount: number;
  timeSeconds: number;
  source: string;
  utmCampaign: string;
  behaviorScore: number;
  diagnosticDone: boolean;
  checklistDownloaded: boolean;
  sector: string | null;
  prenom: string | null;
}

// ── Helpers ──
function getTracker(): TrackerData {
  try {
    const raw = localStorage.getItem(TRACKER_KEY);
    return raw ? JSON.parse(raw) : {} as TrackerData;
  } catch {
    return {} as TrackerData;
  }
}

function getSession(): SessionData {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : {} as SessionData;
  } catch {
    return {} as SessionData;
  }
}

function saveTracker(data: TrackerData): void {
  try {
    localStorage.setItem(TRACKER_KEY, JSON.stringify(data));
  } catch {}
}

function saveSession(data: SessionData): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch {}
}

// ── Score calculation ──
function computeScore(tracker: TrackerData, session: SessionData): number {
  let score = 0;
  if (session.pages?.includes("/tarifs/")) score += 3;
  if (session.pages?.includes("/diagnostic/")) score += 4;
  if ((session.pages?.length || 0) > 3) score += 1;
  if (tracker.visitCount >= 2) score += 3;
  if (tracker.diagnosticDone) score += 4;
  if (tracker.checklistDownloaded) score += 2;
  const elapsed = Math.floor((Date.now() - (session.startTime || Date.now())) / 1000);
  if (elapsed > 180) score += 2;
  return score;
}

// ── Init (called once on app mount) ──
let initialized = false;

export function initTracker(): void {
  if (initialized) return;
  initialized = true;

  const tracker = getTracker();
  const session = getSession();

  // Increment visit count (once per session)
  if (!session.startTime) {
    tracker.visitCount = (tracker.visitCount || 0) + 1;
  }

  // Capture source on first visit
  if (!tracker.source) {
    const params = new URLSearchParams(window.location.search);
    tracker.source = params.get("utm_source") || document.referrer || "direct";
    tracker.utm_campaign = params.get("utm_campaign") || "";
    tracker.utm_medium = params.get("utm_medium") || (tracker.source === "direct" ? "none" : "referral");
  }

  // Session timer
  session.startTime = session.startTime || Date.now();
  session.pages = session.pages || [];

  // Track current page
  const currentPage = window.location.pathname;
  if (!session.pages.includes(currentPage)) {
    session.pages.push(currentPage);
  }

  session.behaviorScore = computeScore(tracker, session);

  saveTracker(tracker);
  saveSession(session);
}

// ── Track a new page visit (called on route change) ──
export function trackPageVisit(path: string): void {
  const session = getSession();
  session.pages = session.pages || [];
  if (!session.pages.includes(path)) {
    session.pages.push(path);
  }
  const tracker = getTracker();
  session.behaviorScore = computeScore(tracker, session);
  saveSession(session);
}

// ── Flag setters (call from tools/forms) ──
export function setDiagnosticDone(): void {
  const tracker = getTracker();
  tracker.diagnosticDone = true;
  saveTracker(tracker);
}

export function setChecklistDownloaded(): void {
  const tracker = getTracker();
  tracker.checklistDownloaded = true;
  saveTracker(tracker);
}

export function setSector(sector: string): void {
  const tracker = getTracker();
  tracker.sector = sector;
  saveTracker(tracker);
}

export function setPrenom(prenom: string): void {
  const tracker = getTracker();
  tracker.prenom = prenom;
  saveTracker(tracker);
}

// ── Get context for chatbot API call ──
export function getMFContext(): MFContext {
  const tracker = getTracker();
  const session = getSession();
  const elapsed = Math.floor((Date.now() - (session.startTime || Date.now())) / 1000);

  // Recalculate live
  const score = computeScore(tracker, session);

  return {
    pages: session.pages || [],
    visitCount: tracker.visitCount || 1,
    timeSeconds: elapsed,
    source: tracker.source || "direct",
    utmCampaign: tracker.utm_campaign || "",
    behaviorScore: score,
    diagnosticDone: tracker.diagnosticDone || false,
    checklistDownloaded: tracker.checklistDownloaded || false,
    sector: tracker.sector || null,
    prenom: tracker.prenom || null,
  };
}
