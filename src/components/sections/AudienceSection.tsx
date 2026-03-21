import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import imgIndependants from "@/assets/audience-independants.jpg";
import imgHoreca from "@/assets/audience-commerce-horeca.jpg";
import imgSante from "@/assets/audience-sante.jpg";
import imgCroissance from "@/assets/audience-croissance.jpg";
import imgPromoteurs from "@/assets/audience-promoteurs.jpg";

const audiences = [
  { label: "Indépendants & Startups", href: "/qui-nous-accompagnons/independants-startups/", image: imgIndependants },
  { label: "Commerce & Horeca", href: "/qui-nous-accompagnons/commerce-horeca/", image: imgHoreca },
  { label: "Professions de santé", href: "/qui-nous-accompagnons/professions-sante/", image: imgSante },
  { label: "Entreprises en croissance", href: "/qui-nous-accompagnons/entreprises-croissance/", image: imgCroissance },
  { label: "Promoteurs immobiliers", href: "/qui-nous-accompagnons/promoteurs-immobiliers/", image: imgPromoteurs },
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

        <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          {audiences.map((a) => (
            <Link
              key={a.label}
              to={a.href}
              className="group relative rounded-2xl overflow-hidden h-[200px] md:h-[260px] border border-border/20"
            >
              <img
                src={a.image}
                alt={a.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col items-start">
                <span className="text-[13px] font-bold text-primary-foreground leading-tight">
                  {a.label}
                </span>
                <span className="text-[11px] text-primary-foreground/60 mt-1 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Découvrir
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
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
