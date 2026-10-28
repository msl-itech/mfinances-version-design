import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, loadClarity, setConsent, OPEN_CONSENT_EVENT } from "@/lib/consent";
import { tagSession } from "@/lib/clarity-events";
import cookieIllustration from "@/assets/cookie-consent.webp";

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
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[660px] animate-fade-up motion-reduce:animate-none sm:inset-x-6 sm:bottom-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-[0_18px_50px_-18px_hsl(var(--primary)/0.35)] sm:p-6">
        <div aria-hidden className="pointer-events-none absolute -left-10 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
        <div className="relative flex items-start gap-4 sm:gap-5">
          <img
            src={cookieIllustration}
            alt=""
            width={320}
            height={320}
            loading="lazy"
            className="h-14 w-14 shrink-0 -rotate-6 motion-safe:animate-cookie-float sm:h-[72px] sm:w-[72px]"
          />
          <div className="min-w-0 flex-1">
            <p className="font-display text-[21px] leading-[1.2] text-primary sm:text-[23px]">
              On vous offre un cookie&nbsp;?
            </p>
            <p className="mt-2 font-body text-[14px] leading-[1.6] text-foreground">
              Rien de sucré, mais une trace discrète de votre passage. Avec votre accord, Microsoft Clarity
              nous aide à comprendre ce qui vous est utile ici — et à l'améliorer. Rien ne se lance tant que
              vous n'avez pas dit oui.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => choose("refused")}
                className="min-h-12 rounded-full border-2 border-primary px-6 font-body text-[14px] font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="min-h-12 rounded-full border-2 border-primary bg-primary px-6 font-body text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary-light"
              >
                Accepter
              </button>
            </div>
            <p className="mt-3 font-body text-[12px] leading-[1.5] text-muted-foreground">
              Votre choix est mémorisé et modifiable à tout moment via «&nbsp;Gérer mes cookies&nbsp;» en bas
              de page.{" "}
              <Link to="/politique-de-cookies/" className="underline underline-offset-2">
                Politique de cookies
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
