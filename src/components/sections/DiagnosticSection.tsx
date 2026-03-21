import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Activity, Clock, Shield, ArrowRight } from "lucide-react";

const features = [
  { icon: Activity, text: "8 questions ciblées" },
  { icon: Clock, text: "3 minutes max" },
  { icon: Shield, text: "100% confidentiel" },
];

const previewQuestions = [
  "Vos bénéfices et votre trésorerie sont-ils alignés ?",
  "Vos clients paient-ils dans les délais ?",
  "Disposez-vous d'un prévisionnel ?",
];

export default function DiagnosticSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-secondary py-14 md:py-28" ref={ref}>
      <div className="container-mf">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
              DIAGNOSTIC GRATUIT
            </span>
            <h2 className="font-display text-[24px] md:text-[38px] leading-[1.12] mt-3">
              Suis-je en danger
              <br className="hidden md:block" />
              <span className="text-accent">sans le savoir ?</span>
            </h2>

            <p className="text-[15px] text-muted-foreground leading-[1.75] mt-5 max-w-[440px]">
              La plupart des crises de trésorerie ne surviennent pas du jour au lendemain.
              Elles s'accumulent silencieusement. Notre diagnostic identifie vos fragilités.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <span key={f.text} className="inline-flex items-center gap-2 text-[13px] text-foreground/60">
                    <Icon size={15} className="text-accent" strokeWidth={1.5} />
                    {f.text}
                  </span>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <Button variant="accent" size="lg" className="rounded-full group" asChild>
                <Link to="/diagnostic/">
                  Lancer le diagnostic
                  <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link
                to="/checklist-tresorerie/"
                className="text-accent font-medium text-[14px] hover:underline underline-offset-4 sm:mt-3"
              >
                Ou téléchargez la checklist gratuite →
              </Link>
            </div>
          </div>

          {/* Right — Interactive preview card */}
          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <div className="bg-card rounded-3xl p-7 md:p-8 border-2 border-accent/20 shadow-[0_8px_40px_rgba(232,57,58,0.06)]">
              <div className="flex items-center justify-between mb-5">
                <p className="font-bold text-[15px] text-foreground font-body">
                  Diagnostic trésorerie
                </p>
                <span className="text-[11px] bg-accent/10 text-accent font-bold px-3 py-1 rounded-full">
                  Gratuit
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex gap-1.5">
                <div className="h-2 flex-1 rounded-full bg-accent" />
                <div className="h-2 flex-1 rounded-full bg-border" />
                <div className="h-2 flex-1 rounded-full bg-border" />
                <div className="h-2 flex-1 rounded-full bg-border" />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 font-body">Question 1 sur 8</p>

              {/* Preview questions */}
              <div className="mt-6 space-y-2.5">
                {previewQuestions.map((q, i) => (
                  <div
                    key={q}
                    className={`bg-secondary rounded-xl px-5 py-3.5 text-[13px] border transition-all duration-200 ${
                      i === 0
                        ? "border-accent/30 text-foreground font-medium"
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {q}
                  </div>
                ))}
              </div>

              <Button variant="accent" size="lg" className="w-full rounded-full mt-6" asChild>
                <Link to="/diagnostic/">Commencer →</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
