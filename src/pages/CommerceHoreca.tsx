import { useEffect } from "react";
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
  Check,
  Minus,
  Receipt,
  PieChart,
  Percent,
  TrendingDown,
  Quote,
  BarChart3,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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
    title: "Restaurant — gestion en flux tendu",
    desc: "Un restaurant Horeca confronté à un stockage excessif a mis en place une gestion en flux tendu et un suivi des coûts alimentaires par plat. Résultat : réduction significative des coûts de stockage et amélioration de la trésorerie disponible.",
  },
  {
    icon: BarChart3,
    title: "Magasin de vêtements — rotation des stocks",
    desc: "Un magasin avec des stocks à faible rotation a restructuré son approche commerciale grâce à une analyse des données de vente. Résultat : amélioration notable du taux de rotation et des liquidités disponibles.",
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

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function CommerceHoreca() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Expert-Comptable Commerce Horeca Bruxelles — MFinances"
        description="Comptabilité, TVA multi-taux, marges et trésorerie pour commerçants et secteur Horeca en Belgique. Suivi minimum trimestriel. MFinances, Bruxelles."
        canonical="https://mfinances.be/qui-nous-accompagnons/commerce-et-horeca/"
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
                    <BreadcrumbLink className="text-primary-foreground/60 text-[13px]">Qui nous accompagnons</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Commerce & Horeca</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Forfait Premium minimum — dès 450 € HTVA/mois
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Commerce et Horeca — <span className="text-accent">maîtrisez vos marges</span> avant qu'elles ne vous échappent
                </h1>
                <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[540px] mx-auto lg:mx-0">
                  Dans ce secteur, la différence entre un établissement qui prospère et un qui ferme tient souvent à un seul facteur : la maîtrise financière.
                </p>
                <Button variant="accent" size="lg" className="rounded-full mt-8 whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img src={imgHero} alt="Restaurant élégant à Bruxelles — secteur Horeca" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* ── CE QUE MFINANCES FAIT POUR VOUS ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que MFinances fait <span className="text-accent">pour vous</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv key={s.title} delay={0.08 + i * 0.06} className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[17px] font-bold font-body text-foreground mb-2">{s.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{s.desc}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── RÉSULTATS CONCRETS ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Résultats <span className="text-accent">concrets</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((c, i) => {
                const Icon = c.icon;
                return (
                  <ScrollRevealDiv key={c.title} delay={0.08 + i * 0.08} className="bg-card rounded-2xl p-7 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[17px] font-bold font-body text-foreground mb-3">{c.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{c.desc}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGE ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Quote size={26} className="text-accent" strokeWidth={1.5} />
              </div>
              <blockquote className="text-[18px] md:text-[20px] text-foreground leading-[1.7] font-body italic max-w-[640px] mx-auto">
                « Gérer une activité Horeca implique beaucoup de flux. MFinances a su intégrer Odoo à notre gestion quotidienne. Je garde le contrôle sans m'enliser dans l'administratif. »
              </blockquote>
              <p className="text-accent font-bold font-body mt-5 text-[15px]">Yanis, restaurateur à Bruxelles</p>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── FORFAITS DISPONIBLES ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Forfaits disponibles — <span className="text-accent">Premium minimum</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-border/30 bg-secondary/40">
                      <th className="text-left p-5 font-body font-normal text-muted-foreground w-[40%]" />
                      <th className="p-5 text-center">
                        <span className="font-display font-bold text-[16px] text-primary">Premium — 450 €/mois</span>
                      </th>
                      <th className="p-5 text-center">
                        <span className="font-display font-bold text-[16px] text-accent">Excellence — 650 €/mois</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/20">
                      <td className="p-4 pl-5 font-medium text-foreground/80 font-body">Comptabilité + TVA sectorielle</td>
                      <td className="p-4 text-center"><Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" /></td>
                      <td className="p-4 text-center"><Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-border/20">
                      <td className="p-4 pl-5 font-medium text-foreground/80 font-body">Analyse des marges</td>
                      <td className="p-4 text-center text-[13px] text-foreground/70 font-body">Trimestrielle</td>
                      <td className="p-4 text-center text-[13px] text-foreground/70 font-body">Mensuelle</td>
                    </tr>
                    <tr>
                      <td className="p-4 pl-5 font-medium text-foreground/80 font-body">Trésorerie prévisionnelle</td>
                      <td className="p-4 text-center"><Minus size={16} className="text-foreground/20 mx-auto" /></td>
                      <td className="p-4 text-center text-[13px] text-foreground/70 font-body">✓ mensuelle</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {[
                  { label: "Comptabilité + TVA sectorielle", premium: true, excellence: true },
                  { label: "Analyse des marges", premium: "Trimestrielle", excellence: "Mensuelle" },
                  { label: "Trésorerie prévisionnelle", premium: false, excellence: "✓ mensuelle" },
                ].map((row) => (
                  <div key={row.label} className="bg-card rounded-xl border border-border/50 p-4">
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
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.2}>
              <div className="bg-accent/[0.07] rounded-xl p-5 mt-6 border border-accent/15">
                <p className="text-[13px] text-foreground/70 font-body">
                  <strong className="text-foreground">Important :</strong> Le secteur Commerce & Horeca requiert un suivi minimum trimestriel. Le forfait Essentiel n'est pas proposé pour ce secteur.
                </p>
              </div>
            </ScrollRevealDiv>

            <div className="text-center mt-8">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
              </Button>
            </div>

            <ScrollRevealDiv delay={0.2} className="mt-10 text-center">
              <p className="text-[14px] text-muted-foreground font-body">
                Voir aussi :{" "}
                <Link to="/qui-nous-accompagnons/independants-et-startups/" className="text-accent font-semibold hover:underline">
                  Indépendants & Startups
                </Link>{" "}· {" "}
                <Link to="/qui-nous-accompagnons/professions-de-sante/" className="text-accent font-semibold hover:underline">
                  Professions de santé
                </Link>
              </p>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Prêt à reprendre le contrôle de vos marges ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous analysons votre situation financière.
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
