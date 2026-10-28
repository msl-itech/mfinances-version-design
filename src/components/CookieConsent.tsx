import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, loadClarity, setConsent, OPEN_CONSENT_EVENT } from "@/lib/consent";
import { tagSession } from "@/lib/clarity-events";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = getConsent();
    if (choice === "accepted") loadClarity(tagSession);
    else if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (c: "accepted" | "refused") => {
    setOpen(false);
    setConsent(c, tagSession);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Choix des cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[640px] rounded-2xl border border-border bg-background p-5 shadow-xl sm:inset-x-6 sm:bottom-6"
    >
      <p className="font-body text-[14px] leading-[1.6] text-foreground">
        Avec votre accord, nous utilisons Microsoft Clarity pour comprendre comment le site est utilisé
        (cookies de mesure d'audience). Rien n'est déposé tant que vous n'avez pas accepté.{" "}
        <Link to="/politique-cookies/" className="underline underline-offset-2">En savoir plus</Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose("refused")}
          className="min-h-12 rounded-full border-2 border-primary px-6 font-body text-[14px] font-semibold text-primary"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="min-h-12 rounded-full border-2 border-primary bg-primary px-6 font-body text-[14px] font-semibold text-primary-foreground"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
