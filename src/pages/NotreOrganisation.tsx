import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import equipePhoto from "@/assets/mfinances-equipe-sourire.webp";
import imgMeeting from "@/assets/meeting-warm.webp";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  ShieldCheck,
  BarChart3,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles,
  ArrowUpRight,
  ArrowLeftRight,
  Shield,
  FileSpreadsheet,
  Zap,
  Check,
  Building2,
  FileCheck,
  Lock,
  ChevronDown,
  Users,
  Compass,
  Briefcase,
  TrendingUp,
  Workflow,
  Scale,
} from "lucide-react";
import { organisationPageSchema, createBreadcrumbSchema } from "@/lib/seo-schemas";
import { trackEvent } from "@/lib/visitor-tracker";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// ── Données des Pôles ──
const poles = [
  {
    id: "mfinances",
    name: "MFINANCES",
    badge: "Supervision & DAF",
    tagline: "L'autorité comptable, la fiscalité stratégique et le pilotage de haut vol.",
    icon: Building2,
    accentColor: "accent",
    isPrimary: true,
    lead: "Porté par des Experts-Comptables certifiés ITAA et des Directeurs Financiers expérimentés.",
    missions: [
      "Supervision, révision légale et arrêté des comptes annuels",
      "Direction Financière externalisée (DAF à temps partiel) & arbitrage",
      "Contrôle de gestion opérationnel, marges par activité et BFR",
      "Optimisation fiscale, rémunération dirigeant et comités de direction",
    ],
    deliverables: "Bilan certifié ITAA • Tableaux de bord DAF mensuels • Plan d'optimisation fiscale",
    teamProfile: "Experts-Comptables Certifiés ITAA & DAF Seniors",
  },
  {
    id: "analytica",
    name: "MSL ANALYTICA",
    badge: "Data & Flux",
    tagline: "Le moteur opérationnel qui fiabilise et structure votre donnée financière.",
    icon: Database,
    accentColor: "primary",
    isPrimary: false,
    lead: "Des analystes financiers et gestionnaires de flux dédiés à la pureté de votre donnée.",
    missions: [
      "Collecte automatisée des flux documentaires (Peppol, factures, Coda)",
      "Rapprochements bancaires quotidiens et apurement des comptes",
      "Contrôle de complétude rigoureux et détection immédiate des écarts",
      "Préparation d'une donnée financière propre et exploitable à J+15",
    ],
    deliverables: "Comptabilité à jour en continu • Rapprochement 100% • Clôtures sans stress",
    teamProfile: "Analystes financiers, Data Ops & Gestionnaires de flux",
  },
  {
    id: "itech",
    name: "MSL-iTECH",
    badge: "Odoo & ERP",
    tagline: "L'architecture technologique qui supprime les doubles saisies et accélère les flux.",
    icon: Cpu,
    accentColor: "accent",
    isPrimary: false,
    lead: "Des consultants et architectes certifiés Odoo spécialisés dans la finance belge.",
    missions: [
      "Intégration et paramétrage expert d'Odoo selon le plan comptable belge",
      "Connecteurs bancaires, passerelles e-commerce et facturation électronique Peppol",
      "Workflows automatisés et tableaux de bord de gestion temps réel",
      "Maintenance, évolutions applicatives et support technique réactif",
    ],
    deliverables: "Environnement Odoo calibré finance • Automatisations sans friction • Zéro double saisie",
    teamProfile: "Consultants certifiés Odoo & Architectes logiciels",
  },
];

// ── Chaîne de valeur chronologique ──
const chainSteps = [
  {
    step: "01",
    label: "Collecter",
    timing: "En continu",
    actor: "MSL ANALYTICA & Odoo",
    icon: Database,
    text: "Factures Peppol, flux bancaires Coda, achats et données de caisse sont centralisés dans Odoo sans friction.",
    output: "Flux centralisés sans déperdition",
  },
  {
    step: "02",
    label: "Fiabiliser",
    timing: "Hebdomadaire",
    actor: "MSL ANALYTICA",
    icon: CheckCircle2,
    text: "Rapprochements bancaires, contrôle de complétude, lettrage et détection des anomalies en temps réel.",
    output: "Donnée réconciliée à 100%",
  },
  {
    step: "03",
    label: "Analyser",
    timing: "Mensuel (J+15)",
    actor: "MFINANCES",
    icon: BarChart3,
    text: "Calcul des marges réelles, atterrissage de trésorerie glissante, budget prévisionnel et indicateurs de rentabilité.",
    output: "Cockpit financier & Situation flash",
  },
  {
    step: "04",
    label: "Décider",
    timing: "Comités réguliers",
    actor: "Dirigeant & DAF MFINANCES",
    icon: Lightbulb,
    text: "Arbitrage d'investissements, recrutements, distribution de dividendes et optimisation fiscale sécurisée.",
    output: "Plan d'action & sérénité fiscale",
  },
];

// ── Comparatif Avant / Après ──
const comparisonPoints = [
  {
    aspect: "Rythme de traitement",
    traditional: "Traitement trimestriel ou annuel avec effet de panique lors du bilan.",
    mfinances: "Traitement continu et situations financières fiabilisées dès le 15 du mois.",
  },
  {
    aspect: "Lien Odoo / Comptabilité",
    traditional: "Intégrateur informatique externe ignorant la compta belge, multiplication d'exports Excel.",
    mfinances: "Odoo nativement configuré selon le plan comptable belge et connecté aux flux bancaires.",
  },
  {
    aspect: "Rôle de l'interlocuteur",
    traditional: "Un comptable réactif qui enregistre le passé et calcule la facture fiscale trop tard.",
    mfinances: "Un DAF proactif qui traduit les chiffres en opportunités et anticipe les flux de trésorerie.",
  },
  {
    aspect: "Charge mentale du dirigeant",
    traditional: "Le dirigeant court après les pièces manquantes et pilote au solde bancaire.",
    mfinances: "Délégation sereine, visibilité temps réel et un interlocuteur unique identifié.",
  },
];

// ── Transparence & Déontologie ──
const transparenceItems = [
  {
    icon: ShieldCheck,
    badge: "Déontologie ITAA",
    titre: "Supervision ITAA Exclusive",
    texte:
      "La révision, la supervision et la validation légale de votre dossier sont assurées exclusivement par MFINANCES et nos experts-comptables agréés par l'Institut des Conseillers Fiscaux et des Experts-comptables (ITAA).",
  },
  {
    icon: Lock,
    badge: "Secret Professionnel",
    titre: "Confidentialité Absolue",
    texte:
      "Tous les intervenants opèrent sous les règles strictes du secret professionnel et des contrats de sécurité conformes au RGPD. Vos données financières sont hébergées sur des infrastructures européennes sécurisées.",
  },
  {
    icon: Scale,
    badge: "Libre Choix",
    titre: "Libre Choix de l'Intégrateur",
    texte:
      "Aucune vente liée : lorsqu'une prestation Odoo avec MSL-iTECH est pertinente, elle fait l'objet d'un devis distinct et transparent. Vous conservez l'entière liberté de choisir votre propre intégrateur.",
  },
];

// ── Bénéfices tangibles ──
const keyBenefits = [
  {
    title: "Des chiffres disponibles pour agir",
    desc: "La donnée est organisée tout au long de l'exercice, au lieu d'être reconstruite uniquement lors de la clôture.",
  },
  {
    title: "Une donnée financière mieux structurée",
    desc: "L'analyse n'a de valeur que si les informations sur lesquelles elle repose sont complètes et cohérentes.",
  },
  {
    title: "Des outils adaptés à votre entreprise",
    desc: "Odoo relie les flux de gestion et la finance plutôt que de multiplier les fichiers parallèles.",
  },
  {
    title: "Plus de temps consacré au pilotage",
    desc: "L'automatisation traite ce qui peut l'être ; l'expertise humaine reste concentrée sur le contrôle, l'analyse et la décision.",
  },
];

// ── FAQ ──
const faqs = [
  {
    q: "Qui intervient réellement sur mon dossier au quotidien ?",
    a: "Vous disposez d'un interlocuteur principal identifié chez MFINANCES (votre gestionnaire ou DAF). Selon les besoins techniques de votre entreprise, les flux documentaires et bancaires sont traités par MSL ANALYTICA et l'environnement Odoo est maintenu par MSL-iTECH. La supervision globale et la signature comptable restent sous la responsabilité directe de votre expert-comptable MFINANCES.",
  },
  {
    q: "Où se situe la responsabilité professionnelle et légale ?",
    a: "La responsabilité professionnelle et déontologique est intégralement portée par MFINANCES, cabinet inscrit à l'ITAA. C'est l'expert-comptable responsable qui valide vos comptes, signe vos déclarations fiscales et engage sa signature déontologique.",
  },
  {
    q: "Si je collabore avec MFINANCES, suis-je obligé de choisir MSL-iTECH comme intégrateur Odoo ?",
    a: "Absolument pas. L'indépendance de nos clients est fondamentale. Si votre entreprise utilise déjà Odoo avec un autre partenaire, nous nous intégrons à votre environnement existant. Si vous cherchez un intégrateur compétent sur les aspects financiers, nous vous présentons MSL-iTECH en toute transparence, sans obligation.",
  },
  {
    q: "Pourquoi avoir créé cette organisation au lieu d'un cabinet comptable classique ?",
    a: "Parce que le modèle traditionnel de l'expert-comptable isolé ne répond plus aux exigences des PME modernes. Pour piloter sereinement, un dirigeant a besoin d'un ERP fluide, de données rapprochées rapidement et d'un conseil stratégique fréquent. En réunissant ces trois métiers, nous éliminons les pertes de temps et les erreurs d'interprétation.",
  },
  {
    q: "Comment garantissez-vous la sécurité et la confidentialité de mes données financières ?",
    a: "Toutes les interventions sont strictement encadrées par les obligations déontologiques de l'ITAA et la réglementation RGPD. Nos accès aux environnements Odoo et aux relevés bancaires sont protégés par des protocoles chiffrés, des droits restreints et un hébergement européen hautement sécurisé.",
  },
];

export default function NotreOrganisation() {
  const root = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  return (
    <div ref={root} className="min-h-screen bg-background">
      <SEOHead
        title="Notre organisation | MFINANCES, Odoo & pilotage financier"
        description="Découvrez comment MFINANCES associe expertise comptable ITAA, traitement des données financières et maîtrise d'Odoo pour un pilotage financier d'élite des PME."
        canonical="https://mfinances.be/notre-organisation/"
        schemaJson={[
          organisationPageSchema,
          createBreadcrumbSchema([
            { name: "Accueil", url: "https://mfinances.be/" },
            { name: "À propos", url: "https://mfinances.be/a-propos/" },
            { name: "Notre organisation", url: "https://mfinances.be/notre-organisation/" },
          ]),
        ]}
      />
      <Header />

      <main>
        {/* ══════════════════════════════════════════════════════════════
            1. HERO : MODÈLE TRIPARTITE D'ÉLITE
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-primary py-12 md:py-20 relative overflow-hidden bg-precision-grid-light">
          {/* Filigrane éditorial de fond */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-8 -left-6 md:-top-14 md:-left-10 font-display italic text-primary-foreground/[0.04] text-[110px] md:text-[230px] leading-none tracking-tight"
          >
            Synergie
          </span>

          {/* Halos de lumière */}
          <div className="pointer-events-none absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute top-0 right-1/3 w-[380px] h-[380px] rounded-full bg-primary-light/30 blur-3xl" />

          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Colonne Gauche : Pitch & Accroche */}
            <div className="lg:col-span-7">
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px] transition-colors">
                        Accueil
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/a-propos/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px] transition-colors">
                        À propos
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-accent font-medium text-[13px]">
                      Notre organisation
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-accent" />
                <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                  Architecture Tripartite d'Excellence
                </span>
              </div>

              <h1 className="font-display text-[32px] sm:text-[42px] md:text-[54px] leading-[1.08] text-primary-foreground tracking-tight mb-6">
                Trois expertises intégrées.{" "}
                <span className="italic font-light text-accent">Une responsabilité claire.</span>
              </h1>

              <p className="text-primary-foreground/85 text-[15.5px] md:text-[17.5px] leading-[1.75] font-body mb-8 max-w-[600px]">
                Pour qu'un chef d'entreprise pilote en toute clarté, la finance ne peut plus être fragmentée.
                Nous avons réuni l'<strong>expertise comptable ITAA</strong>, le <strong>traitement opérationnel des données</strong> et l'<strong>intégration Odoo</strong> au sein d'une même dynamique au service de vos décisions.
              </p>

              {/* Boutons d'action */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Button variant="accent" size="lg" className="rounded-full shadow-lg" asChild>
                  <a href="#poles">
                    Explorer les 3 pôles
                    <ArrowRight size={16} className="ml-1.5" />
                  </a>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                  <a href="#fonctionnement">
                    Voir la chaîne de valeur
                  </a>
                </Button>
              </div>

              {/* Sceaux de réassurance immédiats */}
              <div className="pt-6 border-t border-primary-foreground/15 grid grid-cols-3 gap-4 max-w-[580px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <ShieldCheck size={14} className="text-accent" />
                  </div>
                  <span className="text-[12px] font-medium text-primary-foreground/90 leading-tight">
                    Supervision légale ITAA
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Cpu size={14} className="text-accent" />
                  </div>
                  <span className="text-[12px] font-medium text-primary-foreground/90 leading-tight">
                    Environnement Odoo calibré
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <BarChart3 size={14} className="text-accent" />
                  </div>
                  <span className="text-[12px] font-medium text-primary-foreground/90 leading-tight">
                    Données fiables à J+15
                  </span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Architecture Visuelle / Hub Écosystème */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-primary-dark/80 border border-primary-foreground/15 p-6 sm:p-7 shadow-2xl backdrop-blur-md overflow-hidden">
                {/* Micro badge supérieur */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-primary-foreground/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider text-primary-foreground/80 uppercase">
                      Écosystème Unifié
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/25">
                    1 Dossier Unique
                  </span>
                </div>

                {/* Cœur : Le Dirigeant & Sa PME */}
                <div className="bg-primary/90 border border-accent/40 rounded-2xl p-4 text-center mb-5 relative group shadow-md">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent mb-1.5">
                    <Users size={16} />
                  </div>
                  <p className="font-display text-[17px] font-semibold text-primary-foreground tracking-wide">
                    Le Dirigeant de PME
                  </p>
                  <p className="text-primary-foreground/70 text-[11.5px] mt-0.5 font-body">
                    Pilote unique • Décisions éclairées • Visibilité en temps réel
                  </p>
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm">
                    Centre de l'action
                  </div>
                </div>

                {/* Les 3 piliers interconnectés */}
                <div className="space-y-3 pt-2">
                  {/* Pôle 1 : MFINANCES */}
                  <div className="bg-gradient-to-r from-accent/25 to-accent/10 border border-accent/40 rounded-xl p-3.5 flex items-center gap-3.5 transition-all duration-200 hover:border-accent">
                    <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shrink-0 shadow-md">
                      <Building2 size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-display font-bold text-[14.5px] text-primary-foreground tracking-wide">
                          MFINANCES
                        </p>
                        <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">
                          Agrément ITAA
                        </span>
                      </div>
                      <p className="text-primary-foreground/75 text-[11.5px] leading-snug truncate">
                        Supervision légale • Arbitrage fiscal • Direction Financière DAF
                      </p>
                    </div>
                  </div>

                  {/* Pôle 2 : MSL ANALYTICA */}
                  <div className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl p-3.5 flex items-center gap-3.5 transition-all duration-200 hover:bg-primary-foreground/10">
                    <div className="w-10 h-10 rounded-xl bg-primary-foreground/15 text-primary-foreground flex items-center justify-center shrink-0">
                      <Database size={18} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-display font-semibold text-[14px] text-primary-foreground">
                          MSL ANALYTICA
                        </p>
                        <span className="text-[10px] font-semibold text-primary-foreground/50 uppercase tracking-wider">
                          Data & Rapprochements
                        </span>
                      </div>
                      <p className="text-primary-foreground/70 text-[11.5px] leading-snug truncate">
                        Collecte Peppol & Coda • Contrôle qualité • Données à J+15
                      </p>
                    </div>
                  </div>

                  {/* Pôle 3 : MSL-iTECH */}
                  <div className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-xl p-3.5 flex items-center gap-3.5 transition-all duration-200 hover:bg-primary-foreground/10">
                    <div className="w-10 h-10 rounded-xl bg-primary-foreground/15 text-primary-foreground flex items-center justify-center shrink-0">
                      <Cpu size={18} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-display font-semibold text-[14px] text-primary-foreground">
                          MSL-iTECH
                        </p>
                        <span className="text-[10px] font-semibold text-primary-foreground/50 uppercase tracking-wider">
                          Odoo Expert
                        </span>
                      </div>
                      <p className="text-primary-foreground/70 text-[11.5px] leading-snug truncate">
                        Paramétrage Odoo Belgique • Automatisations • Connecteurs API
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer du hub */}
                <div className="mt-4 pt-3 border-t border-primary-foreground/10 flex items-center justify-between text-[11px] text-primary-foreground/60">
                  <span>Interlocuteur unique & identifié</span>
                  <span className="text-accent font-medium">Zéro guichet anonyme</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            2. LES TROIS PÔLES EN PROFONDEUR (TRIPTYQUE D'EXCELLENCE)
        ══════════════════════════════════════════════════════════════ */}
        <section id="poles" className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
            {/* Entête de section */}
            <div className="text-center max-w-[760px] mx-auto mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                  Synergie Opérationnelle
                </span>
                <span className="h-px w-6 bg-accent" />
              </div>
              <h2 className="font-display text-[30px] md:text-[44px] text-foreground leading-[1.1] tracking-tight mb-4">
                Trois pôles spécialisés,{" "}
                <span className="italic font-light text-accent">un seul dossier partagé.</span>
              </h2>
              <p className="text-muted-foreground text-[15.5px] leading-[1.75] font-body">
                L'expertise comptable traditionnelle se heurte souvent aux limites des logiciels ou à la lourdeur des saisies.
                En associant ces trois compétences expertes, nous vous offrons la réactivité d'une fintech et la solidité d'un grand cabinet.
              </p>
            </div>

            {/* Cartes des 3 Pôles */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {poles.map((pole) => {
                const IconComponent = pole.icon;
                const isMain = pole.isPrimary;

                return (
                  <div
                    key={pole.id}
                    className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative group ${isMain
                        ? "bg-primary text-primary-foreground shadow-xl ring-1 ring-primary-light/50 cut-corner"
                        : "bg-card text-foreground border border-border/80 shadow-md hover:shadow-xl hover:border-accent/40"
                      }`}
                  >
                    {/* Header de carte */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${isMain
                              ? "bg-accent text-accent-foreground"
                              : "bg-primary/5 text-primary border border-border"
                            }`}
                        >
                          <IconComponent size={22} className={isMain ? "text-accent-foreground" : "text-accent"} />
                        </div>
                        <span
                          className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full whitespace-nowrap shrink-0 ${isMain
                              ? "bg-primary-foreground/10 text-accent-hover border border-primary-foreground/20"
                              : "bg-accent/10 text-accent border border-accent/20"
                            }`}
                        >
                          {pole.badge}
                        </span>
                      </div>

                      <h3
                        className={`font-display text-[26px] font-bold tracking-tight mb-2 ${isMain ? "text-primary-foreground" : "text-primary"
                          }`}
                      >
                        {pole.name}
                      </h3>

                      <p
                        className={`text-[13.5px] font-medium leading-snug mb-4 ${isMain ? "text-primary-foreground/80" : "text-foreground/80"
                          }`}
                      >
                        {pole.tagline}
                      </p>

                      <p
                        className={`text-[12.5px] italic mb-6 pb-6 border-b ${isMain
                            ? "text-primary-foreground/60 border-primary-foreground/15"
                            : "text-muted-foreground border-border/60"
                          }`}
                      >
                        {pole.lead}
                      </p>

                      {/* Liste des missions */}
                      <div className="space-y-3 mb-8">
                        <p
                          className={`text-[11px] font-bold uppercase tracking-wider ${isMain ? "text-accent" : "text-accent"
                            }`}
                        >
                          Missions & Responsabilités :
                        </p>
                        {pole.missions.map((mission, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isMain
                                  ? "bg-accent/20 text-accent"
                                  : "bg-accent/10 text-accent"
                                }`}
                            >
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span
                              className={`text-[13px] leading-snug ${isMain ? "text-primary-foreground/85" : "text-muted-foreground"
                                }`}
                            >
                              {mission}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer de carte : Livrables & Équipe */}
                    <div
                      className={`pt-5 border-t rounded-2xl p-4 ${isMain
                          ? "bg-primary-dark/60 border-primary-foreground/10 text-primary-foreground/80"
                          : "bg-secondary/70 border-border/50 text-foreground"
                        }`}
                    >
                      <div className="mb-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70 mb-0.5">
                          Livrables Tangibles :
                        </span>
                        <p className="text-[12px] font-medium leading-tight">
                          {pole.deliverables}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70 mb-0.5">
                          Profil d'Experts Dédiés :
                        </span>
                        <p className={`text-[12px] font-semibold ${isMain ? "text-accent" : "text-primary"}`}>
                          {pole.teamProfile}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            3. LA CHAÎNE DE VALEUR CHRONOLOGIQUE : COLLECTER → DÉCIDER
        ══════════════════════════════════════════════════════════════ */}
        <section id="fonctionnement" className="py-16 md:py-24 bg-secondary/60 relative overflow-hidden border-y border-border/60">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div className="max-w-[700px]">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-px w-6 bg-accent" />
                  <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                    Processus de Pilotage
                  </span>
                </div>
                <h2 className="font-display text-[30px] md:text-[44px] text-foreground leading-[1.1] tracking-tight">
                  De la donnée comptable brute à la{" "}
                  <span className="italic font-light text-accent">décision sereine</span>
                </h2>
                <p className="text-muted-foreground text-[15.5px] leading-[1.75] mt-3">
                  Voici le cycle continu qui transforme le chaos administratif en un outil stratégique d'aide à la décision.
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-[12px] font-medium text-muted-foreground bg-card px-4 py-2 rounded-full border border-border/70 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                Pipeline synchronisé en 4 étapes
              </div>
            </div>

            {/* Grille des 4 étapes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {chainSteps.map((step, index) => {
                const StepIcon = step.icon;

                return (
                  <div
                    key={step.label}
                    className="bg-card border border-border/80 rounded-3xl p-6 relative flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 group"
                  >
                    {/* Flèche de continuité sur grand écran */}
                    {index < chainSteps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-accent text-accent-foreground items-center justify-center text-[12px] font-bold z-20 shadow-md"
                      >
                        →
                      </div>
                    )}

                    <div>
                      {/* Badge d'étape & Timing */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-display font-extrabold text-[28px] text-primary/30 group-hover:text-accent transition-colors">
                          {step.step}
                        </span>
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                          {step.timing}
                        </span>
                      </div>

                      {/* Titre & Acteur */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                          <StepIcon size={18} className="text-accent" />
                        </div>
                        <div>
                          <h3 className="font-display text-[20px] font-bold text-foreground">
                            {step.label}
                          </h3>
                          <span className="text-[11.5px] font-medium italic text-accent block">
                            Par {step.actor}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-[13.5px] leading-[1.65] mb-6">
                        {step.text}
                      </p>
                    </div>

                    {/* Livrable de l'étape */}
                    <div className="pt-4 border-t border-border/60 mt-auto">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 block mb-0.5">
                        Résultat concret :
                      </span>
                      <p className="text-[12.5px] font-semibold text-primary group-hover:text-accent transition-colors leading-tight">
                        {step.output}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note de réassurance sous la chaîne */}
            <div className="mt-10 p-4 rounded-2xl bg-card border border-border/80 text-center max-w-[800px] mx-auto shadow-sm">
              <p className="text-[13px] text-muted-foreground font-body">
                💡 <strong className="text-foreground">Fréquence sur-mesure :</strong> Selon la taille de votre entreprise, les situations flash et les comités DAF ont lieu sur un rythme mensuel ou trimestriel, avec un accès constant à vos indicateurs Odoo.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            4. COMPARATIF SANS FILTRE : MODÈLE TRADITIONNEL VS MFINANCES
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
            <div className="text-center max-w-[760px] mx-auto mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                  Pourquoi ce Modèle ?
                </span>
                <span className="h-px w-6 bg-accent" />
              </div>
              <h2 className="font-display text-[30px] md:text-[44px] text-foreground leading-[1.1] tracking-tight mb-4">
                Le comparatif sans filtre :{" "}
                <span className="italic font-light text-accent">deux visions de la gestion</span>
              </h2>
              <p className="text-muted-foreground text-[15.5px] leading-[1.75]">
                Pourquoi les PME en forte croissance finissent-elles par quitter les cabinets comptables conventionnels ?
              </p>
            </div>

            {/* Table / Grille comparative */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Colonne 1 : Le Cabinet Conventionnel */}
              <div className="bg-card border border-border/90 rounded-3xl p-8 relative shadow-sm">
                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-destructive block">
                      Modèle Conventionnel
                    </span>
                    <h3 className="font-display text-[22px] font-bold text-foreground">
                      Le Cabinet Comptable Isolé
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {comparisonPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-bold">
                        ✕
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-bold text-foreground mb-1">
                          {pt.aspect}
                        </h4>
                        <p className="text-[13px] text-muted-foreground leading-relaxed">
                          {pt.traditional}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border bg-muted/40 -mx-8 -mb-8 p-6 rounded-b-3xl">
                  <p className="text-[12px] text-muted-foreground italic">
                    Résultat : Pilotage à l'aveugle, perte de temps administratif et mauvaise surprise fiscale au bilan.
                  </p>
                </div>
              </div>

              {/* Colonne 2 : L'Organisation MFINANCES */}
              <div className="bg-primary text-primary-foreground rounded-3xl p-8 relative shadow-xl ring-2 ring-accent/30 cut-corner">
                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-primary-foreground/15">
                  <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shrink-0 shadow-md">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-accent block">
                      Organisation Intégrée
                    </span>
                    <h3 className="font-display text-[22px] font-bold text-primary-foreground">
                      L'Écosystème MFINANCES
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {comparisonPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-bold text-primary-foreground mb-1">
                          {pt.aspect}
                        </h4>
                        <p className="text-[13px] text-primary-foreground/80 leading-relaxed">
                          {pt.mfinances}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-primary-foreground/15 bg-primary-dark/60 -mx-8 -mb-8 p-6 rounded-b-3xl">
                  <p className="text-[12px] text-accent font-medium">
                    ✓ Résultat : Visibilité continue, trésorerie maîtrisée et sérénité fiscale garantie sous supervision ITAA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            5. GOUVERNANCE & DÉONTOLOGIE : TRANSPARENCE ABSOLUE
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-secondary/50 relative overflow-hidden border-t border-border/60">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
            <div className="max-w-[740px] mb-14">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                  Cadre Déontologique & Sécurité
                </span>
              </div>
              <h2 className="font-display text-[30px] md:text-[44px] text-foreground leading-[1.1] tracking-tight mb-4">
                Une organisation intégrée ne doit jamais rendre les{" "}
                <span className="italic font-light text-accent">responsabilités opaques</span>
              </h2>
              <p className="text-muted-foreground text-[15.5px] leading-[1.75]">
                La division des tâches sert l'excellence et la rapidité d'exécution. Elle n'altère en rien la déontologie, le secret professionnel et la supervision légale portée par l'expert-comptable.
              </p>
            </div>

            {/* Cartes de transparence */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {transparenceItems.map((item) => {
                const ItemIcon = item.icon;

                return (
                  <div
                    key={item.titre}
                    className="bg-card border border-border/80 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                          <ItemIcon size={20} className="text-accent" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="font-display text-[19px] font-bold text-foreground mb-3">
                        {item.titre}
                      </h3>

                      <p className="text-muted-foreground text-[13.5px] leading-[1.7]">
                        {item.texte}
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-border/60 flex items-center gap-2 text-[11.5px] font-semibold text-primary">
                      <CheckCircle2 size={14} className="text-accent" />
                      <span>Engagement contractuel garanti</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            6. BÉNÉFICES CONCRETS
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-secondary/60 relative overflow-hidden border-t border-border/60">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Colonne Gauche : Titre et liste des 4 bénéfices empilés */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                  Ce que cela change pour vous
                </span>
              </div>

              <h2 className="font-display text-[30px] md:text-[42px] text-foreground leading-[1.12] tracking-tight mb-8">
                Une organisation qui doit se traduire par des{" "}
                <span className="italic font-light text-accent">bénéfices concrets</span>
              </h2>

              <div className="space-y-4">
                {keyBenefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-200 flex items-start gap-4"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5 text-[13px] font-black">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-display text-[16.5px] font-bold text-foreground leading-snug">
                        {b.title}
                      </h3>
                      <p className="text-muted-foreground text-[13.5px] leading-relaxed mt-1">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Colonne Droite : Visuel chaleureux d'échange de pilotage */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border/80 ring-1 ring-primary/5">
                <img
                  src={imgMeeting}
                  alt="Échange de pilotage financier"
                  width={640}
                  height={430}
                  className="w-full h-[460px] object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            7. ORGANISATION HUMAINE : VOUS SAVEZ QUI INTERVIENT
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden border-t border-border/60">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Colonne Gauche : Photo d'équipe MFINANCES */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border/80 ring-1 ring-primary/5">
                <img
                  src={equipePhoto}
                  alt="Équipe MFINANCES"
                  width={720}
                  height={430}
                  className="w-full h-[420px] object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Colonne Droite : Texte et citation déontologique */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                  Une organisation humaine
                </span>
              </div>

              <h2 className="font-display text-[30px] md:text-[42px] text-foreground leading-[1.12] tracking-tight mb-5">
                Vous savez <span className="italic font-light text-accent">qui intervient</span> sur votre dossier.
              </h2>

              <p className="text-muted-foreground text-[15px] leading-[1.75] mb-4">
                L'organisation n'a pas vocation à créer un guichet anonyme. Elle permet au contraire d'identifier les responsabilités : traitement de la donnée, environnement Odoo, supervision comptable et analyse.
              </p>

              <p className="text-muted-foreground text-[15px] leading-[1.75]">
                Votre relation avec MFINANCES reste portée par des interlocuteurs identifiés. La technologie et la spécialisation servent la qualité du suivi ; elles ne remplacent pas la relation de confiance.
              </p>

              <div className="font-display italic text-[18px] sm:text-[20px] text-primary border-l-2 border-accent pl-5 my-6 leading-relaxed">
                « Le bon niveau de compétence, au bon moment, avec une responsabilité claire. »
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-primary bg-secondary/80 px-3.5 py-1.5 rounded-full border border-border/70">
                  <CheckCircle2 size={15} className="text-accent" />
                  Interlocuteurs identifiés
                </span>
                <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-primary bg-secondary/80 px-3.5 py-1.5 rounded-full border border-border/70">
                  <CheckCircle2 size={15} className="text-accent" />
                  Supervision directe ITAA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            6. RESPONSABILITÉ & TRANSPARENCE
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden border-t border-border/60">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
            {/* En-tête */}
            <div className="max-w-[760px] mb-14">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                  06 · Responsabilité & transparence
                </span>
              </div>
              <h2 className="font-display text-[30px] md:text-[44px] text-foreground leading-[1.1] tracking-tight mb-4">
                Une organisation intégrée ne doit jamais rendre les{" "}
                <span className="italic font-light text-accent">responsabilités moins lisibles</span>
              </h2>
            </div>

            {/* Cartes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Supervision */}
              <div className="bg-card border border-border/80 rounded-3xl p-7 flex flex-col gap-5 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} className="text-accent" />
                  </div>
                  <span className="font-display text-[11px] font-bold uppercase tracking-widest text-accent">
                    Supervision
                  </span>
                </div>
                <p className="text-muted-foreground text-[14px] leading-[1.75]">
                  La supervision, la revue et la validation de la mission comptable relèvent de MFINANCES et de l'expert-comptable responsable du dossier.
                </p>
              </div>

              {/* Confidentialité */}
              <div className="bg-card border border-border/80 rounded-3xl p-7 flex flex-col gap-5 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Lock size={20} className="text-accent" />
                  </div>
                  <span className="font-display text-[11px] font-bold uppercase tracking-widest text-accent">
                    Confidentialité
                  </span>
                </div>
                <p className="text-muted-foreground text-[14px] leading-[1.75]">
                  Les accès et interventions doivent être encadrés par les obligations professionnelles et les dispositifs contractuels applicables.
                </p>
              </div>

              {/* Libre choix Odoo */}
              <div className="bg-card border border-border/80 rounded-3xl p-7 flex flex-col gap-5 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <ArrowLeftRight size={20} className="text-accent" />
                  </div>
                  <span className="font-display text-[11px] font-bold uppercase tracking-widest text-accent">
                    Libre choix Odoo
                  </span>
                </div>
                <p className="text-muted-foreground text-[14px] leading-[1.75]">
                  Lorsqu'un projet distinct est proposé par MSL-iTECH, le lien entre les sociétés est communiqué. Le client reste libre de choisir son intégrateur.
                </p>
              </div>
            </div>

            {/* Note éditoriale avant publication */}
            <div className="bg-secondary/70 border border-border/70 rounded-2xl px-6 py-4 flex items-start gap-3 w-full">
              <span className="text-accent font-bold text-[16px] shrink-0 mt-0.5">!</span>
              <p className="text-[13px] text-muted-foreground leading-[1.7]">
                <strong className="text-foreground">Avant publication :</strong> les formulations détaillées relatives aux transferts de données hors EEE, à l'hébergement et aux garanties RGPD doivent rester alignées sur les conventions et la politique de confidentialité effectivement en vigueur.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            7. FOIRE AUX QUESTIONS (FAQ)
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-secondary/50 relative overflow-hidden border-t border-border/60">
          <div className="mx-auto max-w-[880px] px-6 lg:px-12">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                  Questions Fréquentes
                </span>
                <span className="h-px w-6 bg-accent" />
              </div>
              <h2 className="font-display text-[30px] md:text-[42px] text-foreground leading-[1.1] tracking-tight mb-4">
                Les questions qu'on nous pose{" "}
                <span className="italic font-light text-accent">au moment de choisir</span>
              </h2>
              <p className="text-muted-foreground text-[15px]">
                Toutes les réponses pour aborder notre collaboration en toute sérénité.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={faq.q}
                  className="group bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 open:border-accent/40 open:shadow-md"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[15px] sm:text-[16px] text-foreground font-body select-none hover:text-accent transition-colors">
                    <span className="flex items-center gap-3">
                      <span className="text-[12px] font-mono text-accent font-bold opacity-80">
                        0{index + 1}.
                      </span>
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-open:bg-accent group-open:text-accent-foreground group-open:rotate-180 transition-all duration-300"
                    >
                      <ChevronDown size={16} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-1 text-[14px] text-muted-foreground leading-[1.75] font-body border-t border-border/30">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            8. CTA FINAL : PASSAGE À L'ACTION DE PRESTIGE
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-primary py-16 md:py-24 relative overflow-hidden bg-precision-grid-light">
          <div className="pointer-events-none absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-primary-light/40 blur-3xl" />

          <div className="mx-auto max-w-[860px] px-6 lg:px-12 text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-accent" />
              <span className="font-body text-[10.5px] font-bold tracking-[0.25em] uppercase text-accent">
                Passez au Niveau Supérieur
              </span>
              <span className="h-px w-8 bg-accent" />
            </div>

            <h2 className="font-display text-[30px] sm:text-[38px] md:text-[50px] text-primary-foreground leading-[1.12] tracking-tight mb-5">
              Vous connaissez le pourquoi.{" "}
              <span className="italic font-light text-accent">Vous savez maintenant comment.</span>
            </h2>

            <p className="text-primary-foreground/80 text-[15.5px] md:text-[17px] leading-[1.75] font-body max-w-[620px] mx-auto mb-9">
              À mesure que votre entreprise se développe, vos flux et vos décisions financières se complexifient. Votre organisation doit être à la hauteur de vos ambitions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button
                variant="accent"
                size="lg"
                className="rounded-full w-full sm:w-auto shadow-xl"
                asChild
              >
                <Link
                  to="/contact/"
                  onClick={() => trackEvent("org_contact_click")}
                >
                  Prendre rendez-vous avec un associé
                  <ArrowRight size={16} className="ml-1.5 flex-shrink-0" />
                </Link>
              </Button>
              <Button
                variant="outline-white"
                size="lg"
                className="rounded-full w-full sm:w-auto"
                asChild
              >
                <Link to="/a-propos/">
                  Découvrir l'histoire de MFINANCES
                </Link>
              </Button>
              <Button
                variant="outline-white"
                size="lg"
                className="rounded-full w-full sm:w-auto"
                asChild
              >
                <Link to="/tarifs/">
                  Consulter nos forfaits
                </Link>
              </Button>
            </div>

            {/* Badges de réassurance */}
            <div className="inline-flex flex-wrap items-center justify-center gap-6 text-[12px] text-primary-foreground/70 pt-6 border-t border-primary-foreground/15">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent" />
                Audit organisationnel préliminaire offert
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent" />
                Réponse garantie sous 48h ouvrées
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent" />
                Sans engagement
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
