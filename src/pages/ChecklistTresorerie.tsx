import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, FileText, BarChart3, Download, Loader2 } from "lucide-react";
import { submitLead, updateLeadQualification } from "@/lib/odoo-submit";
import { withUtm, trackLeadSource, resolveUtm } from "@/lib/utm-enrich";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY, verifyRecaptchaToken } from "@/lib/recaptcha";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import BookingCta from "@/components/BookingCta";
import { trackEvent } from "@/lib/clarity-events";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Checklist trésorerie", item: "https://mfinances.be/checklist-tresorerie/" },
  ],
};

const erreurs = [
  {
    title: "Confondre bénéfice et trésorerie",
    desc: "Vous êtes rentable sur le papier mais à court de cash en fin de mois ? Le bénéfice est un résultat comptable : la trésorerie, c'est l'argent disponible maintenant.",
  },
  {
    title: "Payer comptant tous vos investissements",
    desc: "Acheter votre équipement cash semble raisonnable, mais si ça mobilise 80% de vos liquidités, le premier imprévu vous met en danger.",
  },
  {
    title: "Ne pas provisionner la TVA et les impôts",
    desc: "Les charges sociales, la TVA, les acomptes : ces montants arrivent toujours. Trop de dirigeants les découvrent au moment de payer.",
  },
  {
    title: "Accepter des délais clients trop longs",
    desc: "Un client à 90 jours, c'est de l'argent immobilisé pendant 3 mois. Bénéfices sur le papier, compte vide en pratique.",
  },
  {
    title: "Décider sans tableau prévisionnel",
    desc: "Recruter, investir, signer un gros contrat : sans projection à 3-6 mois, ces décisions peuvent vous fragiliser sans que vous le voyiez.",
  },
];

function triggerPdfDownload() {
  const link = document.createElement("a");
  link.href = "/checklist-tresorerie-mfinances.pdf";
  link.download = "checklist-tresorerie-mfinances.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function ChecklistTresorerie() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const [form, setForm] = useState({ prenom: "", email: "", consent: false });
  const [step, setStep] = useState<"form" | "qualification" | "done">("form");
  const [leadId, setLeadId] = useState<number | null>(null);
  const [qualification, setQualification] = useState({ effectif: "", utilise_odoo: "", fonction: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.prenom.trim() || !form.email.trim() || !recaptchaToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const isHuman = await verifyRecaptchaToken(recaptchaToken);
      if (!isHuman) {
        setError("Vérification reCAPTCHA échouée. Réessayez.");
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        setIsLoading(false);
        return;
      }
      // Envoi vers Odoo — tag posé UNIQUEMENT si consentement emails
      const utm = resolveUtm();
      const leadData = withUtm({
        name: form.prenom,
        first_name: form.prenom,
        email_from: form.email,
        description: [
          `<h3>Checklist Trésorerie</h3>`,
          `<p><strong>Prénom:</strong> ${form.prenom}</p>`,
          `<p><strong>Email:</strong> ${form.email}</p>`,
          `<p><strong>Consentement emails:</strong> ${form.consent ? "Oui" : "Non"}</p>`,
          `<p><strong>Source:</strong> Checklist trésorerie - Site MFinances</p>`,
        ].join(""),
        ...(form.consent
        ? { tag_names: [utm.utm_source === "linkedin" ? "tunnel_linkedin_tresorerie" : "seq_checklist_tresorerie"] }
        : {}),
        x_studio_consentement: form.consent,
        ...(form.consent ? { x_studio_consentement_date: new Date().toISOString() } : {}),
      });
      // Téléchargement du PDF garanti, même si Odoo ne répond pas
      trackEvent("checklist_submit");
      triggerPdfDownload();
      trackEvent("checklist_download");

      // Enregistrement du lead dans Odoo (une panne Odoo ne bloque plus le PDF)
      try {
        const result = await submitLead(leadData);
        trackLeadSource({ ...leadData, form_name: "checklist_tresorerie" });
        if (result.lead_id) {
          setLeadId(result.lead_id);
          setStep("qualification");
        } else {
          setStep("done");
        }
      } catch (odooErr) {
        console.error("Lead checklist non transmis à Odoo :", odooErr);
        setStep("done");
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={root} className="min-h-screen">
      <SEOHead
        title="Checklist Trésorerie TPE — 5 erreurs qui vident votre compte | MFinances"
        description="Téléchargez notre checklist gratuite : les 5 erreurs de trésorerie qui menacent votre TPE et comment les corriger. Guide PDF offert par MFinances."
        canonical="https://mfinances.be/checklist-tresorerie/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-14 md:py-10 bg-precision-grid-light">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <div className="grid md:grid-cols-[1fr_380px] gap-10 items-center">
              {/* Left — copy */}
              <div>
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Guide gratuit · PDF · 5 min de lecture
                </span>
                <h1 className="font-display text-[26px] md:text-[36px] leading-[1.15] text-primary-foreground mb-4">
                  Checklist Trésorerie TPE : <span className="text-accent">5 erreurs qui vident votre compte</span>
                </h1>
                <p className="text-primary-foreground/75 text-[15px] leading-relaxed font-body max-w-[480px]">
                  Un guide pratique pour identifier si vous commettez ces erreurs : avant qu'elles ne coûtent cher.
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <div className="flex items-center gap-2 text-[13px] text-primary-foreground/60 font-body">
                    <FileText size={15} />
                    <span>PDF téléchargeable</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-primary-foreground/60 font-body">
                    <BarChart3 size={15} />
                    <span>5 erreurs analysées</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-primary-foreground/60 font-body">
                    <ShieldCheck size={15} />
                    <span>100% gratuit</span>
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div className="bg-card rounded-2xl p-7 border border-border/50 shadow-lg">
                {/* ── ÉTAPE 1 : Formulaire ── */}
                {step === "form" && (
                  <>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="h-px w-6 bg-accent" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent font-body">
                          Guide gratuit · PDF
                        </span>
                        <span className="h-px w-6 bg-accent" />
                      </div>
                      <h2 className="font-display text-[24px] sm:text-[28px] text-primary leading-[1.2] tracking-[-0.015em] mb-2">
                        Recevez la <span className="italic text-destructive">checklist trésorerie</span> qui protège votre TPE
                      </h2>
                      <p className="text-[14px] text-primary/65 font-body">
                        Les 5 erreurs qui vident les comptes des dirigeants — avec les questions à vous poser pour chacune. Téléchargement immédiat.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Prénom"
                        required
                        value={form.prenom}
                        onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-[14px] font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        disabled={isLoading}
                      />
                      <input
                        type="email"
                        placeholder="Email professionnel"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-[14px] font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        disabled={isLoading}
                      />
                      <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                          className="mt-0.5 w-4 h-4 rounded border-border/50 accent-accent"
                          disabled={isLoading}
                        />
                        <span className="text-[12px] text-foreground/60 font-body leading-snug">
                          J'accepte de recevoir des emails de MFINANCES pour m'accompagner dans mon pilotage financier.
                        </span>
                      </label>
                      {error && (
                        <p className="text-[13px] text-accent font-body">{error}</p>
                      )}
                      <div className="flex justify-center">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={RECAPTCHA_SITE_KEY}
                          onChange={(token) => setRecaptchaToken(token)}
                          onExpired={() => setRecaptchaToken(null)}
                        />
                      </div>
                      <Button variant="accent" className="w-full rounded-full" type="submit" disabled={isLoading || !recaptchaToken}>
                        {isLoading ? (
                          <>
                            <Loader2 size={16} className="mr-1 animate-spin" />
                            Envoi en cours…
                          </>
                        ) : (
                          <>
                            Télécharger la checklist <Download size={16} className="ml-1" />
                          </>
                        )}
                      </Button>
                    </form>
                    <p className="text-[11px] text-foreground/40 font-body mt-3 italic">
                      Votre email ne sera jamais partagé. Désinscription en un clic.
                    </p>
                  </>
                )}

                {/* ── ÉTAPE 2 : Qualification (facultative) ── */}
                {step === "qualification" && (
                  <div className="py-2 space-y-4">
                    <div className="text-center mb-2">
                      <CheckCircle2 size={28} className="text-[hsl(145,63%,42%)] mx-auto mb-2" />
                      <h3 className="font-display text-[18px] text-foreground mb-1">Merci {form.prenom} !</h3>
                      <p className="text-[13px] text-muted-foreground font-body">
                        Votre checklist est en cours de téléchargement.
                      </p>
                    </div>

                    <p className="text-[13px] text-foreground/80 font-body font-medium">
                      Pour mieux vous orienter, 3 questions rapides (facultatives) :
                    </p>

                    {/* Q1 — Effectif */}
                    <div className="space-y-1.5">
                      <p className="text-[12px] font-medium text-foreground font-body">
                        1. Combien de personnes dans votre entreprise ?
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {([
                          { value: "<5", label: "Moins de 5" },
                          { value: "5-10", label: "5 à 10" },
                          { value: "11-50", label: "11 à 50" },
                          { value: "50+", label: "Plus de 50" },
                        ] as const).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setQualification((q) => ({ ...q, effectif: opt.value }))}
                            className={`px-3 py-2 rounded-lg border text-[12px] font-body transition-colors ${
                              qualification.effectif === opt.value
                                ? "border-accent bg-accent/10 text-accent font-semibold"
                                : "border-border/50 text-foreground/70 hover:border-accent/40"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q2 — Odoo */}
                    <div className="space-y-1.5">
                      <p className="text-[12px] font-medium text-foreground font-body">
                        2. Utilisez-vous le logiciel Odoo ?
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {([
                          { value: "oui", label: "Oui" },
                          { value: "en_projet", label: "En projet" },
                          { value: "non", label: "Non" },
                        ] as const).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setQualification((q) => ({ ...q, utilise_odoo: opt.value }))}
                            className={`px-3 py-2 rounded-lg border text-[12px] font-body transition-colors ${
                              qualification.utilise_odoo === opt.value
                                ? "border-accent bg-accent/10 text-accent font-semibold"
                                : "border-border/50 text-foreground/70 hover:border-accent/40"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q3 — Fonction */}
                    <div className="space-y-1.5">
                      <p className="text-[12px] font-medium text-foreground font-body">
                        3. Quelle est votre fonction ?
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {([
                          { value: "dirigeant", label: "Dirigeant / Gérant" },
                          { value: "daf", label: "Directeur financier" },
                          { value: "comptable", label: "Comptable" },
                          { value: "autre", label: "Autre" },
                        ] as const).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setQualification((q) => ({ ...q, fonction: opt.value }))}
                            className={`px-3 py-2 rounded-lg border text-[12px] font-body transition-colors ${
                              qualification.fonction === opt.value
                                ? "border-accent bg-accent/10 text-accent font-semibold"
                                : "border-border/50 text-foreground/70 hover:border-accent/40"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <Button
                        variant="accent"
                        className="flex-1 rounded-full text-[13px]"
                        disabled={isLoading}
                        onClick={async () => {
                          if (!leadId) { setStep("done"); return; }
                          setIsLoading(true);
                          try {
                            const data: Record<string, unknown> = {};
                            if (qualification.effectif) data.x_studio_effectif = qualification.effectif;
                            if (qualification.utilise_odoo) data.x_studio_utilise_odoo = qualification.utilise_odoo;
                            if (qualification.fonction) data.x_studio_fonction = qualification.fonction;

                            // Classification ICP (Phase 2.1)
                            const { effectif, fonction, utilise_odoo } = qualification;
                            const effectifGte5 = effectif === "5-10" || effectif === "11-50" || effectif === "50+";
                            const isDecideur = fonction === "dirigeant" || fonction === "daf";
                            const usesOdoo = utilise_odoo === "oui" || utilise_odoo === "en_projet";

                            let icpTag = "À vérifier";
                            if (effectif === "<5") {
                              icpTag = "Hors cible";
                            } else if (effectifGte5 && isDecideur && usesOdoo) {
                              icpTag = "ICP + Odoo";
                            } else if (effectifGte5 && isDecideur) {
                              icpTag = "ICP Prioritaire";
                            }
                            // "À vérifier" = infos incomplètes, comptable, autre

                            data.tag_names = [icpTag];

                            if (Object.keys(data).length > 0) {
                              await updateLeadQualification(leadId, data);
                              trackEvent("checklist_qualification");
                            }
                          } catch (err) {
                            console.error("Erreur qualification:", err);
                          } finally {
                            setIsLoading(false);
                            setStep("done");
                          }
                        }}
                      >
                        {isLoading ? <Loader2 size={14} className="animate-spin" /> : "Envoyer"}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full text-[13px]"
                        onClick={() => setStep("done")}
                      >
                        Passer →
                      </Button>
                    </div>
                  </div>
                )}

                {/* ── ÉTAPE 3 : Confirmation ── */}
                {step === "done" && (
                  <div className="text-center py-6">
                    <CheckCircle2 size={36} className="text-[hsl(145,63%,42%)] mx-auto mb-3" />
                    <h3 className="font-display text-[20px] text-foreground mb-1">Merci {form.prenom} !</h3>
                    <p className="text-[14px] text-muted-foreground font-body mb-4">
                      Votre checklist a été téléchargée. Vérifiez votre dossier de téléchargements.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Button variant="accent" className="rounded-full" onClick={triggerPdfDownload}>
                        <Download size={16} className="mr-1" />
                        Retélécharger le PDF
                      </Button>
                      <Button variant="default" className="rounded-full" asChild>
                        <Link to="/diagnostic/">Faire le diagnostic complet →</Link>
                      </Button>
                    </div>
                    <div className="mt-6 text-left">
                      <BookingCta
                        title="Faites le point avec Mika en 30 minutes"
                        description="Un échange gratuit avec l'expert-comptable de MFinances pour prioriser les actions de la checklist selon votre situation réelle."
                        buttonClassName="w-full text-[15px] px-5 sm:px-6"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── APERÇU DES 5 ERREURS ── */}
        <section className="bg-secondary py-14 md:py-10">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <h2 className="font-display text-[24px] md:text-[30px] text-foreground text-center mb-3">
              Ce que contient <span className="text-accent">le guide</span>
            </h2>
            <p className="text-[15px] text-muted-foreground font-body text-center max-w-[520px] mx-auto mb-10">
              5 erreurs concrètes que commettent 80% des dirigeants de TPE : avec les questions à vous poser pour chacune.
            </p>

            <div className="space-y-4">
              {erreurs.map((err, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl p-6 border border-border/50 shadow-sm flex items-start gap-4"
                >
                  <span className="w-8 h-8 rounded-full bg-accent/10 text-accent text-[14px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[17px] text-foreground mb-1">{err.title}</h3>
                    <p className="text-[14px] text-muted-foreground font-body leading-relaxed">{err.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 max-w-[640px] mx-auto">
              <p className="font-display text-[20px] md:text-[24px] text-foreground leading-[1.35] mb-2">
                Si vous avez coché <span className="text-accent font-bold">3 erreurs ou plus</span>,<br />
                votre trésorerie est probablement <span className="italic">sous pression</span>.
              </p>
              <p className="text-[14px] md:text-[15px] text-muted-foreground font-body mb-6">
                Découvrez votre score exact en <strong className="text-foreground">3 minutes</strong>.
              </p>
              <Button variant="accent" size="lg" className="rounded-full" asChild>
                <Link to="/diagnostic/">Faire le diagnostic gratuit →</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
