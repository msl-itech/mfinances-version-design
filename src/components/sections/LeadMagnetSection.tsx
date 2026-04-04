import { Link } from "react-router-dom";
import { Check, ArrowRight, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function LeadMagnetSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-10 md:py-28" ref={ref}>
      <div className="container-mf">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-center">
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <span className="text-accent/80 text-[11px] font-bold tracking-[0.15em] uppercase">
              CHECKLIST GRATUITE
            </span>
            <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground mt-3 leading-[1.12]">
              Les 5 erreurs qui vident le compte des dirigeants de TPE
            </h2>
            <p className="text-primary-foreground/55 text-[15px] leading-relaxed mt-4 max-w-[440px]">
              Un guide concret pour identifier les fuites financières les plus courantes — et les stopper avant qu'il ne soit trop tard.
            </p>
            <ul className="mt-5 md:mt-6 space-y-3">
              {["Erreurs identifiées chez +200 dirigeants", "Solutions applicables immédiatement", "PDF gratuit, sans engagement"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-primary-foreground/70 text-[14px]">
                  <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-accent" strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="bg-card rounded-3xl p-6 md:p-8 shadow-[0_12px_48px_rgba(0,0,0,0.15)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileDown size={20} className="text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] font-body text-foreground">Téléchargez la checklist</h3>
                  <p className="text-[12px] text-muted-foreground">PDF · Lecture 5 min</p>
                </div>
              </div>

              <Button variant="accent" className="w-full rounded-full group" size="lg" asChild>
                <Link to="/checklist-tresorerie/">
                  Accéder à la checklist
                  <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <p className="text-[11px] text-muted-foreground/60 italic mt-4 text-center">
                Gratuit · Sans spam · Téléchargement immédiat
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
