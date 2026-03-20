import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function FinalCtaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-20 md:py-28" ref={ref}>
      <div className="container-mf text-center">
        <span className={`text-accent text-[11px] font-bold tracking-[0.15em] uppercase reveal ${isVisible ? "visible" : ""}`}>
          PREMIER ÉCHANGE GRATUIT
        </span>
        <h2 className={`font-display text-[28px] md:text-[40px] text-white mt-4 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          Prêt à piloter votre entreprise avec clarté ?
        </h2>
        <p className={`text-white/60 text-[15px] max-w-[520px] mx-auto mt-4 leading-relaxed reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          Un premier échange confidentiel de 30 minutes pour analyser votre situation et voir comment nous pouvons vous aider.
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <Button variant="accent" size="lg" className="rounded-full px-8" asChild>
            <Link to="/diagnostic/">Voir si mon entreprise est en danger →</Link>
          </Button>
          <Button variant="outline-white" size="lg" className="rounded-full px-8" asChild>
            <Link to="/checklist-tresorerie/">Voir si je commets ces erreurs →</Link>
          </Button>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-6 mt-10 text-white/40 text-[12px] reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <span>🔒 Confidentiel</span>
          <span>⏱️ Sous 72h</span>
          <span>✓ Sans engagement</span>
        </div>
      </div>
    </section>
  );
}
