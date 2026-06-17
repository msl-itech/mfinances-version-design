import { Link } from "react-router-dom";
import { TrendingDown, Eye, HelpCircle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import MobileCarousel from "@/components/MobileCarousel";

const painPoints = [
  {
    icon: TrendingDown,
    title: "Trésorerie floue",
    desc: "Vous facturez, mais votre compte est souvent plus vide que prévu. Vous ne savez pas ce que sera votre trésorerie dans 60 jours.",
    label: "Symptôme #1",
  },
  {
    icon: Eye,
    title: "Fiscalité subie",
    desc: "Vous découvrez votre charge fiscale en fin d'année — quand il est trop tard pour agir. Chaque surprise coûte cher.",
    label: "Symptôme #2",
  },
  {
    icon: HelpCircle,
    title: "Décisions à l'aveugle",
    desc: "Ce n'est pas une question de talent. C'est un problème d'outils. Les grandes entreprises ont un DAF — pourquoi pas vous ?",
    label: "Symptôme #3",
  },
];

function PainCard({ pain }: { pain: typeof painPoints[0] }) {
  const Icon = pain.icon;
  return (
    <div className="group relative bg-background rounded-3xl p-7 border border-border/40 h-full overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-[0_16px_40px_rgba(232,57,58,0.08)]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span className="text-[10px] font-bold tracking-[0.18em] text-accent/70 uppercase">
        {pain.label}
      </span>

      <div className="mt-4 w-12 h-12 rounded-2xl bg-accent/[0.08] flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:rotate-[-6deg]">
        <Icon size={22} className="text-accent transition-colors duration-500 group-hover:text-accent-foreground" strokeWidth={1.5} />
      </div>

      <h3 className="font-display text-[22px] text-primary mt-5 leading-tight">{pain.title}</h3>
      <p className="text-[14px] text-muted-foreground leading-[1.7] mt-3">{pain.desc}</p>
    </div>
  );
}

export default function PainSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-8 md:py-14 bg-card relative overflow-hidden" ref={ref}>
      {/* Massive editorial backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-12 text-center font-display italic font-bold text-[140px] md:text-[220px] leading-none text-accent/[0.035] pointer-events-none select-none whitespace-nowrap"
      >
        Où ?
      </div>

      <div className="container-mf relative">
        <div className={`max-w-[820px] mx-auto mb-12 md:mb-20 reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center">
            <span className="inline-block text-accent/75 text-[11px] font-bold tracking-[0.2em] uppercase mb-5">
              · Le constat ·
            </span>
            <h2 className="font-display text-[28px] md:text-[46px] leading-[1.08]">
              Fin de mois tendu.
              <br />
              Décisions au feeling.{" "}
              <span className="text-accent italic relative inline-block">
                Où est passé l'argent ?
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7C80 3 220 3 298 7"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
          {painPoints.map((pain, i) => (
            <div
              key={pain.title}
              className={`reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <PainCard pain={pain} />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className={`md:hidden reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <MobileCarousel>
            {painPoints.map((pain) => (
              <PainCard key={pain.title} pain={pain} />
            ))}
          </MobileCarousel>
        </div>

        <div className={`text-center mt-10 md:mt-14 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.35s" }}>
          <Link
            to="/diagnostic/"
            className="group inline-flex items-center gap-3 text-accent text-[13px] font-bold uppercase tracking-[0.12em] hover:gap-4 transition-all"
          >
            <span className="w-10 h-px bg-accent transition-all duration-300 group-hover:w-14" />
            Plus maintenant — faites le diagnostic
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
