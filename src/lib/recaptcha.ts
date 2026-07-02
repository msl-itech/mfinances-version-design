import { supabase } from "@/integrations/supabase/client";

export const RECAPTCHA_SITE_KEY = "6Ldy1ZgsAAAAAFvgkoM81jLEi_wqln5Xs7EB_6Oa";

export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke("verify-recaptcha", {
      body: { token },
    });

    if (error) {
      console.error("[reCAPTCHA] Erreur vérification:", error);
      return false;
    }

    return data?.success === true;
  } catch (err) {
    console.error("[reCAPTCHA] Erreur réseau:", err);
    return false;
  }
}
