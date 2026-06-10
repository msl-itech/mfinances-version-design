import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/compta-hero.jpg";
import imgOdoo from "@/assets/compta-odoo.jpg";

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
  BookOpen,
  Zap,
  FileCheck,
  BarChart3,
  Settings,
  Lightbulb,
  Check,
  Minus,
  Quote,
  RefreshCw,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  { icon: BookOpen, title: "Comptabilité générale et analytique", desc: "Tenue complète de votre comptabilité avec analyse détaillée par activité, projet ou centre de coût." },
  { icon: Zap, title: "Encodage automatisé", desc: "Simplification et automatisation de l'encodage de vos documents — factures, notes de frais, relevés bancaires." },
  { icon: FileCheck, title: "Déclarations fiscales complètes", desc: "TVA, ISOC, IPP, bilans, comptes annuels — toutes vos obligations fiscales gérées dans les délais, sans stress." },
  { icon: BarChart3, title: "Tableaux de bord personnalisés", desc: "Suivi régulier avec reporting financier adapté à votre activité. Vos chiffres clés accessibles en temps réel sur Odoo." },
  { icon: Settings, title: "Intégration et configuration Odoo", desc: "Plan comptable belge, paramétrage TVA, relances clients personnalisées, connexion à vos flux existants." },
  { icon: Lightbulb, title: "Conseil fiscal continu", desc: "Nous vous accompagnons tout au long de l'exercice pour anticiper et réduire votre charge fiscale." },
];

const testimonials = [
  { quote: "Depuis que notre comptabilité est gérée sur Odoo avec MFinances, nous avons gagné en visibilité, en efficacité et en sérénité.", author: "Damien", role: "Dirigeant d'une société de services B2B" },
  { quote: "En tant qu'indépendante, j'avais besoin de clarté. MFinances a tout mis en place pour que je puisse me concentrer sur mon métier.", author: "Cindie", role: "Kinésithérapeute à Bruxelles" },
  { quote: "Gérer une activité Horeca implique beaucoup de flux. MFinances a su intégrer Odoo à notre gestion quotidienne.", author: "Yanis", role: "Restaurateur à Bruxelles" },
];

const faqs = [
  { q: "Pourquoi choisir un expert-comptable qui maîtrise Odoo ?", a: "Parce que la comptabilité intégrée dans votre ERP élimine les doublons, réduit les erreurs de ressaisie et vous donne une vision financière en temps réel." },
  { q: "MFinances peut-il reprendre ma comptabilité si je suis déjà sur Odoo ?", a: "Oui. Nous intégrons votre environnement Odoo existant sans ressaisie ni migration douloureuse." },
  { q: "Quelles déclarations fiscales MFinances gère-t-il pour une société belge ?", a: "Déclarations TVA périodiques, déclaration ISOC, IPP pour les indépendants, comptes annuels et bilans déposés à la Banque Nationale de Belgique." },
];

const planRows = [
  { label: "Comptabilité + déclarations", values: [true, true, true] },
  { label: "Tableaux de bord Odoo", values: [true, true, true] },
  { label: "Contrôle de gestion", values: ["—", "Trimestriel", "Mensuel"] },
  { label: "Trésorerie prévisionnelle", values: ["—", "—", "✓ mensuelle"] },
  { label: "Tarif mensuel HTVA", values: ["350 €", "450 €", "650 €"] },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mfinances.be/services/" },
    { "@type": "ListItem", position: 3, name: "Comptabilité", item: "https://mfinances.be/services/comptabilite/" },
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

export default function Comptabilite() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Comptabilité sur Odoo pour TPE à Bruxelles — MFinances"
        description="Comptabilité claire et proactive intégrée dans Odoo : encodage automatisé, déclarations fiscales et tableaux de bord. MFinances, Bruxelles."
        canonical="https://mfinances.be/services/comptabilite/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Header />

      <main>
        <ServicePageHero
          breadcrumbLabel="Comptabilité"
          eyebrow="Inclus dès le forfait Essentiel"
          number="04"
          sectionLabel="Comptabilité Odoo"
          titleStart="Votre comptabilité, claire et"
          titleItalic="sans stress"
          titleEnd="— intégrée dans Odoo"
          description="Vous dirigez une entreprise en croissance. Votre comptabilité doit vous donner de la visibilité — pas vous faire perdre du temps."
          pills={["Inclus dès le forfait Essentiel", "Intégration Odoo", "Encodage automatisé"]}
          image={imgHero}
          imageAlt="Tableau de bord comptable Odoo — MFinances"
          plaque="N°04 / Comptabilité"
          cardTitlePrefix="Compta"
          cardTitleAccent="centralisée"
          cardSubtitle="Odoo · Temps réel · Zéro ressaisie"
          ctaPrimary={{ label: "Demander un devis", href: "/contact/" }}
          ctaSecondary={{ label: "Voir les tarifs", href: "/tarifs/" }}
          watermark="Compta"
        />


        {/* ── SECTION 1 — Pourquoi Odoo (manifesto éditorial) ── */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none"
              style={{ fontSize: "clamp(140px, 22vw, 340px)", letterSpacing: "-0.04em" }}
            >
              Odoo
            </span>
          </div>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  02 — Manifesto
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <ScrollRevealDiv>
                <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
                  Pourquoi Odoo{" "}
                  <span className="italic font-normal text-accent">change tout</span>
                </h2>
              </ScrollRevealDiv>
              <ScrollRevealDiv delay={0.1}>
                <p className="text-[16px] md:text-[18px] leading-[1.8] text-muted-foreground mt-8 font-body">
                  La plupart des cabinets comptables travaillent en silo — vous envoyez vos documents, ils produisent vos chiffres, vous attendez. <strong className="text-foreground">Odoo casse ce modèle.</strong> Vos données sont centralisées, votre comptabilité est en temps réel.
                </p>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 — Services (6 cards éditoriales) ── */}
        <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -right-12 top-12 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Service
            </span>
          </div>

          <div className="container-mf relative">
            <ScrollRevealDiv className="max-w-[680px] mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  03 — Notre service comptable
                </span>
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                Ce que comprend notre{" "}
                <span className="italic font-normal text-accent">service comptable</span>
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
                      <span className="text-[10px] uppercase tracking-[0.22em] text-accent font-medium">
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

        {/* ── SECTION 3 — Témoignages éditoriaux ── */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -left-10 top-12 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Confiance
            </span>
          </div>

          <div className="container-mf relative">
            <ScrollRevealDiv className="text-center mb-16 max-w-[680px] mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  04 — Témoignages
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>
                Ils nous font{" "}
                <span className="italic font-normal text-accent">confiance</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((t, i) => (
                <ScrollRevealDiv
                  key={t.author}
                  delay={0.1 + i * 0.08}
                  className="group relative bg-secondary/40 hover:bg-card rounded-3xl p-8 border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.12)] flex flex-col"
                >
                  <span className="font-display italic text-accent text-[44px] leading-none mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">"</span>
                  <p className="text-[14px] md:text-[15px] text-foreground/85 leading-[1.75] font-body italic flex-1">
                    {t.quote}
                  </p>
                  <div className="mt-7 pt-5 border-t border-border/40 flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold text-[14px] text-foreground">{t.author}</p>
                      <p className="text-[12px] text-muted-foreground font-body mt-0.5">{t.role}</p>
                    </div>
                    <span className="font-display italic text-muted-foreground/30 text-[14px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </ScrollRevealDiv>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — Odoo split éditorial ── */}
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
              <ScrollRevealDiv className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                    05 — Intégration
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Tout est{" "}
                  <span className="italic font-normal text-accent">centralisé</span>
                  <br />dans Odoo
                </h2>
                <p className="text-muted-foreground text-[15px] leading-[1.75] mt-6 font-body max-w-[460px]">
                  Vos factures, vos relevés bancaires, vos déclarations — tout est connecté dans un seul environnement. Plus de ressaisie, plus de doublons, plus d'erreurs.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Plan comptable belge pré-configuré",
                    "Encodage automatisé des documents",
                    "Tableaux de bord accessibles en temps réel",
                  ].map((item, i) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="font-display italic text-accent text-[16px] leading-none mt-1 flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] md:text-[15px] text-foreground/85 font-body leading-[1.65]">{item}</span>
                    </li>
                  ))}
                </ul>
              </ScrollRevealDiv>

              <ScrollRevealDiv delay={0.15} className="lg:col-span-7 relative">
                <div className="absolute -inset-8 bg-accent/5 rounded-[40px] blur-3xl -z-10" />
                <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
                  <img
                    src={imgOdoo}
                    alt="Centralisation comptable dans Odoo — MFinances"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/95 backdrop-blur-sm border border-border/60">
                    <RefreshCw size={12} className="text-accent" strokeWidth={2} />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/80 font-semibold">All-in-one</span>
                  </div>
                </div>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        {/* ── SECTION 5 — Tableau forfaits éditorial ── */}
        <section className="relative bg-card py-20 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.035] leading-none"
              style={{ fontSize: "clamp(140px, 20vw, 320px)", letterSpacing: "-0.04em" }}
            >
              Forfaits
            </span>
          </div>

          <div className="container-mf relative">
            <ScrollRevealDiv className="text-center mb-14 max-w-[680px] mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  06 — Niveaux
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>
                Inclus dans{" "}
                <span className="italic font-normal text-accent">tous nos forfaits</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1} className="max-w-[920px] mx-auto">
              <div className="hidden sm:block bg-secondary/30 rounded-3xl border border-border/60 overflow-hidden shadow-[0_12px_40px_-20px_hsl(var(--primary)/0.15)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead className="bg-gradient-to-b from-card to-transparent">
                      <tr className="border-b border-border/60">
                        <th className="text-left p-6 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.22em] font-body">
                          <div className="flex items-center gap-2">
                            <div className="h-px w-6 bg-accent" />
                            Fonctionnalité
                          </div>
                        </th>
                        {["Essentiel", "Premium", "Excellence"].map((plan, i) => (
                          <th key={plan} className={`p-6 text-center text-[11px] font-semibold uppercase tracking-[0.22em] font-body ${i === 2 ? "text-accent" : "text-muted-foreground"}`}>
                            <span className="flex items-center justify-center gap-2">
                              {plan}
                              {i === 2 && <span>★</span>}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {planRows.map((row, ri) => (
                        <tr key={row.label} className={`border-b border-border/40 last:border-b-0 hover:bg-card/50 transition-colors ${ri === planRows.length - 1 ? "bg-primary/[0.04]" : ""}`}>
                          <td className="p-5 font-medium text-foreground/85 font-body">
                            <span className="flex items-center gap-3">
                              <span className="font-display italic text-muted-foreground/40 text-[12px]">
                                {String(ri + 1).padStart(2, "0")}
                              </span>
                              {row.label}
                            </span>
                          </td>
                          {row.values.map((v, ci) => (
                            <td key={ci} className={`p-5 text-center ${ci === 2 ? "bg-accent/[0.03]" : ""}`}>
                              {v === true ? (
                                <Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" />
                              ) : v === "—" ? (
                                <Minus size={16} className="text-foreground/20 mx-auto" />
                              ) : (
                                <span className={`font-semibold font-body ${ri === planRows.length - 1 ? "text-primary text-[16px]" : "text-foreground/70"}`}>{v}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sm:hidden space-y-3">
                {planRows.map((row, ri) => (
                  <div key={row.label} className={`bg-secondary/40 rounded-2xl border border-border/50 p-5 ${ri === planRows.length - 1 ? "border-accent/30" : ""}`}>
                    <p className="text-[14px] font-semibold text-foreground font-body mb-4">{row.label}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Essentiel", "Premium", "Excellence"].map((plan, ci) => (
                        <div key={plan} className={`text-center p-2.5 rounded-xl ${ci === 2 ? "bg-accent/5 border border-accent/20" : "bg-card"}`}>
                          <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] font-body block mb-1.5 ${ci === 2 ? "text-accent" : "text-muted-foreground"}`}>{plan}</span>
                          {row.values[ci] === true ? (
                            <Check size={16} className="text-[hsl(145,63%,42%)] mx-auto" />
                          ) : row.values[ci] === "—" ? (
                            <Minus size={14} className="text-foreground/20 mx-auto" />
                          ) : (
                            <span className={`font-semibold font-body text-[12px] ${ri === planRows.length - 1 ? "text-primary" : "text-foreground/70"}`}>{row.values[ci]}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-nowrap" asChild>
                  <Link to="/contact/">Choisir mon forfait <ArrowRight size={16} className="ml-1.5" /></Link>
                </Button>
              </div>
            </ScrollRevealDiv>
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
                    07 — FAQ
                  </span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
                  Questions{" "}
                  <span className="italic font-normal text-accent">fréquentes</span>
                </h2>
                <p className="text-muted-foreground text-[15px] leading-[1.75] mt-6 font-body max-w-[360px]">
                  Tout ce qu'il faut savoir avant de confier votre comptabilité.
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
          titleStart="Prêt à simplifier"
          titleItalic="votre comptabilité"
          titleEnd="?"
          description="Demandez un devis gratuit — nous vous rappelons sous 72h pour en discuter."
          watermark="Comptons"
          ctaPrimary={{ label: "Demander un devis gratuit", href: "/contact/" }}
          ctaSecondary={{ label: "Découvrir nos services", href: "/#services" }}
          bgImageAlt="Partenariat comptable — MFinances"
        />
      </main>

      
      <Footer />
    </div>
  );
}
