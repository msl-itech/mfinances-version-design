import { useEffect } from "react";
import { Link } from "react-router-dom";
import imgHero from "@/assets/creation-hero.jpg";
import imgSteps from "@/assets/creation-steps.jpg";
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
    document.title = "Création d'Entreprise à Bruxelles — Expert-Comptable MFinances";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Plan financier, choix de la forme juridique et accompagnement à l'acte authentique. 800€ HTVA. Cabinet MFinances, Bruxelles.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/services/creation-entreprise/";

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
        {/* ── HERO ── */}
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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Création d'entreprise</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  800 € HTVA — Forfait tout compris
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Lancez votre entreprise sur des bases solides — <span className="text-accent">dès le premier jour</span>
                </h1>
                <p className="text-primary-foreground/85 text-[16px] md:text-[18px] leading-relaxed mt-5 font-body">
                  Créer une entreprise en Belgique, c'est excitant. C'est aussi une série de décisions structurantes qui engagent votre avenir financier, fiscal et juridique pour des années.
                </p>
                <p className="text-primary-foreground/60 text-[13px] leading-relaxed mt-3 font-body italic">
                  Les erreurs de départ sont les plus coûteuses — et les plus évitables.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-7">
                  {["Plan financier", "Forme juridique", "Acte authentique"].map((pill) => (
                    <span key={pill} className="bg-primary-foreground/15 text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                    <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src={imgHero}
                alt="Création d'entreprise à Bruxelles — MFinances"
                className="rounded-2xl shadow-2xl w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 1 — Le problème ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={26} className="text-accent" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que personne ne vous dit <span className="text-accent">au moment de créer</span>
              </h2>
            </ScrollRevealDiv>
            <ScrollRevealDiv delay={0.1}>
              <div className="space-y-4 text-[15px] md:text-[16px] leading-[1.8] text-muted-foreground font-body">
                <p>La <strong className="text-foreground">structure juridique choisie à la hâte</strong> qui coûte cher fiscalement trois ans plus tard.</p>
                <p>Le <strong className="text-foreground">plan financier bâclé</strong> qui ne convainc pas la banque.</p>
                <p>Le <strong className="text-foreground">capital de départ sous-estimé</strong> qui fragilise la trésorerie dès le premier mois.</p>
              </div>
            </ScrollRevealDiv>
            <ScrollRevealDiv delay={0.2} className="text-center mt-8">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/contact/">Éviter ces erreurs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
              </Button>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION 2 — Accompagnement (4 cards) ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Notre accompagnement <span className="text-accent">à la création</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv key={s.title} delay={0.08 + i * 0.06} className="bg-card rounded-2xl p-7 border border-border/50 relative hover:shadow-[0_8px_32px_hsl(var(--primary)/0.08)] transition-shadow">
                    <span className="text-[48px] font-display font-bold text-accent/10 absolute top-4 right-5 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
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

        {/* ── SECTION 3 — Ce que vous obtenez (table + image) ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] leading-[1.15] text-foreground mb-8">
                Ce que vous obtenez <span className="text-accent">concrètement</span>
              </h2>
              {/* Desktop table */}
              <div className="hidden sm:block bg-secondary/60 rounded-2xl border border-border/50 overflow-hidden">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left p-4 font-body font-semibold text-foreground/70 text-[12px] uppercase tracking-wider">Étape</th>
                      <th className="text-left p-4 font-body font-semibold text-foreground/70 text-[12px] uppercase tracking-wider">Ce que MFinances produit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, i) => (
                      <tr key={i} className={`border-b border-border/20 last:border-0 ${row.highlight ? "bg-accent/[0.05]" : ""}`}>
                        <td className={`p-4 font-medium font-body ${row.highlight ? "text-accent font-bold" : row.muted ? "text-muted-foreground" : "text-foreground/80"}`}>
                          {row.step}
                        </td>
                        <td className={`p-4 font-body ${row.highlight ? "text-accent font-semibold" : row.muted ? "text-muted-foreground italic text-[13px]" : "text-muted-foreground"}`}>
                          {row.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {tableRows.map((row, i) => (
                  <div key={i} className={`rounded-xl border border-border/50 p-4 ${row.highlight ? "bg-accent/[0.05]" : "bg-secondary/60"}`}>
                    <p className={`text-[14px] font-semibold font-body mb-1 ${row.highlight ? "text-accent" : row.muted ? "text-muted-foreground" : "text-foreground"}`}>
                      {row.step}
                    </p>
                    <p className={`text-[13px] font-body leading-relaxed ${row.highlight ? "text-accent font-medium" : row.muted ? "text-muted-foreground italic" : "text-muted-foreground"}`}>
                      {row.detail}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.15}>
              <img
                src={imgSteps}
                alt="Étapes de création d'entreprise — MFinances"
                className="rounded-2xl w-full h-auto shadow-md"
                loading="lazy"
              />
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION FAQ ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Questions <span className="text-accent">fréquentes</span>
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

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Accompagnement création d'entreprise" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Prêt à lancer votre entreprise ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel. Nous analysons votre projet et vous présentons les étapes concrètes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                  <Link to="/#services">Découvrir nos services <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
