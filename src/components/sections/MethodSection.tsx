import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Search, Settings, Zap } from "lucide-react";

const steps = [
  { num: "01", icon: Search, title: "Comprendre", desc: "Nous analysons votre situation réelle. Vous savez enfin où vous en êtes — sans jargon." },
  { num: "02", icon: Settings, title: "Structurer", desc: "Budget, tableaux de bord, prévisionnel. Votre entreprise a enfin un vrai cockpit financier." },
  { num: "03", icon: Zap, title: "Anticiper", desc: "Chaque mois, on challenge vos décisions. Vous pilotez avec un temps d'avance." },
];

export default function MethodSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-14 md:py-28 relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }} />

      <div className="container-mf relative z-10">
        <div className={`text-center mb-10 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent/80 text-[11px] font-bold tracking-[0.15em] uppercase">
            NOTRE APPROCHE
          </span>
          <h2 className="font-display text-[26px] md:text-[40px] text-primary-foreground mt-3 leading-[1.12]">
            Notre méthode en <span className="text-accent">3 étapes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[16.5%] right-[16.5%] h-[2px] bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`relative text-center reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              >
                {/* Number circle */}
                <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-primary-dark border-2 border-accent/30 flex items-center justify-center mx-auto mb-5">
                  <Icon size={28} className="text-accent" strokeWidth={1.5} />
                </div>

                <span className="text-accent font-display text-[32px] font-bold leading-none">{step.num}</span>
                <h3 className="font-bold text-[18px] text-primary-foreground mt-2 font-body">{step.title}</h3>
                <p className="text-primary-foreground/55 text-[14px] leading-relaxed mt-3 max-w-[280px] mx-auto">{step.desc}</p>
              </div>
            );
          })}
        </div>

        <div className={`text-center mt-14 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.45s" }}>
          <Button variant="accent" size="lg" className="rounded-full px-8" asChild>
            <Link to="/diagnostic/">Commencer mon diagnostic gratuit →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
