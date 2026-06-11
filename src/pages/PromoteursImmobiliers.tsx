import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/promoteurs-immobiliers-hero.jpg";
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
  Percent,
  Building,
  Rocket,
  Check,
  Quote,
  TrendingUp,
} from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const tvaRegimes = [
  "Immeuble neuf destiné à la revente : TVA 21% généralement déductible, sous conditions",
  "Immeuble neuf destiné à la location : TVA 21% généralement non déductible, selon l'affectation",
  "Immeuble ancien destiné à l'habitation : TVA réduite à 6% possible, sous conditions strictes",
  "Régime d'autoliquidation : applicable dans certains cas, suivi rigoureux requis",
  "Calcul du prorata de déductibilité sur frais généraux : selon activité mixte",
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Promoteurs immobiliers", item: "https://mfinances.be/qui-nous-accompagnons/promoteurs-immobiliers/" },
  ],
};



export default function PromoteursImmobiliers() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={root} className="min-h-screen">
      <SEOHead
        title="Expert-Comptable Promoteur Immobilier Bruxelles — MFinances"
        description="Comptabilité analytique par projet, TVA immobilière et trésorerie prévisionnelle pour promoteurs immobiliers en Belgique. MFinances, Bruxelles."
        canonical="https://mfinances.be/qui-nous-accompagnons/promoteurs-immobiliers/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-12 md:py-24 relative overflow-hidden bg-precision-grid-light">
          <div className="pointer-events-none absolute -top-10 -right-16 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[260px] leading-none text-primary-foreground/[0.04] tracking-tight">Bâtir</span>
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
                    <BreadcrumbLink className="text-primary-foreground/60 text-[13px]">Qui nous accompagnons</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Promoteurs immobiliers</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-5">
                  <span className="h-px w-10 bg-accent/60" />
                  <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">N°03 / Immobilier</span>
                </div>
                <h1 className="font-display text-[28px] md:text-[56px] leading-[1.05] text-primary-foreground">
                  Promotion immobilière —<br className="hidden md:block" /> <span className="text-accent italic">pilotez chaque projet</span> avec rigueur.
                </h1>
                <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-6 font-body max-w-[540px] mx-auto lg:mx-0">
                  Budgets conséquents, marges serrées, TVA complexe, flux de trésorerie décalés : la promotion immobilière est l'une des activités où la maîtrise financière fait directement la différence.
                </p>
                <Button variant="accent" size="lg" className="rounded-full mt-8 whitespace-normal text-center group" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl shadow-2xl overflow-hidden relative">
                <img src={imgHero} alt="Projet de promotion immobilière à Bruxelles" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-primary-foreground/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent font-body">N°03</p>
                  <p className="text-[12px] font-display text-primary leading-tight">Promotion / Marges</p>
                </div>
              </div>
              <div className="hidden lg:block absolute -bottom-5 -left-5 bg-accent text-accent-foreground rounded-full px-5 py-3 shadow-xl rotate-[-4deg]">
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase font-body">Analytique par projet</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-card py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-12 -left-10 select-none hidden lg:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[200px] leading-none text-foreground/[0.035] tracking-tight">Méthode</span>
          </div>

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 relative">
            <div data-anim="fade-up" className="mb-12 md:mb-20 max-w-[760px]">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Notre intervention</span>
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.08]">
                Ce que MFinances fait <span className="text-accent italic">pour vous</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mt-5 font-body max-w-[560px]">
                Deux piliers indissociables pour piloter une opération de promotion : visibilité sur les marges, maîtrise des régimes fiscaux.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* Card 1 */}
              <div data-anim="fade-up" data-delay="0.08"  className="lg:col-span-5">
                <div className="group relative bg-secondary/40 rounded-3xl p-8 md:p-10 border border-border/60 h-full overflow-hidden transition-all duration-500 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.25)]">
                  <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/0 group-hover:bg-accent/10 blur-3xl transition-all duration-700" />
                  <div className="absolute top-7 right-7 font-display text-[60px] leading-none text-accent/[0.15] select-none">01</div>

                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-7 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                      <BarChart3 size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-[22px] md:text-[26px] text-foreground leading-[1.15] mb-4">
                      Comptabilité <span className="italic text-accent">analytique</span> par projet
                    </h3>
                    <p className="text-[14.5px] text-muted-foreground leading-[1.75] font-body">
                      Chaque projet est traité comme une entité distincte : ventilation des coûts par projet et par unité, suivi des marges à chaque phase, tableaux de bord clairs pour chaque opération.
                    </p>

                    <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/50 font-body">Pilotage opérationnel</span>
                      <ArrowUpRight size={18} className="text-accent transition-transform duration-500 group-hover:rotate-45" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div data-anim="fade-up" data-delay="0.16"  className="lg:col-span-7">
                <div className="group relative bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 h-full overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.45)]">
                  <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-accent/15 blur-3xl" />
                  <div className="absolute top-7 right-7 font-display text-[60px] leading-none text-primary-foreground/[0.08] select-none">02</div>

                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center mb-7 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                      <Percent size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-[22px] md:text-[26px] text-primary-foreground leading-[1.15] mb-4">
                      Maîtrise de la <span className="italic text-accent">TVA immobilière</span>
                    </h3>
                    <p className="text-[14.5px] text-primary-foreground/75 leading-[1.75] font-body mb-6">
                      Les régimes TVA en promotion dépendent de la nature de l'opération, de l'affectation du bien et du régime juridique. À titre indicatif :
                    </p>

                    <ul className="space-y-3">
                      {tvaRegimes.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-[13.5px] text-primary-foreground/85 font-body leading-[1.6]">
                          <span className="mt-[2px] w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                            <Check size={11} className="text-accent" strokeWidth={2.5} />
                          </span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-[12.5px] text-primary-foreground/55 italic font-body mt-6 pt-5 border-t border-primary-foreground/10">
                      Chaque situation étant spécifique, une analyse personnalisée est indispensable avant toute décision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── RÉSULTAT CONCRET ── */}
        <section className="bg-secondary py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -right-10 select-none hidden lg:block">
            <span data-anim="text-scrub" className="font-display italic text-[220px] leading-none text-foreground/[0.04] tracking-tight">Impact</span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative">
            <div data-anim="fade-up" className="text-center mb-12 md:mb-16 max-w-[640px] mx-auto">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Cas client</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.08]">
                Résultat <span className="italic text-accent">concret</span>
              </h2>
            </div>

            <div data-anim="fade-up" data-delay="0.1" >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-card rounded-3xl border border-border/60 overflow-hidden shadow-[0_30px_70px_-40px_hsl(var(--primary)/0.25)]">
                {/* Left visual band */}
                <div className="lg:col-span-4 bg-primary text-primary-foreground p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[260px]">
                  <div className="pointer-events-none absolute -bottom-12 -left-8 w-60 h-60 rounded-full bg-accent/15 blur-3xl" />
                  <Quote size={64} className="text-accent/40 -ml-2" strokeWidth={1} />
                  <div className="relative">
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent font-body mb-2">Cas n°01</p>
                    <p className="font-display text-[20px] md:text-[24px] italic text-primary-foreground leading-[1.2]">
                      Un projet relancé sans financement externe.
                    </p>
                  </div>
                </div>

                {/* Right content */}
                <div className="lg:col-span-8 p-8 md:p-12">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Building size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/50 font-body mb-1">Promoteur résidentiel</p>
                      <h3 className="font-display text-[20px] md:text-[24px] text-foreground leading-[1.2]">
                        Comptabilité analytique <span className="italic text-accent">+ optimisation des ventes</span>
                      </h3>
                    </div>
                  </div>

                  <p className="text-[14.5px] text-muted-foreground leading-[1.75] font-body">
                    Un promoteur immobilier gérant plusieurs projets résidentiels a mis en place une comptabilité analytique par projet et une optimisation du calendrier des ventes. Résultat : amélioration significative de la rentabilité globale et trésorerie renforcée : nouveau projet lancé sans financement externe.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-7 pt-7 border-t border-border/50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={14} className="text-accent" strokeWidth={2} />
                        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground/50 font-body">Rentabilité</p>
                      </div>
                      <p className="font-display text-[20px] text-foreground">Améliorée</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Rocket size={14} className="text-accent" strokeWidth={2} />
                        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground/50 font-body">Nouveau projet</p>
                      </div>
                      <p className="font-display text-[20px] text-foreground">Autofinancé</p>
                    </div>
                  </div>

                  <p className="text-[12.5px] text-foreground/45 italic font-body mt-5">
                    Les gains obtenus varient selon la nature et la taille des projets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OFFRE EXCELLENCE ── */}
        <section className="bg-card py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none hidden md:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[280px] leading-none text-foreground/[0.03] tracking-tight whitespace-nowrap">Excellence</span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative">
            <div data-anim="fade-up" className="text-center mb-12 max-w-[640px] mx-auto">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Notre offre</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.08]">
                Une seule offre : <span className="italic text-accent">Excellence</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mt-5 font-body">
                Un accompagnement unique, calibré pour la complexité des opérations de promotion.
              </p>
            </div>

            <div data-anim="fade-up" data-delay="0.1" >
              <div className="relative bg-primary text-primary-foreground rounded-3xl overflow-hidden shadow-[0_40px_80px_-30px_hsl(var(--primary)/0.5)]">
                <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
                <Rocket size={280} className="absolute -bottom-12 -right-8 text-primary-foreground/[0.04]" strokeWidth={0.5} />

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left: identity + price */}
                  <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-primary-foreground/10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold tracking-[0.2em] uppercase font-body">Excellence</span>
                      <span className="text-primary-foreground/50 text-[11px] tracking-[0.2em] uppercase font-body">Offre unique</span>
                    </div>
                    <h3 className="font-display text-[28px] md:text-[36px] text-primary-foreground leading-[1.1] mb-8">
                      Le pilotage <span className="italic text-accent">complet</span> pour promoteurs.
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-display text-[80px] md:text-[110px] font-bold text-primary-foreground leading-none">650</span>
                      <span className="font-display text-[40px] text-accent leading-none">€</span>
                      <span className="text-primary-foreground/60 text-[14px] font-body ml-1">/ mois HTVA</span>
                    </div>

                    <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-primary-foreground/5 border border-primary-foreground/15">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <p className="text-[13px] text-primary-foreground/85 font-body">
                        DAF temps partiel : <strong className="text-primary-foreground">150 € HTVA / heure</strong>
                      </p>
                    </div>
                  </div>

                  {/* Right: includes */}
                  <div className="lg:col-span-5 p-8 md:p-12 lg:p-14 bg-primary-foreground/[0.03]">
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent font-body mb-5">Ce qui est inclus</p>
                    <ul className="space-y-3.5">
                      {[
                        "Comptabilité analytique par projet",
                        "Suivi TVA immobilière",
                        "Tableaux de bord & marges",
                        "Trésorerie prévisionnelle",
                        "Reporting périodique dédié",
                      ].map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14px] text-primary-foreground/90 font-body">
                          <span className="mt-[2px] w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                            <Check size={11} className="text-accent" strokeWidth={2.5} />
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer CTA bar */}
                <div className="relative border-t border-primary-foreground/10 px-8 md:px-12 lg:px-14 py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <p className="text-[13px] text-primary-foreground/70 font-body">
                    Prêt à passer à l'<span className="italic text-accent">Excellence</span> ?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                      <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" /></Link>
                    </Button>
                    <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                      <Link to="/tarifs/">Voir tous les tarifs <ArrowUpRight size={16} className="ml-1 flex-shrink-0" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-14 md:py-24 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
          <div className="pointer-events-none absolute -bottom-16 right-0 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[220px] leading-none text-primary-foreground/[0.05] tracking-tight">Discutons</span>
          </div>
          <div className="mx-auto max-w-[900px] px-6 lg:px-12 text-center relative z-10">
            <div data-anim="fade-up">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Premier contact</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>
              <h2 className="font-display text-[28px] md:text-[48px] text-primary-foreground leading-[1.1]">
                Prêt à <span className="text-accent italic">structurer</span> vos projets immobiliers ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel : nous analysons vos enjeux financiers et fiscaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/services/daf-externalise/">Découvrir le DAF externalisé <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
