import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { retryPendingLeads } from "@/lib/odoo-submit";
import { initTracker, trackPageVisit } from "@/lib/visitor-tracker";
import { installClickTracking, tagSession } from "@/lib/clarity-events";
import { recordLandingPage } from "@/lib/utm-enrich";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { lazyPage, type LazyPage } from "@/lib/lazy-page";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  matchPath,
  useLocation,
} from "react-router-dom";
import AccueilV2 from "./pages/AccueilV2.tsx";
import NotFound from "./pages/NotFound.tsx";

// Chargement à la demande : chaque page n'est téléchargée que lorsqu'elle est visitée.
// L'accueil reste chargé immédiatement pour ne pas retarder son affichage.
const AdminAnalytics = lazyPage(() => import("./pages/AdminAnalytics.tsx"));
const APropos = lazyPage(() => import("./pages/APropos.tsx"));
const Asbl = lazyPage(() => import("./pages/Asbl.tsx"));
const Blog = lazyPage(() => import("./pages/Blog.tsx"));
const BlogArticle = lazyPage(() => import("./pages/BlogArticle.tsx"));
const BlogCategory = lazyPage(() => import("./pages/BlogCategory.tsx"));
const BureauADomicileHub = lazyPage(() => import("./pages/BureauADomicileHub.tsx"));
const CalculateurBureau = lazyPage(() => import("./pages/CalculateurBureau.tsx"));
const ChecklistControleBureau = lazyPage(() => import("./pages/ChecklistControleBureau.tsx"));
const ChecklistControleBureauConfirmation = lazyPage(() => import("./pages/ChecklistControleBureauConfirmation.tsx"));
const ChecklistTresorerie = lazyPage(() => import("./pages/ChecklistTresorerie.tsx"));
const CommerceHoreca = lazyPage(() => import("./pages/CommerceHoreca.tsx"));
const Comptabilite = lazyPage(() => import("./pages/Comptabilite.tsx"));
const Contact = lazyPage(() => import("./pages/Contact.tsx"));
const ControleDeGestion = lazyPage(() => import("./pages/ControleDeGestion.tsx"));
const CreationEntreprise = lazyPage(() => import("./pages/CreationEntreprise.tsx"));
const DafExternalise = lazyPage(() => import("./pages/DafExternalise.tsx"));
const Diagnostic = lazyPage(() => import("./pages/Diagnostic.tsx"));
const EntreprisesCroissance = lazyPage(() => import("./pages/EntreprisesCroissance.tsx"));
const Fiscalite = lazyPage(() => import("./pages/Fiscalite.tsx"));
const FraisDefendables = lazyPage(() => import("./pages/FraisDefendables.tsx"));
const GenerateurBailPage = lazyPage(() => import("./pages/GenerateurBailPage.tsx"));
const IndependantsStartups = lazyPage(() => import("./pages/IndependantsStartups.tsx"));
const MentionsLegales = lazyPage(() => import("./pages/MentionsLegales.tsx"));
const PolitiqueConfidentialite = lazyPage(() => import("./pages/PolitiqueConfidentialite.tsx"));
const PolitiqueCookies = lazyPage(() => import("./pages/PolitiqueCookies.tsx"));
const ProfessionsSante = lazyPage(() => import("./pages/ProfessionsSante.tsx"));
const PromoteursImmobiliers = lazyPage(() => import("./pages/PromoteursImmobiliers.tsx"));
const QuiNousAccompagnons = lazyPage(() => import("./pages/QuiNousAccompagnons.tsx"));
const Services = lazyPage(() => import("./pages/Services.tsx"));
const SocieteDeManagement = lazyPage(() => import("./pages/SocieteDeManagement.tsx"));
const SocieteDeMoyens = lazyPage(() => import("./pages/SocieteDeMoyens.tsx"));
const SocieteExploitation = lazyPage(() => import("./pages/SocieteExploitation.tsx"));
const Support = lazyPage(() => import("./pages/Support.tsx"));
const SocieteEnVeille = lazyPage(() => import("./pages/SocieteEnVeille.tsx"));
const Tarifs = lazyPage(() => import("./pages/Tarifs.tsx"));
const Tresorerie = lazyPage(() => import("./pages/Tresorerie.tsx"));
const Unsubscribe = lazyPage(() => import("./pages/Unsubscribe.tsx"));
const NotreOrganisation = lazyPage(() => import("./pages/NotreOrganisation.tsx"));
const ChatBot = lazy(() => import("./components/ChatBot"));


// Table utilisée pour précharger la page demandée avant le premier affichage.
const preloadableRoutes: { path: string; page: LazyPage }[] = [
  { path: "/services/", page: Services },
  { path: "/services/daf-externalise/", page: DafExternalise },
  { path: "/services/controle-de-gestion/", page: ControleDeGestion },
  { path: "/services/tresorerie/", page: Tresorerie },
  { path: "/services/comptabilite/", page: Comptabilite },
  { path: "/services/fiscalite/", page: Fiscalite },
  { path: "/services/creation-entreprise/", page: CreationEntreprise },
  { path: "/tarifs/", page: Tarifs },
  { path: "/societe-en-veille/", page: SocieteEnVeille },
  { path: "/diagnostic/", page: Diagnostic },
  { path: "/qui-nous-accompagnons/", page: QuiNousAccompagnons },
  { path: "/qui-nous-accompagnons/independants-et-startups/", page: IndependantsStartups },
  { path: "/qui-nous-accompagnons/commerce-et-horeca/", page: CommerceHoreca },
  { path: "/qui-nous-accompagnons/professions-de-sante/", page: ProfessionsSante },
  { path: "/qui-nous-accompagnons/entreprises-en-croissance/", page: EntreprisesCroissance },
  { path: "/qui-nous-accompagnons/promoteurs-immobiliers/", page: PromoteursImmobiliers },
  { path: "/qui-nous-accompagnons/asbl/", page: Asbl },
  { path: "/qui-nous-accompagnons/societe-exploitation/", page: SocieteExploitation },
  { path: "/qui-nous-accompagnons/societe-de-moyens/", page: SocieteDeMoyens },
  { path: "/qui-nous-accompagnons/societe-de-management/", page: SocieteDeManagement },
  { path: "/contact/", page: Contact },
  { path: "/a-propos/", page: APropos },
  { path: "/notre-organisation/", page: NotreOrganisation },
  { path: "/support/", page: Support },
  { path: "/blog/", page: Blog },
  { path: "/blog/fiscalite-belgique/bureau-a-domicile/", page: BureauADomicileHub },
  { path: "/blog/:categorySlug/", page: BlogCategory },
  { path: "/blog/:categorySlug/:articleSlug/", page: BlogArticle },
  { path: "/mentions-legales/", page: MentionsLegales },
  { path: "/politique-de-confidentialite/", page: PolitiqueConfidentialite },
  { path: "/politique-de-cookies/", page: PolitiqueCookies },
  { path: "/checklist-tresorerie/", page: ChecklistTresorerie },
  { path: "/frais-defendables/", page: FraisDefendables },
  { path: "/ressources/calculateur-bureau/", page: CalculateurBureau },
  { path: "/ressources/generateur-bail/", page: GenerateurBailPage },
  { path: "/ressources/checklist-controle-bureau/", page: ChecklistControleBureau },
  { path: "/ressources/checklist-controle-bureau/confirmation/", page: ChecklistControleBureauConfirmation },
  { path: "/unsubscribe/", page: Unsubscribe },
  { path: "/admin/analytics/", page: AdminAnalytics },
];

/** Précharge la page correspondant à l'adresse, pour l'afficher sans écran d'attente. */
export function preloadRoute(pathname: string): Promise<unknown> {
  const route = preloadableRoutes.find((r) => matchPath({ path: r.path, end: true }, pathname));
  return route ? route.page.preload() : Promise.resolve();
}

const queryClient = new QueryClient();

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

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
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    recordLandingPage();
    initTracker();
    retryPendingLeads().catch(() => {});
    // Mesure Clarity : étiquette « environment » + clics contact / rendez-vous / tarifs
    tagSession();
    return installClickTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <RouteTracker />
          <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<AccueilV2 />} />
            {/* <Route path="/accueil-v1/" element={<Index />} /> */}
            {/* <Route path="/accueilv2/" element={<AccueilV2 />} /> */}
            {/* <Route path="/accueilv2" element={<AccueilV2 />} /> */}
            {/* <Route path="/accueilv3/" element={<AccueilV3 />} /> */}
            {/* <Route path="/accueilv3" element={<AccueilV3 />} /> */}
            <Route path="/services/" element={<Services />} />
            <Route
              path="/services/daf-externalise/"
              element={<DafExternalise />}
            />
            <Route
              path="/services/controle-de-gestion/"
              element={<ControleDeGestion />}
            />
            <Route path="/services/tresorerie/" element={<Tresorerie />} />
            <Route path="/services/comptabilite/" element={<Comptabilite />} />
            <Route path="/services/fiscalite/" element={<Fiscalite />} />
            <Route
              path="/services/creation-entreprise/"
              element={<CreationEntreprise />}
            />
            <Route path="/tarifs/" element={<Tarifs />} />
            <Route path="/societe-en-veille/" element={<SocieteEnVeille />} />
            <Route path="/diagnostic/" element={<Diagnostic />} />
            <Route
              path="/qui-nous-accompagnons/"
              element={<QuiNousAccompagnons />}
            />
            <Route
              path="/qui-nous-accompagnons/independants-et-startups/"
              element={<IndependantsStartups />}
            />
            <Route
              path="/qui-nous-accompagnons/commerce-et-horeca/"
              element={<CommerceHoreca />}
            />
            <Route
              path="/qui-nous-accompagnons/professions-de-sante/"
              element={<ProfessionsSante />}
            />
            <Route
              path="/qui-nous-accompagnons/entreprises-en-croissance/"
              element={<EntreprisesCroissance />}
            />
            <Route
              path="/qui-nous-accompagnons/promoteurs-immobiliers/"
              element={<PromoteursImmobiliers />}
            />
            <Route path="/qui-nous-accompagnons/asbl/" element={<Asbl />} />
            <Route
              path="/qui-nous-accompagnons/societe-exploitation/"
              element={<SocieteExploitation />}
            />
            <Route
              path="/qui-nous-accompagnons/societe-de-moyens/"
              element={<SocieteDeMoyens />}
            />
            <Route
              path="/qui-nous-accompagnons/societe-de-management/"
              element={<SocieteDeManagement />}
            />
            {/* Legacy slug redirects (301-style) */}
            <Route
              path="/qui-nous-accompagnons/commerce-horeca"
              element={
                <Navigate
                  to="/qui-nous-accompagnons/commerce-et-horeca/"
                  replace
                />
              }
            />
            <Route
              path="/qui-nous-accompagnons/commerce-horeca/"
              element={
                <Navigate
                  to="/qui-nous-accompagnons/commerce-et-horeca/"
                  replace
                />
              }
            />
            <Route
              path="/qui-nous-accompagnons/entreprises-croissance"
              element={
                <Navigate
                  to="/qui-nous-accompagnons/entreprises-en-croissance/"
                  replace
                />
              }
            />
            <Route
              path="/qui-nous-accompagnons/entreprises-croissance/"
              element={
                <Navigate
                  to="/qui-nous-accompagnons/entreprises-en-croissance/"
                  replace
                />
              }
            />
            <Route
              path="/qui-nous-accompagnons/independants-startups"
              element={
                <Navigate
                  to="/qui-nous-accompagnons/independants-et-startups/"
                  replace
                />
              }
            />
            <Route
              path="/qui-nous-accompagnons/independants-startups/"
              element={
                <Navigate
                  to="/qui-nous-accompagnons/independants-et-startups/"
                  replace
                />
              }
            />
            <Route
              path="/qui-nous-accompagnons/professions-sante"
              element={
                <Navigate
                  to="/qui-nous-accompagnons/professions-de-sante/"
                  replace
                />
              }
            />
            <Route
              path="/qui-nous-accompagnons/professions-sante/"
              element={
                <Navigate
                  to="/qui-nous-accompagnons/professions-de-sante/"
                  replace
                />
              }
            />
            <Route path="/contact/" element={<Contact />} />
            <Route path="/a-propos/" element={<APropos />} />
            <Route path="/notre-organisation/" element={<NotreOrganisation />} />
            <Route path="/support/" element={<Support />} />
            <Route path="/blog/" element={<Blog />} />
            <Route
              path="/blog/fiscalite-belgique/bureau-a-domicile/"
              element={<BureauADomicileHub />}
            />
            <Route path="/blog/:categorySlug/" element={<BlogCategory />} />
            <Route
              path="/blog/:categorySlug/:articleSlug/"
              element={<BlogArticle />}
            />
            <Route path="/mentions-legales/" element={<MentionsLegales />} />
            <Route
              path="/politique-de-confidentialite/"
              element={<PolitiqueConfidentialite />}
            />
            <Route
              path="/politique-de-cookies/"
              element={<PolitiqueCookies />}
            />
            <Route
              path="/checklist-tresorerie/"
              element={<ChecklistTresorerie />}
            />
            <Route path="/frais-defendables/" element={<FraisDefendables />} />
            <Route
              path="/ressources/calculateur-bureau/"
              element={<CalculateurBureau />}
            />
            <Route
              path="/ressources/generateur-bail/"
              element={<GenerateurBailPage />}
            />
            <Route
              path="/ressources/checklist-controle-bureau/"
              element={<ChecklistControleBureau />}
            />
            <Route
              path="/ressources/checklist-controle-bureau/confirmation/"
              element={<ChecklistControleBureauConfirmation />}
            />
            <Route path="/unsubscribe/" element={<Unsubscribe />} />
            <Route path="/admin/analytics/" element={<AdminAnalytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
