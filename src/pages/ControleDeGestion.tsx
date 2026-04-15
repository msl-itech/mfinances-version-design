import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/controle-gestion-hero.jpg";
import imgKpi from "@/assets/controle-gestion-kpi.jpg";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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
  { icon: Activity, label: "BFR", desc: "Besoin en fonds de roulement — la santé de votre cycle d'exploitation." },
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

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={18} className="text-accent mx-auto" />;
  if (value === false) return <Minus size={18} className="text-muted-foreground/40 mx-auto" />;
  return <span className="text-[13px] font-medium text-foreground">{value}</span>;
}

export default function ControleDeGestion() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contrôle de Gestion TPE à Bruxelles — MFinances"
        description="Budget annuel, situations régulières et analyse des écarts pour piloter votre TPE. Inclus dans les forfaits Premium et Excellence. À partir de 450€/mois."
        canonical="https://mfinances.be/services/controle-de-gestion/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/services/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Services</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Contrôle de gestion</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Premium & Excellence
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Pilotez votre entreprise avec les bons chiffres, au bon moment
                </h1>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-7">
                  <span className="bg-primary-foreground/15 text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                    Forfaits Premium & Excellence
                  </span>
                  <span className="bg-primary-foreground/15 text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                    Bruxelles
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src={imgHero}
                alt="Tableaux de bord et rapports financiers pour le contrôle de gestion"
                className="rounded-2xl shadow-2xl w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* SECTION 1 — Ce que comprend le service */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que comprend notre
                <br />
                <span className="text-accent">contrôle de gestion</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv key={s.title} delay={0.1 * i} className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[17px] font-bold font-body text-foreground mb-2">{s.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed font-body">{s.desc}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2 — Tableau comparatif */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-12">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Niveau de service selon votre forfait
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-[13px] font-semibold text-muted-foreground uppercase tracking-wider font-body">Fonctionnalité</th>
                      <th className="px-6 py-4 text-center text-[13px] font-semibold text-muted-foreground uppercase tracking-wider font-body">Premium</th>
                      <th className="px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-wider font-body text-accent">Excellence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, i) => (
                      <tr key={row.label} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-secondary/30" : ""}`}>
                        <td className="px-6 py-4 text-[14px] text-foreground font-medium font-body">{row.label}</td>
                        <td className="px-6 py-4 text-center"><CellValue value={row.premium} /></td>
                        <td className="px-6 py-4 text-center"><CellValue value={row.excellence} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {tableRows.map((row) => (
                  <div key={row.label} className="bg-card rounded-xl border border-border/50 p-4">
                    <p className="text-[14px] font-semibold text-foreground font-body mb-3">{row.label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider font-body block mb-1">Premium</span>
                        <CellValue value={row.premium} />
                      </div>
                      <div className="text-center">
                        <span className="text-[11px] font-semibold text-accent uppercase tracking-wider font-body block mb-1">Excellence</span>
                        <CellValue value={row.excellence} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/tarifs/">
                    Voir les tarifs détaillés
                    <ArrowRight size={16} className="ml-1 flex-shrink-0" />
                  </Link>
                </Button>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* SECTION 3 — 5 KPIs */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] leading-[1.15] text-foreground">
                Vos 5 indicateurs clés
                <br />
                <span className="text-accent">surveillés chaque mois</span>
              </h2>
              <img
                src={imgKpi}
                alt="Dashboard KPI financier sur tablette"
                className="rounded-2xl mt-8 w-full h-[240px] object-cover shadow-md"
                loading="lazy"
              />
            </ScrollRevealDiv>

            <div className="space-y-4">
              {kpis.map((k, i) => {
                const Icon = k.icon;
                return (
                  <ScrollRevealDiv key={k.label} delay={0.05 * i} className="flex items-start gap-4 p-4 rounded-xl bg-secondary/60 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold font-body text-foreground">{k.label}</h3>
                      <p className="text-[13px] text-muted-foreground leading-relaxed font-body mt-0.5">{k.desc}</p>
                    </div>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION FAQ */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Questions fréquentes
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-card rounded-xl border border-border/50 px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-[15px] font-semibold text-foreground font-body hover:no-underline py-5">
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

        {/* CTA FINAL */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Partenariat financier" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
              Prêt à piloter votre entreprise avec les bons chiffres ?
            </h2>
            <p className="text-primary-foreground/70 text-[16px] mt-4 font-body">
              Discutons de vos enjeux — sans engagement, sans jargon.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/contact/">
                  Parler à un expert — c'est gratuit
                  <ArrowRight size={16} className="ml-1 flex-shrink-0" />
                </Link>
              </Button>
              <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/tarifs/">Voir nos tarifs →</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
