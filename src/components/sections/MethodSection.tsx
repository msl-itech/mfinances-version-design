import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Search, Settings, Zap, ArrowRight } from "lucide-react";
import MobileCarousel from "@/components/MobileCarousel";

const steps = [
  { num: "01", icon: Search, title: "Comprendre", desc: "Nous analysons votre situation réelle. Vous savez enfin où vous en êtes — sans jargon." },
  { num: "02", icon: Settings, title: "Structurer", desc: "Budget, tableaux de bord, prévisionnel. Votre entreprise a enfin un vrai cockpit financier." },
  { num: "03", icon: Zap, title: "Anticiper", desc: "Chaque mois, on challenge vos décisions. Vous pilotez avec un temps d'avance." },
];

function StepCard({ step, isLast }: { step: typeof steps[0]; isLast?: boolean }) {
  const Icon = step.icon;
  return (
    <div className="relative group">
      <div className="bg-primary-dark/60 backdrop-blur-sm border border-primary-foreground/10 rounded-3xl p-7 md:p-8 h-full transition-all duration-500 hover:bg-primary-dark/80 hover:border-accent/30 hover:-translate-y-2">
        {/* Number watermark */}
        <span
          aria-hidden="true"
          className="absolute top-4 right-5 font-display text-[64px] font-bold leading-none text-accent/15 select-none transition-all duration-500 group-hover:text-accent/30"
        >
          {step.num}
        </span>

        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center mb-6 shadow-[0_8px_24px_rgba(232,57,58,0.3)] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
          <Icon size={24} className="text-accent-foreground" strokeWidth={1.75} />
        </div>

        <span className="text-accent/80 text-[10px] font-bold tracking-[0.18em] uppercase">
          Étape {step.num}
        </span>
        <h3 className="font-display text-[24px] md:text-[26px] text-primary-foreground mt-2 leading-tight">
          {step.title}
        </h3>
        <p className="text-primary-foreground/55 text-[14px] leading-[1.7] mt-4">
          {step.desc}
        </p>
      </div>

      {!isLast && (
        <div
          aria-hidden="true"
          className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-accent items-center justify-center shadow-[0_4px_16px_rgba(232,57,58,0.4)]"
        >
          <ArrowRight size={14} className="text-accent-foreground" strokeWidth={2.5} />
        </div>
      )}
    </div>
  );
}

export default function MethodSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-14 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Editorial backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 text-center font-display font-bold text-[160px] md:text-[260px] leading-none text-primary-foreground/[0.025] pointer-events-none select-none whitespace-nowrap"
      >
        Méthode
      </div>
      <div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.08] hidden md:block pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 65%)" }}
      />
      <div
        className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05] hidden md:block pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 65%)" }}
      />

      <div className="container-mf relative z-10">
        <div className={`text-center mb-12 md:mb-20 reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
              Notre approche
            </span>
            <span className="w-8 h-px bg-accent/60" />
          </div>
          <h2 className="font-display text-[28px] md:text-[46px] text-primary-foreground leading-[1.08]">
            Notre méthode en{" "}
            <span className="text-accent italic">3 étapes</span>
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              <StepCard step={step} isLast={i === steps.length - 1} />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className={`md:hidden reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <MobileCarousel>
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} isLast={i === steps.length - 1} />
            ))}
          </MobileCarousel>
        </div>

        <div className={`text-center mt-12 md:mt-16 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.45s" }}>
          <Button variant="accent" size="lg" className="rounded-full px-10 group" asChild>
            <Link to="/diagnostic/">
              Commencer mon diagnostic gratuit
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
