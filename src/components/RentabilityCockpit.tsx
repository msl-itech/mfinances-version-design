import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, RotateCcw, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceLine {
  name: string;
  ca: string;
  costRate: number;
}

const createDefaults = (): ServiceLine[] => [
  { name: "Formations", ca: "4000", costRate: 30 },
  { name: "Conseil", ca: "4000", costRate: 45 },
  { name: "Audits", ca: "2000", costRate: 70 },
];

const DEFAULT_CHARGES = "5000";

export default function RentabilityCockpit() {
  const [services, setServices] = useState<ServiceLine[]>(createDefaults);
  const [chargesFixes, setChargesFixes] = useState(DEFAULT_CHARGES);
  const [computed, setComputed] = useState(false);

  const update = (i: number, field: keyof ServiceLine, value: string | number) => {
    setServices((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  };

  const addService = () => {
    if (services.length < 3) {
      setServices((prev) => [...prev, { name: `Service ${String.fromCharCode(65 + prev.length)}`, ca: "", costRate: 30 }]);
    }
  };

  const reset = useCallback(() => {
    setServices(createDefaults());
    setChargesFixes(DEFAULT_CHARGES);
    setComputed(false);
  }, []);

  const results = useMemo(() => {
    if (!computed) return null;
    const cf = parseFloat(chargesFixes) || 0;

    const lines = services.map((s) => {
      const ca = parseFloat(s.ca) || 0;
      const costRate = s.costRate;
      const margeContributive = ca * (1 - costRate / 100);
      return { name: s.name, ca, costRate, margeContributive };
    }).filter(l => l.ca > 0);

    if (lines.length === 0) return null;

    const totalCA = lines.reduce((sum, l) => sum + l.ca, 0);
    const totalMarge = lines.reduce((sum, l) => sum + l.margeContributive, 0);
    const tauxPondere = totalCA > 0 ? totalMarge / totalCA : 0;
    const seuil = tauxPondere > 0 ? cf / tauxPondere : 0;

    const contributions = lines.map((l) => {
      const weightCA = totalCA > 0 ? (l.ca / totalCA) * 100 : 0;
      const contribPct = totalMarge > 0 ? (l.margeContributive / totalMarge) * 100 : 0;
      const gap = weightCA - contribPct;
      let blindSeverity: "rouge" | "orange" | "none" = "none";
      if (gap > 25) blindSeverity = "rouge";
      else if (gap > 15) blindSeverity = "orange";

      return {
        name: l.name,
        ca: l.ca,
        margin: (1 - l.costRate / 100) * 100,
        weightCA,
        margeContributive: l.margeContributive,
        contribPct,
        gap,
        blindSeverity,
      };
    });

    const angleMort = contributions.find((c) => c.blindSeverity !== "none");
    const bestContributor = [...contributions].sort((a, b) => b.contribPct - a.contribPct)[0];
    const worstContributor = [...contributions].sort((a, b) => a.contribPct - b.contribPct)[0];

    // Profile priority: below > blind > ok
    let profile: "below" | "blind" | "ok";
    if (totalMarge < cf) {
      profile = "below";
    } else if (angleMort) {
      profile = "blind";
    } else {
      profile = "ok";
    }

    return {
      tauxPondere: tauxPondere * 100,
      seuil,
      totalCA,
      totalMarge,
      cf,
      contributions,
      bestContributor,
      worstContributor,
      angleMort,
      profile,
    };
  }, [computed, services, chargesFixes]);

  const fmt = (n: number) =>
    n.toLocaleString("fr-BE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " €";
  const pct = (n: number) => n.toFixed(1) + " %";

  const gaugeBarColor = (severity: "rouge" | "orange" | "none") => {
    if (severity === "rouge") return "bg-accent";
    if (severity === "orange") return "bg-[hsl(30,80%,50%)]";
    return "bg-[hsl(145,50%,38%)]";
  };

  const coverageRatio = results ? (results.totalCA / results.seuil) * 100 : 0;

  return (
    <TooltipProvider>
      <div id="cockpit" className="bg-secondary rounded-2xl p-6 md:p-8 my-10 scroll-mt-24">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <h2 className="font-display text-[22px] md:text-[26px] text-primary">
            Le Cockpit de Rentabilité
          </h2>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <RotateCcw size={14} /> Réinitialiser
          </button>
        </div>
        <p className="text-[14px] text-muted-foreground font-body mb-6 max-w-xl">
          Découvrez en 60 secondes quelle ligne de service porte votre business — et laquelle le pèse.
        </p>

        {/* Service inputs */}
        <div className="space-y-4 mb-6">
          {services.map((s, i) => (
            <div key={i} className="bg-card rounded-xl border border-border/50 p-4">
              {/* Service name */}
              <input
                type="text"
                className="w-full bg-transparent text-[15px] font-semibold text-foreground font-body mb-3 border-b border-border/30 pb-2 focus:outline-none focus:border-primary/40 placeholder:text-muted-foreground"
                placeholder={`Service ${String.fromCharCode(65 + i)}`}
                value={s.name}
                onChange={(e) => update(i, "name", e.target.value)}
              />
              {/* CA + Slider side by side — always 2 cols, even on 375px */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground font-body mb-1 uppercase tracking-wide">
                    CA mensuel (€)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[14px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                    placeholder="ex. 4 000"
                    value={s.ca}
                    onChange={(e) => update(i, "ca", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground font-body mb-1 uppercase tracking-wide">
                    Coûts directs : {s.costRate} %
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={s.costRate}
                    onChange={(e) => update(i, "costRate", parseInt(e.target.value))}
                    className="w-full h-2 mt-2 rounded-full appearance-none cursor-pointer accent-primary bg-muted"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add service button — hidden if 3 already */}
          {services.length < 3 && (
            <button
              onClick={addService}
              className="flex items-center gap-1.5 text-[13px] text-primary hover:text-primary-dark font-body font-semibold transition-colors"
            >
              <Plus size={14} /> Ajouter un service
            </button>
          )}

          {/* Charges fixes */}
          <div className="max-w-xs">
            <div className="flex items-center gap-1.5 mb-1">
              <label className="block text-[11px] font-semibold text-muted-foreground font-body uppercase tracking-wide">
                Charges fixes mensuelles (€)
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle size={13} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[240px] text-[12px]">
                  Loyer, salaires fixes, assurances, comptable, abonnements… Tout ce que vous payez même sans vendre.
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="number"
              inputMode="numeric"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[14px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="ex. 5 000"
              value={chargesFixes}
              onChange={(e) => setChargesFixes(e.target.value)}
            />
          </div>
        </div>

        <Button variant="accent" className="rounded-full" onClick={() => setComputed(true)}>
          Analyser ma rentabilité <ArrowRight size={16} className="ml-1" />
        </Button>

        {/* === RESULTS === */}
        {results && (
          <div className="mt-8 space-y-6">
            {/* 3 Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Gauge 1: Taux pondéré */}
              <div className="bg-card rounded-xl border border-border/50 p-5 text-center">
                <p className="text-[11px] text-muted-foreground font-body mb-2 uppercase tracking-wide">
                  Taux de marge pondéré
                </p>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${
                      results.tauxPondere < 30
                        ? "bg-accent"
                        : results.tauxPondere < 50
                        ? "bg-[hsl(30,80%,50%)]"
                        : "bg-[hsl(145,50%,38%)]"
                    }`}
                    style={{
                      width: `${Math.min(results.tauxPondere, 100)}%`,
                      transition: "width 900ms cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </div>
                <p className="font-display text-[24px] text-foreground">{pct(results.tauxPondere)}</p>
              </div>

              {/* Gauge 2: Seuil de rentabilité */}
              <div className="bg-card rounded-xl border border-border/50 p-5 text-center">
                <p className="text-[11px] text-muted-foreground font-body mb-2 uppercase tracking-wide">
                  Seuil de rentabilité
                </p>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${
                      coverageRatio < 80
                        ? "bg-accent"
                        : coverageRatio < 110
                        ? "bg-[hsl(30,80%,50%)]"
                        : "bg-[hsl(145,50%,38%)]"
                    }`}
                    style={{
                      width: `${Math.min(coverageRatio, 100)}%`,
                      transition: "width 900ms cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </div>
                <p className="font-display text-[24px] text-foreground">{fmt(results.seuil)}</p>
                <p className="text-[11px] text-muted-foreground font-body">
                  {coverageRatio >= 100
                    ? `CA actuel = ${pct(coverageRatio)} du seuil ✅`
                    : `CA actuel = ${pct(coverageRatio)} du seuil ⚠️`}
                </p>
              </div>

              {/* Gauge 3: Angle mort — tricolore */}
              <div className="bg-card rounded-xl border border-border/50 p-5 text-center">
                <p className="text-[11px] text-muted-foreground font-body mb-2 uppercase tracking-wide">
                  Détection angle mort
                </p>
                {(() => {
                  const worst = results.angleMort;
                  if (!worst) {
                    return (
                      <>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full rounded-full bg-[hsl(145,50%,38%)]"
                            style={{ width: "100%", transition: "width 900ms cubic-bezier(0.4,0,0.2,1)" }}
                          />
                        </div>
                        <p className="font-display text-[18px] text-[hsl(145,50%,38%)]">Mix équilibré</p>
                        <p className="text-[11px] text-muted-foreground font-body">
                          Aucun écart significatif détecté
                        </p>
                      </>
                    );
                  }
                  const severity = worst.blindSeverity;
                  const barColor = severity === "rouge" ? "bg-accent" : "bg-[hsl(30,80%,50%)]";
                  const textColor = severity === "rouge" ? "text-accent" : "text-[hsl(30,80%,50%)]";
                  const label = severity === "rouge" ? "Critique" : "Modéré";
                  return (
                    <>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full ${barColor}`}
                          style={{
                            width: `${Math.min(worst.gap, 50)}%`,
                            transition: "width 900ms cubic-bezier(0.4,0,0.2,1)",
                          }}
                        />
                      </div>
                      <p className={`font-display text-[18px] ${textColor}`}>
                        ⚠ {worst.name} — {label}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-body">
                        Écart CA/marge : {pct(worst.gap)}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Breakdown — CSS grid, no table */}
            <div>
              <p className="text-[12px] text-muted-foreground font-body mb-3 uppercase tracking-wide font-semibold">
                Détail par service
              </p>
              {/* Header row — hidden on mobile, shown sm+ */}
              <div className="hidden sm:grid sm:grid-cols-6 gap-2 text-[11px] text-muted-foreground font-body font-semibold uppercase tracking-wide pb-2 border-b border-border/40 px-3">
                <span>Service</span>
                <span>CA</span>
                <span>Marge</span>
                <span>Poids CA</span>
                <span>Contribution</span>
                <span>Signal</span>
              </div>
              {results.contributions.map((c, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 sm:grid-cols-6 gap-x-3 gap-y-1 py-3 px-3 border-b border-border/20 last:border-0 text-[13px] font-body"
                >
                  <span className="font-semibold text-foreground col-span-2 sm:col-span-1">{c.name}</span>
                  <span className="text-foreground/80">
                    <span className="sm:hidden text-muted-foreground text-[11px]">CA : </span>
                    {fmt(c.ca)}
                  </span>
                  <span className="text-foreground/80">
                    <span className="sm:hidden text-muted-foreground text-[11px]">Marge : </span>
                    {pct(c.margin)}
                  </span>
                  <span className="text-foreground/80">
                    <span className="sm:hidden text-muted-foreground text-[11px]">Poids : </span>
                    {pct(c.weightCA)}
                  </span>
                  <span className="text-foreground/80">
                    <span className="sm:hidden text-muted-foreground text-[11px]">Contrib : </span>
                    {pct(c.contribPct)}
                  </span>
                  <span>
                    {c.blindSeverity === "rouge" ? (
                      <span className="text-accent font-semibold">⚠ Critique</span>
                    ) : c.blindSeverity === "orange" ? (
                      <span className="text-[hsl(30,80%,50%)] font-semibold">⚠ Modéré</span>
                    ) : (
                      <span className="text-[hsl(145,50%,38%)]">✓ OK</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Profile message */}
            {results.profile === "blind" && results.angleMort && (
              <div className="bg-card border border-accent/20 rounded-xl p-6">
                <p className="font-display text-[18px] text-foreground mb-3">
                  Ce que ça signifie pour votre entreprise
                </p>
                <p className="text-[14px] text-foreground/80 font-body mb-5 leading-relaxed">
                  Votre service <strong>{results.angleMort.name}</strong> représente{" "}
                  {pct(results.angleMort.weightCA)} de votre chiffre d'affaires — mais seulement{" "}
                  {pct(results.angleMort.contribPct)} de votre marge totale. En clair : vous y
                  consacrez de l'énergie et des ressources pour un retour disproportionné. C'est
                  précisément ce type d'angle mort que nous identifions avec nos clients lors d'un
                  premier diagnostic de pilotage financier.
                </p>
                <p className="text-[14px] text-foreground/80 font-body mb-4">
                  Je veux comprendre ce que ça signifie pour mon entreprise
                </p>
                <Button variant="accent" className="rounded-full w-full" asChild>
                  <Link to="/contact/">
                    Prendre RDV gratuitement <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </div>
            )}

            {results.profile === "below" && (
              <div className="bg-card border border-accent/20 rounded-xl p-6">
                <p className="font-display text-[18px] text-foreground mb-3">
                  Votre seuil de rentabilité n'est pas encore atteint
                </p>
                <p className="text-[14px] text-foreground/80 font-body mb-5 leading-relaxed">
                  D'après vos chiffres, votre mix actuel génère une marge de{" "}
                  <strong>{fmt(results.totalMarge)}</strong>/mois pour des charges fixes de{" "}
                  <strong>{fmt(results.cf)}</strong>. L'écart est de{" "}
                  <strong>{fmt(results.cf - results.totalMarge)}</strong>. Ce n'est pas une fatalité
                  — c'est un levier. Augmenter la contribution de votre service{" "}
                  <strong>{results.worstContributor.name}</strong> de 10 points déplacerait
                  significativement votre point mort. Ce travail de repricing et de restructuration
                  d'offre, c'est exactement ce que nous faisons en contrôle de gestion.
                </p>
                <Button variant="accent" className="rounded-full w-full" asChild>
                  <Link to="/contact/">
                    Parler de ma situation à un expert <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </div>
            )}

            {results.profile === "ok" && (
              <div className="bg-card border border-border/50 rounded-xl p-6">
                <p className="font-display text-[18px] text-foreground mb-3">
                  Votre rentabilité repose sur des bases solides
                </p>
                <p className="text-[14px] text-foreground/80 font-body mb-5 leading-relaxed">
                  Votre mix de services est équilibré et votre seuil de rentabilité est atteint. La
                  prochaine étape n'est pas de maintenir — c'est de piloter cette performance dans le
                  temps. Construire un tableau de bord mensuel qui rend cette lecture automatique, vous
                  permet d'anticiper les dérives et de prendre des décisions sur la base de données
                  réelles — c'est ce que nos forfaits contrôle de gestion apportent chaque mois.
                </p>
                <Button className="rounded-full w-full bg-primary hover:bg-primary-light text-primary-foreground" asChild>
                  <Link to="/services/controle-de-gestion/">
                    Découvrir comment piloter cette performance <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
