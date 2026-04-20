import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function SeoLocalSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-secondary py-6 border-t border-border/30" ref={ref}>
      <div className="container-mf text-center">
        <p className={`text-[12px] text-muted-foreground/40 italic reveal ${isVisible ? "visible" : ""}`}>
          MFinances est un cabinet d'expertise comptable basé à Uccle,
          au service des dirigeants de TPE et PME de toute la Région de Bruxelles-Capitale :
          Anderlecht, Auderghem, Berchem-Sainte-Agathe, Bruxelles-ville, Etterbeek, Evere, Forest,
          Ganshoren, Ixelles, Jette, Koekelberg, Molenbeek-Saint-Jean, Saint-Gilles,
          Saint-Josse-ten-Noode, Schaerbeek, Uccle, Watermael-Boitsfort,
          Woluwe-Saint-Lambert et Woluwe-Saint-Pierre.
          Expert-comptable Bruxelles · Cabinet comptable Bruxelles · Comptable PME Uccle · DAF externalisé Belgique.
        </p>
      </div>
    </section>
  );
}
