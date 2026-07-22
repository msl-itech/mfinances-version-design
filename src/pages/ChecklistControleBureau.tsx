import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Check, FileText, BookOpen, Users, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/odoo-submit";
import { withUtm, trackLeadSource } from "@/lib/utm-enrich";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY, verifyRecaptchaToken } from "@/lib/recaptcha";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://mfinances.be/ressources/" },
    { "@type": "ListItem", position: 3, name: "Checklist Contrôle Bureau", item: "https://mfinances.be/ressources/checklist-controle-bureau/" },
  ],
};

const checklistItems = [
  "La superficie pondérée : méthode de calcul correcte et documentée",
  "Le plan de l'habitation avec surfaces exactes",
  "L'usage professionnel documenté (exclusif ou dominant selon votre statut)",
  "Les charges réparties au prorata (électricité, chauffage, loyer, entretien)",
  "Les factures au nom correct (société vs indépendant)",
  "La convention de sous-location ou de bail (si applicable)",
  "L'absence de déduction sur une pièce à usage essentiellement privé",
  "La cohérence entre le montant déduit et vos revenus immobiliers nets",
  "La traçabilité de votre présence à domicile (agenda, relevés)",
  "La validation par un expert-comptable de votre méthode de calcul",
];

const pdfContents = [
  "Pour chaque point : la règle légale applicable en Belgique (CIR)",
  "Les documents exacts à réunir : pas de formulation vague",
  "Un indicateur visuel : ✓ Couvert / ⚠ À sécuriser / ✗ Risque identifié",
  "Un renvoi vers les ressources MFinances pour sécuriser chaque point faible",
];

const pourQui = [
  "Vous déduisez un bureau à domicile depuis plus d'un an et n'avez jamais vérifié votre dossier",
  "Vous venez de recevoir une demande d'information de l'administration fiscale",
  "Vous êtes en société et votre comptable facture un loyer à votre société",
  "Vous êtes indépendant et vous utilisez une méthode superficie/total",
  "Vous envisagez de faire valoir cette déduction pour la première fois",
];

export default function ChecklistControleBureau() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const [form, setForm] = useState({ prenom: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();

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

      const leadData = withUtm({
        name: form.prenom,
        first_name: form.prenom,
        email_from: form.email,
        description: [
          `<h3>Lead Magnet : Checklist Contrôle Bureau</h3>`,
          `<p><strong>Prénom:</strong> ${form.prenom}</p>`,
          `<p><strong>Email:</strong> ${form.email}</p>`,
          `<p><strong>Source:</strong> lead-magnet-checklist-bureau</p>`,
          `<p><strong>Ressource:</strong> checklist-controle-fiscal-bureau-domicile</p>`,
          `<p><strong>Silo:</strong> bureau-a-domicile</p>`,
        ].join(""),
        tag_names: ["seq_checklist_fiscale"],
      });
      await submitLead(leadData);
      trackLeadSource({ ...leadData, form_name: "checklist_controle_bureau" });

      navigate("/ressources/checklist-controle-bureau/confirmation/", {
        state: { prenom: form.prenom },
      });
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
        title="Checklist Contrôle Fiscal Bureau à Domicile — MFinances"
        description="Votre bureau à domicile est-il défendable en cas de contrôle fiscal ? Checklist MFinances — 10 points à vérifier."
        canonical="https://mfinances.be/ressources/checklist-controle-bureau/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── SECTION 1 — HERO ── */}
        <section className="bg-secondary py-14 md:py-10">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center">
            <span className="inline-flex items-center gap-2 bg-card text-foreground text-[12px] font-bold tracking-[0.1em] uppercase px-4 py-2 rounded-full border border-border/50 mb-6">
              <ShieldCheck size={15} className="text-accent" />
              Gratuit : Téléchargement immédiat
            </span>
            <h1 className="font-display text-[28px] md:text-[40px] leading-[1.12] text-foreground mb-5">
              Votre bureau à domicile tiendrait-il un contrôle fiscal ?
            </h1>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-relaxed font-body max-w-[600px] mx-auto mb-8">
              3 dirigeants sur 4 qui déduisent un{" "}
              <Link to="/blog/fiscalite-belgique/bureau-a-domicile/" className="text-primary underline underline-offset-2 hover:text-accent transition-colors">
                bureau à domicile en Belgique
              </Link>{" "}
              n'ont pas la documentation nécessaire pour défendre leur dossier. Cette checklist vous dit exactement où vous en êtes.
            </p>
            <Button variant="accent" size="lg" className="rounded-full group whitespace-normal max-w-full" asChild>
              <a href="#formulaire">
                Recevoir ma checklist gratuitement
                <ArrowRight size={16} className="ml-1.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </section>

        {/* ── SECTION 2 — CONTEXTE ── */}
        <section className="bg-card py-14 md:py-10">
          <div className="mx-auto max-w-[720px] px-6 lg:px-12">
            <h2 className="font-display text-[22px] md:text-[30px] text-foreground mb-6">
              Ce que le fisc vérifie en premier lieu
            </h2>
            <p className="text-[15px] text-muted-foreground font-body leading-relaxed mb-4">
              Quand l'administration fiscale contrôle votre déduction bureau à domicile, elle ne s'intéresse pas d'abord à vos factures. Elle regarde d'abord si votre situation est cohérente : la superficie déclarée, la méthode de calcul utilisée, et la logique entre votre statut et votre mode de déduction.
            </p>
            <p className="text-[15px] text-muted-foreground font-body leading-relaxed">
              Un dossier mal structuré — même pour un bureau tout à fait légitime — peut se transformer en redressement partiel ou total. Non pas parce que vous avez triché, mais parce que vous n'avez pas les bons éléments à présenter. Découvrez{" "}
              <Link to="/blog/fiscalite-belgique/erreurs-bureau-a-domicile-controle-fiscal/" className="text-primary underline underline-offset-2 hover:text-accent transition-colors">
                les 5 erreurs qui déclenchent un contrôle
              </Link>.
            </p>
          </div>
        </section>

        {/* ── SECTION 3 — APERÇU CHECKLIST ── */}
        <section className="bg-secondary py-14 md:py-10">
          <div className="mx-auto max-w-[720px] px-6 lg:px-12">
            <h2 className="font-display text-[22px] md:text-[30px] text-foreground mb-3">
              Les 10 points de la checklist : aperçu
            </h2>
            <p className="text-[15px] text-muted-foreground font-body leading-relaxed mb-8">
              En téléchargeant la checklist complète, vous obtenez le détail de chaque point avec les preuves exactes à rassembler.
            </p>
            <div className="space-y-3">
              {checklistItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <div className="w-6 h-6 rounded-full bg-[hsl(145,63%,30%)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-[hsl(145,63%,30%)]" strokeWidth={3} />
                  </div>
                  <span className="text-[14px] text-foreground font-body leading-relaxed">
                    <span className="font-semibold">{i + 1}.</span> {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — CE QUE CONTIENT LE PDF ── */}
        <section className="bg-card py-14 md:py-10">
          <div className="mx-auto max-w-[720px] px-6 lg:px-12">
            <h2 className="font-display text-[22px] md:text-[30px] text-foreground mb-3">
              Ce que contient la checklist PDF
            </h2>
            <p className="text-[15px] text-muted-foreground font-body leading-relaxed mb-8">
              La checklist complète est un document PDF de 2 pages, directement imprimable ou à conserver sur votre téléphone.
            </p>
            <div className="space-y-4">
              {pdfContents.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-[15px] text-foreground font-body leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5 — POUR QUI ── */}
        <section className="bg-card py-14 md:py-10">
          <div className="mx-auto max-w-[720px] px-6 lg:px-12">
            <h2 className="font-display text-[22px] md:text-[30px] text-foreground mb-3">
              Pour qui est cette checklist ?
            </h2>
            <p className="text-[15px] text-muted-foreground font-body leading-relaxed mb-8">
              Cette checklist est utile si vous êtes dans l'une de ces situations :
            </p>
            <div className="space-y-4">
              {pourQui.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users size={13} className="text-accent" />
                  </div>
                  <p className="text-[15px] text-foreground font-body leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6 — FORMULAIRE ── */}
        <section id="formulaire" className="bg-secondary py-14 md:py-10">
          <div className="mx-auto max-w-[480px] px-6">
            <div className="bg-card rounded-2xl p-7 md:p-10 border border-border/50 shadow-lg">
              <div className="text-center mb-6">
                <h2 className="font-display text-[22px] md:text-[26px] text-foreground mb-2">
                  Savez-vous ce que le fisc regarde en premier ?
                </h2>
                <p className="text-[14px] text-muted-foreground font-body">
                  Cette checklist vous montre les 10 points exacts qu'un contrôleur vérifie — et les preuves à avoir sous la main.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Votre prénom"
                  required
                  maxLength={100}
                  value={form.prenom}
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-[14px] font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={isLoading}
                />
                <input
                  type="email"
                  placeholder="votre@email.be"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-[14px] font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={isLoading}
                />
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
                      Télécharger la checklist
                      <ArrowRight size={16} className="ml-1.5" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-[11px] text-foreground/40 font-body mt-4 italic text-center">
                Vos données sont confidentielles. Aucune revente.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 7 — CTA FINAL ── */}
        <section className="bg-primary py-14 md:py-10 bg-precision-grid-light">
          <div className="mx-auto max-w-[640px] px-6 lg:px-12 text-center">
            <h2 className="font-display text-[22px] md:text-[30px] text-primary-foreground mb-4">
              Un doute sur un point de la checklist ?
            </h2>
            <p className="text-primary-foreground/70 text-[15px] font-body leading-relaxed mb-3 max-w-[520px] mx-auto">
              Un redressement fiscal sur un bureau à domicile peut dépasser 5 000 €. 20 minutes avec un expert suffisent à vérifier que votre dossier tient la route.
            </p>
            <div className="flex flex-col items-center gap-4 mt-8">
              <Button variant="accent" size="lg" className="rounded-full group" asChild>
                <Link to="/contact/">
                  Vérifier ma situation avec un expert
                  <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link
                to="/ressources/calculateur-bureau/"
                className="text-[13px] text-primary-foreground/60 font-body underline underline-offset-2 hover:text-primary-foreground transition-colors"
              >
                Calculer ma déduction bureau →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
