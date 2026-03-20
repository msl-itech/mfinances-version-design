import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function LeadMagnetSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-16 md:py-20" ref={ref}>
      <div className="container-mf">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Left */}
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <span className="text-accent text-[12px] font-bold tracking-[0.1em] uppercase">
              GUIDE GRATUIT
            </span>
            <h2 className="font-display text-[28px] md:text-[36px] text-white mt-3">
              Les 5 erreurs qui vident le compte des dirigeants de TPE
            </h2>
            <p className="text-white/75 text-[16px] leading-relaxed mt-4">
              Un guide concret pour identifier les fuites financières les plus courantes — et les stopper avant qu'il ne soit trop tard.
            </p>
            <ul className="mt-6 space-y-3">
              {["Erreurs identifiées chez +200 dirigeants", "Solutions applicables immédiatement", "PDF gratuit, sans engagement"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80 text-[15px]">
                  <Check size={16} className="text-accent flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Form */}
          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="bg-white rounded-[20px] p-9">
              <h3 className="font-bold text-[18px] font-body text-foreground mb-6">
                Recevez le guide par email
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  className="w-full px-4 py-3 border border-border rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Votre email professionnel"
                  className="w-full px-4 py-3 border border-border rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
                <Button variant="accent" className="w-full" size="lg">
                  Oui, je veux savoir →
                </Button>
              </form>
              <p className="text-[11px] text-muted-foreground italic mt-4">
                Vos données restent confidentielles. Pas de spam. Désinscription en 1 clic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
