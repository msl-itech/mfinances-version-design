import { useState, useCallback, useMemo, type ReactNode } from "react";
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
import { ArrowRight, ArrowLeft, Plus, X, Check, Info, AlertTriangle, Lock as LockIcon } from "lucide-react";
import { submitLead } from "@/lib/odoo-submit";
import { withUtm, trackLeadSource } from "@/lib/utm-enrich";
import { Link } from "react-router-dom";
import { generateBailPdf } from "@/lib/generate-bail-pdf";
import { supabase } from "@/integrations/supabase/client";
import BookingCta from "@/components/BookingCta";

/* ── Types ── */
interface Meuble {
  id: string;
  designation: string;
  valeur: number | "";
}

type BailType = "immeuble" | "meuble";
type Qualite = "proprietaire" | "locataire";

type StepDefinition = {
  num: number;
  label: string;
};

const STEPS: StepDefinition[] = [
  { num: 1, label: "Type" },
  { num: 2, label: "Bailleur" },
  { num: 3, label: "Preneur" },
  { num: 4, label: "Bien" },
  { num: 5, label: "Conditions" },
  { num: 6, label: "Finaliser" },
];

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center max-w-[760px] mx-auto mb-8">
      {STEPS.map((s, i) => (
        <div key={s.num} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0 transition-colors ${
                s.num < step
                  ? "bg-green-700 text-white"
                  : s.num === step
                    ? "bg-accent text-accent-foreground shadow-[0_0_0_4px_hsl(var(--accent)/0.2)]"
                    : "bg-border text-muted-foreground"
              }`}
            >
              {s.num < step ? <Check size={14} /> : s.num}
            </div>
            <span className="hidden md:block text-[9px] text-muted-foreground mt-1">{s.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mx-1 ${s.num < step ? "bg-green-700" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-1 mb-5">
      {STEPS.map((s) => (
        <div
          key={s.num}
          className={`flex-1 h-1 rounded-full ${
            s.num < step ? "bg-primary" : s.num === step ? "bg-accent" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function NavRow({
  prev,
  next,
  nextLabel,
  nextAccent,
  onNavigate,
}: {
  prev?: number;
  next?: number;
  nextLabel: string;
  nextAccent?: boolean;
  onNavigate: (step: number) => void;
}) {
  return (
    <div className="flex justify-between items-center mt-6">
      {prev ? (
        <button
          type="button"
          onClick={() => onNavigate(prev)}
          className="text-[12px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Retour
        </button>
      ) : (
        <span />
      )}
      {next && (
        <Button onClick={() => onNavigate(next)} variant={nextAccent ? "accent" : "default"} className="rounded-lg">
          {nextLabel} <ArrowRight size={16} className="ml-1" />
        </Button>
      )}
    </div>
  );
}

function TypeCard({
  selected,
  onClick,
  title,
  desc,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border rounded-xl p-4 text-left transition-all ${
        selected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/40"
      }`}
    >
      <div className={`w-2.5 h-2.5 rounded-full mb-2.5 ${selected ? "bg-primary" : "border-[1.5px] border-muted-foreground/30"}`} />
      <div className="text-[13px] font-semibold text-foreground mb-1 flex items-center gap-2">
        {title}
        {badge && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{badge}</span>}
      </div>
      <div className="text-[11px] text-muted-foreground leading-relaxed">{desc}</div>
    </button>
  );
}

function Card({ children, accent, showStepBorder }: { children: ReactNode; accent?: boolean; showStepBorder?: boolean }) {
  return (
    <div
      className={`bg-card border border-border ${showStepBorder ? "border-t-[3px]" : ""} ${accent ? "border-t-accent" : "border-t-primary"} rounded-2xl p-6 md:p-7 max-w-[760px] mx-auto shadow-sm`}
    >
      {children}
    </div>
  );
}

function StepHeader({ label, title, step }: { label: string; title: string; step: number }) {
  return (
    <div className="mb-5">
      <span
        className={`inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-2.5 ${
          step === 6 ? "bg-green-50 text-green-800" : "bg-primary/10 text-primary"
        }`}
      >
        {step === 6 ? "✓ Bail prêt à générer" : `Étape ${step} / 6`}
      </span>
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold flex-shrink-0 ${
            step === 6 ? "bg-green-700 text-white" : "bg-primary text-primary-foreground"
          }`}
        >
          {step === 6 ? <Check size={16} /> : step}
        </div>
        <div>
          <div className="text-[11px] text-muted-foreground">{label}</div>
          <div className="text-[16px] font-semibold text-foreground">{title}</div>
        </div>
      </div>
    </div>
  );
}

let meubleCounter = 4;

export default function GenerateurBail() {
  const [step, setStep] = useState(1);

  // Step 1 – Type
  const [bailType, setBailType] = useState<BailType>("immeuble");
  const [qualite, setQualite] = useState<Qualite>("proprietaire");

  // Step 2 – Bailleur
  const [civilite, setCivilite] = useState("M.");
  const [prenomBailleur, setPrenomBailleur] = useState("");
  const [nomBailleur, setNomBailleur] = useState("");
  const [adresseBailleur, setAdresseBailleur] = useState("");
  const [cpBailleur, setCpBailleur] = useState("");
  const [villeBailleur, setVilleBailleur] = useState("");
  const [paysBailleur, setPaysBailleur] = useState("Belgique");
  const [coBailleur, setCoBailleur] = useState(false);

  // Step 3 – Preneur
  const [denomination, setDenomination] = useState("");
  const [formeJuridique, setFormeJuridique] = useState("SRL");
  const [siegeSocial, setSiegeSocial] = useState("");
  const [numeroBce, setNumeroBce] = useState("");
  const [representant, setRepresentant] = useState("");

  // Step 4 – Bien
  const [adresseBien, setAdresseBien] = useState("");
  const [surfaceBien, setSurfaceBien] = useState<number | "">("");
  const [descriptionBien, setDescriptionBien] = useState("");
  const [meubles, setMeubles] = useState<Meuble[]>([
    { id: "1", designation: "Bureau en bois", valeur: 450 },
    { id: "2", designation: "Chaise ergonomique", valeur: 280 },
    { id: "3", designation: "Étagère 5 tablettes", valeur: 120 },
  ]);

  // Step 5 – Conditions
  const [loyerMensuel, setLoyerMensuel] = useState<number | "">("");
  const [garantie, setGarantie] = useState("1");
  const [duree, setDuree] = useState("9");
  const [dateDebut, setDateDebut] = useState("");
  const [repartition, setRepartition] = useState([60]);
  const [indexation, setIndexation] = useState(true);

  // Step 6 – Contact
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  /* ── Calculs ── */
  const partImmeuble = repartition[0];
  const partMeubles = 100 - partImmeuble;
  const loyerNum = typeof loyerMensuel === "number" ? loyerMensuel : 0;
  const loyerImmeuble = loyerNum * (partImmeuble / 100);
  const loyerMeubles = loyerNum * (partMeubles / 100);
  const totalMeubles = useMemo(() => meubles.reduce((s, m) => s + (typeof m.valeur === "number" ? m.valeur : 0), 0), [meubles]);

  /* ── Helpers ── */
  const fmt = (n: number) => n.toLocaleString("fr-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const addMeuble = useCallback(() => {
    const id = String(meubleCounter++);
    setMeubles((prev) => [...prev, { id, designation: "", valeur: "" }]);
  }, []);

  const removeMeuble = useCallback((id: string) => {
    setMeubles((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateMeuble = useCallback((id: string, field: keyof Meuble, value: any) => {
    setMeubles((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  }, []);

  const numVal = (v: string) => {
    const n = parseFloat(v.replace(",", "."));
    return isNaN(n) ? "" : n;
  };

  const setRepartitionValue = useCallback((value: number) => {
    const safeValue = Math.min(80, Math.max(40, Math.round(value / 5) * 5));
    setRepartition([safeValue]);
  }, []);

  const goNext = (s: number) => {
    setStep(s);
    setTimeout(() => {
      document.getElementById("generateur")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSubmit = async () => {
    if (!prenom.trim() || !email.trim()) return;
    setSending(true);

    const bailLabel = bailType === "meuble" ? `Bail meublé (${partImmeuble}/${partMeubles})` : "Bail immeuble seul";
    const qualiteLabel = qualite === "proprietaire" ? "Propriétaire" : "Locataire (sous-location)";

    const descParts = [
      `<h3>Générateur de Bail Professionnel</h3>`,
      `<p><strong>Type :</strong> ${bailLabel}</p>`,
      `<p><strong>Qualité :</strong> ${qualiteLabel}</p>`,
      `<p><strong>Bailleur :</strong> ${civilite} ${prenomBailleur} ${nomBailleur}</p>`,
      `<p><strong>Adresse bailleur :</strong> ${adresseBailleur}, ${cpBailleur} ${villeBailleur}, ${paysBailleur}</p>`,
      `<p><strong>Preneur :</strong> ${denomination} ${formeJuridique} — BCE ${numeroBce}</p>`,
      `<p><strong>Siège :</strong> ${siegeSocial}</p>`,
      `<p><strong>Représentant :</strong> ${representant}</p>`,
      `<p><strong>Bien :</strong> ${adresseBien} — ${surfaceBien} m²</p>`,
      descriptionBien ? `<p><strong>Description :</strong> ${descriptionBien}</p>` : "",
      `<p><strong>Loyer :</strong> ${loyerNum} €/mois — durée ${duree} ans</p>`,
      bailType === "meuble" ? `<p><strong>Répartition :</strong> ${partImmeuble}% immeuble / ${partMeubles}% meubles</p>` : "",
      bailType === "meuble" ? `<p><strong>Meubles :</strong> ${meubles.map((m) => `${m.designation} (${m.valeur}€)`).join(", ")}</p>` : "",
      `<p><strong>Date début :</strong> ${dateDebut}</p>`,
      `<p><strong>Indexation :</strong> ${indexation ? "Oui" : "Non"}</p>`,
      `<p><strong>Garantie :</strong> ${garantie} mois</p>`,
    ].filter(Boolean);
    const description = descParts.join("");

    try {
      // 1. Generate PDF
      const pdfBlob = generateBailPdf({
        bailType, qualite, civilite, prenomBailleur, nomBailleur,
        adresseBailleur, cpBailleur, villeBailleur, paysBailleur,
        denomination, formeJuridique, siegeSocial, numeroBce, representant,
        adresseBien, surfaceBien, descriptionBien,
        loyerMensuel: loyerNum, garantie, duree, dateDebut, indexation,
        partImmeuble, partMeubles, loyerImmeuble, loyerMeubles,
        meubles: meubles.map(m => ({ designation: m.designation, valeur: m.valeur })),
      });

      // 2. Upload to storage
      const fileName = `bail-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("bail-pdfs")
        .upload(fileName, pdfBlob, { contentType: "application/pdf" });

      let downloadUrl = "";
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("bail-pdfs").getPublicUrl(fileName);
        downloadUrl = urlData?.publicUrl || "";
      }

      // 3. Send email with download link
      if (downloadUrl) {
        const idempotencyKey = `bail-pdf-${fileName}`;
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "bail-pdf-ready",
            recipientEmail: email,
            idempotencyKey,
            templateData: {
              name: prenom,
              bailType: bailLabel,
              downloadUrl,
            },
          },
        });
      }

      // 4. Submit lead to Odoo (tag déclenche Marketing Automation séquence B)
      // description = détails CRM, x_download_url = lien PDF (utilisé dans l'email B1)
      const leadData = withUtm({
        name: prenom,
        first_name: prenom,
        email_from: email,
        phone: telephone || undefined,
        description,
        x_download_url: downloadUrl || undefined,
        tag_names: ["seq_generateur_bail"],
      });
      await submitLead(leadData);
      trackLeadSource({ ...leadData, form_name: "generateur_bail" });
    } catch (err) {
      console.error("Erreur lors de la génération du bail:", err);
    }

    setSending(false);
    setSent(true);
  };

  const bailLabel6 = bailType === "meuble" ? `Location meublée (${partImmeuble}/${partMeubles})` : "Location d'espace seul";
  const qualiteLabel6 = qualite === "proprietaire" ? "Propriétaire" : "Locataire (sous-location)";

  return (
    <div className="bg-secondary py-10 md:py-12 px-4 md:px-6 lg:px-12">
      <Stepper step={step} />

      {/* ── STEP 1 ── */}
      {step === 1 && (
        <Card showStepBorder={step > 1}>
          <StepHeader label="Configuration" title="Type de bail" step={step} />
          <ProgressBar step={step} />
          <p className="text-[13px] text-muted-foreground mb-4">Quel type de bail souhaitez-vous générer ?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
            <TypeCard selected={bailType === "immeuble"} onClick={() => setBailType("immeuble")} title="Location d'espace seul" desc="Bail portant uniquement sur une surface professionnelle. Vous louez votre bureau à votre société." />
            <TypeCard selected={bailType === "meuble"} onClick={() => setBailType("meuble")} title="Location meublée" desc="Bail combiné immeuble + mobilier. Répartition 60/40 ajustable. Taxation mobilier à 7,5 %." badge="60/40" />
          </div>
          <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border">Votre qualité</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2">
            <TypeCard selected={qualite === "proprietaire"} onClick={() => setQualite("proprietaire")} title="Propriétaire" desc="Vous êtes propriétaire du logement. Bail direct entre vous et votre société." />
            <TypeCard selected={qualite === "locataire"} onClick={() => setQualite("locataire")} title="Locataire (sous-location)" desc="Vous êtes locataire. La clause légale de sous-location est insérée automatiquement." />
          </div>
          <NavRow next={2} nextLabel="Suivant — Le bailleur" onNavigate={goNext} />
        </Card>
      )}

      {/* ── STEP 2 ── */}
      {step === 2 && (
        <Card showStepBorder={step > 1}>
          <StepHeader label="Le bailleur" title="Vos coordonnées" step={step} />
          <ProgressBar step={step} />
          <div className="grid grid-cols-[80px_1fr_1fr] gap-2.5 mb-3">
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Civilité</Label>
              <Select value={civilite} onValueChange={setCivilite}>
                <SelectTrigger className="h-9 text-[12px] mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="M.">M.</SelectItem>
                  <SelectItem value="Mme">Mme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Prénom *</Label>
              <Input value={prenomBailleur} onChange={(e) => setPrenomBailleur(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Jean" />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Nom *</Label>
              <Input value={nomBailleur} onChange={(e) => setNomBailleur(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Dupont" />
            </div>
          </div>
          <div className="mb-3">
            <Label className="text-[11px] text-muted-foreground font-medium">Adresse *</Label>
            <Input value={adresseBailleur} onChange={(e) => setAdresseBailleur(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Rue de la Loi 12" />
          </div>
          <div className="grid grid-cols-[100px_1fr_110px] gap-2.5 mb-3">
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Code postal</Label>
              <Input value={cpBailleur} onChange={(e) => setCpBailleur(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="1040" />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Ville</Label>
              <Input value={villeBailleur} onChange={(e) => setVilleBailleur(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Bruxelles" />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Pays</Label>
              <Input value={paysBailleur} onChange={(e) => setPaysBailleur(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Belgique" />
            </div>
          </div>
          <label className="flex items-center gap-2.5 py-2 text-[12px] text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={coBailleur} onChange={(e) => setCoBailleur(e.target.checked)} className="w-4 h-4 rounded border-border accent-primary" />
            Ajouter un co-bailleur (conjoint / co-propriétaire)
          </label>
          <NavRow prev={1} next={3} nextLabel="Suivant — Le preneur" onNavigate={goNext} />
        </Card>
      )}

      {/* ── STEP 3 ── */}
      {step === 3 && (
        <Card showStepBorder={step > 1}>
          <StepHeader label="Le preneur" title="Votre société" step={step} />
          <ProgressBar step={step} />
          <div className="bg-blue-50 border-l-[3px] border-blue-700 rounded-r-lg p-3 text-[12px] text-blue-800 leading-relaxed mb-5">
            <Info size={14} className="inline mr-1.5 -mt-0.5" />
            Entrez les données officielles de votre société telles qu'elles apparaissent dans la Banque-Carrefour des Entreprises (BCE).
          </div>
          <div className="grid grid-cols-[1fr_150px] gap-2.5 mb-3">
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Dénomination sociale *</Label>
              <Input value={denomination} onChange={(e) => setDenomination(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="MaSociété SRL" />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Forme juridique</Label>
              <Select value={formeJuridique} onValueChange={setFormeJuridique}>
                <SelectTrigger className="h-9 text-[12px] mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="SRL">SRL</SelectItem>
                  <SelectItem value="SA">SA</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="SNC">SNC</SelectItem>
                  <SelectItem value="SComm">SComm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-3">
            <Label className="text-[11px] text-muted-foreground font-medium">Siège social *</Label>
            <Input value={siegeSocial} onChange={(e) => setSiegeSocial(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Avenue Louise 123, 1050 Bruxelles" />
          </div>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Numéro BCE *</Label>
              <Input value={numeroBce} onChange={(e) => setNumeroBce(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="0123.456.789" />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Représentant légal *</Label>
              <Input value={representant} onChange={(e) => setRepresentant(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Jean Dupont (gérant)" />
            </div>
          </div>
          <NavRow prev={2} next={4} nextLabel="Suivant — Le bien" onNavigate={goNext} />
        </Card>
      )}

      {/* ── STEP 4 ── */}
      {step === 4 && (
        <Card showStepBorder={step > 1}>
          <StepHeader label="Le bien" title="Description de l'espace loué" step={step} />
          <ProgressBar step={step} />
          <div className="grid grid-cols-[1fr_110px] gap-2.5 mb-3">
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Adresse du bien *</Label>
              <Input value={adresseBien} onChange={(e) => setAdresseBien(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Rue de la Loi 12, 1040 Bruxelles" />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Surface (m²)</Label>
              <Input type="number" value={surfaceBien} onChange={(e) => setSurfaceBien(numVal(e.target.value))} className="mt-1 h-9 text-[13px]" placeholder="18" />
            </div>
          </div>
          <div className="mb-4">
            <Label className="text-[11px] text-muted-foreground font-medium">Description de l'espace (optionnel)</Label>
            <Input value={descriptionBien} onChange={(e) => setDescriptionBien(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Pièce au rez-de-chaussée, donnant sur le jardin" />
          </div>
          {bailType === "meuble" && (
            <>
              <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border">Inventaire des meubles</div>
              <div className="bg-blue-50 border-l-[3px] border-blue-700 rounded-r-lg p-3 text-[12px] text-blue-800 leading-relaxed mb-4">
                <Info size={14} className="inline mr-1.5 -mt-0.5" />
                Listez les meubles inclus dans la location. Cet inventaire sera automatiquement intégré à l'annexe du bail.
              </div>
              <div className="hidden md:grid grid-cols-[1fr_120px_28px] gap-2 pb-2 border-b border-border mb-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Désignation</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Valeur (€)</span>
                <span />
              </div>
              {meubles.map((m) => (
                <div key={m.id} className="grid grid-cols-[1fr_120px_28px] gap-2 items-center py-2 border-b border-border/30">
                  <Input value={m.designation} onChange={(e) => updateMeuble(m.id, "designation", e.target.value)} className="h-[30px] text-[12px]" placeholder="Bureau en bois chêne" />
                  <Input type="number" value={m.valeur} onChange={(e) => updateMeuble(m.id, "valeur", numVal(e.target.value))} className="h-[30px] text-[12px] text-center" placeholder="450" />
                  <button type="button" onClick={() => removeMeuble(m.id)} className="text-muted-foreground/50 hover:text-destructive transition-colors"><X size={14} /></button>
                </div>
              ))}
              <button type="button" onClick={addMeuble} className="flex items-center gap-2 text-primary text-[12px] font-medium py-3 hover:underline">
                <div className="w-[22px] h-[22px] border-[1.5px] border-dashed border-primary rounded-full flex items-center justify-center"><Plus size={13} /></div>
                Ajouter un meuble
              </button>
              {totalMeubles > 0 && (
                <div className="bg-secondary border border-border rounded-lg p-3 text-[12px] flex justify-between">
                  <span className="text-muted-foreground">Valeur totale inventaire</span>
                  <span className="font-semibold text-primary">{fmt(totalMeubles)} €</span>
                </div>
              )}
            </>
          )}
          <NavRow prev={3} next={5} nextLabel="Suivant — Conditions" onNavigate={goNext} />
        </Card>
      )}

      {/* ── STEP 5 ── */}
      {step === 5 && (
        <Card showStepBorder={step > 1}>
          <StepHeader label="Conditions" title="Loyer et modalités" step={step} />
          <ProgressBar step={step} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Loyer mensuel *</Label>
              <div className="relative mt-1">
                <Input type="number" value={loyerMensuel} onChange={(e) => setLoyerMensuel(numVal(e.target.value))} className="h-9 text-[13px] pr-16" placeholder="300" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">€/mois</span>
              </div>
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Garantie locative</Label>
              <Select value={garantie} onValueChange={setGarantie}>
                <SelectTrigger className="h-9 text-[12px] mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Aucune</SelectItem>
                  <SelectItem value="1">1 mois</SelectItem>
                  <SelectItem value="2">2 mois</SelectItem>
                  <SelectItem value="3">3 mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground font-medium">Durée du bail</Label>
              <Select value={duree} onValueChange={setDuree}>
                <SelectTrigger className="h-9 text-[12px] mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 an</SelectItem>
                  <SelectItem value="3">3 ans</SelectItem>
                  <SelectItem value="6">6 ans</SelectItem>
                  <SelectItem value="9">9 ans (standard)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-4" style={{ maxWidth: 200 }}>
            <Label className="text-[11px] text-muted-foreground font-medium">Date de début du bail *</Label>
            <Input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} className="mt-1 h-9 text-[13px]" />
          </div>
          {bailType === "meuble" && (
            <>
              <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2.5 pb-1 border-b border-border">Répartition immeuble / meubles</div>
              <div className="bg-blue-50 border-l-[3px] border-blue-700 rounded-r-lg p-3 text-[12px] text-blue-800 leading-relaxed mb-4">
                <Info size={14} className="inline mr-1.5 -mt-0.5" />
                Le Code civil belge prévoit par défaut 60 % immeuble / 40 % meubles. Ajustez si la réalité économique le justifie.
              </div>
              <div className="mb-4">
                <div className="flex items-end justify-between gap-3 mb-2">
                  <div className="text-[11px] text-muted-foreground">
                    <span>Immeuble</span>
                  </div>
                  <div className="w-[92px]">
                    <Label className="text-[11px] text-muted-foreground font-medium">%</Label>
                    <Input
                      type="number"
                      min={40}
                      max={80}
                      step={5}
                      value={partImmeuble}
                      onChange={(e) => setRepartitionValue(Number(e.target.value || 60))}
                      className="mt-1 h-9 text-[13px] text-center"
                    />
                  </div>
                </div>
                <Slider value={repartition} onValueChange={(value) => setRepartitionValue(value[0] ?? 60)} min={40} max={80} step={5} />
                <div className="flex flex-wrap gap-2 mt-2">
                  {[40, 50, 60, 70, 80].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRepartitionValue(value)}
                      className={value === partImmeuble ? "rounded-full border border-primary bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary" : "rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"}
                    >
                      {value} / {100 - value}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[12px] font-semibold text-primary mt-2">
                  <span>Immeuble : {partImmeuble} %</span>
                  <span>Meubles : {partMeubles} %</span>
                </div>
              </div>
              {loyerNum > 0 && (
                <div className="bg-secondary border border-border rounded-xl p-3.5 mb-4">
                  <div className="flex justify-between py-1.5 text-[12px] border-b border-border/50">
                    <span className="text-muted-foreground">Immeuble ({partImmeuble} %)</span>
                    <span className="font-semibold text-foreground">{fmt(loyerImmeuble)} €/mois</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-[12px] border-b border-border/50">
                    <span className="text-muted-foreground">Meubles ({partMeubles} %) — taxé à ~7,5 %</span>
                    <span className="font-semibold text-foreground">{fmt(loyerMeubles)} €/mois</span>
                  </div>
                  <div className="flex justify-between pt-2 text-[13px] font-bold text-accent">
                    <span>Total loyer mensuel</span>
                    <span>{fmt(loyerNum)} €/mois</span>
                  </div>
                </div>
              )}
            </>
          )}
          <label className="flex items-center gap-2.5 py-2 text-[12px] text-muted-foreground cursor-pointer mt-2">
            <input type="checkbox" checked={indexation} onChange={(e) => setIndexation(e.target.checked)} className="w-4 h-4 rounded border-border accent-primary" />
            Indexation annuelle sur l'indice santé belge (art. 1728bis Code civil)
          </label>
          <NavRow prev={4} next={6} nextLabel="Suivant — Finaliser" nextAccent onNavigate={goNext} />
        </Card>
      )}

      {/* ── STEP 6 ── */}
      {step === 6 && (
        <Card accent showStepBorder={step > 1}>
          <StepHeader label="Finalisation" title="Votre bail est prêt" step={step} />
          <ProgressBar step={step} />
          <div className="bg-secondary border border-border rounded-xl p-4 mb-5">
            <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-3">Récapitulatif</div>
            {[
              ["Type de bail", bailLabel6],
              ["Votre qualité", qualiteLabel6],
              ["Bailleur", `${civilite} ${prenomBailleur} ${nomBailleur}`],
              ["Preneur", `${denomination} ${formeJuridique} — BCE ${numeroBce}`],
              ["Bien", `${adresseBien}${surfaceBien ? ` — ${surfaceBien} m²` : ""}`],
              ["Loyer", `${loyerNum} €/mois — durée ${duree} ans${dateDebut ? ` — à partir du ${dateDebut}` : ""}`],
              ...(bailType === "meuble" ? [["Meubles", `${meubles.length} articles — valeur ${fmt(totalMeubles)} €`]] : []),
            ].map(([key, val], i) => (
              <div key={i} className="flex justify-between items-start py-1.5 text-[12px] border-b border-border/50 last:border-0">
                <span className="text-muted-foreground min-w-[140px]">{key}</span>
                <span className="font-semibold text-foreground text-right">{val}</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">Aperçu du bail généré (extrait)</div>
          <div className="relative mb-5">
            <div
              className={`bg-secondary border border-border rounded-xl p-4 text-[11px] text-muted-foreground leading-[1.8] transition-all duration-500 ${
                !sent && !showForm ? "blur-[5px] select-none pointer-events-none max-h-[280px] overflow-hidden" : ""
              }`}
              aria-hidden={!sent && !showForm}
            >
              <div className="text-[12px] font-bold text-primary text-center mb-2">
                CONTRAT DE BAIL DE LOCATION {bailType === "meuble" ? "MEUBLÉE" : "PROFESSIONNELLE"}
              </div>
              <div className="text-[10px] text-muted-foreground text-center mb-3">À usage professionnel · Bureau à domicile · Belgique</div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-wider mt-2 mb-1">ENTRE LES SOUSSIGNÉS</div>
              <div>
                D'une part, {civilite} {prenomBailleur || "___"} {nomBailleur || "___"}, domicilié(e) à {adresseBailleur || "___"}, {cpBailleur} {villeBailleur}, {paysBailleur}, ci-après dénommé(e) « Le Bailleur »,
                <br />
                Et d'autre part, la société {denomination || "___"} {formeJuridique}, dont le siège social est établi à {siegeSocial || "___"}, numéro BCE {numeroBce || "___"}, représentée par {representant || "___"}, ci-après dénommée « Le Preneur ».
              </div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-wider mt-3 mb-1">ARTICLE 1 — OBJET DU CONTRAT</div>
              <div>
                Le Bailleur donne en location au Preneur un espace {bailType === "meuble" ? "meublé " : ""}à usage exclusivement professionnel situé à {adresseBien || "___"}{surfaceBien ? `, surface approximative de ${surfaceBien} m²` : ""}, tel que décrit au présent contrat…
              </div>
              {bailType === "meuble" && loyerNum > 0 && (
                <>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-wider mt-3 mb-1">ARTICLE 3 — LOYER ET RÉPARTITION</div>
                  <div>
                    Le loyer mensuel total est fixé à {fmt(loyerNum)} €, réparti comme suit :<br />
                    — Location de l'immeuble ({partImmeuble} %) : {fmt(loyerImmeuble)} €/mois<br />
                    — Location du mobilier ({partMeubles} %) : {fmt(loyerMeubles)} €/mois
                  </div>
                </>
              )}
              <div className="text-muted-foreground/50 text-[10px] mt-3 text-center">… 13 articles complets · Clause indexation · Garantie · Signatures</div>
            </div>
            {!sent && !showForm && (
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 bg-gradient-to-b from-transparent via-background/40 to-background rounded-xl">
                <div className="flex items-center gap-2 mb-3 text-[11px] font-bold tracking-[0.15em] uppercase text-primary/70">
                  <LockIcon size={12} /> Aperçu verrouillé
                </div>
                <Button
                  onClick={() => {
                    setShowForm(true);
                    setTimeout(() => {
                      document.getElementById("bail-unlock-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }, 50);
                  }}
                  variant="accent"
                  className="rounded-lg shadow-lg"
                >
                  Débloquer mon bail complet <ArrowRight size={16} className="ml-1" />
                </Button>
                <p className="text-[10px] text-muted-foreground mt-2">PDF 13 articles · reçu par email</p>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border-l-[3px] border-amber-500 rounded-r-lg p-3.5 text-[12px] text-amber-900 leading-relaxed mb-5">
            <strong>Avant de signer :</strong> un bail mal rédigé peut vous coûter des milliers d'euros — charges cachées, indexation non plafonnée, clause de résiliation défavorable. Ce document est un point de départ, pas un avis juridique.
          </div>

          {!sent && showForm && (
            <div id="bail-unlock-form">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="h-px w-6 bg-accent" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent font-body">
                    Dernière étape · Votre bail
                  </span>
                  <span className="h-px w-6 bg-accent" />
                </div>
                <h2 className="font-display text-[22px] sm:text-[26px] text-primary leading-[1.2] tracking-[-0.015em] mb-2">
                  Recevez votre <span className="italic text-destructive">bail professionnel</span> prêt à signer
                </h2>
                <p className="text-[13px] text-primary/65 font-body">
                  PDF complet en 13 articles, personnalisé avec vos données et adapté au contexte belge. Envoyé immédiatement dans votre boîte mail.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <div>
                  <Label className="text-[11px] text-muted-foreground font-medium">Prénom *</Label>
                  <Input value={prenom} onChange={(e) => setPrenom(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="Votre prénom" />
                </div>
                <div>
                  <Label className="text-[11px] text-muted-foreground font-medium">Téléphone (optionnel)</Label>
                  <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="+32 …" />
                </div>
              </div>
              <div className="mb-4">
                <Label className="text-[11px] text-muted-foreground font-medium">E-mail *</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 h-9 text-[13px]" placeholder="vous@exemple.be" />
              </div>
              <Button onClick={handleSubmit} disabled={sending || !prenom.trim() || !email.trim()} variant="accent" className="w-full rounded-lg">
                {sending ? "Envoi en cours…" : "Générer et recevoir mon bail par email"}
              </Button>
              <button type="button" onClick={() => setShowForm(false)} className="mt-3 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                ← Retour à l'aperçu
              </button>
              <p className="text-[10px] text-muted-foreground text-center leading-relaxed mt-3">
                Vos données sont confidentielles. Aucune revente.
              </p>
            </div>
          )}
          {sent && (
            <>
              <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-center">
                <div className="text-[14px] font-bold text-green-800">✓ Bail envoyé à {email}</div>
                <div className="text-[12px] text-green-700 mt-1">Vérifiez vos spams si vous ne le recevez pas d'ici 2 minutes.</div>
              </div>
              <div className="mt-5">
                <BookingCta
                  title="Faites relire votre bail par Mika en 30 minutes"
                  description="Un échange gratuit avec l'expert-comptable de MFinances pour valider les clauses sensibles, la déduction 7,5% et sécuriser le bail avant signature."
                />
              </div>
            </>
          )}
          <p className="text-[10px] text-muted-foreground text-center leading-relaxed mt-4">
            Ce bail est basé sur un modèle utilisé en cabinet. À valider avant signature selon votre situation spécifique. MFinances · ITAA n°50.624.805
          </p>
        </Card>
      )}
    </div>
  );
}
