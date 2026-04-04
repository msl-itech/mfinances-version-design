import { useState } from "react";
import { X, Check, ArrowRight, ChevronDown } from "lucide-react";
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

function BeforeAfterList({ items, type }: { items: string[]; type: "before" | "after" }) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = 3;
  const shown = expanded ? items : items.slice(0, visibleCount);
  const hasMore = items.length > visibleCount;

  return (
    <>
      <div className="space-y-4">
        {shown.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
              type === "before" ? "bg-accent/10" : "bg-emerald-500/10"
            }`}>
              {type === "before" ? (
                <X size={11} className="text-accent" strokeWidth={3} />
              ) : (
                <Check size={11} className="text-emerald-600" strokeWidth={3} />
              )}
            </div>
            <span className={`text-[14px] leading-snug ${
              type === "before" ? "text-muted-foreground" : "text-primary font-medium"
            }`}>{item}</span>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="md:hidden flex items-center gap-1 text-[13px] text-accent font-semibold mt-3 min-h-[48px]"
        >
          {expanded ? "Réduire" : "Voir plus"}
          <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </>
  );
}

export default function BeforeAfterSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-10 md:py-28 bg-secondary" ref={ref}>
      <div className="container-mf max-w-[960px]">
        <div className={`text-center mb-8 md:mb-14 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
            LA TRANSFORMATION
          </span>
          <h2 className="font-display text-[24px] md:text-[38px] mt-3 leading-[1.15]">
            Ce que ça change <span className="text-accent">concrètement</span>
          </h2>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 rounded-3xl overflow-hidden shadow-[0_4px_32px_rgba(27,43,94,0.06)] reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          {/* AVANT */}
          <div className="bg-card">
            <div className="bg-gradient-to-r from-accent/90 to-accent text-accent-foreground font-bold text-[13px] px-6 py-4 tracking-wide uppercase">
              ✕ Avant MFinances
            </div>
            <div className="p-6 md:p-8">
              {/* Desktop: show all */}
              <div className="hidden md:block space-y-4">
                {before.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <X size={11} className="text-accent" strokeWidth={3} />
                    </div>
                    <span className="text-[14px] text-muted-foreground leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              {/* Mobile: collapsible */}
              <div className="md:hidden">
                <BeforeAfterList items={before} type="before" />
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center px-4 bg-card">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <ArrowRight size={18} className="text-primary-foreground" />
            </div>
          </div>
          <div className="flex md:hidden justify-center bg-card py-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center rotate-90">
              <ArrowRight size={14} className="text-primary-foreground" />
            </div>
          </div>

          {/* APRÈS */}
          <div className="bg-card">
            <div className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground font-bold text-[13px] px-6 py-4 tracking-wide uppercase">
              ✓ Après MFinances
            </div>
            <div className="p-6 md:p-8">
              {/* Desktop: show all */}
              <div className="hidden md:block space-y-4">
                {after.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check size={11} className="text-emerald-600" strokeWidth={3} />
                    </div>
                    <span className="text-[14px] text-primary font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              {/* Mobile: collapsible */}
              <div className="md:hidden">
                <BeforeAfterList items={after} type="after" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
