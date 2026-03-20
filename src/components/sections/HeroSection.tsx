import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import mikaPhoto from "@/assets/mika-musungayi.png";
import { useCountUp } from "@/hooks/use-scroll-reveal";

const badges = [
  { icon: "⭐", text: "5,0/5 · 16 avis Google" },
  { icon: "👥", text: "+{count} clients", count: 200 },
  { icon: "🏆", text: "+{count} ans", count: 20 },
  { icon: "🏛️", text: "ITAA 50.624.805" },
];

function AnimatedBadge({ icon, text, count }: { icon: string; text: string; count?: number }) {
  const animatedCount = useCountUp(count || 0, 1500, true);
  const displayText = count ? text.replace("{count}", String(animatedCount)) : text;

  return (
    <span className="inline-flex items-center gap-2 bg-background border border-border/50 rounded-full px-3.5 py-1.5 text-[13px] text-foreground">
      <span>{icon}</span>
      <span>{displayText}</span>
    </span>
  );
}

function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-fade-up"
          style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="bg-white relative overflow-hidden">
      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <div className="container-mf relative pt-20 md:pt-[120px] pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            {/* Badges */}
            <div
              className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              {badges.map((b) => (
                <AnimatedBadge key={b.text} {...b} />
              ))}
            </div>

            {/* H1 */}
            <h1 className="text-[36px] md:text-[52px] font-bold leading-[1.1] mb-0">
              {mounted && <WordReveal text="Vous travaillez dur." />}
              <br />
              <span className="italic">
                {mounted && (
                  <span>
                    {["Mais", "savez-vous", "vraiment", "si", "votre", "entreprise", "gagne", "de", "l'argent", "?"].map((word, i) => (
                      <span
                        key={i}
                        className="inline-block opacity-0 animate-fade-up"
                        style={{ animationDelay: `${(i + 4) * 0.08}s`, animationFillMode: "forwards" }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </span>
                )}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-[16px] md:text-[18px] text-[#555] leading-[1.7] mt-6 max-w-[540px] transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "1.2s" }}
            >
              La plupart des dirigeants de TPE pilotent à l'aveugle — trésorerie floue,
              résultats découverts trop tard, décisions prises à l'intuition.
              MFinances change ça.
            </p>

            {/* CTAs */}
            <div
              className={`mt-10 flex flex-col sm:flex-row items-start gap-3 transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "1.5s" }}
            >
              <Button variant="accent" size="lg" asChild>
                <Link to="/diagnostic/">Voir si mon entreprise est en danger →</Link>
              </Button>
              <Link
                to="/services/"
                className="link-underline text-[14px] text-primary font-medium py-3 px-2"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>

          {/* Right — Photo */}
          <div
            className={`relative justify-self-center lg:justify-self-end transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            {/* Decorative rect */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-[20px]"
              style={{ backgroundColor: "rgba(27,43,94,0.06)" }}
            />
            <img
              src={mikaPhoto}
              alt="Mika Musungayi — Expert-comptable, fondateur de MFinances"
              className="relative z-10 w-full max-w-[460px] rounded-[20px]"
              style={{ boxShadow: "0 20px 60px rgba(27,43,94,0.15)" }}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
