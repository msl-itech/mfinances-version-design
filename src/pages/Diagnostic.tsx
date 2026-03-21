import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

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
    title: "Votre statut",
    subtitle: "Pour personnaliser votre diagnostic, dites-nous en quelle situation vous êtes :",
    scored: false,
    options: [
      { emoji: "🌱", label: "Indépendant en personne physique" },
      { emoji: "🏢", label: "Dirigeant de société (SRL, SA...)" },
      { emoji: "🚀", label: "En cours de création" },
      { emoji: "🔄", label: "Indépendant en transition vers une société" },
    ],
  },
  {
    id: 2,
    title: "Votre chiffre d'affaires annuel",
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
    scored: false,
    options: [
      { emoji: "💸", label: "Ma trésorerie — je manque de visibilité sur mes flux" },
      { emoji: "📉", label: "Ma rentabilité — je ne sais pas si je gagne vraiment de l'argent" },
      { emoji: "🏛️", label: "Mes impôts — je paye trop ou je ne sais pas optimiser" },
      { emoji: "🎯", label: "Mes décisions — je manque d'outils pour piloter" },
      { emoji: "🆕", label: "Je démarre — je veux bien partir du bon pied" },
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
  const [step, setStep] = useState(0); // 0-7 = questions, 8 = result
  const [answers, setAnswers] = useState<(number | null)[]>(Array(8).fill(null));
  const [showMidMessage, setShowMidMessage] = useState(false);
  const [emailForm, setEmailForm] = useState({ prenom: "", email: "" });
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Diagnostic Trésorerie Gratuit pour TPE — MFinances Bruxelles";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Votre trésorerie vous cache quelque chose. 8 questions, 3 minutes. Score instantané et recommandations concrètes. Gratuit et confidentiel. MFinances, Bruxelles.");

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
    }
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

  const progress = step <= 7 ? ((step + 1) / 8) * 100 : 100;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailForm.prenom.trim() && emailForm.email.trim()) {
      setEmailSubmitted(true);
    }
  };

  const getResultConfig = () => {
    if (score <= 8) {
      return {
        zone: "🔴",
        color: "hsl(0, 79%, 53%)",
        bgColor: "hsl(0, 79%, 97%)",
        borderColor: "hsl(0, 79%, 90%)",
        title: "Trésorerie fragilisée",
        desc: "Votre trésorerie présente plusieurs points de fragilité qui méritent une attention immédiate.",
        ctaLabel: "Voir si mon entreprise est en danger →",
        ctaHref: "/contact/",
        ctaVariant: "accent" as const,
        secondaryLabel: "Voir si je commets ces erreurs →",
        secondaryHref: "#fragilites",
      };
    }
    if (score <= 16) {
      return {
        zone: "🟡",
        color: "hsl(35, 90%, 50%)",
        bgColor: "hsl(35, 90%, 97%)",
        borderColor: "hsl(35, 90%, 85%)",
        title: "Trésorerie en construction",
        desc: "Vous avez des bases solides mais des angles morts subsistent.",
        ctaLabel: "Découvrir pourquoi je manque de cash →",
        ctaHref: "/services/tresorerie/",
        ctaVariant: "default" as const,
        secondaryLabel: "Parler à un expert — c'est gratuit →",
        secondaryHref: "/contact/",
      };
    }
    return {
      zone: "🟢",
      color: "hsl(145, 63%, 42%)",
      bgColor: "hsl(145, 63%, 97%)",
      borderColor: "hsl(145, 63%, 85%)",
      title: "Trésorerie maîtrisée",
      desc: "Vous pilotez votre trésorerie avec méthode. Prochaine étape : intégrer votre trésorerie dans un pilotage financier global.",
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

            {step <= 7 && !showMidMessage && (
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
                  {step > 0 && (
                    <button
                      onClick={goBack}
                      className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-5"
                    >
                      <ArrowLeft size={14} /> Retour
                    </button>
                  )}

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
              return (
                <div className="space-y-8">
                  {/* Score card */}
                  <div
                    className="rounded-2xl p-8 border-2 text-center"
                    style={{ backgroundColor: r.bgColor, borderColor: r.borderColor }}
                  >
                    <span className="text-[48px]">{r.zone}</span>
                    <h2 className="font-display text-[26px] md:text-[32px] text-foreground mt-3 mb-2">{r.title}</h2>
                    <p className="text-[15px] text-muted-foreground font-body max-w-[500px] mx-auto">{r.desc}</p>

                    <div className="mt-6 inline-block text-left bg-white rounded-xl p-5 border border-border/50 shadow-sm">
                      <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-foreground/40 mb-3">Votre profil détecté</p>
                      <div className="space-y-1.5 text-[14px] font-body">
                        <p><span className="text-foreground/50">Statut :</span> <span className="font-medium text-foreground">{statusLabel}</span></p>
                        <p><span className="text-foreground/50">CA :</span> <span className="font-medium text-foreground">{caLabel}</span></p>
                        <p><span className="text-foreground/50">Préoccupation :</span> <span className="font-medium text-foreground">{concernLabel}</span></p>
                        <p><span className="text-foreground/50">Score trésorerie :</span> <span className="font-bold" style={{ color: r.color }}>{score}/20</span></p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-3">
                      <Button
                        size="lg"
                        className="rounded-full px-8"
                        style={score <= 8 ? { backgroundColor: "hsl(0, 79%, 53%)", color: "white" } : score <= 16 ? { backgroundColor: "hsl(35, 90%, 50%)", color: "white" } : { backgroundColor: "hsl(145, 63%, 42%)", color: "white" }}
                        asChild
                      >
                        <Link to={r.ctaHref}>{r.ctaLabel}</Link>
                      </Button>
                      <Link to={r.secondaryHref} className="text-[13px] text-muted-foreground hover:text-foreground underline font-body">
                        {r.secondaryLabel}
                      </Link>
                    </div>
                  </div>

                  {/* Email capture */}
                  <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
                    {!emailSubmitted ? (
                      <>
                        <h3 className="font-display text-[20px] text-foreground mb-1">Recevez votre analyse complète</h3>
                        <p className="text-[13px] text-muted-foreground font-body mb-5">
                          Résultats détaillés et recommandations personnalisées dans votre boîte mail.
                        </p>
                        <form onSubmit={handleEmailSubmit} className="space-y-3">
                          <input
                            type="text"
                            placeholder="Prénom"
                            required
                            value={emailForm.prenom}
                            onChange={(e) => setEmailForm({ ...emailForm, prenom: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-[14px] font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                          <input
                            type="email"
                            placeholder="Email professionnel"
                            required
                            value={emailForm.email}
                            onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-[14px] font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                          <Button variant="accent" className="w-full rounded-full" type="submit">
                            Recevoir mon analyse complète <ArrowRight size={16} className="ml-1" />
                          </Button>
                        </form>
                        <p className="text-[11px] text-foreground/40 font-body mt-3 italic">
                          En laissant votre email, vous recevrez également notre guide « Pourquoi vous n'avez jamais d'argent sur votre compte ».
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

                  {/* 5 fragilités */}
                  <div id="fragilites" className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
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
