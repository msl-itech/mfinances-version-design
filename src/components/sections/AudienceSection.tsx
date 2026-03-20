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
    <section className="bg-background py-16 md:py-20" ref={ref}>
      <div className="container-mf">
        <h2 className={`font-display text-[28px] md:text-[36px] text-center mb-10 reveal ${isVisible ? "visible" : ""}`}>
          Nous accompagnons les dirigeants qui ont décidé de grandir
        </h2>

        <div className={`flex flex-wrap justify-center gap-3 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          {audiences.map((a, i) => (
            <Link
              key={a}
              to="/qui-nous-accompagnons/"
              className={`px-5 py-2.5 rounded-3xl text-[14px] font-medium border transition-all duration-200 ${
                hovered === i
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white text-foreground border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
              }`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {a}
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/qui-nous-accompagnons/" className="link-underline text-accent text-[14px] font-medium">
            Trouvez votre profil →
          </Link>
        </div>
      </div>
    </section>
  );
}
