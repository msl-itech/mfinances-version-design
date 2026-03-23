import { useEffect } from "react";
import { Link } from "react-router-dom";
import imgHero from "@/assets/promoteurs-immobiliers-hero.jpg";
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
  Percent,
  Building,
  Rocket,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const tvaRegimes = [
  "Immeuble neuf destiné à la revente — TVA 21% généralement déductible, sous conditions",
  "Immeuble neuf destiné à la location — TVA 21% généralement non déductible, selon l'affectation",
  "Immeuble ancien destiné à l'habitation — TVA réduite à 6% possible, sous conditions strictes",
  "Régime d'autoliquidation — applicable dans certains cas, suivi rigoureux requis",
  "Calcul du prorata de déductibilité sur frais généraux — selon activité mixte",
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Promoteurs immobiliers", item: "https://mfinances.be/qui-nous-accompagnons/promoteurs-immobiliers/" },
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

export default function PromoteursImmobiliers() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Expert-Comptable Promoteur Immobilier Bruxelles — MFinances";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Comptabilité analytique par projet, TVA immobilière et trésorerie prévisionnelle pour promoteurs immobiliers en Belgique. MFinances, Bruxelles.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/qui-nous-accompagnons/promoteurs-immobiliers/";

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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Promoteurs immobiliers</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Forfait Excellence — dès 650 € HTVA/mois
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Promotion immobilière — <span className="text-accent">pilotez chaque projet</span> comme une entreprise dans l'entreprise
                </h1>
                <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[540px] mx-auto lg:mx-0">
                  Budgets conséquents, marges serrées, TVA complexe, flux de trésorerie décalés — la promotion immobilière est l'une des activités où la maîtrise financière fait directement la différence.
                </p>
                <Button variant="accent" size="lg" className="rounded-full mt-8 whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img src={imgHero} alt="Projet de promotion immobilière à Bruxelles" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que MFinances fait <span className="text-accent">pour vous</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollRevealDiv delay={0.08} className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <BarChart3 size={22} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-bold font-body text-foreground mb-2">Comptabilité analytique par projet</h3>
                <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">
                  Chaque projet traité comme une entité distincte — ventilation des coûts par projet et par unité, suivi des marges à chaque phase.
                </p>
              </ScrollRevealDiv>

              <ScrollRevealDiv delay={0.14} className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Percent size={22} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-bold font-body text-foreground mb-3">Maîtrise de la TVA immobilière</h3>
                <p className="text-[14px] text-muted-foreground leading-[1.7] font-body mb-4">
                  Les régimes TVA applicables en promotion immobilière dépendent de la nature de l'opération, de l'affectation du bien et du régime juridique choisi. À titre indicatif :
                </p>
                <ul className="space-y-2">
                  {tvaRegimes.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-foreground/70 font-body leading-[1.6]">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-[7px] shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] text-foreground/50 italic font-body mt-4">
                  Chaque situation étant spécifique, une analyse personnalisée est indispensable avant toute décision.
                </p>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        {/* ── RÉSULTAT CONCRET ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Résultat <span className="text-accent">concret</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              <div className="bg-card rounded-2xl p-7 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Building size={22} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-bold font-body text-foreground mb-3">Promoteur — comptabilité analytique et optimisation des ventes</h3>
                <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">
                  Un promoteur immobilier gérant plusieurs projets résidentiels a mis en place une comptabilité analytique par projet et une optimisation du calendrier des ventes. Résultat : amélioration significative de la rentabilité globale et trésorerie renforcée — nouveau projet lancé sans financement externe.
                </p>
                <p className="text-[13px] text-foreground/50 italic font-body mt-3">
                  Les gains obtenus varient selon la nature et la taille des projets.
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── OFFRE EXCELLENCE ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[600px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Rocket size={26} className="text-accent" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Prêt à structurer vos projets immobiliers ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous analysons vos enjeux financiers et fiscaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                  <Link to="/services/daf-externalise/">Découvrir le DAF externalisé <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
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
