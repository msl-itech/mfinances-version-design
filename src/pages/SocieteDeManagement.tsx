import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/societe-exploitation-hero.jpg";
import imgMeeting from "@/assets/daf-meeting-team.png";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
  Check,
  Minus,
  X,
  Building2,
  TrendingUp,
  ShieldCheck,
  Landmark,
  CheckCircle2,
  AlertTriangle,
  Quote,
  Sparkles,
} from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

/* ── data ── */

const services = [
  {
    icon: Building2,
    title: "Structure de rémunération optimisée",
    desc: "Management fees déductibles, combinaison salaire/dividendes/VVPRbis optimale : nous calculons la structure la plus avantageuse pour votre situation.",
  },
  {
    icon: TrendingUp,
    title: "Réinvestissement patrimonial",
    desc: "Les revenus de la société de management sont réinvestis dans des actifs durables : immobilier, placements financiers : avec un pilotage fiscal intégré.",
  },
  {
    icon: ShieldCheck,
    title: "Documentation & conformité",
    desc: "Convention de management fees conforme, PV d'AG, documentation arm's length : tout est structuré pour résister à un contrôle fiscal.",
  },
  {
    icon: Landmark,
    title: "Planification successorale",
    desc: "La société de management s'intègre naturellement dans une stratégie de transmission patrimoniale : donation de parts, clause d'accroissement, assurance dirigeant.",
  },
];

const concerneItems = [
  "Vos revenus professionnels dépassent 150 000 € par an",
  "Vous avez plusieurs sources de revenus",
  "Vous pensez long terme : constitution de patrimoine sur 5 à 10 ans",
  "Vous avez un projet d'investissement immobilier ou financier",
];

const pasPrioritaireItems = [
  "Vos revenus sont inférieurs à 100 000 €",
  "Vous êtes en début d'activité (moins de 2 ans)",
];

const beforeAfterRows = [
  { label: "Impôts annuels", before: "85 000 € (42,5%)", after: "Économie fiscale : 25 000 €/an" },
  { label: "Capacité d'investissement", before: "Limitée", after: "25 000 €/an réinvestis" },
  { label: "Patrimoine à 5 ans", before: "Croissance limitée", after: "1,2 M€ immobilier + placements" },
  { label: "Succession", before: "Aucune optimisation", after: "Planification successorale intégrée" },
  { label: "Délai de mise en place", before: "Aucun", after: "Structure en 6 à 8 semaines accompagnées" },
];

const compareRows = [
  { label: "Tarif mensuel HTVA", values: ["350 €", "450 €", "650 €"], isPrice: true },
  { label: "Comptabilité + ISOC", values: [true, true, true] },
  { label: "Documentation mgmt fees", values: [true, true, true] },
  { label: "Suivi patrimoine", values: ["—", "Trimestriel", "Mensuel"] },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Société de management", item: "https://mfinances.be/qui-nous-accompagnons/societe-de-management/" },
  ],
};



export default function SocieteDeManagement() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={root} className="min-h-screen">
      <SEOHead
        title="Société de Management Bruxelles | MFinances"
        description="Société de management patrimoniale à Bruxelles : management fees, investissement immobilier et planification successorale. MFinances."
        canonical="https://mfinances.be/qui-nous-accompagnons/societe-de-management/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-6 md:py-12 relative overflow-hidden bg-precision-grid-light">
          <div className="pointer-events-none absolute -top-8 -right-10 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[180px] lg:text-[240px] leading-none text-primary-foreground/[0.04] tracking-tight">Capital</span>
          </div>
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-accent/20 blur-[120px]" />

          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 relative z-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-primary-foreground/50 hover:text-primary-foreground text-[12px] tracking-wider uppercase">Accueil</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/30" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/qui-nous-accompagnons/" className="text-primary-foreground/50 hover:text-primary-foreground text-[12px] tracking-wider uppercase">Qui nous accompagnons</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/30" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground text-[12px] tracking-wider uppercase">Société de management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Structure : N°03</span>
                </div>
                <h1 className="font-display text-[36px] md:text-[64px] leading-[1.05] text-primary-foreground tracking-tight">
                  Transformez vos revenus<br />
                  en <span className="italic text-accent">patrimoine</span> durable.
                </h1>
                <p className="text-primary-foreground/70 text-[16px] md:text-[18px] leading-relaxed mt-8 font-body max-w-[560px]">
                  Un dirigeant qui se rémunère classiquement peut supporter une charge fiscale importante. Une société de management patrimoniale peut améliorer significativement votre structure de rémunération.
                </p>
                <div className="flex flex-wrap items-center gap-5 mt-10">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                    <Link to="/contact/">
                      Consultation gratuite
                      <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="absolute -top-12 -right-6 z-20 hidden md:block">
                  <Stamp className="text-accent drop-shadow-lg" />
                </div>
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-[4/5] group cut-corner">
                  <img src={imgHero} alt="Société de management patrimoniale à Bruxelles" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 bg-primary-foreground/95 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary">Mgmt · Patrimoine</span>
                  </div>
                </div>
                <div className="hidden lg:block absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl px-5 py-4 shadow-xl rotate-[-3deg]">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase opacity-80">Stratégie</div>
                  <div className="font-display text-[22px] font-bold leading-none mt-1">Long terme</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DÉFINITION ── */}
        <section className="bg-card py-10 md:py-10">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <div data-anim="fade-up" className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                C'est quoi une société de management <span className="text-accent">patrimoniale</span> ?
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mt-5 font-body max-w-[640px] mx-auto">
                Elle permet de facturer vos prestations de direction à votre société d'exploitation sous forme de management fees déductibles, et de réinvestir les revenus dans des actifs patrimoniaux durables.
              </p>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-secondary py-8 md:py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-12 -right-10 select-none hidden lg:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[220px] leading-none text-foreground/[0.04] tracking-tight">Patrimoine</span>
          </div>

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 relative">
            <div data-anim="fade-up" className="mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-10 bg-accent/60" />
                  <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Notre intervention</span>
                </div>
                <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.08]">
                  Ce que MFinances fait <span className="text-accent italic">pour vous</span>
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-muted-foreground text-[15px] leading-relaxed font-body">
                  Quatre piliers pour transformer vos revenus de dirigeant en patrimoine durable, structuré et conforme.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {services.map((s, i) => {
                const Icon = s.icon;
                const isDark = i === 1 || i === 2;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div data-anim="fade-up" data-delay="0.06 + i * 0.06" key={s.title} >
                    <div className={`group relative rounded-3xl p-7 md:p-8 h-full overflow-hidden transition-all duration-500 border ${
                      isDark
                        ? "bg-primary text-primary-foreground border-primary hover:shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.45)]"
                        : "bg-card border-border/60 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.2)]"
                    }`}>
                      <div className={`pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl transition-all duration-700 ${
                        isDark ? "bg-accent/15" : "bg-accent/0 group-hover:bg-accent/10"
                      }`} />
                      <div className={`absolute top-6 right-6 font-display text-[44px] leading-none select-none ${
                        isDark ? "text-primary-foreground/[0.25]" : "text-accent/[0.25]"
                      }`}>{num}</div>

                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 ${
                          isDark ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                        }`}>
                          <Icon size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className={`font-display text-[18px] md:text-[20px] leading-[1.2] mb-3 ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
                          {s.title}
                        </h3>
                        <p className={`text-[13.5px] leading-[1.7] font-body ${isDark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                          {s.desc}
                        </p>

                        <div className={`mt-6 pt-5 border-t ${isDark ? "border-primary-foreground/15" : "border-border/50"}`}>
                          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase font-body ${isDark ? "text-primary-foreground/50" : "text-foreground/50"}`}>
                            Pilier {num}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CETTE STRUCTURE EST-ELLE FAITE POUR VOUS ? ── */}
        <section className="bg-card py-10 md:py-10">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <div data-anim="fade-up" className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Cette structure est-elle <span className="text-accent">faite pour vous</span> ?
              </h2>
              <p className="text-[13px] text-muted-foreground italic font-body mt-3 max-w-[600px] mx-auto">
                Ces critères sont indicatifs. Seule une analyse personnalisée de votre situation permet de déterminer si une société de management patrimoniale est pertinente et avantageuse dans votre cas spécifique.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-anim="fade-up" data-delay="0.08"  className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(145,63%,42%)]/10 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-[hsl(145,63%,42%)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold font-body text-foreground">Vous êtes concerné si</h3>
                </div>
                <ul className="space-y-3">
                  {concerneItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-muted-foreground font-body leading-relaxed">
                      <Check size={16} className="text-[hsl(145,63%,42%)] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-anim="fade-up" data-delay="0.14"  className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle size={20} className="text-destructive" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold font-body text-foreground">Pas encore prioritaire si</h3>
                </div>
                <ul className="space-y-3">
                  {pasPrioritaireItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-muted-foreground font-body leading-relaxed">
                      <X size={16} className="text-destructive mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── AVANT / APRÈS ── */}
        <section className="bg-secondary py-10 md:py-10">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <div data-anim="fade-up" className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Résultat concret : <span className="text-accent">avant et après</span>
              </h2>
            </div>

            <div data-anim="fade-up" data-delay="0.1" >
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-border/30 bg-secondary/40">
                      <th className="text-left p-5 font-body font-normal text-muted-foreground w-[30%]" />
                      <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-destructive">Sans société de management</span></th>
                      <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-accent">Avec société de management</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {beforeAfterRows.map((row, ri) => (
                      <tr key={row.label} className="border-b border-border/20 last:border-0">
                        <td className="p-4 pl-5 font-medium text-foreground/80 font-body">{row.label}</td>
                        <td className="p-4 text-center text-foreground/60 font-body text-[13px]">{row.before}</td>
                        <td className="p-4 text-center text-accent font-body font-semibold text-[13px]">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {beforeAfterRows.map((row) => (
                  <div key={row.label} className="bg-card rounded-xl border border-border/50 p-4">
                    <p className="text-[14px] font-semibold text-foreground font-body mb-3">{row.label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider font-body block mb-1 text-destructive">Avant</span>
                        <span className="font-body text-[12px] text-foreground/60">{row.before}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider font-body block mb-1 text-accent">Après</span>
                        <span className="font-body text-[12px] text-accent font-semibold">{row.after}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[13px] text-foreground/50 italic font-body mt-5 text-center max-w-[700px] mx-auto">
                Exemple illustratif basé sur un dirigeant avec 200 000 € de revenus annuels. Les résultats dépendent de la situation personnelle, fiscale et patrimoniale de chaque client. Une analyse personnalisée est indispensable.
              </p>
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGE KARIM ── */}
        <section className="bg-primary py-8 md:py-12 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -left-10 w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 select-none hidden lg:block">
            <span data-anim="text-scrub" className="font-display italic text-[200px] leading-none text-primary-foreground/[0.05] tracking-tight">Karim</span>
          </div>

          <div className="mx-auto max-w-[900px] px-6 lg:px-12 relative">
            <div data-anim="fade-up">
              <div className="flex items-center gap-3 justify-center mb-6">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Témoignage client</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>

              <Quote size={56} className="text-accent/50 mx-auto mb-6" strokeWidth={1} />

              <blockquote className="font-display text-[22px] md:text-[32px] text-primary-foreground leading-[1.35] text-center italic">
                «&nbsp;Mika m'a montré que je versais <span className="text-accent not-italic font-bold">85 000&nbsp;€ d'impôts</span> sur une assiette que je pouvais légalement réduire à <span className="text-accent not-italic font-bold">60 000&nbsp;€</span>. La société a été structurée en <span className="text-accent not-italic font-bold">6 semaines</span>. 3 ans plus tard&nbsp;: <span className="text-accent not-italic font-bold">400 000&nbsp;€ de patrimoine immobilier</span>.&nbsp;»
              </blockquote>

              <div className="flex items-center justify-center gap-3 mt-8">
                <span className="h-px w-8 bg-accent/60" />
                <p className="text-primary-foreground/80 text-[14px] font-body tracking-wide">
                  <span className="font-bold text-primary-foreground">Karim</span> : CEO, Bruxelles
                </p>
                <span className="h-px w-8 bg-accent/60" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CAS CLIENT ── */}
        <section className="bg-card py-8 md:py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -right-10 select-none hidden lg:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[220px] leading-none text-foreground/[0.035] tracking-tight">Impact</span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative">
            <div data-anim="fade-up" className="text-center mb-12 md:mb-16 max-w-[640px] mx-auto">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Cas client</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.08]">
                Cas <span className="italic text-accent">client</span>
              </h2>
            </div>

            <div data-anim="fade-up" data-delay="0.1" >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-card rounded-3xl border border-border/60 overflow-hidden shadow-[0_30px_70px_-40px_hsl(var(--primary)/0.25)]">
                <div className="lg:col-span-4 bg-primary text-primary-foreground p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[260px]">
                  <div className="pointer-events-none absolute -bottom-12 -left-8 w-60 h-60 rounded-full bg-accent/15 blur-3xl" />
                  <Quote size={64} className="text-accent/40 -ml-2" strokeWidth={1} />
                  <div className="relative">
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent font-body mb-2">Cas n°01</p>
                    <p className="font-display text-[20px] md:text-[24px] italic text-primary-foreground leading-[1.2]">
                      Patrimoine durable, fiscalité maîtrisée.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 p-8 md:p-12">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Building2 size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/50 font-body mb-1">PME technologique</p>
                      <h3 className="font-display text-[20px] md:text-[24px] text-foreground leading-[1.2]">
                        Structuration <span className="italic text-accent">patrimoniale</span>
                      </h3>
                    </div>
                  </div>

                  <p className="text-[14.5px] text-muted-foreground leading-[1.75] font-body">
                    Un dirigeant de PME technologique a structuré sa rémunération via une société de management patrimoniale. En combinant optimisation des management fees, investissement immobilier intégré et planification successorale, il a significativement réduit sa charge fiscale globale et constitué un patrimoine durable.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-7 pt-7 border-t border-border/50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={14} className="text-accent" strokeWidth={2} />
                        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground/50 font-body">Charge fiscale</p>
                      </div>
                      <p className="font-display text-[20px] text-foreground">Réduite</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={14} className="text-accent" strokeWidth={2} />
                        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground/50 font-body">Patrimoine</p>
                      </div>
                      <p className="font-display text-[20px] text-foreground">Constitué</p>
                    </div>
                  </div>

                  <p className="text-[12.5px] text-foreground/45 italic font-body mt-5">
                    Les résultats varient selon la situation de chaque dirigeant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FORFAITS ── */}
        <section className="bg-secondary py-8 md:py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -left-10 select-none hidden lg:block">
            <span data-anim="text-scrub" className="font-display italic text-[220px] leading-none text-foreground/[0.04] tracking-tight">Forfaits</span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative">
            <div data-anim="fade-up" className="text-center mb-12 max-w-[680px] mx-auto">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Tarification</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.08]">
                Forfaits <span className="italic text-accent">disponibles</span>
              </h2>
            </div>

            <div data-anim="fade-up" data-delay="0.08" >
              <div className="hidden sm:grid grid-cols-[35%_1fr_1fr_1fr] mb-1">
                <div />
                {[
                  { name: "Essentiel", price: "350", featured: false },
                  { name: "Premium", price: "450", featured: false },
                  { name: "Excellence", price: "650", featured: true },
                ].map((p) => (
                  <div key={p.name} className={`rounded-t-2xl px-3 md:px-5 py-5 md:py-6 text-center border-x border-t transition-all relative ${
                    p.featured
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_-10px_30px_-10px_hsl(var(--primary)/0.3)]"
                      : "bg-card border-border/50"
                  }`}>
                    {p.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase font-body whitespace-nowrap">
                        Recommandé
                      </span>
                    )}
                    <p className={`font-display text-[15px] md:text-[18px] font-bold ${p.featured ? "text-accent" : "text-primary"}`}>{p.name}</p>
                    <div className="flex items-baseline justify-center gap-1 mt-2">
                      <span className={`font-display text-[24px] md:text-[32px] font-bold ${p.featured ? "text-primary-foreground" : "text-primary"}`}>{p.price}€</span>
                      <span className={`text-[10px] md:text-[11px] font-body ${p.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>/mois HTVA</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block bg-card rounded-b-2xl border border-border/50 border-t-0 overflow-hidden shadow-[0_30px_70px_-40px_hsl(var(--primary)/0.2)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px] table-fixed">
                    <colgroup>
                      <col style={{ width: "35%" }} />
                      <col style={{ width: "21.66%" }} />
                      <col style={{ width: "21.66%" }} />
                      <col style={{ width: "21.66%" }} />
                    </colgroup>
                    <tbody>
                      {compareRows.slice(1).map((row) => (
                        <tr key={row.label} className="border-t border-border/30 first:border-t-0">
                          <td className="p-4 md:p-5 pl-5 md:pl-7 font-medium text-foreground/80 font-body">{row.label}</td>
                          {row.values.map((v, ci) => {
                            const isFeatured = ci === 2;
                            return (
                              <td key={ci} className={`p-4 md:p-5 text-center ${isFeatured ? "bg-accent/[0.04]" : ""}`}>
                                {v === true ? (
                                  <span className="inline-flex w-7 h-7 rounded-full bg-[hsl(145,63%,42%)]/10 items-center justify-center">
                                    <Check size={15} className="text-[hsl(145,63%,42%)]" strokeWidth={2.5} />
                                  </span>
                                ) : v === "—" ? (
                                  <Minus size={16} className="text-foreground/20 mx-auto" />
                                ) : (
                                  <span className="font-body text-foreground/70 text-[13px]">{v}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sm:hidden bg-card rounded-2xl border border-border/50 p-4 space-y-3">
                {compareRows.slice(1).map((row) => (
                  <div key={row.label} className="border border-border/40 rounded-xl p-4">
                    <p className="text-[13px] font-semibold text-foreground font-body mb-3">{row.label}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Essentiel", "Premium", "Excellence"].map((plan, ci) => (
                        <div key={plan} className={`text-center rounded-lg py-2 ${ci === 2 ? "bg-accent/5" : ""}`}>
                          <span className={`text-[9px] font-semibold uppercase tracking-wider font-body block mb-1 ${ci === 2 ? "text-accent" : "text-muted-foreground"}`}>{plan}</span>
                          {row.values[ci] === true ? (
                            <Check size={16} className="text-[hsl(145,63%,42%)] mx-auto" />
                          ) : row.values[ci] === "—" ? (
                            <Minus size={14} className="text-foreground/20 mx-auto" />
                          ) : (
                            <span className="font-body text-[11px] text-foreground/70">{row.values[ci]}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-10">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" /></Link>
              </Button>
            </div>

            <div data-anim="fade-up" data-delay="0.2"  className="mt-10 text-center">
              <p className="text-[14px] text-muted-foreground font-body">
                Voir aussi :{" "}
                <Link to="/qui-nous-accompagnons/societe-de-moyens/" className="text-accent font-semibold hover:underline">
                  Société de moyens
                </Link>{" "}· {" "}
                <Link to="/qui-nous-accompagnons/societe-exploitation/" className="text-accent font-semibold hover:underline">
                  Société d'exploitation
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-14 md:py-12 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation société de management MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
          <div className="pointer-events-none absolute -bottom-16 right-0 select-none hidden md:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[220px] leading-none text-primary-foreground/[0.05] tracking-tight">Discutons</span>
          </div>
          <div className="mx-auto max-w-[900px] px-6 lg:px-12 text-center relative z-10">
            <div data-anim="fade-up">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Premier contact</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>
              <h2 className="font-display text-[28px] md:text-[48px] text-primary-foreground leading-[1.1]">
                Prêt à <span className="text-accent italic">structurer</span> votre patrimoine ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel : nous analysons votre situation et déterminons si une société de management est pertinente pour vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/tarifs/">Voir les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
