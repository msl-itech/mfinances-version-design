import { OdooLeadData, callOdooProxy } from "./odoo";

const TIMEOUT_MS = 15000;

interface PendingLead {
  data: OdooLeadData;
  savedAt: string;
  status: "pending" | "retried";
}

function saveLeadLocally(data: OdooLeadData): void {
  try {
    const raw = localStorage.getItem("pending_leads");
    const pending: PendingLead[] = raw ? JSON.parse(raw) : [];
    pending.push({ data, savedAt: new Date().toISOString(), status: "pending" });
    localStorage.setItem("pending_leads", JSON.stringify(pending));
    console.warn("[Fallback] Lead sauvegardé localement", data.name);
  } catch (e) {
    console.error("[Fallback] Sauvegarde locale impossible", e);
  }
}

async function sendWithTimeout(data: OdooLeadData, timeout: number): Promise<{ lead_id?: number }> {
  return await Promise.race([
    callOdooProxy({ data }),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), timeout)),
  ]);
}

export interface SubmitResult {
  success: true;
  message: "ok" | "fallback";
  lead_id?: number;
}

/**
 * Envoie un lead vers Odoo avec timeout et fallback localStorage.
 * Retourne TOUJOURS success: true pour ne jamais bloquer l'UX.
 */
export async function submitLead(data: OdooLeadData): Promise<SubmitResult> {
  try {
    const result = await sendWithTimeout(data, TIMEOUT_MS);
    return { success: true, message: "ok", lead_id: result.lead_id };
  } catch (error) {
    console.error("[Odoo] Échec envoi, fallback localStorage:", error);
    saveLeadLocally(data);
    return { success: true, message: "fallback" };
  }
}

/**
 * Retente l'envoi des leads en attente dans localStorage.
 * Peut être appelé au chargement de l'app ou périodiquement.
 */
export async function retryPendingLeads(): Promise<number> {
  const raw = localStorage.getItem("pending_leads");
  if (!raw) return 0;

  const pending: PendingLead[] = JSON.parse(raw);
  if (pending.length === 0) return 0;

  const remaining: PendingLead[] = [];
  let sent = 0;

  for (const lead of pending) {
    try {
      await sendWithTimeout(lead.data, TIMEOUT_MS);
      sent++;
    } catch {
      remaining.push({ ...lead, status: "retried" });
    }
  }

  if (remaining.length > 0) {
    localStorage.setItem("pending_leads", JSON.stringify(remaining));
  } else {
    localStorage.removeItem("pending_leads");
  }

  if (sent > 0) {
    console.info(`[Odoo] ${sent} lead(s) en attente renvoyé(s) avec succès`);
  }

  return sent;
}

/**
 * Met à jour un lead existant (qualification post-soumission).
 * Fire-and-forget côté UX — un échec ne bloque pas la navigation.
 */
export async function updateLeadQualification(
  leadId: number,
  data: Record<string, unknown>,
): Promise<boolean> {
  try {
    await callOdooProxy({ action: "update", leadId, data });
    return true;
  } catch {
    console.error("[Odoo] Échec mise à jour qualification lead", leadId);
    return false;
  }
}
