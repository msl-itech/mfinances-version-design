import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import mikaPhoto from "@/assets/mika-musungayi.png";

export default function MikaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-14 md:py-28" ref={ref}>
      <div className="container-mf">
        <div className={`bg-primary rounded-3xl overflow-hidden shadow-[0_8px_48px_rgba(27,43,94,0.15)] reveal ${isVisible ? "visible" : ""}`}>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
            {/* Left — Photo */}
            <div className="relative h-[280px] lg:h-auto">
              <img
                src={mikaPhoto}
                alt="Mika Musungayi — Expert-comptable certifié ITAA"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary/20" />
              {/* Name badge */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-accent text-accent-foreground text-[13px] font-bold px-4 py-2 rounded-lg shadow-md">
                  Mika MUSUNGAYI
                </div>
                <div className="text-primary-foreground/80 text-[11px] mt-1 px-1 font-medium">Expert-comptable certifié ITAA</div>
              </div>
            </div>

            {/* Right — Bio */}
            <div className="p-7 md:p-12 flex flex-col justify-center">
              <span className="text-accent/70 text-[11px] font-bold tracking-[0.15em] uppercase">
                VOTRE EXPERT-COMPTABLE À BRUXELLES
              </span>
              <h2 className="font-display text-[24px] md:text-[34px] text-primary-foreground mt-3 leading-[1.12]">
                L'expérience d'un DAF, la
                <br className="hidden md:block" />
                proximité d'un cabinet.
              </h2>
              <p className="text-primary-foreground/55 text-[14px] leading-[1.75] mt-4 max-w-[440px]">
                "Après 20 ans à accompagner des centaines de dirigeants,
                je sais qu'une bonne comptabilité ne suffit pas.
                Il faut un vrai suivi, une vraie stratégie financière."
              </p>

              <ul className="mt-6 space-y-3">
                {["Spécialiste patrimoine et TPE", "Membre agréé ITAA"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary-foreground/75 text-[14px]">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-accent" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button variant="accent" className="rounded-full px-8 group" size="lg" asChild>
                  <Link to="/contact/">
                    Parler avec Mika
                    <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
