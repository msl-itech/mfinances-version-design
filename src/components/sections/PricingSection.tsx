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
      className={`relative bg-card rounded-3xl p-5 md:p-8 border transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${
        plan.popular
          ? "border-primary/30 shadow-[0_8px_40px_rgba(27,43,94,0.1)] hover:shadow-[0_12px_48px_rgba(27,43,94,0.14)]"
          : "border-border/40 hover:shadow-[0_6px_24px_rgba(27,43,94,0.06)]"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md">
          LE PLUS POPULAIRE
        </span>
      )}

      <span className="text-[11px] font-bold tracking-[0.12em] text-muted-foreground">
        {plan.label}
      </span>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-display text-[40px] md:text-[48px] font-bold text-primary leading-none">
          {plan.price}€
        </span>
        <span className="text-[13px] text-muted-foreground">/mois HTVA</span>
      </div>
      <p className="text-accent text-[13px] font-medium italic mt-1">{plan.subtitle}</p>

      <hr className="my-6 border-border/30" />

      <ul className="space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-[13px]">
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <Check size={11} className="text-emerald-600" strokeWidth={3} />
            </div>
            <span className="text-foreground/80">{f}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? "accent" : "outline"}
        className="w-full mt-7 rounded-full group"
        size="lg"
        asChild
      >
        <Link to="/tarifs/">
          Choisir {plan.label.charAt(0) + plan.label.slice(1).toLowerCase()}
          <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  );
}

export default function PricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-background py-10 md:py-28" ref={ref}>
      <div className="container-mf">
        <div className={`text-center mb-8 md:mb-14 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
            NOS FORFAITS
          </span>
          <h2 className="font-display text-[24px] md:text-[38px] mt-3 leading-[1.15]">
            Des forfaits <span className="text-accent">transparents</span>, sans surprise
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.label}
              className={`reveal ${isVisible ? "visible" : ""}`}
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

        <p className="text-center mt-8 text-[12px] text-muted-foreground italic">
          Tous les prix sont indicatifs. Un devis personnalisé est établi après le premier échange.
        </p>
      </div>
    </section>
  );
}
