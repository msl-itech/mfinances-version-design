import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/creation-hero.jpg";
import imgSteps from "@/assets/creation-steps.jpg";

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
  ArrowRight,
  FileText,
  Scale,
  Stamp,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  { icon: FileText, title: "Élaboration du plan financier", desc: "Nous le construisons avec vous — prévisions de revenus, estimations de coûts, analyse des flux de trésorerie, seuil de rentabilité. Chaque chiffre est justifié et expliqué." },
  { icon: Scale, title: "Choix de la forme juridique", desc: "SRL, SA, SNC, entreprise individuelle — nous évaluons les options selon votre activité, votre niveau de risque, vos objectifs patrimoniaux et votre situation personnelle." },
  { icon: Stamp, title: "Accompagnement à l'acte authentique", desc: "Nous agissons comme interface entre vous et les intervenants — notaire, guichet d'entreprise, administration fiscale." },
  { icon: Settings, title: "Mise en place comptable dès le départ", desc: "Ouverture du dossier sur Odoo, configuration du plan comptable, mise en place des déclarations TVA. Vous démarrez avec une comptabilité propre." },
];

const tableRows = [
  { step: "Plan financier", detail: "Document complet — P&L prévisionnel, cash flow, seuil de rentabilité" },
  { step: "Forme juridique", detail: "Recommandation argumentée avec comparatif fiscal" },
  { step: "Acte authentique", detail: "Coordination notaire / guichet / administration" },
  { step: "Mise en place Odoo", detail: "Comptabilité opérationnelle dès le jour 1" },
  { step: "Honoraires MFinances", detail: "800 € HTVA — honoraires de conseil uniquement", highlight: true },
  { step: "Frais externes (non inclus)", detail: "Notaire, Moniteur belge, BCE : 1 000 à 2 500 € à charge du client", muted: true },
];

const faqs = [
  { q: "Quelle est la meilleure forme juridique pour créer une entreprise en Belgique ?", a: "En Belgique, la SRL est la forme la plus utilisée par les TPE — capital flexible, responsabilité limitée, fiscalité avantageuse via l'ISOC." },
  { q: "Combien coûte la création d'une société en Belgique ?", a: "La création d'une SRL en Belgique implique deux types de coûts : les honoraires MFinances (800 € HTVA, couvrant le plan financier, le conseil juridique, la coordination et la mise en place comptable) et les frais externes restant à charge du client (notaire, Moniteur belge, BCE — généralement entre 1 000 € et 2 500 €). Nous vous fournissons une estimation complète et transparente lors de la consultation gratuite initiale." },
  { q: "Faut-il un plan financier pour créer une société en Belgique ?", a: "Oui — depuis la réforme du droit des sociétés en Belgique, un plan financier est obligatoire pour la création d'une SRL ou d'une SA." },
  { q: "Combien de temps faut-il pour créer une société en Belgique ?", a: "Avec un dossier complet, la création d'une SRL prend généralement entre 1 et 3 semaines." },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mfinances.be/services/" },
    { "@type": "ListItem", position: 3, name: "Création d'entreprise", item: "https://mfinances.be/services/creation-entreprise/" },
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

export default function CreationEntreprise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Création d'Entreprise Bruxelles | MFinances"
        description="Plan financier, choix de la forme juridique et accompagnement à l'acte authentique. 800€ HTVA. Cabinet MFinances, Bruxelles."
        canonical="https://mfinances.be/services/creation-entreprise/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Header />

      <main>
        <ServicePageHero
          breadcrumbLabel="Création d'entreprise"
          eyebrow="800 € HTVA — Forfait tout compris"
          number="06"
          sectionLabel="Création d'entreprise"
          titleStart="Lancez votre entreprise sur des bases"
          titleItalic="solides"
          titleEnd="dès le premier jour"
          description="Créer une entreprise en Belgique, c'est excitant. C'est aussi une série de décisions structurantes qui engagent votre avenir financier, fiscal et juridique pour des années."
          disclaimer="Les erreurs de départ sont les plus coûteuses — et les plus évitables."
          pills={["Plan financier", "Forme juridique", "Acte authentique"]}
          image={imgHero}
          imageAlt="Création d'entreprise à Bruxelles — MFinances"
          plaque="N°06 / Création"
          cardTitlePrefix="Démarrage"
          cardTitleAccent="propre"
          cardSubtitle="800 € HTVA · Tout compris"
          ctaPrimary={{ label: "Consultation gratuite", href: "/contact/" }}
          ctaSecondary={{ label: "Voir les tarifs", href: "/tarifs/" }}
          watermark="Création"
        />


        {/* ── SECTION 1 — Le problème (manifesto rouge) ── */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none"
              style={{ fontSize: "clamp(140px, 22vw, 320px)", letterSpacing: "-0.04em" }}
            >
              Erreurs
            </span>
          </div>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto">
              <ScrollRevealDiv className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    02 — Pièges fréquents
                  </span>
                  <div className="h-px w-10 bg-accent" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle size={26} className="text-accent" strokeWidth={1.5} />
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 4vw, 50px)" }}>
                  Ce que personne ne vous dit{" "}
                  <span className="italic font-normal text-accent">au moment de créer</span>
                </h2>
              </ScrollRevealDiv>

              <ScrollRevealDiv delay={0.1} className="mt-12 space-y-5">
                {[
                  "La structure juridique choisie à la hâte qui coûte cher fiscalement trois ans plus tard.",
                  "Le plan financier bâclé qui ne convainc pas la banque.",
                  "Le capital de départ sous-estimé qui fragilise la trésorerie dès le premier mois.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-5 p-6 rounded-2xl bg-secondary/40 border border-border/50 hover:border-accent/30 transition-colors group">
                    <span className="font-display italic text-accent text-[24px] leading-none flex-shrink-0 mt-1 w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] md:text-[16px] leading-[1.75] text-foreground/85 font-body flex-1">
                      {text}
                    </p>
                  </div>
                ))}
              </ScrollRevealDiv>

              <ScrollRevealDiv delay={0.2} className="text-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-nowrap" asChild>
                  <Link to="/contact/">Éviter ces erreurs <ArrowRight size={16} className="ml-1.5" /></Link>
                </Button>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 — Accompagnement (4 cards éditoriales) ── */}
        <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -right-12 top-12 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Démarrage
            </span>
          </div>

          <div className="container-mf relative">
            <ScrollRevealDiv className="max-w-[680px] mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  03 — Notre accompagnement
                </span>
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                Notre accompagnement{" "}
                <span className="italic font-normal text-accent">à la création</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv
                    key={s.title}
                    delay={0.08 + i * 0.06}
                    className="group relative bg-card rounded-3xl p-8 border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.12)] overflow-hidden"
                  >
                    <span
                      className="absolute -top-4 -right-2 font-display italic font-bold text-foreground/[0.06] group-hover:text-accent/15 leading-none transition-colors duration-500"
                      style={{ fontSize: "120px" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2 mb-5 relative">
                      <div className="h-px w-6 bg-accent" />
                      <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                        Étape {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:-rotate-6 transition-all duration-500 relative">
                      <Icon size={22} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[19px] font-display font-bold text-foreground mb-3 leading-tight relative">{s.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body relative">{s.desc}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — Ce que vous obtenez (split éditorial + table) ── */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -left-10 top-12 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Livrables
            </span>
          </div>

          <div className="container-mf relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <ScrollRevealDiv className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    04 — Livrables
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em] mb-10" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Ce que vous obtenez{" "}
                  <span className="italic font-normal text-accent">concrètement</span>
                </h2>

                <div className="hidden sm:block bg-secondary/30 rounded-3xl border border-border/60 overflow-hidden shadow-[0_12px_40px_-20px_hsl(var(--primary)/0.15)]">
                  <table className="w-full text-[14px]">
                    <thead className="bg-gradient-to-b from-card to-transparent">
                      <tr className="border-b border-border/60">
                        <th className="text-left p-5 font-body font-semibold text-muted-foreground text-[11px] uppercase tracking-[0.22em]">
                          <div className="flex items-center gap-2">
                            <div className="h-px w-6 bg-accent" />
                            Étape
                          </div>
                        </th>
                        <th className="text-left p-5 font-body font-semibold text-muted-foreground text-[11px] uppercase tracking-[0.22em]">Livrable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, i) => (
                        <tr key={i} className={`border-b border-border/40 last:border-b-0 hover:bg-card/50 transition-colors ${row.highlight ? "bg-accent/[0.05]" : ""}`}>
                          <td className={`p-5 font-medium font-body ${row.highlight ? "text-accent font-bold" : row.muted ? "text-muted-foreground italic" : "text-foreground/85"}`}>
                            <span className="flex items-center gap-3">
                              <span className="font-display italic text-muted-foreground/40 text-[12px]">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {row.step}
                            </span>
                          </td>
                          <td className={`p-5 font-body ${row.highlight ? "text-accent font-semibold" : row.muted ? "text-muted-foreground italic text-[13px]" : "text-muted-foreground"}`}>
                            {row.detail}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="sm:hidden space-y-3">
                  {tableRows.map((row, i) => (
                    <div key={i} className={`rounded-2xl border p-5 ${row.highlight ? "bg-accent/[0.05] border-accent/30" : "bg-secondary/40 border-border/50"}`}>
                      <p className={`text-[14px] font-display font-bold mb-1.5 ${row.highlight ? "text-accent" : row.muted ? "text-muted-foreground" : "text-foreground"}`}>
                        <span className="font-display italic text-muted-foreground/40 text-[12px] mr-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {row.step}
                      </p>
                      <p className={`text-[13px] font-body leading-relaxed ${row.highlight ? "text-accent font-medium" : row.muted ? "text-muted-foreground italic" : "text-muted-foreground"}`}>
                        {row.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollRevealDiv>

              <ScrollRevealDiv delay={0.15} className="lg:col-span-5 relative lg:sticky lg:top-28">
                <div className="absolute -inset-8 bg-accent/5 rounded-[40px] blur-3xl -z-10" />
                <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
                  <img
                    src={imgSteps}
                    alt="Étapes de création d'entreprise — MFinances"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/95 backdrop-blur-sm border border-border/60">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/80 font-semibold">800 € HTVA</span>
                  </div>
                </div>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        {/* ── SECTION FAQ (éditoriale) ── */}
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
                  Tout ce que les futurs entrepreneurs nous demandent avant de créer leur société.
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

        {/* ── ARTICLES BLOG ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Nos <span className="text-accent">articles</span> création d'entreprise
              </h2>
            </ScrollRevealDiv>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "5 erreurs à éviter lors de la création d'une société", href: "/blog/creation-societe/erreurs-creation-societe-belgique/" },
                { title: "Coût de création d'une société en Belgique", href: "/blog/creation-societe/cout-creation-societe-belgique/" },
                { title: "Plan financier obligatoire — ce que la loi exige", href: "/blog/creation-societe/plan-financier-obligatoire-belgique/" },
                { title: "Créer une SRL en Belgique en 2026", href: "/blog/creation-societe/creer-srl-belgique-2026/" },
              ].map((a) => (
                <Link key={a.href} to={a.href} className="group flex items-center gap-3 bg-secondary/60 rounded-xl p-4 border border-border/50 hover:border-accent/30 transition-all">
                  <span className="text-[14px] font-semibold font-body text-foreground group-hover:text-accent transition-colors">{a.title}</span>
                  <ArrowRight size={14} className="text-accent flex-shrink-0 ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ServicePageCTA
          titleStart="Prêt à lancer"
          titleItalic="votre entreprise"
          titleEnd="?"
          description="Premier échange gratuit et confidentiel. Nous analysons votre projet et vous présentons les étapes concrètes."
          watermark="Lançons"
          ctaPrimary={{ label: "Consultation gratuite", href: "/contact/" }}
          ctaSecondary={{ label: "Découvrir nos services", href: "/#services" }}
          bgImageAlt="Accompagnement création d'entreprise — MFinances"
        />
      </main>

      <Footer />
    </div>
  );
}
