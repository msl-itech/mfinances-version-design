import { useEffect } from "react";
import { Link } from "react-router-dom";
import imgHero from "@/assets/asbl-hero.jpg";
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
  Check,
  Minus,
  HeartHandshake,
  FileText,
  BarChart3,
  Search,
  CreditCard,
  Lightbulb,
  Scale,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  {
    icon: FileText,
    title: "Création et gestion administrative",
    desc: "Rédaction et dépôt des statuts, enregistrement au Moniteur belge, suivi des obligations légales.",
  },
  {
    icon: BarChart3,
    title: "Comptabilité générale et analytique",
    desc: "Suivi des coûts par projet et répartition des frais généraux. Chaque euro est tracé, chaque projet est comptabilisé séparément.",
  },
  {
    icon: Search,
    title: "Accompagnement en recherche de financements",
    desc: "Plans financiers détaillés par projet, suivi via comptabilité analytique pour justifier les subsides.",
  },
  {
    icon: CreditCard,
    title: "Cash Collecting",
    desc: "Gestion des cotisations des membres de façon automatisée et impartiale.",
  },
  {
    icon: Lightbulb,
    title: "Accompagnement ponctuel selon les besoins",
    desc: "Analyse approfondie, budget annuel, optimisation des ressources — nous intervenons ponctuellement selon vos besoins spécifiques.",
  },
  {
    icon: Scale,
    title: "Obligations légales selon la taille",
    desc: "Petite ASBL : comptabilité simplifiée. Grande ASBL : comptabilité en partie double obligatoire, dépôt des comptes annuels à la BNB.",
  },
];

const compareRows = [
  { label: "Tarif mensuel HTVA", values: ["350 €", "450 €", "650 €"], isPrice: true },
  { label: "Réduction non-assujetti TVA", values: ["-21 %", "-21 %", "-21 %"], isDiscount: true },
  { label: "Comptabilité + obligations", values: [true, true, true] },
  { label: "Comptabilité analytique", values: ["—", true, true] },
  { label: "Trésorerie prévisionnelle", values: ["—", "—", true] },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "ASBL", item: "https://mfinances.be/qui-nous-accompagnons/asbl/" },
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

export default function Asbl() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Expert-Comptable ASBL à Bruxelles — MFinances";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Comptabilité, subsides, obligations légales et accompagnement pour ASBL en Belgique. Cabinet MFinances, Bruxelles.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/qui-nous-accompagnons/asbl/";

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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">ASBL</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Trois forfaits · Réduction 21 % non-assujetti TVA
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Votre ASBL a une mission — <span className="text-accent">nous gérons les chiffres</span> pour que vous puissiez vous y consacrer
                </h1>
                <Button variant="accent" size="lg" className="rounded-full mt-8 whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img src={imgHero} alt="Équipe ASBL en réunion à Bruxelles" className="w-full h-full object-cover" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* ── FORFAITS ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Forfaits <span className="text-accent">disponibles</span>
              </h2>
              <p className="text-muted-foreground text-[15px] mt-3 font-body">
                Réduction de 21 % appliquée pour les ASBL non assujetties à la TVA.
              </p>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              {/* Desktop table */}
              <div className="hidden sm:block bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="border-b border-border/30 bg-secondary/40">
                        <th className="text-left p-5 font-body font-normal text-muted-foreground w-[35%]" />
                        <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-primary">Essentiel</span></th>
                        <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-primary">Premium</span></th>
                        <th className="p-5 text-center"><span className="font-display font-bold text-[16px] text-accent">Excellence</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {compareRows.map((row, ri) => (
                        <tr key={row.label} className={`border-b border-border/20 last:border-0 ${ri === 0 ? "bg-primary/[0.03]" : ""}`}>
                          <td className="p-4 pl-5 font-medium text-foreground/80 font-body">{row.label}</td>
                          {row.values.map((v, ci) => (
                            <td key={ci} className="p-4 text-center">
                              {v === true ? (
                                <Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" />
                              ) : v === "—" ? (
                                <Minus size={16} className="text-foreground/20 mx-auto" />
                              ) : (
                                <span className={`font-body ${
                                  row.isPrice ? "font-bold text-primary text-[15px]" :
                                  (row as any).isDiscount ? "font-semibold text-accent text-[14px]" :
                                  "text-foreground/70 text-[13px]"
                                }`}>{v}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {compareRows.map((row, ri) => (
                  <div key={row.label} className={`bg-card rounded-xl border border-border/50 p-4 ${ri === 0 ? "bg-primary/[0.03]" : ""}`}>
                    <p className="text-[14px] font-semibold text-foreground font-body mb-3">{row.label}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Essentiel", "Premium", "Excellence"].map((plan, ci) => (
                        <div key={plan} className="text-center">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider font-body block mb-1 ${ci === 2 ? "text-accent" : "text-muted-foreground"}`}>{plan}</span>
                          {row.values[ci] === true ? (
                            <Check size={16} className="text-[hsl(145,63%,42%)] mx-auto" />
                          ) : row.values[ci] === "—" ? (
                            <Minus size={14} className="text-foreground/20 mx-auto" />
                          ) : (
                            <span className={`font-body text-[11px] ${
                              row.isPrice ? "font-bold text-primary" :
                              (row as any).isDiscount ? "font-semibold text-accent" :
                              "text-foreground/70"
                            }`}>{row.values[ci]}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollRevealDiv>

            <div className="text-center mt-8">
              <Button variant="accent" size="lg" className="rounded-full whitespace-normal text-center" asChild>
                <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Votre ASBL mérite un accompagnement dédié
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous analysons vos besoins comptables et financiers.
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
