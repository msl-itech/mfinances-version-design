import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PolitiqueConfidentialite() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Politique de confidentialité — MFinances Bruxelles";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-primary py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground text-[13px]">Politique de confidentialité</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-display text-[32px] md:text-[42px] leading-[1.15] text-primary-foreground mt-6">Politique de confidentialité</h1>
          </div>
        </section>

        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[700px] px-6 lg:px-12 space-y-10">
            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Responsable du traitement</h2>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                MFinances S.R.L. — 20 Rue de la Magnanerie, 1180 Uccle — <a href="mailto:info@mfinances.be" className="text-accent hover:underline">info@mfinances.be</a> — <a href="tel:+3228860550" className="text-accent hover:underline">+32 2 886 05 50</a>
              </p>
            </div>

            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Données collectées</h2>

              <h3 className="text-[16px] font-bold font-body text-foreground mt-4 mb-2">Via le formulaire de contact</h3>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Nom, prénom, adresse email, numéro de téléphone, situation professionnelle, message libre.
              </p>

              <h3 className="text-[16px] font-bold font-body text-foreground mt-4 mb-2">Via le diagnostic trésorerie</h3>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Réponses aux questions du diagnostic — coordonnées collectées uniquement si vous souhaitez être contacté.
              </p>

              <h3 className="text-[16px] font-bold font-body text-foreground mt-4 mb-2">Via la navigation</h3>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Données de connexion, adresse IP, type de navigateur, pages visitées — collectées via cookies analytiques avec consentement.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Durée de conservation</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2.5 text-[14px] text-foreground/80 font-body leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span><strong>Données de prospects :</strong> 3 ans à compter du dernier contact</span>
                </li>
                <li className="flex items-start gap-2.5 text-[14px] text-foreground/80 font-body leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span><strong>Données clients (dossiers comptables) :</strong> 10 ans — obligations légales belges</span>
                </li>
                <li className="flex items-start gap-2.5 text-[14px] text-foreground/80 font-body leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span><strong>Données de navigation :</strong> 13 mois maximum</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-[22px] text-foreground mb-4">Vos droits</h2>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body">
                Accès, rectification, effacement, limitation, portabilité, opposition, retrait du consentement.
              </p>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body mt-2">
                Contact : <a href="mailto:info@mfinances.be" className="text-accent hover:underline">info@mfinances.be</a>
              </p>
              <p className="text-[14px] text-foreground/80 leading-[1.8] font-body mt-2">
                Réclamation : Autorité de protection des données belge (APD) — <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.autoriteprotectiondonnees.be</a>
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
