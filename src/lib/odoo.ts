const ODOO_API_URL = "https://api-connect-odoo.vercel.app/api";

const ODOO_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "x-signature": "746b22e105d43521fc87e9ebc40fa1f88524855a7b54a311c4c3a37bcfec886a",
  "x-client-id": "client_mfinances",
  "x-company-id": "3",
};

export interface OdooLeadData {
  name: string;
  first_name?: string;
  email_from: string;
  phone?: string;
  description: string;
  tag_names?: string[];
}

export async function sendLeadToOdoo(leadData: OdooLeadData): Promise<boolean> {
  try {
    const response = await fetch(`${ODOO_API_URL}/leads`, {
      method: "POST",
      headers: ODOO_HEADERS,
      body: JSON.stringify(leadData),
    });
    if (!response.ok) {
      console.error("Odoo API error:", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erreur envoi lead Odoo:", error);
    return false;
  }
}
