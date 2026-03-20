import { Link } from "react-router-dom";
import { FileText, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const cards = [
  {
    icon: FileText,
    title: "Guide gratuit",
    desc: "Les 5 erreurs qui vident votre compte",
    cta: "Découvrir →",
    ctaHref: "/checklist-tresorerie/",
    isButton: false,
  },
  {
    icon: Activity,
    title: "Diagnostic trésorerie",
    desc: "8 questions · Score instantané · 3 minutes",
    cta: "Commencer →",
    ctaHref: "/diagnostic/",
    isButton: true,
    recommended: true,
  },
  {
    icon: Calendar,
    title: "Rendez-vous gratuit",
    desc: "30 min avec Mika · Confidentiel",
    cta: "Prendre RDV →",
    ctaHref: "/contact/",
    isButton: false,
  },
];

export default function EntryPointsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-[#FAF8F6] py-10 md:py-12">
      <div className="container-mf" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`relative bg-white rounded-2xl p-6 border ${
                  card.recommended ? "border-accent/30 shadow-[0_4px_20px_rgba(232,57,58,0.08)]" : "border-border/40"
                } hover:shadow-[0_8px_32px_rgba(27,43,94,0.08)] transition-all duration-200 ${
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
                  <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-tr-[14px] rounded-bl-lg">
                    Recommandé
                  </span>
                )}
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-[15px] font-body">{card.title}</h3>
                <p className="text-[13px] text-foreground/50 mt-1">{card.desc}</p>
                <div className="mt-4">
                  {card.isButton ? (
                    <Button variant="accent" size="sm" className="w-full rounded-full" asChild>
                      <Link to={card.ctaHref}>{card.cta}</Link>
                    </Button>
                  ) : (
                    <Link to={card.ctaHref} className="text-accent text-[13px] font-semibold hover:underline">
                      {card.cta}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
