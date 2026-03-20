import { Link } from "react-router-dom";
import { BarChart2, Briefcase, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import financialDesk from "@/assets/financial-desk.jpg";

const services = [
  {
    icon: BarChart2,
    color: "border-primary",
    iconColor: "text-primary",
    title: "Contrôle de gestion",
    desc: "Tableaux de bord, indicateurs clés, suivi mensuel. Vous savez exactement où en est votre entreprise.",
    href: "/services/controle-de-gestion/",
    badge: null,
  },
  {
    icon: Briefcase,
    color: "border-accent",
    iconColor: "text-accent",
    title: "DAF à temps partiel",
    desc: "Un Directeur Financier à vos côtés pour les décisions qui comptent. Sans le coût d'un recrutement.",
    href: "/services/daf-externalise/",
    badge: "Excellence",
  },
  {
    icon: TrendingUp,
    color: "border-primary",
    iconColor: "text-primary",
    title: "Trésorerie prévisionnelle",
    desc: "Un prévisionnel actualisé chaque mois. Vous voyez les tensions 3 mois à l'avance — avant qu'elles arrivent.",
    href: "/services/tresorerie/",
    badge: null,
  },
];

export default function SolutionSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-[100px]" style={{ background: "linear-gradient(180deg, #F7F4EE 0%, #F5F2EC 100%)" }} ref={ref}>
      <div className="container-mf">
        <h2 className={`font-display text-[28px] md:text-[40px] text-center reveal ${isVisible ? "visible" : ""}`}>
          Un cabinet comptable qui fait plus que la comptabilité
        </h2>
        <p className={`text-[17px] text-[#555] text-center mt-4 mb-8 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          Trois expertises intégrées dans un seul accompagnement
        </p>

        {/* Warm image banner */}
        <div className={`rounded-2xl overflow-hidden mb-12 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          <img
            src={financialDesk}
            alt="Analyse financière professionnelle"
            className="w-full h-[200px] object-cover"
            loading="lazy"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`relative bg-white rounded-3xl p-10 border-t-4 ${s.color} border-x border-b border-primary/10 transition-all duration-200 hover:shadow-[0_8px_32px_rgba(27,43,94,0.12)] reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
              >
                {s.badge && (
                  <span className="inline-block bg-[#FFF0F0] text-accent text-[11px] font-bold px-2 py-0.5 rounded mb-4">
                    {s.badge}
                  </span>
                )}
                <Icon size={40} className={s.iconColor} strokeWidth={1.5} />
                <h3 className="text-[22px] mt-4">{s.title}</h3>
                <p className="text-[15px] text-[#555] leading-relaxed mt-3">{s.desc}</p>
                <Link to={s.href} className="link-underline text-accent text-[14px] font-medium mt-6 inline-block">
                  En savoir plus →
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link to="/services/">Voir tous nos services →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
