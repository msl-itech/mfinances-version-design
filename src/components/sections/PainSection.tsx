import { Link } from "react-router-dom";
import { AlertTriangle, TrendingDown, Eye, HelpCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import MobileCarousel from "@/components/MobileCarousel";

const painPoints = [
  {
    icon: TrendingDown,
    title: "Trésorerie floue",
    desc: "Vous facturez, mais votre compte est souvent plus vide que prévu. Vous ne savez pas ce que sera votre trésorerie dans 60 jours.",
  },
  {
    icon: Eye,
    title: "Fiscalité subie",
    desc: "Vous découvrez votre charge fiscale en fin d'année — quand il est trop tard pour agir. Chaque surprise coûte cher.",
  },
  {
    icon: HelpCircle,
    title: "Décisions à l'aveugle",
    desc: "Ce n'est pas une question de talent. C'est un problème d'outils. Les grandes entreprises ont un DAF — pourquoi pas vous ?",
  },
];

function PainCard({ pain }: { pain: typeof painPoints[0] }) {
  const Icon = pain.icon;
  return (
    <div className="bg-background rounded-2xl p-6 md:p-7 border border-accent/10 h-full">
      <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
        <Icon size={20} className="text-accent" strokeWidth={1.5} />
      </div>
      <h3 className="font-bold text-[16px] font-body text-foreground mb-2">{pain.title}</h3>
      <p className="text-[14px] text-muted-foreground leading-[1.75]">{pain.desc}</p>
    </div>
  );
}

export default function PainSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-10 md:py-28 bg-card" ref={ref}>
      <div className="container-mf">
        <div className={`text-center max-w-[700px] mx-auto mb-8 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle size={26} className="text-accent" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-[24px] md:text-[38px] leading-[1.15]">
            Fin de mois tendu. Décisions au feeling.
            <br className="hidden md:block" />
            <span className="text-accent italic">Où est passé l'argent ?</span>
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6">
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

        <div className={`text-center mt-8 md:mt-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.35s" }}>
          <Link to="/diagnostic/" className="inline-flex items-center gap-2 text-accent text-[14px] font-bold uppercase tracking-wide hover:underline">
            PLUS MAINTENANT — FAITES LE DIAGNOSTIC →
          </Link>
        </div>
      </div>
    </section>
  );
}
