import { Link } from "react-router-dom";
import { BarChart2, Briefcase, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import MobileCarousel from "@/components/MobileCarousel";
import imgControle from "@/assets/service-controle-gestion.jpg";
import imgDaf from "@/assets/service-daf-externalise.jpg";
import imgTresorerie from "@/assets/service-tresorerie.jpg";

const services = [
  {
    icon: BarChart2,
    title: "Contrôle de gestion",
    subtitle: "à temps partiel",
    desc: "Tableaux de bord, indicateurs clés, suivi mensuel. Vous savez exactement où en est votre entreprise.",
    href: "/services/controle-de-gestion/",
    image: imgControle,
  },
  {
    icon: Briefcase,
    title: "DAF externalisé",
    subtitle: "à coût maîtrisé",
    desc: "Un Directeur Administratif et Financier à temps partiel. Vos décisions financières sont enfin éclairées.",
    href: "/services/daf-externalise/",
    image: imgDaf,
  },
  {
    icon: TrendingUp,
    title: "Trésorerie prévisionnelle",
    subtitle: "anticipée chaque mois",
    desc: "Un prévisionnel actualisé chaque mois. Vous voyez les tensions 3 mois à l'avance.",
    href: "/services/tresorerie/",
    image: imgTresorerie,
  },
];

function ServiceCard({ s }: { s: typeof services[0] }) {
  const Icon = s.icon;
  return (
    <Link
      to={s.href}
      className="group bg-card rounded-2xl overflow-hidden border border-border/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(27,43,94,0.1)] h-full flex flex-col"
    >
      <div className="relative h-40 md:h-48 overflow-hidden">
        <img
          src={s.image}
          alt={s.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="w-10 h-10 rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center">
            <Icon size={20} className="text-accent" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-[17px] font-bold font-body text-foreground">{s.title}</h3>
        <p className="text-accent text-[12px] font-medium mt-0.5">{s.subtitle}</p>
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-3 flex-1">{s.desc}</p>
        <span className="inline-flex items-center gap-1.5 text-primary text-[13px] font-semibold mt-4 group-hover:gap-2.5 transition-all">
          En savoir plus
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

export default function SolutionSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-background py-10 md:py-28" ref={ref}>
      <div className="container-mf">
        <div className={`text-center mb-8 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
            NOS SOLUTIONS
          </span>
          <h2 className="font-display text-[26px] md:text-[38px] leading-[1.15] mt-3">
            Un cabinet comptable qui fait
            <br className="hidden md:block" />
            <span className="text-accent">plus que la comptabilité</span>
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <ServiceCard s={s} />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className={`md:hidden reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <MobileCarousel itemClassName="min-w-[280px]">
            {services.map((s) => (
              <ServiceCard key={s.title} s={s} />
            ))}
          </MobileCarousel>
        </div>

        <div className={`text-center mt-10 md:mt-12 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <Button variant="outline" className="rounded-full px-8" asChild>
            <Link to="/services/">Voir tous nos services →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
