import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowUpRight,
  ArrowRight,
  Star,
  BarChart2,
  Briefcase,
  TrendingUp,
  Eye,
  HelpCircle,
  TrendingDown,
  Search,
  Settings,
  Zap,
  Check,
  Quote,
  Plus,
} from "lucide-react";
import equipePhoto from "@/assets/mfinances-equipe-travail.png";
import equipeSourire from "@/assets/mfinances-equipe-sourire.jpg";
import mikaPhoto from "@/assets/mika-musungayi.png";
import imgControle from "@/assets/service-controle-gestion.jpg";
import imgDaf from "@/assets/service-daf-externalise.jpg";
import imgTresorerie from "@/assets/service-tresorerie.jpg";
import dafMeeting from "@/assets/daf-meeting-team.png";
import meetingWarm from "@/assets/meeting-warm.jpg";

/* ----------------------------- DATA ----------------------------- */

const heroFeatures = [
  { title: "Vision claire", desc: "Vous savez exactement où va votre argent — chaque mois." },
  { title: "Conseil expert", desc: "20+ ans d'expérience au service de votre pilotage." },
  { title: "Support efficace", desc: "Une équipe dédiée, réactive et 100% bilingue FR/EN." },
];

const services = [
  {
    icon: BarChart2,
    title: "Contrôle de gestion",
    subtitle: "à temps partiel",
    desc: "Tableaux de bord, indicateurs clés, suivi mensuel. Vous savez exactement où en est votre entreprise.",
    href: "/services/controle-de-gestion/",
  },
  {
    icon: Briefcase,
    title: "DAF externalisé",
    subtitle: "à coût maîtrisé",
    desc: "Un Directeur Administratif et Financier à temps partiel. Vos décisions financières sont enfin éclairées.",
    href: "/services/daf-externalise/",
  },
  {
    icon: TrendingUp,
    title: "Trésorerie prévisionnelle",
    subtitle: "anticipée chaque mois",
    desc: "Un prévisionnel actualisé chaque mois. Vous voyez les tensions 3 mois à l'avance.",
    href: "/services/tresorerie/",
  },
];

const painPoints = [
  { icon: TrendingDown, title: "Trésorerie floue", desc: "Vous facturez, mais votre compte est souvent plus vide que prévu." },
  { icon: Eye, title: "Fiscalité subie", desc: "Vous découvrez votre charge fiscale en fin d'année — trop tard pour agir." },
  { icon: HelpCircle, title: "Décisions à l'aveugle", desc: "Les grandes entreprises ont un DAF — pourquoi pas vous ?" },
];

const successStories = [
  {
    tag: "Étude de cas",
    date: "01.06.2024",
    title: "+40% de marge nette en 8 mois grâce au pilotage mensuel",
    image: meetingWarm,
    big: true,
  },
  {
    tag: "Témoignage",
    date: "12.07.2024",
    title: "Une trésorerie enfin anticipée, sans stress de fin de mois",
    image: dafMeeting,
    big: false,
  },
  {
    tag: "Étude de cas",
    date: "20.08.2024",
    title: "Création d'entreprise structurée dès le jour 1 avec MFinances",
    image: equipeSourire,
    big: false,
  },
];

const team = [
  { name: "Mika Musungayi", role: "Fondateur — Expert-comptable ITAA", image: mikaPhoto },
  { name: "Équipe Conseil", role: "DAF & Contrôle de gestion", image: dafMeeting },
  { name: "Équipe Comptabilité", role: "Production & Fiscalité", image: equipePhoto },
  { name: "Service Client", role: "Bilingue FR / EN", image: equipeSourire },
];

const steps = [
  { num: "01", icon: Search, title: "Comprendre", desc: "Nous analysons votre situation réelle. Vous savez enfin où vous en êtes — sans jargon." },
  { num: "02", icon: Settings, title: "Structurer", desc: "Budget, tableaux de bord, prévisionnel. Votre entreprise a enfin un vrai cockpit financier." },
  { num: "03", icon: Zap, title: "Anticiper", desc: "Chaque mois, on challenge vos décisions. Vous pilotez avec un temps d'avance." },
];

const plans = [
  { label: "ESSENTIEL", price: "350", subtitle: "Pour sécuriser vos bases", features: ["Comptabilité complète", "Déclarations fiscales", "Expert dédié"], popular: false },
  { label: "PREMIUM", price: "450", subtitle: "Pour structurer votre croissance", features: ["Tout Essentiel +", "Contrôle de gestion mensuel", "Trésorerie prévisionnelle"], popular: true },
  { label: "EXCELLENCE", price: "650", subtitle: "Pour piloter comme un grand", features: ["Tout Premium +", "DAF à temps partiel", "Modélisation décisionnelle"], popular: false },
];

const faqs = [
  { q: "C'est quoi un DAF externalisé ?", a: "Un DAF externalisé est un Directeur Administratif et Financier mis à disposition à temps partiel. Il assure le pilotage financier de votre entreprise sans les coûts d'un recrutement en interne." },
  { q: "Combien coûte un expert-comptable pour une TPE en Belgique ?", a: "Chez MFinances, les forfaits démarrent à 350€ HTVA/mois (Essentiel), 450€ (Premium), 650€ (Excellence). Engagement annuel avec tacite reconduction." },
  { q: "Quel expert-comptable pour une TPE en croissance à Bruxelles ?", a: "MFinances est un cabinet d'expertise comptable premium à Bruxelles, spécialisé dans le pilotage financier des TPE en croissance." },
  { q: "Comment gérer la trésorerie d'une TPE en croissance ?", a: "Via un prévisionnel mensuel actualisé, une réserve de 3 mois de charges fixes, et un suivi des délais clients. MFinances intègre ce suivi dans le forfait Excellence." },
  { q: "Êtes-vous disponibles toute l'année ?", a: "Oui. Vous avez un interlocuteur dédié, joignable par téléphone et email tout au long de l'année — pas seulement en période fiscale." },
];

const news = [
  { tag: "Trésorerie", date: "15 mars 2025", title: "5 indicateurs de trésorerie à suivre chaque mois pour piloter sereinement", image: meetingWarm },
  { tag: "Pilotage", date: "28 mars 2025", title: "Pourquoi un DAF externalisé peut transformer une TPE en croissance", image: dafMeeting },
];

/* ----------------------------- PAGE ----------------------------- */

export default function AccueilV2() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="MFinances v2 — Pilotage TPE Bruxelles"
        description="Cabinet d'expertise comptable à Bruxelles. Contrôle de gestion, DAF externalisé et trésorerie prévisionnelle pour TPE en croissance."
        canonical="https://mfinances.be/accueilv2/"
      />
      <Header />
      <main>
        {/* ============== HERO (full-width) ============== */}
        <section className="relative">
          <div className="relative overflow-hidden bg-primary w-full min-h-[640px] md:min-h-[760px] lg:min-h-[820px]">
            <img
              src={equipePhoto}
              alt="Équipe MFinances en réunion"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/85 via-primary/30 to-transparent" />

            {/* Floating dark card */}
            <div
              className={`absolute top-12 md:top-24 right-4 md:right-12 lg:right-24 max-w-[520px] bg-foreground text-background rounded-3xl p-7 md:p-10 shadow-2xl transition-all duration-1000 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-[34px] md:text-[52px] leading-[1.05] text-background">
                Votre <span className="italic">partenaire financier</span> de pilotage.
              </h1>
              <p className="mt-5 text-background/70 text-[14.5px] leading-relaxed">
                Pilotage des TPE avec une approche éditoriale, des recommandations
                actionnables et un vrai DAF à vos côtés.
              </p>
              <Button
                variant="accent"
                size="lg"
                className="mt-6 rounded-full pl-6 pr-3 group h-12"
                asChild
              >
                <Link to="/diagnostic/">
                  <span className="flex items-center gap-3">
                    Diagnostic gratuit
                    <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <ArrowUpRight size={14} />
                    </span>
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Bottom split bar — full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="bg-card border-y border-border/60 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
              <p className="font-display italic text-[22px] md:text-[28px] text-primary">
                Discutons & Démarrons
              </p>
              <Link
                to="/contact/"
                className="text-[12px] uppercase tracking-[0.18em] text-accent font-bold hover:gap-3 inline-flex items-center gap-2 transition-all"
              >
                Contact <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-accent text-accent-foreground border-y border-accent px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
              <p className="font-display text-[26px] md:text-[32px] leading-none">
                200+ <span className="text-[14px] font-body align-middle opacity-80">entreprises accompagnées</span>
              </p>
              <div className="flex -space-x-2">
                {[mikaPhoto, equipeSourire, dafMeeting].map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-accent overflow-hidden bg-card"
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full bg-card text-accent flex items-center justify-center text-sm font-bold border-2 border-accent">
                  <Plus size={14} strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* 3 features row — full width */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-border/60">
            {heroFeatures.map((f, i) => (
              <div
                key={f.title}
                className={`px-6 md:px-12 lg:px-20 py-7 flex items-start gap-4 ${i < 2 ? "md:border-r border-border/60" : ""}`}
              >
                <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center shrink-0">
                  <Check size={14} className="text-accent" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-semibold text-primary text-[14px]">{f.title}</p>
                  <p className="text-[12.5px] text-muted-foreground leading-relaxed mt-0.5">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ============== SERVICES ============== */}
        <section className="py-20 md:py-28">
          <div className="container-mf">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">— Nos services</span>
                <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] mt-3">
                  Un service de qualité.
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-muted-foreground text-[14.5px] leading-relaxed">
                  Trois services pensés comme une seule mission : faire de votre comptabilité
                  un véritable outil de pilotage.
                </p>
                <Link
                  to="/services/"
                  className="inline-flex items-center gap-2 mt-3 text-accent text-[12px] font-bold uppercase tracking-[0.15em] hover:gap-3 transition-all"
                >
                  Voir tout <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    to={s.href}
                    key={s.title}
                    className="group bg-card rounded-3xl p-7 border border-border/50 hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(27,43,94,0.08)] transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:rotate-[-6deg] transition-all">
                      <Icon size={22} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-[22px] text-primary leading-tight">{s.title}</h3>
                    <p className="text-accent text-[12px] italic mt-1">{s.subtitle}</p>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] mt-4">{s.desc}</p>
                    <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between text-[13px] font-semibold text-primary group-hover:text-accent transition-colors">
                      <span>En savoir plus</span>
                      <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============== ABOUT / CLIENTS ============== */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container-mf">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">— À propos</span>
                <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05] mt-3">
                  200+ TPE pilotent <br/>
                  <span className="italic">sereinement</span> avec MFinances.
                </h2>
                <p className="text-muted-foreground text-[15px] leading-[1.75] mt-6 max-w-[520px]">
                  La plupart des dirigeants de TPE pilotent à l'aveugle — trésorerie floue,
                  résultats découverts trop tard. MFinances change ça : un vrai pilotage financier,
                  à un prix de PME.
                </p>
                <div className="mt-8 flex gap-3 flex-wrap">
                  <Button variant="default" size="lg" className="rounded-full" asChild>
                    <Link to="/services/">Nos services</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full" asChild>
                    <Link to="/contact/">Demande de contact <ArrowRight size={14} className="ml-1" /></Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[28px] overflow-hidden">
                  <img src={equipeSourire} alt="Équipe MFinances" className="w-full h-[420px] object-cover" />
                </div>
                {/* Floating chips */}
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  {painPoints.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div key={p.title} className="bg-card/95 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 shadow-md max-w-[260px]">
                        <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0">
                          <Icon size={13} className="text-accent-foreground" strokeWidth={2} />
                        </div>
                        <span className="text-[12px] font-semibold text-primary truncate">{p.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mission / Vision / Stat */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-border/60">
              <div>
                <div className="w-2 h-2 rounded-full bg-accent mb-3" />
                <p className="font-semibold text-primary text-[15px]">Notre mission</p>
                <p className="text-[13.5px] text-muted-foreground mt-2 leading-relaxed">
                  Donner à chaque dirigeant une vision claire et anticipée de ses finances.
                </p>
              </div>
              <div>
                <div className="w-2 h-2 rounded-full bg-accent mb-3" />
                <p className="font-semibold text-primary text-[15px]">Notre vision</p>
                <p className="text-[13.5px] text-muted-foreground mt-2 leading-relaxed">
                  Faire de la comptabilité un véritable levier de croissance pour les TPE.
                </p>
              </div>
              <div>
                <p className="font-display text-[44px] text-primary leading-none">
                  20<span className="text-accent">+</span>
                </p>
                <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mt-2">
                  Années d'expérience
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============== SUCCESS STORIES ============== */}
        <section className="py-20 md:py-28 bg-secondary">
          <div className="container-mf">
            <div className="flex items-end justify-between gap-6 mb-12">
              <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05] max-w-[520px]">
                Réussites de <br/> nos clients.
              </h2>
              <Link to="/blog/" className="hidden md:inline-flex items-center gap-2 text-accent text-[12px] font-bold uppercase tracking-[0.15em] hover:gap-3 transition-all">
                Voir tout <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Big card */}
              <div className="md:col-span-7 bg-card rounded-3xl overflow-hidden border border-border/50 group">
                <div className="relative h-72 md:h-96 overflow-hidden">
                  <img src={successStories[0].image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="bg-card/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                      {successStories[0].tag}
                    </span>
                    <span className="bg-card/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-medium text-muted-foreground">
                      {successStories[0].date}
                    </span>
                  </div>
                </div>
                <div className="p-7 flex items-end justify-between gap-4">
                  <h3 className="font-display text-[22px] md:text-[26px] leading-[1.2] max-w-[420px]">
                    {successStories[0].title}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>

              {/* Two stacked accent cards */}
              <div className="md:col-span-5 flex flex-col gap-5">
                {successStories.slice(1).map((s, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-3xl overflow-hidden border border-border/50 group ${i === 0 ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={s.image} alt="" className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-background/95 px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-primary">
                          {s.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex items-end justify-between gap-3">
                      <h3 className="font-display text-[17px] leading-[1.25] max-w-[260px]">
                        {s.title}
                      </h3>
                      <div className="w-9 h-9 rounded-full bg-background/15 flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============== WORDS FROM CLIENTS ============== */}
        <section className="py-20 md:py-28">
          <div className="container-mf">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4">
                <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05]">
                  Mots de <br/> nos clients.
                </h2>
                <div className="h-px w-16 bg-accent mt-6" />
                <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mt-4">
                  16 avis Google · 5,0/5
                </p>
              </div>
              <div className="lg:col-span-8">
                <Quote size={40} className="text-accent/30 mb-4" />
                <p className="font-display italic text-[22px] md:text-[28px] leading-[1.4] text-primary">
                  « Sans hésitation, je ne peux que recommander MFinances, tant pour son
                  professionnalisme, son accueil, sa réactivité lors d'un doute, son humanité. »
                </p>
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[12px] font-bold">
                      MR
                    </div>
                    <div>
                      <p className="font-semibold text-primary text-[14px]">Mari Carmen Rejas</p>
                      <p className="text-[12px] text-muted-foreground">Cliente MFinances</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============== TEAM / ADVISORS ============== */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container-mf">
            <div className="flex items-end justify-between gap-6 mb-12">
              <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05]">Notre équipe.</h2>
              <Link to="/a-propos/" className="hidden md:inline-flex items-center gap-2 text-accent text-[12px] font-bold uppercase tracking-[0.15em] hover:gap-3 transition-all">
                En savoir plus <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {team.map((m) => (
                <div key={m.name} className="group">
                  <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-secondary">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="font-semibold text-primary text-[15px] mt-4">{m.name}</p>
                  <p className="text-[12.5px] text-muted-foreground mt-0.5">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============== METHOD / STEPS ============== */}
        <section className="py-20 md:py-28 bg-primary">
          <div className="container-mf">
            <div className="text-center mb-14">
              <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">— Notre approche</span>
              <h2 className="font-display text-[34px] md:text-[48px] text-primary-foreground leading-[1.05] mt-3">
                Notre méthode en <span className="italic text-accent">3 étapes</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.num} className="bg-primary-dark/50 border border-primary-foreground/10 rounded-3xl p-7 hover:border-accent/40 transition-all relative overflow-hidden">
                    <span className="absolute top-4 right-5 font-display text-[64px] font-bold text-accent/15">{s.num}</span>
                    <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-5">
                      <Icon size={22} className="text-accent-foreground" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-[24px] text-primary-foreground">{s.title}</h3>
                    <p className="text-primary-foreground/60 text-[14px] leading-[1.7] mt-3">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============== PRICING ============== */}
        <section className="py-20 md:py-28">
          <div className="container-mf">
            <div className="text-center mb-14">
              <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">— Nos forfaits</span>
              <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05] mt-3">
                Des forfaits <span className="italic text-accent">transparents</span>.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {plans.map((p) => (
                <div
                  key={p.label}
                  className={`rounded-3xl p-8 flex flex-col ${p.popular ? "bg-primary text-primary-foreground shadow-xl md:-translate-y-3" : "bg-card border border-border/50"}`}
                >
                  <span className="text-accent text-[10px] font-bold tracking-[0.2em]">{p.label}</span>
                  <p className={`text-[13px] italic mt-1 ${p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.subtitle}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className={`font-display text-[52px] font-bold leading-none ${p.popular ? "text-primary-foreground" : "text-primary"}`}>{p.price}</span>
                    <span className="font-display text-[26px] text-accent font-bold">€</span>
                    <span className={`text-[12px] ml-1 ${p.popular ? "text-primary-foreground/55" : "text-muted-foreground"}`}>/mois HTVA</span>
                  </div>
                  <div className={`my-6 h-px ${p.popular ? "bg-primary-foreground/15" : "bg-border/60"}`} />
                  <ul className="space-y-3 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[14px]">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${p.popular ? "bg-accent" : "bg-accent/10"}`}>
                          <Check size={11} className={p.popular ? "text-accent-foreground" : "text-accent"} strokeWidth={3} />
                        </div>
                        <span className={p.popular ? "text-primary-foreground/85" : "text-foreground/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.popular ? "accent" : "outline"} size="lg" className="rounded-full mt-7" asChild>
                    <Link to="/tarifs/">Choisir {p.label.charAt(0) + p.label.slice(1).toLowerCase()}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============== Q&A ============== */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container-mf">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05]">
                  Questions & <br/> réponses.
                </h2>
                <p className="text-muted-foreground text-[14px] mt-5 max-w-sm leading-relaxed">
                  Tout ce que vous voulez savoir sur notre cabinet et notre approche.
                </p>
                <Button variant="default" size="lg" className="rounded-full mt-6" asChild>
                  <Link to="/contact/">Nous contacter</Link>
                </Button>
              </div>
              <div className="lg:col-span-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60">
                      <AccordionTrigger className="text-left font-semibold text-primary text-[15.5px] hover:no-underline py-5">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[14px] text-muted-foreground leading-[1.7] pb-5">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* ============== LATEST NEWS ============== */}
        <section className="py-20 md:py-28 bg-secondary">
          <div className="container-mf">
            <div className="flex items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05]">Dernières actualités.</h2>
                <p className="text-muted-foreground text-[13px] mt-3">Conseils, méthodes et cas pratiques pour piloter votre TPE.</p>
              </div>
              <Link to="/blog/" className="hidden md:inline-flex items-center gap-2 text-accent text-[12px] font-bold uppercase tracking-[0.15em] hover:gap-3 transition-all">
                Voir tout <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((n, i) => (
                <Link to="/blog/" key={i} className="group bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-[0_24px_60px_rgba(27,43,94,0.08)] transition-all">
                  <div className="p-6 pb-0">
                    <div className="flex gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{n.tag}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">· {n.date}</span>
                    </div>
                    <h3 className="font-display text-[20px] md:text-[22px] text-primary leading-[1.25]">
                      {n.title}
                    </h3>
                  </div>
                  <div className="relative mt-5 h-56 overflow-hidden">
                    <img src={n.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-card flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============== CONTACT CTA ============== */}
        <section className="py-20 md:py-28">
          <div className="container-mf text-center">
            <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05] max-w-[680px] mx-auto">
              Envie d'échanger&nbsp;? Contactez <span className="italic text-accent">notre équipe</span>.
            </h2>
            <p className="text-muted-foreground text-[14px] mt-5 max-w-md mx-auto">
              Notre équipe amicale est là pour répondre à vos questions.
            </p>
            <div className="mt-8 flex gap-3 justify-center flex-wrap">
              <Button variant="default" size="lg" className="rounded-full" asChild>
                <Link to="/contact/">Nous contacter</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link to="/diagnostic/">Diagnostic gratuit</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
