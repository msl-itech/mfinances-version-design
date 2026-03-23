import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();

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

        <div className={`w-full flex justify-center reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.5!2d4.3517!3d50.7942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4e2b4e5b8a7%3A0x1234567890abcdef!2sMFinances!5e0!3m2!1sfr!2sbe!4v1700000000000!5m2!1sfr!2sbe"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "1rem", maxWidth: "900px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Avis Google MFinances"
          />
        </div>
      </div>
    </section>
  );
}