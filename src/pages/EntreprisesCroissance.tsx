import { useEffect } from "react";
import { Link } from "react-router-dom";
import imgHero from "@/assets/entreprises-croissance-hero.jpg";
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
  BarChart3,
  LineChart,
  Wallet,
  Users,
  Factory,
  Cpu,
  Rocket,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  {
    icon: BarChart3,
    title: "Situations financières mensuelles",
    desc: "Chaque mois, une situation financière complète à jour. Vous savez exactement où en est votre entreprise.",
  },
  {
    icon: LineChart,
    title: "Contrôle de gestion mensuel",
    desc: "Budget annuel co-construit, suivi des écarts chaque mois, analyse des performances.",
  },
  {
    icon: Wallet,
    title: "Trésorerie prévisionnelle actualisée",
    desc: "Un prévisionnel mis à jour chaque mois sur données réelles.",
  },
  {
    icon: Users,
    title: "Accès au DAF à temps partiel",
    desc: "Votre DAF devient votre copilote pour les décisions qui dépassent les chiffres.",
  },
];

const caseStudies = [
  {
    icon: Factory,
    title: "Entreprise industrielle multi-sites",
    desc: "Confrontée à des tensions de trésorerie récurrentes, elle a mis en place un suivi mensuel et un tableau de trésorerie prévisionnel. Résultat : réduction significative des retards de paiement et meilleure visibilité financière sur 12 mois.",
  },
  {
    icon: Cpu,
    title: "Groupe technologique en croissance",
    desc: "Optimisation du processus de facturation et de relance. Résultat : délais de paiement clients réduits de plusieurs semaines, libérant des liquidités pour financer un projet R&D stratégique.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Entreprises en croissance", item: "https://mfinances.be/qui-nous-accompagnons/entreprises-en-croissance/" },
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

export default function EntreprisesCroissance() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Expert-Comptable Entreprise en Croissance à Bruxelles — MFinances";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Situations mensuelles, contrôle de gestion, trésorerie prévisionnelle et DAF à temps partiel pour entreprises en croissance à Bruxelles. Forfait Excellence dès 650 €/mois HTVA.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/qui-nous-accompagnons/entreprises-en-croissance/";

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(breadcrumbJsonLd);
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-16 md:py-20 relative overflow-hidden">
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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Entreprises en croissance</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Forfait Excellence exclusivement
                </span>
                <h1 className="font-display text-[32px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Votre entreprise accélère — <span className="text-accent">votre pilotage financier</span> doit suivre
                </h1>
                <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[540px]">
                  Vous avez passé un cap. Votre équipe grandit, vos décisions engagent plus, vos enjeux financiers se complexifient. La comptabilité traditionnelle ne suffit plus.
                </p>
                <Button variant="accent" size="lg" className="rounded-full mt-8" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img src={imgHero} alt="Réunion de direction — entreprise en croissance à Bruxelles" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-14">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que MFinances apporte aux <span className="text-accent">entreprises en croissance</span>
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
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-14">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
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

        {/* ── OFFRE EXCELLENCE ── */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[600px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Rocket size={26} className="text-accent" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Une seule offre — <span className="text-accent">Excellence</span>
              </h2>
              <div className="mt-6 bg-secondary/60 rounded-2xl p-8 border border-border/50">
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="font-display text-[44px] font-bold text-primary leading-none">650€</span>
                  <span className="text-[13px] text-muted-foreground">/mois HTVA</span>
                </div>
                <p className="text-[14px] text-muted-foreground font-body mt-3">
                  DAF à temps partiel disponible en option — <strong className="text-foreground">150 € HTVA/heure</strong>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button variant="accent" size="lg" className="rounded-full" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-16 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[28px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Prêt à structurer votre croissance ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous analysons vos enjeux financiers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                  <Link to="/services/daf-externalise/">Découvrir le DAF externalisé <ArrowRight size={16} className="ml-1" /></Link>
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
