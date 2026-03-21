import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import mikaPhoto from "@/assets/mika-musungayi.png";

export default function MikaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-28" ref={ref}>
      <div className="container-mf">
        <div className={`bg-primary rounded-3xl overflow-hidden reveal ${isVisible ? "visible" : ""}`}>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
            {/* Left — Photo */}
            <div className="relative h-[240px] lg:h-auto">
              <img
                src={mikaPhoto}
                alt="Mika Musungayi — Expert-comptable certifié ITAA"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              {/* Name badge */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-accent text-white text-[13px] font-bold px-4 py-2 rounded-lg">
                  Mika MUSUNGAYI
                </div>
                <div className="text-white/70 text-[11px] mt-1 px-1">Expert-comptable certifié ITAA</div>
              </div>
            </div>

            {/* Right — Bio */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-accent/80 text-[11px] font-bold tracking-[0.15em] uppercase">
                VOTRE EXPERT-COMPTABLE À BRUXELLES
              </span>
              <h2 className="font-display text-[24px] md:text-[32px] text-white mt-3 leading-[1.15]">
                L'expérience d'un DAF, la
                <br />
                proximité d'un cabinet.
              </h2>
              <p className="text-white/65 text-[14px] leading-relaxed mt-4 max-w-[440px]">
                "Après 20 ans à accompagner des centaines de dirigeants,
                je sais qu'une bonne comptabilité ne suffit pas.
                Il faut un vrai suivi, une vraie stratégie financière.
                C'est ce que nous faisons au quotidien."
              </p>

              <ul className="mt-6 space-y-2.5">
                {["Spécialiste patrimoine et TPE", "Membre agréé ITAA"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-white/80 text-[14px]">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button variant="accent" className="rounded-full px-8" size="lg" asChild>
                  <Link to="/contact/">Parler avec Mika</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
