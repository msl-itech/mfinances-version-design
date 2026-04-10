import { useState, useMemo, useCallback, useRef } from "react";

/* ─── DATA ──────────────────────────────────────────────────────────────── */
interface FraisItem {
  id: string;
  n: string;
  hint: string;
  s: "D" | "E" | "S";
  score: number;
  tag: string;
  priority: string;
  note: string;
}

const DATA: Record<string, FraisItem[]> = {
  mobilite: [
    { id:"voiture_societe", n:"Voiture de société", hint:"Taux CO₂ + ATN", s:"E", score:3, tag:"vehicule_societe", priority:"haute", note:"En société, la voiture génère un ATN imposable selon le CO₂ et la valeur catalogue. Ce poste est l'un des plus surveillés. Un véhicule sans ATN déclaré constitue un risque fiscal majeur." },
    { id:"carburant", n:"Carburant véhicule", hint:"Lié au véhicule", s:"D", score:1, tag:"vehicule_societe", priority:"faible", note:"Déductible en corrélation directe avec le taux de déductibilité du véhicule. Un carnet de route ou un relevé clair renforce le dossier." },
    { id:"parking", n:"Parking professionnel", hint:"Déplacement pro", s:"D", score:1, tag:"deplacement", priority:"faible", note:"Frais accessoire à un déplacement professionnel identifiable. Le ticket ou la facture doit correspondre à un contexte pro." },
    { id:"velo_electrique", n:"Vélo électrique pro", hint:"Régime favorable", s:"D", score:2, tag:"mobilite_douce", priority:"moyenne", note:"Régime fiscal favorable en Belgique. L'usage professionnel doit rester documenté selon les modalités de mise à disposition." },
    { id:"moto_scooter", n:"Moto / scooter", hint:"Usage distinct", s:"E", score:2, tag:"vehicule_complexe", priority:"moyenne", note:"La séparation entre usage privé et pro doit être documentée. En complément d'une voiture, la justification économique doit être explicite." },
    { id:"voyages_pro", n:"Voyages et déplacements pro", hint:"Contexte requis", s:"D", score:2, tag:"deplacement", priority:"moyenne", note:"100% déductibles si le caractère professionnel est démontré. Les frais de l'accompagnant privé sont exclus. En cas de voyage mixte, seule la part professionnelle est déductible." },
  ],
  representation: [
    { id:"restaurant", n:"Restaurant / repas d'affaires", hint:"69%", s:"D", score:1, tag:"repas_affaires", priority:"faible", note:"Art. 53 7° CIR : 69% de la dépense totale. La note doit mentionner les convives et l'objet professionnel. Sans cette note, la déduction peut être rejetée même avec la souche TVA." },
    { id:"cadeaux_clients", n:"Cadeaux clients / partenaires", hint:"50%", s:"D", score:1, tag:"cadeaux_clients", priority:"faible", note:"Art. 53 1° CIR : 50%. La finalité commerciale doit être identifiable. Un cadeau à la famille du dirigeant sans lien professionnel constitue un ATN." },
    { id:"repas_seul", n:"Repas de travail seul", hint:"Très fragile", s:"S", score:3, tag:"repas_sensible", priority:"haute", note:"Sans déplacement professionnel avéré, ce poste est quasi systématiquement rejeté. Les conditions sont très restrictives." },
    { id:"reception_evenement", n:"Réception / événement pro", hint:"Contexte pro", s:"E", score:3, tag:"reception_pro", priority:"haute", note:"L'objet professionnel dominant doit être prouvé par des invitations, un programme ou une liste de participants. Un événement mi-pro mi-privé est requalifié en ATN." },
  ],
  bureau: [
    { id:"bureau_domicile", n:"Bureau à domicile", hint:"Prorata", s:"D", score:2, tag:"bureau_domicile", priority:"moyenne", note:"Méthode standard : m² bureau ÷ m² total × charges éligibles. Une pièce dédiée exclusivement au bureau est requise. La méthode doit être appliquée de manière constante." },
    { id:"loyer_bureau", n:"Loyer bureau professionnel", hint:"Bail au bon nom", s:"D", score:2, tag:"loyer_bureau", priority:"moyenne", note:"Le bail doit être au nom de la société. Un bail personnel remboursé par la société constitue un ATN dans le chef du dirigeant." },
    { id:"mobilier_bureau", n:"Mobilier de bureau", hint:"Amortissement", s:"E", score:1, tag:"mobilier_bureau", priority:"faible", note:"Amortissement sur 5 à 10 ans. En usage mixte, une ventilation documentée est nécessaire. Un mobilier familial passé en charges = DNA." },
    { id:"travaux_immeuble", n:"Travaux immeuble loué", hint:"Analyse fine", s:"E", score:3, tag:"travaux_immeuble", priority:"haute", note:"Le fisc distingue entretien (déductible) et amélioration (amortissable). Si le propriétaire est le dirigeant, risque de DNA." },
    { id:"internet_energie", n:"Internet / énergie du bureau", hint:"Mixte", s:"E", score:2, tag:"frais_mixtes", priority:"moyenne", note:"La quote-part professionnelle doit être cohérente avec la méthode bureau domicile. Même prorata recommandé pour la cohérence du dossier." },
  ],
  equipement: [
    { id:"ordinateur_it", n:"Ordinateur / matériel IT", hint:"Usage pro", s:"D", score:1, tag:"materiel_it", priority:"faible", note:"Déductible à 100% si usage exclusivement professionnel. En usage mixte, la ventilation doit être réaliste et documentée." },
    { id:"telephone_pro", n:"Téléphone professionnel", hint:"Pas de taux fixe", s:"E", score:2, tag:"telephone_pro", priority:"moyenne", note:"Il n'existe pas de pourcentage légal fixe en Belgique. Le taux retenu doit être cohérent avec l'activité réelle. 100% sur une ligne personnelle est difficile à défendre." },
    { id:"logiciels_saas", n:"Abonnements SaaS / logiciels", hint:"Lien activité", s:"D", score:1, tag:"logiciels", priority:"faible", note:"Déductibles à 100% si le lien avec l'activité est direct. Conserver les conditions d'abonnement et les factures récurrentes." },
    { id:"gsm_prive", n:"GSM privé usage pro", hint:"Ventilation", s:"E", score:2, tag:"gsm_mixte", priority:"moyenne", note:"La part pro doit être justifiée avec une méthode simple, stable et cohérente avec la nature de l'activité." },
    { id:"imprimante", n:"Imprimante / accessoires", hint:"Usage réel", s:"D", score:1, tag:"equipement", priority:"faible", note:"Plus simple si le matériel est clairement dédié au pro. En usage mixte, la ventilation doit rester réaliste." },
  ],
  formation: [
    { id:"formation_pro", n:"Formation professionnelle", hint:"Lien activité", s:"D", score:1, tag:"formation", priority:"faible", note:"Le lien direct avec l'activité exercée est requis. Une formation de développement personnel éloignée du métier nécessite une justification explicite." },
    { id:"seminaire", n:"Séminaire sectoriel", hint:"Finalité pro", s:"D", score:1, tag:"seminaire", priority:"faible", note:"Programme et attestation de participation à conserver. Les composantes touristiques doivent être exclues de la base déductible." },
    { id:"livres_presse", n:"Livres / presse professionnelle", hint:"Contenu lié", s:"D", score:1, tag:"presse_pro", priority:"faible", note:"Le lien avec le contenu de l'activité est requis. Un abonnement généraliste ou de divertissement sera requalifié." },
    { id:"sport_fitness", n:"Sport / salle de fitness", hint:"Principe refusé", s:"S", score:1, tag:"sport", priority:"haute", note:"Non déductible en principe (Art. 53 CIR). Aucune exception reconnue par l'administration belge, même au titre du bien-être professionnel." },
  ],
  divers: [
    { id:"frais_bancaires", n:"Frais bancaires professionnels", hint:"Compte pro", s:"D", score:1, tag:"banque", priority:"faible", note:"Déductibles si liés au compte professionnel. Séparer impérativement les comptes privé et professionnel." },
    { id:"amendes", n:"Amendes et pénalités", hint:"Jamais", s:"S", score:1, tag:"amendes", priority:"haute", note:"Art. 53 2° CIR — exclusion absolue et sans exception. Toute amende ou pénalité fiscale est non déductible, sans dérogation possible." },
    { id:"assurance_pro", n:"Assurance professionnelle", hint:"Lien activité", s:"D", score:1, tag:"assurance_pro", priority:"faible", note:"100% déductible si le lien direct avec l'activité est établi. La police doit être au bon nom." },
    { id:"publicite_marketing", n:"Publicité et marketing", hint:"But commercial", s:"D", score:1, tag:"marketing", priority:"faible", note:"Le lien avec l'objectif commercial doit être documenté (brief, facture, preuves de diffusion)." },
    { id:"sous_traitants", n:"Sous-traitants / honoraires", hint:"Fiche 281.50", s:"E", score:3, tag:"sous_traitance", priority:"haute", note:"La fiche 281.50 est obligatoire (>250 EUR/an/bénéficiaire). Absence = cotisation spéciale de 100% sur le montant. Risque de requalification en salariat." },
    { id:"vetements", n:"Vêtements professionnels", hint:"Cas très limité", s:"E", score:2, tag:"vetements", priority:"moyenne", note:"Déductibles uniquement si objectivement non portables hors du contexte pro (uniforme avec logo, blouse). Costumes et chaussures classiques : non déductibles selon jurisprudence constante." },
    { id:"prime_dirigeant", n:"Prime de fin d'année / bonus dirigeant", hint:"PV + 281.20", s:"E", score:3, tag:"remuneration_dirigeant", priority:"haute", note:"Déductible pour la société si décidée par l'organe de gestion et payée dans les délais. Fiches 281.20 obligatoires. Imposable à l'IPP. L'arbitrage prime / dividende est à analyser chaque année." },
  ],
};

const CATEGORIES = [
  { key: "mobilite", label: "🚗 Mobilité" },
  { key: "representation", label: "🍽️ Représentation" },
  { key: "bureau", label: "🏠 Bureau" },
  { key: "equipement", label: "💻 Équipement" },
  { key: "formation", label: "📚 Formation" },
  { key: "divers", label: "📋 Divers" },
];

const QUESTIONS = [
  { t: "Quel est votre statut fiscal ?", o: ["Indépendant — personne physique (IPP)", "Dirigeant de société (SRL, SA…)", "Les deux statuts s'appliquent"] },
  { t: "Quel est l'usage réel de cette dépense ?", o: ["Usage professionnel à 100 %", "Usage mixte — pro et privé", "Difficile à isoler clairement du privé"] },
  { t: "Quel justificatif avez-vous disponible ?", o: ["Justificatif complet (facture + note)", "Justificatif partiel (souche, relevé seul)", "Aucun justificatif formalisé à ce jour"] },
];

const VERDICTS = {
  D: { label: "Défendable", icon: "✓", title: "Ce frais paraît cohérent et relativement solide.", regime: "Déductible selon les conditions légales applicables.", justif: "Facture au bon nom, contexte clair, cohérence avec l'activité.", fisc: "Usage réel, document correct, montant proportionné.", defend: "Conservez la facture et notez le contexte professionnel si utile.", cta: "Audit complet" },
  E: { label: "À encadrer", icon: "!", title: "Ce frais peut être admis, mais il demande un meilleur cadrage.", regime: "Déductible sous conditions — ventilation ou documentation à sécuriser.", justif: "Méthode de ventilation à formaliser, pièces complémentaires à prévoir.", fisc: "Part privée, constance de la méthode, cohérence globale du dossier.", defend: "Formalisez votre méthode de ventilation et conservez tous les justificatifs.", cta: "Recevoir la checklist des frais sensibles" },
  S: { label: "Zone sensible", icon: "✕", title: "Ce frais mérite une vérification avant toute déduction.", regime: "Risque de rejet ou de requalification fiscale.", justif: "Analyse personnalisée recommandée avant toute déduction.", fisc: "Lien professionnel fragile, usage privé dominant ou justification absente.", defend: "Ne pas prendre cette déduction sans avis expert préalable.", cta: "Faire vérifier ce cas par MFinances" },
};

const totalFrais = Object.values(DATA).reduce((n, arr) => n + arr.length, 0);

/* Badge helpers */
const badgeBg = (s: string) =>
  s === "D" ? "bg-[hsl(135,40%,94%)] text-[hsl(148,55%,30%)] border-[hsl(148,35%,75%)]"
  : s === "E" ? "bg-[hsl(42,100%,95%)] text-[hsl(36,100%,27%)] border-[hsl(38,70%,76%)]"
  : "bg-[hsl(0,88%,96%)] text-[hsl(0,56%,42%)] border-[hsl(0,60%,83%)]";

const verdictHeadBg = (s: string) =>
  s === "D" ? "bg-[hsl(135,40%,94%)] border-[hsl(148,35%,82%)]"
  : s === "E" ? "bg-[hsl(42,100%,95%)] border-[hsl(38,55%,79%)]"
  : "bg-[hsl(0,88%,96%)] border-[hsl(0,50%,85%)]";

const iconBg = (s: string) =>
  s === "D" ? "bg-[hsl(148,55%,30%)]" : s === "E" ? "bg-[hsl(36,100%,27%)]" : "bg-[hsl(0,56%,42%)]";

const labelColor = (s: string) =>
  s === "D" ? "text-[hsl(148,55%,30%)]" : s === "E" ? "text-[hsl(36,100%,27%)]" : "text-[hsl(0,56%,42%)]";

/* ─── COMPONENT ─────────────────────────────────────────────────────────── */
export default function FraisDefendables() {
  const [step, setStep] = useState(1);
  const [currentCat, setCurrentCat] = useState("mobilite");
  const [selectedItem, setSelectedItem] = useState<FraisItem | null>(null);
  const [search, setSearch] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([undefined, undefined, undefined]);
  const [submitted, setSubmitted] = useState(false);
  const toolRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    return DATA[currentCat].filter(item =>
      item.n.toLowerCase().includes(search.toLowerCase())
    );
  }, [currentCat, search]);

  const getVerdict = useCallback((): "D" | "E" | "S" => {
    if (!selectedItem) return "E";
    if (selectedItem.s === "S") return "S";
    const a0 = answers[0] ?? 0;
    const a1 = answers[1] ?? 0;
    const a2 = answers[2] ?? 0;
    if (a2 === 2 || a1 === 2) return "S";
    if (a0 === 2) return (a1 === 0 && a2 === 0) ? "E" : "S";
    if (selectedItem.s === "D" && a1 === 0 && a2 === 0) return "D";
    if (a2 === 1 || a1 === 1) return "E";
    return selectedItem.s || "E";
  }, [selectedItem, answers]);

  const verdictKey = step === 3 ? getVerdict() : null;

  const goToStep = (n: number) => {
    if (n === 2) { setQIndex(0); setAnswers([undefined, undefined, undefined]); }
    setStep(n);
    if (n === 1) setSubmitted(false);
  };

  const resetTool = () => {
    setSelectedItem(null); setAnswers([undefined, undefined, undefined]); setQIndex(0);
    setSearch(""); setCurrentCat("mobilite"); setStep(1); setSubmitted(false);
    toolRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectAnswer = (idx: number) => {
    const next = [...answers]; next[qIndex] = idx; setAnswers(next);
  };

  const nextQuestion = () => {
    if (qIndex < 2) setQIndex(qIndex + 1);
    else goToStep(3);
  };

  const handleSubmitLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setSubmitted(true);
  };

  const progressWidth = step === 1 ? "33%" : step === 2 ? "66%" : "100%";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-7 items-start" id="frais-defendables-widget" ref={toolRef}>
      {/* ════════════════ TOOL CARD ════════════════ */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg" id="outil-frais">
        {/* Header — gradient navy */}
        <div className="bg-gradient-to-br from-primary-dark to-primary text-primary-foreground px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur grid place-items-center flex-shrink-0 border border-white/20">
              <svg viewBox="0 0 100 100" width="30" height="30">
                <path d="M10 92V12l11 11v69H10z" fill="#fff" fillOpacity=".9" />
                <path d="M79 92V53l11-11v50H79z" fill="#fff" fillOpacity=".9" />
                <path d="M31 51l18 18 40-40v10L49 79 31 61V51z" fill="hsl(var(--accent))" />
              </svg>
            </div>
            <div>
              <div className="font-display text-xl font-bold leading-tight">Frais Défendables</div>
              <div className="text-xs text-white/60 mt-0.5">Analyseur fiscal — MFinances.be</div>
            </div>
          </div>
          <div className="text-right leading-relaxed hidden sm:block">
            <div className="text-2xl font-bold text-white">{totalFrais}</div>
            <div className="text-[11px] text-white/50 uppercase tracking-wider">frais · 6 catégories</div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7">
          {/* Progress */}
          <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-5">
            <span className="block h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-accent to-accent-hover" style={{ width: progressWidth }} />
          </div>

          {/* Steps breadcrumb */}
          <div className="flex gap-2 flex-wrap mb-6 items-center text-[13px]">
            {[{ n: 1, label: "Sélection" }, { n: 2, label: "Contexte" }, { n: 3, label: "Verdict" }].map((s, i) => (
              <span key={s.n} className="contents">
                {i > 0 && <span className="text-border text-sm mx-0.5">›</span>}
                <span className={`inline-flex items-center gap-1.5 transition-colors ${step === s.n ? "text-primary font-bold" : step > s.n ? "text-primary/50" : "text-muted-foreground"}`}>
                  <span className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold transition-all duration-300 ${step === s.n ? "bg-primary text-primary-foreground shadow-md" : step > s.n ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>{step > s.n ? "✓" : s.n}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </span>
              </span>
            ))}
          </div>

          {/* ── STEP 1 ─────────────────────────────────────────── */}
          {step === 1 && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-[11px] font-bold tracking-widest uppercase text-accent mb-2">Étape 1 sur 3</div>
              <h2 className="font-display text-2xl sm:text-[28px] leading-tight text-primary mb-2">Quel frais souhaitez-vous analyser&nbsp;?</h2>
              <p className="text-muted-foreground text-sm mb-5">Choisissez une catégorie, puis la dépense à vérifier.</p>

              {/* Search */}
              <div className="mb-5">
                <label htmlFor="fd-search" className="block text-[13px] font-bold mb-1.5 text-foreground">Rechercher un frais</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6.5" cy="6.5" r="4" /><path d="M10.5 10.5 L14 14" /></svg>
                  <input
                    id="fd-search" type="search" placeholder="Ex. voiture, restaurant, bureau…"
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-muted text-foreground text-sm outline-none focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/60"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.key} type="button"
                    onClick={() => { setCurrentCat(cat.key); setSelectedItem(null); }}
                    className={`rounded-xl px-3 py-3 text-[13px] font-bold text-left border-2 transition-all duration-200 ${currentCat === cat.key ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary hover:shadow-sm"}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Items list */}
              <div className="border border-border rounded-2xl overflow-hidden bg-card mb-5 max-h-[320px] overflow-y-auto shadow-sm">
                {filteredItems.length === 0 ? (
                  <div className="p-5 text-muted-foreground italic text-sm text-center">Aucun frais trouvé dans cette catégorie.</div>
                ) : (
                  filteredItems.map((item, i) => (
                    <button
                      key={item.id} type="button"
                      onClick={() => setSelectedItem(item)}
                      className={`w-full text-left border-b border-border last:border-b-0 px-4 py-3.5 flex items-center justify-between gap-3 text-sm transition-all duration-200 cursor-pointer group ${selectedItem?.id === item.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground/70 hover:bg-muted hover:text-foreground"}`}
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <span className="font-medium">{item.n}</span>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0 border transition-colors ${selectedItem?.id === item.id ? "bg-white/20 text-white border-transparent" : badgeBg(item.s)}`}>
                        {item.hint}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 items-center flex-wrap">
                <button
                  type="button" disabled={!selectedItem} onClick={() => goToStep(2)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[15px] bg-accent text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.97]"
                >
                  Analyser ce frais ›
                </button>
                {selectedItem && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold animate-in fade-in duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {selectedItem.n}
                  </span>
                )}
              </div>
            </section>
          )}

          {/* ── STEP 2 ─────────────────────────────────────────── */}
          {step === 2 && (
            <section className="animate-in fade-in slide-in-from-right-2 duration-300">
              <div className="text-[11px] font-bold tracking-widest uppercase text-accent mb-2">Étape 2 sur 3</div>
              <h2 className="font-display text-2xl leading-tight text-primary mb-1">{selectedItem?.n}</h2>
              <p className="text-muted-foreground text-sm mb-5">Trois questions rapides pour calibrer le verdict.</p>

              <div className="bg-gradient-to-br from-muted to-muted/60 border border-border rounded-2xl p-6 mb-5">
                <div className="text-[11px] uppercase tracking-widest text-accent font-bold mb-2">
                  Question {qIndex + 1} / 3
                </div>
                <div className="font-display text-xl sm:text-[22px] leading-snug text-primary mb-5">
                  {QUESTIONS[qIndex].t}
                </div>
                <div className="space-y-2.5">
                  {QUESTIONS[qIndex].o.map((opt, idx) => (
                    <button
                      key={idx} type="button" onClick={() => selectAnswer(idx)}
                      className={`w-full text-left px-4 py-3.5 border-2 rounded-xl text-sm transition-all duration-200 cursor-pointer ${answers[qIndex] === idx ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.01]" : "bg-card text-foreground/70 border-border hover:border-primary/40 hover:text-foreground hover:shadow-sm"}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 grid place-items-center transition-all ${answers[qIndex] === idx ? "border-white bg-white/20" : "border-border"}`}>
                          {answers[qIndex] === idx && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 items-center flex-wrap">
                <button
                  type="button" disabled={answers[qIndex] === undefined} onClick={nextQuestion}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[15px] bg-accent text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
                >
                  {qIndex < 2 ? "Continuer ›" : "Voir mon verdict ›"}
                </button>
                <button type="button" onClick={() => goToStep(1)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-card text-muted-foreground border border-border hover:border-primary/40 hover:text-primary transition-all"
                >
                  ‹ Retour
                </button>
              </div>
            </section>
          )}

          {/* ── STEP 3 — VERDICT ───────────────────────────────── */}
          {step === 3 && verdictKey && selectedItem && (() => {
            const v = VERDICTS[verdictKey];
            const captureNeeded = verdictKey !== "D";
            const a0 = answers[0] ?? 0;
            const score = selectedItem.score || (verdictKey === "S" ? 3 : verdictKey === "E" ? 2 : 1);
            const priority = verdictKey === "S" ? "haute" : (selectedItem.priority || "moyenne");
            const statutVal = ["ipp", "societe", "both"][a0];
            const isHighValue = score === 3 && verdictKey !== "D";
            const captureMsg = isHighValue
              ? ["Ce type de frais est parmi les plus contrôlés. Une analyse personnalisée est recommandée.",
                 "En tant que dirigeant de société, ce frais peut avoir des conséquences significatives.",
                 "Votre double statut augmente la complexité. Une analyse personnalisée est indispensable."][a0]
              : a0 === 1 ? "En tant que dirigeant de société, certaines règles demandent une lecture plus précise."
              : a0 === 2 ? "Votre double statut crée une complexité fiscale spécifique."
              : "Laissez vos coordonnées. Nos experts reviennent vers vous rapidement.";
            const liShareText = encodeURIComponent(`Mon frais "${selectedItem.n}" est ${v.label}. Et les vôtres ? → mfinances.be/frais-defendables/`);
            const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fmfinances.be%2Ffrais-defendables%2F&summary=${liShareText}`;

            return (
              <section className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="text-[11px] font-bold tracking-widest uppercase text-accent mb-3">Étape 3 sur 3 — Votre verdict</div>

                {/* Verdict header */}
                <div className={`rounded-2xl overflow-hidden mb-4 border-2 ${verdictHeadBg(verdictKey)}`}>
                  <div className="flex gap-4 items-start p-5">
                    <div className={`w-11 h-11 rounded-2xl grid place-items-center text-white font-bold text-base flex-shrink-0 shadow-lg ${iconBg(verdictKey)}`}>
                      {v.icon}
                    </div>
                    <div>
                      <div className={`text-[11px] uppercase tracking-widest font-bold mb-1.5 ${labelColor(verdictKey)}`}>
                        {v.label} — {selectedItem.n}
                      </div>
                      <div className="font-display text-xl leading-snug text-primary">{v.title}</div>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-primary/5 border-l-4 border-l-primary rounded-r-xl px-5 py-4 mb-4 text-sm leading-relaxed text-foreground/80">
                  <b className="block text-[10.5px] uppercase tracking-widest mb-1.5 text-primary font-bold">Point clé pour ce frais</b>
                  {selectedItem.note}
                </div>

                {/* Detail grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[
                    { label: "Régime applicable", val: v.regime, icon: "📋" },
                    { label: "Justification attendue", val: v.justif, icon: "📄" },
                    { label: "Ce que le fisc vérifie", val: v.fisc, icon: "🔍" },
                    { label: "Pour défendre ce frais", val: v.defend, icon: "🛡️" },
                  ].map(d => (
                    <div key={d.label} className="bg-muted border border-border rounded-2xl p-4 hover:shadow-sm transition-shadow">
                      <div className="text-[10.5px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5 flex items-center gap-1.5">
                        <span>{d.icon}</span> {d.label}
                      </div>
                      <div className="text-[13px] text-foreground leading-relaxed">{d.val}</div>
                    </div>
                  ))}
                </div>

                {/* Capture form or D card */}
                {captureNeeded ? (
                  submitted ? (
                    <div className="bg-gradient-to-br from-primary-dark to-primary text-primary-foreground rounded-2xl p-6 text-center">
                      <div className="text-3xl mb-3">✉️</div>
                      <h3 className="font-display text-xl text-white mb-2">Reçu — merci.</h3>
                      <p className="text-white/80 text-sm">Votre demande a bien été notée. Nos experts vous répondent rapidement.</p>
                    </div>
                  ) : (
                    <form className="bg-gradient-to-br from-primary-dark to-primary text-primary-foreground rounded-2xl p-6" onSubmit={handleSubmitLead} noValidate>
                      {isHighValue && (
                        <div className="bg-accent/15 border border-accent/30 rounded-xl px-4 py-3 mb-4 text-[13px] text-accent-foreground flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
                          <span className="text-white/90">Ce poste figure parmi les plus contrôlés — analyse prioritaire recommandée.</span>
                        </div>
                      )}
                      <h3 className="font-display text-[22px] text-white mb-2">
                        {verdictKey === "S" ? "Ce cas mérite une analyse plus précise." : "Ce frais demande un meilleur cadrage."}
                      </h3>
                      <p className="text-white/70 text-sm mb-5">{captureMsg}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label htmlFor="fd-prenom" className="block text-[12.5px] font-bold text-white/90 mb-1.5">Prénom</label>
                          <input id="fd-prenom" name="firstname" type="text" placeholder="Votre prénom" autoComplete="given-name" required className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/10 text-white text-sm placeholder:text-white/40 outline-none focus:border-white/40 focus:bg-white/15 transition-all" />
                        </div>
                        <div>
                          <label htmlFor="fd-email" className="block text-[12.5px] font-bold text-white/90 mb-1.5">Email professionnel</label>
                          <input id="fd-email" name="email" type="email" placeholder="vous@entreprise.be" autoComplete="email" required className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/10 text-white text-sm placeholder:text-white/40 outline-none focus:border-white/40 focus:bg-white/15 transition-all" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="fd-statut" className="block text-[12.5px] font-bold text-white/90 mb-1.5">Votre situation</label>
                        <select id="fd-statut" name="cap-statut" defaultValue={statutVal} className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/10 text-white text-sm outline-none focus:border-white/40 [&>option]:text-primary [&>option]:bg-white">
                          <option value="ipp">Indépendant (IPP)</option>
                          <option value="societe">Dirigeant de société</option>
                          <option value="both">Les deux statuts</option>
                        </select>
                      </div>
                      <input type="hidden" name="cap-frais" value={selectedItem.n} />
                      <input type="hidden" name="cap-verdict" value={verdictKey} />
                      <input type="hidden" name="cap-crm-tag" value={selectedItem.tag} />
                      <input type="hidden" name="cap-source" value="outil-frais-defendables" />
                      <button type="submit" className="w-full px-6 py-4 rounded-xl font-bold text-[15px] bg-accent text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/30 hover:brightness-110 active:scale-[0.98]">
                        {v.cta} →
                      </button>
                      <div className="mt-3 text-xs text-white/50 text-center">🔒 Vos données sont transmises uniquement à MFinances, Uccle.</div>
                    </form>
                  )
                ) : (
                  <div className="bg-card border-2 border-[hsl(148,35%,82%)] rounded-2xl p-6">
                    <h3 className="text-lg text-[hsl(148,55%,30%)] font-bold mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[hsl(148,55%,30%)] text-white grid place-items-center text-sm">✓</span>
                      Ce frais paraît solide
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      Un frais favorable ne sécurise pas l'ensemble du dossier. 6 dirigeants sur 10 ont au moins un frais sensible non identifié. Un audit complet donne la certitude.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <a href="/contact/" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[15px] bg-accent text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25 hover:brightness-110 active:scale-[0.97]">
                        Audit complet →
                      </a>
                      <a href={liUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[hsl(210,82%,40%)] text-white rounded-xl text-[13px] font-bold transition-opacity hover:opacity-90"
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        Partager
                      </a>
                    </div>
                  </div>
                )}

                <button type="button" onClick={resetTool} className="mt-4 text-muted-foreground text-sm hover:text-primary bg-transparent border-none cursor-pointer p-0 flex items-center gap-1.5 transition-colors">
                  <span>←</span> Analyser un autre frais
                </button>
              </section>
            );
          })()}
        </div>
      </div>

      {/* ════════════════ SIDEBAR ════════════════ */}
      <aside className="grid gap-4 lg:sticky lg:top-24" aria-label="Informations sur l'outil">
        {[
          { title: "Ce que l'outil fait", icon: "🎯", content: <p className="text-muted-foreground text-sm leading-relaxed">Il vous aide à faire un premier tri rapide. Vous voyez quels frais sont les plus simples, lesquels demandent une méthode, et lesquels méritent un avis expert avant déduction.</p> },
          { title: "Ce que le fisc regarde", icon: "👁️", content: (
            <ul className="pl-0 text-muted-foreground text-sm space-y-2.5">
              {["Le lien réel avec l'activité", "La qualité du justificatif", "La part privée éventuelle", "La cohérence du dossier dans le temps"].map(t => (
                <li key={t} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />{t}</li>
              ))}
            </ul>
          )},
          { title: "30 frais couverts", icon: "📊", content: (
            <ul className="pl-0 text-muted-foreground text-sm space-y-2">
              {["Mobilité (voiture, carburant, vélo, voyages)", "Représentation (repas, cadeaux, réceptions)", "Bureau (domicile, loyer, mobilier, travaux)", "Équipement (IT, téléphone, SaaS)", "Formation (séminaires, livres)", "Divers (bancaire, sous-traitants, prime)"].map(t => (
                <li key={t} className="flex items-start gap-2"><span className="text-xs">•</span>{t}</li>
              ))}
            </ul>
          )},
          { title: "Ce que cet outil ne fait pas", icon: "⚠️", content: <p className="text-muted-foreground text-sm leading-relaxed">Il ne remplace pas une analyse personnalisée. Un cas complexe dépend de votre statut, de vos justificatifs et de la structure réelle de votre activité. MFinances analyse votre dossier complet.</p> },
        ].map(card => (
          <div key={card.title} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-[15px] font-bold text-primary mb-3 flex items-center gap-2">
              <span>{card.icon}</span> {card.title}
            </h3>
            {card.content}
          </div>
        ))}
      </aside>
    </div>
  );
}
