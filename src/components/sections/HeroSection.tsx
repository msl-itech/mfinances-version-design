import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/use-scroll-reveal";
import { ArrowRight, Star } from "lucide-react";
import mikaPhoto from "@/assets/mika-musungayi.png";

const stats = [
  { value: 200, suffix: "+", label: "entreprises accompagnées" },
  { value: 20, suffix: "+", label: "ans d'expérience" },
  { value: 5, suffix: ".0", label: "note Google" },
];

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useCountUp(value, 1500, true);
  return (
    <div className="text-center">
      <div className="font-display text-[28px] md:text-[36px] text-accent leading-none">
        {count}{suffix}
      </div>
      <p className="text-foreground/50 text-[12px] mt-1">{label}</p>
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden bg-background pt-6 md:pt-16 pb-0">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }} />
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="container-mf relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left — Copy */}
          <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Social proof badge */}
            <div
              className={`inline-flex items-center gap-2 bg-card border border-border/60 rounded-full px-4 py-2 mb-6 shadow-sm transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "0.15s" }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[12px] text-foreground/60 font-medium">5,0/5 · 16 avis Google</span>
            </div>

            <h1 className="text-[28px] md:text-[46px] font-bold leading-[1.1] md:leading-[1.08]">
              Vous travaillez dur.
              <br />
              Mais savez-vous vraiment
              <br className="hidden md:block" />
              si votre entreprise{" "}
              <span className="text-accent italic relative">
                gagne de l'argent
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>{" "}?
            </h1>

            <p
              className={`text-[15px] md:text-[16px] text-muted-foreground leading-[1.75] mt-6 max-w-[480px] transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "0.3s" }}
            >
              La plupart des dirigeants de TPE pilotent à l'aveugle — trésorerie floue,
              résultats découverts trop tard. MFinances change ça : un vrai pilotage financier,
              à un prix de PME.
            </p>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-col sm:flex-row items-start gap-3 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "0.5s" }}
            >
              <Button variant="accent" size="lg" className="rounded-full px-8 group" asChild>
                <Link to="/diagnostic/">
                  Diagnostic gratuit — 3 min
                  <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6" asChild>
                <Link to="/services/">Découvrir nos services</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div
              className={`mt-6 flex items-center gap-4 text-[12px] text-muted-foreground transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "0.65s" }}
            >
              <span className="flex items-center gap-1.5">🔒 Confidentiel</span>
              <span className="flex items-center gap-1.5">⏱ Résultat immédiat</span>
              <span className="flex items-center gap-1.5">✓ Sans engagement</span>
            </div>
          </div>

          {/* Right — Mika photo + stats */}
          <div
            className={`relative transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="relative">
              {/* Photo container */}
              <div className="relative bg-gradient-to-b from-primary/5 to-transparent rounded-3xl overflow-hidden">
                <img
                  src={mikaPhoto}
                  alt="Mika Musungayi — Expert-comptable certifié ITAA, fondateur MFinances"
                  className="w-full h-[380px] md:h-[480px] object-cover object-top"
                  loading="eager"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
              </div>

              {/* Floating name badge */}
              <div
                className={`absolute bottom-8 left-4 md:left-6 bg-card/90 backdrop-blur-md border border-border/50 rounded-2xl px-5 py-3 shadow-lg transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "0.7s" }}
              >
                <p className="font-bold text-[14px] text-foreground">Mika Musungayi</p>
                <p className="text-[12px] text-muted-foreground">Expert-comptable certifié ITAA</p>
              </div>

              {/* Floating stat badge */}
              <div
                className={`absolute top-6 right-4 md:right-6 bg-primary text-primary-foreground rounded-2xl px-4 py-3 shadow-lg transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "0.85s" }}
              >
                <p className="font-display text-[22px] leading-none">20+</p>
                <p className="text-[11px] text-primary-foreground/70 mt-0.5">ans d'expérience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className={`mt-8 md:mt-12 pb-10 md:pb-16 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0.8s" }}
        >
          <div className="grid grid-cols-3 gap-6 max-w-[500px] mx-auto">
            {stats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
