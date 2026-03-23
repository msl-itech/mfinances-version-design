import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useEffect, useRef } from "react";

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.trustindex.io/loader.js?ece505367a19866f2b46e38c4c6";
    script.defer = true;
    script.async = true;
    widgetRef.current?.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <section className="py-14 md:py-28 bg-card" ref={ref}>
      <div className="container-mf">
        <div className={`text-center mb-10 md:mb-14 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
            TÉMOIGNAGES
          </span>
          <h2 className="font-display text-[24px] md:text-[38px] mt-3 leading-[1.15]">
            Ils nous font <span className="text-accent">confiance</span>
          </h2>
          <a
            href="https://www.google.com/maps/place/MFinances"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>5,0/5 · 16 avis Google</span>
          </a>
        </div>

        <div
          ref={widgetRef}
          className={`reveal ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div data-widget-id="ece505367a19866f2b46e38c4c6" className="trustindex-widget" />
        </div>
      </div>
    </section>
  );
}