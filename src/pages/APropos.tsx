import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import equipePhoto from "@/assets/mfinances-team-hero.png";
import mikaPortrait from "@/assets/mika-apropos-hero.png";
import imgStory from "@/assets/about-story.jpg";
import imgMeeting from "@/assets/meeting-warm.jpg";
import imgDashboard from "@/assets/dashboard-laptop.jpg";
import {
  ArrowRight,
  MapPin,
  Award,
  Quote,
  Target,
  TrendingUp,
  Shield,
  Users,
  Clock,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { createBreadcrumbSchema, personMikaSchema } from "@/lib/seo-schemas";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";



const values = [
  {
    icon: Target,
    title: "Clarté",
    desc: "Des chiffres lisibles, des indicateurs utiles, des recommandations concrètes.",
  },
  {
    icon: Shield,
    title: "Rigueur",
    desc: "Une comptabilité irréprochable et un pilotage financier structuré.",
  },
  {
    icon: TrendingUp,
    title: "Anticipation",
    desc: "Voir les risques avant qu'ils ne deviennent des problèmes.",
  },
  {
    icon: Users,
    title: "Proximité",
    desc: "Un interlocuteur unique, disponible et impliqué dans votre réussite.",
  },
];

const stats = [
  { value: "20+", label: "années d'expérience" },
  { value: "200+", label: "dirigeants de TPE accompagnés" },
  { value: "5.0/5", label: "note Google (cabinet à Bruxelles)" },
  { value: "72h", label: "délai de réponse garanti" },
];

export default function APropos() {
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
        title="Cabinet Comptable Bruxelles Spécialisé Pilotage TPE & DAF | MFinances"
        description="MFinances, fondé par Mika MUSUNGAYI, expert-comptable ITAA avec 20 ans d'expérience. Pilotage financier, contrôle de gestion et DAF externalisé pour les TPE à Uccle, Bruxelles."
        canonical="https://mfinances.be/a-propos/"
        schemaJson={[
          createBreadcrumbSchema([
            { name: "Accueil", url: "https://mfinances.be/" },
            { name: "À propos", url: "https://mfinances.be/a-propos/" },
          ]),
          personMikaSchema,
        ]}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-12 md:py-24 relative overflow-hidden bg-precision-grid-light">
          <span
            aria-hidden="true"
            data-anim="text-scrub"
            className="pointer-events-none select-none absolute -top-6 -left-4 md:-top-10 md:-left-8 font-display italic text-primary-foreground/[0.06] text-[110px] md:text-[220px] leading-none tracking-tight"
          >
            Histoire
          </span>
          <div className="pointer-events-none absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-accent/10 blur-3xl" />

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center relative z-10">
            <div className="lg:col-span-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Pourquoi MFinances</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-7 md:mt-9">
                <div className="inline-flex items-center gap-2 mb-5">
                  <span className="h-px w-10 bg-accent" />
                  <span className="font-body text-[11px] font-bold tracking-[0.25em] uppercase text-accent">
                    Notre histoire
                  </span>
                </div>
                <h1 className="font-display text-[28px] sm:text-[34px] md:text-[52px] leading-[1.08] text-primary-foreground tracking-tight">
                  Pourquoi j'ai créé <span className="italic font-light text-accent">MFinances</span>
                </h1>
                <p className="text-primary-foreground/70 text-[16px] leading-[1.75] mt-6 font-body max-w-[480px]">
                  Parce que trop de dirigeants de TPE pilotent leur croissance sans visibilité, et que ça ne devrait pas être une fatalité.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                    <Link to="/contact/">Prendre rendez-vous <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                  </Button>
                  <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                    <a href="#mika">Découvrir Mika</a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 relative">
              <div className="absolute -inset-2 bg-accent/15 blur-2xl rounded-3xl" aria-hidden="true" />
              <div className="relative rounded-2xl shadow-2xl overflow-hidden ring-1 ring-primary-foreground/10">
                <img src={equipePhoto} alt="Équipe MFinances — Cabinet comptable à Uccle, Bruxelles" className="w-full h-auto object-contain rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR (AEO / GEO Optimization) */}

        {/* ── CHIFFRES CLÉS ── */}
        <section className="bg-card py-10 md:py-14 border-b border-border/50 relative overflow-hidden">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((s, i) => (
                <div data-anim="fade-up" data-delay="i * 0.06" key={s.label}  className="text-center group">
                  <div className="font-display italic text-accent/40 text-[10px] tracking-[0.3em] uppercase mb-2 not-italic">0{i + 1}</div>
                  <div className="font-display text-[32px] md:text-[44px] text-primary leading-none tracking-tight transition-colors duration-300 group-hover:text-accent">
                    {s.value}
                  </div>
                  <p className="text-muted-foreground text-[12.5px] font-body mt-2 leading-snug">{s.label}</p>
                  {i < stats.length - 1 && (
                    <div className="hidden md:block absolute" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── L'HISTOIRE FONDATRICE ── */}
        <section className="bg-card py-14 md:py-24 relative overflow-hidden">
          <span
            aria-hidden="true"
            data-anim="text-scrub"
            data-scrub-dir="right"
            className="pointer-events-none select-none absolute -top-4 right-0 font-display italic text-primary/[0.035] text-[110px] md:text-[200px] leading-none tracking-tight"
          >
            Genèse
          </span>

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative z-10">
            <div data-anim="fade-up">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-8 bg-accent" />
                <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">01 · L'élément déclencheur</span>
              </div>
              <h2 className="font-display text-[26px] md:text-[40px] leading-[1.12] text-foreground tracking-tight">
                Il avait triplé son chiffre d'affaires en un an.
                <br />
                <span className="italic font-light text-accent">Et pourtant.</span>
              </h2>

              <div className="mt-7 space-y-4 font-body text-[15px] text-foreground/75 leading-[1.8]">
                <p>
                  Je me souviens d'un jeune entrepreneur. Ambitieux, intuitif, talentueux. Il vendait des terminaux
                  de paiement sur un marché de niche, et il avait du flair.
                </p>
                <p>
                  Ensemble, nous avions analysé son modèle économique. Le diagnostic était clair&nbsp;: intégrer une
                  offre de location-financement pouvait transformer son business. Il l'a fait. Son chiffre d'affaires
                  a triplé en moins d'un an.
                </p>
                <p className="font-display italic text-foreground text-[18px] md:text-[20px] border-l-2 border-accent pl-5 py-1">
                  Sur le papier, c'était un succès.
                </p>
                <p>
                  Mais sous la surface, quelque chose couvait. Ses décisions étaient prises à l'intuition. La rentabilité
                  masquait des fragilités accumulées. Une trésorerie qui s'affaiblissait en silence.
                </p>
              </div>
            </div>

            <div data-anim="fade-up" data-delay="0.15" >
              <div className="relative">
                <div className="absolute -inset-3 bg-accent/10 blur-2xl rounded-3xl" aria-hidden="true" />
                <img
                  src={imgStory}
                  alt="Un dirigeant face à ses chiffres"
                  className="relative rounded-3xl w-full h-[360px] md:h-[520px] object-cover object-top shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.4)] ring-1 ring-border/40"
                />
                <span className="absolute -bottom-4 -left-4 bg-card border border-border/60 rounded-2xl px-5 py-3 shadow-lg font-display italic text-[14px] text-foreground/70">
                  « Croissance ≠ rentabilité »
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── LE TOURNANT ── */}
        <section className="bg-primary py-14 md:py-20 relative overflow-hidden">
          <span
            aria-hidden="true"
            data-anim="text-scrub"
            className="pointer-events-none select-none absolute -bottom-6 -left-4 font-display italic text-primary-foreground/[0.06] text-[110px] md:text-[200px] leading-none tracking-tight"
          >
            Tournant
          </span>
          <div className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent/15 blur-3xl" />

          <div className="mx-auto max-w-[860px] px-6 lg:px-12 relative z-10">
            <div data-anim="fade-up">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="h-px w-8 bg-accent" />
                  <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">02 · Le déclic</span>
                  <span className="h-px w-8 bg-accent" />
                </div>
                <Quote size={36} className="text-accent mx-auto mb-5" strokeWidth={1.5} />
                <p className="font-display text-[22px] md:text-[34px] text-primary-foreground leading-[1.25] italic font-light tracking-tight">
                  Puis le Covid est arrivé. La croissance ne pouvait plus absorber les erreurs du passé.
                </p>
                <div className="w-12 h-[2px] bg-accent mx-auto mt-8 mb-7" />
                <p className="text-primary-foreground/75 text-[15px] md:text-[16px] font-body leading-[1.85] max-w-[640px] mx-auto">
                  C'est le contrôle de gestion, mis en place dans l'urgence, qui lui a permis de prendre les
                  bonnes décisions. De sauver l'essentiel. Pas sans dommages. Mais debout.
                </p>
                <p className="font-display italic text-accent text-[17px] md:text-[19px] mt-7">
                  Ce jour-là, j'ai compris quelque chose que je ne pouvais plus ignorer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── LA CONVICTION ── */}
        <section className="bg-secondary py-14 md:py-24 relative overflow-hidden">
          <span
            aria-hidden="true"
            data-anim="text-scrub"
            data-scrub-dir="right"
            className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display italic text-primary/[0.04] text-[110px] md:text-[200px] leading-none tracking-tight"
          >
            Conviction
          </span>

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
            <div data-anim="fade-up" data-delay="0.1" >
              <div className="relative">
                <div className="absolute -inset-3 bg-accent/10 blur-2xl rounded-3xl" aria-hidden="true" />
                <img
                  src={imgDashboard}
                  alt="Dashboard de pilotage financier"
                  className="relative rounded-3xl w-full h-[280px] md:h-[400px] object-cover shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.4)] ring-1 ring-border/40"
                />
              </div>
            </div>

            <div data-anim="fade-up">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-8 bg-accent" />
                <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">03 · Notre conviction</span>
              </div>
              <h2 className="font-display text-[26px] md:text-[40px] leading-[1.12] text-foreground tracking-tight">
                Les TPE en croissance n'ont pas moins besoin de pilotage.
                <br />
                <span className="italic font-light text-accent">Elles en ont plus besoin.</span>
              </h2>

              <div className="mt-7 space-y-4 font-body text-[15px] text-foreground/75 leading-[1.8]">
                <p>
                  Je m'adresse aux entreprises en forte croissance. Celles qui passent un cap. Celles qui
                  accélèrent, parfois plus vite que leur organisation.
                </p>
                <p>
                  Des dirigeants ambitieux, mais sans véritable pilotage financier. Non pas par manque de besoin,
                  mais parce qu'ils pensent encore être «&nbsp;trop petits&nbsp;» pour structurer un contrôle de gestion.
                </p>
                <p>
                  Ma conviction est simple&nbsp;: c'est précisément à ce moment-là que le pilotage devient
                  indispensable. Parce que chaque décision compte. Parce que chaque erreur coûte plus cher.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── NOS VALEURS ── */}
        <section className="bg-card py-14 md:py-24 relative overflow-hidden">
          <span
            aria-hidden="true"
            data-anim="text-scrub"
            className="pointer-events-none select-none absolute -top-4 -left-4 font-display italic text-primary/[0.035] text-[110px] md:text-[200px] leading-none tracking-tight"
          >
            Valeurs
          </span>

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 relative z-10">
            <div data-anim="fade-up" className="text-center mb-10 md:mb-14 max-w-[680px] mx-auto">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-accent" />
                <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">04 · Notre approche</span>
                <span className="h-px w-8 bg-accent" />
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-foreground leading-[1.12] tracking-tight">
                Ce qui guide <span className="italic font-light text-accent">notre approche</span>
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed">
                Quatre principes qui structurent chaque mission, chaque conseil, chaque décision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {values.map((v, i) => {
                const isDark = i === 1 || i === 3;
                return (
                  <div data-anim="fade-up" data-delay="0.06 + i * 0.05" key={v.title} >
                    <div
                      className={`group relative rounded-3xl p-7 h-full transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
                        isDark
                          ? "bg-primary text-primary-foreground border border-primary shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.5)]"
                          : "bg-card border border-border/60 hover:border-accent/30 hover:shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.25)]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -top-3 right-4 font-display italic text-[72px] leading-none ${
                          isDark ? "text-primary-foreground/[0.08]" : "text-accent/[0.10]"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <div
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
                          isDark ? "bg-accent/15 ring-1 ring-accent/30" : "bg-accent/10"
                        }`}
                      >
                        <v.icon size={22} className="text-accent" strokeWidth={1.5} />
                      </div>
                      <h3
                        className={`relative font-display text-[20px] font-bold mb-3 tracking-tight ${
                          isDark ? "text-primary-foreground" : "text-foreground"
                        }`}
                      >
                        {v.title}
                      </h3>
                      <p
                        className={`relative text-[14px] leading-[1.75] font-body ${
                          isDark ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {v.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CITATION ── */}
        <section className="bg-primary py-14 md:py-20 relative overflow-hidden">
          <span
            aria-hidden="true"
            data-anim="text-scrub"
            data-scrub-dir="right"
            className="pointer-events-none select-none absolute -top-4 right-0 font-display italic text-primary-foreground/[0.05] text-[110px] md:text-[180px] leading-none tracking-tight"
          >
            Manifeste
          </span>
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />

          <div className="mx-auto max-w-[860px] px-6 lg:px-12 text-center relative z-10">
            <div data-anim="fade-up">
              <Quote size={48} className="text-accent mx-auto mb-5" strokeWidth={1.5} />
              <p className="font-display text-[24px] md:text-[34px] leading-[1.25] text-primary-foreground italic font-light tracking-tight">
                Arrêtez de vous voir trop petit. Commencez à piloter comme une entreprise <span className="text-accent not-italic font-normal">en croissance</span>.
              </p>
              <div className="w-12 h-[2px] bg-accent mx-auto mt-7 mb-4" />
              <p className="text-primary-foreground/60 text-[13px] font-body tracking-[0.15em] uppercase">
                Mika MUSUNGAYI · Fondateur
              </p>
            </div>
          </div>
        </section>

        {/* ── MIKA EN BREF ── */}
        <section id="mika" className="bg-secondary py-14 md:py-24 relative overflow-hidden">
          <span
            aria-hidden="true"
            data-anim="text-scrub"
            className="pointer-events-none select-none absolute -bottom-6 right-0 font-display italic text-primary/[0.04] text-[110px] md:text-[200px] leading-none tracking-tight"
          >
            Mika
          </span>

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center relative z-10">
            <div data-anim="fade-up" className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-3 bg-accent/15 blur-2xl rounded-3xl" aria-hidden="true" />
                <img
                  src={mikaPortrait}
                  alt="Mika MUSUNGAYI — Fondateur de MFinances"
                  className="relative rounded-3xl w-full h-[340px] md:h-[440px] object-cover object-top shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.4)] ring-1 ring-border/40"
                />
                <span className="absolute -bottom-4 left-4 bg-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-lg flex items-center gap-2">
                  <Sparkles size={14} className="text-accent" strokeWidth={1.5} />
                  <span className="font-body text-[11px] font-bold tracking-[0.2em] uppercase">ITAA · 20 ans</span>
                </span>
              </div>
            </div>

            <div data-anim="fade-up" data-delay="0.1"  className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-8 bg-accent" />
                <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">05 · Le fondateur</span>
              </div>
              <h2 className="font-display text-[28px] md:text-[42px] leading-[1.1] tracking-tight">
                <span className="italic font-light text-accent">Mika</span> <span className="text-primary">MUSUNGAYI</span>
              </h2>
              <p className="text-muted-foreground font-body text-[14px] mt-2 tracking-[0.05em]">
                Expert-comptable · Fondateur de MFinances
              </p>

              <div className="mt-7 space-y-5 font-body text-[15px] text-foreground/75 leading-[1.8]">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 mt-0.5 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
                    <Award size={18} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="text-foreground/80">
                    Diplômé de la Chambre Belge des Comptables, Experts-Comptables et Conseils Fiscaux.
                    Membre <strong className="text-foreground">ITAA (n° 50.624.805)</strong>. Plus de <strong>20 ans d'expérience</strong> aux côtés de dirigeants
                    de TPE et PME à <strong>Bruxelles</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 mt-0.5 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
                    <Clock size={18} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="text-foreground/80">
                    Depuis <strong className="text-foreground">2003</strong>, j'accompagne des entrepreneurs en Belgique dans les moments qui comptent : création,
                    croissance, restructuration, <strong>optimisation fiscale</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 mt-0.5 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
                    <BarChart3 size={18} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="text-foreground/80">
                    MFinances, c'est l'aboutissement de cette expérience. La conviction qu'un dirigeant de TPE
                    mérite <strong className="text-foreground">les mêmes outils de pilotage qu'un grand groupe</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-7 text-muted-foreground text-[13px] font-body border-t border-border/40 pt-5">
                <MapPin size={14} strokeWidth={1.5} className="text-accent" />
                20 Rue de la Magnanerie, 1180 Uccle — Bruxelles
              </div>
            </div>
          </div>
        </section>

        {/* ── CE QUE NOUS FAISONS DIFFÉREMMENT ── */}
        <section className="bg-card py-14 md:py-24 relative overflow-hidden">
          <span
            aria-hidden="true"
            data-anim="text-scrub"
            data-scrub-dir="right"
            className="pointer-events-none select-none absolute -top-4 -left-4 font-display italic text-primary/[0.035] text-[110px] md:text-[200px] leading-none tracking-tight"
          >
            Différence
          </span>

          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
            <div data-anim="fade-up">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-8 bg-accent" />
                <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">06 · Notre différence</span>
              </div>
              <h2 className="font-display text-[26px] md:text-[40px] leading-[1.12] text-foreground tracking-tight">
                Un niveau de structure que vous pensiez
                <span className="italic font-light text-accent"> réservé aux grandes entreprises</span>
              </h2>

              <div className="mt-7 space-y-4 font-body text-[15px] text-foreground/75 leading-[1.8]">
                <p>
                  Mon rôle est d'apporter clarté et structure, sans alourdir votre organisation. En intégrant
                  un véritable pilotage financier dans votre quotidien&nbsp;: contrôle de gestion, trésorerie
                  prévisionnelle, indicateurs utiles.
                </p>
                <p>
                  Pas pour remplir des tableaux. Pour vous permettre de prendre de meilleures décisions,
                  sécuriser votre croissance et piloter votre entreprise avec sérénité.
                </p>
                <p className="font-display italic text-foreground text-[18px] md:text-[20px] border-l-2 border-accent pl-5 py-1">
                  Un partenaire de pilotage financier pour les dirigeants qui ont décidé de grandir.
                </p>
              </div>
            </div>

            <div data-anim="fade-up" data-delay="0.1" >
              <div className="relative">
                <div className="absolute -inset-3 bg-accent/10 blur-2xl rounded-3xl" aria-hidden="true" />
                <img
                  src={imgMeeting}
                  alt="Réunion de conseil avec un dirigeant"
                  className="relative rounded-3xl w-full h-[280px] md:h-[400px] object-cover shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.4)] ring-1 ring-border/40"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-14 md:py-24 relative overflow-hidden">
          <span
            aria-hidden="true"
            data-anim="text-scrub"
            className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display italic text-primary-foreground/[0.06] text-[110px] md:text-[200px] leading-none tracking-tight"
          >
            Ensemble
          </span>
          <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />

          <div className="mx-auto max-w-[860px] px-6 lg:px-12 text-center relative z-10">
            <div data-anim="fade-up">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-8 bg-accent" />
                <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent">Échangeons</span>
                <span className="h-px w-8 bg-accent" />
              </div>
              <h2 className="font-display text-[28px] md:text-[44px] text-primary-foreground leading-[1.12] tracking-tight">
                Vous reconnaissez-vous dans <span className="italic font-light text-accent">cette histoire</span> ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] mt-5 font-body max-w-[600px] mx-auto leading-[1.75]">
                Si vous pilotez votre entreprise à l'intuition et que vous sentez que les décisions deviennent
                plus complexes, c'est le bon moment pour en parler.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/contact/">
                    Prendre rendez-vous
                    <ArrowRight size={16} className="ml-1 flex-shrink-0" />
                  </Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/services/">Découvrir nos services <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
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
