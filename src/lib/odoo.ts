import { supabase } from "@/integrations/supabase/client";
import { getHumanPass } from "./recaptcha";

// Aucune clé Odoo côté navigateur : l'envoi passe par la fonction protégée `submit-lead`.

export interface OdooLeadData {
  name: string;
  first_name?: string;
  email_from: string;
  phone?: string;
  description: string;
  tag_names?: string[];
  x_download_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  x_studio_consentement?: boolean;
  x_studio_consentement_date?: string;
  deduplicate_by_email?: boolean;
}

export async function callOdooProxy(
  payload: { action?: "create" | "update"; leadId?: number; data: unknown },
): Promise<{ lead_id?: number }> {
  const { data, error } = await supabase.functions.invoke("submit-lead", {
    body: { ...payload, humanPass: getHumanPass() },
  });
  if (error) throw error;
  return { lead_id: data?.lead_id };
}

export async function sendLeadToOdoo(leadData: OdooLeadData): Promise<boolean> {
  try {
    await callOdooProxy({ data: leadData });
    return true;
  } catch (error) {
    console.error("Erreur envoi lead Odoo:", error);
    return false;
  }
}
