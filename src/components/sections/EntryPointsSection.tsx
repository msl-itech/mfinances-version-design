import { Link } from "react-router-dom";
import { FileText, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const cards = [
  {
    icon: FileText,
    iconColor: "text-primary",
    title: "Guide gratuit",
    desc: "Pourquoi vous n'avez jamais d'argent sur votre compte — les 5 erreurs à corriger",
    cta: "Découvrir pourquoi mon compte est vide →",
    ctaHref: "/checklist-tresorerie/",
    isButton: false,
    ctaColor: "text-accent",
    badge: "Aucun engagement",
    recommended: false,
  },
  {
    icon: Activity,
    iconColor: "text-accent",
    title: "Diagnostic gratuit",
    desc: "8 questions · 3 minutes · Score instantané de votre trésorerie",
    cta: "Découvrir pourquoi je manque de cash →",
    ctaHref: "/diagnostic/",
    isButton: true,
    ctaColor: "",
    badge: "Résultat immédiat",
    recommended: true,
  },
  {
    icon: Calendar,
    iconColor: "text-primary",
    title: "Rendez-vous gratuit",
    desc: "Premier échange de 30 min avec Mika. Confidentiel et sans engagement.",
    cta: "Parler à un expert — c'est gratuit →",
    ctaHref: "/contact/",
    isButton: false,
    ctaColor: "text-primary",
    badge: "Rappel sous 72h",
    recommended: false,
  },
];

export default function EntryPointsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-10 md:py-12" style={{ backgroundColor: "#F7F8FC" }}>
      <div className="container-mf" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`relative bg-white rounded-2xl p-6 ${
                  card.recommended
                    ? "border-2 border-accent shadow-[0_4px_24px_rgba(232,57,58,0.10)]"
                    : "border border-[#E0E4F0] shadow-[0_2px_12px_rgba(27,43,94,0.06)]"
                } flex flex-col ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{
                  transitionDelay: isVisible ? `${i * 0.08}s` : "0s",
                  transitionProperty: "opacity, transform, box-shadow",
                  transitionDuration: "0.6s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {card.recommended && (
                  <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-[11px] font-bold px-3 py-1 rounded-tr-[14px] rounded-bl-xl">
                    Recommandé
                  </span>
                )}
                <Icon size={28} className={card.iconColor} strokeWidth={1.5} />
                <h3 className="font-bold text-[16px] font-body mt-4">{card.title}</h3>
                <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed flex-1">{card.desc}</p>
                <div className="mt-5">
                  {card.isButton ? (
                    <Button variant="accent" size="sm" className="w-full rounded-full text-[13px]" asChild>
                      <Link to={card.ctaHref}>{card.cta}</Link>
                    </Button>
                  ) : (
                    <Link to={card.ctaHref} className={`${card.ctaColor} text-[13px] font-semibold hover:underline`}>
                      {card.cta}
                    </Link>
                  )}
                </div>
                <span className="mt-4 text-[11px] text-muted-foreground/60 font-medium tracking-wide uppercase">
                  {card.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
