import { Link } from "react-router-dom";
import { BarChart2, Briefcase, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
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

export default function SolutionSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-background py-14 md:py-28" ref={ref}>
      <div className="container-mf">
        <div className={`text-center mb-10 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
            NOS SOLUTIONS
          </span>
          <h2 className="font-display text-[26px] md:text-[38px] leading-[1.15] mt-3">
            Un cabinet comptable qui fait
            <br className="hidden md:block" />
            <span className="text-accent">plus que la comptabilité</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                to={s.href}
                className={`group bg-card rounded-2xl overflow-hidden border border-border/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(27,43,94,0.1)] reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
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
                <div className="p-5 md:p-6">
                  <h3 className="text-[17px] font-bold font-body text-foreground">{s.title}</h3>
                  <p className="text-accent text-[12px] font-medium mt-0.5">{s.subtitle}</p>
                  <p className="text-[14px] text-muted-foreground leading-relaxed mt-3">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-[13px] font-semibold mt-4 group-hover:gap-2.5 transition-all">
                    En savoir plus
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={`text-center mt-12 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <Button variant="outline" className="rounded-full px-8" asChild>
            <Link to="/services/">Voir tous nos services →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
