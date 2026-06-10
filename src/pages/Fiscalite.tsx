import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/fiscalite-hero.jpg";
import imgLeviers from "@/assets/fiscalite-leviers.jpg";

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
  Search,
  Calculator,
  Receipt,
  Landmark,
  ShieldCheck,
  Handshake,
  ChevronRight,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  { icon: Search, title: "Analyse approfondie de votre situation", desc: "Nous évaluons votre situation actuelle, identifions les opportunités d'optimisation et construisons une stratégie alignée avec vos objectifs." },
  { icon: Calculator, title: "Optimisation ISOC et IPP", desc: "Rémunération du dirigeant, dividendes, VVPRbis, réserve de liquidation, déductions professionnelles — nous calibrons votre situation pour minimiser la charge globale." },
  { icon: Receipt, title: "Gestion et déclarations TVA", desc: "Déclarations périodiques, régime de TVA adapté, récupération de TVA sur investissements — sans retard, sans erreur, sans pénalité." },
  { icon: Landmark, title: "Planification fiscale patrimoniale", desc: "Nous anticipons les implications fiscales pour protéger ce que vous avez construit." },
  { icon: ShieldCheck, title: "Accompagnement en cas de contrôle fiscal", desc: "Nous vous préparons en amont, constituons vos dossiers justificatifs et vous représentons face à l'administration." },
  { icon: Handshake, title: "Protection juridique — partenariat assurance", desc: "Nous avons établi un partenariat avec une compagnie d'assurance de renom pour vous offrir une couverture de protection juridique fiscale à tarif préférentiel." },
];

const leviers = [
  "Régime VVPRbis — dividendes à taux réduit pour les PME",
  "Réserve de liquidation — anticipation fiscale avantageuse",
  "Déduction pour investissement",
  "Rémunération optimale du dirigeant — équilibre salaire / dividendes",
  "Voiture de société et avantages en nature",
  "Frais professionnels déductibles",
  "Régimes TVA spécifiques selon secteur",
  "Transmission d'entreprise et planification successorale",
];

const faqs = [
  { q: "C'est quoi le VVPRbis en Belgique ?", a: "Le VVPRbis est un régime fiscal belge qui permet aux PME de distribuer des dividendes à un taux de précompte mobilier réduit — 15% au lieu de 30% — sous certaines conditions." },
  { q: "Quelle est la différence entre ISOC et IPP en Belgique ?", a: "L'ISOC est payé par votre société sur ses bénéfices. L'IPP est payé par vous en tant que dirigeant sur votre rémunération personnelle." },
  { q: "Comment se préparer à un contrôle fiscal en Belgique ?", a: "La meilleure préparation est préventive — dossiers justificatifs complets, cohérence entre déclarations, respect des délais." },
  { q: "Qu'est-ce que la réserve de liquidation pour une PME belge ?", a: "La réserve de liquidation permet à une PME belge de mettre en réserve une partie de ses bénéfices en payant une taxe de 10% immédiatement, pour les distribuer plus tard à un taux réduit." },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mfinances.be/services/" },
    { "@type": "ListItem", position: 3, name: "Fiscalité", item: "https://mfinances.be/services/fiscalite/" },
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

export default function Fiscalite() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Optimisation Fiscale pour TPE à Bruxelles — MFinances"
        description="Optimisation fiscale ISOC, IPP, TVA et planification patrimoniale pour dirigeants de TPE en Belgique. Cabinet MFinances, Bruxelles. Consultation gratuite."
        canonical="https://mfinances.be/services/fiscalite/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Header />

      <main>
        <ServicePageHero
          breadcrumbLabel="Fiscalité"
          eyebrow="Optimisation fiscale"
          number="05"
          sectionLabel="Fiscalité belge"
          titleStart="Payez ce que vous devez —"
          titleItalic="pas un euro"
          titleEnd="de plus"
          description="La fiscalité belge est complexe et en constante évolution. Bien comprise, elle contient des leviers puissants pour optimiser votre situation — ISOC, IPP, TVA, patrimoine."
          disclaimer="Toute optimisation est réalisée dans le strict respect du cadre légal après analyse personnalisée. Les résultats varient selon les situations."
          pills={["ISOC · IPP · TVA", "Planification patrimoniale", "Préparation contrôle"]}
          image={imgHero}
          imageAlt="Optimisation fiscale pour dirigeants de TPE — MFinances"
          plaque="N°05 / Fiscalité"
          cardTitlePrefix="Leviers"
          cardTitleAccent="légaux"
          cardSubtitle="VVPRbis · Réserve · Dividendes"
          ctaPrimary={{ label: "Consultation gratuite", href: "/contact/" }}
          ctaSecondary={{ label: "Voir les tarifs", href: "/tarifs/" }}
          watermark="Fiscal"
        />


        {/* ── SECTION 1 — Le problème (manifesto) ── */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none"
              style={{ fontSize: "clamp(140px, 22vw, 340px)", letterSpacing: "-0.04em" }}
            >
              Subir
            </span>
          </div>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  02 — Le problème
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <ScrollRevealDiv>
                <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
                  Le problème avec la fiscalité{" "}
                  <span className="italic font-normal text-accent">des dirigeants de TPE</span>
                </h2>
              </ScrollRevealDiv>
              <ScrollRevealDiv delay={0.1}>
                <p className="text-[16px] md:text-[18px] leading-[1.8] text-muted-foreground mt-8 font-body">
                  La plupart des dirigeants de TPE <strong className="text-foreground">subissent leur fiscalité</strong>. Ils découvrent leur charge d'imposition en fin d'année — quand il est trop tard pour agir. L'optimisation fiscale, ce n'est pas de l'évasion. C'est la connaissance précise des dispositifs légaux belges.
                </p>
                <p className="text-[16px] md:text-[18px] leading-[1.8] text-foreground mt-6 font-body">
                  Un dirigeant de TPE belge paie en moyenne <strong className="text-accent">38 à 52% de son résultat</strong> en impôts, cotisations et charges.
                </p>
                <p className="font-display italic text-[18px] md:text-[20px] text-foreground mt-4">
                  Ce n'est pas une fatalité — c'est une variable.
                </p>
              </ScrollRevealDiv>
              <ScrollRevealDiv delay={0.2} className="mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-nowrap" asChild>
                  <Link to="/contact/">Faire le point sur ma fiscalité <ArrowRight size={16} className="ml-1.5" /></Link>
                </Button>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 — Accompagnement (6 cards éditoriales) ── */}
        <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -right-12 top-12 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              ISOC
            </span>
          </div>

          <div className="container-mf relative">
            <ScrollRevealDiv className="max-w-[680px] mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  03 — Accompagnement
                </span>
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                Ce que comprend notre{" "}
                <span className="italic font-normal text-accent">accompagnement fiscal</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv
                    key={s.title}
                    delay={0.06 + i * 0.05}
                    className="group relative bg-card rounded-3xl p-7 border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.12)] overflow-hidden"
                  >
                    <span
                      className="absolute -top-4 -right-2 font-display italic font-bold text-foreground/[0.06] group-hover:text-accent/15 leading-none transition-colors duration-500"
                      style={{ fontSize: "110px" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2 mb-5 relative">
                      <div className="h-px w-6 bg-accent" />
                      <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:-rotate-6 transition-all duration-500 relative">
                      <Icon size={22} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[17px] font-display font-bold text-foreground mb-2 leading-tight relative">{s.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body relative">{s.desc}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — Leviers fiscaux (split éditorial) ── */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -left-10 top-12 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Leviers
            </span>
          </div>

          <div className="container-mf relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <ScrollRevealDiv className="lg:col-span-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    04 — Dispositifs belges
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Les leviers fiscaux belges{" "}
                  <span className="italic font-normal text-accent">que nous maîtrisons</span>
                </h2>
                <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-6 bg-accent" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-accent font-semibold">
                      Exemple réel
                    </span>
                  </div>
                  <p className="text-[15px] md:text-[16px] leading-[1.7] text-foreground font-body">
                    Avec rémunération optimisée + <strong>VVPRbis</strong> ou réserve de liquidation, passage de <strong className="text-accent">28% à 18%</strong> de charge effective.
                  </p>
                  <p className="font-display italic text-[16px] md:text-[18px] text-foreground mt-3">
                    Soit <span className="text-accent not-italic font-bold">18 000 €</span> économisés par an pour un bénéfice de 180 000 €.
                  </p>
                </div>
                <ul className="mt-10 space-y-4">
                  {leviers.map((l, i) => (
                    <li key={l} className="flex items-start gap-4 group">
                      <span className="font-display italic text-accent/60 group-hover:text-accent text-[14px] leading-none mt-1 flex-shrink-0 transition-colors duration-300 w-7">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] md:text-[15px] text-foreground/85 font-body leading-[1.7] flex-1 border-b border-border/40 pb-3 group-hover:border-accent/30 transition-colors duration-300">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollRevealDiv>

              <ScrollRevealDiv delay={0.15} className="lg:col-span-6 relative">
                <div className="absolute -inset-8 bg-accent/5 rounded-[40px] blur-3xl -z-10" />
                <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
                  <img
                    src={imgLeviers}
                    alt="Leviers d'optimisation fiscale belge — MFinances"
                    className="w-full h-auto"
                    loading="lazy"
                  />
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
                  Les questions que les dirigeants nous posent le plus souvent sur la fiscalité belge.
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
                Nos <span className="text-accent">articles</span> fiscalité
              </h2>
            </ScrollRevealDiv>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Combien me payer en indépendant en Belgique ?", href: "/blog/fiscalite-belgique/combien-me-payer-independant-belgique/" },
                { title: "Je paye trop d'impôts en Belgique — vrai ou faux ?", href: "/blog/fiscalite-belgique/je-paye-trop-impots-belgique/" },
                { title: "Déclaration ISOC — guide sans surprise", href: "/blog/fiscalite-belgique/declaration-isoc-belgique/" },
                { title: "Pourquoi mon comptable ne m'aide pas ?", href: "/blog/fiscalite-belgique/pourquoi-comptable-aide-pas/" },
                { title: "Rémunération du dirigeant — salaire ou dividendes", href: "/blog/fiscalite-belgique/remuneration-dirigeant-belgique/" },
                { title: "Voiture de société Belgique 2026", href: "/blog/fiscalite-belgique/voiture-societe-belgique/" },
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
          titleStart="Optimisez votre fiscalité —"
          titleItalic="en toute légalité"
          description="Premier échange gratuit et confidentiel. Nous analysons votre situation et vous présentons les leviers activables."
          watermark="Optimisons"
          ctaPrimary={{ label: "Consultation gratuite", href: "/contact/" }}
          ctaSecondary={{ label: "Découvrir nos services", href: "/#services" }}
          bgImageAlt="Consultation fiscale — MFinances"
        />
      </main>

      <Footer />
    </div>
  );
}
