import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function LeadMagnetSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-12 md:py-24" ref={ref}>
      <div className="container-mf">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
              GUIDE GRATUIT
            </span>
            <h2 className="font-display text-[24px] md:text-[34px] text-white mt-3 leading-[1.15]">
              Les 5 erreurs qui vident le compte des dirigeants de TPE
            </h2>
            <p className="text-white/60 text-[14px] leading-relaxed mt-4">
              Un guide concret pour identifier les fuites financières les plus courantes — et les stopper avant qu'il ne soit trop tard.
            </p>
            <ul className="mt-5 space-y-2">
              {["Erreurs identifiées chez +200 dirigeants", "Solutions applicables immédiatement", "PDF gratuit, sans engagement"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-white/70 text-[13px]">
                  <Check size={14} className="text-accent flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="font-bold text-[16px] font-body mb-5">Recevez le guide par email</h3>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  className="w-full px-4 py-3 border border-border/60 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Votre email professionnel"
                  className="w-full px-4 py-3 border border-border/60 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
                <Button variant="accent" className="w-full rounded-full" size="lg">
                  Oui, je veux savoir →
                </Button>
              </form>
              <p className="text-[11px] text-foreground/40 italic mt-3">
                Vos données restent confidentielles. Pas de spam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
