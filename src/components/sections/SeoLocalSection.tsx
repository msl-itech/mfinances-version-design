import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function SeoLocalSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-secondary py-6 border-t border-border/30" ref={ref}>
      <div className="container-mf text-center">
        <p className={`text-[12px] text-muted-foreground/40 italic reveal ${isVisible ? "visible" : ""}`}>
          MFinances est un cabinet d'expertise comptable basé à Uccle, Bruxelles,
          spécialisé dans l'accompagnement des TPE et PME en croissance.
          Expert-comptable Bruxelles · Comptable PME Uccle · DAF externalisé Belgique.
        </p>
      </div>
    </section>
  );
}
