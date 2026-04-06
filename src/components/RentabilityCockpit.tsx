import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceLine {
  name: string;
  ca: string;
  costRate: string;
}

const defaultLines: ServiceLine[] = [
  { name: "Service A", ca: "", costRate: "" },
  { name: "Service B", ca: "", costRate: "" },
  { name: "Service C", ca: "", costRate: "" },
];

export default function RentabilityCockpit() {
  const [services, setServices] = useState<ServiceLine[]>(defaultLines);
  const [chargesFixes, setChargesFixes] = useState("");
  const [computed, setComputed] = useState(false);

  const update = (i: number, field: keyof ServiceLine, value: string) => {
    setServices((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  };

  const results = useMemo(() => {
    if (!computed) return null;
    const cf = parseFloat(chargesFixes) || 0;
    const lines = services.map((s) => {
      const ca = parseFloat(s.ca) || 0;
      const cost = parseFloat(s.costRate) || 0;
      const margin = 100 - cost;
      return { name: s.name, ca, costRate: cost, margin };
    });

    const totalCA = lines.reduce((sum, l) => sum + l.ca, 0);
    if (totalCA === 0) return null;

    const weighted = lines.map((l) => ({
      ...l,
      weight: l.ca / totalCA,
      marginContrib: l.ca * (l.margin / 100),
    }));

    const totalMargin = weighted.reduce((sum, l) => sum + l.marginContrib, 0);
    const tauxPondere = totalCA > 0 ? totalMargin / totalCA : 0;
    const seuil = tauxPondere > 0 ? cf / tauxPondere : 0;
    const couverture = totalCA > 0 ? (totalCA / seuil) * 100 : 0;

    const contributions = weighted.map((l) => ({
      name: l.name,
      ca: l.ca,
      margin: l.margin,
      weight: l.weight * 100,
      marginContrib: l.marginContrib,
      contribPct: totalMargin > 0 ? (l.marginContrib / totalMargin) * 100 : 0,
      isAngleMort: l.weight * 100 > 20 && (totalMargin > 0 ? (l.marginContrib / totalMargin) * 100 : 0) < l.weight * 100 * 0.5,
    }));

    const bestContributor = [...contributions].sort((a, b) => b.contribPct - a.contribPct)[0];
    const angleMort = contributions.find((c) => c.isAngleMort);

    return { tauxPondere: tauxPondere * 100, seuil, couverture, contributions, bestContributor, angleMort, totalCA, cf };
  }, [computed, services, chargesFixes]);

  const fmt = (n: number) => n.toLocaleString("fr-BE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " €";
  const pct = (n: number) => n.toFixed(1) + " %";

  const gaugeColor = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return "bg-accent";
    if (value < thresholds[1]) return "bg-[hsl(30,80%,50%)]";
    return "bg-[hsl(145,50%,38%)]";
  };

  return (
    <div id="cockpit" className="bg-secondary rounded-2xl p-6 md:p-8 my-10 scroll-mt-24">
      <h2 className="font-display text-[20px] md:text-[24px] text-foreground mb-1">
        Cockpit de Rentabilité MFinances
      </h2>
      <p className="text-[14px] text-muted-foreground font-body mb-6">
        3 services • 60 secondes • Votre angle mort révélé.
      </p>

      {/* Input fields */}
      <div className="space-y-4 mb-6">
        {services.map((s, i) => (
          <div key={i} className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-foreground font-body mb-1">
                {i === 0 ? "Nom du service" : ""}
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-[14px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder={`Service ${String.fromCharCode(65 + i)}`}
                value={s.name}
                onChange={(e) => update(i, "name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-foreground font-body mb-1">
                {i === 0 ? "CA mensuel (€)" : ""}
              </label>
              <input
                type="number"
                inputMode="numeric"
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-[14px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="ex. 4 000"
                value={s.ca}
                onChange={(e) => update(i, "ca", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-foreground font-body mb-1">
                {i === 0 ? "Coûts directs (%)" : ""}
              </label>
              <input
                type="number"
                inputMode="numeric"
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-[14px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="ex. 30"
                value={s.costRate}
                onChange={(e) => update(i, "costRate", e.target.value)}
              />
            </div>
          </div>
        ))}

        <div className="max-w-[200px]">
          <label className="block text-[12px] font-semibold text-foreground font-body mb-1">
            Charges fixes mensuelles (€)
          </label>
          <input
            type="number"
            inputMode="numeric"
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-[14px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
            placeholder="ex. 5 000"
            value={chargesFixes}
            onChange={(e) => setChargesFixes(e.target.value)}
          />
        </div>
      </div>

      <Button variant="accent" className="rounded-full" onClick={() => setComputed(true)}>
        Calculer ma rentabilité <ArrowRight size={16} className="ml-1" />
      </Button>

      {/* Results */}
      {results && (
        <div className="mt-8 space-y-6">
          {/* 3 Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Gauge 1: Taux pondéré */}
            <div className="bg-card rounded-xl border border-border/50 p-5 text-center">
              <p className="text-[12px] text-muted-foreground font-body mb-2">Taux de marge pondéré</p>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${gaugeColor(results.tauxPondere, [30, 50])}`}
                  style={{ width: `${Math.min(results.tauxPondere, 100)}%` }}
                />
              </div>
              <p className="font-display text-[24px] text-foreground">{pct(results.tauxPondere)}</p>
            </div>

            {/* Gauge 2: Seuil */}
            <div className="bg-card rounded-xl border border-border/50 p-5 text-center">
              <p className="text-[12px] text-muted-foreground font-body mb-2">Seuil de rentabilité</p>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${gaugeColor(results.couverture, [80, 110])}`}
                  style={{ width: `${Math.min(results.couverture, 100)}%` }}
                />
              </div>
              <p className="font-display text-[24px] text-foreground">{fmt(results.seuil)}</p>
              <p className="text-[11px] text-muted-foreground font-body">
                {results.couverture >= 100
                  ? `CA actuel = ${pct(results.couverture)} du seuil ✅`
                  : `CA actuel = ${pct(results.couverture)} du seuil ⚠️`}
              </p>
            </div>

            {/* Gauge 3: Meilleur contributeur */}
            <div className="bg-card rounded-xl border border-border/50 p-5 text-center">
              <p className="text-[12px] text-muted-foreground font-body mb-2">Meilleur contributeur</p>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full bg-[hsl(145,50%,38%)] transition-all duration-700"
                  style={{ width: `${Math.min(results.bestContributor.contribPct, 100)}%` }}
                />
              </div>
              <p className="font-display text-[20px] text-foreground">{results.bestContributor.name}</p>
              <p className="text-[11px] text-muted-foreground font-body">
                {pct(results.bestContributor.contribPct)} de la marge totale
              </p>
            </div>
          </div>

          {/* Contribution table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] font-body border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-secondary text-foreground font-semibold border-b border-border/50">Service</th>
                  <th className="text-left py-3 px-4 bg-secondary text-foreground font-semibold border-b border-border/50">CA</th>
                  <th className="text-left py-3 px-4 bg-secondary text-foreground font-semibold border-b border-border/50">Marge</th>
                  <th className="text-left py-3 px-4 bg-secondary text-foreground font-semibold border-b border-border/50">Poids CA</th>
                  <th className="text-left py-3 px-4 bg-secondary text-foreground font-semibold border-b border-border/50">Contribution</th>
                  <th className="text-left py-3 px-4 bg-secondary text-foreground font-semibold border-b border-border/50">Signal</th>
                </tr>
              </thead>
              <tbody>
                {results.contributions.filter((c) => c.ca > 0).map((c, i) => (
                  <tr key={i} className="border-b border-border/30 last:border-0">
                    <td className="py-3 px-4 font-semibold text-foreground">{c.name}</td>
                    <td className="py-3 px-4 text-foreground/80">{fmt(c.ca)}</td>
                    <td className="py-3 px-4 text-foreground/80">{pct(c.margin)}</td>
                    <td className="py-3 px-4 text-foreground/80">{pct(c.weight)}</td>
                    <td className="py-3 px-4 text-foreground/80">{pct(c.contribPct)}</td>
                    <td className="py-3 px-4">
                      {c.isAngleMort ? (
                        <span className="text-accent font-semibold">⚠ Angle mort</span>
                      ) : (
                        <span className="text-[hsl(145,50%,38%)]">✓ OK</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Angle mort alert */}
          {results.angleMort && (
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-5">
              <p className="text-[14px] font-semibold text-accent font-body mb-1">
                ⚠ Angle mort détecté : {results.angleMort.name}
              </p>
              <p className="text-[13px] text-foreground/80 font-body">
                Ce service représente {pct(results.angleMort.weight)} de votre CA mais seulement {pct(results.angleMort.contribPct)} de votre marge totale. Il génère du volume sans contribuer à couvrir vos charges fixes.
              </p>
            </div>
          )}

          {/* Dynamic CTA based on results */}
          <div className="bg-primary rounded-xl p-6 text-center">
            <p className="text-[14px] text-primary-foreground/80 font-body mb-3">
              {results.couverture >= 110
                ? "Votre rentabilité semble solide — optimisons votre mix pour maximiser vos marges."
                : results.couverture >= 80
                  ? "Vous êtes proche du seuil — un ajustement de votre mix peut sécuriser vos marges."
                  : "Attention : votre CA actuel ne couvre pas votre seuil. Agissons ensemble."}
            </p>
            <Button variant="accent" className="rounded-full" asChild>
              <Link to="/contact/">
                Prendre rendez-vous <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
