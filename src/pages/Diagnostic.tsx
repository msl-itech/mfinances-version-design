import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Clock, Shield, BarChart3, AlertTriangle, TrendingUp, Wallet, PiggyBank, Landmark } from "lucide-react";

/* ───── DATA ───── */

interface Option {
  emoji: string;
  label: string;
  points?: number;
}

interface Question {
  id: number;
  title: string;
  subtitle?: string;
  options: Option[];
  scored: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    title: "Votre statut professionnel",
    subtitle: "Pour personnaliser votre diagnostic, dites-nous en quelle situation vous êtes :",
    scored: false,
    options: [
      { emoji: "🌱", label: "Indépendant en personne physique — Je gère mon activité en nom propre" },
      { emoji: "🏢", label: "Dirigeant de société — J'ai une SRL, SA ou autre structure" },
      { emoji: "🚀", label: "En cours de création — Je démarre mon activité" },
      { emoji: "🔄", label: "Indépendant en transition — Je pense passer en société" },
    ],
  },
  {
    id: 2,
    title: "Votre chiffre d'affaires annuel",
    subtitle: "Quel est votre chiffre d'affaires annuel approximatif ?",
    scored: false,
    options: [
      { emoji: "📊", label: "Moins de 100 000 €" },
      { emoji: "📈", label: "Entre 100 000 € et 500 000 €" },
      { emoji: "🚀", label: "Entre 500 000 € et 1 000 000 €" },
      { emoji: "💼", label: "Plus de 1 000 000 €" },
    ],
  },
  {
    id: 3,
    title: "Votre préoccupation principale",
    subtitle: "Quelle est votre plus grande préoccupation financière en ce moment ?",
    scored: false,
    options: [
      { emoji: "💸", label: "Ma trésorerie — Je manque de visibilité sur mes flux" },
      { emoji: "📉", label: "Ma rentabilité — Je ne sais pas si je gagne vraiment de l'argent" },
      { emoji: "🏛️", label: "Mes impôts — Je paye trop ou je ne sais pas optimiser" },
      { emoji: "🎯", label: "Mes décisions — Je manque d'outils pour piloter" },
      { emoji: "🆕", label: "Je démarre — Je veux bien partir du bon pied" },
    ],
  },
  {
    id: 4,
    title: "Bénéfice vs trésorerie",
    subtitle: "Vos bénéfices et votre trésorerie sont-ils alignés ?",
    scored: true,
    options: [
      { emoji: "✅", label: "Mon compte reflète mes bénéfices, pas de décalage", points: 4 },
      { emoji: "👍", label: "Léger décalage occasionnel, situation sous contrôle", points: 3 },
      { emoji: "⚠️", label: "Décalage régulier, je manque parfois de liquidités", points: 2 },
      { emoji: "😰", label: "Forte confusion, trésorerie tendue malgré des bénéfices", points: 1 },
      { emoji: "🚨", label: "Situation critique, trésorerie quasi toujours insuffisante", points: 0 },
    ],
  },
  {
    id: 5,
    title: "Délais de paiement clients",
    subtitle: "Vos clients paient-ils dans les délais ?",
    scored: true,
    options: [
      { emoji: "✅", label: "Moins de 30 jours en moyenne, aucun problème", points: 4 },
      { emoji: "👍", label: "Entre 30 et 45 jours, tensions ponctuelles gérables", points: 3 },
      { emoji: "⚠️", label: "Entre 45 et 60 jours, impact régulier sur ma trésorerie", points: 2 },
      { emoji: "😰", label: "Plus de 60 jours, situations tendues fréquentes", points: 1 },
      { emoji: "🚨", label: "Aucun suivi, je ne connais pas mes délais réels", points: 0 },
    ],
  },
  {
    id: 6,
    title: "Prévisionnel de trésorerie",
    subtitle: "Disposez-vous d'un prévisionnel de trésorerie actif ?",
    scored: true,
    options: [
      { emoji: "✅", label: "Oui, mis à jour mensuellement sur données réelles", points: 4 },
      { emoji: "👍", label: "Oui, mais pas toujours à jour", points: 3 },
      { emoji: "⚠️", label: "Non, mais j'ai une vision approximative à 1-2 mois", points: 2 },
      { emoji: "😰", label: "Non, je gère au jour le jour", points: 1 },
      { emoji: "🚨", label: "Non, je ne sais même pas ce que c'est", points: 0 },
    ],
  },
  {
    id: 7,
    title: "Financement des investissements",
    subtitle: "Comment financez-vous vos investissements ?",
    scored: true,
    options: [
      { emoji: "✅", label: "Emprunt ou leasing systématique — je préserve ma trésorerie", points: 4 },
      { emoji: "👍", label: "Mix financement externe et fonds propres selon le projet", points: 3 },
      { emoji: "⚠️", label: "Principalement fonds propres, par principe", points: 2 },
      { emoji: "😰", label: "Toujours sur fonds propres, même quand ça fragilise la trésorerie", points: 1 },
      { emoji: "🚨", label: "Pas de méthode définie, je décide au cas par cas sans analyse", points: 0 },
    ],
  },
  {
    id: 8,
    title: "Réserve de sécurité",
    subtitle: "Quelle est votre réserve de trésorerie disponible ?",
    scored: true,
    options: [
      { emoji: "✅", label: "Plus de 3 mois de charges fixes couverts", points: 4 },
      { emoji: "👍", label: "Entre 2 et 3 mois de charges couvertes", points: 3 },
      { emoji: "⚠️", label: "Entre 1 et 2 mois de charges couvertes", points: 2 },
      { emoji: "😰", label: "Moins d'un mois — situation tendue", points: 1 },
      { emoji: "🚨", label: "Aucune réserve — je fonctionne à flux tendus", points: 0 },
    ],
  },
];

const fragilites = [
  { label: "Confondre bénéfice et cash", href: "/blog/tresorerie/tresorerie-vs-benefices/" },
  { label: "Subir les délais clients", href: "/blog/tresorerie/anticiper-flux-tresorerie/" },
  { label: "Mal financer ses investissements", href: "/blog/tresorerie/investir-sans-fragiliser-tresorerie/" },
  { label: "Immobiliser des liquidités dans les stocks", href: "/blog/tresorerie/gestion-stocks-tresorerie/" },
  { label: "Décider sans tableau prévisionnel", href: "/blog/tresorerie/anticiper-flux-tresorerie/" },
];

/* CA profile buckets */
type CaProfile = "low" | "mid" | "high";

const getCaProfile = (caAnswer: number | null): CaProfile => {
  if (caAnswer === null) return "low";
  if (caAnswer === 0) return "low";       // < 100K
  if (caAnswer === 1) return "mid";       // 100K-500K
  return "high";                           // 500K+ or 1M+
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Diagnostic trésorerie", item: "https://mfinances.be/diagnostic/" },
  ],
};

/* ───── COMPONENT ───── */

export default function Diagnostic() {
  // step: -1 = intro, 0-7 = questions, 8 = result
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(8).fill(null));
  const [showMidMessage, setShowMidMessage] = useState(false);
  const [emailForm, setEmailForm] = useState({ prenom: "", email: "" });
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Diagnostic Trésorerie Gratuit pour TPE — MFinances";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Évaluez la santé de votre trésorerie en 8 questions. Score instantané et recommandations concrètes. Gratuit et confidentiel. MFinances, Bruxelles.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/diagnostic/";

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(breadcrumbJsonLd);
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, []);

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = optionIndex;
    setAnswers(newAnswers);

    // After Q3 (step 2), show mid-message before advancing
    if (step === 2) {
      setShowMidMessage(true);
      return;
    }

    // Auto-advance after short delay
    setTimeout(() => {
      if (step < 7) {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStep(8);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 300);
  };

  const advanceFromMid = () => {
    setShowMidMessage(false);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 0) {
      setStep(-1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const startDiagnostic = () => {
    setStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate score (questions 4-8, indices 3-7)
  const score = answers.slice(3).reduce((sum, ansIdx, qIdx) => {
    if (ansIdx === null) return sum;
    const q = questions[qIdx + 3];
    return sum + (q.options[ansIdx]?.points ?? 0);
  }, 0);

  const statusLabel = answers[0] !== null ? questions[0].options[answers[0]].label : "—";
  const caLabel = answers[1] !== null ? questions[1].options[answers[1]].label : "—";
  const concernLabel = answers[2] !== null ? questions[2].options[answers[2]].label : "—";

  const progress = step >= 0 && step <= 7 ? ((step + 1) / 8) * 100 : 100;

  const caProfile = getCaProfile(answers[1]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailForm.prenom.trim() && emailForm.email.trim()) {
      setEmailSubmitted(true);
    }
  };

  const getResultConfig = () => {
    // 🔴 Zone rouge (0-8)
    if (score <= 8) {
      if (caProfile === "low") {
        return {
          zone: "🔴",
          color: "hsl(0, 79%, 53%)",
          bgColor: "hsl(0, 79%, 97%)",
          borderColor: "hsl(0, 79%, 90%)",
          title: "Trésorerie fragile",
          desc: "Même en début d'activité, quelques outils simples changent tout. Votre trésorerie présente des points de fragilité qui méritent une attention immédiate.",
          ctaLabel: "Télécharger le guide gratuit →",
          ctaHref: "/contact/",
          ctaVariant: "accent" as const,
          secondaryLabel: "Découvrir le forfait Essentiel →",
          secondaryHref: "/tarifs/",
        };
      }
      if (caProfile === "mid") {
        return {
          zone: "🔴",
          color: "hsl(0, 79%, 53%)",
          bgColor: "hsl(0, 79%, 97%)",
          borderColor: "hsl(0, 79%, 90%)",
          title: "Risques sérieux détectés",
          desc: "À ce stade de développement, le forfait Premium vous donnera la visibilité manquante sur votre trésorerie et votre rentabilité.",
          ctaLabel: "Prendre rendez-vous →",
          ctaHref: "/contact/",
          ctaVariant: "accent" as const,
          secondaryLabel: "Découvrir le forfait Premium →",
          secondaryHref: "/tarifs/",
        };
      }
      // high
      return {
        zone: "🔴",
        color: "hsl(0, 79%, 53%)",
        bgColor: "hsl(0, 79%, 97%)",
        borderColor: "hsl(0, 79%, 90%)",
        title: "Trésorerie en danger",
        desc: "À ce niveau de chiffre d'affaires, chaque semaine sans prévisionnel coûte. Le forfait Excellence avec trésorerie mensuelle est indispensable.",
        ctaLabel: "Rendez-vous urgent →",
        ctaHref: "/contact/",
        ctaVariant: "accent" as const,
        secondaryLabel: "Découvrir le forfait Excellence →",
        secondaryHref: "/tarifs/",
      };
    }

    // 🟡 Zone jaune (9-16)
    if (score <= 16) {
      if (caProfile === "low") {
        return {
          zone: "🟡",
          color: "hsl(35, 90%, 50%)",
          bgColor: "hsl(35, 90%, 97%)",
          borderColor: "hsl(35, 90%, 85%)",
          title: "Bonnes bases, quelques angles morts",
          desc: "Le forfait Essentiel sécurise votre situation et vous donne les outils pour piloter sereinement.",
          ctaLabel: "Télécharger le guide gratuit →",
          ctaHref: "/contact/",
          ctaVariant: "default" as const,
          secondaryLabel: "Découvrir le forfait Essentiel →",
          secondaryHref: "/tarifs/",
        };
      }
      if (caProfile === "mid") {
        return {
          zone: "🟡",
          color: "hsl(35, 90%, 50%)",
          bgColor: "hsl(35, 90%, 97%)",
          borderColor: "hsl(35, 90%, 85%)",
          title: "Vous avancez bien",
          desc: "Votre croissance mérite un suivi structuré. Le forfait Premium vous apporte la visibilité nécessaire pour passer au niveau supérieur.",
          ctaLabel: "Découvrir le forfait Premium →",
          ctaHref: "/tarifs/",
          ctaVariant: "default" as const,
          secondaryLabel: "Prendre rendez-vous →",
          secondaryHref: "/contact/",
        };
      }
      // high
      return {
        zone: "🟡",
        color: "hsl(35, 90%, 50%)",
        bgColor: "hsl(35, 90%, 97%)",
        borderColor: "hsl(35, 90%, 85%)",
        title: "Bases solides, mais votre stade exige plus",
        desc: "Le forfait Excellence avec trésorerie mensuelle est l'étape suivante pour sécuriser votre croissance.",
        ctaLabel: "Découvrir le forfait Excellence →",
        ctaHref: "/tarifs/",
        ctaVariant: "default" as const,
        secondaryLabel: "Prendre rendez-vous →",
        secondaryHref: "/contact/",
      };
    }

    // 🟢 Zone verte (17-20) — tout profil
    return {
      zone: "🟢",
      color: "hsl(145, 63%, 42%)",
      bgColor: "hsl(145, 63%, 97%)",
      borderColor: "hsl(145, 63%, 85%)",
      title: "Trésorerie bien pilotée",
      desc: "Vous pilotez votre trésorerie avec méthode. L'étape suivante : contrôle de gestion + DAF pour passer au niveau supérieur.",
      ctaLabel: "Découvrir le forfait Excellence →",
      ctaHref: "/tarifs/",
      ctaVariant: "default" as const,
      secondaryLabel: "Parler à un expert — c'est gratuit →",
      secondaryHref: "/contact/",
    };
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center">
            <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
              Gratuit · 3 minutes · Confidentiel
            </span>
            <h1 className="font-display text-[28px] md:text-[42px] leading-[1.15] text-primary-foreground">
              Votre trésorerie vous cache quelque chose. <span className="text-accent">Depuis combien de temps ?</span>
            </h1>
            <p className="text-primary-foreground/75 text-[15px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
              8 questions. 3 minutes. Vous saurez exactement si votre entreprise est en danger financier — ou si vous pilotez dans la bonne direction. Résultat immédiat, gratuit, sans engagement.
            </p>
          </div>
        </section>

        {/* ── QUIZ AREA ── */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="mx-auto max-w-[700px] px-6 lg:px-12">

            {/* ── STEP 0: INTRO / ACCROCHE ── */}
            {step === -1 && (
              <div className="bg-card rounded-2xl p-8 md:p-10 border border-border/50 shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <BarChart3 size={28} className="text-primary" />
                </div>
                <h2 className="font-display text-[24px] md:text-[30px] text-foreground leading-[1.2] mb-3">
                  Votre diagnostic trésorerie personnalisé
                </h2>
                <p className="text-[15px] text-muted-foreground font-body mb-8 max-w-[520px] mx-auto leading-relaxed">
                  3 questions rapides pour personnaliser votre analyse, puis 5 questions sur votre trésorerie.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 text-[13px] text-foreground/60 font-body">
                    <Clock size={15} className="text-primary/60" />
                    <span>Moins de 3 minutes</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-foreground/20" />
                  <div className="flex items-center gap-2 text-[13px] text-foreground/60 font-body">
                    <BarChart3 size={15} className="text-primary/60" />
                    <span>Résultat immédiat</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-foreground/20" />
                  <div className="flex items-center gap-2 text-[13px] text-foreground/60 font-body">
                    <Shield size={15} className="text-primary/60" />
                    <span>100% confidentiel</span>
                  </div>
                </div>

                <Button variant="accent" size="lg" className="rounded-full px-10" onClick={startDiagnostic}>
                  Commencer le diagnostic <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            )}

            {/* ── QUESTIONS ── */}
            {step >= 0 && step <= 7 && !showMidMessage && (
              <>
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[13px] font-semibold text-foreground/60 font-body">
                      Question {step + 1} sur 8
                    </span>
                    <span className="text-[13px] text-foreground/40 font-body">
                      {step < 3 ? "Phase 1 — Profil" : "Phase 2 — Trésorerie"}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-border/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-5"
                  >
                    <ArrowLeft size={14} /> Retour
                  </button>

                  <h2 className="font-display text-[22px] md:text-[26px] text-foreground leading-[1.2] mb-2">
                    {questions[step].title}
                  </h2>
                  {questions[step].subtitle && (
                    <p className="text-[14px] text-muted-foreground font-body mb-6">{questions[step].subtitle}</p>
                  )}

                  <div className="space-y-3">
                    {questions[step].options.map((opt, idx) => {
                      const selected = answers[step] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => selectAnswer(idx)}
                          className={`w-full text-left flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-200 ${
                            selected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border/50 bg-white hover:border-primary/30 hover:bg-primary/[0.02]"
                          }`}
                        >
                          <span className="text-[20px] flex-shrink-0 mt-0.5">{opt.emoji}</span>
                          <span className={`text-[14px] font-body leading-relaxed ${selected ? "text-foreground font-medium" : "text-foreground/80"}`}>
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Mid-message after Q3 */}
            {showMidMessage && (
              <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={28} className="text-accent" />
                </div>
                <h2 className="font-display text-[22px] md:text-[26px] text-foreground leading-[1.2] mb-3">
                  Vous êtes à mi-chemin !
                </h2>
                <p className="text-[15px] text-muted-foreground font-body mb-6 max-w-[480px] mx-auto">
                  Parfait ! Maintenant 5 questions sur votre trésorerie — elles définissent votre score de risque.
                </p>
                <Button variant="accent" size="lg" className="rounded-full" onClick={advanceFromMid}>
                  Continuer <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            )}

            {/* ── RESULTS ── */}
            {step === 8 && (() => {
              const r = getResultConfig();
              const scoredQuestions = questions.slice(3); // Q4-Q8
              const scoredAnswers = answers.slice(3);
              const scoreIcons = [Wallet, Clock, TrendingUp, Landmark, PiggyBank];
              const percentage = Math.round((score / 20) * 100);
              const circumference = 2 * Math.PI * 54;
              const strokeOffset = circumference - (percentage / 100) * circumference;

              return (
                <div className="space-y-6">

                  {/* ── 1. Score principal ── */}
                  <div className="bg-card rounded-2xl p-8 md:p-10 border border-border/50 shadow-sm text-center">
                    <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-6 font-body">Votre résultat</p>

                    {/* Gauge circulaire */}
                    <div className="relative w-36 h-36 mx-auto mb-6">
                      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="8" opacity="0.3" />
                        <circle
                          cx="60" cy="60" r="54" fill="none"
                          stroke={r.color}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeOffset}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[32px] font-bold font-display" style={{ color: r.color }}>{score}</span>
                        <span className="text-[13px] text-muted-foreground font-body">/20</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold font-body mb-3" style={{ backgroundColor: r.bgColor, color: r.color, border: `1px solid ${r.borderColor}` }}>
                      {score <= 8 && <AlertTriangle size={14} />}
                      {score > 8 && score <= 16 && <TrendingUp size={14} />}
                      {score > 16 && <CheckCircle2 size={14} />}
                      {r.title}
                    </div>

                    <p className="text-[15px] text-muted-foreground font-body max-w-[480px] mx-auto leading-relaxed mt-2">{r.desc}</p>
                  </div>

                  {/* ── 2. Détail par question ── */}
                  <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
                    <h3 className="font-display text-[20px] text-foreground mb-2">Détail de votre score</h3>
                    <p className="text-[13px] text-muted-foreground font-body mb-6">Performance sur chaque indicateur clé de trésorerie</p>

                    <div className="space-y-4">
                      {scoredQuestions.map((q, i) => {
                        const ansIdx = scoredAnswers[i];
                        const pts = ansIdx !== null ? (q.options[ansIdx]?.points ?? 0) : 0;
                        const pct = (pts / 4) * 100;
                        const Icon = scoreIcons[i];
                        const barColor = pts >= 3 ? "hsl(145, 63%, 42%)" : pts >= 2 ? "hsl(35, 90%, 50%)" : "hsl(0, 79%, 53%)";

                        return (
                          <div key={q.id} className="group">
                            <div className="flex items-center gap-3 mb-1.5">
                              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                                <Icon size={16} className="text-primary" />
                              </div>
                              <span className="text-[14px] font-medium text-foreground font-body flex-1">{q.title}</span>
                              <span className="text-[13px] font-bold font-body" style={{ color: barColor }}>{pts}/4</span>
                            </div>
                            <div className="ml-11 h-2 bg-border/30 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, backgroundColor: barColor }} />
                            </div>
                            {ansIdx !== null && (
                              <p className="ml-11 text-[12px] text-muted-foreground font-body mt-1 leading-snug">
                                {q.options[ansIdx].emoji} {q.options[ansIdx].label}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── 3. Profil détecté ── */}
                  <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
                    <h3 className="font-display text-[20px] text-foreground mb-5">Votre profil</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-secondary/50 rounded-xl p-4 text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1 font-body">Statut</p>
                        <p className="text-[13px] font-medium text-foreground font-body">{statusLabel}</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-4 text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1 font-body">Chiffre d'affaires</p>
                        <p className="text-[13px] font-medium text-foreground font-body">{caLabel}</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-4 text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1 font-body">Préoccupation</p>
                        <p className="text-[13px] font-medium text-foreground font-body">{concernLabel}</p>
                      </div>
                    </div>
                  </div>

                  {/* ── 4. CTA principal ── */}
                  <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: r.bgColor, border: `2px solid ${r.borderColor}` }}>
                    <h3 className="font-display text-[22px] text-foreground mb-2">
                      {score <= 8 ? "Agissez maintenant" : score <= 16 ? "Passez au niveau supérieur" : "Continuez sur cette lancée"}
                    </h3>
                    <p className="text-[14px] text-muted-foreground font-body mb-6 max-w-[440px] mx-auto">
                      {score <= 8
                        ? "Plus vous attendez, plus les fragilités s'aggravent. Prenez rendez-vous pour un premier échange gratuit."
                        : score <= 16
                        ? "Quelques ajustements suffisent pour sécuriser votre croissance."
                        : "Un DAF externalisé peut vous aider à aller encore plus loin."}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Button
                        size="lg"
                        className="rounded-full px-8"
                        style={{ backgroundColor: r.color, color: "white" }}
                        asChild
                      >
                        <Link to={r.ctaHref}>{r.ctaLabel}</Link>
                      </Button>
                      <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                        <Link to={r.secondaryHref}>{r.secondaryLabel}</Link>
                      </Button>
                    </div>
                  </div>

                  {/* ── 5. Email capture ── */}
                  <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
                    {!emailSubmitted ? (
                      <>
                        <h3 className="font-display text-[20px] text-foreground mb-1">
                          Recevez votre analyse complète par email
                        </h3>
                        <p className="text-[14px] text-muted-foreground font-body mb-5">
                          Avec nos recommandations personnalisées selon votre profil.
                        </p>
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            placeholder="Prénom"
                            required
                            value={emailForm.prenom}
                            onChange={(e) => setEmailForm({ ...emailForm, prenom: e.target.value })}
                            className="flex-1 px-4 py-3 rounded-xl border border-border/50 bg-white text-[14px] font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                          <input
                            type="email"
                            placeholder="Email professionnel"
                            required
                            value={emailForm.email}
                            onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                            className="flex-1 px-4 py-3 rounded-xl border border-border/50 bg-white text-[14px] font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                          <Button variant="accent" className="rounded-full px-6" type="submit">
                            Envoyer <ArrowRight size={16} className="ml-1" />
                          </Button>
                        </form>
                        <p className="text-[11px] text-foreground/40 font-body mt-3 italic">
                          En laissant votre email, vous recevrez également notre guide « 5 erreurs qui détruisent la trésorerie des TPE ».
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle2 size={32} className="text-[hsl(145,63%,42%)] mx-auto mb-3" />
                        <h3 className="font-display text-[20px] text-foreground mb-1">Merci {emailForm.prenom} !</h3>
                        <p className="text-[14px] text-muted-foreground font-body">
                          Votre analyse complète arrivera dans votre boîte mail très bientôt.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* ── 6. Fragilités ── */}
                  <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
                    <h3 className="font-display text-[20px] md:text-[24px] text-foreground mb-6">
                      Les 5 fragilités de trésorerie <span className="text-accent">les plus courantes</span>
                    </h3>
                    <div className="space-y-3">
                      {fragilites.map((f, i) => (
                        <Link
                          key={i}
                          to={f.href}
                          className="group flex items-center gap-3 p-4 rounded-xl border border-border/30 hover:border-accent/30 hover:bg-accent/[0.02] transition-all"
                        >
                          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[13px] font-bold flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-[14px] font-body text-foreground/80 group-hover:text-foreground">
                            {f.label}
                          </span>
                          <ArrowRight size={14} className="ml-auto text-foreground/20 group-hover:text-accent transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* ── 7. Recommencer ── */}
                  <div className="text-center">
                    <button
                      onClick={() => { setStep(-1); setAnswers(Array(8).fill(null)); setEmailSubmitted(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 font-body transition-colors"
                    >
                      Refaire le diagnostic
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
