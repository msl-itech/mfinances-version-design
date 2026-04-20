import { useEffect } from "react";
import { Scale } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FraisDefendables from "@/components/FraisDefendables";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/seo-schemas";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const faqData = [
  { q: "Qu'est-ce qu'un frais professionnel défendable en Belgique ?", a: "Un frais défendable est une dépense liée à l'activité professionnelle, justifiée par un document probant (facture, note) et proportionnée au volume d'activité. Défendable signifie que la déduction résisterait à un contrôle fiscal approfondi." },
  { q: "Comment fonctionne l'outil Frais Défendables ?", a: "L'outil analyse 30 catégories de frais professionnels en 3 questions : statut fiscal (IPP ou société), usage réel de la dépense, justificatif disponible. Verdict : défendable, à encadrer, ou zone sensible." },
  { q: "C'est quoi un DAF à temps partiel ?", a: "Un DAF (Directeur Administratif et Financier) à temps partiel accompagne le dirigeant sans être salarié à plein temps. Chez MFinances, le DAF à temps partiel est intégré dans tous les forfaits." },
  { q: "Combien coûte un expert-comptable pour une PME en Belgique ?", a: "Chez MFinances, les forfaits pour TPE en croissance incluent comptabilité complète, contrôle de gestion et accès à un DAF à temps partiel. Contactez-nous pour un devis adapté à votre structure." },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Frais Défendables",
  description: "Analyseur de frais professionnels belges. 30 catégories analysées en 3 questions.",
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
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}>
      {children}
    </div>
  );
}

export default function FraisDefendablesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Frais Défendables — Analyseur fiscal belge | MFinances"
        description="Vérifiez en 3 questions si un frais pro est défendable en cas de contrôle fiscal belge. 30 catégories — outil gratuit MFinances."
        canonical="https://mfinances.be/frais-defendables/"
        schemaJson={[webAppSchema, breadcrumbSchema, createFaqSchema(faqData)]}
      />
      <Header />

      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <header className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
          {/* Decorative elements — hidden on mobile */}
          <div className="absolute inset-0 opacity-10 hidden sm:block">
            <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-accent blur-[100px]" />
            <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-white blur-[120px]" />
          </div>

          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-20 text-center sm:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs tracking-wider uppercase text-white/90 font-bold mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Outil gratuit — 30 frais couverts
            </span>

            <h1 className="font-display text-[clamp(24px,5vw,48px)] leading-[1.1] text-white mb-4 sm:mb-5 max-w-[850px] font-bold sm:mx-0 mx-auto">
              Frais Défendables — Vos dépenses professionnelles tiendraient-elles face à un contrôleur fiscal&nbsp;?
            </h1>

            <p className="text-base sm:text-lg text-white/75 max-w-[720px] mb-3 sm:mb-4 leading-relaxed sm:mx-0 mx-auto">
              La vraie question n'est pas « qu'est-ce qui est déductible ? » — c'est : ce frais est-il cohérent, justifiable et défendable en cas de contrôle ? Cet outil analyse 30 catégories de frais professionnels selon le droit fiscal belge (CIR) en 3 questions.
            </p>
            <p className="text-sm sm:text-base text-white/55 max-w-[720px] mb-6 sm:mb-8 leading-relaxed hidden sm:block">
              Ce n'est pas un avis fiscal. C'est un repère de premier niveau pour identifier ce qui mérite une attention particulière avant votre prochaine déclaration ou un éventuel contrôle.
            </p>

            {/* Badges — horizontal scroll on mobile */}
            <div className="flex gap-2.5 flex-nowrap overflow-x-auto sm:flex-wrap mb-6 sm:mb-8 justify-center sm:justify-start pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold bg-white/10 backdrop-blur-sm border border-white/15 text-white whitespace-nowrap flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[hsl(148,55%,45%)]" /> Défendable
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold bg-white/10 backdrop-blur-sm border border-white/15 text-white whitespace-nowrap flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[hsl(42,100%,50%)]" /> À encadrer
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold bg-white/10 backdrop-blur-sm border border-white/15 text-white whitespace-nowrap flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Zone sensible
              </span>
            </div>

            <div className="flex gap-3 flex-col sm:flex-row sm:flex-wrap items-center sm:items-start">
              <a href="#outil-frais" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-[15px] bg-accent text-white transition-all hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 active:scale-[0.97] w-full sm:w-auto">
                Analyser mon frais ↓
              </a>
              <Link to="/contact/" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-[15px] bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all w-full sm:w-auto">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </header>

        {/* ── MAIN GRID : TOOL + SIDEBAR ────────────────────── */}
        <section className="py-8 sm:py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <FraisDefendables />
          </div>
        </section>

        {/* ── THREE LEVELS ──────────────────────────────────── */}
        <SR>
          <section className="py-10 sm:py-16 bg-card border-t border-border">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <span className="inline-block text-xs tracking-widest uppercase text-accent font-bold mb-3">Méthode</span>
              <h2 className="font-display text-[clamp(22px,3.5vw,36px)] text-primary mb-6 sm:mb-8 leading-tight">Trois niveaux de lecture d'un frais</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
                {[
                  { key: "D", icon: "✓", title: "Défendable", desc: "Le frais est cohérent, documenté et solide si votre dossier est en ordre. La déduction peut être maintenue sans risque particulier.", bg: "bg-[hsl(135,40%,94%)]", border: "border-[hsl(148,35%,82%)]", iconBg: "bg-[hsl(148,55%,30%)]", titleColor: "text-[hsl(148,70%,15%)]" },
                  { key: "E", icon: "!", title: "À encadrer", desc: "Le frais peut être admis, mais il faut une méthode, une ventilation ou une documentation plus rigoureuse pour sécuriser la déduction.", bg: "bg-[hsl(42,100%,95%)]", border: "border-[hsl(38,55%,79%)]", iconBg: "bg-[hsl(36,100%,27%)]", titleColor: "text-[hsl(36,100%,15%)]" },
                  { key: "S", icon: "✕", title: "Zone sensible", desc: "Ce frais peut fragiliser votre dossier s'il est déduit sans analyse plus précise. C'est là qu'un regard expert évite souvent les erreurs coûteuses.", bg: "bg-[hsl(0,88%,96%)]", border: "border-[hsl(0,50%,85%)]", iconBg: "bg-[hsl(0,56%,42%)]", titleColor: "text-[hsl(0,56%,25%)]" },
                ].map(l => (
                  <div key={l.key} className={`rounded-2xl p-5 sm:p-6 border-2 ${l.bg} ${l.border} hover:shadow-md transition-shadow duration-300 flex sm:block items-start gap-3`}>
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl grid place-items-center text-white font-bold text-base mb-0 sm:mb-4 shadow-lg flex-shrink-0 ${l.iconBg}`}>{l.icon}</div>
                    <div>
                      <h3 className={`text-base sm:text-lg font-bold mb-1 sm:mb-2 ${l.titleColor}`}>{l.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SR>

        {/* ── FAQ ────────────────────────────────────────────── */}
        <SR>
          <section className="py-10 sm:py-16">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6">
              <span className="inline-block text-xs tracking-widest uppercase text-accent font-bold mb-3">FAQ</span>
              <h2 className="font-display text-[clamp(22px,3.5vw,36px)] text-primary mb-6 sm:mb-8 leading-tight">Questions fréquentes</h2>
              <div className="grid gap-3 sm:gap-4">
                {faqData.map((f, i) => (
                  <details key={i} className="bg-card border border-border rounded-2xl hover:shadow-md transition-shadow duration-300 group [&[open]>summary_.faq-chevron]:rotate-180">
                    <summary className="font-bold text-primary text-[14px] sm:text-[15px] group-hover:text-accent transition-colors cursor-pointer px-5 sm:px-6 py-4 sm:py-5 list-none flex items-center justify-between gap-3">
                      <span>{f.q}</span>
                      <svg className="faq-chevron w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="text-muted-foreground text-sm leading-relaxed px-5 sm:px-6 pb-4 sm:pb-5 pt-0">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </SR>

        {/* ── NOTE D'AUTORITÉ ────────────────────────────────── */}
        <section className="pb-8 sm:pb-10">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <div className="bg-muted border border-border rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-[13px] sm:text-sm text-muted-foreground leading-relaxed flex items-start gap-3">
              <Scale className="flex-shrink-0 mt-0.5" size={18} />
              <span>Repère général — pas un avis fiscal définitif. Les verdicts sont fondés sur le Code des impôts sur les revenus (CIR) et la pratique administrative belge. Ils ne remplacent pas une analyse personnalisée. <strong className="text-primary">MFinances</strong>, cabinet d'expertise comptable à Uccle — Membre ITAA n°50.624.805.</span>
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA ─────────────────────────────────────── */}
        <SR>
          <section className="pb-10 sm:pb-16">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="relative bg-gradient-to-br from-primary-dark to-primary rounded-2xl sm:rounded-3xl p-6 sm:p-12 flex flex-col sm:flex-row justify-between gap-6 sm:gap-8 items-center overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 blur-[80px] hidden sm:block" />
                <div className="relative text-center sm:text-left">
                  <h2 className="font-display text-[clamp(20px,3vw,32px)] text-white mb-2 sm:mb-3 font-bold">Besoin d'un avis clair sur vos frais&nbsp;?</h2>
                  <p className="text-white/70 max-w-[600px] text-[14px] sm:text-[15px] leading-relaxed">MFinances vous aide à sécuriser vos dépenses professionnelles et à garder un dossier cohérent, solide et serein — avant le prochain contrôle.</p>
                </div>
                <div className="relative flex gap-3 flex-col sm:flex-row flex-shrink-0 w-full sm:w-auto">
                  <Link to="/contact/" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-[15px] bg-accent text-white transition-all hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 active:scale-[0.97] w-full sm:w-auto">
                    Prendre rendez-vous →
                  </Link>
                  <a href="#outil-frais" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-[15px] bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all w-full sm:w-auto">
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
