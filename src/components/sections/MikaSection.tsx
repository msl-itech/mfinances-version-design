import { Link } from "react-router-dom";
import { Check, ArrowRight, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import mikaPhoto from "@/assets/mika-musungayi.webp";

export default function MikaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-14 md:py-32 bg-secondary relative overflow-hidden" ref={ref}>
      {/* Editorial backdrop watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-8 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
      >
        Fondateur
      </div>

      <div className="container-mf relative">
        {/* Editorial header */}
        <div className={`max-w-[820px] mx-auto text-center mb-12 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-4 mb-5">
            <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 10</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 font-medium">
              Le fondateur
            </span>
          </div>
          <h2 className="font-display text-[28px] md:text-[46px] leading-[1.08] text-primary">
            L'expérience d'un DAF, la{" "}
            <span className="text-accent italic">proximité</span> d'un cabinet.
          </h2>
        </div>

        <div
          className={`relative bg-primary rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(27,43,94,0.20)] reveal ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.15s" }}
        >
          {/* Top hairline accent */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent z-10" />

          {/* Decorative halo */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.08] pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 60%)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] relative">
            {/* Left — Photo */}
            <div className="relative hidden md:block min-h-[420px] lg:min-h-[520px]">
              <img
                src={mikaPhoto}
                alt="Mika MUSUNGAYI — Expert-comptable, fondateur MFinances"
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-primary/40" />

              {/* Top-left index */}
              <div className="absolute top-6 left-6 z-10">
                <span className="inline-flex items-center gap-2 bg-card/15 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-medium px-3 py-1.5 rounded-full">
                  <Sparkles size={11} className="text-accent" />
                  ITAA · 20 ans
                </span>
              </div>

              {/* Bottom name plate */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-display text-primary-foreground text-[24px] leading-none">
                  Mika <span className="italic text-accent">Musungayi</span>
                </p>
                <p className="text-[11px] text-primary-foreground/75 mt-2 uppercase tracking-[0.18em]">
                  Expert-comptable · Fondateur
                </p>
              </div>
            </div>

            {/* Right — Bio editorial */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 01</span>
                <span className="text-accent/80 text-[11px] font-bold tracking-[0.18em] uppercase">
                  Votre expert-comptable à Bruxelles
                </span>
              </div>

              {/* Blockquote with editorial Quote icon */}
              <div className="relative">
                <Quote
                  size={48}
                  className="absolute -top-4 -left-2 text-accent/15 -scale-x-100"
                  strokeWidth={1.25}
                />
                <blockquote className="font-display italic font-light text-[20px] md:text-[26px] text-primary-foreground leading-[1.35] relative z-10 pl-3">
                  Après 20 ans à accompagner des centaines de dirigeants, je sais qu'une bonne comptabilité ne suffit pas.
                  Il faut un vrai suivi, une <span className="text-accent">vraie stratégie financière</span>.
                </blockquote>
              </div>

              <div className="h-px w-16 bg-accent/60 my-7" />

              <ul className="space-y-3.5">
                {[
                  "Spécialiste patrimoine & TPE en croissance",
                  "Membre ITAA · 20+ ans d'expérience",
                  "Approche DAF externalisé pour PME",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-primary-foreground/80 text-[14px]"
                  >
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-accent" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col sm:flex-row items-start gap-4">
                <Button
                  variant="accent"
                  className="rounded-full pl-7 pr-3 group btn-liquid h-13"
                  size="lg"
                  asChild
                >
                  <Link to="/contact/" data-magnetic>
                    <span className="flex items-center gap-3">
                      Parler avec Mika
                      <span className="w-7 h-7 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-500">
                        <ArrowRight size={13} />
                      </span>
                    </span>
                  </Link>
                </Button>
                <Link
                  to="/a-propos/"
                  className="text-primary-foreground/70 text-[13px] font-medium hover:text-accent transition-colors story-link sm:mt-3"
                >
                  En savoir plus sur Mika
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
