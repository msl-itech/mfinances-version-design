import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function PainSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-28" ref={ref}>
      <div className="container-mf">
        <div className={`bg-white rounded-3xl p-6 md:p-14 shadow-[0_4px_40px_rgba(27,43,94,0.06)] reveal ${isVisible ? "visible" : ""}`}>
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
              <AlertTriangle size={28} className="text-accent" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h2 className="font-display text-[24px] md:text-[34px] text-center leading-[1.2] max-w-[700px] mx-auto">
            Fin de mois tendu. Décisions prises au feeling.
            <br className="hidden md:block" />
            Et la question qui revient toujours :{" "}
            <span className="text-accent italic">où est passé l'argent ?</span>
          </h2>

          {/* 2-column text */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <div className="space-y-4 text-[15px] text-foreground/60 leading-[1.8]">
              <p>
                Vous avez des clients. Vous facturez. Et pourtant, votre compte
                est souvent plus vide que prévu. Vous ne savez pas ce que sera
                votre trésorerie dans 60 jours.
              </p>
              <p>
                Vous découvrez votre charge fiscale en fin d'année — quand
                il est trop tard pour agir.
              </p>
            </div>
            <div className="space-y-4 text-[15px] text-foreground/60 leading-[1.8]">
              <p>
                Ce n'est pas une question de talent. C'est une question d'outils.
                Jusqu'ici, seules les grandes entreprises avaient un DAF — un directeur
                administratif et financier.
              </p>
              <p className="font-semibold text-primary text-[16px]">
                Les grandes entreprises ont un DAF. Pourquoi pas vous ?
              </p>
            </div>
          </div>

          {/* CTA link */}
          <div className={`text-right mt-6 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.25s" }}>
            <Link to="/diagnostic/" className="text-accent text-[14px] font-bold uppercase tracking-wide hover:underline">
              PLUS MAINTENANT →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
