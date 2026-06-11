import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/asbl-hero.jpg";
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
  Minus,
  HeartHandshake,
  FileText,
  BarChart3,
  Search,
  CreditCard,
  Lightbulb,
  Scale,
  Sparkles,
  Quote,
} from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const services = [
  {
    icon: FileText,
    title: "Création et gestion administrative",
    desc: "Rédaction et dépôt des statuts, enregistrement au Moniteur belge, suivi des obligations légales.",
  },
  {
    icon: BarChart3,
    title: "Comptabilité générale et analytique",
    desc: "Suivi des coûts par projet et répartition des frais généraux. Chaque euro est tracé, chaque projet est comptabilisé séparément.",
  },
  {
    icon: Search,
    title: "Accompagnement en recherche de financements",
    desc: "Plans financiers détaillés par projet, suivi via comptabilité analytique pour justifier les subsides.",
  },
  {
    icon: CreditCard,
    title: "Cash Collecting",
    desc: "Gestion des cotisations des membres de façon automatisée et impartiale.",
  },
  {
    icon: Lightbulb,
    title: "Accompagnement ponctuel selon les besoins",
    desc: "Analyse approfondie, budget annuel, optimisation des ressources : nous intervenons ponctuellement selon vos besoins spécifiques.",
  },
  {
    icon: Scale,
    title: "Obligations légales selon la taille",
    desc: "Petite ASBL : comptabilité simplifiée. Grande ASBL : comptabilité en partie double obligatoire, dépôt des comptes annuels à la BNB.",
  },
];

const compareRows = [
  { label: "Tarif mensuel HTVA", values: ["350 €", "450 €", "650 €"], isPrice: true },
  { label: "Réduction non-assujetti TVA", values: ["-21 %", "-21 %", "-21 %"], isDiscount: true },
  { label: "Comptabilité + obligations", values: [true, true, true] },
  { label: "Comptabilité analytique", values: ["—", true, true] },
  { label: "Trésorerie prévisionnelle", values: ["—", "—", true] },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "ASBL", item: "https://mfinances.be/qui-nous-accompagnons/asbl/" },
  ],
};



export default function Asbl() {
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
        title="Expert-Comptable ASBL à Bruxelles — MFinances"
        description="Comptabilité, subsides, obligations légales et accompagnement pour ASBL en Belgique. Cabinet MFinances, Bruxelles."
        canonical="https://mfinances.be/qui-nous-accompagnons/asbl/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-12 md:py-24 relative overflow-hidden bg-precision-grid-light">
          <div className="pointer-events-none absolute -top-8 -right-10 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[180px] lg:text-[240px] leading-none text-primary-foreground/[0.04] tracking-tight">Mission</span>
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
                  <BreadcrumbPage className="text-primary-foreground text-[12px] tracking-wider uppercase">ASBL</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Structure : N°01</span>
                </div>
                <h1 className="font-display text-[36px] md:text-[56px] leading-[1.1] text-primary-foreground tracking-tight">
                  Vous avez une <span className="italic text-accent">mission</span> qui change des vies.<br />
                  La gestion administrative ne doit pas vous en empêcher.<br />
                  <span className="italic font-normal text-primary-foreground/70 text-[22px] md:text-[34px]">On s'occupe de la comptabilité, des subsides et des obligations légales.</span>
                </h1>
                <div className="flex flex-wrap items-center gap-5 mt-10">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                    <Link to="/contact/">
                      Consultation gratuite
                      <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="absolute -top-12 -right-6 z-20 hidden md:block">
                  <Stamp className="text-accent drop-shadow-lg" />
                </div>
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-[4/5] group cut-corner">
                  <img src={imgHero} alt="Équipe ASBL en réunion à Bruxelles" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 bg-primary-foreground/95 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary">ASBL · Subsides</span>
                  </div>
                </div>
                <div className="hidden lg:block absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl px-5 py-4 shadow-xl rotate-[-3deg]">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase opacity-80">Réduction</div>
                  <div className="font-display text-[22px] font-bold leading-none mt-1">−21% TVA</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-card py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-12 -right-10 select-none hidden lg:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[220px] leading-none text-foreground/[0.035] tracking-tight">Engagement</span>
          </div>

          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 relative">
            <div data-anim="fade-up" className="mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-10 bg-accent/60" />
                  <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Notre intervention</span>
                </div>
                <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.08]">
                  Ce que MFinances fait <span className="text-accent italic">pour vous</span>
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-muted-foreground text-[15px] leading-relaxed font-body">
                  Six expertises pensées pour le secteur non-marchand : de la création des statuts au suivi des subsides, votre cause prime, on s'occupe du reste.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {services.map((s, i) => {
                const Icon = s.icon;
                const isDark = i === 1 || i === 4; // alternance navy
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div data-anim="fade-up" data-delay="0.06 + i * 0.05" key={s.title} >
                    <div className={`group relative rounded-3xl p-7 md:p-8 h-full overflow-hidden transition-all duration-500 border ${
                      isDark
                        ? "bg-primary text-primary-foreground border-primary hover:shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.45)]"
                        : "bg-secondary/50 border-border/60 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.2)]"
                    }`}>
                      <div className={`pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl transition-all duration-700 ${
                        isDark ? "bg-accent/15" : "bg-accent/0 group-hover:bg-accent/10"
                      }`} />
                      <div className={`absolute top-6 right-6 font-display text-[44px] leading-none select-none ${
                        isDark ? "text-primary-foreground/[0.25]" : "text-accent/[0.25]"
                      }`}>{num}</div>

                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 ${
                          isDark ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                        }`}>
                          <Icon size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className={`font-display text-[18px] md:text-[20px] leading-[1.2] mb-3 ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
                          {s.title}
                        </h3>
                        <p className={`text-[13.5px] leading-[1.7] font-body ${isDark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                          {s.desc}
                        </p>

                        <div className={`mt-6 pt-5 border-t flex items-center justify-between ${isDark ? "border-primary-foreground/15" : "border-border/50"}`}>
                          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase font-body ${isDark ? "text-primary-foreground/50" : "text-foreground/50"}`}>
                            Service {num}
                          </span>
                          <ArrowUpRight size={16} className="text-accent transition-transform duration-500 group-hover:rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FORFAITS ── */}
        <section className="bg-secondary py-16 md:py-28 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -left-10 select-none hidden lg:block">
            <span data-anim="text-scrub" className="font-display italic text-[220px] leading-none text-foreground/[0.04] tracking-tight">Forfaits</span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative">
            <div data-anim="fade-up" className="text-center mb-12 max-w-[680px] mx-auto">
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Tarification</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.08]">
                Forfaits <span className="italic text-accent">disponibles</span>
              </h2>
              <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Sparkles size={14} className="text-accent" strokeWidth={2} />
                <p className="text-[13px] text-foreground/80 font-body">
                  <strong className="text-accent">−21 %</strong> appliqués pour les ASBL non assujetties à la TVA
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[760px] mx-auto">
                {[
                  { name: "Essentiel", price: "277" },
                  { name: "Premium", price: "356" },
                  { name: "Excellence", price: "514" },
                ].map((p) => (
                  <div key={p.name} className="bg-card border border-border/50 rounded-xl px-4 py-3 text-center">
                    <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground/60 font-body mb-1">{p.name}</p>
                    <p className="font-body text-[14px] text-foreground">
                      à partir de <span className="font-bold text-accent">{p.price} €</span>
                      <span className="text-foreground/60">/mois</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan headers cards */}
            <div data-anim="fade-up" data-delay="0.08" >
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-1">
                {[
                  { name: "Essentiel", price: "350", featured: false },
                  { name: "Premium", price: "450", featured: false },
                  { name: "Excellence", price: "650", featured: true },
                ].map((p) => (
                  <div key={p.name} className={`rounded-t-2xl px-4 md:px-6 py-5 md:py-6 text-center border-x border-t transition-all ${
                    p.featured
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_-10px_30px_-10px_hsl(var(--primary)/0.3)] relative"
                      : "bg-card border-border/50"
                  }`}>
                    {p.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase font-body whitespace-nowrap">
                        Recommandé
                      </span>
                    )}
                    <p className={`font-display text-[15px] md:text-[18px] font-bold ${p.featured ? "text-accent" : "text-primary"}`}>{p.name}</p>
                    <div className="flex items-baseline justify-center gap-1 mt-2">
                      <span className={`font-display text-[26px] md:text-[36px] font-bold ${p.featured ? "text-primary-foreground" : "text-primary"}`}>{p.price}€</span>
                      <span className={`text-[10px] md:text-[11px] font-body ${p.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>/mois HTVA</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison table desktop */}
              <div className="hidden sm:block bg-card rounded-b-2xl border border-border/50 border-t-0 overflow-hidden shadow-[0_30px_70px_-40px_hsl(var(--primary)/0.2)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <tbody>
                      {compareRows.slice(1).map((row, ri) => (
                        <tr key={row.label} className="border-t border-border/30 first:border-t-0">
                          <td className="p-4 md:p-5 pl-5 md:pl-7 font-medium text-foreground/80 font-body w-[35%]">{row.label}</td>
                          {row.values.map((v, ci) => {
                            const isFeatured = ci === 2;
                            return (
                              <td key={ci} className={`p-4 md:p-5 text-center ${isFeatured ? "bg-accent/[0.04]" : ""}`}>
                                {v === true ? (
                                  <span className="inline-flex w-7 h-7 rounded-full bg-[hsl(145,63%,42%)]/10 items-center justify-center">
                                    <Check size={15} className="text-[hsl(145,63%,42%)]" strokeWidth={2.5} />
                                  </span>
                                ) : v === "—" ? (
                                  <Minus size={16} className="text-foreground/20 mx-auto" />
                                ) : (
                                  <span className={`font-body ${
                                    (row as any).isDiscount ? "font-semibold text-accent text-[14px]" :
                                    "text-foreground/70 text-[13px]"
                                  }`}>{v}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden bg-card rounded-b-2xl border border-border/50 border-t-0 p-4 space-y-3">
                {compareRows.slice(1).map((row) => (
                  <div key={row.label} className="border border-border/40 rounded-xl p-4">
                    <p className="text-[13px] font-semibold text-foreground font-body mb-3">{row.label}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Essentiel", "Premium", "Excellence"].map((plan, ci) => (
                        <div key={plan} className={`text-center rounded-lg py-2 ${ci === 2 ? "bg-accent/5" : ""}`}>
                          <span className={`text-[9px] font-semibold uppercase tracking-wider font-body block mb-1 ${ci === 2 ? "text-accent" : "text-muted-foreground"}`}>{plan}</span>
                          {row.values[ci] === true ? (
                            <Check size={16} className="text-[hsl(145,63%,42%)] mx-auto" />
                          ) : row.values[ci] === "—" ? (
                            <Minus size={14} className="text-foreground/20 mx-auto" />
                          ) : (
                            <span className={`font-body text-[11px] ${
                              (row as any).isDiscount ? "font-semibold text-accent" :
                              "text-foreground/70"
                            }`}>{row.values[ci]}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-10">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" /></Link>
              </Button>
            </div>

            <div data-anim="fade-up" data-delay="0.2"  className="mt-10 text-center">
              <p className="text-[14px] text-muted-foreground font-body">
                Voir aussi :{" "}
                <Link to="/qui-nous-accompagnons/societe-de-moyens/" className="text-accent font-semibold hover:underline">
                  Société de moyens
                </Link>{" "}· {" "}
                <Link to="/qui-nous-accompagnons/societe-exploitation/" className="text-accent font-semibold hover:underline">
                  Société d'exploitation
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGE MARIE-CLAIRE ── */}
        <section className="bg-card py-16 md:py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -right-10 w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 select-none hidden lg:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[200px] leading-none text-foreground/[0.04] tracking-tight">Confiance</span>
          </div>

          <div className="mx-auto max-w-[900px] px-6 lg:px-12 relative">
            <div data-anim="fade-up">
              <div className="flex items-center gap-3 justify-center mb-6">
                <span className="h-px w-10 bg-accent/60" />
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase font-body">Témoignage client</span>
                <span className="h-px w-10 bg-accent/60" />
              </div>

              <Quote size={56} className="text-accent/50 mx-auto mb-6" strokeWidth={1} />

              <blockquote className="font-display text-[22px] md:text-[30px] text-foreground leading-[1.4] text-center italic">
                «&nbsp;Avant MFinances, la préparation des justificatifs pour les subsides nous prenait <span className="text-accent not-italic font-bold">3 semaines</span>. Maintenant, la comptabilité analytique génère <span className="text-accent not-italic font-bold">automatiquement</span> les rapports pour les fondateurs.&nbsp;»
              </blockquote>

              <div className="flex items-center justify-center gap-3 mt-8">
                <span className="h-px w-8 bg-accent/60" />
                <p className="text-muted-foreground text-[14px] font-body tracking-wide">
                  <span className="font-bold text-foreground">Marie-Claire</span> : Secrétaire générale, ASBL culturelle, Bruxelles
                </p>
                <span className="h-px w-8 bg-accent/60" />
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
                Votre ASBL mérite un <span className="text-accent italic">accompagnement</span> dédié
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel : nous analysons vos besoins comptables et financiers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/tarifs/">Voir les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
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
