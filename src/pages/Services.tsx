import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/services-hub-hero.jpg";
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
  ArrowUpRight,
  Users,
  BarChart3,
  TrendingUp,
  Calculator,
  FileText,
  Rocket,
} from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const pilotageServices = [
  {
    icon: Users,
    title: "DAF à temps partiel",
    desc: "Un copilote pour chaque décision qui engage votre avenir. Réservé aux clients Excellence — 150 € HTVA/heure.",
    href: "/services/daf-externalise/",
    badge: "Excellence",
  },
  {
    icon: BarChart3,
    title: "Contrôle de gestion",
    desc: "Vous savez chaque mois si vous gagnez ou perdez — et pourquoi. Inclus dans les forfaits Premium et Excellence.",
    href: "/services/controle-de-gestion/",
    badge: "Premium+",
  },
  {
    icon: TrendingUp,
    title: "Trésorerie prévisionnelle",
    desc: "Vous voyez les tensions 3 mois avant qu'elles arrivent. Inclus dans le forfait Excellence.",
    href: "/services/tresorerie/",
    badge: "Excellence",
  },
];

const fondamentauxServices = [
  {
    icon: Calculator,
    title: "Comptabilité sur Odoo",
    desc: "Tenue comptable complète, déclarations TVA, comptes annuels — le socle de chaque forfait.",
    href: "/services/comptabilite/",
  },
  {
    icon: FileText,
    title: "Fiscalité des entreprises",
    desc: "ISOC, IPP, précomptes, optimisation fiscale — nous gérons l'ensemble de vos obligations.",
    href: "/services/fiscalite/",
  },
  {
    icon: Rocket,
    title: "Création d'entreprise",
    desc: "Plan financier, statuts, formalités — tout compris pour 800 € HTVA.",
    href: "/services/creation-entreprise/",
    badge: "800 € HTVA",
  },
];

const servicesFaqs = [
  {
    q: "Comment savoir quel service est fait pour moi ?",
    a: "Faites le diagnostic gratuit (3 min) — résultat immédiat.",
  },
  {
    q: "Puis-je ajouter des services en cours de contrat ?",
    a: "Oui, à tout moment sur simple demande.",
  },
  {
    q: "Travaillez-vous uniquement avec Odoo ?",
    a: "Odoo est notre outil principal, mais nous nous adaptons.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://mfinances.be/services/" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: servicesFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};



function ServiceCard({
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
        className="group relative flex flex-col h-full bg-card rounded-3xl p-7 md:p-8 border border-border/60 hover:border-accent/40 hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.18)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
      >
        {/* corner index watermark */}
        <span className="absolute top-5 right-6 font-display text-[12px] text-foreground/30 tracking-[0.25em] font-bold">
          0{index + 1}
        </span>

        {/* hover gradient blob */}
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)" }}
        />

        <div className="flex items-start justify-between mb-8 relative">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
            <Icon size={24} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.5} />
          </div>
          {badge && (
            <span className="text-[10px] font-bold tracking-[0.14em] uppercase bg-primary/8 text-primary px-3 py-1.5 rounded-full mt-1">
              {badge}
            </span>
          )}
        </div>

        <h3 className="font-display text-[22px] md:text-[24px] text-primary leading-[1.15] mb-3 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[14px] text-muted-foreground leading-[1.7] font-body flex-1">{desc}</p>

        <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-foreground/50 font-semibold">
            En savoir plus
          </span>
          <span className="w-10 h-10 rounded-full bg-secondary group-hover:bg-accent flex items-center justify-center transition-all duration-500 group-hover:rotate-45">
            <ArrowUpRight size={16} className="text-primary group-hover:text-accent-foreground transition-colors" />
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function Services() {
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
    <div className="min-h-screen">
      <SEOHead
        title="Services Comptables & Pilotage Financier TPE Bruxelles | MFinances"
        description="Comptabilité, contrôle de gestion, DAF externalisé, trésorerie prévisionnelle — les services MFinances pour les dirigeants de TPE à Bruxelles. Forfaits à partir de 350 € HTVA/mois."
        canonical="https://mfinances.be/services/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ÉDITORIAL ── */}
        <section className="relative bg-primary overflow-hidden bg-precision-grid-light">
          {/* decorative orbs */}
          <div
            className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.10] pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 65%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />

          {/* Giant editorial watermark */}
          <div aria-hidden="true" className="pointer-events-none absolute top-12 left-0 right-0 text-center select-none">
            <span
              className="font-display italic font-bold leading-none text-primary-foreground/[0.04]"
              style={{ fontSize: "clamp(120px, 22vw, 320px)", letterSpacing: "-0.04em" }}
            >
              Services
            </span>
          </div>

          <div className="container-mf relative py-12 md:py-24">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[12px] uppercase tracking-[0.18em]">Accueil</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/30" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground text-[12px] uppercase tracking-[0.18em]">Services</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
              {/* Left — Copy */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 01</span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/55 font-medium">
                    Catalogue MFinances
                  </span>
                </div>

                <h1
                  className="font-display font-bold text-primary-foreground leading-[1.05] tracking-[-0.015em]"
                  style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}
                >
                  Nos services —{" "}
                  <span className="italic font-normal text-accent relative inline-block">
                    bien plus
                    <svg
                      className="absolute -bottom-1.5 left-0 w-full h-[10px]"
                      viewBox="0 0 300 14"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 10 Q 75 2, 150 8 T 298 6"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                    </svg>
                  </span>{" "}
                  que la comptabilité
                </h1>

                <div className="mt-10 max-w-[560px]">
                  <div className="h-px w-12 bg-accent mb-5" />
                  <p className="text-[15px] md:text-[16px] text-primary-foreground/70 leading-[1.75] font-body">
                    Chez MFinances, nous avons conçu nos services autour d'une conviction simple : un dirigeant de TPE mérite les mêmes outils de pilotage financier qu'une grande entreprise.
                  </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="accent"
                    size="lg"
                    className="rounded-full pl-7 pr-3 group btn-liquid h-14 text-[15px] whitespace-nowrap"
                    asChild
                  >
                    <Link to="/contact/" data-magnetic>
                      <span className="flex items-center gap-3">
                        Consultation gratuite
                        <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shrink-0">
                          <ArrowUpRight size={14} />
                        </span>
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline-white"
                    size="lg"
                    className="rounded-full px-7 h-14 text-[15px] whitespace-nowrap"
                    asChild
                  >
                    <Link to="/tarifs/">Voir les tarifs</Link>
                  </Button>
                </div>
              </div>

              {/* Right — Image card */}
              <div className="lg:col-span-5 lg:pb-4">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-accent/20 rounded-[32px] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                  <div className="relative rounded-[28px] overflow-hidden ring-1 ring-primary-foreground/10">
                    <img
                      src={imgHero}
                      alt="Services de pilotage financier MFinances à Bruxelles"
                      className="w-full h-[380px] md:h-[460px] object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                    <div className="absolute top-5 right-5 text-primary-foreground/90 text-[10px] uppercase tracking-[0.2em] font-medium">
                      N°01 / Pilotage
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                      <div>
                        <p className="font-display text-primary-foreground text-[18px] leading-none">
                          Catalogue <span className="italic text-accent">complet</span>
                        </p>
                        <p className="text-[11px] text-primary-foreground/75 mt-1.5 uppercase tracking-[0.15em]">
                          6 services · 2 univers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PILOTAGE FINANCIER ── */}
        <section className="relative bg-secondary py-16 md:py-28 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -top-10 right-0 select-none">
            <span
              className="font-display italic font-bold leading-none text-primary/[0.035]"
              style={{ fontSize: "clamp(140px, 20vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Pilotage
            </span>
          </div>

          <div className="container-mf relative">
            <div data-anim="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-[13px] text-accent font-bold tracking-wider">— 01</span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/50 font-medium">
                    Direction financière
                  </span>
                </div>
                <h2
                  className="font-display text-primary leading-[1.08] tracking-[-0.015em]"
                  style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
                >
                  Services de{" "}
                  <span className="italic text-accent">pilotage financier</span>
                </h2>
              </div>
              <div className="lg:col-span-5">
                <div className="h-px w-12 bg-accent mb-4" />
                <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7] font-body">
                  Des outils de direction financière accessibles aux TPE et PME bruxelloises.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {pilotageServices.map((s, i) => (
                <ServiceCard key={s.title} {...s} index={i} delay={0.08 + i * 0.06} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES FONDAMENTAUX ── */}
        <section className="relative bg-card py-16 md:py-28 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -top-10 left-0 select-none">
            <span
              className="font-display italic font-bold leading-none text-primary/[0.035]"
              style={{ fontSize: "clamp(140px, 20vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Socle
            </span>
          </div>

          <div className="container-mf relative">
            <div data-anim="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-[13px] text-accent font-bold tracking-wider">— 02</span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/50 font-medium">
                    Le socle
                  </span>
                </div>
                <h2
                  className="font-display text-primary leading-[1.08] tracking-[-0.015em]"
                  style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
                >
                  Services{" "}
                  <span className="italic text-accent">fondamentaux</span>
                </h2>
              </div>
              <div className="lg:col-span-5">
                <div className="h-px w-12 bg-accent mb-4" />
                <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7] font-body">
                  Le socle de chaque forfait — comptabilité, fiscalité et accompagnement à la création.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {fondamentauxServices.map((s, i) => (
                <ServiceCard key={s.title} {...s} index={i} delay={0.08 + i * 0.06} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="relative bg-secondary py-16 md:py-24 overflow-hidden">
          <div className="container-mf relative">
            <div data-anim="fade-up" className="max-w-[760px] mx-auto text-center mb-10 md:mb-14">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/50 font-medium">
                  Questions fréquentes
                </span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h2
                className="font-display text-primary leading-[1.08] tracking-[-0.015em]"
                style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
              >
                Vos questions sur <span className="italic text-accent">nos services</span>
              </h2>
            </div>

            <div className="max-w-[820px] mx-auto space-y-4">
              {servicesFaqs.map((faq, i) => (
                <div data-anim="fade-up" data-delay="0.05 + i * 0.05" key={faq.q} >
                  <article className="bg-card rounded-2xl p-6 md:p-8 border border-border/60">
                    <h3 className="font-display text-primary text-[18px] md:text-[20px] leading-snug mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-muted-foreground text-[15px] leading-[1.7] font-body">
                      {faq.a}
                    </p>
                  </article>
                </div>
              ))}
            </div>

            <div data-anim="fade-up" className="text-center mt-10">
              <Button variant="outline" size="lg" className="rounded-full px-7 h-12 text-[14px]" asChild>
                <Link to="/diagnostic/">Faire le diagnostic gratuit (3 min)</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}

        <section className="relative bg-primary py-20 md:py-32 overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/85 to-primary" />

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <span
              className="font-display italic font-bold leading-none text-primary-foreground/[0.05]"
              style={{ fontSize: "clamp(140px, 20vw, 280px)", letterSpacing: "-0.04em" }}
            >
              Parlons-en
            </span>
          </div>

          <div className="container-mf relative z-10 text-center">
            <div data-anim="fade-up">
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-px w-10 bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 font-medium">
                  Et maintenant ?
                </span>
                <span className="h-px w-10 bg-accent" />
              </div>

              <h2
                className="font-display text-primary-foreground leading-[1.1] tracking-[-0.015em] max-w-[800px] mx-auto"
                style={{ fontSize: "clamp(28px, 3.8vw, 52px)" }}
              >
                Quel service correspond à{" "}
                <span className="italic text-accent">vos besoins</span> ?
              </h2>
              <p className="text-primary-foreground/70 text-[15px] md:text-[16px] leading-[1.75] mt-6 font-body max-w-[580px] mx-auto">
                Premier échange gratuit et confidentiel — nous identifions ensemble les services adaptés à votre situation.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10">
                <Button
                  variant="accent"
                  size="lg"
                  className="rounded-full pl-7 pr-3 group btn-liquid h-14 text-[15px] whitespace-nowrap"
                  asChild
                >
                  <Link to="/contact/" data-magnetic>
                    <span className="flex items-center gap-3">
                      Consultation gratuite
                      <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shrink-0">
                        <ArrowUpRight size={14} />
                      </span>
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline-white"
                  size="lg"
                  className="rounded-full px-7 h-14 text-[15px] whitespace-nowrap"
                  asChild
                >
                  <Link to="/tarifs/">Voir les tarifs</Link>
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
