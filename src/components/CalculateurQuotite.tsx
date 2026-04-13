import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Plus, X, Check, Info } from "lucide-react";
import { submitLead } from "@/lib/odoo-submit";
import { Link } from "react-router-dom";
import { generateQuotitePdf } from "@/lib/generate-quotite-pdf";
import { supabase } from "@/integrations/supabase/client";

/* ── Types ── */
interface Piece {
  id: string;
  name: string;
  surface: number;
  type: "vie" | "mansardee" | "cave";
  usagePro: number;
}

const PIECE_TYPES: Record<string, { label: string; coeff: number }> = {
  vie: { label: "Pièce de vie — 100 %", coeff: 1 },
  mansardee: { label: "Mansardée — 80 %", coeff: 0.8 },
  cave: { label: "Cave / grenier — 20 %", coeff: 0.2 },
};

const DEFAULT_PIECES: Piece[] = [
  { id: "1", name: "Bureau / Pièce pro", surface: 12, type: "vie", usagePro: 100 },
  { id: "2", name: "Salon", surface: 25, type: "vie", usagePro: 10 },
  { id: "3", name: "Chambre principale", surface: 18, type: "vie", usagePro: 0 },
];

let pieceCounter = 4;

/* ── Component ── */
export default function CalculateurQuotite() {
  const [step, setStep] = useState(1);
  const [pieces, setPieces] = useState<Piece[]>(DEFAULT_PIECES);

  // Step 2 – Charges
  const [adresse, setAdresse] = useState("");
  const [loyerMensuel, setLoyerMensuel] = useState<number | "">("");
  const [energie, setEnergie] = useState<number | "">("");
  const [internet, setInternet] = useState<number | "">("");
  const [assurance, setAssurance] = useState<number | "">("");
  const [precompte, setPrecompte] = useState<number | "">("");

  // Step 3 – Contact
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [statut, setStatut] = useState("dirigeant");
  const [logement, setLogement] = useState("locataire");

  // Step 4 – Sent
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  /* ── Calculs ── */
  const { surfacePro, surfaceTotal, quotite } = useMemo(() => {
    let pro = 0;
    let total = 0;
    pieces.forEach((p) => {
      const coeff = PIECE_TYPES[p.type]?.coeff ?? 1;
      const pondere = p.surface * coeff;
      total += pondere;
      pro += pondere * (p.usagePro / 100);
    });
    return {
      surfacePro: pro,
      surfaceTotal: total,
      quotite: total > 0 ? (pro / total) * 100 : 0,
    };
  }, [pieces]);

  const loyerAnnuel = typeof loyerMensuel === "number" ? loyerMensuel * 12 : 0;
  const chargesTotal =
    loyerAnnuel +
    (typeof energie === "number" ? energie : 0) +
    (typeof internet === "number" ? internet : 0) +
    (typeof assurance === "number" ? assurance : 0) +
    (typeof precompte === "number" ? precompte : 0);

  const deductionAnnuelle = chargesTotal * (quotite / 100);
  const deductionMensuelle = deductionAnnuelle / 12;

  const chargesDetails = useMemo(() => {
    const items: { label: string; montant: number; deduit: number }[] = [];
    if (loyerAnnuel > 0) items.push({ label: `Loyer annuel (×12) — ${fmt(loyerAnnuel)} €`, montant: loyerAnnuel, deduit: loyerAnnuel * (quotite / 100) });
    if (typeof energie === "number" && energie > 0) items.push({ label: `Énergie — ${fmt(energie)} €`, montant: energie, deduit: energie * (quotite / 100) });
    if (typeof internet === "number" && internet > 0) items.push({ label: `Internet — ${fmt(internet)} €`, montant: internet, deduit: internet * (quotite / 100) });
    if (typeof assurance === "number" && assurance > 0) items.push({ label: `Assurance habitation — ${fmt(assurance)} €`, montant: assurance, deduit: assurance * (quotite / 100) });
    if (typeof precompte === "number" && precompte > 0) items.push({ label: `Précompte immobilier — ${fmt(precompte)} €`, montant: precompte, deduit: precompte * (quotite / 100) });
    return items;
  }, [loyerAnnuel, energie, internet, assurance, precompte, quotite]);

  /* ── Helpers ── */
  function fmt(n: number) {
    return n.toLocaleString("fr-BE", { maximumFractionDigits: 0 });
  }

  function fmtDec(n: number) {
    return n.toLocaleString("fr-BE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  const addPiece = useCallback(() => {
    const id = String(pieceCounter++);
    setPieces((prev) => [...prev, { id, name: "Nouvelle pièce", surface: 10, type: "vie", usagePro: 0 }]);
  }, []);

  const removePiece = useCallback((id: string) => {
    setPieces((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updatePiece = useCallback((id: string, field: keyof Piece, value: any) => {
    setPieces((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }, []);

  const numVal = (v: string) => {
    const n = parseFloat(v.replace(",", "."));
    return isNaN(n) ? "" : n;
  };

  const handleSubmit = async () => {
    if (!prenom.trim() || !email.trim()) return;
    setSending(true);

    const statutLabel = statut === "dirigeant" ? "Dirigeant(e) de société" : statut === "independant" ? "Indépendant(e)" : statut === "les-deux" ? "Les deux" : "Profession libérale";
    const logementLabel = logement === "locataire" ? "Locataire" : "Propriétaire";

    const description = [
      `[Calculateur quotiété bureau]`,
      `Quotiété : ${fmtDec(quotite)} %`,
      `Surface pro pondérée : ${fmtDec(surfacePro)} m² / ${fmtDec(surfaceTotal)} m²`,
      `Charges totales : ${fmt(chargesTotal)} €/an`,
      `Déduction estimée : ${fmt(Math.round(deductionAnnuelle))} €/an`,
      `Statut : ${statutLabel}`,
      `Logement : ${logementLabel}`,
      adresse ? `Adresse : ${adresse}` : "",
      `Pièces : ${pieces.map((p) => `${p.name} (${p.surface}m², ${p.usagePro}% pro, ${PIECE_TYPES[p.type].label})`).join(" | ")}`,
    ].filter(Boolean).join("\n");

    // Generate PDF
    try {
      const pdfBlob = generateQuotitePdf({
        prenom,
        email,
        telephone,
        adresse,
        statut,
        logement,
        pieces: pieces.map(p => ({ name: p.name, surface: p.surface, type: p.type, usagePro: p.usagePro })),
        loyerMensuel: typeof loyerMensuel === "number" ? loyerMensuel : 0,
        energie: typeof energie === "number" ? energie : 0,
        internet: typeof internet === "number" ? internet : 0,
        assurance: typeof assurance === "number" ? assurance : 0,
        precompte: typeof precompte === "number" ? precompte : 0,
      });

      const fileName = `quotite-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("bail-pdfs")
        .upload(fileName, pdfBlob, { contentType: "application/pdf" });

      let downloadUrl = "";
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("bail-pdfs").getPublicUrl(fileName);
        downloadUrl = urlData?.publicUrl || "";
      }

      // Send email with PDF link
      if (downloadUrl) {
        const idempotencyKey = `quotite-pdf-${fileName}`;
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "quotite-pdf-ready",
            recipientEmail: email,
            idempotencyKey,
            templateData: {
              name: prenom,
              quotite: fmtDec(quotite),
              deduction: fmt(Math.round(deductionAnnuelle)),
              downloadUrl,
            },
          },
        });
      }
    } catch (err) {
      console.error("PDF generation/upload error:", err);
    }

    // Submit lead to Odoo
    await submitLead({
      name: prenom,
      email_from: email,
      phone: telephone || undefined,
      description,
    });

    setSending(false);
    setSent(true);
  };

  /* ── Progress bar (mobile) ── */
  const progressBar = (
    <div className="flex gap-1 mb-5">
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          className={`flex-1 h-1 rounded-full ${
            s < step ? "bg-primary" : s === step ? "bg-accent" : "bg-border"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-secondary py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-12">
      {/* ── Stepper (desktop) ── */}
      <div className="hidden sm:flex items-center max-w-[720px] mx-auto mb-8">
        {[1, 2, 3, 4].map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0 transition-colors ${
                s < step
                  ? "bg-green-700 text-white"
                  : s === step
                  ? "bg-accent text-accent-foreground shadow-[0_0_0_4px_hsl(var(--accent)/0.2)]"
                  : "bg-border text-muted-foreground"
              }`}
            >
              {s < step ? <Check size={14} /> : s}
            </div>
            {i < 3 && (
              <div className={`flex-1 h-0.5 mx-1 ${s < step ? "bg-green-700" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ══════════ STEP 1 ══════════ */}
      {step === 1 && (
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 max-w-[720px] mx-auto shadow-sm">
          <div className="mb-5">
            <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mb-2.5">
              Étape 1 / 4
            </span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[13px] font-semibold flex-shrink-0">1</div>
              <div>
                <div className="text-[11px] text-muted-foreground">Surfaces</div>
                <div className="text-[16px] font-semibold text-foreground">Mes pièces</div>
              </div>
            </div>
          </div>

          {progressBar}

          <div className="bg-blue-50 border-l-[3px] border-blue-700 rounded-r-lg p-3 text-[12px] text-blue-800 leading-relaxed mb-5">
            <Info size={14} className="inline mr-1.5 -mt-0.5" />
            Renseignez chaque pièce, sa surface et sa pondération. Ajustez le curseur pour indiquer l'usage professionnel. La quotiété se calcule automatiquement.
          </div>

          {/* Header */}
          <div className="hidden md:grid grid-cols-[minmax(160px,1.2fr)_72px_170px_minmax(140px,1fr)_28px] gap-3 pb-2 border-b border-border mb-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Pièce</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">M²</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Type de pièce</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Usage pro</span>
            <span />
          </div>

          {/* Rows */}
          {pieces.map((piece) => (
            <div key={piece.id} className="group grid grid-cols-1 md:grid-cols-[minmax(160px,1.2fr)_72px_170px_minmax(140px,1fr)_28px] gap-3 items-center py-3 border-b border-border/30 hover:bg-secondary/40 transition-colors rounded-md px-1 -mx-1">
              {/* Nom de la pièce */}
              <div className="flex items-center gap-2">
                <Input
                  value={piece.name}
                  onChange={(e) => updatePiece(piece.id, "name", e.target.value)}
                  className="h-9 text-[13px] font-medium bg-transparent border-0 px-0 focus-visible:ring-0 shadow-none flex-1"
                />
                <button onClick={() => removePiece(piece.id)} className="text-muted-foreground/50 hover:text-destructive transition-colors md:hidden p-1 min-w-[36px] min-h-[36px] flex items-center justify-center">
                  <X size={14} />
                </button>
              </div>

              {/* Mobile: 2-col layout for m² + type */}
              <div className="grid grid-cols-2 md:contents gap-2">
                <div>
                  <span className="text-[10px] text-muted-foreground md:hidden mb-0.5 block">Surface (m²)</span>
                  <Input
                    type="number"
                    value={piece.surface || ""}
                    onChange={(e) => updatePiece(piece.id, "surface", numVal(e.target.value) || 0)}
                    className="h-[36px] text-[13px] font-semibold text-primary text-center bg-secondary border-border rounded-md w-full"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground md:hidden mb-0.5 block">Type de pièce</span>
                  <Select value={piece.type} onValueChange={(v) => updatePiece(piece.id, "type", v)}>
                    <SelectTrigger className="h-[36px] text-[11px] bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PIECE_TYPES).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="text-[12px]">{v.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Slider usage pro */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground md:hidden mr-1">Usage pro</span>
                <Slider
                  value={[piece.usagePro]}
                  onValueChange={([v]) => updatePiece(piece.id, "usagePro", v)}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-[12px] font-semibold text-primary min-w-[38px] text-right tabular-nums">{piece.usagePro} %</span>
              </div>

              {/* Bouton supprimer (desktop) */}
              <button onClick={() => removePiece(piece.id)} className="text-muted-foreground/30 hover:text-destructive transition-colors hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100">
                <X size={14} />
              </button>
            </div>
          ))}

          <button onClick={addPiece} className="flex items-center gap-2 text-primary text-[12px] font-medium py-3 min-h-[48px] hover:underline">
            <div className="w-[22px] h-[22px] border-[1.5px] border-dashed border-primary rounded-full flex items-center justify-center">
              <Plus size={13} />
            </div>
            Ajouter une pièce
          </button>

          {/* Résultat live */}
          <div className="bg-secondary border border-border rounded-xl p-3 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <div className="text-[12px] text-muted-foreground">Surface pondérée professionnelle</div>
              <div className="text-[13px] font-semibold text-primary mt-0.5">
                {fmtDec(surfacePro)} m² pro / {fmtDec(surfaceTotal)} m² total
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-muted-foreground">Quotiété calculée</div>
              <div className="text-[22px] font-bold text-accent">{fmtDec(quotite)} %</div>
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <Button onClick={() => setStep(2)} className="rounded-lg bg-primary text-primary-foreground">
              Suivant — Mes charges <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ══════════ STEP 2 ══════════ */}
      {step === 2 && (
        <div className="bg-card border border-border border-t-[3px] border-t-primary rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 max-w-[720px] mx-auto shadow-sm">
          <div className="mb-5">
            <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mb-2.5">
              Étape 2 / 4
            </span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[13px] font-semibold flex-shrink-0">2</div>
              <div>
                <div className="text-[11px] text-muted-foreground">Charges</div>
                <div className="text-[16px] font-semibold text-foreground">Mon logement et mes charges annuelles</div>
              </div>
            </div>
          </div>

          {progressBar}

          <div className="bg-blue-50 border-l-[3px] border-blue-700 rounded-r-lg p-3 text-[12px] text-blue-800 leading-relaxed mb-5">
            <Info size={14} className="inline mr-1.5 -mt-0.5" />
            Renseignez vos charges annuelles. Le loyer mensuel sera multiplié automatiquement par 12.
          </div>

          <div className="mb-4">
            <Label className="text-[11px] text-muted-foreground font-medium">Adresse du bien (optionnel — pour votre rapport PDF)</Label>
            <Input value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Rue de la Loi 12, 1040 Bruxelles" className="mt-1 h-9 text-[13px]" />
          </div>

          <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border">
            Charges annuelles
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Loyer mensuel (×12)</Label>
              <div className="relative mt-1">
                <Input type="number" value={loyerMensuel} onChange={(e) => setLoyerMensuel(numVal(e.target.value))} placeholder="1 200" className="h-9 text-[13px] pr-16" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">€/mois</span>
              </div>
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Énergie / an</Label>
              <div className="relative mt-1">
                <Input type="number" value={energie} onChange={(e) => setEnergie(numVal(e.target.value))} placeholder="2 400" className="h-9 text-[13px] pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">€</span>
              </div>
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Internet / an</Label>
              <div className="relative mt-1">
                <Input type="number" value={internet} onChange={(e) => setInternet(numVal(e.target.value))} placeholder="600" className="h-9 text-[13px] pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">€</span>
              </div>
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Assurance habitation / an</Label>
              <div className="relative mt-1">
                <Input type="number" value={assurance} onChange={(e) => setAssurance(numVal(e.target.value))} placeholder="350" className="h-9 text-[13px] pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">€</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <Label className="text-[11px] text-muted-foreground font-medium">Précompte immobilier / an (si propriétaire)</Label>
              <div className="relative mt-1">
                <Input type="number" value={precompte} onChange={(e) => setPrecompte(numVal(e.target.value))} placeholder="0" className="h-9 text-[13px] pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">€</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-1">
            <div className="bg-secondary border border-border rounded-xl p-3 flex justify-between items-center">
              <span className="text-[12px] text-muted-foreground">Charges totales / an</span>
              <span className="text-[14px] font-bold text-primary">{fmt(chargesTotal)} €</span>
            </div>
            <div className="bg-primary/10 border border-primary/15 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[12px] text-primary">Déduction estimée / an ({fmtDec(quotite)} %)</span>
              <span className="text-[14px] font-bold text-accent">{fmt(Math.round(deductionAnnuelle))} €</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-5">
            <button onClick={() => setStep(1)} className="text-[12px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Retour
            </button>
            <Button onClick={() => setStep(3)} className="rounded-lg bg-primary text-primary-foreground">
              Suivant <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ══════════ STEP 3 ══════════ */}
      {step === 3 && (
        <div className="bg-card border border-border border-t-[3px] border-t-primary rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 max-w-[720px] mx-auto shadow-sm">
          <div className="mb-5">
            <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mb-2.5">
              Étape 3 / 4
            </span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[13px] font-semibold flex-shrink-0">3</div>
              <div>
                <div className="text-[11px] text-muted-foreground">Votre rapport</div>
                <div className="text-[16px] font-semibold text-foreground">Recevoir votre rapport PDF</div>
              </div>
            </div>
          </div>

          {progressBar}

          <div className="bg-blue-50 border-l-[3px] border-blue-700 rounded-r-lg p-3 text-[12px] text-blue-800 leading-relaxed mb-5">
            <Info size={14} className="inline mr-1.5 -mt-0.5" />
            Votre rapport PDF personnalisé sera envoyé à votre adresse email dans les 2 minutes. 100 % confidentiel — aucune revente de données.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Prénom *</Label>
              <Input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Votre prénom" className="mt-1 h-9 text-[13px]" required />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Téléphone (optionnel)</Label>
              <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="+32 …" className="mt-1 h-9 text-[13px]" />
            </div>
            <div className="md:col-span-2">
              <Label className="text-[11px] text-muted-foreground font-medium">E-mail professionnel *</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.be" className="mt-1 h-9 text-[13px]" required />
            </div>
          </div>

          <Label className="text-[11px] text-muted-foreground font-medium mb-2 block">Vous êtes</Label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { value: "dirigeant", label: "Dirigeant(e) de société" },
              { value: "independant", label: "Indépendant(e)" },
              { value: "les-deux", label: "Les deux" },
              { value: "liberal", label: "Profession libérale" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatut(opt.value)}
                className={`border rounded-lg px-3 py-2.5 text-[12px] font-semibold text-left transition-colors ${
                  statut === opt.value
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <Label className="text-[11px] text-muted-foreground font-medium mb-2 block">Votre logement</Label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { value: "locataire", label: "Locataire" },
              { value: "proprietaire", label: "Propriétaire" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setLogement(opt.value)}
                className={`border rounded-lg px-3 py-2.5 text-[12px] font-semibold text-left transition-colors ${
                  logement === opt.value
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="text-[10px] text-muted-foreground text-center leading-relaxed my-3">
            Vos données sont confidentielles. Vous recevrez uniquement votre rapport et des conseils MFinances. Aucune revente.
          </p>

          <div className="flex justify-between items-center mt-5">
            <button onClick={() => setStep(2)} className="text-[12px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Retour
            </button>
            <Button
              onClick={() => { handleSubmit(); setStep(4); }}
              disabled={!prenom.trim() || !email.trim()}
              variant="accent"
              className="rounded-lg"
            >
              Voir mes résultats <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ══════════ STEP 4 ══════════ */}
      {step === 4 && (
        <div className="bg-card border border-border border-t-[3px] border-t-accent rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 max-w-[720px] mx-auto shadow-sm">
          <div className="mb-5">
            <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-green-50 text-green-800 mb-2.5">
              ✓ Calcul terminé
            </span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-[13px] font-semibold flex-shrink-0">
                <Check size={16} />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground">Calcul terminé</div>
                <div className="text-[16px] font-semibold text-foreground">Votre quotiété professionnelle</div>
              </div>
            </div>
          </div>

          {progressBar}

          {/* Grand résultat */}
          <div className="bg-primary rounded-xl p-5 sm:p-7 text-center mb-5">
            <div className="text-[12px] text-muted-foreground/70 mb-2">Quotiété professionnelle calculée</div>
            <div className="font-display text-[48px] sm:text-[64px] font-light text-primary-foreground leading-none">
              {fmtDec(quotite)}<sup className="text-[22px] sm:text-[28px] align-super">%</sup>
            </div>
            <div className="text-[12px] sm:text-[13px] text-muted-foreground/70 mt-2">
              {fmtDec(surfacePro)} m² pro / {fmtDec(surfaceTotal)} m² totaux
            </div>
          </div>

          {/* Déductions */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="bg-secondary border border-border rounded-xl p-3.5">
              <div className="text-[11px] text-muted-foreground mb-1.5">Déduction estimée / an</div>
              <div className="text-[22px] font-semibold text-foreground">{fmt(Math.round(deductionAnnuelle))} €</div>
              <div className="text-[10px] text-muted-foreground mt-1">Sur la base de vos charges</div>
            </div>
            <div className="bg-secondary border border-border rounded-xl p-3.5">
              <div className="text-[11px] text-muted-foreground mb-1.5">Déduction estimée / mois</div>
              <div className="text-[22px] font-semibold text-foreground">{fmt(Math.round(deductionMensuelle))} €</div>
              <div className="text-[10px] text-muted-foreground mt-1">Moyenne mensuelle</div>
            </div>
          </div>

          {/* Simulateur par poste */}
          {chargesDetails.length > 0 && (
            <div className="bg-secondary border border-border rounded-xl p-3.5 mb-4">
              <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2.5">
                Simulateur par poste de charge
              </div>
              {chargesDetails.map((d, i) => (
                <div key={i} className="flex justify-between py-1.5 text-[12px] border-b border-border/50 last:border-0 last:font-bold last:text-[13px] last:text-primary last:pt-2">
                  <span className="text-muted-foreground">{d.label}</span>
                  <span className="font-semibold text-foreground">→ {fmt(Math.round(d.deduit))} € déduits</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 text-[13px] font-bold text-primary border-t border-border mt-1">
                <span>Total déductible / an</span>
                <span className="text-accent">{fmt(Math.round(deductionAnnuelle))} €</span>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="mt-5 space-y-2">
            {sent ? (
              <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-center">
                <div className="text-[14px] font-bold text-green-800">✓ Rapport envoyé à {email}</div>
                <div className="text-[12px] text-green-700 mt-1">Vérifiez vos spams si vous ne le recevez pas d'ici 2 minutes.</div>
              </div>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={sending}
                variant="accent"
                className="w-full rounded-lg"
              >
                {sending ? "Envoi en cours…" : "Recevoir mon rapport PDF par email →"}
              </Button>
            )}
            <Button variant="outline" className="w-full rounded-lg border-2 border-primary" asChild>
              <Link to="/contact/">Faire le diagnostic de ma situation <ArrowRight size={16} className="ml-1" /></Link>
            </Button>
            <Link to="/contact/" className="block text-center text-[12px] text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
              Parler directement à Mika →
            </Link>
          </div>

          <p className="text-[10px] text-muted-foreground text-center leading-relaxed mt-4">
            Ce résultat est une estimation. Il ne remplace pas une analyse personnalisée par un expert-comptable agréé. MFinances · ITAA n°50.624.805
          </p>
        </div>
      )}
    </div>
  );
}
