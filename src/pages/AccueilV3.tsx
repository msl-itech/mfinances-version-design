import { useEffect, useRef, useState } from "react";
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
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import equipePhoto from "@/assets/mfinances-equipe-travail.png";
import equipeSourire from "@/assets/mfinances-equipe-sourire.jpg";
import mikaPhoto from "@/assets/mika-musungayi.png";
import imgControle from "@/assets/service-controle-gestion.jpg";
import imgDaf from "@/assets/service-daf-externalise.jpg";
import imgTresorerie from "@/assets/service-tresorerie.jpg";
import dafMeeting from "@/assets/daf-meeting-team.png";
import audIndependants from "@/assets/audience-independants.webp";
import audHoreca from "@/assets/audience-commerce-horeca.webp";
import audSante from "@/assets/audience-sante.webp";
import audCroissance from "@/assets/audience-croissance.webp";
import audPromoteurs from "@/assets/audience-promoteurs.webp";

/* ============================================================
   DATA — texts strictly identical to V2
   ============================================================ */

const heroFeatures = [
  { title: "Vision claire", desc: "Vous savez exactement où va votre argent — chaque mois." },
  { title: "Conseil expert", desc: "20+ ans d'expérience au service de votre pilotage." },
  { title: "Support efficace", desc: "Une équipe dédiée, réactive et 100% bilingue FR/EN." },
];

const painPoints = [
  { icon: TrendingDown, title: "Trésorerie floue", desc: "Vous facturez, mais votre compte est souvent plus vide que prévu. Vous ne savez pas ce que sera votre trésorerie dans 60 jours." },
  { icon: Eye, title: "Fiscalité subie", desc: "Vous découvrez votre charge fiscale en fin d'année — quand il est trop tard pour agir. Chaque surprise coûte cher." },
  { icon: HelpCircle, title: "Décisions à l'aveugle", desc: "Ce n'est pas une question de talent. C'est un problème d'outils. Les grandes entreprises ont un DAF — pourquoi pas vous ?" },
];

const services = [
  { icon: BarChart2, title: "Contrôle de gestion", subtitle: "à temps partiel", desc: "Tableaux de bord, indicateurs clés, suivi mensuel. Vous savez exactement où en est votre entreprise.", href: "/services/controle-de-gestion/", image: imgControle, tag: "Pilotage", features: ["Tableaux de bord mensuels", "Indicateurs clés métier", "Reporting actionnable"] },
  { icon: Briefcase, title: "DAF externalisé", subtitle: "à coût maîtrisé", desc: "Un Directeur Administratif et Financier à temps partiel. Vos décisions financières sont enfin éclairées.", href: "/services/daf-externalise/", image: imgDaf, tag: "Stratégie", features: ["Stratégie financière", "Aide à la décision", "Modélisation"], featured: true },
  { icon: TrendingUp, title: "Trésorerie prévisionnelle", subtitle: "anticipée chaque mois", desc: "Un prévisionnel actualisé chaque mois. Vous voyez les tensions 3 mois à l'avance.", href: "/services/tresorerie/", image: imgTresorerie, tag: "Anticipation", features: ["Prévisionnel à 90 jours", "Alertes anticipées", "Plan d'action"] },
];

const steps = [
  { num: "01", icon: Search, title: "Comprendre", desc: "Nous analysons votre situation réelle. Vous savez enfin où vous en êtes — sans jargon." },
  { num: "02", icon: Settings, title: "Structurer", desc: "Budget, tableaux de bord, prévisionnel. Votre entreprise a enfin un vrai cockpit financier." },
  { num: "03", icon: Zap, title: "Anticiper", desc: "Chaque mois, on challenge vos décisions. Vous pilotez avec un temps d'avance." },
];

const audiences = [
  { label: "Indépendants & Startups", href: "/qui-nous-accompagnons/independants-et-startups/", image: audIndependants, tag: "Démarrage" },
  { label: "Commerce & Horeca", href: "/qui-nous-accompagnons/commerce-et-horeca/", image: audHoreca, tag: "Terrain" },
  { label: "Professions de santé", href: "/qui-nous-accompagnons/professions-de-sante/", image: audSante, tag: "Libéral" },
  { label: "Entreprises en croissance", href: "/qui-nous-accompagnons/entreprises-en-croissance/", image: audCroissance, tag: "Scale-up" },
  { label: "Promoteurs immobiliers", href: "/qui-nous-accompagnons/promoteurs-immobiliers/", image: audPromoteurs, tag: "Immobilier" },
];

const plans = [
  { label: "ESSENTIEL", price: "350", subtitle: "Pour sécuriser vos bases", features: ["Comptabilité complète", "Déclarations fiscales", "Expert dédié"], popular: false },
  { label: "PREMIUM", price: "450", subtitle: "Pour structurer votre croissance", features: ["Tout Essentiel +", "Contrôle de gestion mensuel", "Trésorerie prévisionnelle"], popular: true },
  { label: "EXCELLENCE", price: "650", subtitle: "Pour piloter comme un grand", features: ["Tout Premium +", "DAF à temps partiel", "Modélisation décisionnelle"], popular: false },
];

const reviews = [
  { name: "Mari Carmen Rejas Martin", text: "Sans hésitation, je ne peux que recommander MFinances, tant pour son professionnalisme, son accueil, sa réactivité lors d'un doute, son humanité etc." },
  { name: "Audrey Pepka épouse Mbog", text: "Tellement satisfaite du service accordé par MFinances ! Je recommande vivement." },
  { name: "Luc Jeazet", text: "MFINANCES MERCI !! Avec Mika et sa merveilleuse équipe, mon entreprise a pris un vrai tournant." },
  { name: "rann rann", text: "En tant qu'entrepreneur à Bruxelles avec plusieurs activités dans des secteurs différents, j'avais besoin d'un accompagnement sur mesure. MFinances a parfaitement répondu à mes attentes." },
  { name: "fitness Move", text: "Super expérience avec MFINANCES ! En tant qu'indépendant basé à Lot, je n'ai aucune formation en finance et j'avais besoin d'un vrai accompagnement. Service impeccable." },
  { name: "Sandra", text: "Je fais appel à MFINANCES depuis plusieurs années pour ma déclaration d'impôt, et c'est l'une des meilleures décisions que j'ai prises." },
  { name: "Sophie acdp", text: "J'utilise les services de MFinances depuis près de 3 ans. Plus qu'un comptable, Mika se montre disponible pour mes questions et m'accompagne au quotidien." },
  { name: "Yannick Nguangu", text: "Mon entreprise se porte mieux grâce à Mfinances. Suivi et conseils exceptionnels et personnalisés : tout est clair et transparent." },
  { name: "Verdilamil", text: "J'ai la chance d'avoir croisé le chemin de MFINANCES. Cela fait déjà trois ans que je ne me fais plus de soucis pour ma comptabilité." },
  { name: "Rkia Chadili", text: "Excellent service, rapidité, efficacité, professionnalisme, bref tout ce qu'un(e) professionnel(le) a besoin pour mener son activité sereinement." },
  { name: "Paulo Verwacht", text: "En tant qu'étudiant on ne s'attend pas à devoir rentrer une déclaration d'impôts. Sans l'assistance de Mr Mika, je n'y serais jamais arrivé. Merci !" },
  { name: "Cindie Adonai", text: "Un service de qualité, mais surtout complet, ce qui est très rare. Je recommande à 100 %." },
  { name: "Hayat Karim", text: "MFinances fait preuve d'un sérieux et d'une précision exemplaire. Mika et ses collaborateurs sont très professionnels." },
  { name: "Magalie Kanga", text: "Service au top." },
  { name: "Pedro Soares", text: "Très satisfaits de leurs services. Des prix raisonnables et un service au top !" },
  { name: "The Global Bird", text: "Very nice staff, thank you!" },
];

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

const faqs = [
  { q: "C'est quoi un DAF externalisé ?", a: "Un DAF externalisé est un Directeur Administratif et Financier mis à disposition à temps partiel. Il assure le pilotage financier de votre entreprise — analyse des performances, aide à la décision, modélisation financière — sans les coûts d'un recrutement en interne. Chez MFinances, 150€ HTVA/heure, réservé aux clients Excellence." },
  { q: "Combien coûte un expert-comptable pour une TPE en Belgique ?", a: "Chez MFinances, les forfaits démarrent à 350€ HTVA/mois (Essentiel), 450€ HTVA/mois (Premium avec contrôle de gestion trimestriel), 650€ HTVA/mois (Excellence avec trésorerie prévisionnelle mensuelle et accès DAF). Engagement annuel avec tacite reconduction." },
  { q: "Quel expert-comptable pour une TPE en croissance à Bruxelles ?", a: "MFinances est un cabinet d'expertise comptable premium à Bruxelles, spécialisé dans le pilotage financier des TPE en croissance. Contrôle de gestion, DAF externalisé et trésorerie prévisionnelle intégrés dans les forfaits." },
  { q: "Comment gérer la trésorerie d'une TPE en croissance ?", a: "Via un prévisionnel mensuel actualisé sur données réelles, une réserve de 3 mois de charges fixes, et un suivi des délais clients. MFinances intègre ce suivi dans le forfait Excellence." },
];

const marqueeChips = ["Pilotage financier", "DAF externalisé", "Trésorerie", "Contrôle de gestion", "Expert-comptable Bruxelles", "TPE en croissance"];

/* ============================================================
   Decorative — petits carrés géométriques (style Axios)
   ============================================================ */
function SquaresDecor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none flex items-start gap-2 ${className}`}>
      <span className="block w-4 h-4 bg-primary" />
      <span className="block w-4 h-4 border-2 border-primary" />
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function AccueilV3() {
  const [mounted, setMounted] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setReviewIndex((i) => (i + 1) % reviews.length), 5500);
    return () => clearInterval(t);
  }, []);

  const currentReview = reviews[reviewIndex];

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  return (
    <div className="min-h-screen bg-background" ref={root}>
      <SEOHead
        title="MFinances v3 — Pilotage TPE Bruxelles"
        description="Cabinet d'expertise comptable à Bruxelles. Contrôle de gestion, DAF externalisé et trésorerie prévisionnelle pour TPE en croissance."
        canonical="https://mfinances.be/accueilv3/"
      />
      <Header />
      <main>
        {/* ============== HERO — style Axios (pills inside H1) ============== */}
        <section className="relative">
          <div className="relative overflow-hidden bg-primary w-full min-h-[640px] md:min-h-[760px] lg:min-h-[820px]">
            {/* Image équipe en arrière-plan, désaturée */}
            <img
              src={equipePhoto}
              alt="Équipe MFinances en réunion"
              className="absolute inset-0 w-full h-full object-cover object-center md:object-top opacity-55 grayscale"
            />
            {/* Voile sombre */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 via-primary/60 to-primary/85" />

            <div className="container-mf relative z-10 pt-28 md:pt-36 pb-20 md:pb-28">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* H1 avec pills */}
                <div className="lg:col-span-8">
                  <h1
                    className="font-display font-bold text-primary-foreground tracking-[-0.02em] leading-[1.02]"
                    style={{ fontSize: "clamp(32px, 4.6vw, 68px)" }}
                  >
                    Vous travaillez{" "}
                    <span className="inline-flex items-center align-middle bg-accent text-accent-foreground rounded-full px-5 py-1 mx-1 -translate-y-1">
                      dur.
                    </span>
                    <br />
                    Mais votre{" "}
                    <span className="italic font-normal">entreprise</span>
                    <br />
                    gagne-t-elle{" "}
                    <span className="inline-flex items-center align-middle bg-accent text-accent-foreground rounded-full px-5 py-1 mx-1 -translate-y-1 italic font-normal">
                      vraiment
                    </span>
                    <br />
                    de l'argent ?
                  </h1>
                </div>

                {/* Côté droit : description + CTA + badge circulaire */}
                <div className="lg:col-span-4 flex flex-col justify-center gap-8 relative">
                  <p className="text-primary-foreground/85 text-[15px] md:text-[16px] leading-[1.65] max-w-md">
                    Cabinet d'expertise comptable premium à Bruxelles. Pilotage financier,
                    DAF externalisé et trésorerie prévisionnelle pour TPE en croissance.
                    Un vrai pilotage, à un prix de PME.
                  </p>

                  <div className="flex items-center gap-5">
                    <Button
                      variant="accent"
                      size="lg"
                      className="rounded-full pl-7 pr-3 group h-14 text-[15px]"
                      asChild
                    >
                      <Link to="/diagnostic/" data-magnetic>
                        <span className="flex items-center gap-3">
                          Diagnostic gratuit
                          <span className="w-9 h-9 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                            <ArrowUpRight size={15} />
                          </span>
                        </span>
                      </Link>
                    </Button>

                    {/* Badge circulaire rotatif "SINCE..." */}
                    <div className="relative w-[110px] h-[110px] hidden md:block shrink-0">
                      <svg
                        viewBox="0 0 110 110"
                        className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite]"
                      >
                        <defs>
                          <path
                            id="circlePath-v3"
                            d="M 55,55 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                          />
                        </defs>
                        <text
                          fill="hsl(var(--primary-foreground))"
                          fontSize="9"
                          fontWeight="700"
                          letterSpacing="3"
                          fontFamily="Arial, sans-serif"
                        >
                          <textPath href="#circlePath-v3">
                            • CABINET PREMIUM • BRUXELLES • DEPUIS 20+ ANS
                          </textPath>
                        </text>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                          <ArrowUpRight size={20} className="text-accent-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MARQUEE BAR ACCENT (style Axios — pills + étoiles) */}
          <div className="bg-accent text-accent-foreground py-4 overflow-hidden border-y border-accent">
            <div className="flex gap-10 animate-marquee whitespace-nowrap will-change-transform">
              {[...marqueeChips, ...marqueeChips, ...marqueeChips].map((item, i) => (
                <div key={i} className="flex items-center gap-10 shrink-0">
                  <span className="text-[14px] font-semibold tracking-wide">{item}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0" fill="currentColor">
                    <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* 3 features row */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-border/60 bg-background" data-anim="stagger" data-stagger="0.12">
            {heroFeatures.map((f, i) => (
              <div
                key={f.title}
                className={`px-6 md:px-12 lg:px-20 py-7 flex items-start gap-4 ${i < 2 ? "md:border-r border-border/60" : ""}`}
              >
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <Check size={14} className="text-accent-foreground" strokeWidth={3} />
                </div>
                <div>
                  <p className="font-semibold text-primary text-[14px]">{f.title}</p>
                  <p className="text-[12.5px] text-muted-foreground leading-relaxed mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============== 02 · CONSTAT — style Axios "problems" ============== */}
        <section className="py-20 md:py-28 bg-card relative overflow-hidden">
          <div className="container-mf relative">
            {/* Header avec barre tiret + carrés à droite (Axios) */}
            <div className="flex items-start justify-between gap-6 mb-12">
              <div className="flex items-start gap-4 max-w-3xl">
                <span className="block w-10 h-px bg-accent mt-7" />
                <div>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">— 02 · Le constat</span>
                  <h2
                    className="font-display text-[36px] md:text-[52px] leading-[1.05] mt-3"
                    data-anim="split"
                  >
                    Fin de mois tendu. Décisions au feeling.<br />
                    <span className="italic font-normal">Où est passé l'argent ?</span>
                  </h2>
                </div>
              </div>
              <SquaresDecor className="hidden md:flex pt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8" data-anim="stagger" data-stagger="0.1">
              {painPoints.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    data-tilt
                    data-tilt-max="5"
                    className="group bg-background rounded-3xl p-7 border border-border/40 hover:border-accent/40 transition-all relative"
                  >
                    {/* Petit numéro coin */}
                    <span className="absolute top-5 right-5 text-[11px] font-bold tracking-[0.22em] text-foreground/30">
                      0{idx + 1}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-6deg]">
                      <Icon size={24} className="text-accent-foreground" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-[24px] text-primary mt-6 leading-tight">{p.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] mt-3">{p.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-14 flex items-center justify-center gap-5">
              <Link
                to="/diagnostic/"
                className="group inline-flex items-center gap-3 text-accent text-[13px] font-bold uppercase tracking-[0.14em] hover:gap-4 transition-all"
              >
                <span className="w-10 h-px bg-accent transition-all duration-300 group-hover:w-14" />
                Plus maintenant — faites le diagnostic
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============== 03 · SERVICES — style Axios "explore service" ============== */}
        <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
          <div className="container-mf relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="flex items-start gap-4 max-w-2xl">
                <span className="block w-10 h-px bg-accent mt-7" />
                <div>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">— 03 · Nos solutions</span>
                  <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] mt-3" data-anim="split">
                    Un cabinet comptable<br />
                    <span className="italic font-normal">nouvelle génération.</span>
                  </h2>
                </div>
              </div>
              <SquaresDecor className="hidden md:flex pt-4" />
            </div>

            {/* Grille de cartes — style Axios avec coin "encoché" et carte centrale dark */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-anim="stagger" data-stagger="0.12">
              {services.map((s) => {
                const Icon = s.icon;
                const isFeatured = s.featured;
                return (
                  <Link
                    to={s.href}
                    key={s.title}
                    data-tilt
                    data-tilt-max="5"
                    className={`group relative rounded-3xl p-7 border transition-all flex flex-col ${
                      isFeatured
                        ? "bg-primary text-primary-foreground border-primary md:-translate-y-3 shadow-[0_24px_60px_rgba(27,43,94,0.20)]"
                        : "bg-background border-border/50 hover:border-accent/40"
                    }`}
                  >
                    {/* Tag coin haut */}
                    <span className={`inline-flex w-fit items-center text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full mb-5 ${
                      isFeatured ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent"
                    }`}>
                      {s.tag}
                    </span>

                    {/* Icône carrée */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                      isFeatured ? "bg-accent" : "bg-primary"
                    }`}>
                      <Icon size={24} className={isFeatured ? "text-accent-foreground" : "text-primary-foreground"} strokeWidth={1.75} />
                    </div>

                    <h3 className={`font-display text-[24px] leading-tight ${
                      isFeatured ? "text-primary-foreground" : "text-primary"
                    }`}>{s.title}</h3>
                    <p className={`text-[12px] italic mt-1 ${
                      isFeatured ? "text-accent" : "text-accent"
                    }`}>{s.subtitle}</p>

                    <p className={`text-[14px] leading-[1.65] mt-4 ${
                      isFeatured ? "text-primary-foreground/75" : "text-muted-foreground"
                    }`}>{s.desc}</p>

                    {/* Checklist verte/accent (style Axios) */}
                    <ul className={`mt-6 pt-5 space-y-2.5 border-t flex-1 ${
                      isFeatured ? "border-primary-foreground/15" : "border-border/50"
                    }`}>
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-[13px]">
                          <span className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 ${
                            isFeatured ? "bg-accent" : "bg-accent"
                          }`}>
                            <Check size={10} className="text-accent-foreground" strokeWidth={3.5} />
                          </span>
                          <span className={isFeatured ? "text-primary-foreground/85" : "text-foreground/80"}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA flèche (style Axios — petit cercle accent en bas) */}
                    <div className={`mt-6 pt-5 border-t flex items-center justify-between ${
                      isFeatured ? "border-primary-foreground/15" : "border-border/50"
                    }`}>
                      <span className={`text-[13px] font-semibold ${
                        isFeatured ? "text-primary-foreground" : "text-primary group-hover:text-accent"
                      } transition-colors`}>En savoir plus</span>
                      <span className="w-9 h-9 rounded-full bg-accent flex items-center justify-center group-hover:rotate-45 transition-transform">
                        <ArrowUpRight size={15} className="text-accent-foreground" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============== 04 · MÉTHODE (3 étapes — fond sombre) ============== */}
        <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
          <div className="container-mf relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="flex items-start gap-4 max-w-2xl">
                <span className="block w-10 h-px bg-accent mt-7" />
                <div>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">— 04 · Notre approche</span>
                  <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] mt-3 text-primary-foreground" data-anim="split">
                    Notre méthode<br />
                    <span className="italic font-normal">en 3 étapes.</span>
                  </h2>
                </div>
              </div>
              <div aria-hidden="true" className="hidden md:flex items-start gap-2 pt-4">
                <span className="block w-4 h-4 bg-accent" />
                <span className="block w-4 h-4 border-2 border-accent" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-anim="stagger" data-stagger="0.12">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.num}
                    data-tilt
                    data-tilt-max="5"
                    className="bg-primary-dark/60 border border-primary-foreground/10 rounded-3xl p-8 hover:border-accent/40 transition-colors relative overflow-hidden"
                  >
                    <span className="absolute top-5 right-6 font-display text-[72px] font-bold text-accent/15 leading-none">{s.num}</span>
                    <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5">
                      <Icon size={24} className="text-accent-foreground" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-[26px] text-primary-foreground">{s.title}</h3>
                    <p className="text-primary-foreground/65 text-[14px] leading-[1.7] mt-3">{s.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-14" data-anim="fade-up">
              <Button variant="accent" size="lg" className="rounded-full px-10 group" asChild>
                <Link to="/diagnostic/">
                  Commencer mon diagnostic gratuit
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ============== 05 · POUR QUI ============== */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="container-mf relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="flex items-start gap-4 max-w-2xl">
                <span className="block w-10 h-px bg-accent mt-7" />
                <div>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">— 05 · Pour qui</span>
                  <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] mt-3" data-anim="split">
                    Les dirigeants qui ont<br />
                    <span className="italic font-normal">décidé de grandir.</span>
                  </h2>
                </div>
              </div>
              <SquaresDecor className="hidden md:flex pt-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4" data-anim="stagger" data-stagger="0.08">
              {audiences.map((a, i) => (
                <Link
                  key={a.label}
                  to={a.href}
                  data-tilt
                  data-tilt-max="6"
                  className="group relative rounded-3xl overflow-hidden block aspect-[3/4] md:aspect-[3/4.4] shadow-[0_8px_24px_rgba(27,43,94,0.06)] hover:shadow-[0_28px_70px_rgba(27,43,94,0.22)] transition-shadow duration-500"
                >
                  <img
                    src={a.image}
                    alt={a.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-transparent transition-opacity duration-500 group-hover:from-primary/95" />

                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className="font-display text-[12px] text-primary-foreground/80 tracking-[0.2em] font-bold">0{i + 1}</span>
                    <span className="bg-accent text-accent-foreground text-[9px] font-bold px-2.5 py-1 rounded-full tracking-[0.14em] uppercase">
                      {a.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="h-px w-8 bg-accent mb-3 transition-all duration-500 group-hover:w-16" />
                    <h3 className="font-display text-[17px] md:text-[19px] text-primary-foreground leading-[1.15]">{a.label}</h3>
                    <span className="inline-flex items-center gap-1.5 text-[10.5px] text-accent font-bold mt-2 uppercase tracking-[0.14em] group-hover:gap-2.5 transition-all">
                      Découvrir <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============== 06 · TÉMOIGNAGES ============== */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container-mf">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4">
                <div className="flex items-start gap-4">
                  <span className="block w-10 h-px bg-accent mt-3" />
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">— 06 · Témoignages</span>
                    <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05] mt-3" data-anim="split">
                      Ils nous font<br /><span className="italic font-normal">confiance.</span>
                    </h2>
                  </div>
                </div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mt-6 ml-14">
                  {reviews.length} avis Google · 5,0/5
                </p>

                <div className="flex items-center gap-3 mt-8 ml-14">
                  <button
                    onClick={() => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                    aria-label="Précédent"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setReviewIndex((i) => (i + 1) % reviews.length)}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                    aria-label="Suivant"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <span className="font-display text-[13px] text-muted-foreground tracking-wider ml-2">
                    {String(reviewIndex + 1).padStart(2, "0")}
                    <span className="text-foreground/30"> / {String(reviews.length).padStart(2, "0")}</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 relative">
                <div key={reviewIndex} className="animate-fade-in bg-background rounded-3xl p-8 md:p-10 border border-border/50">
                  <Quote size={40} className="text-accent/30 mb-4" />
                  <p className="font-display italic text-[22px] md:text-[28px] leading-[1.4] text-primary min-h-[180px] md:min-h-[160px]">
                    « {currentReview.text} »
                  </p>
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-[12px] font-bold">
                        {getInitials(currentReview.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-primary text-[14px]">{currentReview.name}</p>
                        <p className="text-[11px] text-muted-foreground">Avis Google vérifié</p>
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
          </div>
        </section>

        {/* ============== 07 · LE FONDATEUR ============== */}
        <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
          <div className="container-mf relative">
            <div className="flex items-start gap-4 mb-12 max-w-3xl">
              <span className="block w-10 h-px bg-accent mt-7" />
              <div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">— 07 · Le fondateur</span>
                <h2 className="font-display text-[34px] md:text-[50px] leading-[1.05] mt-3" data-anim="split">
                  L'expérience d'un DAF,<br />
                  <span className="italic font-normal">la proximité d'un cabinet.</span>
                </h2>
              </div>
            </div>

            <div className="bg-primary rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(27,43,94,0.20)] grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
              <div className="relative min-h-[420px] lg:min-h-[520px] overflow-hidden">
                <img src={mikaPhoto} alt="Mika Musungayi" className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary/40" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-primary-foreground text-[24px] leading-none">
                    Mika <span className="italic text-accent">Musungayi</span>
                  </p>
                  <p className="text-[11px] text-primary-foreground/75 mt-2 uppercase tracking-[0.18em]">
                    Expert-comptable · Fondateur · ITAA
                  </p>
                </div>
              </div>
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                <Quote size={40} className="text-accent/40 mb-4" />
                <blockquote className="font-display italic font-light text-[20px] md:text-[26px] text-primary-foreground leading-[1.35]">
                  Après 20 ans à accompagner des centaines de dirigeants, je sais qu'une bonne comptabilité ne suffit pas.
                  Il faut un vrai suivi, une <span className="text-accent">vraie stratégie financière</span>.
                </blockquote>
                <div className="mt-8 grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/10">
                  <div>
                    <p className="font-display text-[28px] text-primary-foreground">20<span className="text-accent">+</span></p>
                    <p className="text-[11px] text-primary-foreground/55 uppercase tracking-wider mt-1">ans d'exp.</p>
                  </div>
                  <div>
                    <p className="font-display text-[28px] text-primary-foreground">200<span className="text-accent">+</span></p>
                    <p className="text-[11px] text-primary-foreground/55 uppercase tracking-wider mt-1">dirigeants</p>
                  </div>
                  <div>
                    <p className="font-display text-[28px] text-primary-foreground">FR<span className="text-accent">/</span>EN</p>
                    <p className="text-[11px] text-primary-foreground/55 uppercase tracking-wider mt-1">bilingue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============== 08 · TARIFS ============== */}
        <section className="py-20 md:py-28">
          <div className="container-mf">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="flex items-start gap-4 max-w-2xl">
                <span className="block w-10 h-px bg-accent mt-7" />
                <div>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">— 08 · Nos forfaits</span>
                  <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] mt-3" data-anim="split">
                    Des forfaits<br /><span className="italic font-normal">transparents.</span>
                  </h2>
                </div>
              </div>
              <SquaresDecor className="hidden md:flex pt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch" data-anim="stagger" data-stagger="0.12">
              {plans.map((p) => (
                <div
                  key={p.label}
                  className={`rounded-3xl p-8 flex flex-col transition-all hover:-translate-y-1 ${p.popular ? "bg-primary text-primary-foreground shadow-xl md:-translate-y-3" : "bg-card border border-border/50"}`}
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
                        <div className="w-5 h-5 rounded-sm bg-accent flex items-center justify-center shrink-0">
                          <Check size={11} className="text-accent-foreground" strokeWidth={3} />
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

        {/* ============== 09 · FAQ ============== */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container-mf">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <div className="flex items-start gap-4">
                  <span className="block w-10 h-px bg-accent mt-7" />
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">— 09 · FAQ</span>
                    <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05] mt-3" data-anim="split">
                      Questions &<br /><span className="italic font-normal">réponses.</span>
                    </h2>
                  </div>
                </div>
                <p className="text-muted-foreground text-[14px] mt-6 max-w-sm leading-relaxed ml-14">
                  Tout ce que vous voulez savoir sur notre cabinet et notre approche.
                </p>
                <Button variant="default" size="lg" className="rounded-full mt-6 ml-14" asChild>
                  <Link to="/contact/">Nous contacter</Link>
                </Button>
              </div>
              <div className="lg:col-span-8" data-anim="fade-up" data-delay="0.15">
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

        {/* ============== 10 · CTA FINAL ============== */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="container-mf text-center relative">
            <span className="text-[11px] uppercase tracking-[0.22em] text-accent font-bold">— 10 · Bruxelles · Uccle</span>
            <h2 className="font-display text-[36px] md:text-[64px] leading-[1.02] max-w-[920px] mx-auto text-primary-foreground mt-5" data-anim="split">
              Prêt à reprendre le{" "}
              <span className="inline-flex items-center align-middle bg-accent text-accent-foreground rounded-full px-5 py-1 mx-1 -translate-y-1 italic font-normal">
                contrôle
              </span>{" "}
              de vos finances ?
            </h2>
            <p className="text-primary-foreground/70 text-[15px] mt-6 max-w-xl mx-auto" data-anim="fade-up" data-delay="0.2">
              Diagnostic gratuit en 3 minutes. Vous repartez avec votre score de risque trésorerie
              et 3 priorités d'action concrètes.
            </p>
            <div className="mt-10 flex gap-3 justify-center flex-wrap" data-anim="fade-up" data-delay="0.35">
              <Button variant="accent" size="lg" className="rounded-full px-8" asChild>
                <Link to="/diagnostic/">Lancer mon diagnostic gratuit</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/contact/">Nous contacter</Link>
              </Button>
            </div>
            <div className="mt-10 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-primary-foreground/55">
              <MapPin size={14} className="text-accent" />
              20 Rue de la Magnanerie, 1180 Uccle, Bruxelles
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
