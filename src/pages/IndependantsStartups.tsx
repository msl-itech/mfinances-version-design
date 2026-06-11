import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/independants-hero.jpg";
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
  Check,
  Settings,
  FileText,
  ShieldCheck,
  Lightbulb,
  ClipboardList,
  Rocket,
  Gift,
  TrendingUp,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Stamp from "@/components/ui/Stamp";

const services = [
  {
    icon: Settings,
    title: "Mise en place comptable dès le départ",
    desc: "Ouverture du dossier sur Odoo, configuration TVA, plan comptable adapté. Vous démarrez proprement.",
  },
  {
    icon: FileText,
    title: "Plan financier et business plan",
    desc: "Que ce soit pour convaincre une banque, accéder à des aides ou valider votre modèle économique — nous construisons un plan financier solide.",
  },
  {
    icon: Lightbulb,
    title: "Optimisation fiscale dès la première année",
    desc: "Statut indépendant ou société — lequel est le plus avantageux pour vous ? Franchise TVA ou régime normal ?",
  },
  {
    icon: ClipboardList,
    title: "Accompagnement administratif au démarrage",
    desc: "BCE, numéro de TVA, caisse d'assurances sociales, compte bancaire professionnel — nous coordonnons toutes les démarches.",
  },
];

const steps = [
  { num: "01", text: "Business plan et plan financier" },
  { num: "02", text: "Choix du statut juridique" },
  { num: "03", text: "Ouverture du compte bancaire professionnel" },
  { num: "04", text: "Inscription à la BCE" },
  { num: "05", text: "Activation du numéro de TVA" },
  { num: "06", text: "Affiliation à une caisse d'assurances sociales" },
];

const aides = [
  { icon: Gift, label: "Tremplin-Indépendants", desc: "Maintien partiel des allocations de chômage" },
  { icon: TrendingUp, label: "Primes régionales bruxelloises", desc: "Subsides pour les entrepreneurs bruxellois" },
  { icon: ShieldCheck, label: "Microcrédits", desc: "Financement accessible pour les petits projets" },
  { icon: Rocket, label: "Déduction pour investissement", desc: "Avantage fiscal sur vos investissements professionnels" },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Indépendants & Startups", item: "https://mfinances.be/qui-nous-accompagnons/independants-et-startups/" },
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

export default function IndependantsStartups() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Expert-Comptable Indépendants Bruxelles — MFinances"
        description="Accompagnement comptable, fiscal et financier pour indépendants et startups en Belgique. Plan financier, optimisation fiscale. Cabinet MFinances, Bruxelles."
        canonical="https://mfinances.be/qui-nous-accompagnons/independants-et-startups/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ÉDITORIAL ── */}
        <section className="bg-primary py-12 md:py-24 relative overflow-hidden bg-precision-grid-light">
          {/* Watermark */}
          <div className="pointer-events-none absolute -top-8 -right-10 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[180px] lg:text-[240px] leading-none text-primary-foreground/[0.04] tracking-tight">
              Lancer
            </span>
          </div>
          {/* Halo */}
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
                  <BreadcrumbPage className="text-primary-foreground text-[12px] tracking-wider uppercase">Indépendants & Startups</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Profil — N°01</span>
                </div>
                <h1 className="font-display text-[36px] md:text-[64px] leading-[1.05] text-primary-foreground tracking-tight">
                  Indépendant ou startup —<br />
                  <span className="italic text-accent">posez les bonnes bases</span><br />
                  dès le départ.
                </h1>
                <p className="text-primary-foreground/70 text-[16px] md:text-[18px] leading-relaxed mt-8 font-body max-w-[560px]">
                  Vous avez fait le saut. Vous avez le projet, l'énergie, les premiers clients. Ce que personne ne vous a dit : les erreurs financières du démarrage sont les plus difficiles à corriger. Et les plus évitables.
                </p>
                <div className="flex flex-wrap items-center gap-5 mt-10">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                    <Link to="/contact/">
                      Consultation gratuite
                      <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                  <span className="text-primary-foreground/60 text-[13px] font-body">
                    Forfait Essentiel — <span className="text-primary-foreground font-semibold">dès 350 €</span> HTVA/mois
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="absolute -top-12 -right-6 z-20 hidden md:block">
                  <Stamp className="text-accent drop-shadow-lg" />
                </div>
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-[4/5] group cut-corner">
                  <img src={imgHero} alt="Indépendant travaillant dans un espace de coworking à Bruxelles" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 bg-primary-foreground/95 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary">Démarrage</span>
                  </div>
                </div>
                <div className="hidden lg:block absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl px-5 py-4 shadow-xl rotate-[-3deg]">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase opacity-80">Forfait</div>
                  <div className="font-display text-[22px] font-bold leading-none mt-1">Essentiel</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CE QUE MFINANCES FAIT POUR VOUS ── */}
        <section className="bg-card py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute top-10 -right-10 select-none hidden md:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[140px] lg:text-[200px] leading-none text-primary/[0.04] tracking-tight">
              Méthode
            </span>
          </div>

          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv className="max-w-[680px] mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Notre approche</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Ce que MFinances fait <span className="italic text-accent">pour vous.</span>
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

        {/* ── ÉTAPES POUR DÉMARRER ── */}
        <section className="bg-secondary py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -left-10 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[140px] lg:text-[200px] leading-none text-accent/[0.06] tracking-tight">
              Étapes
            </span>
          </div>

          <div className="mx-auto max-w-[920px] px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Roadmap</span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Les étapes pour <span className="italic text-accent">démarrer en Belgique.</span>
              </h2>
            </ScrollRevealDiv>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[28px] md:left-[34px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
              <div className="space-y-3">
                {steps.map((s, i) => (
                  <ScrollRevealDiv key={s.num} delay={0.06 + i * 0.05}>
                    <div className="group relative flex items-center gap-5 md:gap-7 bg-card hover:bg-card rounded-2xl p-4 md:p-5 border border-border/40 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                      <div className="relative shrink-0 w-14 h-14 md:w-[60px] md:h-[60px] rounded-xl bg-accent/[0.08] group-hover:bg-accent flex items-center justify-center transition-all duration-300">
                        <span className="font-display text-[18px] md:text-[20px] font-bold text-accent group-hover:text-accent-foreground transition-colors duration-300">
                          {s.num}
                        </span>
                      </div>
                      <p className="text-[15px] md:text-[16px] font-medium text-foreground font-body flex-1">{s.text}</p>
                      <ArrowRight size={18} className="text-foreground/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0 hidden sm:block" />
                    </div>
                  </ScrollRevealDiv>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── AIDES DISPONIBLES ── */}
        <section className="bg-card py-16 md:py-28 relative overflow-hidden">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Financement</span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Les aides <span className="italic text-accent">disponibles.</span>
              </h2>
              <p className="text-muted-foreground text-[15px] mt-5 font-body max-w-[560px] mx-auto">
                Nous identifions les leviers de financement adaptés à votre profil et vous accompagnons dans les démarches.
              </p>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {aides.map((a, i) => {
                const Icon = a.icon;
                return (
                  <ScrollRevealDiv key={a.label} delay={0.06 + i * 0.06}>
                    <div className="group relative bg-secondary/40 hover:bg-secondary/70 rounded-2xl p-6 md:p-7 border border-border/40 hover:border-accent/30 transition-all duration-500 flex gap-5 h-full overflow-hidden">
                      <div className="pointer-events-none absolute -bottom-8 -right-8 w-24 h-24 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-2xl transition-all duration-500" />
                      <div className="relative w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300">
                        <Icon size={20} className="text-accent group-hover:text-accent-foreground transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                      <div className="relative">
                        <h3 className="text-[16px] font-bold font-body text-foreground mb-1.5">{a.label}</h3>
                        <p className="text-[13.5px] text-muted-foreground font-body leading-relaxed">{a.desc}</p>
                      </div>
                    </div>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FORFAITS DISPONIBLES ── */}
        <section className="bg-secondary py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute top-20 -right-10 select-none hidden md:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[140px] lg:text-[200px] leading-none text-primary/[0.04] tracking-tight">
              Forfaits
            </span>
          </div>

          <div className="mx-auto max-w-[860px] px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Tarification</span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Forfaits <span className="italic text-accent">disponibles.</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-sm">
                <div className="bg-primary/[0.04] px-6 md:px-8 py-6 border-b border-border/30 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">Recommandé</span>
                    <h3 className="font-display font-bold text-[22px] md:text-[26px] text-primary mt-1">Essentiel</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-[28px] md:text-[32px] font-bold text-primary leading-none">350 €</div>
                    <div className="text-[12px] text-muted-foreground mt-1">/mois HTVA</div>
                  </div>
                </div>
                <div className="divide-y divide-border/20">
                  <div className="flex items-center justify-between px-6 md:px-8 py-4">
                    <span className="font-medium text-foreground/85 font-body text-[14.5px]">Comptabilité + déclarations</span>
                    <Check size={18} className="text-[hsl(145,63%,42%)]" />
                  </div>
                  <div className="flex items-center justify-between px-6 md:px-8 py-4">
                    <span className="font-medium text-foreground/85 font-body text-[14.5px]">Conseil fiscal</span>
                    <span className="text-[13px] text-foreground/70 font-body">Ponctuel</span>
                  </div>
                  <div className="flex items-center justify-between px-6 md:px-8 py-4">
                    <span className="font-medium text-foreground/85 font-body text-[14.5px]">Premium disponible</span>
                    <span className="text-[13px] text-foreground/70 font-body">À partir de 450 €/mois</span>
                  </div>
                </div>
              </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.2}>
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 mt-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Rocket size={18} className="text-accent" strokeWidth={1.5} />
                </div>
                <p className="text-[13.5px] font-body leading-relaxed">
                  <strong className="text-accent">Création d'entreprise :</strong> accompagnement complet à la création — <strong>800 € HTVA</strong>, mission ponctuelle.
                </p>
              </div>
            </ScrollRevealDiv>

            <div className="text-center mt-10">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                <Link to="/tarifs/">
                  Voir tous les tarifs
                  <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </div>

            <ScrollRevealDiv delay={0.2} className="mt-12 text-center">
              <p className="text-[13px] text-muted-foreground font-body uppercase tracking-wider">Voir aussi</p>
              <p className="text-[15px] text-foreground font-body mt-2">
                <Link to="/qui-nous-accompagnons/commerce-et-horeca/" className="text-accent font-semibold hover:underline underline-offset-4">
                  Commerce & Horeca
                </Link>
                <span className="text-muted-foreground mx-3">·</span>
                <Link to="/qui-nous-accompagnons/entreprises-en-croissance/" className="text-accent font-semibold hover:underline underline-offset-4">
                  Entreprises en croissance
                </Link>
              </p>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-16 md:py-28 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          <div className="pointer-events-none absolute -bottom-12 right-0 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[160px] lg:text-[220px] leading-none text-primary-foreground/[0.05] tracking-tight">
              Lançons
            </span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative z-10">
            <ScrollRevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Premier pas</span>
              </div>
              <h2 className="font-display text-[34px] md:text-[56px] text-primary-foreground leading-[1.05] tracking-tight max-w-[820px]">
                Prêt à lancer <span className="italic text-accent">votre activité ?</span>
              </h2>
              <p className="text-primary-foreground/70 text-[16px] md:text-[18px] leading-relaxed mt-6 font-body max-w-[600px]">
                Premier échange gratuit et confidentiel — nous vous accompagnons dès le premier jour.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                  <Link to="/contact/">
                    Consultation gratuite
                    <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
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
