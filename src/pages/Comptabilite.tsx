import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/compta-hero.jpg";
import imgOdoo from "@/assets/compta-odoo.jpg";
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
        description="Comptabilité claire, conforme et proactive intégrée dans Odoo. Encodage automatisé, déclarations fiscales, tableaux de bord. Cabinet MFinances, Bruxelles."
        canonical="https://mfinances.be/services/comptabilite/"
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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Comptabilité</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Inclus dès le forfait Essentiel
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Votre comptabilité, claire et sans stress — <span className="text-accent">intégrée dans Odoo</span>
                </h1>
                <p className="text-primary-foreground/85 text-[16px] md:text-[18px] leading-relaxed mt-5 font-body">
                  Vous dirigez une entreprise en croissance. Votre comptabilité doit vous donner de la visibilité — pas vous faire perdre du temps.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-7">
                  {["Inclus dès le forfait Essentiel", "Intégration Odoo"].map((pill) => (
                    <span key={pill} className="bg-primary-foreground/15 text-primary-foreground text-[13px] font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                    <Link to="/contact/">Demander un devis gratuit <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src={imgHero}
                alt="Tableau de bord comptable Odoo — MFinances"
                className="rounded-2xl shadow-2xl w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 1 — Pourquoi Odoo ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Pourquoi Odoo <span className="text-accent">change tout</span>
              </h2>
            </ScrollRevealDiv>
            <ScrollRevealDiv delay={0.1}>
              <p className="text-[15px] md:text-[16px] leading-[1.8] text-muted-foreground text-center font-body">
                La plupart des cabinets comptables travaillent en silo — vous envoyez vos documents, ils produisent vos chiffres, vous attendez. <strong className="text-foreground">Odoo casse ce modèle.</strong> Vos données sont centralisées, votre comptabilité est en temps réel.
              </p>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION 2 — Services (6 cards) ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que comprend notre <span className="text-accent">service comptable</span>
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

        {/* ── SECTION 3 — Témoignages ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ils nous font <span className="text-accent">confiance</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <ScrollRevealDiv key={t.author} delay={0.1 + i * 0.08} className="bg-secondary/60 rounded-2xl p-8 border border-border/50 hover:shadow-[0_8px_32px_hsl(var(--primary)/0.08)] transition-shadow flex flex-col">
                  <Quote size={24} className="text-accent/30 mb-4" />
                  <p className="text-[14px] text-muted-foreground leading-[1.75] italic font-body flex-1">
                    « {t.quote} »
                  </p>
                  <div className="mt-5 pt-4 border-t border-border/30">
                    <p className="font-bold text-[14px] text-primary font-body">{t.author}</p>
                    <p className="text-[12px] text-muted-foreground font-body">{t.role}</p>
                  </div>
                </ScrollRevealDiv>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — Odoo integration (with image) ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollRevealDiv>
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw size={18} className="text-accent" strokeWidth={1.5} />
                <span className="text-[12px] font-bold text-accent uppercase tracking-wider font-body">Intégration</span>
              </div>
              <h2 className="font-display text-[24px] md:text-[36px] leading-[1.15] text-foreground">
                Tout est centralisé <span className="text-accent">dans Odoo</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mt-4 font-body">
                Vos factures, vos relevés bancaires, vos déclarations — tout est connecté dans un seul environnement. Plus de ressaisie, plus de doublons, plus d'erreurs.
              </p>
              <ul className="mt-6 space-y-3 font-body text-[14px] text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Plan comptable belge pré-configuré
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Encodage automatisé des documents
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Tableaux de bord accessibles en temps réel
                </li>
              </ul>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.15}>
              <img
                src={imgOdoo}
                alt="Centralisation comptable dans Odoo — MFinances"
                className="rounded-2xl w-full h-auto shadow-md"
                loading="lazy"
              />
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION 5 — Tableau comparatif forfaits ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Inclus dans <span className="text-accent">tous nos forfaits</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left p-5 font-body font-normal text-muted-foreground" />
                        {["Essentiel", "Premium", "Excellence"].map((plan, i) => (
                          <th key={plan} className={`p-5 text-center font-display font-bold text-[15px] ${i === 2 ? "text-accent" : "text-primary"}`}>
                            {plan}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {planRows.map((row, ri) => (
                        <tr key={row.label} className={`border-b border-border/20 last:border-0 ${ri === planRows.length - 1 ? "bg-primary/[0.03]" : ""}`}>
                          <td className="p-5 font-medium text-foreground/80 font-body">{row.label}</td>
                          {row.values.map((v, ci) => (
                            <td key={ci} className="p-5 text-center">
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

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {planRows.map((row, ri) => (
                  <div key={row.label} className={`bg-card rounded-xl border border-border/50 p-4 ${ri === planRows.length - 1 ? "bg-primary/[0.03]" : ""}`}>
                    <p className="text-[14px] font-semibold text-foreground font-body mb-3">{row.label}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Essentiel", "Premium", "Excellence"].map((plan, ci) => (
                        <div key={plan} className="text-center">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider font-body block mb-1 ${ci === 2 ? "text-accent" : "text-muted-foreground"}`}>{plan}</span>
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
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.2} className="text-center mt-10">
              <Button variant="default" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/contact/">Choisir mon forfait <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
              </Button>
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

        {/* ── CTA FINAL (with background image) ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Partenariat comptable" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Prêt à simplifier votre comptabilité ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Demandez un devis gratuit — nous vous rappelons sous 72h pour en discuter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/contact/">Demander un devis gratuit <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
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
