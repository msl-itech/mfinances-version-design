import { Link } from "react-router-dom";
import { FileText, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const cards = [
  {
    icon: FileText,
    iconColor: "text-primary",
    title: "Guide gratuit",
    desc: "Les 5 erreurs qui vident votre compte",
    cta: "Découvrir →",
    ctaHref: "/checklist-tresorerie/",
    ctaType: "link-red" as const,
    badge: "Aucun engagement · PDF immédiat",
    border: "border border-border",
    shadow: "",
    recommended: false,
  },
  {
    icon: Activity,
    iconColor: "text-accent",
    title: "Diagnostic trésorerie",
    desc: "8 questions · Score instantané · 3 minutes",
    cta: "Commencer →",
    ctaHref: "/diagnostic/",
    ctaType: "button" as const,
    badge: "Résultat immédiat · Gratuit",
    border: "border-2 border-accent",
    shadow: "shadow-[0_4px_20px_rgba(232,57,58,0.12)]",
    recommended: true,
  },
  {
    icon: Calendar,
    iconColor: "text-primary",
    title: "Rendez-vous gratuit",
    desc: "30 min avec Mika · Confidentiel",
    cta: "Prendre RDV →",
    ctaHref: "/contact/",
    ctaType: "link-blue" as const,
    badge: "Rappel sous 72h · Sans engagement",
    border: "border border-border",
    shadow: "",
    recommended: false,
  },
];

export default function EntryPointsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-background py-12 md:py-12">
      <div className="container-mf" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`relative bg-white rounded-2xl p-7 ${card.border} ${card.shadow} transition-all duration-200 hover:shadow-[0_8px_32px_rgba(27,43,94,0.12)] cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{
                  transitionDelay: isVisible ? `${i * 0.1}s` : "0s",
                  transitionProperty: "opacity, transform, box-shadow",
                  transitionDuration: "0.6s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {card.recommended && (
                  <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[11px] font-bold px-2.5 py-1 rounded-tr-[14px] rounded-bl-lg">
                    Recommandé
                  </span>
                )}

                <Icon size={28} className={card.iconColor} strokeWidth={1.5} />
                <h3 className="font-bold text-[15px] mt-3 font-body text-foreground">{card.title}</h3>
                <p className="text-[13px] text-muted-foreground mt-1">{card.desc}</p>

                <div className="mt-4">
                  {card.ctaType === "button" ? (
                    <Button variant="accent" size="sm" asChild className="w-full">
                      <Link to={card.ctaHref}>{card.cta}</Link>
                    </Button>
                  ) : (
                    <Link
                      to={card.ctaHref}
                      className={`link-underline text-[13px] font-medium ${
                        card.ctaType === "link-red" ? "text-accent" : "text-primary"
                      }`}
                    >
                      {card.cta}
                    </Link>
                  )}
                </div>

                <p className="text-[11px] text-muted-foreground mt-4 pt-3 border-t border-border/50">
                  {card.badge}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
