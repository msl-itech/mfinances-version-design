import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/entreprises-croissance-hero.jpg";
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
  ArrowUpRight,
  BarChart3,
  LineChart,
  Wallet,
  Users,
  Factory,
  Cpu,
  Rocket,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  {
    icon: BarChart3,
    title: "Situations financières mensuelles",
    desc: "Chaque mois, une situation financière complète à jour. Vous savez exactement où en est votre entreprise.",
  },
  {
    icon: LineChart,
    title: "Contrôle de gestion mensuel",
    desc: "Budget annuel co-construit, suivi des écarts chaque mois, analyse des performances.",
  },
  {
    icon: Wallet,
    title: "Trésorerie prévisionnelle actualisée",
    desc: "Un prévisionnel mis à jour chaque mois sur données réelles.",
  },
  {
    icon: Users,
    title: "Accès au DAF à temps partiel",
    desc: "Votre DAF devient votre copilote pour les décisions qui dépassent les chiffres.",
  },
];

const caseStudies = [
  {
    icon: Factory,
    title: "Entreprise industrielle multi-sites",
    desc: "Confrontée à des tensions de trésorerie récurrentes, elle a mis en place un suivi mensuel et un tableau de trésorerie prévisionnel. Résultat : réduction significative des retards de paiement et meilleure visibilité financière sur 12 mois.",
  },
  {
    icon: Cpu,
    title: "Groupe technologique en croissance",
    desc: "Optimisation du processus de facturation et de relance. Résultat : délais de paiement clients réduits de plusieurs semaines, libérant des liquidités pour financer un projet R&D stratégique.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Entreprises en croissance", item: "https://mfinances.be/qui-nous-accompagnons/entreprises-en-croissance/" },
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

export default function EntreprisesCroissance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Expert-Comptable Entreprise en Croissance Bruxelles"
        description="Pilotage financier mensuel et DAF externalisé pour entreprises en croissance en Belgique. Forfait Excellence. Cabinet MFinances, Bruxelles."
        canonical="https://mfinances.be/qui-nous-accompagnons/entreprises-en-croissance/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ÉDITORIAL ── */}
        <section className="bg-primary py-12 md:py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-8 -right-10 select-none hidden md:block">
            <span className="font-display italic text-[180px] lg:text-[240px] leading-none text-primary-foreground/[0.04] tracking-tight">
              Scaler
            </span>
          </div>
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-accent/20 blur-[120px]" />

          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 relative z-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-primary-foreground/50 hover:text-primary-foreground text-[12px] tracking-wider uppercase">Accueil</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/30" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/qui-nous-accompagnons/" className="text-primary-foreground/50 hover:text-primary-foreground text-[12px] tracking-wider uppercase">Qui nous accompagnons</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/30" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground text-[12px] tracking-wider uppercase">Entreprises en croissance</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Profil — N°03</span>
                </div>
                <h1 className="font-display text-[36px] md:text-[64px] leading-[1.05] text-primary-foreground tracking-tight">
                  Votre entreprise accélère —<br />
                  <span className="italic text-accent">votre pilotage financier</span><br />
                  doit suivre.
                </h1>
                <p className="text-primary-foreground/70 text-[16px] md:text-[18px] leading-relaxed mt-8 font-body max-w-[560px]">
                  Vous avez passé un cap. Votre équipe grandit, vos décisions engagent plus, vos enjeux financiers se complexifient. La comptabilité traditionnelle ne suffit plus.
                </p>
                <div className="flex flex-wrap items-center gap-5 mt-10">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                    <Link to="/contact/">
                      Consultation gratuite
                      <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                  <span className="text-primary-foreground/60 text-[13px] font-body">
                    Forfait Excellence — <span className="text-primary-foreground font-semibold">650 €</span> HTVA/mois
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-[4/5] group">
                  <img src={imgHero} alt="Réunion de direction — entreprise en croissance à Bruxelles" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 bg-primary-foreground/95 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary">Pilotage mensuel</span>
                  </div>
                </div>
                <div className="hidden lg:block absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl px-5 py-4 shadow-xl rotate-[-3deg]">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase opacity-80">Forfait</div>
                  <div className="font-display text-[22px] font-bold leading-none mt-1">Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-card py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute top-10 -right-10 select-none hidden md:block">
            <span className="font-display italic text-[140px] lg:text-[200px] leading-none text-primary/[0.04] tracking-tight">
              Pilotage
            </span>
          </div>

          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv className="max-w-[700px] mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Notre apport</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Ce que MFinances apporte aux <span className="italic text-accent">entreprises en croissance.</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
              {services.map((s, i) => {
                const Icon = s.icon;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <ScrollRevealDiv key={s.title} delay={0.08 + i * 0.06}>
                    <div className="group relative bg-secondary/40 hover:bg-secondary/70 rounded-3xl p-7 md:p-8 border border-border/40 hover:border-accent/30 transition-all duration-500 overflow-hidden h-full">
                      <div className="pointer-events-none absolute -top-6 -right-6 w-32 h-32 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-2xl transition-all duration-500" />
                      <div className="relative flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 group-hover:bg-accent/15 flex items-center justify-center transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                          <Icon size={22} className="text-accent" strokeWidth={1.5} />
                        </div>
                        <span className="font-display text-[28px] font-bold text-foreground/10 leading-none">{num}</span>
                      </div>
                      <h3 className="text-[18px] font-bold font-body text-foreground mb-3">{s.title}</h3>
                      <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{s.desc}</p>
                    </div>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── RÉSULTATS CONCRETS ── */}
        <section className="bg-secondary py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -left-10 select-none hidden md:block">
            <span className="font-display italic text-[140px] lg:text-[200px] leading-none text-accent/[0.06] tracking-tight">
              Impact
            </span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Cas réels</span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Résultats <span className="italic text-accent">concrets.</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
              {caseStudies.map((c, i) => {
                const Icon = c.icon;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <ScrollRevealDiv key={c.title} delay={0.08 + i * 0.08}>
                    <div className="group relative bg-card rounded-3xl p-7 md:p-8 border border-border/40 hover:border-accent/30 hover:shadow-xl transition-all duration-500 overflow-hidden h-full">
                      <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-3xl transition-all duration-700" />
                      <div className="relative flex items-start justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground flex items-center justify-center transition-all duration-300">
                          <Icon size={24} className="text-accent group-hover:text-accent-foreground transition-colors duration-300" strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">Cas {num}</span>
                      </div>
                      <h3 className="text-[19px] font-bold font-body text-foreground mb-3">{c.title}</h3>
                      <p className="text-[14px] text-muted-foreground leading-[1.75] font-body">{c.desc}</p>
                    </div>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── OFFRE EXCELLENCE ── */}
        <section className="bg-card py-16 md:py-28 relative overflow-hidden">
          <div className="mx-auto max-w-[760px] px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv className="text-center">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Offre unique</span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Une seule offre — <span className="italic text-accent">Excellence.</span>
              </h2>

              <div className="mt-10 relative bg-primary text-primary-foreground rounded-[28px] p-8 md:p-12 overflow-hidden text-left">
                <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
                <div className="pointer-events-none absolute top-6 right-6 select-none">
                  <Rocket size={120} className="text-accent/10" strokeWidth={1} />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-accent text-[10px] font-bold tracking-[0.25em] uppercase">Forfait Excellence</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-display text-[64px] md:text-[80px] font-bold text-primary-foreground leading-none tracking-tight">650€</span>
                    <span className="text-[14px] text-primary-foreground/60 font-body">/mois HTVA</span>
                  </div>
                  <div className="h-px bg-primary-foreground/15 my-6" />
                  <p className="text-[14.5px] text-primary-foreground/75 font-body leading-relaxed">
                    DAF à temps partiel disponible en option — <strong className="text-accent">150 € HTVA/heure</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                      <Link to="/contact/">
                        Consultation gratuite
                        <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </Button>
                    <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                      <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-[13px] text-muted-foreground font-body uppercase tracking-wider">Voir aussi</p>
                <p className="text-[15px] text-foreground font-body mt-2">
                  <Link to="/qui-nous-accompagnons/promoteurs-immobiliers/" className="text-accent font-semibold hover:underline underline-offset-4">
                    Promoteurs immobiliers
                  </Link>
                  <span className="text-muted-foreground mx-3">·</span>
                  <Link to="/qui-nous-accompagnons/societe-exploitation/" className="text-accent font-semibold hover:underline underline-offset-4">
                    Société d'exploitation
                  </Link>
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-16 md:py-28 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          <div className="pointer-events-none absolute -bottom-12 right-0 select-none hidden md:block">
            <span className="font-display italic text-[160px] lg:text-[220px] leading-none text-primary-foreground/[0.05] tracking-tight">
              Scalez
            </span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Structurer pour scaler</span>
              </div>
              <h2 className="font-display text-[34px] md:text-[56px] text-primary-foreground leading-[1.05] tracking-tight max-w-[820px]">
                Prêt à structurer <span className="italic text-accent">votre croissance ?</span>
              </h2>
              <p className="text-primary-foreground/70 text-[16px] md:text-[18px] leading-relaxed mt-6 font-body max-w-[600px]">
                Premier échange gratuit et confidentiel — nous analysons vos enjeux financiers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                  <Link to="/contact/">
                    Consultation gratuite
                    <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/services/daf-externalise/">Découvrir le DAF externalisé <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
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
