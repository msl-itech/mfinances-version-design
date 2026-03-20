import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import meetingWarm from "@/assets/meeting-warm.jpg";

export default function DiagnosticSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-background py-16 md:py-20" ref={ref}>
      <div className="container-mf">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <h2 className="font-display text-[28px] md:text-[36px]">
              Suis-je en danger sans le savoir ?
            </h2>
            <p className="text-[16px] text-[#555] leading-relaxed mt-4">
              La plupart des dirigeants pensent que tout va bien… jusqu'à ce que le compte soit à sec. Ce diagnostic confidentiel vous révèle votre situation réelle en 3 minutes.
            </p>

            {/* Warm image */}
            <div className="my-6 rounded-2xl overflow-hidden">
              <img
                src={meetingWarm}
                alt="Rencontre professionnelle chaleureuse"
                className="w-full h-[180px] object-cover"
                loading="lazy"
              />
            </div>

            <ul className="mt-4 space-y-3">
              {["8 questions ciblées sur votre trésorerie", "Score instantané avec recommandations", "100% gratuit et confidentiel"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px]">
                  <Check size={16} className="text-[#27AE60] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
              <Button variant="accent" size="lg" asChild>
                <Link to="/diagnostic/">Commencer le diagnostic →</Link>
              </Button>
              <Link to="/checklist-tresorerie/" className="link-underline text-[14px] text-primary font-medium py-3 px-2">
                Ou télécharger le guide gratuit
              </Link>
            </div>
          </div>

          {/* Right — Diagnostic preview */}
          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="bg-white border-2 border-accent rounded-[20px] p-8 shadow-lg">
              <h3 className="font-bold text-[18px] font-body text-foreground">Diagnostic trésorerie</h3>
              <div className="mt-4 h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full w-0 bg-accent rounded-full" />
              </div>
              <p className="text-[12px] text-muted-foreground mt-2">0% complété · 3 minutes</p>

              <div className="mt-6 space-y-3">
                {["Avez-vous une visibilité sur votre trésorerie à 3 mois ?", "Connaissez-vous votre seuil de rentabilité ?", "Votre charge fiscale est-elle anticipée ?"].map((q) => (
                  <div key={q} className="bg-background rounded-lg px-4 py-3 text-[13px] text-muted-foreground">
                    {q}
                  </div>
                ))}
              </div>

              <Button variant="accent" className="w-full mt-6" asChild>
                <Link to="/diagnostic/">Commencer →</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
