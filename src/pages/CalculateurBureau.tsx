import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalculateurQuotite from "@/components/CalculateurQuotite";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

export default function CalculateurBureau() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculateur de quotiété professionnelle — MFinances",
    url: "https://mfinances.be/ressources/calculateur-bureau/",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    author: { "@type": "Organization", name: "MFinances", url: "https://mfinances.be" },
  };

  return (
    <div ref={root} className="min-h-screen">
      <SEOHead
        title="Calculateur quotiété bureau à domicile Belgique | MFinances"
        description="Calculez la partie professionnelle de votre habitation en 2 minutes. Méthode des surfaces pondérées, rapport PDF par email. Outil gratuit — Cabinet MFinances Uccle."
        canonical="https://mfinances.be/ressources/calculateur-bureau/"
        schemaJson={schemaJson}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-10 md:py-10 bg-precision-grid-light">
          <div className="mx-auto max-w-[760px] px-4 sm:px-6 lg:px-12 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/70 text-[11px] font-medium px-3 py-1 rounded-full mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Outil gratuit · Rapport PDF par email
            </span>

            <h1 className="font-display text-[22px] sm:text-[26px] md:text-[34px] leading-[1.25] text-primary-foreground mb-3 sm:mb-4">
              Calculez votre quotiété professionnelle en ligne en 2 minutes
            </h1>

            <p className="text-primary-foreground/70 text-[15px] sm:text-[16px] leading-relaxed mb-5 sm:mb-7 max-w-[560px] font-body sm:mx-0 mx-auto">
              Méthode des surfaces pondérées, utilisée en cabinet. Rapport PDF personnalisé envoyé par email. 100 % confidentiel : aucune revente de données.
            </p>

            <div className="bg-primary-foreground/[0.08] border border-primary-foreground/15 border-l-[3px] border-l-accent rounded-lg p-3 text-primary-foreground/85 text-[13px] leading-relaxed mb-5 sm:mb-7 max-w-[580px] text-left sm:mx-0 mx-auto">
              💡 Une quotiété de 20 % sur 20 000 € de charges annuelles = <strong className="text-primary-foreground">4 000 € de déductions</strong>. Soit ~1 600 € d'économie fiscale nette à l'ISOC.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:flex-wrap">
              <Button variant="accent" className="rounded-lg w-full sm:w-auto" asChild>
                <a href="#calculateur">Lancer le calculateur <ArrowRight size={16} className="ml-1" /></a>
              </Button>
              <Link to="/contact/" className="text-primary-foreground/75 text-[13px] underline underline-offset-2 hover:text-primary-foreground transition-colors font-body">
                Parler directement à Mika →
              </Link>
            </div>

            <p className="text-[10px] text-muted-foreground mt-3.5">
              Cabinet MFinances · ITAA n°50.624.805 · Uccle, Bruxelles
            </p>
          </div>
        </section>

        {/* ── CALCULATEUR ── */}
        <section id="calculateur">
          <CalculateurQuotite />
        </section>

        {/* ── SEO SECTION ── */}
        <section className="bg-secondary py-10 md:py-8">
          <div className="mx-auto max-w-[720px] px-4 sm:px-6 lg:px-12">
            <h2 className="font-display text-[20px] sm:text-[22px] md:text-[26px] text-foreground mb-3 sm:mb-4">
              Pourquoi calculer correctement votre quotiété ?
            </h2>
            <p className="text-[14px] sm:text-[15px] text-foreground/70 leading-[1.75] font-body mb-3.5">
              La quotiété professionnelle détermine quelle fraction de vos charges : loyer, énergie, internet, assurance : vous pouvez déduire fiscalement. Une erreur de calcul, même involontaire, peut représenter plus de 1 000 € de déduction manquée par an.
            </p>
            <p className="text-[14px] sm:text-[15px] text-foreground/70 leading-[1.75] font-body mb-5 hidden sm:block">
              Ce calculateur applique la méthode des surfaces pondérées utilisée en cabinet : pièces de vie 100 %, pièces mansardées 80 %, caves et greniers 20 %. Il prend en compte l'usage professionnel de chaque pièce : y compris les pièces à usage mixte.
            </p>
            <Link to="/blog/fiscalite-belgique/bureau-a-domicile/" className="inline-flex items-center gap-1.5 text-primary font-semibold text-[14px] hover:underline">
              Guide complet : bureau à domicile en Belgique 2026 <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
