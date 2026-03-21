import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/use-scroll-reveal";
import dashboardImg from "@/assets/dashboard-laptop.jpg";

const badges = [
  { icon: "✓", text: "+{count} clients", count: 200 },
  { icon: "✓", text: "+{count} ans d'expérience", count: 20 },
  { icon: "✓", text: "Membre ITAA" },
];

function AnimatedBadge({ icon, text, count }: { icon: string; text: string; count?: number }) {
  const animatedCount = useCountUp(count || 0, 1500, true);
  const displayText = count ? text.replace("{count}", String(animatedCount)) : text;
  return (
    <span className="inline-flex items-center gap-2 text-[13px] text-foreground/60">
      <span className="text-accent">{icon}</span>
      <span>{displayText}</span>
    </span>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden bg-[#FAF8F6] pt-8 md:pt-20 pb-0">
      {/* Subtle warm gradient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #E8393A 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, #1B2B5E 0%, transparent 70%)" }} />

      <div className="container-mf relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left */}
          <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.08] mb-0">
              Vous travaillez dur.
              <br />
              Mais savez-vous vraiment si votre entreprise{" "}
              <span className="text-accent italic">gagne de l'argent</span> ?
            </h1>

            <p
              className={`text-[15px] md:text-[16px] text-foreground/60 leading-[1.7] mt-6 max-w-[500px] transition-all duration-700 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              La plupart des dirigeants de TPE pilotent à l'aveugle — trésorerie floue,
              résultats découverts trop tard, décisions prises à l'intuition.
              MFinances change ça : un DAF à temps partiel, un vrai pilotage financier,
              à un prix de PME.
            </p>

            {/* Badges */}
            <div
              className={`flex flex-wrap gap-4 mt-6 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "0.5s" }}
            >
              {badges.map((b) => (
                <AnimatedBadge key={b.text} {...b} />
              ))}
            </div>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-col sm:flex-row items-start gap-3 transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.7s" }}
            >
              <Button variant="accent" size="lg" className="rounded-full px-8" asChild>
                <Link to="/diagnostic/">Voir si mon entreprise est en danger →</Link>
              </Button>
              <Link
                to="/services/"
                className="text-[14px] text-foreground/60 font-medium py-3 px-2 hover:text-foreground transition-colors"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>

          {/* Right — Dashboard image */}
          <div
            className={`relative transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(27,43,94,0.15)]">
              <img
                src={dashboardImg}
                alt="Tableau de bord financier MFinances — suivi de trésorerie et KPIs"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
