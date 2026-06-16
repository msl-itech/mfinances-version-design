import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

export default function Unsubscribe() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "valid" | "already" | "invalid" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: anonKey },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.valid === false && d.reason === "already_unsubscribed") setStatus("already");
        else if (d.valid) setStatus("valid");
        else setStatus("invalid");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div ref={root} className="min-h-screen">
      <SEOHead title="Désabonnement | MFinances" description="Gérez vos préférences email." canonical="https://mfinances.be/unsubscribe/" />
      <Header />
      <main className="py-10 px-4">
        <div className="max-w-[480px] mx-auto text-center">
          {status === "loading" && <p className="text-muted-foreground">Vérification en cours…</p>}
          {status === "valid" && (
            <>
              <h1 className="font-display text-[24px] text-foreground mb-4">Se désabonner</h1>
              <p className="text-[14px] text-muted-foreground mb-6">
                Vous ne recevrez plus d'emails de MFinances. Cette action est irréversible.
              </p>
              <Button onClick={handleUnsubscribe} variant="accent" className="rounded-lg">
                Confirmer le désabonnement
              </Button>
            </>
          )}
          {status === "success" && (
            <>
              <h1 className="font-display text-[24px] text-foreground mb-4">Désabonnement confirmé</h1>
              <p className="text-[14px] text-muted-foreground">Vous ne recevrez plus d'emails de notre part.</p>
            </>
          )}
          {status === "already" && (
            <>
              <h1 className="font-display text-[24px] text-foreground mb-4">Déjà désabonné</h1>
              <p className="text-[14px] text-muted-foreground">Cette adresse est déjà désabonnée.</p>
            </>
          )}
          {status === "invalid" && (
            <>
              <h1 className="font-display text-[24px] text-foreground mb-4">Lien invalide</h1>
              <p className="text-[14px] text-muted-foreground">Ce lien de désabonnement est invalide ou a expiré.</p>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="font-display text-[24px] text-foreground mb-4">Erreur</h1>
              <p className="text-[14px] text-muted-foreground">Une erreur s'est produite. Veuillez réessayer plus tard.</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
