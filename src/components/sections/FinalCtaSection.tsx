import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Clock, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const trustItems = [
  { icon: Lock, label: "Confidentiel" },
  { icon: Clock, label: "Sous 72h" },
  { icon: ShieldCheck, label: "Sans engagement" },
];

export default function FinalCtaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-8 md:py-14 relative overflow-hidden" ref={ref}>
      {/* Cinematic backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 text-center font-display italic font-bold text-[160px] md:text-[300px] leading-none text-accent/[0.05] pointer-events-none select-none whitespace-nowrap"
      >
        Clarté
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.06] hidden md:block pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 60%)" }}
      />

      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-mf text-center relative z-10">
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
              Premier échange gratuit
            </span>
            <span className="w-8 h-px bg-accent/60" />
          </div>
          <h2 className="font-display text-[30px] md:text-[56px] text-primary-foreground leading-[1.05] max-w-[820px] mx-auto">
            Prêt à piloter votre entreprise
            <br className="hidden md:block" />
            avec <span className="text-accent italic">clarté</span> ?
          </h2>
          <p className="text-primary-foreground/60 text-[15px] md:text-[16px] max-w-[560px] mx-auto mt-6 leading-[1.7]">
            Un premier échange confidentiel de 30 minutes pour analyser votre situation et voir comment nous pouvons vous aider.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-12 reveal ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.15s" }}
        >
          <Button variant="accent" size="lg" className="rounded-full px-10 group" asChild>
            <Link to="/diagnostic/">
              Lancer le diagnostic gratuit
              <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline-white" size="lg" className="rounded-full px-8" asChild>
            <Link to="/checklist-tresorerie/">Télécharger la checklist</Link>
          </Button>
        </div>

        <div
          className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 md:mt-12 reveal ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.25s" }}
        >
          {trustItems.map((t) => {
            const Icon = t.icon;
            return (
              <span
                key={t.label}
                className="inline-flex items-center gap-2 text-primary-foreground/45 text-[12px] tracking-wide"
              >
                <Icon size={14} className="text-accent/70" strokeWidth={1.75} />
                {t.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
