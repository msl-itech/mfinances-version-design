import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const plans = [
  {
    label: "ESSENTIEL",
    price: "490",
    subtitle: "Pour sécuriser vos bases",
    features: ["Comptabilité complète", "Déclarations fiscales", "Accès à votre expert dédié"],
    popular: false,
    cta: "Choisir Essentiel →",
    border: "border border-border",
  },
  {
    label: "PREMIUM",
    price: "890",
    subtitle: "Pour structurer votre croissance",
    features: ["Tout Essentiel +", "Contrôle de gestion mensuel", "Trésorerie prévisionnelle"],
    popular: true,
    cta: "Choisir Premium →",
    border: "border-2 border-primary shadow-[0_8px_40px_rgba(27,43,94,0.12)]",
  },
  {
    label: "EXCELLENCE",
    price: "1 490",
    subtitle: "Pour piloter comme un grand",
    features: ["Tout Premium +", "DAF à temps partiel", "Modélisation décisionnelle"],
    popular: false,
    cta: "Choisir Excellence →",
    border: "border border-border",
  },
];

export default function PricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-white py-20 md:py-[100px]" ref={ref}>
      <div className="container-mf">
        <h2 className={`font-display text-[28px] md:text-[36px] text-center reveal ${isVisible ? "visible" : ""}`}>
          Des forfaits transparents, sans surprise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {plans.map((plan, i) => (
            <div
              key={plan.label}
              className={`relative bg-white rounded-3xl p-10 ${plan.border} reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-bold px-4 py-1 rounded-full">
                  POPULAIRE
                </span>
              )}

              <span className="text-[11px] font-bold tracking-[0.1em] text-muted-foreground">
                {plan.label}
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-[52px] font-bold text-primary leading-none">
                  {plan.price}€
                </span>
                <span className="text-[14px] text-muted-foreground">/mois HTVA</span>
              </div>
              <p className="italic text-accent text-[15px] mt-1">{plan.subtitle}</p>

              <hr className="my-6 border-border/50" />

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[14px]">
                    <Check size={16} className="text-[#27AE60] flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full mt-8"
                asChild
              >
                <Link to="/tarifs/">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-[12px] italic text-muted-foreground">
          Tous les prix sont indicatifs. Un devis personnalisé est établi après le premier échange.
        </p>
      </div>
    </section>
  );
}
