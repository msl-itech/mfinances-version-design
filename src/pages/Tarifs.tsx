import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgMeeting from "@/assets/daf-meeting-team.png";

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
  Minus,
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
} from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import Stamp from "@/components/ui/Stamp";

const compareRows = [
  { label: "Prix mensuel HTVA", values: ["275 €", "À partir de 350 €", "À partir de 450 €", "À partir de 650 €"], isPrice: true },
  { label: "Comptabilité complète", values: [true, true, true, true] },
  { label: "Déclarations TVA", values: [true, true, true, true] },
  { label: "Déclarations fiscales", values: [true, true, true, true] },
  { label: "Bilan annuel", values: [true, true, true, true] },
  { label: "Conseil fiscal", values: ["—", "Ponctuel", "Régulier", "Proactif"] },
  { label: "Situations intermédiaires", values: ["—", "Semestrielles", "Trimestrielles", "Mensuelles"] },
  { label: "Budget annuel", values: ["—", "—", true, true] },
  { label: "Analyse écarts budget/réalisé", values: ["—", "—", "Trimestrielle", "Mensuelle"] },
  { label: "Trésorerie prévisionnelle", values: ["—", "—", "—", "✓ mensuelle"] },
  { label: "Accès DAF à temps partiel", values: ["—", "—", "—", "✓ option"] },
];

const planNames = ["Basic", "Essentiel", "Premium", "Excellence"];

const plans = [
  {
    icon: Briefcase,
    name: "Basic",
    price: "275",
    tagline: "Pour être en règle",
    desc: "Votre société est active mais votre activité reste limitée. Comptabilité conforme, déclarations fiscales dans les délais, obligations respectées. Vous sécurisez l'essentiel : les consultations fiscales et prestations ponctuelles sont disponibles sur demande à 150 € HTVA/heure.",
  },
  {
    icon: ShieldCheck,
    name: "Essentiel",
    price: "350",
    tagline: "Pour sécuriser",
    desc: "Vous êtes indépendant, vous venez de créer votre société, ou votre activité est encore en phase de démarrage. Comptabilité rigoureuse, déclarations fiscales dans les délais, interlocuteur de confiance. Vous sécurisez votre base comptable et fiscale : sans stress administratif.",
  },
  {
    icon: TrendingUp,
    name: "Premium",
    price: "450",
    tagline: "Pour structurer",
    desc: "Votre activité se développe. Vous prenez des décisions de plus en plus structurantes. Budget annuel, suivi trimestriel, anticipation de la charge fiscale avant la clôture. Vous structurez votre pilotage financier : et vous commencez à décider sur la base de chiffres réels.",
    popular: true,
  },
  {
    icon: Rocket,
    name: "Excellence",
    price: "650",
    tagline: "Pour piloter avec un temps d'avance",
    desc: "Votre entreprise est en croissance active. Vision financière mensuelle, prévisionnel de trésorerie fiable, partenaire disponible pour les décisions qui engagent votre avenir. Vous pilotez avec un temps d'avance : comme les grandes entreprises.",
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

const faqs = [
  {
    q: "Combien coûte un expert-comptable pour une TPE en Belgique ?",
    a: "Chez MFinances, les forfaits pour une TPE démarrent à 275 € HTVA/mois (Basic : comptabilité + conformité), 350 € HTVA/mois (Essentiel : + conseil fiscal + situations intermédiaires), 450 € HTVA/mois (Premium : + contrôle de gestion trimestriel) et 650 € HTVA/mois (Excellence : + trésorerie prévisionnelle + accès DAF à temps partiel). Ces tarifs sont transparents et sans surprise. Le premier échange gratuit permet d'affiner selon votre situation : le forfait proposé ne change jamais de catégorie sans votre accord.",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function CellValue({ v, isPrice }: { v: boolean | string; isPrice?: boolean }) {
  if (v === true) return <Check size={18} className="text-accent mx-auto" strokeWidth={2.5} />;
  if (v === "—") return <Minus size={16} className="text-foreground/20 mx-auto" />;
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
            style={{ ["--glow-x" as any]: "50%", ["--glow-y" as any]: "50%", ["--glow-o" as any]: "0" }}
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
                      <a href="#forfaits">Comparer les forfaits</a>
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

        {/* ── SECTION 1 — Tableau comparatif ── */}
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
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 01</span>
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
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-3xl border border-border/60 overflow-hidden shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.25)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px] table-fixed">
                    <colgroup>
                      <col style={{ width: "28%" }} />
                      <col style={{ width: "18%" }} />
                      <col style={{ width: "18%" }} />
                      <col style={{ width: "18%" }} />
                      <col style={{ width: "18%" }} />
                    </colgroup>
                    <thead>
                      <tr className="border-b border-border/40 bg-gradient-to-b from-secondary/60 to-secondary/20">
                        <th className="text-left p-6 font-body font-normal text-muted-foreground" />
                        {[
                          { name: "Basic", videoUrl: null, accent: false },
                          { name: "Essentiel", videoUrl: null, accent: false },
                          { name: "Premium", videoUrl: "https://www.youtube.com/embed/hZplCFSNXlk", accent: false },
                          { name: "Excellence", videoUrl: "https://www.youtube.com/embed/XJrFJicX7S0", accent: true },
                        ].map((plan, i) => (
                          <th key={plan.name} className={`p-6 text-center relative ${i === 3 ? "bg-primary/[0.04]" : ""}`}>
                            {i === 2 && (
                              <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[9px] font-bold tracking-[0.15em] px-3 py-1 rounded-b-md">
                                POPULAIRE
                              </span>
                            )}
                            <span className="block font-body text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground/70 mb-1.5">
                              0{i + 1}
                            </span>
                            <span className={`font-display font-bold text-[18px] ${plan.accent ? "text-accent" : "text-primary"} inline-flex items-center gap-1.5`}>
                              {plan.name}
                              {plan.videoUrl && (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <button className="inline-flex text-accent hover:text-accent/80 transition-all group/play relative" aria-label={`Voir la vidéo ${plan.name}`}>
                                      <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
                                      <PlayCircle size={18} strokeWidth={1.5} className="relative z-10 group-hover/play:scale-125 transition-transform duration-200" />
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[min(420px,90vw)] p-2" side="bottom" align="center">
                                    <div className="aspect-video rounded-lg overflow-hidden">
                                      <iframe
                                        width="100%"
                                        height="100%"
                                        src={plan.videoUrl}
                                        title={`Vidéo ${plan.name}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                      />
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              )}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {compareRows.map((row, ri) => (
                        <tr key={row.label} className={`border-b border-border/20 last:border-0 transition-colors hover:bg-secondary/30 ${ri === 0 ? "bg-primary/[0.04]" : ""}`}>
                          <td className="p-4 pl-6 font-medium text-foreground/85 font-body text-[13.5px]">{row.label}</td>
                          {row.values.map((v, ci) => (
                            <td key={ci} className={`p-4 text-center ${ci === 3 ? "bg-primary/[0.025]" : ""}`}>
                              <CellValue v={v} isPrice={row.isPrice} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-4">
                {compareRows.map((row) => (
                  <div key={row.label} className="bg-card rounded-2xl border border-border/50 p-4 shadow-sm">
                    <p className="text-[13.5px] font-semibold text-foreground mb-3 font-body">{row.label}</p>
                    <div className="grid grid-cols-4 gap-2">
                      {row.values.map((v, ci) => (
                        <div key={ci} className="text-center">
                          <p className={`text-[9px] font-bold uppercase tracking-wider mb-1 font-body ${ci === 3 ? "text-accent" : "text-muted-foreground"}`}>{planNames[ci]}</p>
                          <CellValue v={v} isPrice={row.isPrice} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-anim="fade-up" data-delay="0.4">
              <p className="text-center mt-8 text-[13px] text-muted-foreground font-body leading-relaxed max-w-[680px] mx-auto">
                Les tarifs affichés sont nos forfaits de base : ils ne changent pas de catégorie sans votre accord. Le premier échange nous permet simplement d'affiner selon votre volume et votre situation. Aucune mauvaise surprise.
              </p>
              <p className="text-center mt-3 text-[13px] text-muted-foreground italic font-body">
                Pour les structures non assujetties à la TVA (ASBL, certaines professions médicales), nous appliquons une <strong className="text-foreground not-italic">réduction de 21%</strong> sur nos tarifs.
              </p>
              <p className="text-center mt-4 text-[13px] text-muted-foreground font-body">
                Votre société est en veille (sans activité) ?{" "}
                <Link to="/societe-en-veille/" className="text-accent font-semibold hover:underline">
                  Découvrez notre formule dédiée aux sociétés en veille
                </Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 — Détail forfaits (3 cards) ── */}
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
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 02</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Détail</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Quel forfait est fait pour vous ?
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed max-w-[680px] mx-auto" data-anim="fade-up" data-delay="0.2">
                Quatre niveaux d'accompagnement, pensés pour suivre la trajectoire de votre entreprise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7" data-anim="stagger" data-stagger="0.1">
              {plans.map((plan, i) => {
                const Icon = plan.icon;
                const isExcellence = plan.name === "Excellence";
                const isPopular = plan.popular;
                return (
                  <div key={plan.name} className="relative pt-3">
                    {isPopular && !isExcellence && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-accent text-accent-foreground text-[10px] font-bold tracking-[0.15em] px-3 py-1 rounded-full shadow-md">
                        POPULAIRE
                      </span>
                    )}
                    <div
                      data-tilt
                      data-tilt-max="5"
                      className={`group relative rounded-3xl p-7 md:p-9 flex flex-col h-full transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(27,43,94,0.12)] cut-corner ${isExcellence
                          ? "bg-primary text-primary-foreground border border-primary"
                          : isPopular
                            ? "bg-card border-2 border-accent/40"
                            : "bg-card border border-border/50 hover:border-accent/30"
                        }`}
                    >
                      {/* Numéro éditorial en filigrane */}
                      <span
                        aria-hidden="true"
                        className={`absolute top-5 right-6 font-display italic text-[64px] leading-none ${isExcellence ? "text-primary-foreground/[0.08]" : "text-primary/[0.05]"
                          }`}
                      >
                        0{i + 1}
                      </span>

                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10 transition-transform duration-500 group-hover:rotate-[-6deg] ${isExcellence ? "bg-accent/15 ring-1 ring-accent/30" : "bg-accent/10"
                          }`}
                      >
                        <Icon size={22} className="text-accent" strokeWidth={1.5} />
                      </div>

                      <span
                        className={`font-body text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${isExcellence ? "text-primary-foreground/60" : "text-muted-foreground"
                          }`}
                      >
                        {plan.name}
                      </span>

                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span
                          className={`font-display text-[44px] md:text-[52px] font-bold leading-none tracking-tight ${isExcellence ? "text-primary-foreground" : "text-primary"
                            }`}
                        >
                          {plan.price}€
                        </span>
                        <span className={`text-[13px] ${isExcellence ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                          /mois HTVA
                        </span>
                      </div>

                      <p className={`text-[13px] italic font-body mb-5 ${isExcellence ? "text-accent" : "text-accent"}`}>
                        : {plan.tagline}
                      </p>

                      <hr className={`mb-5 ${isExcellence ? "border-primary-foreground/15" : "border-border/40"}`} />

                      <p
                        className={`text-[14px] leading-[1.75] font-body flex-1 ${isExcellence ? "text-primary-foreground/75" : "text-muted-foreground"
                          }`}
                      >
                        {plan.desc}
                      </p>

                      <div className="mt-7">
                        <Link
                          to="/contact/"
                          className={`inline-flex items-center justify-center w-full rounded-full gap-2 py-3 text-[14px] font-medium transition-colors ${isExcellence
                              ? "bg-accent text-accent-foreground hover:bg-accent/90"
                              : isPopular
                                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                                : "border border-border/60 hover:bg-secondary"
                            }`}
                        >
                          Choisir {plan.name} <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center mt-8 text-[13px] text-muted-foreground font-body" data-anim="fade-up" data-delay="0.4">
              Votre société est en veille (sans activité) ?{" "}
              <Link to="/societe-en-veille/" className="text-accent font-semibold hover:underline">
                Découvrez notre formule dédiée aux sociétés en veille
              </Link>.
            </p>
          </div>
        </section>

        {/* ── SECTION 3 — DAF option (split card éditorial) ── */}
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
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-primary-foreground/10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-5">
                    <Sparkles size={14} className="text-accent" strokeWidth={1.5} />
                    <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">Option Excellence</span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-accent/15 ring-1 ring-accent/30 flex items-center justify-center mb-6">
                    <Users size={28} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-[44px] md:text-[56px] font-bold text-primary-foreground leading-none tracking-tight">
                    150€
                  </span>
                  <span className="text-primary-foreground/60 text-[13px] font-body mt-1">HTVA / heure</span>
                </div>

                {/* Colonne droite — narration */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="font-display text-[26px] md:text-[36px] text-primary-foreground leading-[1.15] tracking-tight">
                    Le DAF à temps partiel : <span className="italic font-light text-accent">au plus près de vos décisions</span>
                  </h2>
                  <p className="text-primary-foreground/75 text-[15px] leading-[1.8] mt-5 font-body">
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

        {/* ── SECTION 4 — Missions ponctuelles ── */}
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
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 03</span>
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

        {/* ── SECTION 5 — Comment ça se passe ── */}
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
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 04</span>
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
