import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import MobileCarousel from "@/components/MobileCarousel";
import imgIndependants from "@/assets/audience-independants.webp";
import imgHoreca from "@/assets/audience-commerce-horeca.webp";
import imgSante from "@/assets/audience-sante.webp";
import imgCroissance from "@/assets/audience-croissance.webp";
import imgPromoteurs from "@/assets/audience-promoteurs.webp";

const audiences = [
  { label: "Indépendants & Startups", href: "/qui-nous-accompagnons/independants-et-startups/", image: imgIndependants },
  { label: "Commerce & Horeca", href: "/qui-nous-accompagnons/commerce-et-horeca/", image: imgHoreca },
  { label: "Professions de santé", href: "/qui-nous-accompagnons/professions-de-sante/", image: imgSante },
  { label: "Entreprises en croissance", href: "/qui-nous-accompagnons/entreprises-en-croissance/", image: imgCroissance },
  { label: "Promoteurs immobiliers", href: "/qui-nous-accompagnons/promoteurs-immobiliers/", image: imgPromoteurs },
];

function AudienceCard({ a, index }: { a: typeof audiences[0]; index?: number }) {
  return (
    <Link
      to={a.href}
      className="group relative rounded-3xl overflow-hidden h-[220px] md:h-[300px] block transition-transform duration-500 hover:-translate-y-1"
    >
      <img
        src={a.image}
        alt={a.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent transition-opacity duration-500 group-hover:from-primary/95" />

      {/* Index number */}
      {index !== undefined && (
        <span className="absolute top-4 left-4 font-display text-[14px] text-primary-foreground/60 tracking-[0.2em] font-bold">
          0{index + 1}
        </span>
      )}

      {/* Hover arrow */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <ArrowUpRight size={16} strokeWidth={2} />
      </div>

      <div className="absolute bottom-0 inset-x-0 p-5">
        <h3 className="font-display text-[18px] md:text-[20px] text-primary-foreground leading-tight">
          {a.label}
        </h3>
        <span className="inline-block text-[11px] text-accent/90 font-semibold mt-1.5 tracking-wide uppercase">
          Découvrir →
        </span>
      </div>
    </Link>
  );
}

export default function AudienceSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-background py-8 md:py-14 relative overflow-hidden" ref={ref}>
      {/* Editorial backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-8 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
      >
        Pour qui
      </div>

      <div className="container-mf relative">
        <div className={`max-w-[820px] mx-auto text-center mb-12 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-4 mb-5">
            <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 06</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 font-medium">
              Pour qui · Profils accompagnés
            </span>
          </div>
          <h2 className="font-display text-[28px] md:text-[46px] leading-[1.08]">
            Nous accompagnons les dirigeants
            <br className="hidden md:block" />
            qui ont décidé de <span className="text-accent italic">grandir</span>
          </h2>
        </div>

        {/* Desktop */}
        <div className={`hidden md:grid grid-cols-5 gap-5 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          {audiences.map((a, i) => (
            <AudienceCard key={a.label} a={a} index={i} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className={`md:hidden reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          <MobileCarousel itemClassName="w-[55vw] max-w-[220px]">
            {audiences.map((a, i) => (
              <AudienceCard key={a.label} a={a} index={i} />
            ))}
          </MobileCarousel>
        </div>

        <div className={`text-center mt-10 md:mt-12 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <Link
            to="/qui-nous-accompagnons/"
            className="group inline-flex items-center gap-3 text-accent text-[13px] font-bold uppercase tracking-[0.12em] hover:gap-4 transition-all"
          >
            Trouvez votre profil
            <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}
