import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { retryPendingLeads } from "@/lib/odoo-submit";
import { initTracker, trackPageVisit } from "@/lib/visitor-tracker";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import AccueilV2 from "./pages/AccueilV2.tsx";
import AccueilV3 from "./pages/AccueilV3.tsx";
import Services from "./pages/Services.tsx";
import Diagnostic from "./pages/Diagnostic.tsx";
import DafExternalise from "./pages/DafExternalise.tsx";
import ControleDeGestion from "./pages/ControleDeGestion.tsx";
import Tresorerie from "./pages/Tresorerie.tsx";
import Comptabilite from "./pages/Comptabilite.tsx";
import Fiscalite from "./pages/Fiscalite.tsx";
import CreationEntreprise from "./pages/CreationEntreprise.tsx";
import Tarifs from "./pages/Tarifs.tsx";
import QuiNousAccompagnons from "./pages/QuiNousAccompagnons.tsx";
import IndependantsStartups from "./pages/IndependantsStartups.tsx";
import CommerceHoreca from "./pages/CommerceHoreca.tsx";
import ProfessionsSante from "./pages/ProfessionsSante.tsx";
import EntreprisesCroissance from "./pages/EntreprisesCroissance.tsx";
import PromoteursImmobiliers from "./pages/PromoteursImmobiliers.tsx";
import Asbl from "./pages/Asbl.tsx";
import SocieteExploitation from "./pages/SocieteExploitation.tsx";
import SocieteDeMoyens from "./pages/SocieteDeMoyens.tsx";
import SocieteDeManagement from "./pages/SocieteDeManagement.tsx";
import Contact from "./pages/Contact.tsx";
import Support from "./pages/Support.tsx";
import APropos from "./pages/APropos.tsx";
import Blog from "./pages/Blog.tsx";
import BlogCategory from "./pages/BlogCategory.tsx";
import BlogArticle from "./pages/BlogArticle.tsx";
import MentionsLegales from "./pages/MentionsLegales.tsx";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite.tsx";
import PolitiqueCookies from "./pages/PolitiqueCookies.tsx";
import ChecklistTresorerie from "./pages/ChecklistTresorerie.tsx";
import FraisDefendables from "./pages/FraisDefendables.tsx";
import BureauADomicileHub from "./pages/BureauADomicileHub.tsx";
import CalculateurBureau from "./pages/CalculateurBureau.tsx";
import GenerateurBailPage from "./pages/GenerateurBailPage.tsx";
import ChecklistControleBureau from "./pages/ChecklistControleBureau.tsx";
import ChecklistControleBureauConfirmation from "./pages/ChecklistControleBureauConfirmation.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import AdminAnalytics from "./pages/AdminAnalytics.tsx";
import NotFound from "./pages/NotFound.tsx";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

// Track route changes
function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageVisit(location.pathname);
  }, [location.pathname]);
  return null;
}

const App = () => {
  useEffect(() => {
    initTracker();
    retryPendingLeads().catch(() => {});
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteTracker />
        <Routes>
          <Route path="/" element={<AccueilV2 />} />
          {/* <Route path="/accueil-v1/" element={<Index />} /> */}
          {/* <Route path="/accueilv2/" element={<AccueilV2 />} /> */}
          {/* <Route path="/accueilv2" element={<AccueilV2 />} /> */}
          {/* <Route path="/accueilv3/" element={<AccueilV3 />} /> */}
          {/* <Route path="/accueilv3" element={<AccueilV3 />} /> */}
          <Route path="/services/" element={<Services />} />
          <Route path="/services/daf-externalise/" element={<DafExternalise />} />
          <Route path="/services/controle-de-gestion/" element={<ControleDeGestion />} />
          <Route path="/services/tresorerie/" element={<Tresorerie />} />
          <Route path="/services/comptabilite/" element={<Comptabilite />} />
          <Route path="/services/fiscalite/" element={<Fiscalite />} />
          <Route path="/services/creation-entreprise/" element={<CreationEntreprise />} />
          <Route path="/tarifs/" element={<Tarifs />} />
          <Route path="/diagnostic/" element={<Diagnostic />} />
          <Route path="/qui-nous-accompagnons/" element={<QuiNousAccompagnons />} />
          <Route path="/qui-nous-accompagnons/independants-et-startups/" element={<IndependantsStartups />} />
          <Route path="/qui-nous-accompagnons/commerce-et-horeca/" element={<CommerceHoreca />} />
          <Route path="/qui-nous-accompagnons/professions-de-sante/" element={<ProfessionsSante />} />
          <Route path="/qui-nous-accompagnons/entreprises-en-croissance/" element={<EntreprisesCroissance />} />
          <Route path="/qui-nous-accompagnons/promoteurs-immobiliers/" element={<PromoteursImmobiliers />} />
          <Route path="/qui-nous-accompagnons/asbl/" element={<Asbl />} />
          <Route path="/qui-nous-accompagnons/societe-exploitation/" element={<SocieteExploitation />} />
          <Route path="/qui-nous-accompagnons/societe-de-moyens/" element={<SocieteDeMoyens />} />
          <Route path="/qui-nous-accompagnons/societe-de-management/" element={<SocieteDeManagement />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/a-propos/" element={<APropos />} />
          <Route path="/support/" element={<Support />} />
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/fiscalite-belgique/bureau-a-domicile/" element={<BureauADomicileHub />} />
          <Route path="/blog/:categorySlug/" element={<BlogCategory />} />
          <Route path="/blog/:categorySlug/:articleSlug/" element={<BlogArticle />} />
          <Route path="/mentions-legales/" element={<MentionsLegales />} />
          <Route path="/politique-de-confidentialite/" element={<PolitiqueConfidentialite />} />
          <Route path="/politique-de-cookies/" element={<PolitiqueCookies />} />
          <Route path="/checklist-tresorerie/" element={<ChecklistTresorerie />} />
          <Route path="/frais-defendables/" element={<FraisDefendables />} />
          <Route path="/ressources/calculateur-bureau/" element={<CalculateurBureau />} />
          <Route path="/ressources/generateur-bail/" element={<GenerateurBailPage />} />
          <Route path="/ressources/checklist-controle-bureau/" element={<ChecklistControleBureau />} />
          <Route path="/ressources/checklist-controle-bureau/confirmation/" element={<ChecklistControleBureauConfirmation />} />
          <Route path="/unsubscribe/" element={<Unsubscribe />} />
          <Route path="/admin/analytics/" element={<AdminAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
