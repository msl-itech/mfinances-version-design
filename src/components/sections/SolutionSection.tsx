import { Link } from "react-router-dom";
import { BarChart2, Briefcase, TrendingUp, ArrowUpRight } from "lucide-react";
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
    tag: "Pilotage",
  },
  {
    icon: Briefcase,
    title: "DAF externalisé",
    subtitle: "à coût maîtrisé",
    desc: "Un Directeur Administratif et Financier à temps partiel. Vos décisions financières sont enfin éclairées.",
    href: "/services/daf-externalise/",
    image: imgDaf,
    tag: "Stratégie",
  },
  {
    icon: TrendingUp,
    title: "Trésorerie prévisionnelle",
    subtitle: "anticipée chaque mois",
    desc: "Un prévisionnel actualisé chaque mois. Vous voyez les tensions 3 mois à l'avance.",
    href: "/services/tresorerie/",
    image: imgTresorerie,
    tag: "Anticipation",
  },
];

function ServiceCard({ s }: { s: typeof services[0] }) {
  const Icon = s.icon;
  return (
    <Link
      to={s.href}
      className="group relative bg-card rounded-3xl overflow-hidden border border-border/40 h-full flex flex-col transition-all duration-500 hover:shadow-[0_24px_60px_rgba(27,43,94,0.14)] hover:border-primary/20"
    >
      <div className="relative h-52 md:h-60 overflow-hidden">
        <img
          src={s.image}
          alt={s.title}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />

        {/* Tag chip */}
        <span className="absolute top-4 left-4 bg-card/90 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.12em] uppercase border border-white/20">
          {s.tag}
        </span>

        {/* Icon badge */}
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-card/95 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
          <Icon size={22} className="text-accent" strokeWidth={1.75} />
        </div>

        {/* Hover arrow top-right */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <ArrowUpRight size={18} strokeWidth={2} />
        </div>
      </div>

      <div className="p-6 md:p-7 flex flex-col flex-1">
        <h3 className="font-display text-[22px] md:text-[24px] text-primary leading-tight">
          {s.title}
        </h3>
        <p className="text-accent text-[12px] font-medium italic mt-1">{s.subtitle}</p>
        <p className="text-[14px] text-muted-foreground leading-[1.7] mt-4 flex-1">{s.desc}</p>

        <div className="mt-5 pt-5 border-t border-border/40 flex items-center gap-2 text-primary text-[13px] font-semibold transition-all">
          <span className="group-hover:text-accent transition-colors">En savoir plus</span>
          <span className="flex-1 h-px bg-border/60 group-hover:bg-accent/50 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export default function SolutionSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-background py-8 md:py-14 relative overflow-hidden" ref={ref}>
      <div className="container-mf">
        <div className={`grid grid-cols-1 lg:grid-cols-[1fr_auto] lg:items-end gap-6 lg:gap-12 mb-12 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <div>
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent/75 text-[11px] font-bold tracking-[0.2em] uppercase">
                Nos solutions
              </span>
            </div>
            <h2 className="font-display text-[28px] md:text-[46px] leading-[1.08] max-w-[680px]">
              Un cabinet comptable
              <br className="hidden md:block" />
              qui fait <span className="text-accent italic">plus</span> que la comptabilité
            </h2>
          </div>
          <div className="hidden lg:block max-w-[280px]">
            <p className="text-muted-foreground text-[14px] leading-relaxed">
              Trois services pensés comme une seule mission : faire de votre comptabilité un véritable outil de pilotage.
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
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
          <MobileCarousel>
            {services.map((s) => (
              <ServiceCard key={s.title} s={s} />
            ))}
          </MobileCarousel>
        </div>

        <div className={`text-center mt-12 md:mt-16 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <Button variant="outline" size="lg" className="rounded-full px-8 group" asChild>
            <Link to="/services/">
              Voir tous nos services
              <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:rotate-45" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
