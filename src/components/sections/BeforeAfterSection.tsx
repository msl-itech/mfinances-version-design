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
    <section className="bg-white py-20 md:py-[100px]" ref={ref}>
      <div className="container-mf max-w-[1000px]">
        <h2 className={`font-display text-[28px] md:text-[36px] text-center mb-12 reveal ${isVisible ? "visible" : ""}`}>
          Ce que ça change concrètement
        </h2>

        <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] rounded-[20px] overflow-hidden border border-border reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          {/* Before */}
          <div>
            <div className="bg-accent text-accent-foreground font-bold text-[15px] px-6 py-4">
              AVANT MFinances
            </div>
            <div className="p-8 bg-[#FFF8F8] space-y-4">
              {before.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <X size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-[#444]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow separator */}
          <div className="hidden md:flex items-center justify-center px-4 bg-white">
            <ArrowRight size={28} className="text-accent" />
          </div>

          {/* After */}
          <div>
            <div className="bg-primary text-primary-foreground font-bold text-[15px] px-6 py-4">
              APRÈS MFinances
            </div>
            <div className="p-8 bg-[#F0F8FF] space-y-4">
              {after.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check size={16} className="text-[#27AE60] mt-0.5 flex-shrink-0" />
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
