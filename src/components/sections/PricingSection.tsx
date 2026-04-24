import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import MobileCarousel from "@/components/MobileCarousel";

const plans = [
  {
    label: "ESSENTIEL",
    price: "350",
    subtitle: "Pour sécuriser vos bases",
    features: ["Comptabilité complète", "Déclarations fiscales", "Accès à votre expert dédié"],
    popular: false,
  },
  {
    label: "PREMIUM",
    price: "450",
    subtitle: "Pour structurer votre croissance",
    features: ["Tout Essentiel +", "Contrôle de gestion mensuel", "Trésorerie prévisionnelle"],
    popular: true,
  },
  {
    label: "EXCELLENCE",
    price: "650",
    subtitle: "Pour piloter comme un grand",
    features: ["Tout Premium +", "DAF à temps partiel", "Modélisation décisionnelle"],
    popular: false,
  },
];

function PlanCard({ plan }: { plan: typeof plans[0] }) {
  return (
    <div
      className={`group relative rounded-[28px] p-7 md:p-9 h-full flex flex-col transition-all duration-500 overflow-hidden ${
        plan.popular
          ? "bg-primary text-primary-foreground shadow-[0_24px_60px_rgba(27,43,94,0.25)] hover:shadow-[0_32px_80px_rgba(27,43,94,0.32)]"
          : "bg-card border border-border/50 hover:border-primary/20 hover:shadow-[0_16px_40px_rgba(27,43,94,0.08)]"
      }`}
    >
      {plan.popular && (
        <>
          {/* Decorative gradient blob */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-[260px] h-[260px] rounded-full opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 60%)" }}
          />
          <span className="absolute top-6 right-6 z-10 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.12em] shadow-[0_4px_16px_rgba(232,57,58,0.4)]">
            POPULAIRE
          </span>
        </>
      )}

      <div className="relative z-10">
        <span
          className={`text-[10px] font-bold tracking-[0.2em] ${
            plan.popular ? "text-accent" : "text-accent"
          }`}
        >
          {plan.label}
        </span>
        <p
          className={`text-[13px] italic mt-2 ${
            plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {plan.subtitle}
        </p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span
            className={`font-display text-[52px] md:text-[64px] font-bold leading-none ${
              plan.popular ? "text-primary-foreground" : "text-primary"
            }`}
          >
            {plan.price}
          </span>
          <span
            className={`font-display text-[28px] font-bold ${
              plan.popular ? "text-accent" : "text-accent"
            }`}
          >
            €
          </span>
          <span
            className={`text-[12px] ml-1 ${
              plan.popular ? "text-primary-foreground/55" : "text-muted-foreground"
            }`}
          >
            /mois HTVA
          </span>
        </div>

        <div
          className={`my-7 h-px ${
            plan.popular ? "bg-primary-foreground/15" : "bg-border/60"
          }`}
        />

        <ul className="space-y-3.5 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-[14px]">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  plan.popular ? "bg-accent" : "bg-accent/10"
                }`}
              >
                <Check
                  size={11}
                  className={plan.popular ? "text-accent-foreground" : "text-accent"}
                  strokeWidth={3}
                />
              </div>
              <span
                className={
                  plan.popular ? "text-primary-foreground/85" : "text-foreground/80"
                }
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={plan.popular ? "accent" : "outline"}
        className="w-full mt-8 rounded-full group/cta relative z-10"
        size="lg"
        asChild
      >
        <Link to="/tarifs/">
          Choisir {plan.label.charAt(0) + plan.label.slice(1).toLowerCase()}
          <ArrowRight size={14} className="ml-1.5 group-hover/cta:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  );
}

export default function PricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-secondary py-14 md:py-32 relative overflow-hidden" ref={ref}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 text-center font-display italic font-bold text-[160px] md:text-[260px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
      >
        Tarifs
      </div>

      <div className="container-mf relative">
        <div className={`text-center mb-12 md:mb-20 reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
              Nos forfaits
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-display text-[28px] md:text-[46px] leading-[1.08] max-w-[760px] mx-auto">
            Des forfaits <span className="text-accent italic">transparents</span>,
            <br className="hidden md:block" />
            sans surprise
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={plan.label}
              className={`reveal ${isVisible ? "visible" : ""} ${plan.popular ? "lg:-translate-y-4" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className={`md:hidden reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <MobileCarousel>
            {plans.map((plan) => (
              <PlanCard key={plan.label} plan={plan} />
            ))}
          </MobileCarousel>
        </div>

        <p className="text-center mt-10 text-[12.5px] text-muted-foreground italic max-w-[680px] mx-auto leading-relaxed">
          Forfaits de départ. Le tarif final est fixé après une analyse gratuite de votre dossier (volume d'écritures, secteur, complexité). Aucun engagement avant validation du devis.
        </p>
      </div>
    </section>
  );
}
