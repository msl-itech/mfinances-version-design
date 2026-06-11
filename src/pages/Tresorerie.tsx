import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/tresorerie-hero.jpg";
import imgOdoo from "@/assets/tresorerie-odoo.jpg";

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
  Clock,
  AlertTriangle,
  TrendingDown,
  Rocket,
  Table2,
  GitBranch,
  Bell,
  RefreshCw,
  CalendarDays,
} from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const painPoints = [
  { icon: Clock, title: "Décalages de paiement", desc: "Vos clients paient à 60 jours, vos fournisseurs à 30. Le décalage grignote votre trésorerie sans que vous ne le voyiez." },
  { icon: TrendingDown, title: "Investissements mal financés", desc: "Un achat financé sur la trésorerie courante au lieu d'un crédit adapté peut créer une crise de liquidité." },
  { icon: Rocket, title: "Croissance qui consomme du cash", desc: "Plus vous vendez, plus vous avez besoin de fonds de roulement. La croissance peut tuer une entreprise rentable." },
];

const cards = [
  { icon: Table2, title: "Tableau prévisionnel mensuel", desc: "Mis à jour chaque mois sur vos données réelles Odoo. Vous voyez exactement où va votre cash." },
  { icon: GitBranch, title: "Scénarios", desc: "Base, optimiste, pessimiste — pour chaque décision importante, vous voyez l'impact sur votre trésorerie." },
  { icon: Bell, title: "Alertes préventives", desc: "Notification 8 semaines avant une tension identifiée. Vous avez le temps de réagir." },
];

const timeline = [
  { period: "Janv — Mars", label: "Cotisations sociales", desc: "Régularisation annuelle des cotisations sociales provisoires." },
  { period: "Avr — Juin", label: "TVA Q1", desc: "Déclaration et paiement de la TVA du premier trimestre." },
  { period: "Sept — Oct", label: "Rentrée", desc: "Recrutements, stocks, investissements de rentrée." },
  { period: "Décembre", label: "Pré-paiement TVA", desc: "Acompte TVA de décembre — souvent sous-estimé." },
];

const faqs = [
  {
    q: "Quelle est la différence entre un prévisionnel de trésorerie et un budget ?",
    a: "Le budget mesure votre rentabilité (revenus moins charges). Le prévisionnel de trésorerie mesure vos encaissements et décaissements réels — c'est-à-dire le cash qui entre et sort de votre compte. Vous pouvez être rentable et manquer de cash.",
  },
  {
    q: "Dois-je utiliser Odoo pour bénéficier de ce service ?",
    a: "Nous travaillons principalement avec Odoo pour la synchronisation automatique des données. Si vous utilisez un autre logiciel comptable, nous pouvons adapter le processus, mais la mise à jour sera manuelle.",
  },
  {
    q: "Que se passe-t-il si une tension est détectée ?",
    a: "Vous recevez une alerte 8 semaines à l'avance avec une analyse de la cause et des recommandations concrètes : négocier un délai fournisseur, activer une ligne de crédit, reporter un investissement, etc.",
  },
  {
    q: "Pourquoi faire appel à un expert-comptable ITAA à Bruxelles pour sa trésorerie ?",
    a: "Un expert-comptable certifié ITAA comme MFinances ne se contente pas d'encoder vos factures. Nous analysons vos flux réels sur Odoo pour anticiper les tensions de trésorerie 3 mois à l'avance, ce qui est crucial pour les TPE en croissance à Bruxelles et en Belgique."
  },
  {
    q: "Combien coûte la gestion de trésorerie prévisionnelle chez MFinances ?",
    a: "Chez MFinances, le pilotage de la trésorerie est inclus dans notre Forfait Excellence (à partir de 650€ HTVA/mois). Ce forfait intègre la comptabilité complète, le contrôle de gestion et un DAF externalisé."
  }
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mfinances.be/services/" },
    { "@type": "ListItem", position: 3, name: "Trésorerie", item: "https://mfinances.be/services/tresorerie/" },
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



export default function Tresorerie() {
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
    <div className="min-h-screen">
      <SEOHead
        title="Gestion de Trésorerie TPE à Bruxelles — MFinances"
        description="Trésorerie prévisionnelle mensuelle pour anticiper les tensions et sécuriser votre croissance. Inclus dans le forfait Excellence. MFinances, Bruxelles."
        canonical="https://mfinances.be/services/tresorerie/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Header />

      <main>
        <ServicePageHero
          breadcrumbLabel="Trésorerie"
          eyebrow="Forfait Excellence"
          number="03"
          sectionLabel="Trésorerie prévisionnelle"
          titleStart="Votre trésorerie sous contrôle —"
          titleItalic="sans mauvaise"
          titleEnd="surprise"
          description="Un prévisionnel actualisé chaque mois sur vos données réelles Odoo. Vous voyez les tensions 3 mois à l'avance et avez le temps de réagir, plutôt que de subir."
          pills={["Forfait Excellence", "Mise à jour mensuelle", "Synchro Odoo"]}
          image={imgHero}
          imageAlt="Prévisionnel de trésorerie sur écran — MFinances"
          plaque="N°03 / Trésorerie"
          cardTitlePrefix="Le cash,"
          cardTitleAccent="anticipé"
          cardSubtitle="3 mois d'avance · Alertes"
          ctaPrimary={{ label: "Diagnostic gratuit", href: "/diagnostic/" }}
          ctaSecondary={{ label: "Voir les tarifs", href: "/tarifs/" }}
          watermark="Cash"
        />

        {/* TL;DR (AEO / GEO Optimization) */}
        <section className="bg-card pt-16 pb-8">
          <div className="container-mf">
            <aside data-anim="fade-up" className="bg-secondary/30 border border-accent/20 rounded-2xl p-8 lg:p-10 max-w-[900px] mx-auto shadow-sm">
              <h2 className="font-display text-[20px] md:text-[24px] font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[14px]">💡</span>
                L'essentiel en bref (TL;DR)
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-[15px] font-body text-foreground/80"><strong>Pour qui ?</strong> Les dirigeants de TPE en croissance à <strong>Bruxelles</strong> et en Belgique.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-[15px] font-body text-foreground/80"><strong>Quoi ?</strong> Un tableau de bord prévisionnel de trésorerie avec 3 mois d'avance, synchronisé en direct avec Odoo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-[15px] font-body text-foreground/80"><strong>Pourquoi ?</strong> Pour anticiper les décalages de paiement, financer la croissance sereinement et éliminer le stress des fins de mois.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-[15px] font-body text-foreground/80"><strong>Notre expertise :</strong> Suivi mensuel par <strong>Mika Musungayi</strong>, expert-comptable ITAA, intégré dans le Forfait Excellence.</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* SECTION 1 — Douleur trésorerie (split éditorial) */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -right-12 top-12 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Tension
            </span>
          </div>

          <div className="container-mf relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div data-anim="fade-up" className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    02 — Le problème
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Pourquoi la gestion de la trésorerie est-elle{" "}
                  <span className="italic font-normal text-accent">le principal stress</span>{" "}
                  des dirigeants de TPE à Bruxelles ?
                </h2>
                <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.75] mt-6 font-body max-w-[440px]">
                  Vous êtes rentable sur le papier, mais votre compte en banque raconte une autre histoire. Ce n'est pas un problème de performance — c'est un problème de visibilité.
                </p>
                <div className="mt-8">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-nowrap" asChild>
                    <Link to="/diagnostic/">
                      Faire le diagnostic gratuit <ArrowRight size={16} className="ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {painPoints.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div data-anim="fade-up" data-delay="0.08 * i"
                      key={p.title}
                      
                      className="group relative flex items-start gap-5 p-7 rounded-2xl bg-secondary/40 hover:bg-card border border-border/50 hover:border-accent/30 transition-all duration-500"
                    >
                      <span className="font-display italic text-accent/40 group-hover:text-accent text-[18px] leading-none mt-1 flex-shrink-0 transition-colors duration-300 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:-rotate-6 transition-all duration-500">
                        <Icon size={20} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[17px] font-display font-bold text-foreground leading-tight">{p.title}</h3>
                        <p className="text-[14px] text-muted-foreground leading-[1.7] font-body mt-2">{p.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — Ce qu'on met en place */}
        <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none"
              style={{ fontSize: "clamp(140px, 20vw, 320px)", letterSpacing: "-0.04em" }}
            >
              Dispositif
            </span>
          </div>

          <div className="container-mf relative">
            <div data-anim="fade-up" className="text-center mb-16 max-w-[680px] mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  03 — Notre dispositif
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>
                Comment mettons-nous en place votre{" "}
                <span className="italic font-normal text-accent">trésorerie prévisionnelle</span>{" "}
                sur Odoo ?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div data-anim="fade-up" data-delay="0.1 * i"
                    key={c.title}
                    
                    className="group relative bg-card rounded-3xl p-8 border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.12)] overflow-hidden"
                  >
                    <span
                      className="absolute -top-4 -right-2 font-display italic font-bold text-foreground/[0.06] group-hover:text-accent/15 leading-none transition-colors duration-500"
                      style={{ fontSize: "120px" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2 mb-6 relative">
                      <div className="h-px w-6 bg-accent" />
                      <span className="text-[10px] uppercase tracking-[0.22em] text-accent font-medium">
                        Volet {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:-rotate-6 transition-all duration-500 relative">
                      <Icon size={22} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[19px] font-display font-bold text-foreground mb-3 leading-tight relative">{c.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body relative">{c.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3 — Périodes critiques (timeline horizontale) */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -left-10 top-12 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Calendrier
            </span>
          </div>

          <div className="container-mf relative">
            <div data-anim="fade-up" className="max-w-[680px] mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  04 — Calendrier belge
                </span>
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                Quelles sont les périodes fiscales critiques{" "}
                <span className="italic font-normal text-accent">à anticiper</span>{" "}
                en Belgique ?
              </h2>
            </div>

            <div className="relative">
              <div aria-hidden className="hidden lg:block absolute top-[42px] left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {timeline.map((t, i) => (
                  <div data-anim="fade-up" data-delay="0.1 * i" key={t.period}  className="relative">
                    {/* dot */}
                    <div className="hidden lg:flex justify-center mb-6 relative">
                      <div className="w-[18px] h-[18px] rounded-full bg-card border-2 border-accent flex items-center justify-center relative z-10">
                        <div className="w-[6px] h-[6px] rounded-full bg-accent" />
                      </div>
                    </div>
                    <div className="bg-secondary/40 hover:bg-card group rounded-2xl p-6 border border-border/50 hover:border-accent/30 transition-all duration-500 h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <CalendarDays size={14} className="text-accent" strokeWidth={1.5} />
                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.22em] font-body">{t.period}</span>
                      </div>
                      <h3 className="text-[16px] font-display font-bold text-foreground mb-2 leading-tight">{t.label}</h3>
                      <p className="text-[13px] text-muted-foreground leading-[1.65] font-body">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — Odoo (split + grand visuel) */}
        <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -right-10 top-1/3 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(120px, 16vw, 240px)", letterSpacing: "-0.04em" }}
            >
              Sync
            </span>
          </div>

          <div className="container-mf relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div data-anim="fade-up" className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    05 — Intégration Odoo
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Comment fonctionne la synchronisation{" "}
                  <span className="italic font-normal text-accent">automatique</span>
                  <br />avec Odoo ?
                </h2>
                <p className="text-muted-foreground text-[15px] leading-[1.75] mt-6 font-body max-w-[460px]">
                  Vos données réelles alimentent automatiquement votre prévisionnel. Pas de ressaisie manuelle, pas d'erreurs, pas de perte de temps.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Factures clients et fournisseurs synchronisées",
                    "Mouvements bancaires intégrés automatiquement",
                    "Prévisionnel mis à jour en temps réel",
                  ].map((item, i) => (
                    <li key={item} className="flex items-start gap-4 group">
                      <span className="font-display italic text-accent text-[16px] leading-none mt-1 flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] md:text-[15px] text-foreground/85 font-body leading-[1.65]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div data-anim="fade-up" data-delay="0.15"  className="lg:col-span-7 relative">
                <div className="absolute -inset-8 bg-accent/5 rounded-[40px] blur-3xl -z-10" />
                <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
                  <img
                    src={imgOdoo}
                    alt="Synchronisation automatique Odoo vers le prévisionnel de trésorerie"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/95 backdrop-blur-sm border border-border/60">
                    <RefreshCw size={12} className="text-accent" strokeWidth={2} />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/80 font-semibold">Live sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION FAQ (éditoriale numérotée) */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div className="container-mf relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div data-anim="fade-up" className="lg:col-span-4 lg:sticky lg:top-28 self-start">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    06 — FAQ
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Questions{" "}
                  <span className="italic font-normal text-accent">fréquentes</span>
                </h2>
                <p className="text-muted-foreground text-[15px] leading-[1.75] mt-6 font-body max-w-[360px]">
                  Tout ce que les dirigeants nous demandent avant de mettre en place un prévisionnel de trésorerie.
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
              </div>
            </div>
          </div>
        </section>

        {/* ── ARTICLES LIÉS ── */}
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <div data-anim="fade-up">
              <h2 className="font-display text-[24px] md:text-[32px] text-foreground mb-8 text-center leading-[1.15]">
                Nos articles <span className="text-accent">trésorerie</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { slug: "pourquoi-pas-argent-sur-compte", title: "Pourquoi je n'ai jamais d'argent sur mon compte ?", excerpt: "Vous travaillez, vous facturez, et pourtant votre compte est toujours vide." },
                { slug: "argent-disparait-fin-mois", title: "Bénéfices mais pas d'argent — pourquoi ?", excerpt: "Vous êtes rentable sur le papier mais votre compte est vide en fin de mois." },
                { slug: "stress-fin-mois-dirigeant-tpe", title: "Le stress de fin de mois des dirigeants de TPE", excerpt: "Chaque fin de mois, vous vérifiez votre compte avec appréhension." },
                { slug: "combien-reserve-securite-tpe", title: "Combien mettre de côté en réserve de sécurité ?", excerpt: "La règle des 3 mois expliquée simplement pour les indépendants." },
              ].map((a, i) => (
                <div data-anim="fade-up" data-delay="0.06 + i * 0.04" key={a.slug} >
                  <Link
                    to={`/blog/tresorerie/${a.slug}/`}
                    className="group block bg-secondary/60 rounded-2xl p-6 border border-border/50 hover:border-accent/30 transition-all"
                  >
                    <h3 className="text-[15px] font-bold font-body text-foreground group-hover:text-accent transition-colors leading-snug mb-2">
                      {a.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground font-body leading-relaxed">{a.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-accent text-[12px] font-semibold mt-3">
                      Lire <ArrowRight size={12} />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServicePageCTA
          titleStart="Votre trésorerie est-elle"
          titleItalic="vraiment"
          titleEnd="sous contrôle ?"
          description="8 questions pour identifier vos points de fragilité — résultat immédiat, gratuit. Premier échange confidentiel pour voir comment sécuriser votre cash."
          watermark="Anticipons"
          ctaPrimary={{ label: "Faire le diagnostic", href: "/diagnostic/" }}
          ctaSecondary={{ label: "Voir nos tarifs", href: "/tarifs/" }}
        />
      </main>

      <Footer />
    </div>
  );
}
