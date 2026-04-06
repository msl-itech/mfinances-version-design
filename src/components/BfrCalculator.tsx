import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BfrCalculator() {
  const [stocks, setStocks] = useState("");
  const [creances, setCreances] = useState("");
  const [dettes, setDettes] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const s = parseFloat(stocks) || 0;
    const c = parseFloat(creances) || 0;
    const d = parseFloat(dettes) || 0;
    setResult(s + c - d);
  };

  const fmt = (n: number) =>
    n.toLocaleString("fr-BE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " €";

  return (
    <div id="calculateur" className="bg-secondary rounded-2xl p-6 md:p-8 my-10 scroll-mt-24">
      <h2 className="font-display text-[20px] md:text-[24px] text-foreground mb-1">
        Calculez votre BFR en 2 minutes
      </h2>
      <p className="text-[14px] text-muted-foreground font-body mb-6">
        Entrez vos montants — le résultat s'affiche instantanément.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Stocks (€)", value: stocks, set: setStocks, placeholder: "ex. 5 200" },
          { label: "Créances clients (€)", value: creances, set: setCreances, placeholder: "ex. 68 000" },
          { label: "Dettes fournisseurs (€)", value: dettes, set: setDettes, placeholder: "ex. 11 500" },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-[13px] font-semibold text-foreground font-body mb-1.5">
              {f.label}
            </label>
            <input
              type="number"
              inputMode="numeric"
              className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-[15px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              placeholder={f.placeholder}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
            />
          </div>
        ))}
      </div>

      <Button variant="accent" className="rounded-full" onClick={calculate}>
        Calculer mon BFR <ArrowRight size={16} className="ml-1" />
      </Button>

      {result !== null && (
        <div className="mt-6 rounded-xl bg-card border border-border/50 p-5">
          <p className="text-[13px] text-muted-foreground font-body mb-1">Votre BFR estimé</p>
          <p className={`font-display text-[28px] ${result >= 0 ? "text-foreground" : "text-accent"}`}>
            {fmt(result)}
          </p>
          <p className="text-[13px] text-muted-foreground font-body mt-2">
            {result > 0
              ? "Votre entreprise doit mobiliser ce montant en permanence pour financer son cycle d'exploitation."
              : result < 0
                ? "BFR négatif — vous encaissez avant de payer. Un avantage de trésorerie."
                : "BFR nul — votre cycle d'exploitation s'autofinance exactement."}
          </p>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-1.5 text-accent font-semibold text-[14px] mt-4 hover:underline font-body"
          >
            Un expert MFinances analyse votre BFR avec vous — gratuitement <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
