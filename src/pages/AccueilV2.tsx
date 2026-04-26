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
   DATA — texts copied verbatim from the V1 homepage sections
   ============================================================ */

const heroFeatures = [
  { title: "Vision claire", desc: "Vous savez exactement où va votre argent — chaque mois." },
  { title: "Conseil expert", desc: "20+ ans d'expérience au service de votre pilotage." },
  { title: "Support efficace", desc: "Une équipe dédiée, réactive et 100% bilingue FR/EN." },
];

// V1 — PainSection
const painPoints = [
  {
    icon: TrendingDown,
    title: "Trésorerie floue",
    desc: "Vous facturez, mais votre compte est souvent plus vide que prévu. Vous ne savez pas ce que sera votre trésorerie dans 60 jours.",
  },
  {
    icon: Eye,
    title: "Fiscalité subie",
    desc: "Vous découvrez votre charge fiscale en fin d'année — quand il est trop tard pour agir. Chaque surprise coûte cher.",
  },
  {
    icon: HelpCircle,
    title: "Décisions à l'aveugle",
    desc: "Ce n'est pas une question de talent. C'est un problème d'outils. Les grandes entreprises ont un DAF — pourquoi pas vous ?",
  },
];

// V1 — SolutionSection
const services = [
  {
    icon: BarChart2,
    title: "Contrôle de gestion",
    subtitle: "à temps partiel",
    desc: "Tableaux de bord, indicateurs clés, suivi mensuel. Vous savez exactement où en est votre entreprise.",
    href: "/services/controle-de-gestion/",
    image: imgControle,
    tag: "Pilotage",
  },
  {
    icon: Briefcase,
    title: "DAF externalisé",
    subtitle: "à coût maîtrisé",
    desc: "Un Directeur Administratif et Financier à temps partiel. Vos décisions financières sont enfin éclairées.",
    href: "/services/daf-externalise/",
    image: imgDaf,
    tag: "Stratégie",
  },
  {
    icon: TrendingUp,
    title: "Trésorerie prévisionnelle",
    subtitle: "anticipée chaque mois",
    desc: "Un prévisionnel actualisé chaque mois. Vous voyez les tensions 3 mois à l'avance.",
    href: "/services/tresorerie/",
    image: imgTresorerie,
    tag: "Anticipation",
  },
];

// V1 — MethodSection
const steps = [
  { num: "01", icon: Search, title: "Comprendre", desc: "Nous analysons votre situation réelle. Vous savez enfin où vous en êtes — sans jargon." },
  { num: "02", icon: Settings, title: "Structurer", desc: "Budget, tableaux de bord, prévisionnel. Votre entreprise a enfin un vrai cockpit financier." },
  { num: "03", icon: Zap, title: "Anticiper", desc: "Chaque mois, on challenge vos décisions. Vous pilotez avec un temps d'avance." },
];

// V1 — AudienceSection
const audiences = [
  { label: "Indépendants & Startups", href: "/qui-nous-accompagnons/independants-et-startups/", image: audIndependants, tag: "Démarrage" },
  { label: "Commerce & Horeca", href: "/qui-nous-accompagnons/commerce-et-horeca/", image: audHoreca, tag: "Terrain" },
  { label: "Professions de santé", href: "/qui-nous-accompagnons/professions-de-sante/", image: audSante, tag: "Libéral" },
  { label: "Entreprises en croissance", href: "/qui-nous-accompagnons/entreprises-en-croissance/", image: audCroissance, tag: "Scale-up" },
  { label: "Promoteurs immobiliers", href: "/qui-nous-accompagnons/promoteurs-immobiliers/", image: audPromoteurs, tag: "Immobilier" },
];

// V1 — PricingSection
const plans = [
  { label: "ESSENTIEL", price: "350", subtitle: "Pour sécuriser vos bases", features: ["Comptabilité complète", "Déclarations fiscales", "Expert dédié"], popular: false },
  { label: "PREMIUM", price: "450", subtitle: "Pour structurer votre croissance", features: ["Tout Essentiel +", "Contrôle de gestion mensuel", "Trésorerie prévisionnelle"], popular: true },
  { label: "EXCELLENCE", price: "650", subtitle: "Pour piloter comme un grand", features: ["Tout Premium +", "DAF à temps partiel", "Modélisation décisionnelle"], popular: false },
];

// V1 — TestimonialsSection (16 avis Google)
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

// V1 — homepage FAQ (Index.tsx)
const faqs = [
  { q: "C'est quoi un DAF externalisé ?", a: "Un DAF externalisé est un Directeur Administratif et Financier mis à disposition à temps partiel. Il assure le pilotage financier de votre entreprise — analyse des performances, aide à la décision, modélisation financière — sans les coûts d'un recrutement en interne. Chez MFinances, 150€ HTVA/heure, réservé aux clients Excellence." },
  { q: "Combien coûte un expert-comptable pour une TPE en Belgique ?", a: "Chez MFinances, les forfaits démarrent à 350€ HTVA/mois (Essentiel), 450€ HTVA/mois (Premium avec contrôle de gestion trimestriel), 650€ HTVA/mois (Excellence avec trésorerie prévisionnelle mensuelle et accès DAF). Engagement annuel avec tacite reconduction." },
  { q: "Quel expert-comptable pour une TPE en croissance à Bruxelles ?", a: "MFinances est un cabinet d'expertise comptable premium à Bruxelles, spécialisé dans le pilotage financier des TPE en croissance. Contrôle de gestion, DAF externalisé et trésorerie prévisionnelle intégrés dans les forfaits." },
  { q: "Comment gérer la trésorerie d'une TPE en croissance ?", a: "Via un prévisionnel mensuel actualisé sur données réelles, une réserve de 3 mois de charges fixes, et un suivi des délais clients. MFinances intègre ce suivi dans le forfait Excellence." },
];

/* ============================================================
   PAGE
   ============================================================ */

export default function AccueilV2() {
  const [mounted, setMounted] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setReviewIndex((i) => (i + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const currentReview = reviews[reviewIndex];

  // Wire GSAP reveals + tilt across the whole page after mount
  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  // Red glow following cursor inside the hero
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--glow-x", `${x}px`);
        el.style.setProperty("--glow-y", `${y}px`);
      });
    };
    const onEnter = () => el.style.setProperty("--glow-o", "1");
    const onLeave = () => el.style.setProperty("--glow-o", "0");
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background" ref={root}>
      <SEOHead
        title="MFinances v2 — Pilotage TPE Bruxelles"
        description="Cabinet d'expertise comptable à Bruxelles. Contrôle de gestion, DAF externalisé et trésorerie prévisionnelle pour TPE en croissance."
        canonical="https://mfinances.be/accueilv2/"
      />
      <Header />
      <main>
        {/* ============== HERO (kept — full width) ============== */}
        <section className="relative">
          <div className="relative overflow-hidden bg-primary w-full min-h-[560px] sm:min-h-[640px] md:min-h-[760px] lg:min-h-[820px]">
            <img
              src={equipePhoto}
              alt="Équipe MFinances en réunion"
              data-parallax-y="120"
              className="absolute inset-0 w-full h-full object-cover object-center md:object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/85 via-primary/40 to-primary/10 md:via-primary/30 md:to-transparent" />

            {/* ===== MOBILE LAYOUT (référence : carte blanche H1 + texte blanc + CTA outline) ===== */}
            <div className="md:hidden relative z-10 flex flex-col items-center justify-center text-center min-h-[560px] px-5 py-10">
              {/* Carte blanche avec H1 sombre */}
              <div
                className={`w-full bg-background text-foreground rounded-3xl p-6 shadow-2xl transition-transform duration-1000 ${
                  mounted ? "translate-y-0" : "translate-y-6"
                }`}
              >
                <h1
                  className="font-display font-bold text-[34px] leading-[1.02] tracking-tight text-foreground text-center"
                  data-anim="chars"
                  data-stagger="0.035"
                  data-delay="0.25"
                >
                  Votre partenaire financier de pilotage.
                </h1>
              </div>

              {/* Paragraphe blanc sur l'image */}
              <p
                className="mt-8 text-background text-[16px] leading-[1.45] font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] max-w-[360px] mx-auto"
                data-anim="fade-up"
                data-delay="0.4"
              >
                Vous travaillez dur. Mais votre entreprise gagne-t-elle vraiment de l'argent&nbsp;? Un vrai pilotage financier, à un prix de PME.
              </p>

              {/* CTA pill outline blanc */}
              <div className="mt-6 flex justify-center" data-anim="fade-up" data-delay="0.55">
                <Link
                  to="/diagnostic/"
                  className="inline-flex items-center gap-4 rounded-full border border-background/80 bg-background/5 backdrop-blur-sm pl-6 pr-2 py-2 text-background hover:bg-background hover:text-foreground transition-colors group"
                >
                  <span className="text-[15px] font-medium">Diagnostic gratuit</span>
                  <span className="w-9 h-9 rounded-full border border-background/80 flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>

            {/* ===== DESKTOP : Floating dark card (inchangé) ===== */}
            <div
              className={`hidden md:block absolute top-24 right-12 lg:right-24 max-w-[520px] bg-foreground text-background rounded-3xl p-10 shadow-2xl transition-transform duration-1000 ${
                mounted ? "translate-y-0" : "translate-y-6"
              }`}
            >
              <h1
                className="font-display text-[52px] leading-[1.05] text-background"
                data-anim="chars"
                data-stagger="0.035"
                data-delay="0.25"
              >
                Votre partenaire financier de pilotage.
              </h1>
              <p
                className="mt-5 text-background/70 text-[14.5px] leading-relaxed"
                data-anim="fade-up"
                data-delay="0.4"
              >
                Vous travaillez dur. Mais votre entreprise gagne-t-elle vraiment de l'argent&nbsp;?
                MFinances change ça : un vrai pilotage financier, à un prix de PME.
              </p>
              <div data-anim="fade-up" data-delay="0.55">
                <Button
                  variant="accent"
                  size="lg"
                  className="mt-6 rounded-full pl-6 pr-3 group h-12 text-[14px]"
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
          </div>

          {/* Bottom split bar — full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="bg-card border-y border-border/60 px-5 md:px-12 lg:px-20 py-5 md:py-6 flex items-center justify-between gap-3">
              <p className="font-display italic text-[18px] sm:text-[22px] md:text-[28px] text-primary leading-tight">
                Discutons & Démarrons
              </p>
              <Link
                to="/contact/"
                className="text-[11px] md:text-[12px] uppercase tracking-[0.16em] md:tracking-[0.18em] text-accent font-bold hover:gap-3 inline-flex items-center gap-2 transition-all shrink-0"
              >
                Contact <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-accent text-accent-foreground border-y border-accent px-5 md:px-12 lg:px-20 py-5 md:py-6 flex items-center justify-between gap-3">
              <p className="font-display text-[22px] sm:text-[26px] md:text-[32px] leading-none">
                200+ <span className="text-[12px] md:text-[14px] font-body align-middle opacity-80">entreprises</span>
              </p>
              <div className="flex -space-x-2 shrink-0">
                {[mikaPhoto, equipeSourire, dafMeeting].map((src, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-accent overflow-hidden bg-card"
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-card text-accent flex items-center justify-center text-sm font-bold border-2 border-accent">
                  <Plus size={14} strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* 3 features row — full width */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-border/60" data-anim="stagger" data-stagger="0.12">
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

        {/* ============== 02 · CONSTAT (V1 PainSection text) ============== */}
        <section className="py-20 md:py-28 bg-card relative overflow-hidden">
          <div
            aria-hidden="true" data-anim="text-scrub"
            className="absolute inset-x-0 top-12 text-center font-display italic font-bold text-[140px] md:text-[220px] leading-none text-accent/[0.035] pointer-events-none select-none whitespace-nowrap"
          >
            Où ?
          </div>

          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 02</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 font-medium">
                  Le constat
                </span>
              </div>
              <h2
                className="font-display text-[32px] md:text-[48px] leading-[1.05]"
                data-anim="split"
              >
                Fin de mois tendu. Décisions au feeling. Où est passé l'argent ?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-anim="stagger" data-stagger="0.1">
              {painPoints.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="group bg-background rounded-3xl p-7 border border-border/40 hover:border-accent/30 hover:shadow-[0_16px_40px_rgba(232,57,58,0.08)] transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-accent/[0.08] flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:rotate-[-6deg]">
                      <Icon size={22} className="text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-[22px] text-primary mt-5 leading-tight">{p.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] mt-3">{p.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-14" data-anim="fade-up">
              <Link
                to="/diagnostic/"
                className="group inline-flex items-center gap-3 text-accent text-[13px] font-bold uppercase tracking-[0.12em] hover:gap-4 transition-all"
              >
                <span className="w-10 h-px bg-accent transition-all duration-300 group-hover:w-14" />
                Plus maintenant — faites le diagnostic
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============== 03 · SERVICES (V1 SolutionSection text) ============== */}
        <section className="py-20 md:py-28">
          <div className="container-mf">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-4 mb-3">
                  <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 03</span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 font-medium">Nos solutions</span>
                </div>
                <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05]" data-anim="split">
                  Un cabinet comptable nouvelle génération.
                </h2>
              </div>
              <div className="max-w-md" data-anim="fade-up" data-delay="0.2">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-anim="stagger" data-stagger="0.12">
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    to={s.href}
                    key={s.title}
                    data-tilt
                    data-tilt-max="6"
                    className="group bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(27,43,94,0.12)] transition-shadow relative"
                  >
                    <div className="relative h-52 overflow-hidden" data-anim="clip-reveal" data-clip-direction="up">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                      <span className="absolute top-4 left-4 bg-card/90 backdrop-blur text-primary text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.12em] uppercase">
                        {s.tag}
                      </span>
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-card/95 backdrop-blur flex items-center justify-center shadow-lg group-hover:rotate-[-6deg] transition-transform">
                        <Icon size={22} className="text-accent" strokeWidth={1.75} />
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="font-display text-[22px] text-primary leading-tight">{s.title}</h3>
                      <p className="text-accent text-[12px] italic mt-1">{s.subtitle}</p>
                      <p className="text-[14px] text-muted-foreground leading-[1.7] mt-4">{s.desc}</p>
                      <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between text-[13px] font-semibold text-primary group-hover:text-accent transition-colors">
                        <span>En savoir plus</span>
                        <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============== 04 · MÉTHODE (V1 MethodSection text) ============== */}
        <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
          <div
            aria-hidden="true" data-anim="text-scrub" data-scrub-dir="right"
            className="absolute inset-x-0 top-10 text-center font-display font-bold text-[160px] md:text-[260px] leading-none text-primary-foreground/[0.025] pointer-events-none select-none whitespace-nowrap"
          >
            Méthode
          </div>

          <div className="container-mf relative">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 04</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 font-medium">
                  Notre approche
                </span>
              </div>
              <h2 className="font-display text-[34px] md:text-[48px] text-primary-foreground leading-[1.05]" data-anim="split">
                Notre méthode en 3 étapes.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-anim="stagger" data-stagger="0.12">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.num} data-tilt data-tilt-max="5" className="bg-primary-dark/50 border border-primary-foreground/10 rounded-3xl p-7 hover:border-accent/40 transition-colors relative overflow-hidden">
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

        {/* ============== 05 · POUR QUI (V1 AudienceSection text) ============== */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div
            aria-hidden="true" data-anim="text-scrub"
            className="absolute inset-x-0 top-8 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
          >
            Pour qui
          </div>
          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 05</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 font-medium">
                  Pour qui · Profils accompagnés
                </span>
              </div>
              <h2 className="font-display text-[32px] md:text-[46px] leading-[1.05]" data-anim="split">
                Nous accompagnons les dirigeants qui ont décidé de grandir.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4" data-anim="stagger" data-stagger="0.08">
              {audiences.map((a, i) => (
                <Link
                  key={a.label}
                  to={a.href}
                  data-tilt
                  data-tilt-max="7"
                  className="group relative rounded-3xl overflow-hidden block aspect-[3/4] md:aspect-[3/4.4] transition-shadow duration-500 shadow-[0_8px_24px_rgba(27,43,94,0.06)] hover:shadow-[0_28px_70px_rgba(27,43,94,0.22)]"
                >
                  <img
                    src={a.image}
                    alt={a.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-transparent transition-opacity duration-500 group-hover:from-primary/95 group-hover:via-primary/40" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className="font-display text-[12px] text-primary-foreground/80 tracking-[0.2em] font-bold">
                      0{i + 1}
                    </span>
                    <span className="bg-primary-foreground/15 backdrop-blur-md text-primary-foreground text-[9px] font-bold px-2.5 py-1 rounded-full tracking-[0.14em] uppercase border border-primary-foreground/20">
                      {a.tag}
                    </span>
                  </div>

                  <div className="absolute top-12 right-4 w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="h-px w-8 bg-accent mb-3 transition-all duration-500 group-hover:w-16" />
                    <h3 className="font-display text-[17px] md:text-[19px] text-primary-foreground leading-[1.15]">
                      {a.label}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-[10.5px] text-accent font-bold mt-2 uppercase tracking-[0.14em] opacity-90 group-hover:gap-2.5 transition-all">
                      Découvrir <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============== 06 · TÉMOIGNAGE (V1 TestimonialsSection — vrai client) ============== */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container-mf">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4">
                <div className="inline-flex items-center gap-4 mb-5">
                  <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 06</span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 font-medium">
                    Témoignages
                  </span>
                </div>
                <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05]" data-anim="split">
                  Ils nous font confiance.
                </h2>
                <div className="h-px w-16 bg-accent mt-6" />
                <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mt-4">
                  {reviews.length} avis Google · 5,0/5
                </p>

                {/* Carousel controls */}
                <div className="flex items-center gap-3 mt-8">
                  <button
                    onClick={() => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                    aria-label="Témoignage précédent"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setReviewIndex((i) => (i + 1) % reviews.length)}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                    aria-label="Témoignage suivant"
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
                <div
                  key={reviewIndex}
                  className="animate-fade-in"
                >
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

                {/* Progress dots */}
                <div className="flex flex-wrap gap-1.5 mt-8">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === reviewIndex ? "bg-accent w-8" : "bg-border w-3 hover:bg-muted-foreground"
                      }`}
                      aria-label={`Témoignage ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============== 07 · LE FONDATEUR (V1 MikaSection text) ============== */}
        <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
          <div
            aria-hidden="true" data-anim="text-scrub" data-scrub-dir="right"
            className="absolute inset-x-0 top-8 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.03] pointer-events-none select-none whitespace-nowrap"
          >
            Fondateur
          </div>
          <div className="container-mf relative">
            <div className="max-w-[820px] mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-4 mb-5">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 07</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 font-medium">
                  Le fondateur
                </span>
              </div>
              <h2 className="font-display text-[32px] md:text-[46px] leading-[1.05] text-primary" data-anim="split">
                L'expérience d'un DAF, la proximité d'un cabinet.
              </h2>
            </div>

            <div className="bg-primary rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(27,43,94,0.20)] grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
              <div className="relative min-h-[420px] lg:min-h-[520px] overflow-hidden" data-anim="clip-reveal" data-clip-direction="left">
                <img
                  src={mikaPhoto}
                  alt="Mika Musungayi"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
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

        {/* ============== 08 · TARIFS (V1 PricingSection text) ============== */}
        <section className="py-20 md:py-28">
          <div className="container-mf">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-4 mb-5">
                <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 08</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 font-medium">Nos forfaits</span>
              </div>
              <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05]" data-anim="split">
                Des forfaits transparents.
              </h2>
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

        {/* ============== 09 · FAQ (V1 homepage FAQs) ============== */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container-mf">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <div className="inline-flex items-center gap-4 mb-5">
                  <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 09</span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/55 font-medium">FAQ</span>
                </div>
                <h2 className="font-display text-[34px] md:text-[48px] leading-[1.05]" data-anim="split">
                  Questions & réponses.
                </h2>
                <p className="text-muted-foreground text-[14px] mt-5 max-w-sm leading-relaxed">
                  Tout ce que vous voulez savoir sur notre cabinet et notre approche.
                </p>
                <Button variant="default" size="lg" className="rounded-full mt-6" asChild>
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

        {/* ============== 10 · CTA FINAL (V1 FinalCta text) ============== */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="container-mf text-center relative">
            <div className="inline-flex items-center gap-4 mb-5">
              <span className="font-display text-[14px] text-accent font-bold tracking-wider">— 10</span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 font-medium">
                Bruxelles · Uccle
              </span>
            </div>
            <h2 className="font-display text-[34px] md:text-[52px] leading-[1.05] max-w-[820px] mx-auto text-primary-foreground" data-anim="split">
              Prêt à reprendre le contrôle de vos finances ?
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
