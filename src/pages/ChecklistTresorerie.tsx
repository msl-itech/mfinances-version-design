import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, FileText, BarChart3, Download, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/odoo-submit";

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
    desc: "Vous êtes rentable sur le papier mais à court de cash en fin de mois ? Le bénéfice est un résultat comptable — la trésorerie, c'est l'argent disponible maintenant.",
  },
  {
    title: "Payer comptant tous vos investissements",
    desc: "Acheter votre équipement cash semble raisonnable, mais si ça mobilise 80% de vos liquidités, le premier imprévu vous met en danger.",
  },
  {
    title: "Ne pas provisionner la TVA et les impôts",
    desc: "Les charges sociales, la TVA, les acomptes — ces montants arrivent toujours. Trop de dirigeants les découvrent au moment de payer.",
  },
  {
    title: "Accepter des délais clients trop longs",
    desc: "Un client à 90 jours, c'est de l'argent immobilisé pendant 3 mois. Bénéfices sur le papier, compte vide en pratique.",
  },
  {
    title: "Décider sans tableau prévisionnel",
    desc: "Recruter, investir, signer un gros contrat — sans projection à 3-6 mois, ces décisions peuvent vous fragiliser sans que vous le voyiez.",
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
  const [form, setForm] = useState({ prenom: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.prenom.trim() || !form.email.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Envoi vers Odoo avec fallback localStorage
      await submitLead({
        name: form.prenom,
        email_from: form.email,
        description: `Lead Checklist Trésorerie\n\nPrénom: ${form.prenom}\nEmail: ${form.email}\nSource: Checklist trésorerie - Site MFinances`,
      });

      // Téléchargement du PDF
      triggerPdfDownload();

      setSubmitted(true);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-14 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <div className="grid md:grid-cols-[1fr_380px] gap-10 items-center">
              {/* Left — copy */}
              <div>
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
                  Guide gratuit · PDF · 5 min de lecture
                </span>
                <h1 className="font-display text-[26px] md:text-[36px] leading-[1.15] text-primary-foreground mb-4">
                  Pourquoi vous n'avez jamais d'argent sur votre compte — <span className="text-accent">et les 5 erreurs à corriger cette semaine</span>
                </h1>
                <p className="text-primary-foreground/75 text-[15px] leading-relaxed font-body max-w-[480px]">
                  Un guide pratique pour identifier si vous commettez ces erreurs — avant qu'elles ne coûtent cher.
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
                {!submitted ? (
                  <>
                    <h2 className="font-display text-[20px] text-foreground mb-1 leading-tight">
                      Téléchargez la checklist
                    </h2>
                    <p className="text-[13px] text-muted-foreground font-body mb-5">
                      Vérifiez si vous commettez ces 5 erreurs — résultat immédiat.
                    </p>
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
                      {error && (
                        <p className="text-[13px] text-accent font-body">{error}</p>
                      )}
                      <Button variant="accent" className="w-full rounded-full" type="submit" disabled={isLoading}>
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
                ) : (
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── APERÇU DES 5 ERREURS ── */}
        <section className="bg-secondary py-14 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <h2 className="font-display text-[24px] md:text-[30px] text-foreground text-center mb-3">
              Ce que contient <span className="text-accent">le guide</span>
            </h2>
            <p className="text-[15px] text-muted-foreground font-body text-center max-w-[520px] mx-auto mb-10">
              5 erreurs concrètes que commettent 80% des dirigeants de TPE — avec les questions à vous poser pour chacune.
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

            <div className="text-center mt-10">
              <p className="text-[14px] text-muted-foreground font-body mb-4">
                Vous reconnaissez-vous dans certaines de ces erreurs ?
              </p>
              <Button variant="accent" size="lg" className="rounded-full" asChild>
                <Link to="/diagnostic/">Faire le diagnostic complet — c'est gratuit →</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
