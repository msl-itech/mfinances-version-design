import { Link } from "react-router-dom";
import { FileText, Activity, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const cards = [
  {
    icon: FileText,
    title: "Checklist gratuite",
    desc: "Les 5 erreurs qui vident votre compte — et comment les corriger.",
    cta: "Télécharger la checklist",
    ctaHref: "/checklist-tresorerie/",
    badge: "PDF gratuit",
    accent: false,
  },
  {
    icon: Activity,
    title: "Diagnostic trésorerie",
    desc: "8 questions · 3 minutes · Score instantané de votre santé financière.",
    cta: "Lancer le diagnostic",
    ctaHref: "/diagnostic/",
    badge: "Résultat immédiat",
    accent: true,
  },
  {
    icon: Calendar,
    title: "Rendez-vous gratuit",
    desc: "30 min avec Mika. Confidentiel, personnalisé, sans engagement.",
    cta: "Réserver un créneau",
    ctaHref: "/contact/",
    badge: "Rappel sous 72h",
    accent: false,
  },
];

export default function EntryPointsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-20 bg-secondary" ref={ref}>
      <div className="container-mf">
        <div className={`text-center mb-10 md:mb-14 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
            3 FAÇONS DE COMMENCER
          </span>
          <h2 className="font-display text-[24px] md:text-[36px] mt-3 leading-[1.15]">
            Par où <span className="text-accent">commencer</span> ?
          </h2>
          <p className="text-muted-foreground text-[15px] mt-3 max-w-[480px] mx-auto">
            Choisissez votre premier pas — chaque option est gratuite et sans engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.ctaHref}
                className={`group relative bg-card rounded-2xl p-6 md:p-7 border transition-all duration-300 hover:-translate-y-1 ${
                  card.accent
                    ? "border-accent/30 shadow-[0_4px_24px_rgba(232,57,58,0.08)] hover:shadow-[0_12px_40px_rgba(232,57,58,0.12)]"
                    : "border-border/40 shadow-sm hover:shadow-[0_8px_32px_rgba(27,43,94,0.08)]"
                } reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                {card.accent && (
                  <span className="absolute -top-3 right-5 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-full">
                    Recommandé
                  </span>
                )}

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                  card.accent ? "bg-accent/10" : "bg-primary/5"
                }`}>
                  <Icon size={22} className={card.accent ? "text-accent" : "text-primary"} strokeWidth={1.5} />
                </div>

                <h3 className="font-bold text-[17px] font-body text-foreground">{card.title}</h3>
                <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed">{card.desc}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className={`text-[13px] font-semibold flex items-center gap-1.5 ${
                    card.accent ? "text-accent" : "text-primary"
                  }`}>
                    {card.cta}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                <span className="mt-4 block text-[10px] text-muted-foreground/50 font-bold tracking-[0.1em] uppercase">
                  {card.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
