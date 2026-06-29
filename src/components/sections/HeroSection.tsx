import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/use-scroll-reveal";
import { ArrowUpRight, Star } from "lucide-react";
import equipePhoto from "@/assets/mfinances-equipe-travail.png";

const stats = [
  { value: 200, suffix: "+", label: "entreprises accompagnées" },
  { value: 20, suffix: "+", label: "ans d'expérience" },
  { value: 5, suffix: ".0", label: "note Google" },
];

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useCountUp(value, 1500, true);
  return (
    <div className="flex flex-col">
      <div className="font-display text-[40px] md:text-[56px] text-primary leading-none tracking-tight">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="text-foreground/50 text-[11px] uppercase tracking-[0.18em] mt-2 font-medium">{label}</p>
    </div>
  );
}

const marqueeItems = [
  "Pilotage financier",
  "DAF externalisé",
  "Trésorerie prévisionnelle",
  "Contrôle de gestion",
  "Expert-comptable Bruxelles",
  "TPE en croissance",
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative parallax orbs */}
      <div
        data-parallax="0.18"
        className="absolute -top-32 -right-32 w-[720px] h-[720px] rounded-full opacity-[0.06] will-change-transform pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 65%)", contain: "layout size style" }}
      />
      <div
        data-parallax="0.12"
        className="absolute bottom-0 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.05] will-change-transform pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 65%)", contain: "layout size style" }}
      />
      {/* Subtle grid */}
      <div
        data-parallax="0.04"
        className="absolute inset-0 opacity-[0.025] will-change-transform pointer-events-none"
        style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="container-mf relative pt-8 md:pt-12 pb-0">
        {/* Giant editorial watermark */}
        <div
          aria-hidden="true"
          data-parallax="0.08"
          className="pointer-events-none absolute -top-2 md:top-4 left-0 right-0 text-center will-change-transform select-none"
        >
          <span
            className="font-display italic font-bold leading-none text-primary/[0.04]"
            style={{ fontSize: "clamp(120px, 22vw, 320px)", letterSpacing: "-0.04em" }}
          >
            MFinances
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start relative">
          {/* LEFT — Editorial copy (7 cols) */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Section number + label */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 01</span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/50 font-medium">
                Cabinet d'expertise comptable
              </span>
            </div>

            {/* Editorial H1 */}
            <h1
              className="font-display font-bold text-primary leading-[1.05] tracking-[-0.015em]"
              style={{ fontSize: "clamp(32px, 3.8vw, 54px)" }}
            >
              Vous travaillez{" "}
              <span className="italic font-normal text-foreground/80">dur.</span>
              <br />
              Mais votre{" "}
              <span className="italic font-normal text-accent relative inline-block">
                entreprise
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-[10px]"
                  viewBox="0 0 300 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10 Q 75 2, 150 8 T 298 6"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                </svg>
              </span>{" "}
              <span className="relative inline-block">
                gagne-t-elle vraiment de l'argent&nbsp;?
                <svg
                  className="absolute -bottom-1 left-0 w-full h-[10px]"
                  viewBox="0 0 420 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10 Q 105 2, 210 8 T 418 6"
                    stroke="hsl(var(--accent))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </span>
            </h1>

            {/* Description + CTAs in asymmetric row */}
            <div className="mt-10 max-w-[620px]">
              <div className="h-px w-12 bg-accent mb-5" />
              <p
                className={`text-[15px] md:text-[16px] text-foreground/70 leading-[1.7] transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "0.3s" }}
              >
                La plupart des dirigeants de TPE pilotent à l'aveugle — trésorerie floue,
                résultats découverts trop tard. MFinances change ça : un vrai pilotage financier,
                accessible dès 350 €/mois.
              </p>
            </div>

            <div
              className={`mt-8 flex flex-col gap-5 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "0.5s" }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="accent"
                  size="lg"
                  className="rounded-full pl-7 pr-3 group btn-liquid h-14 text-[15px] whitespace-nowrap"
                  asChild
                >
                  <Link to="/diagnostic/" data-magnetic>
                    <span className="flex items-center gap-3">
                      Lancer mon diagnostic gratuit
                      <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shrink-0">
                        <ArrowUpRight size={14} />
                      </span>
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-7 h-14 text-[15px] border-primary/20 hover:bg-primary hover:text-primary-foreground whitespace-nowrap"
                  asChild
                >
                  <Link to="/services/">Découvrir nos services</Link>
                </Button>
              </div>
              <p className="text-[13px] md:text-[14px] text-foreground leading-relaxed max-w-[600px]">
                <span className="font-semibold text-foreground/75">Vous recevez :</span>{" "}
                votre score de risque trésorerie sur 20, 3 priorités d'action et une grille de
                lecture financière personnalisée — en 3 minutes.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.15em] text-foreground/45 font-medium pt-1">
                <span>🔒 Confidentiel</span>
                <span className="w-px h-3 bg-border" />
                <span>⏱ Immédiat</span>
                <span className="w-px h-3 bg-border" />
                <span>✓ Sans engagement</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Editorial photo card (5 cols) */}
          <div
            className={`lg:col-span-5 lg:pt-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="relative group">
              {/* Floating ratings card — top */}
              <div
                className={`absolute -top-4 -left-4 z-20 bg-card border border-border/60 rounded-2xl px-4 py-3 shadow-xl transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0 rotate-[-3deg]" : "opacity-0 -translate-y-4"}`}
                style={{ transitionDelay: "0.9s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-foreground">5,0</span>
                </div>
                <p className="text-[10px] text-foreground mt-0.5 uppercase tracking-wider">16 avis Google</p>
              </div>

              {/* Photo with editorial frame */}
              <div className="relative bg-gradient-to-br from-primary/8 via-transparent to-accent/5 rounded-[28px] overflow-hidden">
                <div className="absolute inset-0 ring-1 ring-inset ring-border/30 rounded-[28px] z-10 pointer-events-none" />
                <img
                  src={equipePhoto}
                  alt="Équipe MFinances en réunion de travail"
                  className="w-full h-[460px] md:h-[540px] object-cover object-top transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Vignette */}
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-primary/30 via-primary/5 to-transparent pointer-events-none" />

                {/* Top-right corner index */}
                <div className="absolute top-5 right-5 z-10 text-primary-foreground/90 text-[10px] uppercase tracking-[0.2em] font-medium">
                  N°01 / Équipe
                </div>

                {/* Bottom team name plate */}
                <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display text-primary-foreground text-[20px] leading-none">
                      L'équipe <span className="italic text-accent">MFinances</span>
                    </p>
                    <p className="text-[11px] text-primary-foreground/75 mt-1.5 uppercase tracking-[0.15em]">
                      Vos partenaires financiers
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating experience badge — bottom right */}
              <div
                className={`absolute -bottom-5 -right-3 z-20 bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-2xl transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0 rotate-[3deg]" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "1.05s" }}
              >
                <p className="font-display text-[28px] leading-none">
                  20<span className="text-accent">+</span>
                </p>
                <p className="text-[10px] text-primary-foreground/70 mt-1 uppercase tracking-[0.18em]">
                  ans d'exp.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial stats row */}
        <div
          className={`mt-20 md:mt-24 pt-10 border-t border-border/60 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0.85s" }}
        >
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {stats.map((s, i) => (
              <div key={s.label} className="relative">
                {i > 0 && (
                  <div className="hidden md:block absolute -left-6 top-2 bottom-2 w-px bg-border/60" />
                )}
                <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/40 font-medium mb-3">
                  — 0{i + 1}
                </div>
                <AnimatedStat {...s} />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee — infinite editorial ticker */}
        <div className="mt-16 md:mt-20 -mx-[80px] md:-mx-[80px] overflow-hidden border-y border-border/60 py-5 bg-primary/[0.015]">
          <div className="flex gap-12 animate-marquee whitespace-nowrap will-change-transform">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="flex items-center gap-12 shrink-0">
                <span className="font-display italic text-[28px] md:text-[38px] text-primary/80">
                  {item}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="pb-12" />
      </div>
    </section>
  );
}
