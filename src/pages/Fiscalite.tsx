import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/fiscalite-hero.jpg";
import imgLeviers from "@/assets/fiscalite-leviers.jpg";
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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Fiscalité</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Optimisation fiscale
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Payez ce que vous devez — <span className="text-accent">pas un euro de plus</span>
                </h1>
                <p className="text-primary-foreground/85 text-[16px] md:text-[18px] leading-relaxed mt-5 font-body">
                  La fiscalité belge est complexe, dense et en constante évolution. Bien comprise, elle contient des leviers puissants pour optimiser votre situation.
                </p>
                <p className="text-primary-foreground/60 text-[13px] leading-relaxed mt-3 font-body italic">
                  Toute optimisation fiscale est réalisée dans le strict respect du cadre légal en vigueur et après analyse personnalisée de votre dossier. Les résultats obtenus varient selon les situations.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-7">
                  {["ISOC · IPP · TVA", "Planification patrimoniale"].map((pill) => (
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
                alt="Optimisation fiscale pour dirigeants de TPE — MFinances"
                className="rounded-2xl shadow-2xl w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 1 — Le problème ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Le problème avec la fiscalité <span className="text-accent">des dirigeants de TPE</span>
              </h2>
            </ScrollRevealDiv>
            <ScrollRevealDiv delay={0.1}>
              <p className="text-[15px] md:text-[16px] leading-[1.8] text-muted-foreground text-center font-body">
                La plupart des dirigeants de TPE <strong className="text-foreground">subissent leur fiscalité</strong>. Ils découvrent leur charge d'imposition en fin d'année — quand il est trop tard pour agir. L'optimisation fiscale, ce n'est pas de l'évasion. C'est la connaissance précise des dispositifs légaux belges.
              </p>
            </ScrollRevealDiv>
            <ScrollRevealDiv delay={0.2} className="text-center mt-8">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/contact/">Faire le point sur ma fiscalité <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
              </Button>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION 2 — Accompagnement (6 cards) ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que comprend notre <span className="text-accent">accompagnement fiscal</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* ── SECTION 3 — Leviers fiscaux (with image) ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] leading-[1.15] text-foreground">
                Les leviers fiscaux belges <span className="text-accent">que nous maîtrisons</span>
              </h2>
              <ul className="mt-8 space-y-3">
                {leviers.map((l) => (
                  <li key={l} className="flex items-start gap-3 font-body text-[14px] text-foreground/80">
                    <ChevronRight size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.15}>
              <img
                src={imgLeviers}
                alt="Leviers d'optimisation fiscale belge — MFinances"
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

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation fiscale" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Optimisez votre fiscalité — en toute légalité
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel. Nous analysons votre situation et vous présentons les leviers activables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/#services">Découvrir nos services <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
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
