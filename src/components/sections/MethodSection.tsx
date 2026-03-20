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
    <section className="bg-primary py-20 md:py-[100px]" ref={ref}>
      <div className="container-mf">
        <h2 className={`font-display text-[28px] md:text-[40px] text-center text-white mb-16 reveal ${isVisible ? "visible" : ""}`}>
          Notre méthode de pilotage en 3 étapes
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dotted line connector */}
          <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[1px] border-t-2 border-dashed border-white/30" />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative text-center rounded-[20px] p-10 border border-white/15 bg-white/[0.08] backdrop-blur-sm reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.12}s` }}
            >
              <span className="font-display text-[72px] font-bold text-accent leading-none">
                {step.num}
              </span>
              <h3 className="font-bold text-[20px] text-white mt-2 font-body">{step.title}</h3>
              <p className="text-white/75 text-[15px] leading-relaxed mt-3">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="white" size="lg" asChild>
            <Link to="/diagnostic/">Voir si mon entreprise est en danger →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
