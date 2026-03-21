import { X, Check, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const before = [
  "Décisions prises à l'intuition",
  "Trésorerie découverte en fin de mois",
  "Résultats annuels connus 6 mois après",
  "Fiscalité subie en fin d'année",
  "Investissements sans modélisation",
];

const after = [
  "Décisions basées sur des chiffres mensuels",
  "Tensions anticipées 3 mois à l'avance",
  "Situation financière en temps réel",
  "Charge fiscale anticipée et optimisée",
  "Chaque décision modélisée avant engagement",
];

export default function BeforeAfterSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-28" ref={ref}>
      <div className="container-mf max-w-[900px]">
        <h2 className={`font-display text-[22px] md:text-[36px] text-center mb-8 md:mb-12 reveal ${isVisible ? "visible" : ""}`}>
          Ce que ça change <span className="text-accent">concrètement</span>
        </h2>

        <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] rounded-2xl overflow-hidden border border-border/60 bg-white reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          <div>
            <div className="bg-accent text-white font-bold text-[14px] px-6 py-4">
              AVANT MFinances
            </div>
            <div className="p-5 md:p-7 space-y-3 md:space-y-4">
              {before.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <X size={15} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-foreground/60">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center px-3">
            <ArrowRight size={24} className="text-accent" />
          </div>

          <div>
            <div className="bg-primary text-white font-bold text-[14px] px-6 py-4">
              APRÈS MFinances
            </div>
            <div className="p-5 md:p-7 space-y-3 md:space-y-4">
              {after.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check size={15} className="text-[#27AE60] mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-primary font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
