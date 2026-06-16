import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GenerateurBail from "@/components/GenerateurBail";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

export default function GenerateurBailPage() {
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
    name: "Générateur de bail professionnel — MFinances",
    url: "https://mfinances.be/ressources/generateur-bail/",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    author: { "@type": "Organization", name: "MFinances", url: "https://mfinances.be" },
  };

  return (
    <div ref={root} className="min-h-screen">
      <SEOHead
        title="Générateur de bail professionnel Belgique | MFinances"
        description="Générez un bail de location pro en 6 étapes : immeuble ou meublé 60/40, clause sous-location, PDF en 13 articles. Outil gratuit MFinances."
        canonical="https://mfinances.be/ressources/generateur-bail/"
        schemaJson={schemaJson}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-14 md:py-10 bg-precision-grid-light">
          <div className="mx-auto max-w-[780px] px-6 lg:px-12">
            <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/70 text-[11px] font-medium px-3 py-1 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Bail immeuble ou meublé · PDF par email · Adapté Belgique
            </span>

            <h1 className="font-display text-[26px] md:text-[34px] leading-[1.25] text-primary-foreground mb-4">
              Générez votre bail de location professionnel en 6 étapes
            </h1>

            <p className="text-primary-foreground/70 text-[16px] leading-relaxed mb-7 max-w-[580px] font-body">
              Bail immeuble ou meublé, répartition 60/40 ajustable, clause de sous-location automatique. PDF complet en 13 articles, adapté au contexte belge : à valider avant signature.
            </p>

            <div className="bg-primary-foreground/[0.08] border border-primary-foreground/15 border-l-[3px] border-l-accent rounded-lg p-3 text-primary-foreground/85 text-[13px] leading-relaxed mb-7 max-w-[600px]">
              💡 Un bail écrit et daté est la pièce maîtresse de votre dossier fiscal. Sans lui, le loyer versé par votre société peut être <strong className="text-primary-foreground">requalifié en rémunération de dirigeant</strong> lors d'un contrôle.
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Button variant="accent" className="rounded-lg" asChild>
                <a href="#generateur">Générer mon bail <ArrowRight size={16} className="ml-1" /></a>
              </Button>
              <Link to="/contact/" className="text-primary-foreground/75 text-[13px] underline underline-offset-2 hover:text-primary-foreground transition-colors font-body">
                Faire le diagnostic de ma situation →
              </Link>
            </div>

            <p className="text-[10px] text-muted-foreground mt-3.5">
              Cabinet MFinances · ITAA n°50.624.805 · Uccle, Bruxelles · À valider avant signature
            </p>
          </div>
        </section>

        {/* ── GÉNÉRATEUR ── */}
        <section id="generateur">
          <GenerateurBail />
        </section>

        {/* ── SEO SECTION ── */}
        <section className="bg-secondary py-6 md:py-8">
          <div className="mx-auto max-w-[760px] px-6 lg:px-12">
            <h2 className="font-display text-[22px] md:text-[26px] text-foreground mb-4">
              Les 6 étapes du bail
            </h2>
            <p className="text-[15px] text-foreground/70 leading-[1.75] font-body mb-5">
              Un bail complet en 13 articles, adapté au contexte belge et basé sur un modèle utilisé en cabinet, personnalisé avec toutes vos données. Si c'est une sous-location, une clause légale spécifique est automatiquement insérée.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { title: "Immeuble seul", desc: "Déduisez la quote-part de loyer via votre société" },
                { title: "Meublé 60/40", desc: "Ajoutez la déduction mobilière taxée à ~7,5 %" },
                { title: "Sous-location", desc: "Clause légale insérée automatiquement si locataire" },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-xl p-4">
                  <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1.5">{item.title}</div>
                  <div className="text-[12px] text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
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
