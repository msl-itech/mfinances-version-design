import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import DafExternalise from "./pages/DafExternalise.tsx";
import ControleDeGestion from "./pages/ControleDeGestion.tsx";
import Tresorerie from "./pages/Tresorerie.tsx";
import Comptabilite from "./pages/Comptabilite.tsx";
import Fiscalite from "./pages/Fiscalite.tsx";
import CreationEntreprise from "./pages/CreationEntreprise.tsx";
import Tarifs from "./pages/Tarifs.tsx";
import IndependantsStartups from "./pages/IndependantsStartups.tsx";
import Contact from "./pages/Contact.tsx";
import APropos from "./pages/APropos.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/daf-externalise/" element={<DafExternalise />} />
          <Route path="/services/controle-de-gestion/" element={<ControleDeGestion />} />
          <Route path="/services/tresorerie/" element={<Tresorerie />} />
          <Route path="/services/comptabilite/" element={<Comptabilite />} />
          <Route path="/services/fiscalite/" element={<Fiscalite />} />
          <Route path="/services/creation-entreprise/" element={<CreationEntreprise />} />
          <Route path="/tarifs/" element={<Tarifs />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/a-propos/" element={<APropos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
