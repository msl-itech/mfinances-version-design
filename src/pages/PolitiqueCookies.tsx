import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PolitiqueCookies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Politique de cookies — MFinances Bruxelles"
        description="Politique de cookies de MFinances S.R.L. — types de cookies utilisés et gestion de vos préférences."
        canonical="https://mfinances.be/politique-de-cookies/"
      />
      <Header />
      <main>
        <section className="bg-primary py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground text-[13px]">Politique de cookies</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-display text-[32px] md:text-[42px] leading-[1.15] text-primary-foreground mt-6">Politique de cookies</h1>
          </div>
        </section>

        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[700px] px-6 lg:px-12 space-y-10">
            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Types de cookies utilisés</h2>

              <h3 className="text-[16px] font-bold font-body text-foreground mt-4 mb-2">Cookies strictement nécessaires</h3>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Indispensables au fonctionnement du site. Ne peuvent pas être désactivés.
              </p>

              <h3 className="text-[16px] font-bold font-body text-foreground mt-4 mb-2">Cookies analytiques (avec consentement)</h3>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Mesure de l'audience du site. Données anonymisées. Durée : 13 mois maximum.
              </p>

              <h3 className="text-[16px] font-bold font-body text-foreground mt-4 mb-2">Cookies de fonctionnalité (avec consentement)</h3>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Mémorisation des préférences utilisateur. Durée : 12 mois.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Gérer vos préférences</h2>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Un bandeau de consentement s'affiche lors de votre première visite. Vous pouvez modifier vos préférences via « Gérer mes cookies » en bas de chaque page.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Configurer votre navigateur</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2.5 text-[14px] text-foreground/80 font-body leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span><strong>Google Chrome :</strong> <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">support.google.com/chrome/answer/95647</a></span>
                </li>
                <li className="flex items-start gap-2.5 text-[14px] text-foreground/80 font-body leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span><strong>Mozilla Firefox :</strong> <a href="https://support.mozilla.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">support.mozilla.org</a></span>
                </li>
                <li className="flex items-start gap-2.5 text-[14px] text-foreground/80 font-body leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span><strong>Safari :</strong> <a href="https://support.apple.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">support.apple.com</a></span>
                </li>
                <li className="flex items-start gap-2.5 text-[14px] text-foreground/80 font-body leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span><strong>Microsoft Edge :</strong> <a href="https://support.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">support.microsoft.com</a></span>
                </li>
              </ul>
            </div>

            <p className="text-[12px] text-foreground/40 italic font-body">Dernière mise à jour : mars 2026</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
