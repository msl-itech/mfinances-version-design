import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/controle-gestion-hero.jpg";
import imgKpi from "@/assets/controle-gestion-kpi.jpg";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/services/ServicePageHero";
import ServicePageCTA from "@/components/services/ServicePageCTA";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart2,
  TrendingUp,
  Target,
  Percent,
  Clock,
  Landmark,
  ArrowRight,
  Check,
  Minus,
  Activity,
} from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const services = [
  {
    icon: BarChart2,
    title: "Budget annuel co-construit",
    desc: "Nous construisons ensemble votre budget annuel sur base de votre historique réel.",
  },
  {
    icon: TrendingUp,
    title: "Situations intermédiaires",
    desc: "Trimestrielles (Premium) ou mensuelles (Excellence). Vos résultats réels comparés au budget.",
  },
  {
    icon: Target,
    title: "Analyse des écarts",
    desc: "Nous identifions pourquoi les chiffres dévient et comment corriger la trajectoire.",
  },
];

const tableRows = [
  { label: "Budget annuel", premium: true, excellence: true },
  { label: "Situations financières", premium: "Trimestrielles", excellence: "Mensuelles" },
  { label: "Analyse des écarts", premium: "Trimestrielle", excellence: "Mensuelle" },
  { label: "Prévisionnel trésorerie", premium: false, excellence: true },
  { label: "Réunion de pilotage", premium: false, excellence: "Mensuelle" },
  { label: "DAF à temps partiel", premium: false, excellence: "En option" },
];

const kpis = [
  { icon: Percent, label: "Marge brute", desc: "Votre rentabilité opérationnelle après coûts directs." },
  { icon: Activity, label: "BFR", desc: "Besoin en fonds de roulement : la santé de votre cycle d'exploitation." },
  { icon: Clock, label: "DSO clients", desc: "Le délai moyen de paiement de vos clients." },
  { icon: Landmark, label: "Taux d'endettement", desc: "L'équilibre entre vos dettes et vos fonds propres." },
  { icon: Target, label: "Point mort mensuel", desc: "Le chiffre d'affaires minimum pour couvrir vos charges." },
];

const faqs = [
  {
    q: "À partir de quel forfait ai-je accès au contrôle de gestion ?",
    a: "Le contrôle de gestion est inclus dans les forfaits Premium (à partir de 450 € HTVA/mois) et Excellence (à partir de 650 € HTVA/mois). La fréquence et la profondeur des analyses varient selon le forfait choisi.",
  },
  {
    q: "Quelle est la différence entre une situation trimestrielle et mensuelle ?",
    a: "Une situation trimestrielle vous donne une photo de vos résultats tous les 3 mois. Une situation mensuelle vous offre un suivi plus fin, chaque mois, pour réagir plus vite aux écarts et ajuster votre stratégie en temps réel.",
  },
  {
    q: "Dois-je fournir beaucoup de données pour le budget ?",
    a: "Non. Nous partons de votre historique comptable et de vos objectifs commerciaux. Une réunion de cadrage de 60 minutes suffit généralement pour co-construire votre budget annuel.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mfinances.be/services/" },
    { "@type": "ListItem", position: 3, name: "Contrôle de Gestion", item: "https://mfinances.be/services/controle-de-gestion/" },
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



function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={18} className="text-accent mx-auto" />;
  if (value === false) return <Minus size={18} className="text-muted-foreground/40 mx-auto" />;
  return <span className="text-[13px] font-medium text-foreground">{value}</span>;
}

export default function ControleDeGestion() {
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
        title="Contrôle de Gestion TPE à Bruxelles — MFinances"
        description="Budget annuel, situations régulières et analyse des écarts pour piloter votre TPE. Inclus dans les forfaits Premium et Excellence."
        canonical="https://mfinances.be/services/controle-de-gestion/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Header />

      <main>
        <ServicePageHero
          breadcrumbLabel="Contrôle de gestion"
          eyebrow="Premium & Excellence"
          number="02"
          sectionLabel="Pilotage par les chiffres"
          titleStart="Pilotez votre entreprise avec les bons"
          titleItalic="chiffres"
          titleEnd="au bon moment"
          description="Budget annuel, situations intermédiaires et analyse des écarts — un cycle de pilotage complet pour décider sur des bases factuelles, pas sur des intuitions."
          pills={["Forfaits Premium & Excellence", "Budget annuel", "5 KPIs surveillés"]}
          image={imgHero}
          imageAlt="Tableaux de bord et rapports financiers pour le contrôle de gestion"
          plaque="N°02 / Contrôle de gestion"
          cardTitlePrefix="Vos chiffres,"
          cardTitleAccent="actionnables"
          cardSubtitle="Budget · Écarts · KPIs"
          ctaPrimary={{ label: "Consultation gratuite", href: "/contact/" }}
          ctaSecondary={{ label: "Voir les tarifs", href: "/tarifs/" }}
          watermark="Pilotage"
        />


        {/* SECTION 1 — Cycle de pilotage (3 étapes éditoriales) */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -right-10 top-12 select-none">
            <span
              data-anim="text-scrub" className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 260px)", letterSpacing: "-0.04em" }}
            >
              Cycle
            </span>
          </div>

          <div className="container-mf relative">
            <div data-anim="fade-up" className="max-w-[680px] mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  02 — Cycle de pilotage
                </span>
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                Trois temps pour{" "}
                <span className="italic font-normal text-accent">décider</span>
                <br />sur des bases factuelles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div data-anim="fade-up" data-delay="0.1 * i"
                    key={s.title}
                    
                    className="group relative bg-secondary/40 hover:bg-card border border-border/50 hover:border-accent/30 rounded-3xl p-8 transition-all duration-500 hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.12)] overflow-hidden"
                  >
                    <span
                      className="absolute -top-4 -right-2 font-display italic font-bold text-accent/[0.15] group-hover:text-accent/25 leading-none transition-colors duration-500"
                      style={{ fontSize: "120px" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-2 mb-6 relative">
                      <div className="h-px w-6 bg-accent" />
                      <span className="text-[10px] uppercase tracking-[0.22em] text-accent font-medium">
                        Étape {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:-rotate-6 transition-all duration-500 relative">
                      <Icon size={22} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[19px] font-display font-bold text-foreground mb-3 leading-tight relative">{s.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body relative">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2 — Tableau comparatif (éditorial) */}
        <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span
              data-anim="text-scrub" className="font-display italic font-bold text-foreground/[0.035] leading-none"
              style={{ fontSize: "clamp(140px, 20vw, 320px)", letterSpacing: "-0.04em" }}
            >
              Forfaits
            </span>
          </div>

          <div className="container-mf relative">
            <div data-anim="fade-up" className="text-center mb-14 max-w-[680px] mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  03 — Niveaux de service
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>
                Le bon niveau de pilotage,{" "}
                <span className="italic font-normal text-accent">selon votre forfait</span>
              </h2>
            </div>

            <div data-anim="fade-up" data-delay="0.1"  className="max-w-[920px] mx-auto">
              <div className="hidden sm:block bg-card rounded-3xl border border-border/60 overflow-hidden shadow-[0_12px_40px_-20px_hsl(var(--primary)/0.15)]">
                <table className="w-full text-left">
                  <thead className="bg-gradient-to-b from-secondary/40 to-transparent">
                    <tr className="border-b border-border/60">
                      <th className="px-8 py-6 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.22em] font-body">
                        <div className="flex items-center gap-2">
                          <div className="h-px w-6 bg-accent" />
                          Fonctionnalité
                        </div>
                      </th>
                      <th className="px-6 py-6 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.22em] font-body">Premium</th>
                      <th className="px-6 py-6 text-center text-[11px] font-semibold uppercase tracking-[0.22em] font-body text-accent">
                        <span className="flex items-center justify-center gap-2">
                          Excellence
                          <span className="text-accent">★</span>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, i) => (
                      <tr key={row.label} className="border-b border-border/40 last:border-b-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-8 py-5 text-[14px] text-foreground font-medium font-body">
                          <span className="flex items-center gap-3">
                            <span className="font-display italic text-muted-foreground/40 text-[12px]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {row.label}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center"><CellValue value={row.premium} /></td>
                        <td className="px-6 py-5 text-center bg-accent/[0.03]"><CellValue value={row.excellence} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden space-y-3">
                {tableRows.map((row) => (
                  <div key={row.label} className="bg-card rounded-2xl border border-border/50 p-5">
                    <p className="text-[14px] font-semibold text-foreground font-body mb-4">{row.label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 rounded-xl bg-secondary/40">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.18em] font-body block mb-2">Premium</span>
                        <CellValue value={row.premium} />
                      </div>
                      <div className="text-center p-3 rounded-xl bg-accent/5 border border-accent/20">
                        <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.18em] font-body block mb-2">Excellence</span>
                        <CellValue value={row.excellence} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-nowrap" asChild>
                  <Link to="/tarifs/">
                    Voir les tarifs détaillés
                    <ArrowRight size={16} className="ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — 5 KPIs (split sticky) */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 select-none">
            <span
              data-anim="text-scrub" className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(120px, 16vw, 240px)", letterSpacing: "-0.04em" }}
            >
              KPIs
            </span>
          </div>

          <div className="container-mf relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div data-anim="fade-up" className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    04 — Indicateurs
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Vos 5 indicateurs{" "}
                  <span className="italic font-normal text-accent">essentiels</span>
                  <br />surveillés chaque mois
                </h2>
                <p className="text-muted-foreground text-[15px] leading-[1.75] mt-6 font-body max-w-[440px]">
                  Cinq chiffres qui résument la santé financière réelle de votre entreprise : pas vingt indicateurs, juste ceux qui comptent.
                </p>
                <div className="mt-8 relative rounded-2xl overflow-hidden">
                  <img
                    src={imgKpi}
                    alt="Dashboard KPI financier sur tablette"
                    className="w-full h-[280px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/80 font-medium">
                      Vue cockpit
                    </span>
                    <div className="h-px flex-1 ml-4 bg-white/30" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                {kpis.map((k, i) => {
                  const Icon = k.icon;
                  return (
                    <div data-anim="fade-up" data-delay="0.06 * i"
                      key={k.label}
                      
                      className="group relative flex items-start gap-5 p-6 rounded-2xl bg-secondary/40 hover:bg-card border border-border/50 hover:border-accent/30 transition-all duration-500"
                    >
                      <span className="font-display italic text-accent/40 group-hover:text-accent text-[18px] leading-none mt-1 flex-shrink-0 transition-colors duration-300 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:-rotate-6 transition-all duration-500">
                        <Icon size={20} className="text-primary group-hover:text-primary-foreground transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[16px] font-display font-bold text-foreground leading-tight">{k.label}</h3>
                        <p className="text-[14px] text-muted-foreground leading-[1.65] font-body mt-1.5">{k.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION FAQ (éditoriale numérotée) */}
        <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
          <div className="container-mf relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div data-anim="fade-up" className="lg:col-span-4 lg:sticky lg:top-28 self-start">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    05 — FAQ
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Questions{" "}
                  <span className="italic font-normal text-accent">fréquentes</span>
                </h2>
                <p className="text-muted-foreground text-[15px] leading-[1.75] mt-6 font-body max-w-[360px]">
                  Tout ce qu'il faut savoir avant de mettre en place un contrôle de gestion structuré.
                </p>
              </div>

              <div data-anim="fade-up" data-delay="0.1"  className="lg:col-span-8">
                <Accordion type="single" collapsible className="border-t border-border/60">
                  {faqs.map((f, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="border-b border-border/60 border-t-0"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-7 group">
                        <div className="flex items-start gap-5 w-full pr-4">
                          <span className="font-display italic text-accent group-hover:text-accent text-[14px] leading-none mt-1 flex-shrink-0 transition-colors">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[16px] md:text-[17px] font-display font-semibold text-foreground leading-[1.4] flex-1">
                            {f.q}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] font-body pb-7 pl-12 pr-4">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <ServicePageCTA
          titleStart="Prêt à piloter avec les"
          titleItalic="bons chiffres"
          titleEnd="?"
          description="Discutons de vos enjeux — sans engagement, sans jargon. Premier échange gratuit pour identifier les KPIs qui comptent vraiment pour votre activité."
          watermark="Décidons"
          ctaPrimary={{ label: "Parler à un expert", href: "/contact/" }}
          ctaSecondary={{ label: "Voir nos tarifs", href: "/tarifs/" }}
        />
      </main>

      <Footer />
    </div>
  );
}
