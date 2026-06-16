import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/societe-moyens-hero.jpg";
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
  Users,
  BarChart3,
  CreditCard,
  Building2,
  Monitor,
  Headphones,
  Quote,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const mutualisations = [
  { icon: Building2, label: "Locaux professionnels : loyer, charges, entretien, énergie" },
  { icon: Monitor, label: "Matériel et équipements : achetés en commun et amortis collectivement" },
  { icon: Headphones, label: "Services partagés : secrétariat, support administratif, solutions cloud" },
];

const services = [
  {
    icon: BarChart3,
    title: "Comptabilité transparente basée sur l'usage réel",
    desc: "Chaque dépense imputée selon l'utilisation réelle de chaque membre.",
  },
  {
    icon: CreditCard,
    title: "Cash Collecting externalisé",
    desc: "Nous gérons la collecte des cotisations de façon automatisée et impartiale. Vous n'avez pas à jouer le mauvais rôle auprès de vos associés.",
  },
];

const compareRows = [
  { label: "Tarif mensuel HTVA", values: ["350 €", "450 €", "650 €"], isPrice: true },
  { label: "Comptabilité + obligations", values: [true, true, true] },
  { label: "Cash Collecting", values: [true, true, true] },
  { label: "Trésorerie prévisionnelle", values: ["—", "—", true] },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Société de moyens", item: "https://mfinances.be/qui-nous-accompagnons/societe-de-moyens/" },
  ],
};



export default function SocieteDeMoyens() {
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
        title="Expert-Comptable Société de Moyens Bruxelles — MFinances"
        description="Comptabilité, répartition des charges et cash collecting pour sociétés de moyens en Belgique. MFinances, Bruxelles."
        canonical="https://mfinances.be/qui-nous-accompagnons/societe-de-moyens/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-6 md:py-12 relative overflow-hidden bg-precision-grid-light">
          <div className="pointer-events-none absolute -top-8 -right-10 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[180px] lg:text-[240px] leading-none text-primary-foreground/[0.04] tracking-tight">Partager</span>
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
                  <BreadcrumbPage className="text-primary-foreground text-[12px] tracking-wider uppercase">Société de moyens</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-accent text-[11px] font-bold tracking-[0.25em] uppercase">Structure : N°04</span>
                </div>
                <h1 className="font-display text-[36px] md:text-[64px] leading-[1.05] text-primary-foreground tracking-tight">
                  Mutualisez vos ressources<br />
                  sans <span className="italic text-accent">tensions</span> entre associés.
                </h1>
                <p className="text-primary-foreground/70 text-[16px] md:text-[18px] leading-relaxed mt-8 font-body max-w-[560px]">
                  Une structure qui permet à plusieurs professionnels de mutualiser leurs moyens sans exercer leur activité en commun. Elle ne génère pas de bénéfices.
                </p>
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
                  <img src={imgHero} alt="Professionnels partageant un espace de travail à Bruxelles" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 bg-primary-foreground/95 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary">Mutualisation · Cash</span>
                  </div>
                </div>
                <div className="hidden lg:block absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl px-5 py-4 shadow-xl rotate-[-3deg]">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase opacity-80">Service</div>
                  <div className="font-display text-[22px] font-bold leading-none mt-1">Cash collecting</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CE QU'ON PEUT MUTUALISER ── */}
        <section className="bg-card py-10 md:py-10">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <div data-anim="fade-up" className="text-center mb-12">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce qu'on peut <span className="text-accent">mutualiser</span> concrètement
              </h2>
            </div>

            <div className="space-y-4">
              {mutualisations.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div data-anim="fade-up" data-delay="0.08 + i * 0.06" key={m.label}  className="flex items-start gap-4 bg-secondary/60 rounded-2xl p-6 border border-border/50">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={20} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <p className="text-[15px] text-foreground/80 font-body leading-relaxed">{m.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-secondary py-8 md:py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-12 -right-10 select-none hidden lg:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[220px] leading-none text-foreground/[0.04] tracking-tight">Mutualiser</span>
          </div>

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 relative">
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
                  Deux services clés pour une gestion partagée transparente : chacun paie ce qu'il consomme, sans frictions entre associés.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {services.map((s, i) => {
                const Icon = s.icon;
                const isDark = i === 1;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div data-anim="fade-up" data-delay="0.08 + i * 0.08" key={s.title} >
                    <div className={`group relative rounded-3xl p-8 md:p-10 h-full overflow-hidden transition-all duration-500 border ${
                      isDark
                        ? "bg-primary text-primary-foreground border-primary hover:shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.45)]"
                        : "bg-card border-border/60 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.2)]"
                    }`}>
                      <div className={`pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl transition-all duration-700 ${
                        isDark ? "bg-accent/15" : "bg-accent/0 group-hover:bg-accent/10"
                      }`} />
                      <div className={`absolute top-7 right-7 font-display text-[60px] leading-none select-none ${
                        isDark ? "text-accent/[0.20]" : "text-accent/[0.15]"
                      }`}>{num}</div>

                      <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-7 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 ${
                          isDark ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                        }`}>
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <h3 className={`font-display text-[22px] md:text-[26px] leading-[1.15] mb-4 ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
                          {s.title}
                        </h3>
                        <p className={`text-[14.5px] leading-[1.75] font-body ${isDark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                          {s.desc}
                        </p>

                        <div className={`mt-8 pt-6 border-t ${isDark ? "border-primary-foreground/15" : "border-border/50"}`}>
                          <span className={`text-[11px] font-bold tracking-[0.2em] uppercase font-body ${isDark ? "text-primary-foreground/50" : "text-foreground/50"}`}>
                            {isDark ? "Encaissement neutre" : "Transparence des coûts"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── RÉSULTAT CONCRET ── */}
        <section className="bg-card py-8 md:py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -right-10 select-none hidden lg:block">
            <span data-anim="text-scrub" className="font-display italic text-[220px] leading-none text-foreground/[0.035] tracking-tight">Impact</span>
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
                <div className="lg:col-span-4 bg-primary text-primary-foreground p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[260px]">
                  <div className="pointer-events-none absolute -bottom-12 -left-8 w-60 h-60 rounded-full bg-accent/15 blur-3xl" />
                  <Quote size={64} className="text-accent/40 -ml-2" strokeWidth={1} />
                  <div className="relative">
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent font-body mb-2">Cas n°01</p>
                    <p className="font-display text-[20px] md:text-[24px] italic text-primary-foreground leading-[1.2]">
                      Coûts allégés, collaboration retrouvée.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 p-8 md:p-12">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Users size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/50 font-body mb-1">Cabinet médical partagé</p>
                      <h3 className="font-display text-[20px] md:text-[24px] text-foreground leading-[1.2]">
                        Comptabilité analytique <span className="italic text-accent">+ cash collecting</span>
                      </h3>
                    </div>
                  </div>

                  <p className="text-[14.5px] text-muted-foreground leading-[1.75] font-body">
                    Un groupe de médecins partageant un cabinet a mis en place une comptabilité analytique par activité réelle, une centralisation des achats et un système automatisé de gestion des cotisations. Résultat : réduction significative des coûts d'approvisionnement, charges d'exploitation allégées et collaboration harmonieuse retrouvée entre les membres.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-7 pt-7 border-t border-border/50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingDown size={14} className="text-accent" strokeWidth={2} />
                        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground/50 font-body">Charges</p>
                      </div>
                      <p className="font-display text-[20px] text-foreground">Allégées</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={14} className="text-accent" strokeWidth={2} />
                        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground/50 font-body">Collaboration</p>
                      </div>
                      <p className="font-display text-[20px] text-foreground">Apaisée</p>
                    </div>
                  </div>

                  <p className="text-[12.5px] text-foreground/45 italic font-body mt-5">
                    Les résultats varient selon la nature de chaque structure partagée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FORFAITS ── */}
        <section className="bg-secondary py-8 md:py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -left-10 select-none hidden lg:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[220px] leading-none text-foreground/[0.04] tracking-tight">Forfaits</span>
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
            </div>

            <div data-anim="fade-up" data-delay="0.08" >
              <div className="hidden sm:grid grid-cols-[35%_1fr_1fr_1fr] mb-1">
                <div />
                {[
                  { name: "Essentiel", price: "350", featured: false },
                  { name: "Premium", price: "450", featured: false },
                  { name: "Excellence", price: "650", featured: true },
                ].map((p) => (
                  <div key={p.name} className={`rounded-t-2xl px-3 md:px-5 py-5 md:py-6 text-center border-x border-t transition-all relative ${
                    p.featured
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_-10px_30px_-10px_hsl(var(--primary)/0.3)]"
                      : "bg-card border-border/50"
                  }`}>
                    {p.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase font-body whitespace-nowrap">
                        Recommandé
                      </span>
                    )}
                    <p className={`font-display text-[15px] md:text-[18px] font-bold ${p.featured ? "text-accent" : "text-primary"}`}>{p.name}</p>
                    <div className="flex items-baseline justify-center gap-1 mt-2">
                      <span className={`font-display text-[24px] md:text-[32px] font-bold ${p.featured ? "text-primary-foreground" : "text-primary"}`}>{p.price}€</span>
                      <span className={`text-[10px] md:text-[11px] font-body ${p.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>/mois HTVA</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block bg-card rounded-b-2xl border border-border/50 border-t-0 overflow-hidden shadow-[0_30px_70px_-40px_hsl(var(--primary)/0.2)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px] table-fixed">
                    <colgroup>
                      <col style={{ width: "35%" }} />
                      <col style={{ width: "21.66%" }} />
                      <col style={{ width: "21.66%" }} />
                      <col style={{ width: "21.66%" }} />
                    </colgroup>
                    <tbody>
                      {compareRows.slice(1).map((row) => (
                        <tr key={row.label} className="border-t border-border/30 first:border-t-0">
                          <td className="p-4 md:p-5 pl-5 md:pl-7 font-medium text-foreground/80 font-body">{row.label}</td>
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
                                  <span className="font-body text-foreground/70 text-[13px]">{v}</span>
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

              <div className="sm:hidden bg-card rounded-2xl border border-border/50 p-4 space-y-3">
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
                            <span className="font-body text-[11px] text-foreground/70">{row.values[ci]}</span>
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
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-14 md:py-12 relative overflow-hidden">
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
                <span className="text-accent italic">Simplifiez</span> la gestion de votre société de moyens
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel : nous analysons votre situation et proposons une organisation comptable adaptée.
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
