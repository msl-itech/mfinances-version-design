import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { retryPendingLeads } from "@/lib/odoo-submit";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
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
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Retente l'envoi des leads en attente si Odoo était indisponible
    retryPendingLeads().catch(() => {});
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="/blog/:categorySlug/" element={<BlogCategory />} />
          <Route path="/blog/:categorySlug/:articleSlug/" element={<BlogArticle />} />
          <Route path="/mentions-legales/" element={<MentionsLegales />} />
          <Route path="/politique-de-confidentialite/" element={<PolitiqueConfidentialite />} />
          <Route path="/politique-de-cookies/" element={<PolitiqueCookies />} />
          <Route path="/checklist-tresorerie/" element={<ChecklistTresorerie />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
