import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const plans = [
  {
    label: "ESSENTIEL",
    price: "350",
    subtitle: "Pour sécuriser vos bases",
    features: ["Comptabilité complète", "Déclarations fiscales", "Accès à votre expert dédié"],
    popular: false,
    cta: "Choisir Essentiel →",
  },
  {
    label: "PREMIUM",
    price: "450",
    subtitle: "Pour structurer votre croissance",
    features: ["Tout Essentiel +", "Contrôle de gestion mensuel", "Trésorerie prévisionnelle"],
    popular: true,
    cta: "Choisir Premium →",
  },
  {
    label: "EXCELLENCE",
    price: "650",
    subtitle: "Pour piloter comme un grand",
    features: ["Tout Premium +", "DAF à temps partiel", "Modélisation décisionnelle"],
    popular: false,
    cta: "Choisir Excellence →",
  },
];

export default function PricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-[#FAF8F6] py-12 md:py-28" ref={ref}>
      <div className="container-mf">
        <h2 className={`font-display text-[22px] md:text-[36px] text-center reveal ${isVisible ? "visible" : ""}`}>
          Des forfaits <span className="text-accent">transparents</span>, sans surprise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-8 md:mt-14">
          {plans.map((plan, i) => (
            <div
              key={plan.label}
              className={`relative bg-white rounded-2xl p-8 border ${
                plan.popular ? "border-primary shadow-[0_8px_40px_rgba(27,43,94,0.1)]" : "border-border/40"
              } reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  POPULAIRE
                </span>
              )}

              <span className="text-[11px] font-bold tracking-[0.1em] text-foreground/40">
                {plan.label}
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-[44px] font-bold text-primary leading-none">
                  {plan.price}€
                </span>
                <span className="text-[13px] text-foreground/40">/mois HTVA</span>
              </div>
              <p className="text-accent text-[13px] italic mt-1">{plan.subtitle}</p>

              <hr className="my-5 border-border/30" />

              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[13px]">
                    <Check size={14} className="text-[#27AE60] flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full mt-6 rounded-full"
                asChild
              >
                <Link to="/tarifs/">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-[12px] text-foreground/40 italic">
          Tous les prix sont indicatifs. Un devis personnalisé est établi après le premier échange.
        </p>
      </div>
    </section>
  );
}
