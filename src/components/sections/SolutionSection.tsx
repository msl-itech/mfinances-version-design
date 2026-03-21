import { Link } from "react-router-dom";
import { BarChart2, Briefcase, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import imgControle from "@/assets/service-controle-gestion.jpg";
import imgDaf from "@/assets/service-daf-externalise.jpg";
import imgTresorerie from "@/assets/service-tresorerie.jpg";

const services = [
  {
    icon: BarChart2,
    title: "Contrôle de gestion à temps partiel",
    desc: "Tableaux de bord, indicateurs clés, suivi mensuel. Vous savez exactement où en est votre entreprise. Plus besoin de deviner, on vous donne les chiffres, les analyses.",
    href: "/services/controle-de-gestion/",
    image: imgControle,
  },
  {
    icon: Briefcase,
    title: "DAF externalisé",
    desc: "Un Directeur Administratif et Financier à temps partiel, au coût de la mise en valeur. Vos bonnes décisions financières, une meilleure trésorerie, des résultats plus engagés pour vos investisseurs.",
    href: "/services/daf-externalise/",
    image: imgDaf,
  },
  {
    icon: TrendingUp,
    title: "Trésorerie prévisionnelle",
    desc: "Un prévisionnel actualisé chaque mois. Vous voyez les tensions 3 mois à l'avance — avant qu'elles arrivent.",
    href: "/services/tresorerie/",
    image: imgTresorerie,
  },
];

export default function SolutionSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-[#FAF8F6] py-12 md:py-28" ref={ref}>
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
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_8px_32px_rgba(27,43,94,0.1)] reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-36 md:h-44 object-cover"
                  loading="lazy"
                />
                <div className="p-5 md:p-7">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[18px] font-bold font-body text-foreground">{s.title}</h3>
                  <p className="text-[14px] text-foreground/55 leading-relaxed mt-3">{s.desc}</p>
                  <Link to={s.href} className="text-accent text-[13px] font-semibold mt-4 inline-block hover:underline">
                    En savoir plus →
                  </Link>
                </div>
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
