import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import imgHero from "@/assets/financial-desk.jpg";
import imgMeeting from "@/assets/daf-meeting-team.png";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Check,
  Minus,
  Briefcase,
  FileText,
  Scale,
  Clock,
  ShieldCheck,
  AlertCircle,
  Quote,
} from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const services = [
  {
    icon: FileText,
    title: "Tenue de la comptabilité",
    desc: "Même sans activité, votre société doit tenir une comptabilité conforme. Nous nous en chargeons intégralement.",
  },
  {
    icon: Scale,
    title: "Déclarations fiscales périodiques",
    desc: "TVA, impôt des sociétés, déclarations néant : toutes vos obligations fiscales sont respectées dans les délais.",
  },
  {
    icon: ShieldCheck,
    title: "Conformité comptable",
    desc: "Bilan annuel, comptes annuels, dépôt à la BNB : votre société reste en règle même en période de veille.",
  },
  {
    icon: AlertCircle,
    title: "Suivi des obligations légales",
    desc: "Nous veillons à ce que votre société respecte toutes les obligations légales, même en l'absence d'activité commerciale.",
  },
  {
    icon: Clock,
    title: "Réactivation simplifiée",
    desc: "Le jour où vous reprenez votre activité, votre comptabilité est à jour et la transition se fait sans délai.",
  },
  {
    icon: Briefcase,
    title: "Consultations sur demande",
    desc: "Besoin d'un conseil fiscal ou d'une prestation ponctuelle ? Nous intervenons à 150 € HTVA/heure, sur demande.",
  },
];

const faqs = [
  {
    q: "Qu'est-ce qu'une société en veille ?",
    a: "Une société en veille (ou société dormante) est une société légalement constituée qui n'exerce plus d'activité commerciale et ne génère pas de chiffre d'affaires. Elle reste cependant soumise à des obligations comptables et fiscales.",
  },
  {
    q: "Pourquoi maintenir une comptabilité pour une société sans activité ?",
    a: "Même sans chiffre d'affaires, votre société doit déposer ses comptes annuels, remplir ses déclarations fiscales (TVA néant, impôt des sociétés) et respecter ses obligations légales. Le non-respect de ces obligations peut entraîner des amendes, voire la dissolution judiciaire de la société.",
  },
  {
    q: "Que comprend le forfait Veille ?",
    a: "Le forfait Veille à 275 € HTVA/mois couvre la tenue de la comptabilité, les déclarations fiscales périodiques et les obligations de conformité comptable. Les consultations fiscales et prestations ponctuelles sont facturées sur demande à 150 € HTVA/heure.",
  },
  {
    q: "Puis-je passer à un forfait supérieur si je reprends mon activité ?",
    a: "Absolument. Dès que votre société reprend son activité, nous adaptons votre forfait à vos nouveaux besoins (Basic, Essentiel, Premium ou Excellence). La transition est fluide car votre comptabilité est déjà à jour.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Société en veille", item: "https://mfinances.be/societe-en-veille/" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SocieteEnVeille() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  return (
    <div className="min-h-screen bg-background" ref={root}>
      <SEOHead
        title="Société en Veille — Alternative à la Liquidation | 275€/mois | MFinances"
        description="Votre société est en veille ? Plutôt que de la liquider, maintenez-la en conformité avec notre forfait Veille à 275 € HTVA/mois : comptabilité, déclarations fiscales et conformité à Bruxelles."
        canonical="https://mfinances.be/societe-en-veille/"
        schemaJson={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="relative">
          <div className="group/hero relative overflow-hidden bg-primary py-6 md:py-12 bg-precision-grid-light">
            <span
              aria-hidden="true"
              data-anim="text-scrub" data-scrub-dir="right"
              className="pointer-events-none select-none absolute top-10 md:top-12 inset-x-0 text-center font-display italic text-primary-foreground/[0.04] text-[80px] md:text-[180px] leading-none tracking-tight whitespace-nowrap"
            >
              Société en veille
            </span>

            <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center relative z-10">
              <div className="text-center lg:text-left">
                <div className={`transition-transform duration-1000 ${mounted ? "translate-y-0" : "translate-y-6"}`}>
                  <Breadcrumb>
                    <BreadcrumbList className="justify-center lg:justify-start">
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-primary-foreground/40" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-primary-foreground text-[13px]">Société en veille</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="mt-7 md:mt-9">
                  <div className={`inline-flex items-center gap-4 mb-5 md:mb-6 transition-transform duration-1000 ${mounted ? "translate-y-0" : "translate-y-6"}`}>
                    <span className="font-display text-[14px] text-accent font-bold tracking-wider">— Veille</span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 font-medium">
                      Forfait Veille · 275 € HTVA / mois
                    </span>
                  </div>

                  <h1
                    className="font-display text-[32px] sm:text-[40px] md:text-[56px] leading-[1.05] text-primary-foreground tracking-tight"
                    data-anim="chars"
                    data-stagger="0.03"
                    data-delay="0.25"
                  >
                    Votre société est en veille : <em className="italic font-normal text-accent">une alternative à la liquidation</em>.
                  </h1>

                  <p
                    className="mt-6 md:mt-7 text-primary-foreground/70 text-[15px] md:text-[16px] leading-[1.75] font-body max-w-[520px] mx-auto lg:mx-0"
                    data-anim="fade-up"
                    data-delay="0.4"
                  >
                    Vous partez à l'étranger, vous changez temporairement d'activité ou vous souhaitez simplement mettre votre société en pause ? Plutôt que de la liquider, maintenez-la en veille. Nous gérons vos obligations comptables et fiscales pour que tout soit en ordre le jour où vous reprenez.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start" data-anim="fade-up" data-delay="0.55">
                    <Button variant="accent" size="lg" className="rounded-full pl-6 pr-3 group h-12 text-[14px]" asChild>
                      <Link to="/contact/">
                        <span className="flex items-center gap-3">
                          Consultation gratuite
                          <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform">
                            <ArrowUpRight size={14} />
                          </span>
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="relative" data-anim="fade-up" data-delay="0.4">
                <div className="absolute -inset-2 bg-accent/20 blur-2xl rounded-3xl" aria-hidden="true" />
                <div className="relative rounded-2xl shadow-2xl overflow-hidden ring-1 ring-primary-foreground/10" data-tilt data-tilt-max="3">
                  <img src={imgHero} alt="Bureau de comptabilité pour société en veille" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FORFAIT VEILLE ── */}
        <section className="py-10 md:py-14 bg-card relative overflow-hidden">
          <span
            aria-hidden="true" data-anim="text-scrub"
            className="absolute inset-x-0 top-12 text-center font-display italic font-bold text-[140px] md:text-[220px] leading-none text-accent/[0.035] pointer-events-none select-none whitespace-nowrap"
          >
            Veille
          </span>

          <div className="container-mf relative max-w-[800px]">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5 border-l-2 border-accent pl-4">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 01</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Forfait</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Le forfait Veille : conçu pour les sociétés en veille.
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground font-body leading-relaxed max-w-[640px] mx-auto" data-anim="fade-up" data-delay="0.2">
                Votre société n'a pas de chiffre d'affaires car elle n'exerce plus d'activité ? Plutôt que de la liquider, le forfait Veille couvre l'essentiel de vos obligations comptables et fiscales : votre société reste prête à repartir.
              </p>
            </div>

            <div data-anim="fade-up" data-delay="0.3">
              <div data-tilt data-tilt-max="3" className="bg-card rounded-3xl border-2 border-accent/30 shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.25)] p-7 md:p-10 relative overflow-hidden">
                <span
                  aria-hidden="true"
                  className="absolute top-5 right-6 font-display italic text-[64px] leading-none text-primary/[0.05]"
                >
                  V
                </span>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 ring-1 ring-accent/30 flex items-center justify-center">
                    <Briefcase size={26} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">VEILLE</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[44px] md:text-[52px] font-bold text-primary leading-none tracking-tight">275€</span>
                      <span className="text-[13px] text-muted-foreground">/mois HTVA</span>
                    </div>
                  </div>
                </div>

                <hr className="border-border/40 mb-6" />

                <h3 className="text-[15px] font-bold font-body text-foreground mb-4">Ce forfait comprend :</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Tenue de la comptabilité de votre société",
                    "Déclarations fiscales périodiques",
                    "Obligations de conformité comptable",
                    "Bilan annuel et comptes annuels",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px]">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={11} className="text-accent" strokeWidth={3} />
                      </div>
                      <span className="text-foreground/80 font-body">{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-[15px] font-bold font-body text-foreground mb-4">Non inclus dans ce forfait :</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Situations comptables provisoires",
                    "Consultations fiscales",
                    "Prestations ponctuelles",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px]">
                      <div className="w-5 h-5 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Minus size={11} className="text-foreground/30" strokeWidth={3} />
                      </div>
                      <span className="text-muted-foreground font-body">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                  <p className="text-[13px] text-foreground/70 font-body leading-relaxed">
                    Ces prestations sont facturées sur demande, selon notre tarif horaire de <strong className="text-foreground">150 € HTVA par heure</strong>.
                  </p>
                </div>

                <div className="mt-7">
                  <Link
                    to="/contact/"
                    className="inline-flex items-center justify-center w-full rounded-full gap-2 py-3 text-[14px] font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                  >
                    Choisir Veille <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-10 md:py-14 bg-secondary/50 relative overflow-hidden">
          <span
            aria-hidden="true" data-anim="text-scrub" data-scrub-dir="right"
            className="absolute inset-x-0 top-12 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
          >
            Services
          </span>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5 border-l-2 border-accent pl-4">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 02</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Inclus</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Ce que nous faisons pour votre société en veille.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7" data-anim="stagger" data-stagger="0.1">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} data-tilt data-tilt-max="5" className="group relative">
                    <div className="bg-card rounded-3xl p-7 md:p-9 border border-border/50 h-full transition-shadow duration-500 hover:border-accent/30 hover:shadow-[0_24px_60px_rgba(27,43,94,0.12)] relative overflow-hidden">
                      <span
                        aria-hidden="true"
                        className="absolute -top-4 right-4 font-display italic text-accent/[0.08] text-[64px] leading-none"
                      >
                        0{i + 1}
                      </span>
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-300">
                          <Icon size={22} className="text-accent" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[18px] font-display text-primary mb-2">{s.title}</h3>
                        <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── POURQUOI NE PAS NÉGLIGER ── */}
        <section className="py-10 md:py-14 bg-card relative overflow-hidden">
          <div className="container-mf max-w-[800px]">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5 border-l-2 border-accent pl-4">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 03</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground font-semibold">Risques</span>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] leading-[1.05]" data-anim="split">
                Pourquoi ne pas négliger votre société en veille ?
              </h2>
            </div>

            <div className="space-y-4" data-anim="stagger" data-stagger="0.08">
              {[
                { title: "Amendes fiscales", desc: "Le non-dépôt des déclarations fiscales entraîne des amendes pouvant aller de 50 € à 1 250 € par déclaration manquante." },
                { title: "Dissolution judiciaire", desc: "Le tribunal de l'entreprise peut prononcer la dissolution de votre société si elle ne dépose pas ses comptes annuels pendant trois exercices consécutifs." },
                { title: "Perte de crédibilité", desc: "Une société dont les comptes ne sont pas à jour inspire moins confiance aux banques, partenaires et futurs clients lors de la reprise d'activité." },
                { title: "Difficultés de réactivation", desc: "Rattraper plusieurs années de comptabilité en retard coûte bien plus cher que de maintenir la conformité au fil de l'eau." },
              ].map((item) => (
                <div key={item.title} className="bg-background rounded-2xl border border-border/50 p-6 transition-colors hover:border-accent/30">
                  <h3 className="text-[16px] font-display text-primary mb-1">{item.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed font-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-10 md:py-14 bg-secondary/50 relative overflow-hidden">
          <div className="container-mf max-w-[800px]">
            <div className="text-center mb-12">
              <h2 className="font-display text-[32px] md:text-[42px] leading-[1.05]" data-anim="split">
                Questions <span className="text-accent italic font-light">fréquentes</span>
              </h2>
            </div>

            <div data-anim="fade-up" data-delay="0.2">
              <Accordion
                type="multiple"
                defaultValue={faqs.map((_, i) => `faq-${i}`)}
                className="space-y-4"
              >
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-card rounded-2xl border border-border/50 px-5 sm:px-7 overflow-hidden data-[state=open]:border-accent/30 transition-colors"
                  >
                    <AccordionTrigger className="text-[15px] sm:text-[16px] font-semibold text-primary font-body hover:no-underline py-6 text-left">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[14.5px] text-muted-foreground leading-relaxed font-body pb-6">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── LIEN VERS TARIFS ── */}
        <section className="py-10 md:py-14 bg-card">
          <div className="container-mf max-w-[800px] text-center" data-anim="fade-up">
            <p className="text-[14px] text-muted-foreground font-body mb-4">
              Votre société reprend son activité ? Découvrez nos forfaits adaptés à chaque stade de croissance.
            </p>
            <Button variant="outline" size="lg" className="rounded-full px-6" asChild>
              <Link to="/tarifs/">Voir tous les tarifs <ArrowRight size={16} className="ml-1 flex-shrink-0" /></Link>
            </Button>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-10 md:py-14 bg-primary relative overflow-hidden bg-precision-grid-light">
          <div className="absolute inset-0 opacity-15">
            <img src={imgMeeting} alt="Consultation MFinances" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />

          <div className="container-mf max-w-[800px] text-center relative z-10" data-anim="fade-up">
            <h2 className="font-display text-[34px] md:text-[48px] text-primary-foreground leading-[1.05]">
              Votre société en veille mérite un suivi rigoureux
            </h2>
            <p className="text-primary-foreground/75 text-[15px] sm:text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
              Premier échange gratuit et confidentiel : nous analysons vos obligations et prenons tout en charge.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Button variant="accent" size="lg" className="rounded-full pl-6 pr-3 group text-[14px]" asChild>
                <Link to="/contact/">
                  <span className="flex items-center gap-3">
                    Consultation gratuite
                    <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <ArrowUpRight size={14} />
                    </span>
                  </span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6 h-12 text-[14px] border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/tarifs/">Découvrir nos forfaits</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
