import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const questions = [
  "Vos bénéfices et votre trésorerie sont-ils alignés ?",
  "Vos clients paient-ils dans les délais ?",
  "Disposez-vous d'un prévisionnel ?",
];

export default function DiagnosticSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-white py-20 md:py-[80px]" ref={ref}>
      <div className="container-mf">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — Text */}
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <h2 className="font-display text-[28px] md:text-[36px] text-primary leading-tight">
              Suis-je en danger<br className="hidden md:block" /> sans le savoir ?
            </h2>

            <div className="mt-8 space-y-5 text-[15px] md:text-[16px] text-foreground/70 leading-[1.7] font-body">
              <p>
                La plupart des crises de trésorerie ne surviennent pas du jour au lendemain.
                Elles s'accumulent silencieusement — et arrivent souvent au pire moment.
              </p>
              <p>
                Notre diagnostic trésorerie identifie vos points de fragilité en 5 minutes.
                Résultat immédiat, gratuit, sans engagement.
              </p>
              <p>
                Même si vous débutez. Même si vous ne comprenez pas encore tous vos chiffres.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <Button variant="accent" size="lg" className="rounded-full" asChild>
                <Link to="/diagnostic/">Découvrir pourquoi je manque de cash →</Link>
              </Button>
              <Link
                to="/checklist-tresorerie/"
                className="text-accent font-medium text-[15px] hover:underline underline-offset-4 transition-colors sm:mt-3"
              >
                Voir si je commets ces erreurs →
              </Link>
            </div>
          </div>

          {/* Right column — Diagnostic card preview */}
          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <div className="bg-[hsl(var(--muted))] rounded-3xl p-8 border-2 border-accent">
              {/* Card title */}
              <p className="font-bold text-[16px] text-primary font-body">
                Diagnostic trésorerie — 8 questions
              </p>

              {/* Progress bar */}
              <div className="mt-5 flex gap-1.5">
                <div className="h-2 flex-1 rounded-full bg-accent" />
                <div className="h-2 flex-1 rounded-full bg-border" />
                <div className="h-2 flex-1 rounded-full bg-border" />
                <div className="h-2 flex-1 rounded-full bg-border" />
              </div>
              <p className="text-[12px] text-foreground/40 mt-1.5 font-body">12 % complété</p>

              {/* Preview questions */}
              <div className="mt-6 space-y-3">
                {questions.map((q) => (
                  <div
                    key={q}
                    className="bg-white rounded-full px-5 py-3 text-[13px] text-foreground/70 border border-border font-body"
                  >
                    {q}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6">
                <Button variant="accent" size="lg" className="w-full rounded-full" asChild>
                  <Link to="/diagnostic/">Commencer le diagnostic →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
