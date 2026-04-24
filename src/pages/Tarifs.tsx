import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/tarifs-hero.jpg";
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
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const compareRows = [
  { label: "Prix mensuel HTVA", values: ["À partir de 350 €", "À partir de 450 €", "À partir de 650 €"], isPrice: true },
  { label: "Comptabilité complète", values: [true, true, true] },
  { label: "Déclarations TVA", values: [true, true, true] },
  { label: "Déclarations fiscales", values: [true, true, true] },
  { label: "Bilan annuel", values: [true, true, true] },
  { label: "Conseil fiscal", values: ["Ponctuel", "Régulier", "Proactif"] },
  { label: "Situations intermédiaires", values: ["Semestrielles", "Trimestrielles", "Mensuelles"] },
  { label: "Budget annuel", values: ["—", true, true] },
  { label: "Analyse écarts budget/réalisé", values: ["—", "Trimestrielle", "Mensuelle"] },
  { label: "Trésorerie prévisionnelle", values: ["—", "—", "✓ mensuelle"] },
  { label: "Accès DAF à temps partiel", values: ["—", "—", "✓ option"] },
];

const planNames = ["Essentiel", "Premium", "Excellence"];

const plans = [
  {
    icon: ShieldCheck,
    name: "Essentiel",
    price: "350",
    tagline: "Pour sécuriser",
    desc: "Vous êtes indépendant, vous venez de créer votre société, ou votre activité est encore en phase de démarrage. Comptabilité rigoureuse, déclarations fiscales dans les délais, interlocuteur de confiance. Vous sécurisez votre base comptable et fiscale — sans stress administratif.",
  },
  {
    icon: TrendingUp,
    name: "Premium",
    price: "450",
    tagline: "Pour structurer",
    desc: "Votre activité se développe. Vous prenez des décisions de plus en plus structurantes. Budget annuel, suivi trimestriel, anticipation de la charge fiscale avant la clôture. Vous structurez votre pilotage financier — et vous commencez à décider sur la base de chiffres réels.",
    popular: true,
  },
  {
    icon: Rocket,
    name: "Excellence",
    price: "650",
    tagline: "Pour piloter et anticiper",
    desc: "Votre entreprise est en croissance active. Vision financière mensuelle, prévisionnel de trésorerie fiable, partenaire disponible pour les décisions qui engagent votre avenir. Vous pilotez avec un temps d'avance — comme les grandes entreprises.",
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
    a: "Chez MFinances, les forfaits pour une TPE démarrent à 350 € HTVA/mois (Essentiel : comptabilité + déclarations), 450 € HTVA/mois (Premium : + contrôle de gestion trimestriel) et 650 € HTVA/mois (Excellence : + trésorerie prévisionnelle + accès DAF à temps partiel). Ces tarifs sont transparents et sans surprise. Le premier échange gratuit permet d'affiner selon votre situation — le forfait proposé ne change jamais de catégorie sans votre accord.",
  },
  {
    q: "Y a-t-il une réduction pour les structures non assujetties à la TVA ?",
    a: "Oui. Les structures non assujetties à la TVA — notamment les ASBL et certaines professions médicales (médecins, kinésithérapeutes, infirmiers) — bénéficient d'une réduction de 21 % sur l'ensemble de nos forfaits. Cette réduction s'applique automatiquement dès lors que votre structure répond à ces critères.",
  },
  {
    q: "Faut-il s'engager sur une durée minimum ?",
    a: "Nos forfaits sont conclus pour une durée d'un an, avec tacite reconduction. Un préavis de 3 mois avant la date d'échéance annuelle est requis pour mettre fin au contrat. Cet engagement dans la durée n'est pas une contrainte — c'est ce qui nous permet de vraiment vous connaître, d'anticiper vos besoins et d'être un partenaire efficace. Un client suivi depuis 2 ans bénéficie d'un niveau de conseil qu'un nouveau client ne peut pas avoir.",
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

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function CellValue({ v, isPrice }: { v: boolean | string; isPrice?: boolean }) {
  if (v === true) return <Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" />;
  if (v === "—") return <Minus size={16} className="text-foreground/20 mx-auto" />;
  return <span className={`font-body ${isPrice ? "font-bold text-primary text-[15px]" : "text-foreground/70 text-[13px]"}`}>{v as string}</span>;
}

export default function Tarifs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Tarifs Expert-Comptable Bruxelles | 350€/mois | MFinances"
        description="3 forfaits transparents pour TPE à Bruxelles. Essentiel 350€, Premium 450€, Excellence 650€ HTVA/mois. DAF à temps partiel en option."
        canonical="https://mfinances.be/tarifs/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-12 md:py-24 relative overflow-hidden">
          {/* Watermark éditorial */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-6 -left-4 md:-top-10 md:-left-8 font-display italic text-primary-foreground/[0.06] text-[110px] md:text-[220px] leading-none tracking-tight"
          >
            Tarifs
          </span>
          {/* Glow accent */}
          <div className="pointer-events-none absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-accent/10 blur-3xl" />

          <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center relative z-10">
            <div className="text-center lg:text-left">
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

              <div className="mt-7 md:mt-9">
                <div className="inline-flex items-center gap-2 mb-5 md:mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="font-body text-[11px] font-bold tracking-[0.25em] uppercase text-accent">
                    Tarifs · 03 forfaits
                  </span>
                </div>

                <h1 className="font-display text-[28px] sm:text-[34px] md:text-[52px] leading-[1.08] text-primary-foreground tracking-tight">
                  Des forfaits <span className="italic font-light text-accent">transparents</span>,<br className="hidden md:block" /> sans surprise — adaptés à votre <span className="italic font-light">stade de croissance</span>.
                </h1>

                <p className="mt-6 md:mt-7 text-primary-foreground/70 text-[15px] md:text-[16px] leading-[1.75] font-body max-w-[520px] mx-auto lg:mx-0">
                  Trois niveaux d'accompagnement, un seul engagement&nbsp;: vous donner une vision claire et anticipée de vos finances. À partir de <strong className="text-primary-foreground">350 € HTVA / mois</strong>.
                </p>

                <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                    <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                  </Button>
                  <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                    <a href="#forfaits">Comparer les forfaits</a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-accent/20 blur-2xl rounded-3xl" aria-hidden="true" />
              <div className="relative rounded-2xl shadow-2xl overflow-hidden aspect-video max-w-full ring-1 ring-primary-foreground/10">
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
        </section>


        {/* ── SECTION 1 — Tableau comparatif ── */}
        <section id="forfaits" className="bg-card py-14 md:py-24 relative overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-4 right-0 font-display italic text-primary/[0.035] text-[120px] md:text-[200px] leading-none tracking-tight"
          >
            Comparer
          </span>

          <div className="mx-auto max-w-[1100px] px-5 sm:px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv className="text-center mb-10 md:mb-16 max-w-[680px] mx-auto">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-accent" />
                <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">01 · Comparatif</span>
                <span className="h-px w-8 bg-accent" />
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.12] tracking-tight">
                Nos trois <span className="italic font-light text-accent">forfaits</span>
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed">
                Une lecture côte à côte, pour choisir en quelques secondes le niveau d'accompagnement qui vous correspond.
              </p>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-3xl border border-border/60 overflow-hidden shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.25)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px] table-fixed">
                    <colgroup>
                      <col style={{ width: "40%" }} />
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "20%" }} />
                    </colgroup>
                    <thead>
                      <tr className="border-b border-border/40 bg-gradient-to-b from-secondary/60 to-secondary/20">
                        <th className="text-left p-6 font-body font-normal text-muted-foreground" />
                        {[
                          { name: "Essentiel", videoUrl: null, accent: false },
                          { name: "Premium", videoUrl: "https://www.youtube.com/embed/hZplCFSNXlk", accent: false },
                          { name: "Excellence", videoUrl: "https://www.youtube.com/embed/XJrFJicX7S0", accent: true },
                        ].map((plan, i) => (
                          <th key={plan.name} className={`p-6 text-center relative ${i === 2 ? "bg-primary/[0.04]" : ""}`}>
                            {i === 1 && (
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
                            <td key={ci} className={`p-4 text-center ${ci === 2 ? "bg-primary/[0.025]" : ""}`}>
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
                    <div className="grid grid-cols-3 gap-2">
                      {row.values.map((v, ci) => (
                        <div key={ci} className="text-center">
                          <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 font-body ${ci === 2 ? "text-accent" : "text-muted-foreground"}`}>{planNames[ci]}</p>
                          <CellValue v={v} isPrice={row.isPrice} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.2}>
              <p className="text-center mt-8 text-[13px] text-muted-foreground font-body leading-relaxed max-w-[680px] mx-auto">
                Les tarifs affichés sont nos forfaits de base — ils ne changent pas de catégorie sans votre accord. Le premier échange nous permet simplement d'affiner selon votre volume et votre situation. Aucune mauvaise surprise.
              </p>
              <p className="text-center mt-3 text-[13px] text-muted-foreground italic font-body">
                Pour les structures non assujetties à la TVA (ASBL, certaines professions médicales), nous appliquons une <strong className="text-foreground not-italic">réduction de 21%</strong> sur nos tarifs.
              </p>
            </ScrollRevealDiv>
          </div>
        </section>


        {/* ── SECTION 2 — Détail forfaits (3 cards) ── */}
        <section className="bg-secondary py-14 md:py-24 relative overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -bottom-8 -left-4 font-display italic text-primary/[0.04] text-[110px] md:text-[200px] leading-none tracking-tight"
          >
            Choisir
          </span>

          <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv className="text-center mb-10 md:mb-16 max-w-[680px] mx-auto">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-accent" />
                <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">02 · Détail</span>
                <span className="h-px w-8 bg-accent" />
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.12] tracking-tight">
                Quel forfait est <span className="italic font-light text-accent">fait pour vous</span> ?
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed">
                Trois philosophies d'accompagnement, pensées pour suivre la trajectoire de votre entreprise.
              </p>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
              {plans.map((plan, i) => {
                const Icon = plan.icon;
                const isExcellence = plan.name === "Excellence";
                const isPopular = plan.popular;
                return (
                  <ScrollRevealDiv
                    key={plan.name}
                    delay={0.08 + i * 0.08}
                    className={`group relative rounded-3xl p-7 md:p-9 flex flex-col transition-all duration-500 ${
                      isExcellence
                        ? "bg-primary text-primary-foreground border border-primary shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.6)] hover:-translate-y-1"
                        : isPopular
                          ? "bg-card border-2 border-accent/40 shadow-[0_20px_60px_-25px_hsl(var(--accent)/0.4)] hover:-translate-y-1"
                          : "bg-card border border-border/60 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.25)]"
                    }`}
                  >
                    {/* Numéro éditorial en filigrane */}
                    <span
                      aria-hidden="true"
                      className={`absolute top-5 right-6 font-display italic text-[64px] leading-none ${
                        isExcellence ? "text-primary-foreground/[0.08]" : "text-primary/[0.05]"
                      }`}
                    >
                      0{i + 1}
                    </span>

                    {isPopular && !isExcellence && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold tracking-[0.15em] px-3 py-1 rounded-full shadow-md">
                        POPULAIRE
                      </span>
                    )}

                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                        isExcellence ? "bg-accent/15 ring-1 ring-accent/30" : "bg-accent/10"
                      }`}
                    >
                      <Icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>

                    <span
                      className={`font-body text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${
                        isExcellence ? "text-primary-foreground/60" : "text-muted-foreground"
                      }`}
                    >
                      {plan.name}
                    </span>

                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span
                        className={`font-display text-[44px] md:text-[52px] font-bold leading-none tracking-tight ${
                          isExcellence ? "text-primary-foreground" : "text-primary"
                        }`}
                      >
                        {plan.price}€
                      </span>
                      <span className={`text-[13px] ${isExcellence ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                        /mois HTVA
                      </span>
                    </div>

                    <p className={`text-[13px] italic font-body mb-5 ${isExcellence ? "text-accent" : "text-accent"}`}>
                      — {plan.tagline}
                    </p>

                    <hr className={`mb-5 ${isExcellence ? "border-primary-foreground/15" : "border-border/40"}`} />

                    <p
                      className={`text-[14px] leading-[1.75] font-body flex-1 ${
                        isExcellence ? "text-primary-foreground/75" : "text-muted-foreground"
                      }`}
                    >
                      {plan.desc}
                    </p>

                    <Button
                      variant={isExcellence ? "accent" : isPopular ? "accent" : "outline"}
                      className="w-full mt-7 rounded-full whitespace-normal text-center"
                      asChild
                    >
                      <Link to="/contact/">
                        Choisir {plan.name} <ArrowRight size={14} className="ml-1 flex-shrink-0" />
                      </Link>
                    </Button>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>


        {/* ── SECTION 3 — DAF option ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-12">
            <ScrollRevealDiv className="text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Users size={26} className="text-accent" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-[22px] sm:text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Le DAF à temps partiel — <span className="text-accent">option Excellence</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-[1.8] mt-5 font-body max-w-[640px] mx-auto">
                Réservé exclusivement aux clients Excellence. Réunion mensuelle de pilotage + disponibilité ad hoc. Facturation : <strong className="text-foreground">150 € HTVA / heure</strong>.
              </p>
              <Button variant="default" size="lg" className="rounded-full mt-8 whitespace-normal text-center" asChild>
                <Link to="/services/daf-externalise/">En savoir plus <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
              </Button>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION 4 — Missions ponctuelles ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Missions <span className="text-accent">ponctuelles</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-2xl border border-border/50 overflow-hidden">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left p-5 font-body font-semibold text-foreground/70 text-[12px] uppercase tracking-wider">Mission</th>
                      <th className="text-right p-5 font-body font-semibold text-foreground/70 text-[12px] uppercase tracking-wider">Tarif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missions.map((m, i) => (
                      <tr key={i} className="border-b border-border/20 last:border-0">
                        <td className="p-5 font-medium text-foreground/80 font-body">{m.label}</td>
                        <td className="p-5 text-right font-semibold text-primary font-body">{m.tarif}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {missions.map((m, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border/50 p-4">
                    <p className="text-[14px] font-medium text-foreground/80 font-body mb-2">{m.label}</p>
                    <p className="text-[15px] font-bold text-primary font-body">{m.tarif}</p>
                  </div>
                ))}
              </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.2}>
              <div className="bg-primary/[0.05] rounded-xl p-4 sm:p-5 mt-6 border border-primary/10">
                <p className="text-[13px] text-foreground/70 font-body leading-relaxed">
                  Nos partenariats s'inscrivent dans la durée — et c'est ce qui les rend efficaces. Un an ensemble, c'est le temps nécessaire pour vraiment vous connaître : votre saisonnalité, vos tensions récurrentes, vos objectifs. Le préavis de 3 mois n'est pas une contrainte — c'est le délai qui nous permet de vous passer la main dans les meilleures conditions si vous le souhaitez.
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION 5 — Comment ça se passe ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Comment ça se passe <span className="text-accent">concrètement ?</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv key={s.num} delay={0.1 + i * 0.08} className="relative">
                    <div className="bg-secondary/60 rounded-2xl p-6 md:p-7 border border-border/50 text-center h-full">
                      <span className="text-[48px] font-display font-bold text-accent/15 leading-none">{s.num}</span>
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mt-2 mb-4">
                        <Icon size={22} className="text-accent" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-[17px] font-bold font-body text-foreground mb-2">{s.title}</h3>
                      <p className="text-[14px] text-muted-foreground leading-relaxed font-body">{s.desc}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
                    )}
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION FAQ ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Questions <span className="text-accent">fréquentes</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              <Accordion
                type="multiple"
                defaultValue={faqs.map((_, i) => `faq-${i}`)}
                className="space-y-3"
              >
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-card rounded-xl border border-border/50 px-4 sm:px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-[14px] sm:text-[15px] font-semibold text-foreground font-body hover:no-underline py-5 text-left">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[14px] text-muted-foreground leading-relaxed font-body pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Prêt à choisir votre forfait ?
              </h2>
              <p className="text-primary-foreground/75 text-[15px] sm:text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous vous recommandons le forfait adapté à votre situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/#services">Découvrir nos services <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
