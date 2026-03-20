import { Link } from "react-router-dom";
import { TrendingDown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const situations = [
  {
    icon: TrendingDown,
    title: "Trésorerie tendue",
    desc: "Vous ne savez pas ce que sera votre trésorerie dans 60 jours.",
  },
  {
    icon: Rocket,
    title: "Croissance rapide",
    desc: "Vous grandissez vite mais sans visibilité financière claire.",
  },
];

export default function DiagnosticSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-[#FAF8F6] py-20 md:py-28" ref={ref}>
      <div className="container-mf max-w-[700px] text-center">
        <h2 className={`font-display text-[26px] md:text-[36px] reveal ${isVisible ? "visible" : ""}`}>
          Prêt à reprendre le contrôle ?
        </h2>
        <p className={`text-foreground/55 text-[15px] mt-3 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          Commencez par identifier votre situation actuelle.
        </p>

        <div className={`mt-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <p className="text-[13px] text-foreground/50 font-medium mb-4">Votre situation actuelle :</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {situations.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="bg-white rounded-2xl p-6 text-center border border-border/50 hover:border-accent/30 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <Icon size={28} className="mx-auto text-foreground/40 mb-3" strokeWidth={1.5} />
                  <h3 className="text-[15px] font-bold font-body">{s.title}</h3>
                  <p className="text-[12px] text-foreground/50 mt-1">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className={`text-[13px] text-foreground/40 mt-6 italic reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
          Ma situation ne se trouve pas ici ? Dites-le nous.
        </p>

        <div className={`mt-6 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.35s" }}>
          <Button variant="accent" size="lg" className="rounded-full px-10" asChild>
            <Link to="/contact/">Prendre rendez-vous</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
