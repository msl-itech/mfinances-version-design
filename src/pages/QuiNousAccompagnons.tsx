import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/qui-nous-accompagnons-hero.jpg";
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
  Rocket,
  UtensilsCrossed,
  Stethoscope,
  TrendingUp,
  Building2,
  HeartHandshake,
  Building,
  Users,
  Briefcase,
} from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const profilCards = [
  {
    icon: Rocket,
    title: "Indépendants & Startups",
    desc: "Lancement, optimisation fiscale, premier bilan : les bases pour démarrer sereinement.",
    href: "/qui-nous-accompagnons/independants-et-startups/",
  },
  {
    icon: UtensilsCrossed,
    title: "Commerce & Horeca",
    desc: "Gestion de caisse, TVA, contrôle des marges : un accompagnement adapté à votre réalité.",
    href: "/qui-nous-accompagnons/commerce-et-horeca/",
    badge: "Premium min.",
  },
  {
    icon: Stethoscope,
    title: "Professions de santé",
    desc: "TVA mixte, optimisation fiscale, planification patrimoniale et préparation de la retraite.",
    href: "/qui-nous-accompagnons/professions-de-sante/",
  },
  {
    icon: TrendingUp,
    title: "Entreprises en croissance",
    desc: "Situations mensuelles, contrôle de gestion, trésorerie prévisionnelle et DAF à temps partiel.",
    href: "/qui-nous-accompagnons/entreprises-en-croissance/",
    badge: "Excellence",
  },
  {
    icon: Building2,
    title: "Promoteurs immobiliers",
    desc: "Comptabilité analytique par projet, TVA immobilière, trésorerie décalée.",
    href: "/qui-nous-accompagnons/promoteurs-immobiliers/",
    badge: "Excellence min.",
  },
];

const structureCards = [
  {
    icon: HeartHandshake,
    title: "ASBL",
    desc: "Comptabilité, gestion administrative, recherche de financements et cash collecting.",
    href: "/qui-nous-accompagnons/asbl/",
  },
  {
    icon: Building,
    title: "Société d'exploitation",
    desc: "Optimisation ISOC, rémunération du dirigeant, pilotage fiscal proactif.",
    href: "/qui-nous-accompagnons/societe-exploitation/",
  },
  {
    icon: Users,
    title: "Société de management",
    desc: "Structuration des flux, management fees, optimisation entre structures.",
    href: "/qui-nous-accompagnons/societe-de-management/",
  },
  {
    icon: Briefcase,
    title: "Société de moyens",
    desc: "Comptabilité transparente basée sur l'usage réel et cash collecting externalisé.",
    href: "/qui-nous-accompagnons/societe-de-moyens/",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
  ],
};



function AudienceCard({
  icon: Icon,
  title,
  desc,
  href,
  badge,
  index,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
  badge?: string;
  index: number;
  delay: number;
}) {
  return (
    <div data-anim="fade-up" data-delay="delay"  className="h-full">
      <Link
        to={href}
        className="group relative block h-full bg-card rounded-2xl p-7 border border-border/50 hover:border-accent/40 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.18)] hover:-translate-y-1 overflow-hidden"
      >
        {/* gradient blob hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />

        {/* numéro éditorial */}
        <span className="absolute top-4 right-5 font-display italic text-accent/[0.7] group-hover:text-accent transition-colors text-[13px] tracking-wide">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative">
          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Icon size={22} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.5} />
            </div>
            {badge && (
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full mt-1 mr-6">
                {badge}
              </span>
            )}
          </div>
          <h3 className="text-[17px] font-bold font-body text-foreground mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{desc}</p>

          {/* hairline + CTA */}
          <div className="mt-5 pt-4 border-t border-border/50 group-hover:border-accent/30 transition-colors flex items-center justify-between">
            <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-accent">
              Découvrir
            </span>
            <span className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight size={14} strokeWidth={2} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function QuiNousAccompagnons() {
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
        title="Qui nous accompagnons — MFinances Bruxelles"
        description="MFinances accompagne indépendants, Horeca, professions de santé, entreprises en croissance et promoteurs immobiliers à Bruxelles."
        canonical="https://mfinances.be/qui-nous-accompagnons/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ÉDITORIAL ── */}
        <section className="relative bg-primary overflow-hidden py-8 md:py-14 bg-precision-grid-light">
          {/* watermark */}
          <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-6 select-none">
            <span
              className="font-display italic font-bold text-primary-foreground/[0.05] leading-none block"
              style={{ fontSize: "clamp(160px, 22vw, 360px)", letterSpacing: "-0.04em" }}
            >
              Profils
            </span>
          </div>
          {/* gradient halo */}
          <div aria-hidden className="pointer-events-none absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px]" />

          <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Qui nous accompagnons</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 font-medium">
                    01 — Audiences accompagnées
                  </span>
                </div>
                <h1 className="font-display font-bold text-primary-foreground leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(34px, 5.4vw, 64px)" }}>
                  Trouvez l'accompagnement{" "}
                  <span className="italic font-normal text-accent">fait pour vous</span>
                </h1>
                <p className="text-primary-foreground/75 text-[16px] md:text-[17px] leading-[1.75] mt-7 font-body max-w-[560px]">
                  Chaque profil a ses enjeux. Nous avons conçu des accompagnements spécifiques pour chaque type d'activité et de structure juridique.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                    <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                  </Button>
                  <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                    <Link to="/tarifs/">Voir les tarifs</Link>
                  </Button>
                </div>

                {/* pills meta */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {["5 profils d'activité", "4 structures juridiques", "Bruxelles"].map((p) => (
                    <span
                      key={p}
                      className="text-[11px] uppercase tracking-[0.18em] text-primary-foreground/70 border border-primary-foreground/20 rounded-full px-3 py-1.5 font-medium backdrop-blur-sm"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* visual card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.5)] border border-primary-foreground/10">
                <img src={imgHero} alt="Les profils accompagnés par MFinances à Bruxelles" className="w-full h-[420px] md:h-[520px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-primary-foreground/85 font-semibold">
                    N°01 / Tous secteurs
                  </span>
                  <div className="h-px flex-1 ml-4 bg-primary-foreground/30" />
                </div>
              </div>
              {/* corner plaque */}
              <div className="hidden md:flex absolute -top-4 -left-4 items-center gap-2 bg-card rounded-full px-4 py-2 shadow-xl border border-border">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground">Sur mesure</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PAR PROFIL D'ACTIVITÉ ── */}
        <section className="relative bg-secondary py-10 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -left-10 top-32 select-none">
            <span
              data-anim="text-scrub" className="font-display italic font-bold text-foreground/[0.035] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Activité
            </span>
          </div>

          <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12">
            <div data-anim="fade-up" className="text-center mb-14 max-w-[700px] mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  02 — Par profil d'activité
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}>
                Chaque métier,{" "}
                <span className="italic font-normal text-accent">son accompagnement</span>
              </h2>
              <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.75] mt-5 font-body">
                Un cabinet, mais des expertises sectorielles distinctes. Identifiez le profil qui ressemble au vôtre.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profilCards.map((c, i) => (
                <AudienceCard key={c.title} {...c} index={i} delay={0.05 + i * 0.05} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PAR STRUCTURE JURIDIQUE ── */}
        <section className="relative bg-card py-10 md:py-32 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -right-10 bottom-20 select-none">
            <span
              className="font-display italic font-bold text-foreground/[0.04] leading-none block"
              style={{ fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Structure
            </span>
          </div>

          <div className="relative mx-auto max-w-[1200px] px-6 lg:px-12">
            <div data-anim="fade-up" className="text-center mb-14 max-w-[700px] mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                  03 — Par structure juridique
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display font-bold text-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}>
                Une approche adaptée à{" "}
                <span className="italic font-normal text-accent">votre forme juridique</span>
              </h2>
              <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.75] mt-5 font-body">
                ASBL, société d'exploitation, management ou de moyens : chaque structure a sa logique fiscale et comptable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {structureCards.map((c, i) => (
                <AudienceCard key={c.title} {...c} index={i} delay={0.05 + i * 0.05} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL éditorial ── */}
        <section className="relative bg-primary py-12 md:py-36 overflow-hidden">
          <img src={imgMeeting} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/70" />
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span
              className="font-display italic font-bold text-primary-foreground/[0.05] leading-none"
              style={{ fontSize: "clamp(140px, 22vw, 360px)", letterSpacing: "-0.04em" }}
            >
              Discutons
            </span>
          </div>

          <div className="relative mx-auto max-w-[820px] px-6 lg:px-12 text-center">
            <div data-anim="fade-up">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 font-medium">
                  04 — Premier échange
                </span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display font-bold text-primary-foreground leading-[1.08] tracking-[-0.015em]" style={{ fontSize: "clamp(30px, 4.2vw, 52px)" }}>
                Vous ne savez pas{" "}
                <span className="italic font-normal text-accent">quel accompagnement</span>{" "}
                choisir ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] md:text-[17px] leading-[1.75] mt-6 font-body max-w-[620px] mx-auto">
                Premier échange gratuit et confidentiel : nous identifions ensemble le forfait et les services adaptés à votre situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
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
