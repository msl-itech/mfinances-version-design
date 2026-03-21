import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  { num: "01", title: "Comprendre", desc: "Nous analysons votre situation réelle. Vous savez enfin où vous en êtes." },
  { num: "02", title: "Structurer", desc: "Budget, tableaux de bord, prévisionnel. Votre entreprise a un cockpit." },
  { num: "03", title: "Anticiper", desc: "Chaque mois, on challenge vos décisions. Vous pilotez avec un temps d'avance." },
];

export default function MethodSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-primary py-12 md:py-28 relative overflow-hidden" ref={ref}>
      <div className="container-mf relative z-10">
        <h2 className={`font-display text-[22px] md:text-[38px] text-center text-white mb-8 md:mb-14 reveal ${isVisible ? "visible" : ""}`}>
          Notre méthode en <span className="text-accent">3 étapes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative text-center rounded-2xl p-6 md:p-8 border border-white/10 bg-white/[0.06] reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <span className="font-display text-[56px] font-bold text-accent leading-none">
                {step.num}
              </span>
              <h3 className="font-bold text-[18px] text-white mt-2 font-body">{step.title}</h3>
              <p className="text-white/60 text-[14px] leading-relaxed mt-3">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="white" size="lg" className="rounded-full px-8" asChild>
            <Link to="/diagnostic/">Voir si mon entreprise est en danger →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
