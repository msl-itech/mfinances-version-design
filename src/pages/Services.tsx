import { useEffect } from "react";
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
  ArrowRight,
  Users,
  BarChart3,
  TrendingUp,
  Calculator,
  FileText,
  Rocket,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const pilotageServices = [
  {
    icon: Users,
    title: "DAF à temps partiel",
    desc: "Un copilote financier pour vos décisions stratégiques. Réservé aux clients Excellence — 150 € HTVA/heure.",
    href: "/services/daf-externalise/",
    badge: "Excellence",
  },
  {
    icon: BarChart3,
    title: "Contrôle de gestion",
    desc: "Budget annuel, situations intermédiaires, analyse des écarts. Inclus dans les forfaits Premium et Excellence.",
    href: "/services/controle-de-gestion/",
    badge: "Premium+",
  },
  {
    icon: TrendingUp,
    title: "Trésorerie prévisionnelle",
    desc: "Un prévisionnel actualisé chaque mois. Inclus dans le forfait Excellence.",
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mfinances.be/services/" },
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

function ServiceCard({
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
          En savoir plus <ArrowRight size={14} />
        </span>
      </Link>
    </ScrollRevealDiv>
  );
}

export default function Services() {
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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Services</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Nos services — <span className="text-accent">bien plus</span> que la comptabilité
                </h1>
                <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[540px] mx-auto lg:mx-0">
                  Chez MFinances, nous avons conçu nos services autour d'une conviction simple : un dirigeant de TPE mérite les mêmes outils de pilotage financier qu'une grande entreprise.
                </p>
                <Button variant="accent" size="lg" className="rounded-full mt-8 whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img src={imgHero} alt="Services de pilotage financier MFinances à Bruxelles" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* ── PILOTAGE FINANCIER ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Services de <span className="text-accent">pilotage financier</span>
              </h2>
              <p className="text-muted-foreground text-[15px] mt-3 font-body max-w-[600px] mx-auto">
                Des outils de direction financière accessibles aux TPE et PME bruxelloises.
              </p>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pilotageServices.map((s, i) => (
                <ServiceCard key={s.title} {...s} delay={0.08 + i * 0.06} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES FONDAMENTAUX ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Services <span className="text-accent">fondamentaux</span>
              </h2>
              <p className="text-muted-foreground text-[15px] mt-3 font-body max-w-[600px] mx-auto">
                Le socle de chaque forfait — comptabilité, fiscalité et accompagnement à la création.
              </p>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fondamentauxServices.map((s, i) => (
                <ServiceCard key={s.title} {...s} delay={0.08 + i * 0.06} />
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
                Quel service correspond à vos besoins ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous identifions ensemble les services adaptés à votre situation.
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
