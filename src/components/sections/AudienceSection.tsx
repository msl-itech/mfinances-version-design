import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState } from "react";

const audiences = [
  "Indépendants & Startups",
  "Commerce & Horeca",
  "Professions de santé",
  "Entreprises en croissance",
  "Promoteurs immobiliers",
];

export default function AudienceSection() {
  const { ref, isVisible } = useScrollReveal();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[#FAF8F6] py-16 md:py-20" ref={ref}>
      <div className="container-mf">
        <h2 className={`font-display text-[24px] md:text-[34px] text-center mb-10 reveal ${isVisible ? "visible" : ""}`}>
          Nous accompagnons les dirigeants qui ont décidé de <span className="text-accent">grandir</span>
        </h2>

        <div className={`flex flex-wrap justify-center gap-3 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          {audiences.map((a, i) => (
            <Link
              key={a}
              to="/qui-nous-accompagnons/"
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium border transition-all duration-200 ${
                hovered === i
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-foreground/70 border-border/40 hover:bg-primary hover:text-white hover:border-primary"
              }`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {a}
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/qui-nous-accompagnons/" className="text-accent text-[13px] font-semibold hover:underline">
            Trouvez votre profil →
          </Link>
        </div>
      </div>
    </section>
  );
}
