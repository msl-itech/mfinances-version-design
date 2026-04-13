import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/tresorerie-hero.jpg";
import imgOdoo from "@/assets/tresorerie-odoo.jpg";
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
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function Tresorerie() {
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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Trésorerie</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Forfait Excellence
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Votre trésorerie sous contrôle — chaque mois, sans mauvaise surprise
                </h1>
                <p className="text-primary-foreground/85 text-[16px] md:text-[18px] leading-relaxed mt-5 font-body">
                  Un prévisionnel actualisé sur données réelles. Vous voyez les tensions 3 mois à l'avance.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-7">
                  <span className="bg-primary-foreground/15 text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                    Forfait Excellence
                  </span>
                  <span className="bg-primary-foreground/15 text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                    Mise à jour mensuelle
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src={imgHero}
                alt="Prévisionnel de trésorerie sur écran — MFinances"
                className="rounded-2xl shadow-2xl w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* SECTION 1 — Douleur trésorerie */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-12">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Pourquoi la trésorerie est le principal stress
                <br />
                <span className="text-accent">des dirigeants de TPE</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mt-5 font-body max-w-[640px] mx-auto">
                Vous êtes rentable sur le papier, mais votre compte en banque raconte une autre histoire.
                Ce n'est pas un problème de performance — c'est un problème de visibilité.
              </p>
            </ScrollRevealDiv>

            <div className="space-y-5">
              {painPoints.map((p, i) => {
                const Icon = p.icon;
                return (
                  <ScrollRevealDiv key={p.title} delay={0.08 * i} className="flex items-start gap-4 p-5 rounded-xl bg-secondary/60 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold font-body text-foreground">{p.title}</h3>
                      <p className="text-[14px] text-muted-foreground leading-relaxed font-body mt-1">{p.desc}</p>
                    </div>
                  </ScrollRevealDiv>
                );
              })}
            </div>

            <ScrollRevealDiv delay={0.3} className="text-center mt-10">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/diagnostic/">
                  Faire le diagnostic gratuit
                  <ArrowRight size={16} className="ml-1 flex-shrink-0" />
                </Link>
              </Button>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* SECTION 2 — Ce qu'on met en place */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que comprend votre
                <br />
                <span className="text-accent">trésorerie prévisionnelle</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <ScrollRevealDiv key={c.title} delay={0.1 * i} className="bg-card rounded-2xl p-7 border border-border/50 relative">
                    <span className="text-[48px] font-display font-bold text-accent/10 absolute top-4 right-5 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[17px] font-bold font-body text-foreground mb-2">{c.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed font-body">{c.desc}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3 — Périodes critiques */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Les périodes critiques
                <br />
                <span className="text-accent">à anticiper en Belgique</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {timeline.map((t, i) => (
                <ScrollRevealDiv key={t.period} delay={0.1 * i} className="relative">
                  <div className="bg-secondary/60 rounded-2xl p-6 border border-border/50 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarDays size={16} className="text-accent" strokeWidth={1.5} />
                      <span className="text-[12px] font-bold text-accent uppercase tracking-wider font-body">{t.period}</span>
                    </div>
                    <h3 className="text-[16px] font-bold font-body text-foreground mb-1.5">{t.label}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed font-body">{t.desc}</p>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
                  )}
                </ScrollRevealDiv>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — Odoo */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollRevealDiv>
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw size={18} className="text-accent" strokeWidth={1.5} />
                <span className="text-[12px] font-bold text-accent uppercase tracking-wider font-body">Intégration</span>
              </div>
              <h2 className="font-display text-[24px] md:text-[36px] leading-[1.15] text-foreground">
                Synchronisation automatique
                <br />
                <span className="text-accent">avec Odoo</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mt-4 font-body">
                Vos données réelles alimentent automatiquement votre prévisionnel.
                Pas de ressaisie manuelle, pas d'erreurs, pas de perte de temps.
              </p>
              <ul className="mt-6 space-y-3 font-body text-[14px] text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Factures clients et fournisseurs synchronisées
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Mouvements bancaires intégrés automatiquement
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Prévisionnel mis à jour en temps réel
                </li>
              </ul>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.15}>
              <img
                src={imgOdoo}
                alt="Synchronisation automatique Odoo vers le prévisionnel de trésorerie"
                className="rounded-2xl w-full h-auto shadow-md"
                loading="lazy"
              />
            </ScrollRevealDiv>
          </div>
        </section>

        {/* SECTION FAQ */}
        <section className="bg-card py-10 md:py-20">
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
                    className="bg-secondary/60 rounded-xl border border-border/50 px-6 overflow-hidden"
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

        {/* ── ARTICLES LIÉS ── */}
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[32px] text-foreground mb-8 text-center leading-[1.15]">
                Nos articles <span className="text-accent">trésorerie</span>
              </h2>
            </ScrollRevealDiv>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { slug: "pourquoi-pas-argent-sur-compte", title: "Pourquoi je n'ai jamais d'argent sur mon compte ?", excerpt: "Vous travaillez, vous facturez, et pourtant votre compte est toujours vide." },
                { slug: "argent-disparait-fin-mois", title: "Bénéfices mais pas d'argent — pourquoi ?", excerpt: "Vous êtes rentable sur le papier mais votre compte est vide en fin de mois." },
                { slug: "stress-fin-mois-dirigeant-tpe", title: "Le stress de fin de mois des dirigeants de TPE", excerpt: "Chaque fin de mois, vous vérifiez votre compte avec appréhension." },
                { slug: "combien-reserve-securite-tpe", title: "Combien mettre de côté en réserve de sécurité ?", excerpt: "La règle des 3 mois expliquée simplement pour les indépendants." },
              ].map((a, i) => (
                <ScrollRevealDiv key={a.slug} delay={0.06 + i * 0.04}>
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
                </ScrollRevealDiv>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Partenariat financier" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <AlertTriangle size={32} className="text-accent mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
              Votre trésorerie est-elle vraiment sous contrôle ?
            </h2>
            <p className="text-primary-foreground/70 text-[16px] mt-4 font-body">
              8 questions pour identifier vos points de fragilité — résultat immédiat, gratuit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/diagnostic/">
                  Voir si mon entreprise est en danger
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
