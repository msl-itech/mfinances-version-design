import { useCallback, useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgMeeting from "@/assets/daf-meeting-team.webp";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  X,
  Minus,
  SlidersHorizontal,
  ShieldCheck,
  TrendingUp,
  Rocket,
  Users,
  Clock,
  FileText,
  Headphones,
  PlayCircle,
  Sparkles,
  Quote,
  CalendarDays,
  RefreshCcw,
  Info,
  MessageCircle,
  MessageSquare,
  PieChart,
} from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import Stamp from "@/components/ui/Stamp";
import DiagnosticQuiz from "@/components/DiagnosticQuiz";

const priceRow = { label: "Prix mensuel HTVA", values: ["275 €", "À partir de 350 €", "À partir de 450 €", "À partir de 650 €"], isPrice: true };

const compareCategories = [
  {
    num: "I",
    title: "Conformité\nlégale",
    color: "hsla(224, 55%, 24%, 0.08)",
    barColor: "hsla(224, 55%, 24%, 0.5)",
    rows: [
      { label: "Bilan annuel", values: [true, true, true, true] },
      { label: "Déclarations fiscales", values: [true, true, true, true] },
      { label: "Assistante administrative", values: [true, true, true, true] },
    ],
  },
  {
    num: "II",
    title: "Anticipation",
    color: "hsla(0, 79%, 53%, 0.08)",
    barColor: "hsla(0, 79%, 53%, 0.5)",
    rows: [
      { label: "Situations intermédiaires", values: ["À la demande", "Semestrielles", "Trimestrielles", "Mensuelles"] },
    ],
  },
  {
    num: "III",
    title: "Développement",
    color: "hsla(160, 50%, 40%, 0.08)",
    barColor: "hsla(160, 50%, 40%, 0.5)",
    rows: [
      { label: "Contrôle de gestion", values: ["À la demande", "À la demande", "Trimestriel", "Mensuel"] },
    ],
  },
  {
    num: "IV",
    title: "Optimisation\nde la trésorerie",
    color: "hsla(36, 70%, 50%, 0.08)",
    barColor: "hsla(36, 70%, 50%, 0.5)",
    rows: [
      { label: "Trésorerie prévisionnelle", values: ["Non incluse", "Non incluse", "Non incluse", "Mensuelle"] },
    ],
  },
  {
    num: "V",
    title: "Relation\nclient",
    color: "hsla(270, 40%, 50%, 0.08)",
    barColor: "hsla(270, 40%, 50%, 0.5)",
    rows: [
      { label: "Rythme d'accompagnement (suivi global)", values: ["À la demande", "Périodique", "Régulier", "Proactif"] },
    ],
  },
];


const planNames = ["Basic", "Essentiel", "Premium", "Excellence"];

const plans = [
  {
    icon: Briefcase,
    name: "Basic",
    price: "275",
    profile: "Pour les besoins strictement comptables",
    tagline: "Être en règle",
    desc: "Le socle comptable et fiscal indispensable.",
    mode: "Prestations de conseil disponibles à la demande, au tarif horaire.",
  },
  {
    icon: ShieldCheck,
    name: "Essentiel",
    price: "350",
    profile: "Pour gagner en visibilité",
    tagline: "Anticiper",
    desc: "Les premiers outils pour voir venir vos échéances et vos résultats.",
    mode: "L'anticipation essentielle est comprise dans votre forfait.",
  },
  {
    icon: TrendingUp,
    name: "Premium",
    price: "450",
    profile: "Le choix recommandé pour piloter",
    tagline: "Piloter",
    desc: "Un suivi régulier pour comprendre vos résultats et améliorer vos performances.",
    mode: "Le contrôle de gestion est intégré à votre accompagnement.",
    popular: true,
  },
  {
    icon: Rocket,
    name: "Excellence",
    price: "650",
    profile: "Pour une direction financière complète",
    tagline: "Optimiser",
    desc: "Un pilotage financier proactif pour améliorer vos performances et votre trésorerie.",
    mode: "La vision financière et la trésorerie sont suivies en continu.",
  },
];

const missions = [
  { label: "Création d'entreprise (forfait complet)", tarif: "800 € HTVA" },
  { label: "Approfondissement contrôle de gestion", tarif: "150 € HTVA / heure" },
  { label: "DAF à temps partiel (clients Excellence)", tarif: "150 € HTVA / heure" },
];

const steps = [
  { icon: Headphones, num: "1", title: "Consultation gratuite", desc: "30 minutes pour comprendre votre situation" },
  { icon: FileText, num: "2", title: "Proposition personnalisée", desc: "Forfait adapté expliqué en détail" },
  { icon: Clock, num: "3", title: "Démarrage sous 48h", desc: "Dossier intégré dans Odoo" },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Combien coûte un expert-comptable pour une TPE en Belgique ?",
    a: (
      <>
        <p>Chez MFinances, les forfaits pour une TPE :</p>
        <ul className="list-none space-y-2 my-3">
          <li className="flex gap-2"><strong className="text-primary flex-shrink-0">Basic</strong><span>275 € HTVA/mois — comptabilité + conformité</span></li>
          <li className="flex gap-2"><strong className="text-primary flex-shrink-0">Essentiel</strong><span>350 € HTVA/mois — + conseil fiscal + situations intermédiaires</span></li>
          <li className="flex gap-2"><strong className="text-primary flex-shrink-0">Premium</strong><span>450 € HTVA/mois — + contrôle de gestion trimestriel</span></li>
          <li className="flex gap-2"><strong className="text-primary flex-shrink-0">Excellence</strong><span>650 € HTVA/mois — + trésorerie prévisionnelle + accès DAF à temps partiel</span></li>
        </ul>
        <p>Ces tarifs sont transparents et sans surprise. Le premier échange gratuit permet d'affiner selon votre situation : le forfait proposé ne change jamais de catégorie sans votre accord.</p>
      </>
    ),
  },
  {
    q: "Y a-t-il une réduction pour les structures non assujetties à la TVA ?",
    a: "Oui. Les structures non assujetties à la TVA : notamment les ASBL et certaines professions médicales (médecins, kinésithérapeutes, infirmiers) : bénéficient d'une réduction de 21 % sur l'ensemble de nos forfaits. Cette réduction s'applique automatiquement dès lors que votre structure répond à ces critères.",
  },
  {
    q: "Faut-il s'engager sur une durée minimum ?",
    a: "Nos forfaits sont conclus pour une durée d'un an, avec tacite reconduction. Un préavis de 3 mois avant la date d'échéance annuelle est requis pour mettre fin au contrat. Cet engagement dans la durée n'est pas une contrainte, c'est ce qui nous permet de vraiment vous connaître, d'anticiper vos besoins et d'être un partenaire efficace. Un client suivi depuis 2 ans bénéficie d'un niveau de conseil qu'un nouveau client ne peut pas avoir.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Tarifs", item: "https://mfinances.be/tarifs/" },
  ],
};

const faqJsonLdEntries = [
  {
    q: "Combien coûte un expert-comptable pour une TPE en Belgique ?",
    a: "Chez MFinances, les forfaits pour une TPE démarrent à 275 € HTVA/mois (Basic : comptabilité + conformité), 350 € HTVA/mois (Essentiel : + conseil fiscal + situations intermédiaires), 450 € HTVA/mois (Premium : + contrôle de gestion trimestriel) et 650 € HTVA/mois (Excellence : + trésorerie prévisionnelle + accès DAF à temps partiel). Ces tarifs sont transparents et sans surprise.",
  },
  {
    q: "Y a-t-il une réduction pour les structures non assujetties à la TVA ?",
    a: "Oui. Les structures non assujetties à la TVA (ASBL, certaines professions médicales) bénéficient d'une réduction de 21 % sur l'ensemble de nos forfaits. Cette réduction s'applique automatiquement dès lors que votre structure répond à ces critères.",
  },
  {
    q: "Faut-il s'engager sur une durée minimum ?",
    a: "Nos forfaits sont conclus pour une durée d'un an, avec tacite reconduction. Un préavis de 3 mois avant la date d'échéance annuelle est requis pour mettre fin au contrat.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqJsonLdEntries.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function CellValue({ v, isPrice }: { v: boolean | string | null | { span: number; value: string }; isPrice?: boolean }) {
  if (v === null || v === undefined) return null;
  if (typeof v === "object" && "value" in v) {
    const text = v.value;
    if (text.includes("150€ H/HTVA")) {
      return (
        <span className="inline-block border border-accent/40 rounded-xl px-3 py-2 text-accent font-body text-[12px] leading-tight whitespace-pre-line">
          {text}
        </span>
      );
    }
    return <span className="font-body text-foreground/70 text-[13px] whitespace-pre-line">{text}</span>;
  }
  if (v === true) return <Check size={18} className="text-accent mx-auto" strokeWidth={2.5} />;
  if (v === "—") return <Minus size={16} className="text-foreground/20 mx-auto" />;
  if (v === "Hors forfait") return <span className="inline-block font-body text-[12px] italic text-primary/70 bg-primary/[0.06] border border-primary/15 rounded-lg px-2.5 py-1">Hors forfait</span>;
  if (v === "À la demande") return <span className="inline-block font-body text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-1 leading-snug">À la demande<br />150 €/h</span>;
  if (v === "Non incluse") return <span className="inline-block font-body text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 rounded-full px-2.5 py-1">Non incluse</span>;
  if (v === "Inclus") return <span className="inline-block font-body text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1">Inclus</span>;
  if (v === "Périodique") return <span className="inline-block font-body text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-1">Périodique</span>;
  if (typeof v === "string" && /^(Régulier|Proactif)$/.test(v)) {
    return <span className="inline-block font-body text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1">{v}</span>;
  }
  if (typeof v === "string" && /^(Semestrielles|Trimestrielles|Mensuelles|Mensuelle|Mensuel|Trimestriel)$/i.test(v)) {
    return <span className="font-body font-semibold text-accent text-[13px]">{v}</span>;
  }
  if (typeof v === "string" && v.includes("150€ H/HTVA")) {
    return (
      <span className="inline-block border border-accent/40 rounded-xl px-3 py-2 text-accent font-body text-[12px] leading-tight whitespace-pre-line">
        {v}
      </span>
    );
  }
  return <span className={`font-body ${isPrice ? "font-bold text-primary text-[15px]" : "text-foreground/70 text-[13px]"}`}>{v as string}</span>;
}

export default function Tarifs() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  // Red glow following cursor inside the hero
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--glow-x", `${x}px`);
        el.style.setProperty("--glow-y", `${y}px`);
      });
    };
    const onEnter = () => el.style.setProperty("--glow-o", "1");
    const onLeave = () => el.style.setProperty("--glow-o", "0");
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Mobile card deck state ──
  const [activeMobileCard, setActiveMobileCard] = useState(0);
  const [showCompareSheet, setShowCompareSheet] = useState(false);
  const mobileDeckRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);

  const scrollToCard = useCallback((i: number) => {
    const deck = mobileDeckRef.current;
    if (!deck || !deck.children[i]) return;
    const card = deck.children[i] as HTMLElement;
    deck.scrollTo({ left: card.offsetLeft - deck.offsetLeft - 20, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const deck = mobileDeckRef.current;
    if (!deck) return;
    const onScroll = () => {
      const cardWidth = (deck.children[0] as HTMLElement)?.offsetWidth;
      if (!cardWidth) return;
      const i = Math.round(deck.scrollLeft / (cardWidth + 12));
      if (i !== activeMobileCard && i >= 0 && i < plans.length) {
        setActiveMobileCard(i);
        const rail = mobileRailRef.current;
        const pill = rail?.children[i] as HTMLElement | undefined;
        if (rail && pill) {
          rail.scrollTo({ left: pill.offsetLeft - rail.offsetWidth / 2 + pill.offsetWidth / 2, behavior: "smooth" });
        }
      }
    };
    deck.addEventListener("scroll", onScroll, { passive: true });
    return () => deck.removeEventListener("scroll", onScroll);
  }, [activeMobileCard]);

  // Lock body scroll when compare sheet is open
  useEffect(() => {
    document.body.style.overflow = showCompareSheet ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showCompareSheet]);

  return (
    <div className="min-h-screen bg-background" ref={root}>
      <SEOHead
        title="Tarifs Expert-Comptable Bruxelles | Dès 275€/mois | MFinances"
        description="4 forfaits transparents pour TPE à Bruxelles. Basic 275€, Essentiel 350€, Premium 450€, Excellence 650€ HTVA/mois. DAF à temps partiel en option."
        canonical="https://mfinances.be/tarifs/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="relative">
          <div
            ref={heroRef}
            className="group/hero relative overflow-hidden bg-primary py-6 md:py-12 bg-precision-grid-light"
            style={{ "--glow-x": "50%", "--glow-y": "50%", "--glow-o": "0" } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              data-anim="text-scrub" data-scrub-dir="right"
              className="pointer-events-none select-none absolute top-10 md:top-12 inset-x-0 text-center font-display italic text-primary-foreground/[0.04] text-[110px] md:text-[220px] leading-none tracking-tight whitespace-nowrap"
            >
              Tarifs
            </span>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[5] mix-blend-screen transition-opacity duration-500"
              style={{
                opacity: "var(--glow-o)",
                background:
                  "radial-gradient(420px circle at var(--glow-x) var(--glow-y), hsl(var(--accent) / 0.55), hsl(var(--accent) / 0.18) 35%, transparent 65%)",
              }}
            />

            <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center relative z-10">
              <div className="text-center lg:text-left">
                <div className={`transition-transform duration-1000 ${mounted ? "translate-y-0" : "translate-y-6"}`}>
                  <Breadcrumb>
                    <BreadcrumbList className="justify-center lg:justify-start">
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-primary-foreground/40" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-primary-foreground text-[13px]">Tarifs</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="mt-7 md:mt-9">
                  <div className={`inline-flex items-center gap-4 mb-5 md:mb-6 transition-transform duration-1000 ${mounted ? "translate-y-0" : "translate-y-6"}`}>
                    <span className="font-display text-[14px] text-accent font-bold tracking-wider">— Tarifs</span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 font-medium">
                      04 forfaits
                    </span>
                  </div>

                  <h1
                    className="font-display text-[32px] sm:text-[40px] md:text-[56px] leading-[1.05] text-primary-foreground tracking-tight"
                    data-anim="chars"
                    data-stagger="0.03"
                    data-delay="0.25"
                  >
                    Des forfaits <em className="italic font-normal text-accent">transparents</em>,<br className="hidden md:block" /> sans surprise : adaptés à votre <em className="italic font-normal text-primary-foreground/80">stade de croissance</em>.
                  </h1>

                  <p
                    className="mt-6 md:mt-7 text-primary-foreground/70 text-[15px] md:text-[16px] leading-[1.75] font-body max-w-[520px] mx-auto lg:mx-0"
                    data-anim="fade-up"
                    data-delay="0.4"
                  >
                    Quatre niveaux d'accompagnement, un seul engagement&nbsp;: vous donner une vision claire et anticipée de vos finances. À partir de <strong className="text-primary-foreground">275 € HTVA / mois</strong>.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start" data-anim="fade-up" data-delay="0.55">
                    <Button variant="accent" size="lg" className="rounded-full pl-6 pr-3 group h-12 text-[14px]" asChild>
                      <a href="#progression">
                        <span className="flex items-center gap-3">
                          Comprendre la progression
                          <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform">
                            <ArrowUpRight size={14} />
                          </span>
                        </span>
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-6 h-12 text-[14px] border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                      <a href="#diagnostic">Trouver mon forfait</a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="relative" data-anim="fade-up" data-delay="0.4">
                <div className="absolute -inset-2 bg-accent/20 blur-2xl rounded-3xl" aria-hidden="true" />
                <div className="absolute -top-12 -right-10 z-20">
                  <Stamp className="text-accent drop-shadow-lg" />
                </div>
                <div className="relative rounded-2xl shadow-2xl overflow-hidden aspect-video max-w-full ring-1 ring-primary-foreground/10" data-tilt data-tilt-max="3">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/gAF_Jw6_T7Q"
                    title="Pilotez vos finances avec Mfinances - Bruxelles : Formule Base, Premium ou Excellence"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 1 — Progression ── */}
        <section id="progression" className="py-10 md:py-14 bg-card relative overflow-hidden">
          <span
            aria-hidden="true" data-anim="text-scrub"
            className="absolute inset-x-0 top-12 text-center font-display italic font-bold text-[140px] md:text-[220px] leading-none text-accent/[0.035] pointer-events-none select-none whitespace-nowrap"
          >
            Piloter
          </span>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5 border-l-2 border-accent pl-4">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 01</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Progression</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Jusqu'où voulez-vous piloter votre entreprise ?
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed max-w-[680px] mx-auto" data-anim="fade-up" data-delay="0.2">
                Chaque niveau enrichit le précédent avec davantage de prestations incluses et un suivi plus régulier.
              </p>
            </div>

            {/* Desktop: 4 columns, staircase — Basic lowest (most top-margin), Excellence highest (no margin) */}
            <div className="hidden md:grid grid-cols-4 items-start gap-5 relative" data-anim="stagger" data-stagger="0.12">
              {/* Diagonal connecting line through the dots */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="prog-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d7dbe5" />
                    <stop offset="35%" stopColor="#cfd6e7" />
                    <stop offset="68%" stopColor="hsl(var(--accent))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" />
                  </linearGradient>
                </defs>
                {/* Line from dot 1 (bottom-left) to dot 4 (top-right), dots are at marginTop 180/120/60/0 + 21px center */}
                <line
                  x1="12.5%" y1={(180 + 21).toString()}
                  x2="87.5%" y2={(0 + 21).toString()}
                  stroke="url(#prog-line)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              {[
                { name: "Basic", price: "275 €", badge: "Conformité", tagline: "Être en règle", desc: "Le socle comptable et fiscal nécessaire pour respecter vos obligations.", mode: "Conseils à la demande", topPx: 180, dotBg: "bg-card border-border/80 text-primary" },
                { name: "Essentiel", price: "350 €", badge: "Visibilité", tagline: "Anticiper", desc: "Les premiers outils pour voir venir vos échéances et vos résultats.", mode: "Anticipation incluse", topPx: 120, dotBg: "bg-card border-border/80 text-primary" },
                { name: "Premium", price: "450 €", badge: "Performance", tagline: "Piloter", desc: "Un suivi régulier pour comprendre les écarts et améliorer les performances.", mode: "Pilotage régulier", premium: true, topPx: 60, dotBg: "bg-accent border-accent text-accent-foreground" },
                { name: "Excellence", price: "650 €", badge: "Trésorerie", tagline: "Optimiser", desc: "Un pilotage proactif pour améliorer les performances et sécuriser le cash.", mode: "Suivi proactif", topPx: 0, dotBg: "bg-primary border-primary text-primary-foreground" },
              ].map((stage, i) => (
                <div key={stage.name} className="relative z-[1]" style={{ marginTop: stage.topPx }}>
                  <div className={`w-[42px] h-[42px] rounded-full border-2 flex items-center justify-center font-bold text-[14px] mx-auto mb-4 relative z-10 ${stage.dotBg}`}>
                    {i + 1}
                  </div>
                  <article
                    data-tilt data-tilt-max="5"
                    className={`bg-card rounded-3xl p-5 shadow-[0_12px_28px_rgba(31,48,96,0.07)] relative flex flex-col ${
                      stage.premium
                        ? "border-2 border-accent shadow-[0_18px_38px_rgba(239,43,45,0.10)]"
                        : "border border-border/60"
                    }`}
                  >
                    {stage.premium && (
                      <span className="absolute -top-3.5 right-4 bg-accent text-accent-foreground rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.13em] uppercase">
                        Choix recommandé
                      </span>
                    )}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-muted-foreground font-body">
                        {stage.name} · {stage.price}
                      </span>
                      <span className="inline-flex items-center bg-secondary text-primary rounded-full px-2.5 py-1 text-[11px] font-bold font-body">
                        {stage.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-[28px] leading-none font-bold text-primary mb-2">{stage.tagline}</h3>
                    <p className="text-[13px] text-muted-foreground font-body leading-relaxed">{stage.desc}</p>
                    <div className="mt-auto pt-3 border-t border-border/40 text-[11px] text-accent font-bold font-body">
                      {stage.mode}
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden relative pl-[58px]" data-anim="stagger" data-stagger="0.1">
              {/* Vertical line */}
              <div className="absolute left-[24px] top-7 bottom-7 w-[3px] rounded-full" style={{ background: "linear-gradient(#dfe2e8 0% 45%, hsl(var(--accent)) 70%, hsl(var(--primary)) 100%)" }} aria-hidden="true" />

              <div className="space-y-5">
                {[
                  { name: "Basic", price: "275 €", badge: "Conformité", tagline: "Être en règle", desc: "Le socle comptable et fiscal nécessaire pour respecter vos obligations.", mode: "Conseils à la demande", dotBg: "bg-card border-border text-primary" },
                  { name: "Essentiel", price: "350 €", badge: "Visibilité", tagline: "Anticiper", desc: "Les premiers outils pour voir venir vos échéances et vos résultats.", mode: "Anticipation incluse", dotBg: "bg-card border-border text-primary" },
                  { name: "Premium", price: "450 €", badge: "Performance", tagline: "Piloter", desc: "Un suivi régulier pour comprendre les écarts et améliorer les performances.", mode: "Pilotage régulier", premium: true, dotBg: "bg-accent border-accent text-accent-foreground" },
                  { name: "Excellence", price: "650 €", badge: "Trésorerie", tagline: "Optimiser", desc: "Un pilotage proactif pour améliorer les performances et sécuriser le cash.", mode: "Suivi proactif", dotBg: "bg-primary border-primary text-primary-foreground" },
                ].map((stage, i) => (
                  <div key={stage.name} className="relative">
                    <div className={`absolute -left-[58px] top-[18px] w-[52px] h-[52px] rounded-full border-2 flex items-center justify-center font-bold text-[18px] z-10 ${stage.dotBg}`}>
                      {i + 1}
                    </div>
                    <article className={`bg-card rounded-3xl p-5 shadow-[0_12px_28px_rgba(31,48,96,0.07)] relative ${stage.premium ? "border-2 border-accent" : "border border-border/60"
                      }`}>
                      {stage.premium && (
                        <span className="absolute -top-3 right-4 bg-accent text-accent-foreground rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.13em] uppercase">
                          Choix recommandé
                        </span>
                      )}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-muted-foreground font-body">{stage.name} · {stage.price}</span>
                        <span className="inline-flex items-center bg-secondary text-primary rounded-full px-2.5 py-1 text-[11px] font-bold font-body">{stage.badge}</span>
                      </div>
                      <h3 className="font-display text-[28px] leading-none font-bold text-primary mb-2">{stage.tagline}</h3>
                      <p className="text-[13px] text-muted-foreground font-body">{stage.desc}</p>
                      <div className="mt-4 pt-3 border-t border-border/40 text-[11px] text-accent font-bold font-body">{stage.mode}</div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Axis bar */}
            <div data-anim="fade-up" data-delay="0.3" className="mt-8">
              {/* Desktop axis */}
              <div className="hidden md:flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-full px-6 py-4 max-w-[870px] mx-auto">
                {["À la demande", "Inclus", "Régulier", "Proactif"].map((label, i) => (
                  <span key={label} className="contents">
                    {i > 0 && <span className="text-primary-foreground/40 text-[14px]">→</span>}
                    <span className="font-bold text-[13px] font-body">{label}</span>
                  </span>
                ))}
              </div>
              {/* Mobile axis */}
              <div className="md:hidden bg-card border border-border/60 rounded-3xl overflow-hidden">
                {["À la demande", "Inclus", "Régulier", "Proactif"].map((label, i) => (
                  <div key={label} className={`flex items-center gap-2 px-4 py-3 text-[12px] font-bold text-primary font-body ${i < 3 ? "border-b border-border/30" : ""}`}>
                    <span className="text-accent">{i + 1}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div data-anim="fade-up" data-delay="0.4" className="max-w-[920px] mx-auto mt-8 p-5 border-l-4 border-accent bg-card rounded-r-2xl shadow-[0_10px_25px_rgba(31,48,96,0.05)]">
              <p className="text-[13px] md:text-[14px] text-muted-foreground font-body leading-relaxed">
                <strong className="text-primary">Avec Basic, vous commandez les conseils lorsque vous en avez besoin.</strong>{" "}
                Avec les forfaits supérieurs, nous les intégrons progressivement à votre accompagnement afin d'anticiper vos besoins avant qu'ils ne deviennent urgents.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 — Diagnostic ── */}
        <section id="diagnostic" className="py-10 md:py-14 bg-secondary/50 relative overflow-hidden">
          <span
            aria-hidden="true" data-anim="text-scrub" data-scrub-dir="right"
            className="absolute inset-x-0 top-12 text-center font-display italic font-bold text-[140px] md:text-[220px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
          >
            Choix
          </span>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5 border-l-2 border-accent pl-4">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 02</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Diagnostic</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Quel niveau d'accompagnement correspond réellement à votre entreprise ?
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed max-w-[680px] mx-auto" data-anim="fade-up" data-delay="0.2">
                Répondez à quatre questions pour identifier le forfait adapté à vos besoins actuels et à vos objectifs.
              </p>
            </div>

            <div data-anim="fade-up" data-delay="0.3">
              <DiagnosticQuiz />
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — Détail forfaits (3 cards) ── */}
        <section className="py-10 md:py-14 relative overflow-hidden bg-secondary/50">
          <span
            aria-hidden="true" data-anim="text-scrub" data-scrub-dir="right"
            className="absolute inset-x-0 top-12 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
          >
            Choisir
          </span>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5 border-l-2 border-accent pl-4">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 03</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Forfaits</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Le prix reflète aussi le niveau d'accompagnement.
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed max-w-[680px] mx-auto" data-anim="fade-up" data-delay="0.2">
                Vous ne payez pas seulement davantage de prestations : vous payez pour qu'elles soient prévues, intégrées à une méthode et réalisées avec une fréquence adaptée.
              </p>
            </div>

            {/* ── Mobile: 4 cards in order (Basic first) ── */}
            <div className="md:hidden flex flex-col gap-5" data-anim="stagger" data-stagger="0.1">
              {plans.map((plan) => {
                const isPopular = (plan as typeof plans[number] & { popular?: boolean }).popular;
                return (
                  <article
                    key={plan.name}
                    className={`bg-card rounded-3xl p-6 shadow-[0_12px_28px_rgba(31,48,96,0.07)] relative flex flex-col ${
                      isPopular ? "border-2 border-accent shadow-[0_18px_38px_rgba(239,43,45,0.10)]" : "border border-border/60"
                    }`}
                  >
                    {isPopular && (
                      <span className="absolute -top-3 right-4 bg-accent text-accent-foreground rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.13em] uppercase">
                        Populaire
                      </span>
                    )}
                    <span className="font-body text-[11px] font-bold tracking-[0.13em] uppercase text-accent mb-2 block">{plan.profile}</span>
                    <h3 className="font-display text-[28px] leading-none font-bold text-primary mb-1">{plan.name}</h3>
                    <p className="text-accent text-[13px] italic font-body mb-3">{plan.tagline}</p>
                    <div className="flex items-baseline gap-1.5 mb-4 font-display font-bold text-primary text-[32px] leading-none tracking-tight">
                      {plan.price}€
                      <span className="text-[12px] font-body font-semibold text-muted-foreground">/mois HTVA</span>
                    </div>
                    <p className="text-[14px] leading-[1.75] font-body text-muted-foreground mb-4">{plan.desc}</p>
                    <hr className="border-border/60" />
                    <div className="mt-auto pt-4">
                      <p className="text-primary text-[12px] font-bold font-body mb-4">{plan.mode}</p>
                      <Link
                        to={`/contact/?forfait=${encodeURIComponent(plan.name)}`}
                        className={`block whitespace-nowrap font-bold px-6 py-3 rounded-full transition-colors duration-300 shadow-lg text-[14px] text-center ${
                          isPopular ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        Choisir {plan.name}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ── Desktop: stepped cards (Essentiel/Premium/Excellence) + Basic bar ── */}
            <div className="hidden md:flex flex-col gap-8" data-anim="stagger" data-stagger="0.1">
              {(() => {
                const basicPlan = plans.find((p) => p.name === "Basic")!;
                const topPlans = plans.filter((p) => p.name !== "Basic");
                const topMeta = [
                  { height: "min-h-[400px]", padding: "p-8", priceSize: "text-[44px]", textSize: "text-[14px]", scale: "" },
                  { height: "min-h-[500px]", padding: "p-10", priceSize: "text-[56px]", textSize: "text-[17px]", scale: "md:scale-105 md:origin-bottom z-10" },
                  { height: "min-h-[600px]", padding: "p-12", priceSize: "text-[68px]", textSize: "text-[19px]", scale: "" },
                ];
                return (
                  <>
                    {/* Stepped upper cards */}
                    <div className="grid grid-cols-3 items-end gap-6">
                      {topPlans.map((plan, i) => {
                        const meta = topMeta[i];
                        const isPopular = plan.popular;
                        return (
                          <div key={plan.name} className={`relative ${meta.scale}`}>
                            {isPopular && (
                              <span className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-accent text-accent-foreground text-[10px] font-bold tracking-[0.15em] px-3 py-1 rounded-full shadow-md">
                                POPULAIRE
                              </span>
                            )}
                            <div
                              className={`bg-card border-2 border-border/50 rounded-3xl ${meta.padding} shadow-xl flex flex-col transition-all duration-300 hover:border-accent hover:shadow-[0_24px_60px_rgba(27,43,94,0.12)] ${meta.height} overflow-hidden`}
                            >
                              <div className="flex-1">
                                <span className="font-body text-[11px] font-bold tracking-[0.13em] uppercase text-accent mb-3 block">
                                  {plan.profile}
                                </span>
                                <h3 className="font-display text-[38px] leading-none font-bold text-primary mb-1.5">
                                  {plan.name}
                                </h3>
                                <p className="text-accent text-[14px] italic font-body mb-4">{plan.tagline}</p>
                                <div className={`flex items-baseline gap-1.5 mb-5 ${meta.priceSize} font-display font-bold text-primary leading-none tracking-tight`}>
                                  {plan.price}€
                                  <span className="text-[12px] font-body font-semibold text-muted-foreground">/mois HTVA</span>
                                </div>
                                <p className={`${meta.textSize} leading-[1.75] font-body text-muted-foreground`}>
                                  {plan.desc}
                                </p>
                              </div>
                              <div className="mt-auto pt-4 border-t border-border/40">
                                <p className="text-primary text-[12px] font-bold font-body mb-5">{plan.mode}</p>
                                <Link
                                  to={`/contact/?forfait=${encodeURIComponent(plan.name)}`}
                                  className={`block whitespace-nowrap font-bold px-6 py-3 rounded-full transition-colors duration-300 shadow-lg text-[14px] text-center ${isPopular
                                      ? "bg-accent text-accent-foreground hover:bg-accent-hover"
                                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                                    }`}
                                >
                                  Choisir {plan.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Basic bar */}
                    <div className="relative group">
                      <div className="relative bg-background rounded-2xl px-10 py-8 flex flex-row items-center justify-between gap-6 shadow-lg border border-border/60">
                        <div className="flex flex-row items-center gap-8 lg:gap-12 flex-1">
                          <div className="text-left">
                            <span className="text-accent font-bold text-[11px] uppercase tracking-[0.13em] block mb-1">{basicPlan.profile}</span>
                            <span className="font-display text-[32px] font-bold text-primary leading-none block">{basicPlan.name}</span>
                            <p className="text-accent text-[13px] italic font-body mt-1">{basicPlan.tagline}</p>
                            <div className="flex items-baseline gap-1.5 text-primary font-display font-bold text-4xl mt-2">
                              {basicPlan.price}€
                              <span className="text-[12px] font-body font-semibold text-muted-foreground">/mois HTVA</span>
                            </div>
                          </div>
                          <div className="max-w-xl text-left">
                            <p className="text-foreground/80 text-[14px] leading-relaxed font-body mb-2">
                              {basicPlan.desc}
                            </p>
                            <p className="text-primary text-[12px] font-bold font-body">{basicPlan.mode}</p>
                          </div>
                        </div>
                        <Link
                          to="/contact/?forfait=Basic"
                          className="whitespace-nowrap bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors duration-300 shadow-lg text-[14px]"
                        >
                          Choisir Basic
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            <p className="text-center mt-8 text-[13px] text-muted-foreground font-body" data-anim="fade-up" data-delay="0.4">
              Votre société est en veille ?{" "}
              <Link to="/societe-en-veille/" className="text-accent font-semibold hover:underline">
                Découvrez notre formule dédiée
              </Link>.
            </p>
          </div>
        </section>

        {/* ── SECTION 4 — Tableau comparatif ── */}
        <section id="forfaits" className="py-10 md:py-14 bg-card relative overflow-hidden">
          <span
            aria-hidden="true" data-anim="text-scrub"
            className="absolute inset-x-0 top-12 text-center font-display italic font-bold text-[140px] md:text-[220px] leading-none text-accent/[0.035] pointer-events-none select-none whitespace-nowrap"
          >
            Comparer
          </span>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5 border-l-2 border-accent pl-4">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 04</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Comparatif</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Nos quatre forfaits.
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed max-w-[680px] mx-auto" data-anim="fade-up" data-delay="0.2">
                Une lecture côte à côte, pour choisir en quelques secondes le niveau d'accompagnement qui vous correspond.
              </p>
            </div>

            <div data-anim="fade-up" data-delay="0.3">
              {/* Desktop table (lg+) */}
              <div className="hidden lg:block rounded-2xl overflow-visible bg-white border border-slate-200 shadow-xs">
                <table className="w-full text-[14px] border-collapse" style={{ borderSpacing: 0 }}>
                  <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "18%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th colSpan={2} className="p-6 pb-7 text-left align-middle border-b border-r border-slate-200 bg-white">
                        <p className="font-body text-[20px] leading-snug tracking-tight">
                          <strong className="block text-[22px] font-body font-bold text-[#1b2559]">4 niveaux d'accompagnement,</strong>
                          <span className="font-normal text-slate-500 text-[16px] font-body">une progression logique.</span>
                        </p>
                      </th>
                      {[
                        { num: "01", name: "Basic", tagline: "Être en règle", price: "275 €", prefix: "", accent: false, recommended: false },
                        { num: "02", name: "Essentiel", tagline: "Anticiper", price: "350 €", prefix: "À partir de ", accent: false, recommended: false },
                        { num: "03", name: "Premium", tagline: "Piloter", price: "450 €", prefix: "À partir de ", accent: true, recommended: true },
                        { num: "04", name: "Excellence", tagline: "Optimiser", price: "650 €", prefix: "À partir de ", accent: false, recommended: false },
                      ].map((plan) => (
                        <th
                          key={plan.name}
                          className={`p-5 pb-6 text-center align-top relative border-b border-r border-slate-200 ${
                            plan.recommended
                              ? "border-x-2 border-t-2 border-[#fca5a5] bg-[#fff5f5]/60 rounded-t-2xl border-r-[#fca5a5]"
                              : "bg-white"
                          }`}
                        >
                          {plan.recommended && (
                            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-md uppercase z-20 shadow-xs">
                              RECOMMANDÉ
                            </span>
                          )}
                          <span className={`block font-body text-[11px] font-bold tracking-[0.2em] mb-1 mt-1 ${plan.recommended ? "text-[#dc2626]" : "text-slate-400"}`}>
                            {plan.num}
                          </span>
                          <span className={`block font-display font-bold leading-none ${plan.accent ? "text-[#dc2626] text-[28px]" : "text-[#1b2559] text-[26px]"}`}>
                            {plan.name}
                          </span>
                          <span className="block font-body text-[13px] font-bold text-[#1b2559] mt-2 mb-3">
                            {plan.tagline}
                          </span>
                          <span className="block font-body text-[13px] text-slate-600">
                            {plan.prefix && <span className="text-[11px] text-slate-500">{plan.prefix}</span>}
                            <strong className={`text-[20px] font-display font-bold ${plan.accent ? "text-[#dc2626]" : "text-[#1b2559]"}`}>{plan.price}</strong>
                            <span className="text-[11px] text-slate-500 font-body"> / mois HTVA</span>
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareCategories.flatMap((cat, catIdx) => {
                      const catIcons = [
                        { Icon: ShieldCheck, bg: "bg-[#2563eb]", color: "text-white", labelColor: "text-[#1d4ed8]", cellBg: "#eff6ff" },
                        { Icon: CalendarDays, bg: "bg-[#dc2626]", color: "text-white", labelColor: "text-[#dc2626]", cellBg: "#fef2f2" },
                        { Icon: TrendingUp, bg: "bg-[#16a34a]", color: "text-white", labelColor: "text-[#15803d]", cellBg: "#f0fdf4" },
                        { Icon: PieChart, bg: "bg-[#ea580c]", color: "text-white", labelColor: "text-[#c2410c]", cellBg: "#fff7ed" },
                        { Icon: Users, bg: "bg-[#9333ea]", color: "text-white", labelColor: "text-[#7e22ce]", cellBg: "#faf5ff" },
                      ];
                      const catStyle = catIcons[catIdx];
                      const isLastCat = catIdx === compareCategories.length - 1;
                      const isRelationClient = catIdx === 4;

                      return cat.rows.map((row, ri) => {
                        const isFirstRow = ri === 0;
                        const isLastRow = ri === cat.rows.length - 1;
                        const isLastCatLastRow = isLastCat && isLastRow;

                        return (
                          <tr
                            key={`${cat.num}-${ri}`}
                            className={`transition-colors hover:bg-slate-50/50 ${!isLastCatLastRow ? "border-b border-slate-200" : ""}`}
                            style={cat.rows.length === 1 ? { height: "110px" } : undefined}
                          >
                            {isFirstRow && (
                              <td
                                rowSpan={cat.rows.length}
                                className="p-4 text-center align-middle border-r border-b border-slate-200"
                                style={{ backgroundColor: catStyle.cellBg }}
                              >
                                <div className="flex flex-col items-center gap-2">
                                  <div className={`w-10 h-10 rounded-full ${catStyle.bg} flex items-center justify-center shadow-xs`}>
                                    <catStyle.Icon size={20} className={catStyle.color} strokeWidth={2} />
                                  </div>
                                  <span className={`font-body text-[10px] font-extrabold tracking-wider uppercase leading-tight text-center whitespace-pre-line ${catStyle.labelColor}`}>
                                    {cat.title}
                                  </span>
                                </div>
                              </td>
                            )}
                            <td className="p-4 pl-5 font-semibold text-[#1b2559] font-body text-[13px] border-r border-slate-200 whitespace-pre-line bg-white">
                              {row.label}
                            </td>
                            {row.values.map((v, ci) => {
                              const isPremium = ci === 2;

                              const isExcellence = ci === 3;
                              const freqColor = isExcellence ? "text-[#dc2626]" : "text-[#1b2559]";

                              let content;
                              if (v === true) {
                                content = <Check size={22} className="text-[#dc2626] mx-auto" strokeWidth={3} />;
                              } else if (v === "À la demande" && !isRelationClient) {
                                content = (
                                  <span className="inline-block border border-[#fde68a] bg-[#fffbeb] rounded-xl px-3.5 py-2 font-body text-[11px] font-bold leading-snug text-center text-[#92400e]">
                                    À la demande<br />150 €/h
                                  </span>
                                );
                              } else if (v === "Non incluse") {
                                content = (
                                  <span className="inline-block font-body text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200/80 rounded-lg px-3 py-1">
                                    Non incluse
                                  </span>
                                );
                              } else if (typeof v === "string" && /^(Semestrielles|Trimestrielles|Mensuelles)$/.test(v)) {
                                content = (
                                  <div className="text-center">
                                    <span className={`font-body font-bold ${freqColor} text-[14px]`}>{v}</span>
                                    <span className="font-body text-[12px] text-slate-500 block">incluses</span>
                                  </div>
                                );
                              } else if (typeof v === "string" && /^(Trimestriel|Mensuel)$/.test(v)) {
                                content = (
                                  <div className="text-center">
                                    <span className={`font-body font-bold ${freqColor} text-[14px]`}>{v}</span>
                                    <span className="font-body text-[12px] text-slate-500 block">inclus</span>
                                  </div>
                                );
                              } else if (typeof v === "string" && v === "Mensuelle") {
                                content = (
                                  <div className="text-center">
                                    <span className="font-body font-bold text-[#dc2626] text-[14px]">Mensuelle</span>
                                    <span className="font-body text-[12px] text-slate-500 block">incluse</span>
                                  </div>
                                );
                              } else if (isRelationClient && typeof v === "string") {
                                const relationDescs: Record<string, string> = {
                                  "À la demande": "Vous contactez\nquand vous en avez besoin.",
                                  "Périodique": "Des points planifiés\nà intervalles réguliers.",
                                  "Régulier": "Un suivi fréquent pour\npiloter vos performances.",
                                  "Proactif": "Nous anticipons vos besoins\net sécurisons vos décisions.",
                                };
                                const badgeStyles: Record<string, string> = {
                                  "À la demande": "bg-red-50 text-[#dc2626] border-red-300",
                                  "Périodique": "bg-blue-50 text-[#2563eb] border-blue-300",
                                  "Régulier": "bg-green-50 text-[#16a34a] border-green-300",
                                  "Proactif": "bg-blue-50 text-[#2563eb] border-blue-300",
                                };
                                content = (
                                  <div className="text-center">
                                    <span className={`inline-block font-body text-[11px] font-bold border rounded-full px-3.5 py-1.5 ${badgeStyles[v] || ""}`}>
                                      {v}
                                    </span>
                                    {relationDescs[v] && (
                                      <p className="font-body text-[11px] text-slate-500 mt-2 leading-snug whitespace-pre-line">
                                        {relationDescs[v]}
                                      </p>
                                    )}
                                  </div>
                                );
                              } else {
                                content = <CellValue v={v === null ? "—" : v} />;
                              }

                              return (
                                <td
                                  key={ci}
                                  className={`p-4 text-center align-middle border-r border-slate-200 ${
                                    isPremium
                                      ? `border-x-2 border-[#fca5a5] bg-[#fff5f5]/60 ${isLastCatLastRow ? "border-b-2 border-[#fca5a5] rounded-b-2xl" : ""}`
                                      : "bg-white"
                                  }`}
                                >
                                  {content}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tablet layout (sm → lg) */}
              <div className="hidden sm:block lg:hidden space-y-5">
                {/* Prix tablet */}
                <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-sm">
                  <p className="text-[14px] font-semibold text-foreground mb-5 font-body">{priceRow.label}</p>
                  <div className="grid grid-cols-4 gap-3">
                    {priceRow.values.map((v, ci) => (
                      <div key={ci} className={`text-center rounded-xl p-4 ${ci === 3 ? "bg-primary/[0.06] ring-1 ring-accent/20" : "bg-secondary/40"}`}>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-2.5 font-body ${ci === 3 ? "text-accent" : "text-muted-foreground"}`}>{planNames[ci]}</p>
                        <CellValue v={v} isPrice />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Categorised tablet */}
                {compareCategories.map((cat) => (
                  <div key={cat.num} className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
                    <div className="relative flex items-center gap-3 px-6 py-4 border-b border-border/30" style={{ backgroundColor: cat.color }}>
                      <span className="absolute left-0 inset-y-0 w-[3px] rounded-l-2xl" style={{ backgroundColor: cat.barColor }} />
                      <span className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center font-display italic text-primary text-[13px] font-bold flex-shrink-0">{cat.num}</span>
                      <span className="font-display text-[13px] font-bold text-primary tracking-[0.1em] uppercase whitespace-pre-line">{cat.title}</span>
                    </div>
                    <div className="divide-y divide-border/20">
                      {cat.rows.map((row) => (
                        <div key={row.label} className="px-6 py-5">
                          <p className="text-[14px] font-semibold text-foreground mb-4 font-body">{row.label}</p>
                          <div className="grid grid-cols-4 gap-3">
                            {row.values.map((v, ci) => (
                              <div key={ci} className={`text-center rounded-xl p-3 ${ci === 3 ? "bg-primary/[0.06] ring-1 ring-accent/20" : "bg-secondary/40"}`}>
                                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 font-body ${ci === 3 ? "text-accent" : "text-muted-foreground"}`}>{planNames[ci]}</p>
                                <CellValue v={v ?? "—"} />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Mobile/Tablet vertical comparatif (< lg) ── */}
              <div className="lg:hidden space-y-4">
                {/* Socle commun — Conformité */}
                <article className="bg-card rounded-3xl border border-border/50 p-5 shadow-[0_14px_34px_rgba(31,48,96,0.07)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-[14px] bg-[#3d84ff] text-white flex items-center justify-center flex-shrink-0">
                      <Check size={20} strokeWidth={3} />
                    </span>
                    <div>
                      <span className="block text-[9px] font-bold tracking-[0.15em] uppercase text-muted-foreground font-body">Socle commun</span>
                      <h3 className="font-display text-[22px] leading-[1.05] font-bold text-primary mt-0.5">Inclus dans les 4 forfaits</h3>
                    </div>
                  </div>
                  <div className="grid gap-2 bg-[#f8faff] rounded-2xl p-4">
                    {compareCategories[0].rows.map((row) => (
                      <span key={row.label} className="text-[12.5px] font-bold text-primary font-body flex items-center gap-2">
                        <Check size={14} className="text-accent flex-shrink-0" strokeWidth={3} />
                        {row.label}
                      </span>
                    ))}
                  </div>
                </article>

                {/* Criterion cards — skip Conformité (index 0) */}
                {compareCategories.slice(1).map((cat, catIdx) => {
                  const catColors = [
                    { accent: "#ff6678", tint: "#fff4f5", label: "Anticipation" },
                    { accent: "#53bd85", tint: "#f1fbf6", label: "Développement" },
                    { accent: "#ffad42", tint: "#fff8ef", label: "Optimisation de la trésorerie" },
                    { accent: "#8f6dd8", tint: "#f7f3ff", label: "Relation client" },
                  ];
                  const cc = catColors[catIdx];
                  const isRelationClient = catIdx === 3;

                  return cat.rows.map((row) => (
                    <article key={`${cat.num}-${row.label}`} className="bg-card rounded-3xl border border-border/50 shadow-[0_14px_34px_rgba(31,48,96,0.07)] overflow-hidden">
                      {/* Header */}
                      <header
                        className="flex items-center gap-3 px-[18px] py-[17px] border-l-4"
                        style={{ borderLeftColor: cc.accent, background: `linear-gradient(90deg, ${cc.tint}, #fff)` }}
                      >
                        <span className="w-10 h-10 rounded-[14px] text-white flex items-center justify-center flex-shrink-0 text-[12px] font-bold font-body" style={{ background: cc.accent }}>
                          {String(catIdx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span className="block text-[9px] font-bold tracking-[0.15em] uppercase font-body" style={{ color: cc.accent }}>{cc.label}</span>
                          <h3 className="font-display text-[20px] sm:text-[22px] leading-[1.05] font-bold text-primary mt-0.5">{row.label.replace(/\n/g, " ")}</h3>
                        </div>
                      </header>

                      {/* Plan rows */}
                      {plans.map((plan, pi) => {
                        const v = row.values[pi];
                        const isPremium = pi === 2;

                        let valueContent;
                        if (v === true) {
                          valueContent = <Check size={16} className="text-accent" strokeWidth={3} />;
                        } else if (v === "À la demande" && !isRelationClient) {
                          valueContent = (
                            <span className="inline-flex items-center gap-1 rounded-full px-[10px] py-[7px] text-[9px] font-bold bg-[#fffaf0] border border-[#f2c35d] text-[#c96800] whitespace-nowrap">
                              À la demande <span className="text-[8px]">150 €/h</span>
                            </span>
                          );
                        } else if (v === "Non incluse") {
                          valueContent = (
                            <span className="inline-flex rounded-full px-[10px] py-[7px] text-[9px] font-bold bg-[#eef2f7] border border-[#dbe2ec] text-[#6d7a93] whitespace-nowrap">
                              Non incluse
                            </span>
                          );
                        } else if (typeof v === "string" && /^(Semestrielles|Trimestrielles|Mensuelles|Trimestriel|Mensuel|Mensuelle)$/i.test(v)) {
                          valueContent = <strong className="text-[13px] text-accent font-body">{v}</strong>;
                        } else if (isRelationClient && typeof v === "string") {
                          const followDescs: Record<string, string> = {
                            "À la demande": "Vous nous contactez lorsque vous en avez besoin.",
                            "Périodique": "Des points planifiés à intervalles réguliers.",
                            "Régulier": "Un suivi fréquent pour piloter vos performances.",
                            "Proactif": "Nous anticipons vos besoins et sécurisons vos décisions.",
                          };
                          const followPills: Record<string, string> = {
                            "À la demande": "bg-[#fffaf0] border-[#f2c35d] text-[#c96800]",
                            "Périodique": "bg-[#ecfbf3] border-[#a8e9c6] text-[#148c56]",
                            "Régulier": "bg-[#ecfbf3] border-[#a8e9c6] text-[#148c56]",
                            "Proactif": "bg-[#ecfbf3] border-[#a8e9c6] text-[#148c56]",
                          };
                          valueContent = (
                            <div className="flex flex-col items-end gap-[5px] text-right max-w-[62%]">
                              {isPremium && <span className="inline-flex bg-accent text-white rounded-full px-[7px] py-[4px] text-[7.5px] font-bold tracking-[0.08em] uppercase whitespace-nowrap">Recommandé</span>}
                              <span className={`inline-flex rounded-full px-[10px] py-[7px] text-[9px] font-bold border whitespace-nowrap ${followPills[v] || ""}`}>{v}</span>
                              {followDescs[v] && <p className="text-[9.5px] text-muted-foreground leading-[1.45] font-body m-0">{followDescs[v]}</p>}
                            </div>
                          );
                        } else {
                          valueContent = <CellValue v={v ?? "—"} />;
                        }

                        return (
                          <div
                            key={plan.name}
                            className={`flex items-center justify-between gap-3 min-h-[70px] px-[17px] py-[13px] border-t border-[#eef0f4] ${
                              isPremium ? "bg-[#fffafa] shadow-[inset_3px_0_0_var(--accent)]" : "bg-white"
                            } ${isRelationClient ? "items-start pt-[14px] pb-[14px]" : ""}`}
                          >
                            <div className="min-w-[95px] flex flex-col gap-[2px]">
                              <b className="text-[12px] tracking-[0.02em] text-primary font-body">{plan.name}</b>
                              <small className="text-[9.5px] text-muted-foreground font-body">{pi === 0 ? `${plan.price} €` : `Dès ${plan.price} €`}</small>
                            </div>
                            {!isRelationClient && isPremium ? (
                              <div className="flex flex-col items-end gap-[5px]">
                                <span className="inline-flex bg-accent text-white rounded-full px-[7px] py-[4px] text-[7.5px] font-bold tracking-[0.08em] uppercase whitespace-nowrap">Recommandé</span>
                                {valueContent}
                              </div>
                            ) : (
                              valueContent
                            )}
                          </div>
                        );
                      })}
                    </article>
                  ));
                })}

                {/* Legend */}
                <div className="grid gap-2 px-1 text-[10px] text-muted-foreground font-body">
                  <span className="flex items-center gap-2"><span className="w-[10px] h-[10px] rounded-full bg-[#f2c35d] flex-shrink-0" /> À la demande = 150 €/h</span>
                  <span className="flex items-center gap-2"><span className="w-[10px] h-[10px] rounded-full bg-[#cfd7e3] flex-shrink-0" /> Non inclus dans le forfait</span>
                  <span className="flex items-center gap-2"><span className="w-[10px] h-[10px] rounded-full bg-[#8ee1b5] flex-shrink-0" /> Suivi intégré</span>
                </div>

                {/* Note */}
                <div className="flex gap-3 items-start p-[17px] border border-[#d9e2ef] bg-gradient-to-b from-[#fbfdff] to-[#f5f9ff] rounded-[19px]">
                  <span className="w-[30px] h-[30px] rounded-full bg-[#3d84ff] text-white flex items-center justify-center flex-shrink-0 font-display font-bold text-[17px]">i</span>
                  <p className="text-[10.5px] leading-[1.6] text-[#456083] font-body m-0">
                    <strong className="text-primary">Chaque niveau enrichit le précédent.</strong> Avec Basic, vous commandez les conseils lorsque vous en avez besoin. Les forfaits supérieurs intègrent progressivement ces prestations avec une fréquence plus soutenue.
                  </p>
                </div>
              </div>
            </div>

            {/* Légende */}
            <div data-anim="fade-up" data-delay="0.4" className="hidden lg:block">
              <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 mt-6 py-4 px-8 text-[13px] font-body text-slate-600 bg-white border border-slate-200 rounded-xl shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">LÉGENDE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-[#dc2626]" strokeWidth={3} />
                  <span className="text-slate-700 font-medium">Inclus dans le forfait</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block border border-[#fde68a] bg-[#fffbeb] rounded-full px-3 py-1 text-[#b45309] font-bold text-[11px]">
                    À la demande <span className="text-[#dc2626]">150 €/h</span>
                  </span>
                  <span className="text-slate-700 font-medium">Prestation facturée à l'heure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-slate-100 text-slate-500 border border-slate-200/80 rounded-full px-3 py-1 text-[11px] font-semibold">
                    Non incluse
                  </span>
                  <span className="text-slate-700 font-medium">Non incluse dans le forfait</span>
                </div>
              </div>
            </div>

            {/* Info box + Besoin d'aide — single bar */}
            <div data-anim="fade-up" data-delay="0.5" className="hidden lg:flex items-center gap-6 mt-5 bg-[#f0f4fa] border border-[#dce3ef] rounded-2xl px-6 py-5">
              <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center flex-shrink-0">
                <Info size={20} strokeWidth={2.5} />
              </div>
              <p className="flex-1 text-[13px] text-slate-600 font-body leading-relaxed">
                Chaque niveau enrichit le précédent avec davantage de prestations incluses et un suivi plus fréquent.<br />
                Avec Basic, vous commandez les conseils lorsque vous en avez besoin. Avec les forfaits supérieurs,{" "}
                nous intégrons progressivement ces prestations à votre accompagnement afin d'anticiper vos besoins avant qu'ils ne deviennent urgents.
              </p>
              <div className="flex items-center gap-3 flex-shrink-0 border-l border-slate-300/60 pl-6">
                <div className="w-10 h-10 rounded-xl bg-white border border-red-200/60 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-accent" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-display font-bold text-primary text-[14px] leading-tight">Besoin d'aide pour choisir ?</p>
                  <p className="text-[12px] text-slate-500 font-body mt-0.5">
                    <Link to="/contact/" className="text-slate-600 hover:underline">Contactez-nous, nous vous conseillons.</Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile/tablet bottom notes */}
            <div data-anim="fade-up" data-delay="0.4" className="lg:hidden">
              <p className="text-center mt-3 text-[13px] text-muted-foreground font-body">
                <strong className="text-amber-700 not-italic">À la demande</strong> = prestations facturées à <strong className="text-foreground not-italic">150 € HTVA / heure</strong>, disponibles sur demande pour aller plus loin.
              </p>
              <p className="text-center mt-3 text-[13px] text-muted-foreground italic font-body">
                Les structures non assujetties à la TVA (ASBL, certaines professions médicales) bénéficient d'une <strong className="text-foreground not-italic">réduction de 21 %</strong>.
              </p>
              <p className="text-center mt-4 text-[13px] text-muted-foreground font-body">
                Votre société est en veille ? <Link to="/societe-en-veille/" className="font-semibold text-accent underline underline-offset-2 hover:text-accent/80 transition-colors">Découvrez notre formule dédiée</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 5 — DAF option (split card éditorial) ── */}
        <section className="py-10 md:py-14 relative overflow-hidden">
          <div className="container-mf">
            <div data-anim="fade-up" className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.5)] border border-primary-foreground/10">
              {/* Watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -top-6 -right-4 font-display italic text-primary-foreground/[0.06] text-[120px] md:text-[200px] leading-none tracking-tight"
              >
                DAF
              </span>
              <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

              <div className="relative grid md:grid-cols-[1fr_1.3fr] gap-0">
                {/* Colonne gauche — visuel + badge */}
                <div className="p-5 md:p-12 border-b md:border-b-0 md:border-r border-primary-foreground/10 flex md:flex-col items-center md:items-start gap-4 md:gap-0 md:justify-center">
                  <div className="hidden md:inline-flex items-center gap-2 mb-5">
                    <Sparkles size={14} className="text-accent" strokeWidth={1.5} />
                    <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">Option Excellence</span>
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-accent/15 ring-1 ring-accent/30 flex items-center justify-center md:mb-6 flex-shrink-0">
                    <Users size={22} className="text-accent md:hidden" strokeWidth={1.5} />
                    <Users size={28} className="text-accent hidden md:block" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="md:hidden font-body text-[10px] font-bold tracking-[0.2em] uppercase text-accent block mb-1">Option Excellence</span>
                    <span className="font-display text-[32px] md:text-[56px] font-bold text-primary-foreground leading-none tracking-tight">
                      150€
                    </span>
                    <span className="text-primary-foreground/60 text-[12px] md:text-[13px] font-body mt-0.5 block">HTVA / heure</span>
                  </div>
                </div>

                {/* Colonne droite — narration */}
                <div className="p-5 md:p-12 flex flex-col justify-center">
                  <h2 className="font-display text-[22px] md:text-[36px] text-primary-foreground leading-[1.15] tracking-tight">
                    Le DAF à temps partiel : <span className="italic font-light text-accent">au plus près de vos décisions</span>
                  </h2>
                  <p className="text-primary-foreground/75 text-[14px] md:text-[15px] leading-[1.7] md:leading-[1.8] mt-4 md:mt-5 font-body">
                    Réservé exclusivement aux clients <strong className="text-primary-foreground">Excellence</strong>. Réunion mensuelle de pilotage, disponibilité ad hoc lors des moments critiques, vision stratégique partagée : comme un directeur financier interne, sans le coût fixe.
                  </p>
                  <div>
                    <Button variant="accent" size="lg" className="rounded-full mt-7 pl-6 pr-3 group text-[14px]" asChild>
                      <Link to="/services/daf-externalise/">
                        <span className="flex items-center gap-3">
                          En savoir plus
                          <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform">
                            <ArrowUpRight size={14} />
                          </span>
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6 — Missions ponctuelles ── */}
        <section className="py-10 md:py-14 bg-secondary relative overflow-hidden">
          <span
            aria-hidden="true" data-anim="text-scrub"
            className="absolute inset-x-0 top-12 text-center font-display italic font-bold text-[140px] md:text-[220px] leading-none text-primary/[0.035] pointer-events-none select-none whitespace-nowrap"
          >
            Ponctuel
          </span>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5 border-l-2 border-accent pl-4">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 05</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Au-delà des forfaits</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Missions ponctuelles.
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed max-w-[680px] mx-auto" data-anim="fade-up" data-delay="0.2">
                Pour les besoins spécifiques qui s'ajoutent ou se substituent à un forfait mensuel.
              </p>
            </div>

            <div data-anim="fade-up" data-delay="0.3" className="max-w-[900px] mx-auto">
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-3xl border border-border/60 overflow-hidden shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.2)]">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-border/40 bg-gradient-to-b from-secondary/60 to-secondary/20">
                      <th className="text-left p-5 pl-7 font-body font-bold text-foreground/70 text-[10px] uppercase tracking-[0.25em]">Mission</th>
                      <th className="text-right p-5 pr-7 font-body font-bold text-foreground/70 text-[10px] uppercase tracking-[0.25em]">Tarif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missions.map((m, i) => (
                      <tr key={i} className="border-b border-border/20 last:border-0 transition-colors hover:bg-secondary/40 group">
                        <td className="p-5 pl-7 font-medium text-foreground/85 font-body">
                          <span className="inline-flex items-center gap-3">
                            <span className="font-display italic text-accent/50 text-[13px] w-5">0{i + 1}</span>
                            {m.label}
                          </span>
                        </td>
                        <td className="p-5 pr-7 text-right font-display font-bold text-primary text-[16px]">{m.tarif}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {missions.map((m, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border/50 p-4 shadow-sm">
                    <span className="font-display italic text-accent text-[12px]">0{i + 1}</span>
                    <p className="text-[14px] font-medium text-foreground/85 font-body mb-2 mt-1">{m.label}</p>
                    <p className="font-display text-[18px] font-bold text-primary">{m.tarif}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-anim="fade-up" data-delay="0.4" className="max-w-[900px] mx-auto">
              <div className="bg-card rounded-2xl p-6 sm:p-8 mt-6 border border-border/50 flex flex-col md:flex-row gap-5 items-start relative overflow-hidden">
                <Quote size={32} className="text-accent/30 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-[14.5px] text-muted-foreground font-body leading-relaxed">
                  Nos partenariats s'inscrivent dans la durée — et c'est ce qui les rend efficaces. Un an ensemble, c'est le temps nécessaire pour vraiment vous connaître&nbsp;: votre saisonnalité, vos tensions récurrentes, vos objectifs. Le préavis de 3 mois n'est pas une contrainte, c'est le délai qui nous permet de vous passer la main dans les meilleures conditions si vous le souhaitez.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION TÉMOIGNAGE ── */}
        <section className="py-10 md:py-14 bg-card relative overflow-hidden">
          <div className="container-mf max-w-[800px]">
            <div data-anim="fade-up">
              <figure className="bg-background rounded-3xl p-8 md:p-12 border border-border/50 relative shadow-[0_8px_30px_rgba(27,43,94,0.04)]">
                <Quote size={40} className="text-accent/30 absolute top-6 left-6" strokeWidth={1.5} aria-hidden="true" />
                <blockquote className="font-display italic text-[22px] md:text-[28px] leading-snug text-primary text-center pt-6">
                  «&nbsp;J'hésitais à quitter mon comptable low cost. En 6 mois, l'optimisation fiscale a couvert 2 ans de forfait Premium.&nbsp;»
                </blockquote>
                <figcaption className="mt-6 text-center text-[13px] font-body text-muted-foreground tracking-wide uppercase">
                  Thomas, consultant IT, Bruxelles
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── SECTION 7 — Comment ça se passe ── */}
        <section className="py-10 md:py-14 relative overflow-hidden">
          <span
            aria-hidden="true" data-anim="text-scrub" data-scrub-dir="right"
            className="absolute inset-x-0 top-10 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
          >
            Démarrer
          </span>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 06</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Démarrage</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Comment ça se passe concrètement ?
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed max-w-[680px] mx-auto" data-anim="fade-up" data-delay="0.2">
                Trois étapes simples : et 48 heures pour démarrer notre collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7 relative" data-anim="stagger" data-stagger="0.1">
              {/* Ligne de connexion subtile */}
              <div className="hidden md:block absolute top-[88px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.num} data-tilt data-tilt-max="5" className="relative">
                    <div className="group bg-card rounded-3xl p-7 md:p-9 border border-border/50 text-center h-full transition-shadow duration-500 hover:border-accent/30 hover:shadow-[0_24px_60px_rgba(27,43,94,0.12)] relative overflow-hidden">
                      {/* Numéro filigrane */}
                      <span
                        aria-hidden="true"
                        className="absolute -top-4 right-4 font-display italic text-accent/[0.12] text-[88px] leading-none group-hover:text-accent/20 transition-colors duration-500"
                      >
                        0{s.num}
                      </span>

                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-accent/15 group-hover:rotate-[-6deg] transition-all duration-300">
                          <Icon size={24} className="text-accent" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[20px] font-display text-primary mb-3 leading-tight">{s.title}</h3>
                        <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-14" data-anim="fade-up">
              <Button variant="accent" size="lg" className="rounded-full px-10 group" asChild>
                <Link to="/contact/">
                  Consultation gratuite
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── SECTION FAQ ── */}
        <section className="py-10 md:py-14 bg-card relative overflow-hidden">
          <div className="container-mf max-w-[800px]">
            <div className="text-center mb-12">
              <h2 className="font-display text-[32px] md:text-[42px] leading-[1.05]" data-anim="split">
                Questions <span className="text-accent italic font-light">fréquentes</span>
              </h2>
            </div>

            <div data-anim="fade-up" data-delay="0.2">
              <Accordion
                type="multiple"
                defaultValue={faqs.map((_, i) => `faq-${i}`)}
                className="space-y-4"
              >
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-background rounded-2xl border border-border/50 px-5 sm:px-7 overflow-hidden data-[state=open]:border-accent/30 transition-colors"
                  >
                    <AccordionTrigger className="text-[15px] sm:text-[16px] font-semibold text-primary font-body hover:no-underline py-6 text-left">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[14.5px] text-muted-foreground leading-relaxed font-body pb-6">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-10 md:py-14 bg-primary relative overflow-hidden bg-precision-grid-light">
          <div className="absolute inset-0 opacity-15">
            <img src={imgMeeting} alt="Consultation MFinances" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />

          <div className="container-mf max-w-[800px] text-center relative z-10" data-anim="fade-up">
            <h2 className="font-display text-[34px] md:text-[48px] text-primary-foreground leading-[1.05]">
              Prêt à choisir votre forfait ?
            </h2>
            <p className="text-primary-foreground/75 text-[15px] sm:text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
              Premier échange gratuit et confidentiel : nous vous recommandons le forfait adapté à votre situation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Button variant="accent" size="lg" className="rounded-full pl-6 pr-3 group text-[14px]" asChild>
                <Link to="/contact/">
                  <span className="flex items-center gap-3">
                    Consultation gratuite
                    <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <ArrowUpRight size={14} />
                    </span>
                  </span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6 h-12 text-[14px] border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/services/">Découvrir nos services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
