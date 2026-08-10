import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/* ── Data ── */

interface Question {
  number: string;
  title: string;
  help: string;
  answers: { index: string; label: string; sub: string; level: number }[];
}

const questions: Question[] = [
  {
    number: "01",
    title: "Votre priorité est-elle uniquement de respecter vos obligations comptables et fiscales\u00a0?",
    help: "Un bilan annuel et des déclarations déposées dans les délais vous suffisent-ils aujourd'hui\u00a0?",
    answers: [
      { index: "01", label: "Oui, principalement", sub: "Je souhaite avant tout être en règle.", level: 1 },
      { index: "02", label: "Non, je veux également anticiper", sub: "Je veux comprendre mes chiffres avant la clôture annuelle.", level: 2 },
    ],
  },
  {
    number: "02",
    title: "Souhaitez-vous connaître vos résultats et vos principales échéances à l'avance\u00a0?",
    help: "L'objectif est de ne plus découvrir une difficulté après la clôture ou lorsqu'il est trop tard pour agir.",
    answers: [
      { index: "01", label: "Non, un suivi annuel me suffit", sub: "Je n'ai pas besoin d'une visibilité intermédiaire pour le moment.", level: 1 },
      { index: "02", label: "Oui, je veux mieux voir venir", sub: "Je souhaite anticiper les résultats, les échéances et les risques.", level: 2 },
    ],
  },
  {
    number: "03",
    title: "Avez-vous besoin de comprendre pourquoi vos résultats évoluent et comment améliorer votre rentabilité\u00a0?",
    help: "Il ne s'agit plus seulement de constater un chiffre, mais d'identifier les écarts et les actions correctrices.",
    answers: [
      { index: "01", label: "Pas actuellement", sub: "La visibilité sur les chiffres me suffit pour le moment.", level: 2 },
      { index: "02", label: "Oui, je veux piloter mes performances", sub: "Je veux mesurer, expliquer et améliorer les résultats.", level: 3 },
    ],
  },
  {
    number: "04",
    title: "Souhaitez-vous anticiper vos besoins de trésorerie et sécuriser vos décisions financières\u00a0?",
    help: "Par exemple\u00a0: savoir combien investir, rémunérer ou distribuer sans fragiliser l'entreprise.",
    answers: [
      { index: "01", label: "Non, le suivi des résultats me suffit", sub: "Je ne souhaite pas encore un pilotage continu de la trésorerie.", level: 3 },
      { index: "02", label: "Oui, je veux sécuriser ma trésorerie", sub: "Je veux anticiper le cash et décider avec un temps d'avance.", level: 4 },
    ],
  },
];

interface PlanResult {
  key: string;
  name: string;
  promise: string;
  price: string;
  explanation: string;
  reasons: string[];
  cta: string;
  upgrade: string;
  upgradeHref: string;
}

const planResults: Record<number, PlanResult> = {
  1: {
    key: "basic",
    name: "Basic",
    promise: "Être en règle",
    price: "275 €",
    explanation:
      "Votre besoin porte principalement sur la conformité comptable et fiscale. Les prestations de conseil complémentaires restent disponibles à la demande, au tarif horaire.",
    reasons: [
      "Un suivi annuel correspond à votre rythme de décision actuel.",
      "Votre priorité est de respecter vos obligations comptables et fiscales.",
    ],
    cta: "Découvrir le forfait Basic",
    upgrade: "Vous souhaitez ne plus découvrir vos résultats trop tard\u00a0? Découvrez le forfait Essentiel.",
    upgradeHref: "#essentiel",
  },
  2: {
    key: "essentiel",
    name: "Essentiel",
    promise: "Anticiper",
    price: "350 €",
    explanation:
      "Vous ne cherchez pas uniquement à respecter vos obligations. Vous souhaitez voir venir vos échéances et disposer de premiers outils d'anticipation inclus dans votre forfait.",
    reasons: [
      "Vous recherchez davantage qu'une simple conformité annuelle.",
      "Vous souhaitez voir venir les échéances et les résultats plutôt que les subir.",
    ],
    cta: "Découvrir le forfait Essentiel",
    upgrade: "Vous souhaitez aussi comprendre les écarts et améliorer votre rentabilité\u00a0? Découvrez le forfait Premium.",
    upgradeHref: "#premium",
  },
  3: {
    key: "premium",
    name: "Premium",
    promise: "Piloter",
    price: "450 €",
    explanation:
      "Vous souhaitez anticiper vos résultats, comprendre les écarts et améliorer régulièrement les performances de votre entreprise. Le contrôle de gestion est intégré à votre accompagnement.",
    reasons: [
      "Vous voulez comprendre pourquoi les résultats évoluent.",
      "Vous souhaitez agir régulièrement sur les écarts et la rentabilité.",
    ],
    cta: "Découvrir le forfait Premium",
    upgrade: "Vous souhaitez également anticiper et optimiser votre trésorerie\u00a0? Découvrez le forfait Excellence.",
    upgradeHref: "#excellence",
  },
  4: {
    key: "excellence",
    name: "Excellence",
    promise: "Optimiser",
    price: "650 €",
    explanation:
      "Votre besoin porte sur un pilotage financier proactif\u00a0: performances, décisions et trésorerie sont suivies avec un temps d'avance afin de réduire les imprévus.",
    reasons: [
      "Vous souhaitez intégrer la trésorerie à vos décisions.",
      "Vous voulez anticiper les besoins de cash avant qu'ils ne deviennent urgents.",
    ],
    cta: "Découvrir le forfait Excellence",
    upgrade: "Ce niveau est adapté lorsque la trésorerie doit devenir un véritable outil de décision.",
    upgradeHref: "#excellence",
  },
};

/* ── Component ── */

export default function DiagnosticQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const progressPercent = showResult ? 100 : ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = useCallback(
    (level: number) => {
      const next = [...answers];
      next[currentIndex] = level;
      setAnswers(next);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowResult(true);
      }
    },
    [answers, currentIndex],
  );

  const goBack = useCallback(() => {
    if (showResult) {
      setShowResult(false);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [showResult, currentIndex]);

  const restart = useCallback(() => {
    setAnswers([]);
    setCurrentIndex(0);
    setShowResult(false);
  }, []);

  const recommendedLevel = Math.max(1, ...answers);
  const plan = planResults[recommendedLevel];

  return (
    <div className="max-w-[790px] mx-auto">
      <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-[0_18px_42px_rgba(31,48,96,0.11)] overflow-hidden">
        {/* Progress bar — hidden on result screen to avoid duplicate label */}
        {!showResult && (
          <div className="flex items-center gap-4 mb-6">
            <span className="flex-shrink-0 text-[11px] font-bold tracking-[0.14em] uppercase text-muted-foreground font-body">
              Question {currentIndex + 1} sur {questions.length}
            </span>
            <span className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <span
                className="block h-full rounded-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </span>
          </div>
        )}

        {/* Questions */}
        {!showResult && (
          <div>
            <div className="font-display text-accent text-[34px] leading-none font-bold mb-2">
              {questions[currentIndex].number}
            </div>
            <h3 className="font-display text-[26px] sm:text-[34px] leading-[1.08] tracking-tight text-primary mb-3">
              {questions[currentIndex].title}
            </h3>
            <p className="text-muted-foreground text-[14px] font-body mb-6">
              {questions[currentIndex].help}
            </p>

            <div className="grid gap-3">
              {questions[currentIndex].answers.map((a) => (
                <button
                  key={a.index}
                  type="button"
                  onClick={() => handleAnswer(a.level)}
                  className="w-full grid grid-cols-[43px_1fr_24px] items-center gap-3 p-4 rounded-2xl border border-border/60 bg-card text-left transition-all duration-200 hover:border-accent/60 hover:shadow-[0_10px_24px_rgba(31,48,96,0.08)] hover:-translate-y-0.5 active:scale-[0.99] group"
                >
                  <span className="w-[43px] h-[43px] rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-[13px]">
                    {a.index}
                  </span>
                  <span>
                    <strong className="block text-primary text-[14px] font-body">{a.label}</strong>
                    <small className="block text-muted-foreground text-[11px] leading-[1.45] mt-0.5 font-body">{a.sub}</small>
                  </span>
                  <span className="text-accent font-bold text-[21px] opacity-50 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {showResult && plan && (
          <div>
            <div className="flex items-center justify-between gap-4 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 px-6 sm:px-8 py-4 bg-primary text-primary-foreground rounded-t-3xl">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Votre recommandation</span>
              <span className="bg-accent text-accent-foreground rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase">
                Personnalisée
              </span>
            </div>

            <h3 className="font-display text-[42px] sm:text-[52px] leading-[0.95] font-bold text-primary mb-1">
              {plan.name}
            </h3>
            <p className="text-accent italic text-[14px] font-body mb-2">{plan.promise}</p>
            <p className="font-display text-[36px] sm:text-[42px] leading-none font-bold text-primary mb-5">
              {plan.price} <span className="text-[12px] font-body font-semibold text-muted-foreground">/mois HTVA</span>
            </p>

            <p className="text-muted-foreground text-[14px] font-body leading-relaxed pb-5 border-b border-border/40 mb-4">
              {plan.explanation}
            </p>

            <div className="grid gap-2.5 mb-5">
              {plan.reasons.map((r, i) => (
                <div key={i} className="flex gap-2.5 text-muted-foreground text-[12px] font-body">
                  <span className="text-accent font-bold flex-shrink-0">✓</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <Link
              to={`/contact/?forfait=${encodeURIComponent(plan.name)}`}
              className="block w-full bg-accent text-accent-foreground font-bold rounded-full py-4 px-6 text-center text-[14px] shadow-[0_15px_28px_rgba(239,43,45,0.25)] hover:brightness-110 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                {plan.cta}
                <span className="w-7 h-7 rounded-full bg-accent-foreground/15 flex items-center justify-center">
                  <ArrowUpRight size={13} />
                </span>
              </span>
            </Link>

            <div className="mt-4 p-4 rounded-2xl bg-secondary/60 text-muted-foreground text-[12px] font-body">
              {plan.upgrade}
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="flex items-center justify-between gap-4 mt-5 min-h-[24px]">
          {(currentIndex > 0 || showResult) ? (
            <button
              type="button"
              onClick={goBack}
              className="text-muted-foreground text-[12px] underline underline-offset-4 font-body hover:text-foreground transition-colors"
            >
              ← {showResult ? "Modifier la dernière réponse" : "Question précédente"}
            </button>
          ) : (
            <span />
          )}
          {showResult ? (
            <button
              type="button"
              onClick={restart}
              className="text-muted-foreground text-[11px] underline underline-offset-4 font-body hover:text-foreground transition-colors"
            >
              Recommencer le diagnostic
            </button>
          ) : (
            <span className="text-[10px] text-muted-foreground/60 ml-auto font-body">
              Aucune donnée personnelle demandée
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
