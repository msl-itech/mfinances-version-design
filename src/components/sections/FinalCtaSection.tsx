import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function FinalCtaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-14 md:py-28 relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }} />

      <div className="container-mf text-center relative z-10">
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent/80 text-[11px] font-bold tracking-[0.15em] uppercase">
            PREMIER ÉCHANGE GRATUIT
          </span>
          <h2 className="font-display text-[26px] md:text-[42px] text-primary-foreground mt-4 leading-[1.1]">
            Prêt à piloter votre entreprise
            <br className="hidden md:block" />
            avec <span className="text-accent">clarté</span> ?
          </h2>
          <p className="text-primary-foreground/55 text-[15px] max-w-[520px] mx-auto mt-5 leading-relaxed">
            Un premier échange confidentiel de 30 minutes pour analyser votre situation et voir comment nous pouvons vous aider.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          <Button variant="accent" size="lg" className="rounded-full px-8 group" asChild>
            <Link to="/diagnostic/">
              Lancer le diagnostic gratuit
              <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline-white" size="lg" className="rounded-full px-8" asChild>
            <Link to="/checklist-tresorerie/">Télécharger la checklist →</Link>
          </Button>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-6 mt-10 text-primary-foreground/35 text-[12px] reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.25s" }}>
          <span>🔒 Confidentiel</span>
          <span>⏱️ Sous 72h</span>
          <span>✓ Sans engagement</span>
        </div>
      </div>
    </section>
  );
}
