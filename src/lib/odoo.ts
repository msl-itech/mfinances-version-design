const ODOO_API_URL = "https://api-connect-odoo.vercel.app/api";

const ODOO_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "x-signature": "3474874aae52a3c1dcc5e58ede71fa9973bc8ba992064aec7460affc75461f62",
  "x-client-id": "client_mfinances",
  "x-company-id": "3",
};

export interface OdooLeadData {
  name: string;
  email_from: string;
  phone?: string;
  description: string;
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
