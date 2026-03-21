import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export default function Index() {
  useEffect(() => {
    document.title = "Expert-Comptable Bruxelles — Pilotage financier TPE | MFinances";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Cabinet d'expertise comptable à Bruxelles. Contrôle de gestion, DAF externalisé et trésorerie prévisionnelle pour dirigeants de TPE en croissance.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/";
  }, []);
  return (
    <div className="min-h-screen">
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
    </div>
  );
}
