import { useEffect } from "react";
import { Link } from "react-router-dom";
import imgHero from "@/assets/societe-moyens-hero.jpg";
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
  Users,
  BarChart3,
  CreditCard,
  Building2,
  Monitor,
  Headphones,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const mutualisations = [
  { icon: Building2, label: "Locaux professionnels — loyer, charges, entretien, énergie" },
  { icon: Monitor, label: "Matériel et équipements — achetés en commun et amortis collectivement" },
  { icon: Headphones, label: "Services partagés — secrétariat, support administratif, solutions cloud" },
];

const services = [
  {
    icon: BarChart3,
    title: "Comptabilité transparente basée sur l'usage réel",
    desc: "Chaque dépense imputée selon l'utilisation réelle de chaque membre.",
  },
  {
    icon: CreditCard,
    title: "Cash Collecting externalisé",
    desc: "Nous gérons la collecte des cotisations de façon automatisée et impartiale. Vous n'avez pas à jouer le mauvais rôle auprès de vos associés.",
  },
];

const compareRows = [
  { label: "Tarif mensuel HTVA", values: ["350 €", "450 €", "650 €"], isPrice: true },
  { label: "Comptabilité + obligations", values: [true, true, true] },
  { label: "Cash Collecting", values: [true, true, true] },
  { label: "Trésorerie prévisionnelle", values: ["—", "—", true] },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Société de moyens", item: "https://mfinances.be/qui-nous-accompagnons/societe-de-moyens/" },
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

export default function SocieteDeMoyens() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Expert-Comptable Société de Moyens Bruxelles — MFinances";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Comptabilité, répartition des charges et cash collecting pour sociétés de moyens en Belgique. MFinances, Bruxelles.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/qui-nous-accompagnons/societe-de-moyens/";

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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Société de moyens</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8 text-center lg:text-left">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Les trois forfaits disponibles
                </span>
                <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Société de moyens — <span className="text-accent">mutualisez vos ressources</span> sans créer de tensions entre associés
                </h1>
                <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[540px] mx-auto lg:mx-0">
                  Une structure juridique qui permet à plusieurs professionnels de mutualiser certains moyens matériels, financiers ou humains sans exercer leur activité en commun. Elle ne génère pas de bénéfices.
                </p>
                <Button variant="accent" size="lg" className="rounded-full mt-8 whitespace-normal text-center" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img src={imgHero} alt="Professionnels partageant un espace de travail à Bruxelles" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* ── CE QU'ON PEUT MUTUALISER ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-12">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce qu'on peut <span className="text-accent">mutualiser</span> concrètement
              </h2>
            </ScrollRevealDiv>

            <div className="space-y-4">
              {mutualisations.map((m, i) => {
                const Icon = m.icon;
                return (
                  <ScrollRevealDiv key={m.label} delay={0.08 + i * 0.06} className="flex items-start gap-4 bg-secondary/60 rounded-2xl p-6 border border-border/50">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={20} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <p className="text-[15px] text-foreground/80 font-body leading-relaxed">{m.label}</p>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-8 md:mb-14">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Ce que MFinances fait <span className="text-accent">pour vous</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <ScrollRevealDiv key={s.title} delay={0.08 + i * 0.06} className="bg-card rounded-2xl p-7 border border-border/50">
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

        {/* ── RÉSULTAT CONCRET ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Résultat <span className="text-accent">concret</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              <div className="bg-secondary/60 rounded-2xl p-7 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Users size={22} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-bold font-body text-foreground mb-3">Cabinet médical partagé — comptabilité analytique et cash collecting</h3>
                <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">
                  Un groupe de médecins partageant un cabinet a mis en place une comptabilité analytique par activité réelle, une centralisation des achats et un système automatisé de gestion des cotisations. Résultat : réduction significative des coûts d'approvisionnement, charges d'exploitation allégées et collaboration harmonieuse retrouvée entre les membres.
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* ── FORFAITS ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Forfaits <span className="text-accent">disponibles</span>
              </h2>
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
                                <span className={`font-body ${row.isPrice ? "font-bold text-primary text-[15px]" : "text-foreground/70 text-[13px]"}`}>{v}</span>
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
                            <span className={`font-body text-[11px] ${row.isPrice ? "font-bold text-primary" : "text-foreground/70"}`}>{row.values[ci]}</span>
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
                Simplifiez la gestion de votre société de moyens
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous analysons votre situation et proposons une organisation comptable adaptée.
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
