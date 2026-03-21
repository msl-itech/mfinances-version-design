import { useEffect } from "react";
import { Link } from "react-router-dom";
import imgHero from "@/assets/tarifs-hero.jpg";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  Check,
  Minus,
  ShieldCheck,
  TrendingUp,
  Rocket,
  Users,
  Clock,
  FileText,
  Headphones,
  PlayCircle,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const compareRows = [
  { label: "Prix mensuel HTVA", values: ["À partir de 350 €", "À partir de 450 €", "À partir de 650 €"], isPrice: true },
  { label: "Comptabilité complète", values: [true, true, true] },
  { label: "Déclarations TVA", values: [true, true, true] },
  { label: "Déclarations fiscales", values: [true, true, true] },
  { label: "Bilan annuel", values: [true, true, true] },
  { label: "Conseil fiscal", values: ["Ponctuel", "Régulier", "Proactif"] },
  { label: "Situations intermédiaires", values: ["Semestrielles", "Trimestrielles", "Mensuelles"] },
  { label: "Budget annuel", values: ["—", true, true] },
  { label: "Analyse écarts budget/réalisé", values: ["—", "Trimestrielle", "Mensuelle"] },
  { label: "Trésorerie prévisionnelle", values: ["—", "—", "✓ mensuelle"] },
  { label: "Accès DAF à temps partiel", values: ["—", "—", "✓ option"] },
];

const plans = [
  {
    icon: ShieldCheck,
    name: "Essentiel",
    price: "350",
    tagline: "Pour sécuriser",
    desc: "Vous êtes indépendant, vous venez de créer votre société, ou votre activité est encore en phase de démarrage. Comptabilité rigoureuse, déclarations fiscales dans les délais, interlocuteur de confiance. Vous sécurisez votre base comptable et fiscale — sans stress administratif.",
  },
  {
    icon: TrendingUp,
    name: "Premium",
    price: "450",
    tagline: "Pour structurer",
    desc: "Votre activité se développe. Vous prenez des décisions de plus en plus structurantes. Budget annuel, suivi trimestriel, anticipation de la charge fiscale avant la clôture. Vous structurez votre pilotage financier — et vous commencez à décider sur la base de chiffres réels.",
    popular: true,
  },
  {
    icon: Rocket,
    name: "Excellence",
    price: "650",
    tagline: "Pour piloter et anticiper",
    desc: "Votre entreprise est en croissance active. Vision financière mensuelle, prévisionnel de trésorerie fiable, partenaire disponible pour les décisions qui engagent votre avenir. Vous pilotez avec un temps d'avance — comme les grandes entreprises.",
  },
];

const missions = [
  { label: "Création d'entreprise (forfait complet)", tarif: "800 € HTVA" },
  { label: "Approfondissement contrôle de gestion", tarif: "150 € HTVA / heure" },
  { label: "DAF à temps partiel (clients Excellence)", tarif: "150 € HTVA / heure" },
];

const steps = [
  { icon: Headphones, num: "1", title: "Consultation gratuite", desc: "30 minutes pour comprendre votre situation" },
  { icon: FileText, num: "2", title: "Proposition personnalisée", desc: "Forfait adapté expliqué en détail" },
  { icon: Clock, num: "3", title: "Démarrage sous 48h", desc: "Dossier intégré dans Odoo" },
];

const faqs = [
  { q: "Combien coûte un expert-comptable pour une TPE en Belgique ?", a: "Chez MFinances, nos forfaits démarrent à 350 € HTVA par mois. Le Premium est à partir de 450 € HTVA/mois. L'Excellence est à partir de 650 € HTVA/mois." },
  { q: "Y a-t-il une réduction pour les structures non assujetties à la TVA ?", a: "Oui — les structures non assujetties à la TVA bénéficient d'une réduction de 21% sur nos tarifs." },
  { q: "Faut-il s'engager sur une durée minimum ?", a: "Nos forfaits sont conclus pour une durée d'un an avec tacite reconduction. Un préavis de 3 mois avant l'échéance annuelle est requis." },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Tarifs", item: "https://mfinances.be/tarifs/" },
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

export default function Tarifs() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tarifs Expert-Comptable Bruxelles — MFinances | À partir de 350€/mois HTVA";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "3 forfaits transparents pour TPE à Bruxelles. Essentiel 350€, Premium 450€, Excellence 650€ HTVA/mois. DAF à temps partiel en option.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/tarifs/";

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
        <section className="bg-primary py-16 md:py-20 relative overflow-hidden">
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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Tarifs</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  À partir de 350 € HTVA / mois
                </span>
                <h1 className="font-display text-[32px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Des forfaits transparents, sans surprise — <span className="text-accent">adaptés à votre stade de croissance</span>
                </h1>
              </div>
            </div>

            <div className="rounded-2xl shadow-2xl overflow-hidden aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/gAF_Jw6_T7Q"
                title="Pilotez vos finances avec Mfinances - Bruxelles : Formule Base, Premium ou Excellence"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 1 — Tableau comparatif ── */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-14">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Nos trois <span className="text-accent">forfaits</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="border-b border-border/30 bg-secondary/40">
                        <th className="text-left p-5 font-body font-normal text-muted-foreground w-[40%]" />
                        {["Essentiel", "Premium", "Excellence"].map((plan, i) => (
                          <th key={plan} className="p-5 text-center relative">
                            {i === 1 && (
                              <span className="absolute -top-0 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[9px] font-bold px-2.5 py-0.5 rounded-b-md">
                                POPULAIRE
                              </span>
                            )}
                            <span className={`font-display font-bold text-[16px] ${i === 2 ? "text-accent" : "text-primary"}`}>
                              {plan}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {compareRows.map((row, ri) => (
                        <tr key={row.label} className={`border-b border-border/20 last:border-0 ${ri === 0 ? "bg-primary/[0.03]" : ""}`}>
                          <td className="p-4 pl-5 font-medium text-foreground/80 font-body">{row.label}</td>
                          {row.values.map((v, ci) => (
                            <td key={ci} className="p-4 text-center">
                              {v === true ? (
                                <Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" />
                              ) : v === "—" ? (
                                <Minus size={16} className="text-foreground/20 mx-auto" />
                              ) : (
                                <span className={`font-body ${row.isPrice ? "font-bold text-primary text-[15px]" : "text-foreground/70 text-[13px]"}`}>{v}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.2}>
              <p className="text-center mt-6 text-[13px] text-muted-foreground italic font-body">
                Pour les structures non assujetties à la TVA (ASBL, certaines professions médicales), nous appliquons une <strong className="text-foreground">réduction de 21%</strong> sur nos tarifs.
              </p>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION 2 — Détail forfaits (3 cards) ── */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-14">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Quel forfait est <span className="text-accent">fait pour vous ?</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, i) => {
                const Icon = plan.icon;
                return (
                  <ScrollRevealDiv key={plan.name} delay={0.08 + i * 0.08} className={`bg-card rounded-2xl p-8 border ${plan.popular ? "border-primary shadow-[0_8px_40px_hsl(var(--primary)/0.1)]" : "border-border/50"} relative flex flex-col`}>
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full">
                        POPULAIRE
                      </span>
                    )}
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-display text-[11px] font-bold tracking-[0.1em] text-muted-foreground">{plan.name.toUpperCase()}</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-display text-[40px] font-bold text-primary leading-none">{plan.price}€</span>
                      <span className="text-[13px] text-muted-foreground">/mois HTVA</span>
                    </div>
                    <p className="text-accent text-[13px] italic font-body mb-4">{plan.tagline}</p>
                    <hr className="border-border/30 mb-5" />
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body flex-1">{plan.desc}</p>
                    <Button
                      variant={plan.popular ? "accent" : "outline"}
                      className="w-full mt-6 rounded-full"
                      asChild
                    >
                      <Link to="/contact/">Choisir {plan.name} <ArrowRight size={14} className="ml-1" /></Link>
                    </Button>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — DAF option ── */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Users size={26} className="text-accent" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Le DAF à temps partiel — <span className="text-accent">option Excellence</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-[1.8] mt-5 font-body max-w-[640px] mx-auto">
                Réservé exclusivement aux clients Excellence. Réunion mensuelle de pilotage + disponibilité ad hoc. Facturation : <strong className="text-foreground">150 € HTVA / heure</strong>.
              </p>
              <Button variant="default" size="lg" className="rounded-full mt-8" asChild>
                <Link to="/services/daf-externalise/">En savoir plus <ArrowRight size={16} className="ml-1" /></Link>
              </Button>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION 4 — Missions ponctuelles ── */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Missions <span className="text-accent">ponctuelles</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left p-5 font-body font-semibold text-foreground/70 text-[12px] uppercase tracking-wider">Mission</th>
                      <th className="text-right p-5 font-body font-semibold text-foreground/70 text-[12px] uppercase tracking-wider">Tarif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missions.map((m, i) => (
                      <tr key={i} className="border-b border-border/20 last:border-0">
                        <td className="p-5 font-medium text-foreground/80 font-body">{m.label}</td>
                        <td className="p-5 text-right font-semibold text-primary font-body">{m.tarif}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.2}>
              <div className="bg-primary/[0.05] rounded-xl p-5 mt-6 border border-primary/10">
                <p className="text-[13px] text-foreground/70 font-body">
                  <strong className="text-foreground">Engagement :</strong> Nos forfaits sont conclus pour une durée d'un an, avec tacite reconduction. Un préavis de 3 mois avant la date d'échéance annuelle est requis pour mettre fin au contrat.
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SECTION 5 — Comment ça se passe ── */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-14">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Comment ça se passe <span className="text-accent">concrètement ?</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv key={s.num} delay={0.1 + i * 0.08} className="relative">
                    <div className="bg-secondary/60 rounded-2xl p-7 border border-border/50 text-center h-full">
                      <span className="text-[48px] font-display font-bold text-accent/15 leading-none">{s.num}</span>
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mt-2 mb-4">
                        <Icon size={22} className="text-accent" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-[17px] font-bold font-body text-foreground mb-2">{s.title}</h3>
                      <p className="text-[14px] text-muted-foreground leading-relaxed font-body">{s.desc}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
                    )}
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION FAQ ── */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
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
        <section className="bg-primary py-16 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[28px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Prêt à choisir votre forfait ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous vous recommandons le forfait adapté à votre situation.
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
