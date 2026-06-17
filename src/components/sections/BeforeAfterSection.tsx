import { useState } from "react";
import { X, Check, ArrowRight, ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const before = [
  "Décisions prises à l'intuition",
  "Trésorerie découverte en fin de mois",
  "Résultats annuels connus tardivement",
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
    <section className="py-8 md:py-14 bg-secondary relative overflow-hidden" ref={ref}>
      <div
        aria-hidden="true" data-anim="text-scrub"
        className="absolute inset-x-0 top-10 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.025] pointer-events-none select-none whitespace-nowrap"
      >
        Avant / Après
      </div>

      <div className="container-mf max-w-[1000px] relative">
        <div className={`text-center mb-12 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent/75 text-[11px] font-bold tracking-[0.2em] uppercase">
              La transformation
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-display text-[28px] md:text-[46px] leading-[1.08]">
            Ce que ça change <span className="text-accent italic">concrètement</span>
          </h2>
        </div>

        <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[32px] overflow-hidden shadow-[0_16px_60px_rgba(27,43,94,0.10)] reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          {/* AVANT */}
          <div className="bg-card relative">
            <div className="bg-gradient-to-br from-accent to-accent/85 text-accent-foreground px-7 py-5">
              <span className="text-[10px] font-bold tracking-[0.2em] opacity-80">SITUATION ACTUELLE</span>
              <p className="font-display text-[20px] mt-1 flex items-center gap-2">
                <X size={18} strokeWidth={2.5} />
                Avant MFinances
              </p>
            </div>
            <div className="p-7 md:p-9">
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
              <div className="md:hidden">
                <BeforeAfterList items={before} type="before" />
              </div>
            </div>
          </div>

          {/* Arrow connector - overlay centered */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_8px_24px_rgba(27,43,94,0.35)] ring-4 ring-card">
              <ArrowRight size={22} className="text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex md:hidden justify-center bg-card py-3 col-span-1">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center rotate-90 shadow-md">
              <ArrowRight size={16} className="text-primary-foreground" />
            </div>
          </div>

          {/* APRÈS */}
          <div className="bg-card relative">
            <div className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground px-7 py-5">
              <span className="text-[10px] font-bold tracking-[0.2em] opacity-70">AVEC MFINANCES</span>
              <p className="font-display text-[20px] mt-1 flex items-center gap-2">
                <Check size={18} strokeWidth={2.5} />
                Après MFinances
              </p>
            </div>
            <div className="p-7 md:p-9">
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
