import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/societe-exploitation-hero.jpg";
import imgMeeting from "@/assets/daf-meeting-team.png";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
  X,
  Building2,
  TrendingUp,
  ShieldCheck,
  Landmark,
  CheckCircle2,
  AlertTriangle,
  Quote,
  Sparkles,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/* ── data ── */

const services = [
  {
    icon: Building2,
    title: "Structure de rémunération optimisée",
    desc: "Management fees déductibles, combinaison salaire/dividendes/VVPRbis optimale — nous calculons la structure la plus avantageuse pour votre situation.",
  },
  {
    icon: TrendingUp,
    title: "Réinvestissement patrimonial",
    desc: "Les revenus de la société de management sont réinvestis dans des actifs durables — immobilier, placements financiers — avec un pilotage fiscal intégré.",
  },
  {
    icon: ShieldCheck,
    title: "Documentation & conformité",
    desc: "Convention de management fees conforme, PV d'AG, documentation arm's length — tout est structuré pour résister à un contrôle fiscal.",
  },
  {
    icon: Landmark,
    title: "Planification successorale",
    desc: "La société de management s'intègre naturellement dans une stratégie de transmission patrimoniale — donation de parts, clause d'accroissement, assurance dirigeant.",
  },
];

const concerneItems = [
  "Vos revenus professionnels dépassent 150 000 € par an",
  "Vous avez plusieurs sources de revenus",
  "Vous pensez long terme — constitution de patrimoine sur 5 à 10 ans",
  "Vous avez un projet d'investissement immobilier ou financier",
];

const pasPrioritaireItems = [
  "Vos revenus sont inférieurs à 100 000 €",
  "Vous êtes en début d'activité (moins de 2 ans)",
];

const beforeAfterRows = [
  { label: "Impôts annuels", before: "85 000 € (42,5%)", after: "Économie fiscale : 25 000 €/an" },
  { label: "Capacité d'investissement", before: "Limitée", after: "25 000 €/an réinvestis" },
  { label: "Patrimoine à 5 ans", before: "Croissance limitée", after: "1,2 M€ immobilier + placements" },
  { label: "Succession", before: "Aucune optimisation", after: "Planification successorale intégrée" },
];

const compareRows = [
  { label: "Tarif mensuel HTVA", values: ["350 €", "450 €", "650 €"], isPrice: true },
  { label: "Comptabilité + ISOC", values: [true, true, true] },
  { label: "Documentation mgmt fees", values: [true, true, true] },
  { label: "Suivi patrimoine", values: ["—", "Trimestriel", "Mensuel"] },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Société de management", item: "https://mfinances.be/qui-nous-accompagnons/societe-de-management/" },
  ],
};

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function SocieteDeManagement() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Société de Management Bruxelles | MFinances"
        description="Société de management patrimoniale à Bruxelles : management fees, investissement immobilier et planification successorale. MFinances."
        canonical="https://mfinances.be/qui-nous-accompagnons/societe-de-management/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-12 md:py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -right-16 select-none hidden md:block">
            <span className="font-display italic text-[260px] leading-none text-primary-foreground/[0.04] tracking-tight">Capital</span>
          </div>
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />

          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7">
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
                      <Link to="/qui-nous-accompagnons/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Qui nous accompagnons</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Société de management</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-5">
                  <span className="h-px w-10 bg-accent/60" />
                  <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">N°03 / Patrimoine</span>
                </div>
                <h1 className="font-display text-[28px] md:text-[56px] leading-[1.05] text-primary-foreground">
                  Transformez vos revenus<br className="hidden md:block" /> en <span className="text-accent italic">patrimoine</span> durable.
                </h1>
                <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-6 font-body max-w-[540px] mx-auto lg:mx-0">
                  Un dirigeant qui se rémunère classiquement — salaire et dividendes — peut supporter une charge fiscale et sociale importante. Dans certaines situations, une société de management patrimoniale peut améliorer significativement la structure de rémunération et d'investissement du dirigeant.
                </p>
                <Button variant="accent" size="lg" className="rounded-full mt-8 whitespace-normal text-center group" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl shadow-2xl overflow-hidden relative">
                <img src={imgHero} alt="Société de management patrimoniale à Bruxelles" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-primary-foreground/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent font-body">N°03</p>
                  <p className="text-[12px] font-display text-primary leading-tight">Mgmt fees / Patrimoine</p>
                </div>
              </div>
              <div className="hidden lg:block absolute -bottom-5 -left-5 bg-accent text-accent-foreground rounded-full px-5 py-3 shadow-xl rotate-[-4deg]">
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase font-body">Stratégie long terme</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── DÉFINITION ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                C'est quoi une société de management <span className="text-accent">patrimoniale</span> ?
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mt-5 font-body max-w-[640px] mx-auto">
                Elle permet de facturer vos prestations de direction à votre société d'exploitation sous forme de management fees déductibles, et de réinvestir les revenus dans des actifs patrimoniaux durables.
              </p>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que MFinances fait <span className="text-accent">pour vous</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv key={s.title} delay={0.08 + i * 0.06} className="bg-card rounded-2xl p-7 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[17px] font-bold font-body text-foreground mb-2">{s.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{s.desc}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CETTE STRUCTURE EST-ELLE FAITE POUR VOUS ? ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Cette structure est-elle <span className="text-accent">faite pour vous</span> ?
              </h2>
              <p className="text-[13px] text-muted-foreground italic font-body mt-3 max-w-[600px] mx-auto">
                Ces critères sont indicatifs. Seule une analyse personnalisée de votre situation permet de déterminer si une société de management patrimoniale est pertinente et avantageuse dans votre cas spécifique.
              </p>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollRevealDiv delay={0.08} className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(145,63%,42%)]/10 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-[hsl(145,63%,42%)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold font-body text-foreground">Vous êtes concerné si</h3>
                </div>
                <ul className="space-y-3">
                  {concerneItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-muted-foreground font-body leading-relaxed">
                      <Check size={16} className="text-[hsl(145,63%,42%)] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollRevealDiv>

              <ScrollRevealDiv delay={0.14} className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle size={20} className="text-destructive" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold font-body text-foreground">Pas encore prioritaire si</h3>
                </div>
                <ul className="space-y-3">
                  {pasPrioritaireItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-muted-foreground font-body leading-relaxed">
                      <X size={16} className="text-destructive mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        {/* ── AVANT / APRÈS ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Résultat concret — <span className="text-accent">avant et après</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-border/30 bg-secondary/40">
                      <th className="text-left p-5 font-body font-normal text-muted-foreground w-[30%]" />
                      <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-destructive">Sans société de management</span></th>
                      <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-accent">Avec société de management</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {beforeAfterRows.map((row, ri) => (
                      <tr key={row.label} className="border-b border-border/20 last:border-0">
                        <td className="p-4 pl-5 font-medium text-foreground/80 font-body">{row.label}</td>
                        <td className="p-4 text-center text-foreground/60 font-body text-[13px]">{row.before}</td>
                        <td className="p-4 text-center text-accent font-body font-semibold text-[13px]">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {beforeAfterRows.map((row) => (
                  <div key={row.label} className="bg-card rounded-xl border border-border/50 p-4">
                    <p className="text-[14px] font-semibold text-foreground font-body mb-3">{row.label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider font-body block mb-1 text-destructive">Avant</span>
                        <span className="font-body text-[12px] text-foreground/60">{row.before}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider font-body block mb-1 text-accent">Après</span>
                        <span className="font-body text-[12px] text-accent font-semibold">{row.after}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[13px] text-foreground/50 italic font-body mt-5 text-center max-w-[700px] mx-auto">
                Exemple illustratif basé sur un dirigeant avec 200 000 € de revenus annuels. Les résultats dépendent de la situation personnelle, fiscale et patrimoniale de chaque client. Une analyse personnalisée est indispensable.
              </p>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── CAS CLIENT ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Cas <span className="text-accent">client</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              <div className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Building2 size={22} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-bold font-body text-foreground mb-3">PME technologique — structuration patrimoniale</h3>
                <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">
                  Un dirigeant de PME technologique a structuré sa rémunération via une société de management patrimoniale. En combinant optimisation des management fees, investissement immobilier intégré et planification successorale, il a significativement réduit sa charge fiscale globale et constitué un patrimoine durable.
                </p>
                <p className="text-[13px] text-foreground/50 italic font-body mt-3">
                  Les résultats varient selon la situation de chaque dirigeant.
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── FORFAITS ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Forfaits <span className="text-accent">disponibles</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="border-b border-border/30 bg-secondary/40">
                        <th className="text-left p-5 font-body font-normal text-muted-foreground w-[35%]" />
                        <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-primary">Essentiel</span></th>
                        <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-primary">Premium</span></th>
                        <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-accent">Excellence</span></th>
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

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {compareRows.map((row, ri) => (
                  <div key={row.label} className={`bg-card rounded-xl border border-border/50 p-4 ${ri === 0 ? "bg-primary/[0.03]" : ""}`}>
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
                            <span className={`font-body text-[11px] ${row.isPrice ? "font-bold text-primary" : "text-foreground/70"}`}>{row.values[ci]}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollRevealDiv>

            <div className="text-center mt-8">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
              </Button>
            </div>

            <ScrollRevealDiv delay={0.2} className="mt-10 text-center">
              <p className="text-[14px] text-muted-foreground font-body">
                Voir aussi :{" "}
                <Link to="/qui-nous-accompagnons/societe-de-moyens/" className="text-accent font-semibold hover:underline">
                  Société de moyens
                </Link>{" "}· {" "}
                <Link to="/qui-nous-accompagnons/societe-exploitation/" className="text-accent font-semibold hover:underline">
                  Société d'exploitation
                </Link>
              </p>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-14 md:py-24 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation société de management MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
          <div className="pointer-events-none absolute -bottom-16 right-0 select-none hidden md:block">
            <span className="font-display italic text-[220px] leading-none text-primary-foreground/[0.05] tracking-tight">Discutons</span>
          </div>
          <div className="mx-auto max-w-[900px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Premier contact</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>
              <h2 className="font-display text-[28px] md:text-[48px] text-primary-foreground leading-[1.1]">
                Prêt à <span className="text-accent italic">structurer</span> votre patrimoine ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous analysons votre situation et déterminons si une société de management est pertinente pour vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/tarifs/">Voir les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
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
