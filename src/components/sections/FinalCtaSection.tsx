import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import brusselsSkyline from "@/assets/brussels-skyline.jpg";

export default function FinalCtaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-20 md:py-[120px] relative overflow-hidden" ref={ref}>
      {/* Background image */}
      <div className="absolute inset-0 opacity-[0.15]">
        <img src={brusselsSkyline} alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/70" />

      <div className="container-mf text-center relative z-10">
        <span className={`text-accent text-[12px] font-bold tracking-[0.15em] uppercase reveal ${isVisible ? "visible" : ""}`}>
          PREMIER ÉCHANGE GRATUIT
        </span>
        <h2 className={`font-display text-[32px] md:text-[44px] text-white mt-4 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          Prêt à piloter votre entreprise avec clarté ?
        </h2>
        <p className={`text-white/85 text-[18px] max-w-[580px] mx-auto mt-4 leading-relaxed reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          Un premier échange confidentiel de 30 minutes pour analyser votre situation et voir comment nous pouvons vous aider.
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <Button variant="white" size="lg" asChild>
            <Link to="/diagnostic/">Voir si mon entreprise est en danger →</Link>
          </Button>
          <Button variant="outline-white" size="lg" asChild>
            <Link to="/checklist-tresorerie/">Voir si je commets ces erreurs →</Link>
          </Button>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-6 mt-10 text-white/60 text-[13px] reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <span>🔒 Confidentiel</span>
          <span>⏱️ Sous 72h</span>
          <span>✓ Sans engagement</span>
        </div>
      </div>
    </section>
  );
}
