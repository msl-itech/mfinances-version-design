import { useEffect } from "react";
import { Link } from "react-router-dom";
import imgHero from "@/assets/independants-hero.jpg";
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
  Settings,
  FileText,
  ShieldCheck,
  Lightbulb,
  ClipboardList,
  Rocket,
  Gift,
  TrendingUp,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  {
    icon: Settings,
    title: "Mise en place comptable dès le départ",
    desc: "Ouverture du dossier sur Odoo, configuration TVA, plan comptable adapté. Vous démarrez proprement.",
  },
  {
    icon: FileText,
    title: "Plan financier et business plan",
    desc: "Que ce soit pour convaincre une banque, accéder à des aides ou valider votre modèle économique — nous construisons un plan financier solide.",
  },
  {
    icon: Lightbulb,
    title: "Optimisation fiscale dès la première année",
    desc: "Statut indépendant ou société — lequel est le plus avantageux pour vous ? Franchise TVA ou régime normal ?",
  },
  {
    icon: ClipboardList,
    title: "Accompagnement administratif au démarrage",
    desc: "BCE, numéro de TVA, caisse d'assurances sociales, compte bancaire professionnel — nous coordonnons toutes les démarches.",
  },
];

const steps = [
  { num: "01", text: "Business plan et plan financier" },
  { num: "02", text: "Choix du statut juridique" },
  { num: "03", text: "Ouverture du compte bancaire professionnel" },
  { num: "04", text: "Inscription à la BCE" },
  { num: "05", text: "Activation du numéro de TVA" },
  { num: "06", text: "Affiliation à une caisse d'assurances sociales" },
];

const aides = [
  { icon: Gift, label: "Tremplin-Indépendants", desc: "Maintien partiel des allocations de chômage" },
  { icon: TrendingUp, label: "Primes régionales bruxelloises", desc: "Subsides pour les entrepreneurs bruxellois" },
  { icon: ShieldCheck, label: "Microcrédits", desc: "Financement accessible pour les petits projets" },
  { icon: Rocket, label: "Déduction pour investissement", desc: "Avantage fiscal sur vos investissements professionnels" },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Qui nous accompagnons", item: "https://mfinances.be/qui-nous-accompagnons/" },
    { "@type": "ListItem", position: 3, name: "Indépendants & Startups", item: "https://mfinances.be/qui-nous-accompagnons/independants-et-startups/" },
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

export default function IndependantsStartups() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Expert-Comptable Indépendants Bruxelles — MFinances";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Accompagnement comptable, fiscal et financier pour indépendants et startups en Belgique. Plan financier, optimisation fiscale. Cabinet MFinances, Bruxelles.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/qui-nous-accompagnons/independants-et-startups/";

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
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Indépendants & Startups</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-8">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Forfait Essentiel — dès 350 € HTVA/mois
                </span>
                <h1 className="font-display text-[32px] md:text-[48px] leading-[1.12] text-primary-foreground">
                  Indépendant ou startup — <span className="text-accent">posez les bonnes bases financières</span> dès le départ
                </h1>
                <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[540px]">
                  Vous avez fait le saut. Vous avez le projet, l'énergie, les premiers clients. Ce que personne ne vous a dit : les erreurs financières du démarrage sont les plus difficiles à corriger. Et les plus évitables.
                </p>
                <Button variant="accent" size="lg" className="rounded-full mt-8" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img src={imgHero} alt="Indépendant travaillant dans un espace de coworking à Bruxelles" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* ── CE QUE MFINANCES FAIT POUR VOUS ── */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-14">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
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

        {/* ── ÉTAPES POUR DÉMARRER ── */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-14">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Les étapes pour <span className="text-accent">démarrer en Belgique</span>
              </h2>
            </ScrollRevealDiv>

            <div className="space-y-4">
              {steps.map((s, i) => (
                <ScrollRevealDiv key={s.num} delay={0.06 + i * 0.05}>
                  <div className="flex items-center gap-5 bg-card rounded-xl p-5 border border-border/50">
                    <span className="font-display text-[28px] font-bold text-accent/20 leading-none w-10 shrink-0 text-center">{s.num}</span>
                    <p className="text-[15px] font-medium text-foreground font-body">{s.text}</p>
                  </div>
                </ScrollRevealDiv>
              ))}
            </div>
          </div>
        </section>

        {/* ── AIDES DISPONIBLES ── */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-14">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Les aides <span className="text-accent">disponibles</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {aides.map((a, i) => {
                const Icon = a.icon;
                return (
                  <ScrollRevealDiv key={a.label} delay={0.06 + i * 0.06} className="bg-secondary/60 rounded-xl p-6 border border-border/50 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={20} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold font-body text-foreground mb-1">{a.label}</h3>
                      <p className="text-[13px] text-muted-foreground font-body">{a.desc}</p>
                    </div>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FORFAITS DISPONIBLES ── */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-10">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Forfaits <span className="text-accent">disponibles</span>
              </h2>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1}>
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <table className="w-full text-[14px]">
                  <tbody>
                    <tr className="border-b border-border/30 bg-primary/[0.03]">
                      <td className="p-5 font-body" />
                      <td className="p-5 text-center">
                        <span className="font-display font-bold text-[16px] text-primary">Essentiel — 350 €/mois</span>
                      </td>
                    </tr>
                    <tr className="border-b border-border/20">
                      <td className="p-4 pl-5 font-medium text-foreground/80 font-body">Comptabilité + déclarations</td>
                      <td className="p-4 text-center">
                        <Check size={18} className="text-[hsl(145,63%,42%)] mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-border/20">
                      <td className="p-4 pl-5 font-medium text-foreground/80 font-body">Conseil fiscal</td>
                      <td className="p-4 text-center text-[13px] text-foreground/70 font-body">Ponctuel</td>
                    </tr>
                    <tr>
                      <td className="p-4 pl-5 font-medium text-foreground/80 font-body">Premium disponible</td>
                      <td className="p-4 text-center text-[13px] text-foreground/70 font-body">À partir de 450 €/mois</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.2}>
              <div className="bg-primary/[0.05] rounded-xl p-5 mt-6 border border-primary/10">
                <p className="text-[13px] text-foreground/70 font-body">
                  <strong className="text-foreground">Création d'entreprise :</strong> accompagnement complet à la création — <strong className="text-foreground">800 € HTVA</strong>, mission ponctuelle.
                </p>
              </div>
            </ScrollRevealDiv>

            <div className="text-center mt-8">
              <Button variant="accent" size="lg" className="rounded-full" asChild>
                <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-16 md:py-20 relative overflow-hidden">
          <img src={imgMeeting} alt="Consultation MFinances" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <ScrollRevealDiv>
              <h2 className="font-display text-[28px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Prêt à lancer votre activité ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body max-w-[600px] mx-auto">
                Premier échange gratuit et confidentiel — nous vous accompagnons dès le premier jour.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                  <Link to="/tarifs/">Voir les tarifs <ArrowRight size={16} className="ml-1" /></Link>
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
