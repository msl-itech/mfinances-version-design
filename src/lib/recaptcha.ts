import { supabase } from "@/integrations/supabase/client";

export const RECAPTCHA_SITE_KEY = "6Ldy1ZgsAAAAAFvgkoM81jLEi_wqln5Xs7EB_6Oa";

// Laissez-passer signé par le serveur après un reCAPTCHA réussi (valable 15 min).
// Transmis automatiquement avec l'envoi du lead vers Odoo.
let humanPass: string | undefined;
export function getHumanPass(): string | undefined {
  return humanPass;
}

export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke("verify-recaptcha", {
      body: { token },
    });

    if (error) {
      console.error("[reCAPTCHA] Erreur vérification:", error);
      return false;
    }

    if (data?.success === true && typeof data.humanPass === "string") humanPass = data.humanPass;
    return data?.success === true;
  } catch (err) {
    console.error("[reCAPTCHA] Erreur réseau:", err);
    return false;
  }
}
