import { useEffect } from "react";
import { Link } from "react-router-dom";
import imgHero from "@/assets/daf-hero.jpg";
import imgDashboard from "@/assets/daf-dashboard.jpg";
import imgMeeting from "@/assets/daf-meeting.jpg";

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
  Calculator,
  Landmark,
  Handshake,
  LayoutDashboard,
  PhoneCall,
  Users,
  Mail,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const missions = [
  { icon: BarChart2, text: "Analyse mensuelle de vos performances financières" },
  { icon: Calculator, text: "Modélisation de l'impact de vos décisions (recrutement, investissement)" },
  { icon: Landmark, text: "Préparation et présentation des dossiers bancaires" },
  { icon: Handshake, text: "Accompagnement dans vos négociations financières" },
  { icon: LayoutDashboard, text: "Mise en place de tableaux de bord personnalisés" },
  { icon: PhoneCall, text: "Disponibilité ad hoc pour vos questions urgentes" },
];

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Réunion mensuelle de pilotage",
    desc: "60-90 min — analyse des résultats, décisions à prendre.",
  },
  {
    number: "02",
    icon: Mail,
    title: "Disponibilité ad hoc",
    desc: "Email / téléphone pour les questions entre les réunions.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Reporting",
    desc: "Compte-rendu écrit après chaque réunion.",
  },
];

const faqs = [
  {
    q: "Quelle est la différence entre un DAF externalisé et un comptable ?",
    a: "Un comptable enregistre vos opérations passées. Un DAF externalisé vous accompagne dans vos décisions futures : stratégie financière, prévisions, négociations bancaires, optimisation de la rentabilité. C'est un copilote, pas un exécutant.",
  },
  {
    q: "Combien de temps un DAF externalisé consacre-t-il à mon entreprise ?",
    a: "Cela dépend de vos besoins. En moyenne, une réunion mensuelle de 60 à 90 minutes, plus une disponibilité ad hoc par email et téléphone entre les réunions. Le temps réel passé est facturé à 150 € HTVA / heure.",
  },
  {
    q: "Le DAF externalisé remplace-t-il mon comptable ?",
    a: "Non. Le DAF externalisé travaille en complémentarité avec votre comptable. Chez MFinances, les deux services sont intégrés dans le même cabinet, ce qui garantit une cohérence totale entre la comptabilité et la stratégie financière.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mfinances.be/services/" },
    { "@type": "ListItem", position: 3, name: "DAF Externalisé", item: "https://mfinances.be/services/daf-externalise/" },
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

export default function DafExternalise() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "DAF Externalisé pour TPE à Bruxelles — MFinances";
    
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Un copilote financier à temps partiel pour vos décisions stratégiques. Réservé aux clients Excellence. 150€ HTVA/heure. Cabinet MFinances, Bruxelles.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/services/daf-externalise/";

    const addJsonLd = (data: object) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    };
    const s1 = addJsonLd(breadcrumbJsonLd);
    const s2 = addJsonLd(faqJsonLd);

    return () => { s1.remove(); s2.remove(); };
  }, []);

  return (
    <div className="min-h-screen">

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
                      <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">
                        Accueil
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/services/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">
                        Services
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">DAF à temps partiel</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Service Excellence
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Un copilote financier à vos côtés pour les décisions qui comptent
                </h1>
                <p className="text-primary-foreground/85 text-[16px] md:text-[18px] leading-relaxed mt-5 font-body">
                  Le DAF externalisé MFinances, c'est l'expertise d'un Directeur Financier — sans le coût d'un recrutement.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-7">
                  <span className="bg-primary-foreground/15 text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                    150 € HTVA / heure
                  </span>
                  <span className="bg-primary-foreground/15 text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                    Réservé aux clients Excellence
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src={imgHero}
                alt="Réunion de pilotage financier avec un DAF externalisé MFinances"
                className="rounded-2xl shadow-2xl w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* SECTION 1 — Missions */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] leading-[1.15] text-foreground">
                Ce que fait vraiment un DAF
                <br />
                <span className="text-accent">à temps partiel</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mt-4 font-body">
                Un DAF externalisé ne remplace pas votre comptable. Il vous donne une vision stratégique de vos finances pour prendre de meilleures décisions.
              </p>
              <img
                src={imgDashboard}
                alt="Tableau de bord financier personnalisé"
                className="rounded-2xl mt-8 w-full h-[220px] object-cover shadow-md"
                loading="lazy"
              />
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {missions.map((m, i) => {
                const Icon = m.icon;
                return (
                  <ScrollRevealDiv key={m.text} delay={0.05 * i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/60 border border-border/50">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <p className="text-[14px] text-foreground/80 leading-snug font-body">{m.text}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2 — Fonctionnement */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-12">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Concrètement, comment ça fonctionne
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv key={s.number} delay={0.1 * i} className="bg-card rounded-2xl p-7 border border-border/50 relative">
                    <span className="text-[48px] font-display font-bold text-accent/10 absolute top-4 right-5 leading-none">
                      {s.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[17px] font-bold font-body text-foreground mb-2">{s.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed font-body">{s.desc}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3 — Conditions */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Conditions d'accès
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1} className="max-w-[720px] mx-auto">
              <div className="border-2 border-accent rounded-2xl p-8 md:p-10 bg-card">
                <ul className="space-y-5 font-body text-[15px] text-foreground/80 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>
                      Réservé exclusivement aux clients titulaires d'un{" "}
                      <strong className="text-foreground">forfait Excellence</strong> (à partir de 650 € HTVA/mois).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>
                      Facturation : <strong className="text-foreground">150 € HTVA / heure</strong> — temps réel passé.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>
                      Engagement : inclus dans les disponibilités mensuelles, facturation à l'heure pour les interventions
                      supplémentaires.
                    </span>
                  </li>
                </ul>

                <div className="mt-8 text-center">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                    <Link to="/tarifs/">
                      Découvrir le forfait Excellence
                      <ArrowRight size={16} className="ml-1 flex-shrink-0" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* SECTION 4 — FAQ */}
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
              Prêt à avoir un copilote financier ?
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
