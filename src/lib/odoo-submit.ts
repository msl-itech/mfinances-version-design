import { OdooLeadData } from "./odoo";

const ODOO_API_URL = "https://api-connect-odoo.vercel.app/api";
const TIMEOUT_MS = 15000;

const ODOO_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "x-signature": "746b22e105d43521fc87e9ebc40fa1f88524855a7b54a311c4c3a37bcfec886a",
  "x-client-id": "client_mfinances",
  "x-company-id": "3",
};

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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${ODOO_API_URL}/leads`, {
      method: "POST",
      headers: ODOO_HEADERS,
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    try {
      const json = await response.json();
      return { lead_id: json.lead_id };
    } catch {
      return {};
    }
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
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
    const response = await fetch(`${ODOO_API_URL}/leads/${leadId}`, {
      method: "PUT",
      headers: ODOO_HEADERS,
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch {
    console.error("[Odoo] Échec mise à jour qualification lead", leadId);
    return false;
  }
}
