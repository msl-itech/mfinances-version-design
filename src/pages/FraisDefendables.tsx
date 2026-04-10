import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FraisDefendables from "@/components/FraisDefendables";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/seo-schemas";

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

export default function FraisDefendablesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <SEOHead
        title="Frais Défendables — Analyseur de frais professionnels | MFinances"
        description="Vérifiez en 3 questions si votre frais professionnel est défendable, à encadrer ou en zone sensible en cas de contrôle fiscal belge. 30 catégories — Outil gratuit MFinances, Uccle."
        canonical="https://mfinances.be/frais-defendables/"
        schemaJson={[webAppSchema, breadcrumbSchema, createFaqSchema(faqData)]}
      />
      <Header />

      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <header className="bg-white border-b border-[#DDE2F0]">
          <div className="max-w-[1200px] mx-auto px-6 py-8 sm:py-11">
            <span className="inline-block text-xs tracking-wider uppercase text-[#E8393A] font-bold mb-3.5">Outil gratuit</span>
            <h1 className="font-heading text-[clamp(28px,5vw,52px)] leading-[1.12] text-[#1B2B5E] mb-4 max-w-[900px]">
              Frais Défendables — Vos dépenses professionnelles tiendraient-elles face à un contrôleur fiscal&nbsp;?
            </h1>
            <p className="text-lg text-[#5A6585] max-w-[760px] mb-4 leading-relaxed">
              La vraie question n'est pas « qu'est-ce qui est déductible ? » — c'est : ce frais est-il cohérent, justifiable et défendable en cas de contrôle ? Cet outil analyse 30 catégories de frais professionnels selon le droit fiscal belge (CIR) en 3 questions.
            </p>
            <p className="text-base text-[#5A6585] max-w-[760px] mb-7 leading-relaxed">
              Ce n'est pas un avis fiscal. C'est un repère de premier niveau pour identifier ce qui mérite une attention particulière avant votre prochaine déclaration ou un éventuel contrôle.
            </p>

            {/* Badges */}
            <div className="flex gap-2 flex-wrap mb-7" aria-label="Les trois niveaux de verdict">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12.5px] font-bold bg-[#EDF7EE] text-[#1A6B3A] border border-[#b8dfc0]">🟢 Défendable — cohérent, bien justifié, solide en cas de contrôle</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12.5px] font-bold bg-[#FFF8E6] text-[#8B5C00] border border-[#f0d595]">🟡 À encadrer — des éléments sont à formaliser avant de déduire sereinement</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12.5px] font-bold bg-[#FEF0F0] text-[#A92D2E] border border-[#f5b8b8]">🔴 Zone sensible — peut fragiliser l'ensemble de votre dossier fiscal</span>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href="#outil-frais" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] font-bold text-[15px] bg-[#E8393A] text-white transition-opacity hover:opacity-90">
                Analyser ce frais ↓
              </a>
              <Link to="/contact/" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] font-bold text-[15px] bg-white text-[#1B2B5E] border border-[#DDE2F0] hover:border-[#1B2B5E] transition-colors">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </header>

        {/* ── MAIN GRID : TOOL + SIDEBAR ────────────────────── */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-7 items-start">
            <FraisDefendables />
          </div>
        </section>

        {/* ── THREE LEVELS ──────────────────────────────────── */}
        <section className="py-13 bg-white border-t border-[#DDE2F0]">
          <div className="max-w-[1200px] mx-auto px-6">
            <span className="inline-block text-xs tracking-wider uppercase text-[#E8393A] font-bold mb-3">Méthode</span>
            <h2 className="font-heading text-[clamp(26px,3.5vw,36px)] text-[#1B2B5E] mb-6 leading-tight">Trois niveaux de lecture d'un frais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: "D", icon: "✓", title: "Défendable", desc: "Le frais est cohérent, documenté et solide si votre dossier est en ordre. La déduction peut être maintenue sans risque particulier.", bg: "bg-[#EDF7EE]", border: "border-[#CBE7D8]", iconBg: "bg-[#1A6B3A]", titleColor: "text-[#0D4A26]" },
                { key: "E", icon: "!", title: "À encadrer", desc: "Le frais peut être admis, mais il faut une méthode, une ventilation ou une documentation plus rigoureuse pour sécuriser la déduction.", bg: "bg-[#FFF8E6]", border: "border-[#F1D7A3]", iconBg: "bg-[#8B5C00]", titleColor: "text-[#5C3C00]" },
                { key: "S", icon: "✕", title: "Zone sensible", desc: "Ce frais peut fragiliser votre dossier s'il est déduit sans analyse plus précise. C'est là qu'un regard expert évite souvent les erreurs coûteuses.", bg: "bg-[#FEF0F0]", border: "border-[#F2C3C3]", iconBg: "bg-[#A92D2E]", titleColor: "text-[#7B1D1E]" },
              ].map(l => (
                <div key={l.key} className={`rounded-2xl p-5 border ${l.bg} ${l.border}`}>
                  <div className={`w-9 h-9 rounded-full grid place-items-center text-white font-bold text-sm mb-3 ${l.iconBg}`}>{l.icon}</div>
                  <h3 className={`text-base font-bold mb-2 ${l.titleColor}`}>{l.title}</h3>
                  <p className="text-sm text-[#5A6585] leading-relaxed">{l.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────── */}
        <section className="py-13">
          <div className="max-w-[1200px] mx-auto px-6">
            <span className="inline-block text-xs tracking-wider uppercase text-[#E8393A] font-bold mb-3">FAQ</span>
            <h2 className="font-heading text-[clamp(26px,3.5vw,36px)] text-[#1B2B5E] mb-6 leading-tight">Questions fréquentes</h2>
            <div className="grid gap-3">
              {faqData.map((f, i) => (
                <div key={i} className="bg-white border border-[#DDE2F0] rounded-2xl px-5 py-4">
                  <div className="font-bold text-[#1B2B5E] mb-2 text-[15px]">{f.q}</div>
                  <div className="text-[#5A6585] text-sm leading-relaxed">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOTE D'AUTORITÉ ────────────────────────────────── */}
        <section className="pb-8">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="bg-[#F4F5F9] border border-[#DDE2F0] rounded-2xl px-6 py-5 text-sm text-[#5A6585] leading-relaxed">
              Repère général — pas un avis fiscal définitif. Les verdicts sont fondés sur le Code des impôts sur les revenus (CIR) et la pratique administrative belge. Ils ne remplacent pas une analyse personnalisée. MFinances, cabinet d'expertise comptable à Uccle — Membre ITAA n°50.624.805.
            </div>
          </div>
        </section>

        {/* ── FOOTER CTA ─────────────────────────────────────── */}
        <section className="pb-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="bg-[#1B2B5E] rounded-3xl p-9 flex flex-col sm:flex-row justify-between gap-6 items-center">
              <div>
                <h2 className="font-heading text-[clamp(22px,3vw,30px)] text-white mb-2.5">Besoin d'un avis clair sur vos frais&nbsp;?</h2>
                <p className="text-white/80 max-w-[640px] text-[15px]">MFinances vous aide à sécuriser vos dépenses professionnelles et à garder un dossier cohérent, solide et serein — avant le prochain contrôle.</p>
              </div>
              <div className="flex gap-3 flex-wrap flex-shrink-0">
                <Link to="/contact/" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] font-bold text-[15px] bg-[#E8393A] text-white transition-opacity hover:opacity-90">
                  Prendre rendez-vous →
                </Link>
                <a href="#outil-frais" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] font-bold text-[15px] bg-white/10 text-white border border-white/25 hover:bg-white/20 transition-colors">
                  Analyser un frais
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
