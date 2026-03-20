import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function PainSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-white py-20 md:py-[100px]" ref={ref}>
      <div className="container-mf max-w-[800px]">
        <h2
          className={`font-display text-[28px] md:text-[40px] italic text-center leading-[1.15] reveal ${isVisible ? "visible" : ""}`}
        >
          Fin de mois tendu. Décisions au feeling.
          <br className="hidden md:block" />
          Et la question qui revient toujours : <em>où est passé l'argent ?</em>
        </h2>

        <div className="mt-12 space-y-6 text-center">
          <p className={`text-[17px] text-[#555] leading-[1.8] reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            Vous avez des clients. Vous facturez. Et pourtant, votre compte
            est souvent plus vide que prévu. Vous ne savez pas ce que sera
            votre trésorerie dans 60 jours.
          </p>
          <p className={`text-[17px] text-[#555] leading-[1.8] reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            Vous découvrez votre charge fiscale en fin d'année — quand
            il est trop tard pour agir. Ce n'est pas une question de talent.
            C'est une question d'outils.
          </p>
          <p className={`text-[20px] font-bold text-primary leading-[1.5] mt-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
            Les grandes entreprises ont un DAF. Pourquoi pas vous ?
          </p>
        </div>

        <div className={`mt-8 flex flex-col items-center gap-8 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <div className="line-red" />
          <Button variant="accent" size="lg" asChild>
            <Link to="/diagnostic/">Voir si mon entreprise est en danger →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
