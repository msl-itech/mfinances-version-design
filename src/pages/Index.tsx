import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/sections/HeroSection";
import EntryPointsSection from "@/components/sections/EntryPointsSection";
import PainSection from "@/components/sections/PainSection";
import SolutionSection from "@/components/sections/SolutionSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import MethodSection from "@/components/sections/MethodSection";
import AudienceSection from "@/components/sections/AudienceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DiagnosticSection from "@/components/sections/DiagnosticSection";
import LeadMagnetSection from "@/components/sections/LeadMagnetSection";
import MikaSection from "@/components/sections/MikaSection";
import DisqualificationSection from "@/components/sections/DisqualificationSection";
import PricingSection from "@/components/sections/PricingSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import SeoLocalSection from "@/components/sections/SeoLocalSection";
import HomepageEnhancer from "@/components/homepage/HomepageEnhancer";
import { accountingServiceSchema, createFaqSchema } from "@/lib/seo-schemas";

const homepageFaqs = [
  { q: "C'est quoi un DAF externalisé ?", a: "Un DAF externalisé est un Directeur Administratif et Financier mis à disposition à temps partiel. Il assure le pilotage financier de votre entreprise — analyse des performances, aide à la décision, modélisation financière — sans les coûts d'un recrutement en interne. Chez MFinances, 150€ HTVA/heure, réservé aux clients Excellence." },
  { q: "Combien coûte un expert-comptable pour une TPE en Belgique ?", a: "Chez MFinances, les forfaits démarrent à 350€ HTVA/mois (Essentiel), 450€ HTVA/mois (Premium avec contrôle de gestion trimestriel), 650€ HTVA/mois (Excellence avec trésorerie prévisionnelle mensuelle et accès DAF). Engagement annuel avec tacite reconduction." },
  { q: "Quel expert-comptable pour une TPE en croissance à Bruxelles ?", a: "MFinances est un cabinet d'expertise comptable premium à Bruxelles, spécialisé dans le pilotage financier des TPE en croissance. Contrôle de gestion, DAF externalisé et trésorerie prévisionnelle intégrés dans les forfaits." },
  { q: "Comment gérer la trésorerie d'une TPE en croissance ?", a: "Via un prévisionnel mensuel actualisé sur données réelles, une réserve de 3 mois de charges fixes, et un suivi des délais clients. MFinances intègre ce suivi dans le forfait Excellence." },
];

export default function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title="Expert-Comptable Bruxelles — Pilotage TPE"
        description="Cabinet d'expertise comptable à Bruxelles. Contrôle de gestion, DAF externalisé et trésorerie prévisionnelle pour dirigeants de TPE en croissance."
        canonical="https://mfinances.be/"
        schemaJson={[accountingServiceSchema, createFaqSchema(homepageFaqs)]}
      />
      <Header />
      <main>
        <HeroSection />
        <EntryPointsSection />
        <PainSection />
        <SolutionSection />
        <BeforeAfterSection />
        <MethodSection />
        <AudienceSection />
        <TestimonialsSection />
        <DiagnosticSection />
        <LeadMagnetSection />
        <MikaSection />
        <DisqualificationSection />
        <PricingSection />
        <FinalCtaSection />
        <SeoLocalSection />
      </main>
      <Footer />
      <HomepageEnhancer />
    </div>
  );
}

