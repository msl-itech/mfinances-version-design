import { useState, useMemo, useCallback, useRef, useEffect } from "react";

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
  { key: "mobilite", label: "Mobilité" },
  { key: "representation", label: "Représentation" },
  { key: "bureau", label: "Bureau" },
  { key: "equipement", label: "Équipement" },
  { key: "formation", label: "Formation" },
  { key: "divers", label: "Divers" },
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
    if (n === 2) {
      setQIndex(0);
      setAnswers([undefined, undefined, undefined]);
    }
    setStep(n);
    if (n === 1) {
      setSubmitted(false);
    }
  };

  const resetTool = () => {
    setSelectedItem(null);
    setAnswers([undefined, undefined, undefined]);
    setQIndex(0);
    setSearch("");
    setCurrentCat("mobilite");
    setStep(1);
    setSubmitted(false);
    toolRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectAnswer = (idx: number) => {
    const next = [...answers];
    next[qIndex] = idx;
    setAnswers(next);
  };

  const nextQuestion = () => {
    if (qIndex < 2) {
      setQIndex(qIndex + 1);
    } else {
      goToStep(3);
    }
  };

  const handleSubmitLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const progressWidth = step === 1 ? "33%" : step === 2 ? "66%" : "100%";

  /* Badge classes */
  const badgeBg = (s: string) =>
    s === "D" ? "bg-[#EDF7EE] text-[#1A6B3A] border-[#b8dfc0]"
    : s === "E" ? "bg-[#FFF8E6] text-[#8B5C00] border-[#f0d595]"
    : "bg-[#FEF0F0] text-[#A92D2E] border-[#f5b8b8]";

  const verdictHeadBg = (s: string) =>
    s === "D" ? "bg-[#EDF7EE] border-[#CBE7D8]"
    : s === "E" ? "bg-[#FFF8E6] border-[#F1D7A3]"
    : "bg-[#FEF0F0] border-[#F2C3C3]";

  const iconBg = (s: string) =>
    s === "D" ? "bg-[#1A6B3A]" : s === "E" ? "bg-[#8B5C00]" : "bg-[#A92D2E]";

  const labelColor = (s: string) =>
    s === "D" ? "text-[#1A6B3A]" : s === "E" ? "text-[#8B5C00]" : "text-[#A92D2E]";

  return (
    <div className="font-body" id="frais-defendables-widget" ref={toolRef}>
      {/* ── TOOL CARD ────────────────────────────────────────────── */}
      <div className="bg-white border border-[#DDE2F0] rounded-3xl overflow-hidden shadow-[0_10px_32px_rgba(17,28,62,.09)]" id="outil-frais">
        {/* Header */}
        <div className="bg-[#1B2B5E] text-white p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white grid place-items-center flex-shrink-0">
              <svg viewBox="0 0 100 100" width="28" height="28">
                <path d="M10 92V12l11 11v69H10z" fill="#1B2B5E" />
                <path d="M79 92V53l11-11v50H79z" fill="#1B2B5E" />
                <path d="M31 51l18 18 40-40v10L49 79 31 61V51z" fill="#E8393A" />
              </svg>
            </div>
            <div>
              <div className="font-heading text-xl leading-tight">Frais Défendables</div>
              <div className="text-xs text-white/70 mt-0.5">Analyseur — MFinances.be</div>
            </div>
          </div>
          <div className="text-xs text-white/65 text-right leading-relaxed hidden sm:block">
            <div>{totalFrais}</div>
            <div>frais · 6 catégories</div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          {/* Progress */}
          <div className="h-1.5 rounded-full bg-[#D9E0F0] overflow-hidden mb-5">
            <span className="block h-full bg-[#E8393A] rounded-full transition-all duration-300" style={{ width: progressWidth }} />
          </div>

          {/* Steps breadcrumb */}
          <div className="flex gap-1.5 flex-wrap mb-5 items-center text-[13px]">
            {[{ n: 1, label: "Sélection" }, { n: 2, label: "Contexte" }, { n: 3, label: "Verdict" }].map((s, i) => (
              <span key={s.n} className="contents">
                {i > 0 && <span className="text-[#DDE2F0] text-sm">›</span>}
                <span className={`inline-flex items-center gap-1.5 ${step === s.n ? "text-[#1B2B5E] font-bold" : "text-[#8B96B3]"}`}>
                  <span className={`w-[22px] h-[22px] rounded-full grid place-items-center text-xs font-bold transition-colors ${step === s.n ? "bg-[#1B2B5E] text-white" : "bg-[#EEF2FA] text-[#8B96B3]"}`}>{s.n}</span>
                  {s.label}
                </span>
              </span>
            ))}
          </div>

          {/* ── STEP 1 ─────────────────────────────────────────── */}
          {step === 1 && (
            <section>
              <div className="text-[11px] font-bold tracking-wider uppercase text-[#E8393A] mb-1.5">Étape 1 sur 3</div>
              <div className="font-heading text-[26px] leading-tight text-[#1B2B5E] mb-2">Quel frais souhaitez-vous analyser&nbsp;?</div>
              <p className="text-[#5A6585] text-sm mb-4">Choisissez une catégorie, puis la dépense à vérifier.</p>

              {/* Search */}
              <div className="mb-4">
                <label htmlFor="fd-search" className="block text-[13px] font-bold mb-1.5">Rechercher un frais</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B96B3] pointer-events-none" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6.5" cy="6.5" r="4" /><path d="M10.5 10.5 L14 14" /></svg>
                  <input
                    id="fd-search"
                    type="search"
                    placeholder="Ex. voiture, restaurant, bureau…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 rounded-[10px] border border-[#DDE2F0] bg-[#F4F5F9] text-[#1B2B5E] text-sm outline-none focus:border-[#1B2B5E] focus:bg-white transition-colors"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 mb-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => { setCurrentCat(cat.key); setSelectedItem(null); }}
                    className={`rounded-[10px] px-2.5 py-2.5 text-[13px] font-bold text-left border transition-colors ${currentCat === cat.key ? "bg-[#1B2B5E] text-white border-[#1B2B5E]" : "bg-[#F4F5F9] text-[#5A6585] border-[#DDE2F0] hover:border-[#1B2B5E] hover:text-[#1B2B5E]"}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Items list */}
              <div className="border border-[#DDE2F0] rounded-2xl overflow-hidden bg-white mb-4 min-h-[160px]">
                {filteredItems.length === 0 ? (
                  <div className="p-4 text-[#8B96B3] italic text-[13.5px]">Aucun frais trouvé.</div>
                ) : (
                  filteredItems.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className={`w-full text-left border-b border-[#DDE2F0] last:border-b-0 px-4 py-3 flex items-center justify-between gap-2.5 text-sm transition-colors cursor-pointer ${selectedItem?.id === item.id ? "bg-[#1B2B5E] text-white" : "bg-white text-[#5A6585] hover:bg-[#EEF2FA] hover:text-[#1B2B5E]"}`}
                    >
                      <span>{item.n}</span>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap flex-shrink-0 border ${selectedItem?.id === item.id ? "bg-white/20 text-white border-transparent" : badgeBg(item.s)}`}>
                        {item.hint}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 items-center flex-wrap">
                <button
                  type="button"
                  disabled={!selectedItem}
                  onClick={() => goToStep(2)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] font-bold text-[15px] bg-[#E8393A] text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Analyser ce frais ›
                </button>
                {selectedItem && (
                  <span className="inline-block px-3 py-1 rounded-full bg-[#EEF2FA] text-[#1B2B5E] text-xs font-bold">
                    {selectedItem.n}
                  </span>
                )}
              </div>
            </section>
          )}

          {/* ── STEP 2 ─────────────────────────────────────────── */}
          {step === 2 && (
            <section>
              <div className="text-[11px] font-bold tracking-wider uppercase text-[#E8393A] mb-1.5">Étape 2 sur 3</div>
              <div className="font-heading text-[26px] leading-tight text-[#1B2B5E] mb-2">{selectedItem?.n}</div>
              <p className="text-[#5A6585] text-sm mb-4">Trois questions rapides pour calibrer le verdict.</p>

              <div className="bg-[#F4F5F9] border border-[#DDE2F0] rounded-2xl p-5 mb-4">
                <div className="text-[11px] uppercase tracking-wider text-[#E8393A] font-bold mb-1.5">
                  Question {qIndex + 1} / 3
                </div>
                <div className="font-heading text-[22px] leading-snug text-[#1B2B5E] mb-4">
                  {QUESTIONS[qIndex].t}
                </div>
                <div className="space-y-2">
                  {QUESTIONS[qIndex].o.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => selectAnswer(idx)}
                      className={`w-full text-left px-3.5 py-3 border rounded-[10px] text-sm transition-colors cursor-pointer ${answers[qIndex] === idx ? "bg-[#1B2B5E] text-white border-[#1B2B5E]" : "bg-white text-[#5A6585] border-[#DDE2F0] hover:border-[#1B2B5E] hover:text-[#1B2B5E]"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5 items-center flex-wrap mt-3.5">
                <button
                  type="button"
                  disabled={answers[qIndex] === undefined}
                  onClick={nextQuestion}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] font-bold text-[15px] bg-[#E8393A] text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {qIndex < 2 ? "Continuer ›" : "Voir mon verdict ›"}
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] font-bold text-[15px] bg-white text-[#1B2B5E] border border-[#DDE2F0] hover:border-[#1B2B5E] transition-colors"
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
              <section>
                <div className="text-[11px] font-bold tracking-wider uppercase text-[#E8393A] mb-1.5">Étape 3 sur 3 — Votre verdict</div>

                {/* Verdict header */}
                <div className={`rounded-2xl overflow-hidden mb-3.5 border ${verdictHeadBg(verdictKey)}`}>
                  <div className="flex gap-3 items-start p-[18px]">
                    <div className={`w-9 h-9 rounded-full grid place-items-center text-white font-bold text-sm flex-shrink-0 ${iconBg(verdictKey)}`}>
                      {v.icon}
                    </div>
                    <div>
                      <div className={`text-[11px] uppercase tracking-wider font-bold mb-1 ${labelColor(verdictKey)}`}>
                        {v.label} — {selectedItem.n}
                      </div>
                      <div className="font-heading text-xl leading-snug text-[#1B2B5E]">{v.title}</div>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-[#EEF2FA] border-l-4 border-l-[#1B2B5E] rounded-r-[10px] px-4 py-3 mb-3.5 text-[13px] leading-relaxed">
                  <b className="block text-[10.5px] uppercase tracking-wider mb-1 text-[#1B2B5E]">Point clé pour ce frais</b>
                  {selectedItem.note}
                </div>

                {/* Detail grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3.5">
                  {[
                    { label: "Régime applicable", val: v.regime },
                    { label: "Justification attendue", val: v.justif },
                    { label: "Ce que le fisc vérifie", val: v.fisc },
                    { label: "Pour défendre ce frais", val: v.defend },
                  ].map(d => (
                    <div key={d.label} className="bg-[#F4F5F9] border border-[#DDE2F0] rounded-[14px] p-3.5">
                      <div className="text-[10.5px] uppercase tracking-wider text-[#8B96B3] font-bold mb-1">{d.label}</div>
                      <div className="text-[13px] text-[#1B2B5E] leading-relaxed">{d.val}</div>
                    </div>
                  ))}
                </div>

                {/* Capture form or D card */}
                {captureNeeded ? (
                  submitted ? (
                    <div className="bg-[#1B2B5E] text-white rounded-2xl p-5">
                      <h3 className="font-heading text-xl text-white mb-2">Reçu — merci.</h3>
                      <p className="text-white/80 text-sm">Votre demande a bien été notée. Nos experts vous répondent rapidement.</p>
                    </div>
                  ) : (
                    <form className="bg-[#1B2B5E] text-white rounded-2xl p-5" onSubmit={handleSubmitLead} noValidate>
                      {isHighValue && (
                        <div className="bg-[#E8393A]/15 border border-[#E8393A]/30 rounded-lg px-3 py-2 mb-3 text-[12.5px] text-[#7B1D1E] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#E8393A] flex-shrink-0" />
                          Ce poste figure parmi les plus contrôlés — analyse prioritaire recommandée.
                        </div>
                      )}
                      <h3 className="font-heading text-[22px] text-white mb-1.5">
                        {verdictKey === "S" ? "Ce cas mérite une analyse plus précise." : "Ce frais demande un meilleur cadrage."}
                      </h3>
                      <p className="text-white/80 text-sm mb-4">{captureMsg}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
                        <div>
                          <label htmlFor="fd-prenom" className="block text-[12.5px] font-bold text-white mb-1">Prénom</label>
                          <input id="fd-prenom" name="firstname" type="text" placeholder="Votre prénom" autoComplete="given-name" required className="w-full px-3 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-[13.5px] placeholder:text-white/50 outline-none focus:border-white/50" />
                        </div>
                        <div>
                          <label htmlFor="fd-email" className="block text-[12.5px] font-bold text-white mb-1">Email professionnel</label>
                          <input id="fd-email" name="email" type="email" placeholder="vous@entreprise.be" autoComplete="email" required className="w-full px-3 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-[13.5px] placeholder:text-white/50 outline-none focus:border-white/50" />
                        </div>
                      </div>
                      <div className="mb-2.5">
                        <label htmlFor="fd-statut" className="block text-[12.5px] font-bold text-white mb-1">Votre situation</label>
                        <select id="fd-statut" name="cap-statut" defaultValue={statutVal} className="w-full px-3 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-[13.5px] outline-none [&>option]:text-[#1B2B5E] [&>option]:bg-white">
                          <option value="ipp">Indépendant (IPP)</option>
                          <option value="societe">Dirigeant de société</option>
                          <option value="both">Les deux statuts</option>
                        </select>
                      </div>
                      <input type="hidden" name="cap-frais" value={selectedItem.n} />
                      <input type="hidden" name="cap-categorie" value={currentCat} />
                      <input type="hidden" name="cap-score" value={score} />
                      <input type="hidden" name="cap-verdict" value={verdictKey} />
                      <input type="hidden" name="cap-crm-tag" value={selectedItem.tag} />
                      <input type="hidden" name="cap-priorite" value={priority} />
                      <input type="hidden" name="cap-item-id" value={selectedItem.id} />
                      <input type="hidden" name="cap-source" value="outil-frais-defendables" />
                      <button type="submit" className="w-full mt-1 px-5 py-3 rounded-[10px] font-bold text-[15px] bg-[#E8393A] text-white transition-opacity hover:opacity-90">
                        {v.cta} →
                      </button>
                      <div className="mt-2.5 text-xs text-white/65">🔒 Vos données sont transmises uniquement à MFinances, Uccle.</div>
                    </form>
                  )
                ) : (
                  <div className="bg-white border border-[#DDE2F0] rounded-2xl p-5 mt-2">
                    <h3 className="text-[17px] text-[#1A6B3A] font-bold mb-2">✓ Ce frais paraît solide</h3>
                    <p className="text-[#5A6585] text-sm leading-relaxed mb-4">
                      Un frais favorable ne sécurise pas l'ensemble du dossier. 6 dirigeants sur 10 ont au moins un frais sensible non identifié. Un audit complet donne la certitude.
                    </p>
                    <div className="flex gap-2.5 flex-wrap">
                      <a href="/contact/" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] font-bold text-[15px] bg-[#E8393A] text-white transition-opacity hover:opacity-90">
                        Audit complet →
                      </a>
                      <a
                        href={liUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0A66C2] text-white rounded-lg text-[13px] font-bold transition-opacity hover:opacity-90"
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        Partager
                      </a>
                    </div>
                  </div>
                )}

                <button type="button" onClick={resetTool} className="mt-3.5 text-[#8B96B3] text-[13px] underline hover:text-[#1B2B5E] bg-transparent border-none cursor-pointer p-0">
                  ‹ Analyser un autre frais
                </button>
              </section>
            );
          })()}
        </div>
      </div>

      {/* ── SIDEBAR (below on mobile, beside on desktop via parent grid) ──── */}
      <div className="grid gap-4 mt-7 sm:mt-0" id="fd-sidebar">
        <div className="bg-white border border-[#DDE2F0] rounded-2xl p-5 shadow-[0_2px_8px_rgba(17,28,62,.06)]">
          <h3 className="text-base font-bold text-[#1B2B5E] mb-2.5">Ce que l'outil fait</h3>
          <p className="text-[#5A6585] text-sm leading-relaxed">Il vous aide à faire un premier tri rapide. Vous voyez quels frais sont les plus simples, lesquels demandent une méthode, et lesquels méritent un avis expert avant déduction.</p>
        </div>
        <div className="bg-white border border-[#DDE2F0] rounded-2xl p-5 shadow-[0_2px_8px_rgba(17,28,62,.06)]">
          <h3 className="text-base font-bold text-[#1B2B5E] mb-2.5">Ce que le fisc regarde</h3>
          <ul className="pl-4 text-[#5A6585] text-sm list-disc space-y-1.5">
            <li>Le lien réel avec l'activité</li>
            <li>La qualité du justificatif</li>
            <li>La part privée éventuelle</li>
            <li>La cohérence du dossier dans le temps</li>
          </ul>
        </div>
        <div className="bg-white border border-[#DDE2F0] rounded-2xl p-5 shadow-[0_2px_8px_rgba(17,28,62,.06)]">
          <h3 className="text-base font-bold text-[#1B2B5E] mb-2.5">30 frais couverts</h3>
          <ul className="pl-4 text-[#5A6585] text-sm list-disc space-y-1.5">
            <li>Mobilité (voiture, carburant, vélo, voyages)</li>
            <li>Représentation (repas, cadeaux, réceptions)</li>
            <li>Bureau (domicile, loyer, mobilier, travaux)</li>
            <li>Équipement (IT, téléphone, SaaS)</li>
            <li>Formation (séminaires, livres)</li>
            <li>Divers (bancaire, sous-traitants, prime)</li>
          </ul>
        </div>
        <div className="bg-white border border-[#DDE2F0] rounded-2xl p-5 shadow-[0_2px_8px_rgba(17,28,62,.06)]">
          <h3 className="text-base font-bold text-[#1B2B5E] mb-2.5">Ce que cet outil ne fait pas</h3>
          <p className="text-[#5A6585] text-sm leading-relaxed">Il ne remplace pas une analyse personnalisée. Un cas complexe dépend de votre statut, de vos justificatifs et de la structure réelle de votre activité. MFinances analyse votre dossier complet.</p>
        </div>
      </div>
    </div>
  );
}
