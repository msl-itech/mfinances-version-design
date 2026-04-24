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
    <section className="bg-secondary py-14 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Editorial backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-8 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
      >
        Diagnostic
      </div>

      <div className="container-mf relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <div className="inline-flex items-center gap-4 mb-5">
              <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 08</span>
              <span className="text-accent/80 text-[11px] font-bold tracking-[0.18em] uppercase">
                Diagnostic gratuit · 3 min
              </span>
            </div>
            <h2 className="font-display text-[28px] md:text-[42px] leading-[1.08]">
              Suis-je en danger
              <br className="hidden md:block" />
              <span className="text-accent italic">sans le savoir</span> ?
            </h2>
            <div className="h-px w-12 bg-accent mt-6 mb-5" />

            <p className="text-[15px] text-muted-foreground leading-[1.75] mt-4 md:mt-5 max-w-[460px]">
              La plupart des crises de trésorerie ne surviennent pas du jour au lendemain.
              Elles s'accumulent silencieusement. Notre diagnostic identifie vos fragilités.
            </p>

            <div className="mt-5 bg-card border border-border/50 rounded-2xl p-4 max-w-[460px]">
              <p className="text-[12px] font-bold tracking-[0.1em] text-accent uppercase mb-2">
                Ce que vous recevez immédiatement
              </p>
              <ul className="space-y-1.5 text-[13.5px] text-foreground/80">
                <li className="flex gap-2"><span className="text-accent font-bold">→</span> Votre <strong>score de risque trésorerie</strong> sur 20</li>
                <li className="flex gap-2"><span className="text-accent font-bold">→</span> 3 <strong>priorités d'action</strong> adaptées à votre profil</li>
                <li className="flex gap-2"><span className="text-accent font-bold">→</span> Une <strong>grille de lecture</strong> financière personnalisée</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 mt-5 md:mt-6">
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

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start gap-4">
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

          {/* Right — Interactive preview card (hidden on mobile) */}
          <div className={`hidden md:block reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <div className="bg-card rounded-3xl p-7 md:p-8 border-2 border-accent/20 shadow-[0_8px_40px_rgba(232,57,58,0.06)]">
              <div className="flex items-center justify-between mb-5">
                <p className="font-bold text-[15px] text-foreground font-body">
                  Diagnostic trésorerie
                </p>
                <span className="text-[11px] bg-accent/10 text-accent font-bold px-3 py-1 rounded-full">
                  Gratuit
                </span>
              </div>

              <div className="flex gap-1.5">
                <div className="h-2 flex-1 rounded-full bg-accent" />
                <div className="h-2 flex-1 rounded-full bg-border" />
                <div className="h-2 flex-1 rounded-full bg-border" />
                <div className="h-2 flex-1 rounded-full bg-border" />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 font-body">Question 1 sur 8</p>

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
