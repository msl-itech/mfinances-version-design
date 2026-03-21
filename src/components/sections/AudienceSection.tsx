import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Building2, Heart, Rocket, Building } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const audiences = [
  { icon: Rocket, label: "Indépendants & Startups", href: "/qui-nous-accompagnons/independants-startups/" },
  { icon: Briefcase, label: "Commerce & Horeca", href: "/qui-nous-accompagnons/commerce-horeca/" },
  { icon: Heart, label: "Professions de santé", href: "/qui-nous-accompagnons/professions-sante/" },
  { icon: Building2, label: "Entreprises en croissance", href: "/qui-nous-accompagnons/entreprises-croissance/" },
  { icon: Building, label: "Promoteurs immobiliers", href: "/qui-nous-accompagnons/promoteurs-immobiliers/" },
];

export default function AudienceSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-background py-14 md:py-24" ref={ref}>
      <div className="container-mf">
        <div className={`text-center mb-10 md:mb-14 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
            POUR QUI
          </span>
          <h2 className="font-display text-[24px] md:text-[36px] mt-3 leading-[1.15]">
            Nous accompagnons les dirigeants
            <br className="hidden md:block" />
            qui ont décidé de <span className="text-accent">grandir</span>
          </h2>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          {audiences.map((a, i) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                to={a.href}
                className="group flex flex-col items-center gap-3 bg-card rounded-2xl p-5 md:p-6 border border-border/40 hover:border-primary/30 hover:shadow-[0_6px_24px_rgba(27,43,94,0.08)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Icon size={22} className="text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-[13px] font-medium text-foreground text-center leading-tight">{a.label}</span>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </Link>
            );
          })}
        </div>

        <div className={`text-center mt-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <Link to="/qui-nous-accompagnons/" className="text-accent text-[13px] font-semibold hover:underline">
            Trouvez votre profil →
          </Link>
        </div>
      </div>
    </section>
  );
}
