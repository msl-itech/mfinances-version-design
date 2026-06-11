import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { createBreadcrumbSchema } from "@/lib/seo-schemas";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

export default function MentionsLegales() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={root} className="min-h-screen">
      <SEOHead
        title="Mentions légales — MFinances Bruxelles"
        description="Mentions légales du site MFinances S.R.L., cabinet d'expertise comptable à Uccle, Bruxelles."
        canonical="https://mfinances.be/mentions-legales/"
        schemaJson={createBreadcrumbSchema([
          { name: "Accueil", url: "https://mfinances.be/" },
          { name: "Mentions légales", url: "https://mfinances.be/mentions-legales/" },
        ])}
      />
      <Header />
      <main>
        <section className="bg-primary py-12 md:py-16 bg-precision-grid-light">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground text-[13px]">Mentions légales</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-display text-[32px] md:text-[42px] leading-[1.15] text-primary-foreground mt-6">Mentions légales</h1>
          </div>
        </section>

        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[700px] px-6 lg:px-12 space-y-10">
            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Éditeur du site</h2>
              <div className="text-[14px] text-foreground/80 leading-[1.8] font-body space-y-1">
                <p><strong>Dénomination sociale :</strong> MFinances S.R.L.</p>
                <p><strong>Forme juridique :</strong> Société à Responsabilité Limitée de droit belge</p>
                <p><strong>Siège social :</strong> 20 Rue de la Magnanerie, 1180 Uccle, Bruxelles, Belgique</p>
                <p><strong>Numéro d'entreprise BCE :</strong> 0827.635.870</p>
                <p><strong>Numéro de TVA :</strong> BE 0827.635.870</p>
                <p><strong>Téléphone :</strong> <a href="tel:+3228860550" className="text-accent hover:underline">+32 2 886 05 50</a></p>
                <p><strong>Email :</strong> <a href="mailto:info@mfinances.be" className="text-accent hover:underline">info@mfinances.be</a></p>
                <p><strong>Représentant légal :</strong> Mika Musungayi, Gérant</p>
                <p><strong>Membre de :</strong> ITAA — Institut des Conseillers fiscaux et des Experts-comptables</p>
                <p><strong>Numéro d'agrément ITAA :</strong> 50.624.805</p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Hébergement du site</h2>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                <strong>Hébergeur :</strong> Lovable Technologies, Inc.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Propriété intellectuelle</h2>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                L'ensemble du contenu de ce site est la propriété exclusive de MFinances S.R.L. ou de ses partenaires, et est protégé par les lois belges et internationales relatives à la propriété intellectuelle.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Responsabilité</h2>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Les informations publiées sur ce site ont un caractère général et informatif. Elles ne constituent pas des conseils juridiques, fiscaux ou financiers et ne sauraient se substituer à une consultation personnalisée.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Droit applicable</h2>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Le présent site est soumis au droit belge. Tout litige relève de la compétence exclusive des tribunaux de l'arrondissement judiciaire de Bruxelles.
              </p>
            </div>

            <p className="text-[12px] text-foreground/40 italic font-body">Dernière mise à jour : mars 2026</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
