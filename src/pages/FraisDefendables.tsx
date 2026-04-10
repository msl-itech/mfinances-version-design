import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FraisDefendables from "@/components/FraisDefendables";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/seo-schemas";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const faqData = [
  { q: "Qu'est-ce qu'un frais professionnel défendable en Belgique ?", a: "Un frais défendable est une dépense liée à l'activité professionnelle, justifiée par un document probant (facture, note) et proportionnée au volume d'activité. Défendable signifie que la déduction résisterait à un contrôle fiscal approfondi." },
  { q: "Un repas au restaurant est-il défendable fiscalement en Belgique ?", a: "Oui, sous conditions. La déductibilité est plafonnée à 69% (art. 53, 7° CIR). Il faut conserver la souche TVA et rédiger une note mentionnant l'identité des convives et l'objet professionnel du repas." },
  { q: "Ma voiture de société est-elle toujours défendable fiscalement ?", a: "Pas automatiquement. La déductibilité dépend des émissions CO₂ et de la date d'acquisition. Si le dirigeant utilise le véhicule à des fins privées, un ATN doit être calculé et déclaré à l'IPP." },
  { q: "Quels frais sont refusés systématiquement par le fisc belge ?", a: "Les amendes et pénalités fiscales (jamais déductibles), les frais de sport personnels, les vêtements classiques, et les repas de midi sans déplacement professionnel avéré." },
  { q: "Qu'est-ce que la fiche 281.50 et quand est-elle obligatoire ?", a: "La fiche 281.50 est obligatoire pour toute rémunération versée à des tiers indépendants dépassant 250 EUR par bénéficiaire et par an. Son absence peut entraîner une cotisation spéciale de 100% sur le montant versé." },
  { q: "Puis-je déduire mon bureau à domicile en Belgique ?", a: "Oui, si une pièce est dédiée exclusivement ou principalement à votre activité professionnelle. La méthode standard est le prorata de superficie : m² bureau ÷ m² total logement × charges éligibles." },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Frais Défendables",
  description: "Analyseur de frais professionnels belges. 30 catégories de frais analysées en 3 questions.",
  url: "https://mfinances.be/frais-defendables/",
  applicationCategory: "BusinessApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  provider: {
    "@type": "AccountingService",
    name: "MFinances",
    url: "https://mfinances.be",
    address: { "@type": "PostalAddress", addressLocality: "Uccle", addressCountry: "BE" },
  },
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Accueil", url: "https://mfinances.be/" },
  { name: "Frais Défendables", url: "https://mfinances.be/frais-defendables/" },
]);

function SR({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={className}>{children}</div>;
}

export default function FraisDefendablesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Frais Défendables — Analyseur de frais professionnels | MFinances"
        description="Vérifiez en 3 questions si votre frais professionnel est défendable, à encadrer ou en zone sensible en cas de contrôle fiscal belge. 30 catégories — Outil gratuit MFinances, Uccle."
        canonical="https://mfinances.be/frais-defendables/"
        schemaJson={[webAppSchema, breadcrumbSchema, createFaqSchema(faqData)]}
      />
      <Header />

      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <header className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-accent blur-[100px]" />
            <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-white blur-[120px]" />
          </div>

          <div className="relative max-w-[1200px] mx-auto px-6 py-16 sm:py-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs tracking-wider uppercase text-white/90 font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Outil gratuit — 30 frais couverts
            </span>

            <h1 className="font-display text-[clamp(30px,5vw,48px)] leading-[1.1] text-white mb-5 max-w-[850px] font-bold">
              Frais Défendables — Vos dépenses professionnelles tiendraient-elles face à un contrôleur fiscal&nbsp;?
            </h1>

            <p className="text-lg text-white/75 max-w-[720px] mb-4 leading-relaxed">
              La vraie question n'est pas « qu'est-ce qui est déductible ? » — c'est : ce frais est-il cohérent, justifiable et défendable en cas de contrôle ? Cet outil analyse 30 catégories de frais professionnels selon le droit fiscal belge (CIR) en 3 questions.
            </p>
            <p className="text-base text-white/55 max-w-[720px] mb-8 leading-relaxed">
              Ce n'est pas un avis fiscal. C'est un repère de premier niveau pour identifier ce qui mérite une attention particulière avant votre prochaine déclaration ou un éventuel contrôle.
            </p>

            {/* Badges */}
            <div className="flex gap-2.5 flex-wrap mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold bg-white/10 backdrop-blur-sm border border-white/15 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[hsl(148,55%,45%)]" /> Défendable
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold bg-white/10 backdrop-blur-sm border border-white/15 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[hsl(42,100%,50%)]" /> À encadrer
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold bg-white/10 backdrop-blur-sm border border-white/15 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Zone sensible
              </span>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href="#outil-frais" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-[15px] bg-accent text-white transition-all hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 active:scale-[0.97]">
                Analyser mon frais ↓
              </a>
              <Link to="/contact/" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-[15px] bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </header>

        {/* ── MAIN GRID : TOOL + SIDEBAR ────────────────────── */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <FraisDefendables />
          </div>
        </section>

        {/* ── THREE LEVELS ──────────────────────────────────── */}
        <SR>
          <section className="py-16 bg-card border-t border-border">
            <div className="max-w-[1200px] mx-auto px-6">
              <span className="inline-block text-xs tracking-widest uppercase text-accent font-bold mb-3">Méthode</span>
              <h2 className="font-display text-[clamp(26px,3.5vw,36px)] text-primary mb-8 leading-tight">Trois niveaux de lecture d'un frais</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { key: "D", icon: "✓", title: "Défendable", desc: "Le frais est cohérent, documenté et solide si votre dossier est en ordre. La déduction peut être maintenue sans risque particulier.", bg: "bg-[hsl(135,40%,94%)]", border: "border-[hsl(148,35%,82%)]", iconBg: "bg-[hsl(148,55%,30%)]", titleColor: "text-[hsl(148,70%,15%)]" },
                  { key: "E", icon: "!", title: "À encadrer", desc: "Le frais peut être admis, mais il faut une méthode, une ventilation ou une documentation plus rigoureuse pour sécuriser la déduction.", bg: "bg-[hsl(42,100%,95%)]", border: "border-[hsl(38,55%,79%)]", iconBg: "bg-[hsl(36,100%,27%)]", titleColor: "text-[hsl(36,100%,15%)]" },
                  { key: "S", icon: "✕", title: "Zone sensible", desc: "Ce frais peut fragiliser votre dossier s'il est déduit sans analyse plus précise. C'est là qu'un regard expert évite souvent les erreurs coûteuses.", bg: "bg-[hsl(0,88%,96%)]", border: "border-[hsl(0,50%,85%)]", iconBg: "bg-[hsl(0,56%,42%)]", titleColor: "text-[hsl(0,56%,25%)]" },
                ].map(l => (
                  <div key={l.key} className={`rounded-2xl p-6 border-2 ${l.bg} ${l.border} hover:shadow-md transition-shadow duration-300`}>
                    <div className={`w-11 h-11 rounded-2xl grid place-items-center text-white font-bold text-base mb-4 shadow-lg ${l.iconBg}`}>{l.icon}</div>
                    <h3 className={`text-lg font-bold mb-2 ${l.titleColor}`}>{l.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SR>

        {/* ── FAQ ────────────────────────────────────────────── */}
        <SR>
          <section className="py-16">
            <div className="max-w-[900px] mx-auto px-6">
              <span className="inline-block text-xs tracking-widest uppercase text-accent font-bold mb-3">FAQ</span>
              <h2 className="font-display text-[clamp(26px,3.5vw,36px)] text-primary mb-8 leading-tight">Questions fréquentes</h2>
              <div className="grid gap-4">
                {faqData.map((f, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl px-6 py-5 hover:shadow-md transition-shadow duration-300 group">
                    <div className="font-bold text-primary mb-2.5 text-[15px] group-hover:text-accent transition-colors">{f.q}</div>
                    <div className="text-muted-foreground text-sm leading-relaxed">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SR>

        {/* ── NOTE D'AUTORITÉ ────────────────────────────────── */}
        <section className="pb-10">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="bg-muted border border-border rounded-2xl px-6 py-5 text-sm text-muted-foreground leading-relaxed flex items-start gap-3">
              <span className="text-lg flex-shrink-0 mt-0.5">⚖️</span>
              <span>Repère général — pas un avis fiscal définitif. Les verdicts sont fondés sur le Code des impôts sur les revenus (CIR) et la pratique administrative belge. Ils ne remplacent pas une analyse personnalisée. <strong className="text-primary">MFinances</strong>, cabinet d'expertise comptable à Uccle — Membre ITAA n°50.624.805.</span>
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA ─────────────────────────────────────── */}
        <SR>
          <section className="pb-16">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="relative bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-10 sm:p-12 flex flex-col sm:flex-row justify-between gap-8 items-center overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 blur-[80px]" />
                <div className="relative">
                  <h2 className="font-display text-[clamp(24px,3vw,32px)] text-white mb-3 font-bold">Besoin d'un avis clair sur vos frais&nbsp;?</h2>
                  <p className="text-white/70 max-w-[600px] text-[15px] leading-relaxed">MFinances vous aide à sécuriser vos dépenses professionnelles et à garder un dossier cohérent, solide et serein — avant le prochain contrôle.</p>
                </div>
                <div className="relative flex gap-3 flex-wrap flex-shrink-0">
                  <Link to="/contact/" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-[15px] bg-accent text-white transition-all hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 active:scale-[0.97]">
                    Prendre rendez-vous →
                  </Link>
                  <a href="#outil-frais" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-[15px] bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all">
                    Analyser un frais
                  </a>
                </div>
              </div>
            </div>
          </section>
        </SR>
      </main>

      <Footer />
    </div>
  );
}
