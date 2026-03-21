import { useEffect } from "react";
import { Link } from "react-router-dom";
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

/* ---------- tiny sub-components ---------- */
function SectionReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* ========================================= */
export default function Comptabilite() {
  useEffect(() => {
    document.title = "Comptabilité sur Odoo pour TPE à Bruxelles — MFinances";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Comptabilité claire, conforme et proactive intégrée dans Odoo. Encodage automatisé, déclarations fiscales, tableaux de bord. Cabinet MFinances, Bruxelles.");
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = "https://mfinances.be/services/comptabilite/";
  }, []);

  const heroReveal = useScrollReveal(0.1);

  return (
    <>
      <Header />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── HERO ── */}
      <section className="relative bg-primary text-primary-foreground pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary-light)/0.4),transparent_70%)]" />
        <div className="container-mf relative z-10 max-w-3xl mx-auto text-center" ref={heroReveal.ref}>
          {/* Breadcrumb */}
          <Breadcrumb className={`justify-center mb-8 reveal ${heroReveal.isVisible ? "visible" : ""}`}>
            <BreadcrumbList className="text-primary-foreground/60">
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="hover:text-primary-foreground/80">Accueil</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbLink className="hover:text-primary-foreground/80">Services</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground">Comptabilité</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className={`font-display text-[32px] md:text-[46px] leading-[1.15] font-bold reveal ${heroReveal.isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            Votre comptabilité, claire et sans stress — <span className="text-accent">intégrée dans Odoo</span>
          </h1>

          <p className={`mt-6 text-[17px] md:text-[19px] leading-relaxed text-primary-foreground/75 max-w-2xl mx-auto reveal ${heroReveal.isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            Vous dirigez une entreprise en croissance. Votre comptabilité doit vous donner de la visibilité — pas vous faire perdre du temps.
          </p>

          <div className={`flex flex-wrap gap-3 justify-center mt-8 reveal ${heroReveal.isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
            {["Inclus dès le forfait Essentiel", "Intégration Odoo"].map((pill) => (
              <span key={pill} className="bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/90 text-[12px] font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm">
                {pill}
              </span>
            ))}
          </div>

          <div className={`mt-10 reveal ${heroReveal.isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
            <Button variant="accent" size="lg" className="rounded-full" asChild>
              <Link to="/contact/">Demander un devis gratuit <ArrowRight size={18} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── SECTION 1 — Pourquoi Odoo ── */}
      <section className="py-20 md:py-28">
        <div className="container-mf max-w-3xl mx-auto">
          <SectionReveal>
            <h2 className="font-display text-[26px] md:text-[36px] text-center">
              Pourquoi Odoo <span className="text-accent">change tout</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="mt-6 text-[15px] md:text-[16px] leading-[1.8] text-foreground/70 text-center">
              La plupart des cabinets comptables travaillent en silo — vous envoyez vos documents, ils produisent vos chiffres, vous attendez. <strong className="text-foreground">Odoo casse ce modèle.</strong> Vos données sont centralisées, votre comptabilité est en temps réel.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── SECTION 2 — Services (6 cards) ── */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container-mf">
          <SectionReveal>
            <h2 className="font-display text-[26px] md:text-[36px] text-center">
              Ce que comprend notre <span className="text-accent">service comptable</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {services.map((s, i) => (
              <SectionReveal key={s.title} delay={0.08 + i * 0.06}>
                <div className="bg-card rounded-2xl p-8 border border-border/40 hover:shadow-[0_8px_32px_hsl(var(--primary)/0.08)] transition-shadow h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <s.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display text-[17px] font-bold mb-2">{s.title}</h3>
                  <p className="text-[13px] leading-[1.7] text-foreground/60">{s.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — Témoignages ── */}
      <section className="py-20 md:py-28">
        <div className="container-mf">
          <SectionReveal>
            <h2 className="font-display text-[26px] md:text-[36px] text-center mb-14">
              Ils nous font <span className="text-accent">confiance</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.author} delay={0.1 + i * 0.08}>
                <div className="bg-card rounded-2xl p-8 border border-border/40 hover:shadow-[0_8px_32px_hsl(var(--primary)/0.08)] transition-shadow h-full flex flex-col">
                  <Quote size={24} className="text-accent/30 mb-4" />
                  <p className="text-[14px] text-foreground/65 leading-[1.75] italic flex-1">
                    « {t.quote} »
                  </p>
                  <div className="mt-5 pt-4 border-t border-border/30">
                    <p className="font-bold text-[14px] text-primary">{t.author}</p>
                    <p className="text-[12px] text-foreground/40">{t.role}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — Tableau comparatif forfaits ── */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container-mf max-w-4xl mx-auto">
          <SectionReveal>
            <h2 className="font-display text-[26px] md:text-[36px] text-center mb-14">
              Inclus dans <span className="text-accent">tous nos forfaits</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="bg-card rounded-2xl border border-border/40 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left p-5 font-body font-normal text-foreground/50" />
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
                        <td className="p-5 font-medium text-foreground/80">{row.label}</td>
                        {row.values.map((v, ci) => (
                          <td key={ci} className="p-5 text-center">
                            {v === true ? (
                              <Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" />
                            ) : v === "—" ? (
                              <Minus size={16} className="text-foreground/20 mx-auto" />
                            ) : (
                              <span className={`font-semibold ${ri === planRows.length - 1 ? "text-primary text-[16px]" : "text-foreground/70"}`}>{v}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="text-center mt-10">
              <Button variant="default" size="lg" className="rounded-full" asChild>
                <Link to="/contact/">Choisir mon forfait <ArrowRight size={18} /></Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── SECTION 5 — FAQ ── */}
      <section className="py-20 md:py-28">
        <div className="container-mf max-w-3xl mx-auto">
          <SectionReveal>
            <h2 className="font-display text-[26px] md:text-[36px] text-center mb-10">
              Questions <span className="text-accent">fréquentes</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/40 px-6 overflow-hidden">
                  <AccordionTrigger className="text-[15px] font-semibold text-left hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] leading-[1.7] text-foreground/65 pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-primary py-20 md:py-24">
        <div className="container-mf text-center max-w-2xl mx-auto">
          <SectionReveal>
            <h2 className="font-display text-[26px] md:text-[36px] text-primary-foreground">
              Prêt à simplifier votre comptabilité ?
            </h2>
            <p className="mt-4 text-[16px] text-primary-foreground/70 leading-relaxed">
              Demandez un devis gratuit — nous vous rappelons sous 72h pour en discuter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button variant="accent" size="lg" className="rounded-full" asChild>
                <Link to="/contact/">Demander un devis gratuit <ArrowRight size={18} /></Link>
              </Button>
              <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                <Link to="/#services">Découvrir nos services <ArrowRight size={18} /></Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
