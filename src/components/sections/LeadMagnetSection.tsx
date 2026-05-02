import { Link } from "react-router-dom";
import { Check, ArrowRight, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function LeadMagnetSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-14 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Editorial backdrop */}
      <div
        aria-hidden="true" data-anim="text-scrub"
        className="absolute inset-x-0 top-8 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary-foreground/[0.04] pointer-events-none select-none whitespace-nowrap"
      >
        Checklist
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.08] hidden md:block pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 65%)" }}
      />
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-mf relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 09</span>
              <span className="text-accent/80 text-[11px] font-bold tracking-[0.2em] uppercase">
                Checklist gratuite · PDF
              </span>
            </div>
            <h2 className="font-display text-[28px] md:text-[44px] text-primary-foreground leading-[1.08]">
              Les 5 erreurs qui vident le compte
              <br className="hidden md:block" />
              des dirigeants de <span className="text-accent italic">TPE</span>
            </h2>
            <div className="h-px w-16 bg-accent/60 mt-7 mb-5" />
            <p className="text-primary-foreground/65 text-[15px] leading-[1.75] max-w-[480px]">
              Un guide concret pour identifier les fuites financières les plus courantes — et les stopper avant qu'il ne soit trop tard.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                "Erreurs identifiées chez +200 dirigeants",
                "Solutions applicables immédiatement",
                "PDF gratuit, sans engagement",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-primary-foreground/75 text-[14px]"
                >
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-accent" strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="relative bg-card rounded-[28px] p-7 md:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-accent/70 to-transparent" />

              {/* Watermark */}
              <span
                aria-hidden="true"
                className="absolute -top-6 -right-2 font-display italic text-[110px] leading-none font-bold text-accent/[0.06] select-none pointer-events-none"
              >
                PDF
              </span>

              <div className="relative flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/75 flex items-center justify-center shadow-[0_8px_24px_rgba(232,57,58,0.3)]">
                  <FileDown size={22} className="text-accent-foreground" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display text-[18px] text-primary leading-tight">
                    Téléchargez la checklist
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-[0.15em]">
                    PDF · Lecture 5 min
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-border/60 mb-6" />

              <Button
                variant="accent"
                className="w-full rounded-full pl-7 pr-3 group btn-liquid h-13"
                size="lg"
                asChild
              >
                <Link to="/checklist-tresorerie/" data-magnetic>
                  <span className="flex items-center justify-between w-full gap-3">
                    Accéder à la checklist
                    <span className="w-7 h-7 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-500">
                      <ArrowRight size={13} />
                    </span>
                  </span>
                </Link>
              </Button>

              <p className="text-[10px] text-muted-foreground/70 italic mt-5 text-center uppercase tracking-[0.12em]">
                Gratuit · Sans spam · Téléchargement immédiat
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
