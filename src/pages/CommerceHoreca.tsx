import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/commerce-horeca-hero.jpg";
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
  Receipt,
  PieChart,
  Percent,
  TrendingDown,
  Quote,
  BarChart3,
} from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const services = [
  {
    icon: Receipt,
    title: "Comptabilité et fiscalité secteur-specific",
    desc: "TVA multi-taux, gestion de caisse, traitement des pourboires, régimes spécifiques.",
  },
  {
    icon: PieChart,
    title: "Analyse des coûts et des marges",
    desc: "Coût alimentaire, prix de revient par produit ou service, marge brute, marge nette.",
  },
  {
    icon: Percent,
    title: "Optimisation de la TVA",
    desc: "Vente sur place à 12%, vente à emporter à 6%, hébergement à 6%. Chaque flux correctement traité.",
  },
  {
    icon: BarChart3,
    title: "Gestion et prévision de trésorerie",
    desc: "Prévisionnel adapté à vos cycles pour anticiper les tensions.",
  },
];

const caseStudies = [
  {
    icon: TrendingDown,
    title: "Restaurant : gestion en flux tendu",
    desc: "Un restaurant Horeca confronté à un stockage excessif a mis en place une gestion en flux tendu et un suivi des coûts alimentaires par plat. Résultat : réduction de 30% des coûts de stockage en 2 mois. Trésorerie disponible augmentée de 8 000 €.",
  },
  {
    icon: BarChart3,
    title: "Magasin de vêtements : rotation des stocks",
    desc: "Un magasin avec des stocks à faible rotation a restructuré son approche commerciale grâce à une analyse des données de vente. Résultat : taux de rotation amélioré de 40% en une saison. Liquidités bloquées réduites de moitié.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Commerce & Horeca", item: "https://mfinances.be/qui-nous-accompagnons/commerce-et-horeca/" },
  ],
};



export default function CommerceHoreca() {
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
        title="Expert-Comptable Commerce Horeca Bruxelles — MFinances"
        description="Comptabilité, TVA multi-taux, marges et trésorerie pour commerçants et secteur Horeca en Belgique. Suivi minimum trimestriel. MFinances, Bruxelles."
        canonical="https://mfinances.be/qui-nous-accompagnons/commerce-et-horeca/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ÉDITORIAL ── */}
        <section className="bg-primary py-6 md:py-12 relative overflow-hidden bg-precision-grid-light">
          <div className="pointer-events-none absolute -top-8 -right-10 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[180px] lg:text-[240px] leading-none text-primary-foreground/[0.04] tracking-tight">
              Marges
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
                  <BreadcrumbPage className="text-primary-foreground text-[12px] tracking-wider uppercase">Commerce & Horeca</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-accent/75 text-[11px] font-bold tracking-[0.25em] uppercase">Profil : N°02</span>
                </div>
                <h1 className="font-display text-[36px] md:text-[64px] leading-[1.05] text-primary-foreground tracking-tight">
                  Plein tous les soirs —<br />
                  mais à la fin du mois,<br />
                  <span className="italic text-accent">où est passé l'argent&nbsp;?</span>
                </h1>
                <p className="text-primary-foreground/70 text-[16px] md:text-[18px] leading-relaxed mt-8 font-body max-w-[560px]">
                  Dans ce secteur, la différence entre un établissement qui prospère et un qui ferme tient souvent à un seul facteur : la maîtrise financière.
                </p>
                <div className="flex flex-wrap items-center gap-5 mt-10">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                    <Link to="/contact/">
                      Consultation gratuite
                      <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                  <span className="text-primary-foreground/60 text-[15px] md:text-[16px] font-body">
                    Forfait Premium minimum : <span className="text-primary-foreground font-semibold text-[16px] md:text-[18px]">dès 450 €</span> HTVA/mois
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="absolute -top-12 -right-6 z-20 hidden md:block">
                  <Stamp className="text-accent drop-shadow-lg" />
                </div>
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-[4/5] group cut-corner">
                  <img src={imgHero} alt="Restaurant élégant à Bruxelles — secteur Horeca" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 bg-primary-foreground/95 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary">Multi-taux TVA</span>
                  </div>
                </div>
                <div className="hidden lg:block absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl px-5 py-4 shadow-xl rotate-[-3deg]">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase opacity-80">Suivi</div>
                  <div className="font-display text-[22px] font-bold leading-none mt-1">Trimestriel</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-card py-8 md:py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute top-10 -right-10 select-none hidden md:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[140px] lg:text-[200px] leading-none text-primary/[0.04] tracking-tight">
              Pilotage
            </span>
          </div>

          <div className="mx-auto max-w-[1240px] px-6 lg:px-12 relative z-10">
            <div data-anim="fade-up" className="max-w-[680px] mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent/75 text-[11px] font-bold tracking-[0.25em] uppercase">Notre approche</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Ce que MFinances fait <span className="italic text-accent">pour vous.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
              {services.map((s, i) => {
                const Icon = s.icon;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div data-anim="fade-up" data-delay="0.08 + i * 0.06" key={s.title} >
                    <div className="group relative bg-secondary/40 hover:bg-secondary/70 rounded-3xl p-7 md:p-8 border border-border/40 hover:border-accent/30 transition-all duration-500 overflow-hidden h-full">
                      <div className="pointer-events-none absolute -top-6 -right-6 w-32 h-32 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-2xl transition-all duration-500" />
                      <div className="relative flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 group-hover:bg-accent/15 flex items-center justify-center transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                          <Icon size={22} className="text-accent" strokeWidth={1.5} />
                        </div>
                        <span className="font-display text-[28px] font-bold text-accent/[0.25] leading-none">{num}</span>
                      </div>
                      <h3 className="text-[18px] font-bold font-body text-foreground mb-3">{s.title}</h3>
                      <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── RÉSULTATS CONCRETS ── */}
        <section className="bg-secondary py-8 md:py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -left-10 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[140px] lg:text-[200px] leading-none text-accent/[0.06] tracking-tight">
              Résultats
            </span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative z-10">
            <div data-anim="fade-up" className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent/75 text-[11px] font-bold tracking-[0.25em] uppercase">Cas réels</span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Résultats <span className="italic text-accent">concrets.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
              {caseStudies.map((c, i) => {
                const Icon = c.icon;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div data-anim="fade-up" data-delay="0.08 + i * 0.08" key={c.title} >
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGE ── */}
        <section className="bg-card py-8 md:py-14 relative overflow-hidden">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12 relative z-10">
            <div data-anim="fade-up">
              <div className="relative bg-primary text-primary-foreground rounded-[28px] p-8 md:p-14 overflow-hidden">
                <div className="pointer-events-none absolute -top-10 -right-10 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
                <Quote size={56} className="text-accent/30 mb-6" strokeWidth={1.2} />
                <blockquote className="text-[20px] md:text-[26px] text-primary-foreground leading-[1.5] font-display italic max-w-[700px]">
                  « Avant MFinances, je passais 4 heures par semaine à trier mes factures. Maintenant, je vérifie mon tableau de bord en 20 minutes le lundi matin. Je garde le contrôle sans m'enliser dans l'administratif. »
                </blockquote>
                <div className="flex items-center gap-4 mt-8 relative z-10">
                  <div className="w-px h-10 bg-accent" />
                  <div>
                    <p className="text-accent font-bold font-body text-[15px]">Yanis</p>
                    <p className="text-primary-foreground/60 text-[13px] font-body">Restaurateur à Bruxelles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FORFAITS DISPONIBLES ── */}
        <section className="bg-secondary py-8 md:py-14 relative overflow-hidden">
          <div className="pointer-events-none absolute top-20 -right-10 select-none hidden md:block">
            <span data-anim="text-scrub" data-scrub-dir="right" className="font-display italic text-[140px] lg:text-[200px] leading-none text-primary/[0.04] tracking-tight">
              Forfaits
            </span>
          </div>

          <div className="mx-auto max-w-[920px] px-6 lg:px-12 relative z-10">
            <div data-anim="fade-up" className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent/75 text-[11px] font-bold tracking-[0.25em] uppercase">Tarification</span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] text-foreground leading-[1.1] tracking-tight">
                Forfaits : <span className="italic text-accent">Premium minimum.</span>
              </h2>
            </div>

            <div data-anim="fade-up" data-delay="0.1" >
              <div className="hidden sm:block bg-card rounded-3xl border border-border/50 overflow-hidden shadow-sm">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-border/30 bg-secondary/40">
                      <th className="text-left p-5 font-body font-normal text-muted-foreground w-[40%]" />
                      <th className="p-5 text-center">
                        <span className="font-display font-bold text-[17px] text-primary block">Premium</span>
                        <span className="text-[12px] text-muted-foreground font-body">450 €/mois</span>
                      </th>
                      <th className="p-5 text-center bg-accent/[0.05]">
                        <span className="font-display font-bold text-[17px] text-accent block">Excellence</span>
                        <span className="text-[12px] text-muted-foreground font-body">650 €/mois</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/20">
                      <td className="p-4 pl-6 font-medium text-foreground/80 font-body">Comptabilité + TVA sectorielle</td>
                      <td className="p-4 text-center"><Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" /></td>
                      <td className="p-4 text-center bg-accent/[0.03]"><Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-border/20">
                      <td className="p-4 pl-6 font-medium text-foreground/80 font-body">Analyse des marges</td>
                      <td className="p-4 text-center text-[13px] text-foreground/70 font-body">Trimestrielle</td>
                      <td className="p-4 text-center text-[13px] text-foreground/70 font-body bg-accent/[0.03]">Mensuelle</td>
                    </tr>
                    <tr>
                      <td className="p-4 pl-6 font-medium text-foreground/80 font-body">Trésorerie prévisionnelle</td>
                      <td className="p-4 text-center"><Minus size={16} className="text-foreground/20 mx-auto" /></td>
                      <td className="p-4 text-center text-[13px] text-foreground/70 font-body bg-accent/[0.03]">✓ mensuelle</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden space-y-3">
                {[
                  { label: "Comptabilité + TVA sectorielle", premium: true, excellence: true },
                  { label: "Analyse des marges", premium: "Trimestrielle", excellence: "Mensuelle" },
                  { label: "Trésorerie prévisionnelle", premium: false, excellence: "✓ mensuelle" },
                ].map((row) => (
                  <div key={row.label} className="bg-card rounded-2xl border border-border/50 p-4">
                    <p className="text-[14px] font-semibold text-foreground font-body mb-3">{row.label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider font-body block mb-1">Premium</span>
                        {row.premium === true ? <Check size={16} className="text-[hsl(145,63%,42%)] mx-auto" /> : row.premium === false ? <Minus size={14} className="text-foreground/20 mx-auto" /> : <span className="text-[12px] text-foreground/70 font-body">{row.premium}</span>}
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] font-semibold text-accent uppercase tracking-wider font-body block mb-1">Excellence</span>
                        {row.excellence === true ? <Check size={16} className="text-[hsl(145,63%,42%)] mx-auto" /> : <span className="text-[12px] text-foreground/70 font-body">{row.excellence}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-anim="fade-up" data-delay="0.2" >
              <div className="bg-accent/[0.07] rounded-2xl p-5 mt-6 border border-accent/15">
                <p className="text-[13.5px] text-foreground/70 font-body leading-relaxed">
                  <strong className="text-foreground">Important :</strong> Le secteur Commerce & Horeca requiert un suivi minimum trimestriel. Le forfait Essentiel n'est pas proposé pour ce secteur.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center group" asChild>
                <Link to="/tarifs/">
                  Voir tous les tarifs
                  <ArrowUpRight size={18} className="ml-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </div>

            <div data-anim="fade-up" data-delay="0.2"  className="mt-12 text-center">
              <p className="text-[13px] text-muted-foreground font-body uppercase tracking-wider">Voir aussi</p>
              <p className="text-[15px] text-foreground font-body mt-2">
                <Link to="/qui-nous-accompagnons/independants-et-startups/" className="text-accent font-semibold hover:underline underline-offset-4">
                  Indépendants & Startups
                </Link>
                <span className="text-muted-foreground mx-3">·</span>
                <Link to="/qui-nous-accompagnons/professions-de-sante/" className="text-accent font-semibold hover:underline underline-offset-4">
                  Professions de santé
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-8 md:py-14 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          <div className="pointer-events-none absolute -bottom-12 right-0 select-none hidden md:block">
            <span data-anim="text-scrub" className="font-display italic text-[160px] lg:text-[220px] leading-none text-primary-foreground/[0.05] tracking-tight">
              Marges
            </span>
          </div>

          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 relative z-10">
            <div data-anim="fade-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-accent" />
                <span className="text-accent/75 text-[11px] font-bold tracking-[0.25em] uppercase">Reprenez le contrôle</span>
              </div>
              <h2 className="font-display text-[34px] md:text-[56px] text-primary-foreground leading-[1.05] tracking-tight max-w-[820px]">
                Prêt à reprendre le contrôle <span className="italic text-accent">de vos marges ?</span>
              </h2>
              <p className="text-primary-foreground/70 text-[16px] md:text-[18px] leading-relaxed mt-6 font-body max-w-[600px]">
                Premier échange gratuit et confidentiel : nous analysons votre situation financière.
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
