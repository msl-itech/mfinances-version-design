import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import mikaPhoto from "@/assets/mika-musungayi.png";

const badges = [
  { icon: "🏛️", text: "ITAA 50.624.805" },
  { icon: "📋", text: "BCE 0827.635.870" },
  { icon: "⏱️", text: "+20 ans d'expérience" },
  { icon: "👥", text: "+200 clients" },
];

export default function MikaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-white py-20 md:py-[100px]" ref={ref}>
      <div className="container-mf">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
          {/* Left — Photo */}
          <div className={`reveal ${isVisible ? "visible" : ""}`}>
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[20px] bg-primary/[0.08]" />
              <img
                src={mikaPhoto}
                alt="Mika Musungayi — Expert-comptable certifié ITAA"
                className="relative z-10 w-full max-w-[360px] rounded-[20px]"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8 max-w-[360px]">
              {badges.map((b) => (
                <div key={b.text} className="bg-background border border-border rounded-[10px] px-4 py-3 text-[13px] flex items-center gap-2">
                  <span>{b.icon}</span>
                  <span className="text-foreground">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bio */}
          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <span className="text-accent text-[12px] font-bold tracking-[0.1em] uppercase">
              FONDATEUR
            </span>
            <h2 className="font-display text-[32px] md:text-[40px] mt-2">Mika Musungayi</h2>
            <p className="font-display italic text-[20px] text-accent mt-1">
              Expert-comptable certifié ITAA · MFinances S.R.L.
            </p>

            <div className="mt-6 space-y-4 text-[16px] text-[#555] leading-relaxed">
              <p>
                Avec plus de 20 ans d'expérience en comptabilité et en finance d'entreprise, Mika a fondé MFinances avec une conviction : les dirigeants de TPE méritent les mêmes outils de pilotage que les grandes entreprises.
              </p>
              <p>
                Ancien auditeur et DAF dans le secteur privé, il comprend les enjeux des entrepreneurs parce qu'il les a vécus de l'intérieur. Son approche combine rigueur technique et communication claire — pas de jargon, que des réponses.
              </p>
              <p>
                Aujourd'hui, il accompagne plus de 200 dirigeants à Bruxelles et en Belgique. Son objectif : que chaque client sache exactement où il en est, à tout moment.
              </p>
            </div>

            <Button variant="outline" className="mt-8" asChild>
              <Link to="/contact/">Parler à un expert — c'est gratuit →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
