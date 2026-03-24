import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/qui-nous-accompagnons-hero.jpg";
import imgMeeting from "@/assets/daf-meeting.jpg";

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
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const profilCards = [
  {
    icon: Rocket,
    title: "Indépendants & Startups",
    desc: "Lancement, optimisation fiscale, premier bilan — les bases pour démarrer sereinement.",
    href: "/qui-nous-accompagnons/independants-et-startups/",
  },
  {
    icon: UtensilsCrossed,
    title: "Commerce & Horeca",
    desc: "Gestion de caisse, TVA, contrôle des marges — un accompagnement adapté à votre réalité.",
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

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function AudienceCard({
  icon: Icon,
  title,
  desc,
  href,
  badge,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
  badge?: string;
  delay: number;
}) {
  return (
    <ScrollRevealDiv delay={delay}>
      <Link
        to={href}
        className="group block bg-card rounded-2xl p-7 border border-border/50 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)] transition-all duration-300 h-full"
      >
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Icon size={22} className="text-accent" strokeWidth={1.5} />
          </div>
          {badge && (
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-[17px] font-bold font-body text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{desc}</p>
        <span className="inline-flex items-center gap-1 text-accent text-[13px] font-semibold mt-4 group-hover:gap-2 transition-all">
          Découvrir <ArrowRight size={14} />
        </span>
      </Link>
    </ScrollRevealDiv>
  );
}

export default function QuiNousAccompagnons() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Qui nous accompagnons — MFinances Bruxelles"
        description="MFinances accompagne indépendants, Horeca, professions de santé, entreprises en croissance et promoteurs immobiliers à Bruxelles."
        canonical="https://mfinances.be/qui-nous-accompagnons/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
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

              <div className="mt-8 text-center lg:text-left">
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Trouvez l'accompagnement <span className="text-accent">fait pour vous</span>
                </h1>
                <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[540px] mx-auto lg:mx-0">
                  Chaque profil a ses enjeux. Nous avons conçu des accompagnements spécifiques pour chaque type d'activité et de structure juridique.
                </p>
                <Button variant="accent" size="lg" className="rounded-full mt-8 whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img src={imgHero} alt="Les profils accompagnés par MFinances à Bruxelles" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* ── PAR PROFIL D'ACTIVITÉ ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Par <span className="text-accent">profil d'activité</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profilCards.map((c, i) => (
                <AudienceCard key={c.title} {...c} delay={0.08 + i * 0.05} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PAR STRUCTURE JURIDIQUE ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Par <span className="text-accent">structure juridique</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {structureCards.map((c, i) => (
                <AudienceCard key={c.title} {...c} delay={0.08 + i * 0.05} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Vous ne savez pas quel accompagnement choisir ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous identifions ensemble le forfait et les services adaptés à votre situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
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
