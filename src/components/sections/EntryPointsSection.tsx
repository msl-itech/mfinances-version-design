import { Link } from "react-router-dom";
import { FileText, Activity, Calendar, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import MobileCarousel from "@/components/MobileCarousel";

const cards = [
  {
    icon: FileText,
    title: "Checklist gratuite",
    desc: "Les 5 erreurs silencieuses qui vident la trésorerie des dirigeants — identifiez-les en 2 minutes.",
    cta: "Télécharger — PDF gratuit, immédiat",
    ctaHref: "/checklist-tresorerie/",
    badge: "PDF gratuit",
    accent: false,
    num: "01",
  },
  {
    icon: Activity,
    title: "Diagnostic trésorerie",
    desc: "8 questions · 3 minutes · Score instantané de votre santé financière.",
    cta: "Lancer le diagnostic",
    ctaHref: "/diagnostic/",
    badge: "Résultat immédiat",
    accent: true,
    num: "02",
  },
  {
    icon: Calendar,
    title: "Rendez-vous gratuit",
    desc: "30 min avec Mika. Confidentiel, personnalisé, sans engagement.",
    cta: "Réserver un créneau",
    ctaHref: "/contact/",
    badge: "Rappel sous 72h",
    accent: false,
    num: "03",
  },
];

function EntryCard({ card }: { card: typeof cards[0] }) {
  const Icon = card.icon;
  return (
    <Link
      to={card.ctaHref}
      className={`group relative bg-card rounded-3xl p-7 border h-full flex flex-col overflow-hidden transition-shadow duration-500 ${
        card.accent
          ? "border-accent/40 shadow-[0_8px_32px_rgba(232,57,58,0.08)] hover:shadow-[0_20px_60px_rgba(232,57,58,0.18)]"
          : "border-border/50 shadow-[0_2px_12px_rgba(27,43,94,0.04)] hover:shadow-[0_16px_50px_rgba(27,43,94,0.10)]"
      }`}
    >
      {/* Decorative number watermark */}
      <span
        aria-hidden="true"
        className={`absolute -top-4 -right-2 font-display text-[120px] leading-none font-bold pointer-events-none select-none transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 ${
          card.accent ? "text-accent/[0.06]" : "text-primary/[0.05]"
        }`}
      >
        {card.num}
      </span>

      {card.accent && (
        <span className="absolute top-5 right-5 z-10 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
          RECOMMANDÉ
        </span>
      )}

      <div
        className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 ${
          card.accent
            ? "bg-gradient-to-br from-accent to-accent/80 shadow-[0_8px_24px_rgba(232,57,58,0.25)]"
            : "bg-gradient-to-br from-primary to-primary-light shadow-[0_8px_24px_rgba(27,43,94,0.20)]"
        }`}
      >
        <Icon size={22} className="text-white" strokeWidth={1.75} />
      </div>

      <h3 className="font-display text-[22px] font-bold text-primary leading-tight relative z-10">
        {card.title}
      </h3>
      <p className="text-[13.5px] text-muted-foreground mt-3 leading-[1.65] flex-1 relative z-10">
        {card.desc}
      </p>

      <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between gap-3 relative z-10">
        <span
          className={`text-[12.5px] font-semibold flex items-center gap-1.5 leading-tight ${
            card.accent ? "text-accent" : "text-primary"
          }`}
        >
          {card.cta}
        </span>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
            card.accent
              ? "bg-accent text-accent-foreground group-hover:rotate-45"
              : "bg-primary/[0.06] text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45"
          }`}
        >
          <ArrowUpRight size={16} strokeWidth={2} />
        </div>
      </div>
      <span className="mt-3 block text-[10px] text-muted-foreground/55 font-bold tracking-[0.15em] uppercase relative z-10">
        {card.badge}
      </span>
    </Link>
  );
}

export default function EntryPointsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-8 md:py-10 bg-secondary relative overflow-hidden" ref={ref}>
      {/* Editorial decorative number */}
      <div
        aria-hidden="true"
        className="absolute -top-10 left-0 right-0 text-center font-display font-bold text-[180px] md:text-[280px] leading-none text-primary/[0.025] pointer-events-none select-none whitespace-nowrap"
      >
        START
      </div>

      <div className="container-mf relative">
        <div className={`text-center mb-12 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
              3 façons de commencer
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-display text-[28px] md:text-[44px] leading-[1.1] max-w-[720px] mx-auto">
            Par où <span className="text-accent italic">commencer</span> ?
          </h2>
          <p className="text-muted-foreground text-[15px] mt-4 max-w-[480px] mx-auto leading-relaxed">
            Choisissez votre premier pas — chaque option est gratuite et sans engagement.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`reveal ${isVisible ? "visible" : ""} ${card.accent ? "md:-translate-y-3" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <EntryCard card={card} />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className={`md:hidden reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <MobileCarousel>
            {cards.map((card) => (
              <EntryCard key={card.title} card={card} />
            ))}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}
