import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/daf-hero.jpg";
import imgDashboard from "@/assets/daf-dashboard.jpg";

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
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="DAF Externalisé pour TPE à Bruxelles — MFinances"
        description="Un copilote financier à temps partiel pour vos décisions stratégiques. Réservé aux clients Excellence. 150€ HTVA/heure. Cabinet MFinances, Bruxelles."
        canonical="https://mfinances.be/services/daf-externalise/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />

      <Header />

      <main>
        <ServicePageHero
          breadcrumbLabel="DAF à temps partiel"
          eyebrow="Service Excellence"
          number="01"
          sectionLabel="Direction financière externalisée"
          titleStart="Un copilote financier pour les décisions"
          titleItalic="qui comptent"
          description="Le DAF externalisé MFinances, c'est l'expertise d'un Directeur Financier — sans le coût d'un recrutement. Un partenaire stratégique à vos côtés, chaque mois."
          pills={["150 € HTVA / heure", "Réservé aux clients Excellence", "Réunion mensuelle"]}
          image={imgHero}
          imageAlt="Réunion de pilotage financier avec un DAF externalisé MFinances"
          plaque="N°01 / Pilotage stratégique"
          cardTitlePrefix="Copilote"
          cardTitleAccent="financier"
          cardSubtitle="Décisions · Bancaires · Stratégie"
          ctaPrimary={{ label: "Consultation gratuite", href: "/contact/" }}
          ctaSecondary={{ label: "Voir les tarifs", href: "/tarifs/" }}
          watermark="DAF"
        />

        {/* Bandeau d'accès — visible immédiatement sous le H1 */}
        <section className="bg-accent text-accent-foreground border-b border-accent/20">
          <div className="container-mf py-3.5 md:py-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <p className="font-body text-[13px] md:text-[14px] leading-snug">
              <strong className="font-bold tracking-wide uppercase text-[11px] md:text-[12px] mr-2">Accès</strong>
              Réservé aux clients <strong>Excellence</strong> — à partir de <strong>650 € HTVA / mois</strong>
            </p>
            <Link
              to="/tarifs/#excellence"
              className="inline-flex items-center gap-1.5 text-[13px] md:text-[14px] font-semibold underline underline-offset-4 decoration-2 hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Voir le forfait Excellence <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* SECTION 1 — Missions (split éditorial + watermark) */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 260px)", letterSpacing: "-0.04em" }}
            >
              Missions
            </span>
          </div>

          <div className="container-mf relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <ScrollRevealDiv className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    02 — Périmètre
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Ce que fait vraiment{" "}
                  <span className="italic font-normal text-accent">un DAF</span>
                  <br />à temps partiel
                </h2>
                <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.75] mt-6 font-body max-w-[440px]">
                  Un DAF externalisé ne remplace pas votre comptable. Il vous donne une vision stratégique de vos finances pour prendre de meilleures décisions.
                </p>
                <div className="mt-8 relative rounded-2xl overflow-hidden">
                  <img
                    src={imgDashboard}
                    alt="Tableau de bord financier personnalisé"
                    className="w-full h-[260px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/80 font-medium">
                      Dashboard MFinances
                    </span>
                    <div className="h-px flex-1 ml-4 bg-white/30" />
                  </div>
                </div>
              </ScrollRevealDiv>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {missions.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <ScrollRevealDiv
                      key={m.text}
                      delay={0.05 * i}
                      className="group relative bg-secondary/50 hover:bg-card border border-border/50 hover:border-accent/30 rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_8px_32px_hsl(var(--primary)/0.08)]"
                    >
                      <span className="absolute top-3 right-4 text-[11px] font-display italic text-muted-foreground/40 tracking-wide">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                        <Icon size={20} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.5} />
                      </div>
                      <p className="text-[14px] text-foreground/85 leading-[1.6] font-body">{m.text}</p>
                    </ScrollRevealDiv>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — Fonctionnement (timeline éditoriale connectée) */}
        <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none"
              style={{ fontSize: "clamp(140px, 20vw, 300px)", letterSpacing: "-0.04em" }}
            >
              Rituel
            </span>
          </div>

          <div className="container-mf relative">
            <ScrollRevealDiv className="text-center mb-16 max-w-[680px] mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  03 — Fonctionnement
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>
                Concrètement,{" "}
                <span className="italic font-normal text-accent">comment ça fonctionne</span>
              </h2>
            </ScrollRevealDiv>

            <div className="relative">
              {/* hairline connecteur */}
              <div aria-hidden className="hidden md:block absolute top-[88px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <ScrollRevealDiv key={s.number} delay={0.12 * i} className="relative">
                      {/* Number medallion */}
                      <div className="relative flex justify-center mb-8">
                        <div className="relative w-[72px] h-[72px] rounded-full bg-card border border-accent/20 flex items-center justify-center shadow-[0_4px_24px_hsl(var(--primary)/0.06)]">
                          <span className="font-display italic font-bold text-accent text-[26px] leading-none">{s.number}</span>
                          <div className="absolute -inset-2 rounded-full border border-accent/10" />
                        </div>
                      </div>

                      <div className="bg-card rounded-2xl p-7 border border-border/50 hover:border-accent/30 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                          <Icon size={18} className="text-primary" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[18px] font-display font-bold text-foreground mb-2 leading-tight">{s.title}</h3>
                        <p className="text-[14px] text-muted-foreground leading-[1.65] font-body">{s.desc}</p>
                      </div>
                    </ScrollRevealDiv>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — Conditions (card éditoriale + watermark Excellence) */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-end justify-center select-none pb-8">
            <span
              className="font-display italic font-bold text-foreground/[0.04] leading-none"
              style={{ fontSize: "clamp(120px, 18vw, 260px)", letterSpacing: "-0.04em" }}
            >
              Excellence
            </span>
          </div>

          <div className="container-mf relative">
            <ScrollRevealDiv className="text-center mb-12 max-w-[680px] mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  04 — Conditions d'accès
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>
                Un service{" "}
                <span className="italic font-normal text-accent">sur invitation</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1} className="max-w-[760px] mx-auto">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary/95 p-10 md:p-14 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)]">
                {/* corner mark */}
                <div aria-hidden className="absolute top-6 right-6 flex items-center gap-2">
                  <div className="h-px w-8 bg-accent" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-primary-foreground/50 font-medium">N°01</span>
                </div>

                <ul className="space-y-6 font-body text-[15px] md:text-[16px] text-primary-foreground/85 leading-[1.7] mt-4">
                  {[
                    <>Réservé exclusivement aux clients titulaires d'un <strong className="text-primary-foreground">forfait Excellence</strong> (à partir de 650 € HTVA / mois).</>,
                    <>Facturation : <strong className="text-primary-foreground">150 € HTVA / heure</strong> — temps réel passé.</>,
                    <>Engagement : inclus dans les disponibilités mensuelles, facturation à l'heure pour les interventions supplémentaires.</>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-5 group">
                      <span className="font-display italic text-accent text-[20px] leading-none mt-1 flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-[12px] uppercase tracking-[0.22em] text-primary-foreground/50 font-medium">
                    Forfait Excellence — 650 € HTVA / mois
                  </span>
                  <Button variant="accent" size="lg" className="rounded-full whitespace-nowrap" asChild>
                    <Link to="/tarifs/">
                      Découvrir le forfait <ArrowRight size={16} className="ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* SECTION 4 — FAQ (hairlines éditoriaux) */}
        <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
          <div className="container-mf relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <ScrollRevealDiv className="lg:col-span-4 lg:sticky lg:top-28 self-start">
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
                  Tout ce que les dirigeants nous demandent avant de démarrer un DAF externalisé.
                </p>
              </ScrollRevealDiv>

              <ScrollRevealDiv delay={0.1} className="lg:col-span-8">
                <Accordion type="single" collapsible className="border-t border-border/60">
                  {faqs.map((f, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="border-b border-border/60 border-t-0"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-7 group">
                        <div className="flex items-start gap-5 w-full pr-4">
                          <span className="font-display italic text-accent/60 group-hover:text-accent text-[14px] leading-none mt-1 flex-shrink-0 transition-colors">
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
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        <ServicePageCTA
          titleStart="Prêt à avoir un"
          titleItalic="copilote financier"
          titleEnd="?"
          description="Discutons de vos enjeux — sans engagement, sans jargon. Premier échange gratuit et confidentiel pour identifier ensemble les leviers de votre pilotage financier."
          watermark="Pilotons"
          ctaPrimary={{ label: "Parler à un expert", href: "/contact/" }}
          ctaSecondary={{ label: "Voir nos tarifs", href: "/tarifs/" }}
        />
      </main>

      
      <Footer />
    </div>
  );
}
