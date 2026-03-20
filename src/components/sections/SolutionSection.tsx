import { Link } from "react-router-dom";
import { BarChart2, Briefcase, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  {
    icon: BarChart2,
    title: "Contrôle de gestion à temps partiel",
    desc: "Tableaux de bord, indicateurs clés, suivi mensuel. Vous savez exactement où en est votre entreprise. Plus besoin de deviner, on vous donne les chiffres, les analyses.",
    href: "/services/controle-de-gestion/",
  },
  {
    icon: Briefcase,
    title: "DAF externalisé",
    desc: "Un Directeur Administratif et Financier à temps partiel, au coût de la mise en valeur. Vos bonnes décisions financières, une meilleure trésorerie, des résultats plus engagés pour vos investisseurs.",
    href: "/services/daf-externalise/",
  },
  {
    icon: TrendingUp,
    title: "Trésorerie prévisionnelle",
    desc: "Un prévisionnel actualisé chaque mois. Vous voyez les tensions 3 mois à l'avance — avant qu'elles arrivent.",
    href: "/services/tresorerie/",
  },
];

export default function SolutionSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-[#FAF8F6] py-20 md:py-28" ref={ref}>
      <div className="container-mf">
        <h2 className={`font-display text-[26px] md:text-[38px] text-center leading-[1.15] reveal ${isVisible ? "visible" : ""}`}>
          Un cabinet comptable qui fait
          <br />
          <span className="text-accent">plus que la comptabilité</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`bg-white rounded-2xl p-8 transition-all duration-200 hover:shadow-[0_8px_32px_rgba(27,43,94,0.1)] reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Icon size={24} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold font-body text-foreground">{s.title}</h3>
                <p className="text-[14px] text-foreground/55 leading-relaxed mt-3">{s.desc}</p>
                <Link to={s.href} className="text-accent text-[13px] font-semibold mt-4 inline-block hover:underline">
                  En savoir plus →
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/services/">Voir tous nos services →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
