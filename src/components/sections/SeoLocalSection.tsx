import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MapPin } from "lucide-react";

export default function SeoLocalSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-secondary py-10 md:py-14 border-t border-border/40" ref={ref}>
      <div className="container-mf">
        <div className={`max-w-[920px] mx-auto text-center reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <MapPin size={13} className="text-accent" strokeWidth={1.75} />
            <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
              Bruxelles · 19 communes
            </span>
          </div>
          <p className="text-[12px] md:text-[13px] text-muted-foreground/70 italic leading-[1.85] font-display font-light">
            MFinances est un cabinet d'expertise comptable basé à <span className="text-foreground/80 not-italic font-normal">Uccle</span>,
            au service des dirigeants de TPE et PME de toute la Région de Bruxelles-Capitale —
            Anderlecht, Auderghem, Berchem-Sainte-Agathe, Bruxelles-ville, Etterbeek, Evere, Forest,
            Ganshoren, Ixelles, Jette, Koekelberg, Molenbeek-Saint-Jean, Saint-Gilles,
            Saint-Josse-ten-Noode, Schaerbeek, Uccle, Watermael-Boitsfort,
            Woluwe-Saint-Lambert et Woluwe-Saint-Pierre.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-medium">
            <span>Expert-comptable Bruxelles</span>
            <span className="w-1 h-1 rounded-full bg-accent/60" />
            <span>Cabinet comptable Bruxelles</span>
            <span className="w-1 h-1 rounded-full bg-accent/60" />
            <span>Comptable PME Uccle</span>
            <span className="w-1 h-1 rounded-full bg-accent/60" />
            <span>DAF externalisé Belgique</span>
          </div>
        </div>
      </div>
    </section>
  );
}
