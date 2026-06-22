import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Home, FileText, Calculator, BookOpen, AlertTriangle, HelpCircle, ArrowRight, Shield, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/seo-schemas";

import heroFiscalite from "@/assets/blog/hero-fiscalite.jpg";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";



const faqData = [
  { q: "Quelle quotiété puis-je déduire pour mon bureau à domicile ?", a: "La quotiété dépend de la surface professionnelle pondérée divisée par la surface totale pondérée de votre logement. Pour un bureau de 15 m² dans un appartement de 80 m², la quotiété est de 18,75 %. Notre calculateur applique cette méthode automatiquement et vous génère un rapport PDF documenté en 2 minutes." },
  { q: "Dois-je avoir un bureau dédié pour déduire ?", a: "Non. Vous pouvez appliquer un pourcentage d'usage professionnel à chaque pièce selon son utilisation réelle. Un salon utilisé à 20 % à titre professionnel contribue proportionnellement à votre quotiété. L'article sur les pièces à usage mixte explique la méthode de calcul détaillée." },
  { q: "Est-ce que déduire un bureau à domicile déclenche un contrôle fiscal ?", a: "Non, c'est un droit légal. En revanche, une quotiété disproportionnée (supérieure à 35 % sans justification documentée), l'absence de bail écrit ou des paiements sans trace bancaire peuvent attirer l'attention lors d'un contrôle." },
  { q: "Que faire si je suis locataire et que je veux sous-louer mon bureau à ma société ?", a: "Vous devez vérifier que votre bail principal autorise la sous-location. En cas de clause restrictive, l'accord écrit de votre propriétaire est obligatoire avant toute démarche. Notre générateur de bail insère automatiquement la clause légale de sous-location si vous sélectionnez le statut 'locataire'." },
];

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Accueil", url: "https://mfinances.be/" },
  { name: "Blog", url: "https://mfinances.be/blog/" },
  { name: "Fiscalité belge", url: "https://mfinances.be/blog/fiscalite-belgique/" },
  { name: "Bureau à domicile", url: "https://mfinances.be/blog/fiscalite-belgique/bureau-a-domicile/" },
]);

const articles = [
  { label: "Comment calculer la déduction bureau à domicile en Belgique (2026)", href: "/blog/fiscalite-belgique/calcul-bureau-a-domicile/", anchor: "Comment calculer" },
  { label: "Pièce à usage mixte : comment calculer la part professionnelle", href: "/blog/fiscalite-belgique/piece-usage-mixte-bureau/", anchor: "Pièce à usage mixte" },
  { label: "Locataire et dirigeant : comment louer votre bureau à votre société", href: "/blog/fiscalite-belgique/locataire-societe-sous-location-loyer/", anchor: "Sous-location" },
  { label: "Louer vos meubles à votre société : la déduction à 7,5 %", href: "/blog/fiscalite-belgique/louer-meubles-bureau-societe/", anchor: "Bail meublé 60/40" },
  { label: "Bureau à domicile : les différences entre indépendant, dirigeant et les deux", href: "/blog/fiscalite-belgique/comparatif-bureau-a-domicile-statut/", anchor: "Comparatif statuts" },
  { label: "5 erreurs qui déclenchent un contrôle fiscal sur votre bureau à domicile", href: "/blog/fiscalite-belgique/erreurs-bureau-a-domicile-controle-fiscal/", anchor: "5 erreurs" },
  { label: "Quotiété + sous-location + meubles : la stratégie optimale", href: "/blog/fiscalite-belgique/combinaison-bureau-a-domicile/", anchor: "Stratégie optimale" },
  { label: "Requalification du loyer en rémunération : comment l'éviter", href: "/blog/fiscalite-belgique/requalification-loyer-remuneration/", anchor: "Requalification" },
];

export default function BureauADomicileHub() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div ref={root} className="min-h-screen bg-background">
      <SEOHead
        title="Bureau à domicile Belgique 2026 — Guide dirigeant"
        description="Quotiété, sous-location, bail meublé : tout ce qu'un dirigeant belge doit savoir pour déduire son bureau à domicile légalement et sans risque."
        canonical="https://mfinances.be/blog/fiscalite-belgique/bureau-a-domicile/"
        schemaJson={[breadcrumbSchema, createFaqSchema(faqData)]}
      />
      <Header />

      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <header className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-accent blur-[100px]" />
            <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-white blur-[120px]" />
          </div>

          <div className="relative max-w-[1200px] mx-auto px-6 py-8 sm:py-10 lg:py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-6 flex-wrap">
              <Link to="/" className="hover:text-white/80 transition-colors">Accueil</Link>
              <span>›</span>
              <Link to="/blog/" className="hover:text-white/80 transition-colors">Blog</Link>
              <span>›</span>
              <Link to="/blog/fiscalite-belgique/" className="hover:text-white/80 transition-colors">Fiscalité belge</Link>
              <span>›</span>
              <span className="text-white/70">Bureau à domicile</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs tracking-wider uppercase text-white/90 font-bold mb-6">
              <Shield size={14} />
              Cabinet MFinances · ITAA n°50.624.805 · Uccle, Bruxelles
            </span>

            <h1 className="font-display text-[clamp(30px,5vw,48px)] leading-[1.1] text-white mb-5 max-w-[850px] font-bold">
              Bureau à domicile en Belgique : le guide complet du dirigeant (2026)
            </h1>

            <p className="text-lg text-white/75 max-w-[720px] mb-6 leading-relaxed">
              Quotiété, sous-location, bail meublé : tout ce que vous devez savoir pour déduire légalement et sans risque.
            </p>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-4 mb-8 max-w-[720px]">
              <p className="text-white/90 text-sm leading-relaxed">
                <strong className="text-accent">Ce guide couvre</strong> les 3 mécanismes de déduction, 2 outils gratuits et les 5 erreurs à éviter absolument.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link to="/ressources/calculateur-bureau/" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-[15px] bg-accent text-white transition-all hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 active:scale-[0.97]">
                <Calculator size={18} />
                Calculer ma quotiété gratuitement →
              </Link>
              <Link to="/contact/" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-[15px] bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all">
                Parler directement à Mika →
              </Link>
            </div>
          </div>
        </header>

        {/* ── INTRO ────────────────────────────────────────────── */}
        <div data-anim="fade-up">
          <section className="py-8">
            <div className="max-w-[800px] mx-auto px-6">
              <div className="prose prose-lg max-w-none text-foreground/85 leading-relaxed space-y-5">
                <p>Chaque année, des milliers de dirigeants belges passent à côté de plusieurs centaines : parfois plusieurs milliers : d'euros de déductions fiscales légitimes. Non par mauvaise volonté. Par manque d'information sur les mécanismes qui s'appliquent exactement à leur situation.</p>
                <p>Vous travaillez depuis votre domicile. Votre société occupe une pièce, parfois deux. Votre loyer, votre énergie, votre internet, votre assurance : une partie de ces charges vous appartient fiscalement. Encore faut-il savoir laquelle, comment la calculer et comment la documenter pour résister à un contrôle.</p>
                <p>Ce guide rassemble tout ce que vous devez savoir sur le bureau à domicile en Belgique en 2026 : calcul de la quotiété, mécanismes de déduction selon votre statut, erreurs à éviter, et stratégies d'optimisation légales.</p>
              </div>
            </div>
          </section>
        </div>

        {/* ── 3 MÉCANISMES ────────────────────────────────────── */}
        <div data-anim="fade-up">
          <section className="py-8 bg-card border-y border-border">
            <div className="max-w-[1200px] mx-auto px-6">
              <span className="inline-block text-xs tracking-widest uppercase text-accent font-bold mb-3">Selon votre statut</span>
              <h2 className="font-display text-[clamp(26px,3.5vw,36px)] text-primary mb-10 leading-tight">Les 3 mécanismes disponibles selon votre statut</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    num: "1",
                    title: "La quotiété directe",
                    desc: "Vous calculez le pourcentage de votre logement utilisé à titre professionnel et vous l'appliquez à vos charges annuelles. Simple, documentable, utilisable par tout indépendant ou dirigeant. Une quotiété de 20 % sur 20 000 € de charges annuelles représente 4 000 € de déductions : soit plus de 1 600 € d'économie fiscale nette à l'ISOC 25 %.",
                    icon: Calculator,
                    color: "bg-[hsl(135,40%,94%)] border-[hsl(148,35%,82%)]",
                    iconBg: "bg-[hsl(148,55%,30%)]",
                  },
                  {
                    num: "2",
                    title: "La sous-location",
                    desc: "Vous louez formellement une partie de votre domicile à votre société. La société déduit le loyer comme charge professionnelle. Vous percevez un revenu immobilier, moins lourdement imposé qu'une rémunération. Nécessite un bail écrit conforme et, si vous êtes locataire, l'autorisation de votre propriétaire.",
                    icon: FileText,
                    color: "bg-[hsl(42,100%,95%)] border-[hsl(38,55%,79%)]",
                    iconBg: "bg-[hsl(36,100%,27%)]",
                  },
                  {
                    num: "3",
                    title: "Le bail meublé 60/40",
                    desc: "En ajoutant un inventaire de meubles professionnels à votre bail de location, vous créez un revenu mobilier taxé à un taux effectif d'environ 7,5 %. La combinaison sous-location + meubles est la stratégie la plus avantageuse fiscalement pour un dirigeant de société belge.",
                    icon: Home,
                    color: "bg-[hsl(210,60%,95%)] border-[hsl(210,40%,82%)]",
                    iconBg: "bg-primary",
                  },
                ].map(m => (
                  <div key={m.num} className={`rounded-2xl p-6 border-2 ${m.color} hover:shadow-md transition-shadow duration-300`}>
                    <div className={`w-11 h-11 rounded-2xl grid place-items-center text-white font-bold text-base mb-4 shadow-lg ${m.iconBg}`}>
                      <m.icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3">{m.num}. {m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA after H2 */}
              <div className="mt-8 flex gap-3 flex-wrap">
                <Link to="/ressources/calculateur-bureau/" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[15px] bg-accent text-white transition-all hover:shadow-lg hover:shadow-accent/25 hover:brightness-110">
                  <Calculator size={16} /> Calculer ma quotiété →
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ── RESSOURCES ──────────────────────────────────────── */}
        <div data-anim="fade-up">
          <section className="py-8">
            <div className="max-w-[1200px] mx-auto px-6">
              <span className="inline-block text-xs tracking-widest uppercase text-accent font-bold mb-3">Outils & Modèles</span>
              <h2 className="font-display text-[clamp(26px,3.5vw,36px)] text-primary mb-8 leading-tight">Les ressources disponibles sur ce site</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Calculator, title: "Calculateur d'usage professionnel de votre habitation", desc: "Résultat en 2 minutes, rapport PDF par email", href: "/ressources/calculateur-bureau/", anchor: "Calculer ma quotiété" },
                  { icon: FileText, title: "Générateur de bail professionnel", desc: "Bail complet en 6 étapes, PDF adapté au contexte belge", href: "/ressources/generateur-bail/", anchor: "Générer mon bail" },
                  { icon: BookOpen, title: "Modèle de bail de sous-location", desc: "À télécharger gratuitement", href: "/ressources/generateur-bail/", anchor: "Télécharger le modèle" },
                  { icon: CheckCircle, title: "Checklist contrôle fiscal", desc: "Les 10 documents à avoir absolument", href: "/contact/", anchor: "Recevoir la checklist" },
                ].map(r => (
                  <Link key={r.title} to={r.href} className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:border-accent/30 group flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 grid place-items-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <r.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-primary mb-1 group-hover:text-accent transition-colors">{r.title}</h3>
                      <p className="text-sm text-muted-foreground">{r.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ── ARTICLES DU GUIDE ──────────────────────────────── */}
        <div data-anim="fade-up">
          <section className="py-8 bg-card border-y border-border">
            <div className="max-w-[1200px] mx-auto px-6">
              <span className="inline-block text-xs tracking-widest uppercase text-accent font-bold mb-3">Silo éditorial</span>
              <h2 className="font-display text-[clamp(26px,3.5vw,36px)] text-primary mb-8 leading-tight">Les articles de ce guide</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles.map((a, i) => (
                  <Link key={a.href} to={a.href} className="bg-background border border-border rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:border-accent/30 group">
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold grid place-items-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-bold text-primary mb-1 group-hover:text-accent transition-colors leading-snug">{a.label}</h3>
                        <span className="text-xs text-accent font-semibold flex items-center gap-1 mt-2">
                          {a.anchor} <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA after articles */}
              <div className="mt-8 flex gap-3 flex-wrap">
                <Link to="/ressources/calculateur-bureau/" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[15px] bg-accent text-white transition-all hover:shadow-lg hover:shadow-accent/25 hover:brightness-110">
                  <Calculator size={16} /> Calculer ma quotiété gratuitement →
                </Link>
                <Link to="/contact/" className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-[15px] bg-primary/10 text-primary hover:bg-primary/15 transition-all">
                  Parler directement à Mika →
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <div data-anim="fade-up">
          <section className="py-8">
            <div className="max-w-[900px] mx-auto px-6">
              <span className="inline-block text-xs tracking-widest uppercase text-accent font-bold mb-3">FAQ</span>
              <h2 className="font-display text-[clamp(26px,3.5vw,36px)] text-primary mb-8 leading-tight">FAQ : Bureau à domicile en Belgique</h2>

              <div className="grid gap-4">
                {faqData.map((f, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl px-6 py-5 hover:shadow-md transition-shadow duration-300 group">
                    <h3 className="font-bold text-primary mb-2.5 text-[15px] group-hover:text-accent transition-colors">{f.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ── CTA FINAL ─────────────────────────────────────── */}
        <div data-anim="fade-up">
          <section className="pb-16">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="relative bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-10 sm:p-12 flex flex-col sm:flex-row justify-between gap-8 items-center overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 blur-[80px]" />
                <div className="relative">
                  <h2 className="font-display text-[clamp(24px,3vw,32px)] text-white mb-3 font-bold">Calculer ma quotiété gratuitement</h2>
                  <p className="text-white/70 max-w-[600px] text-[15px] leading-relaxed">Résultat en 2 minutes. Rapport PDF documenté. Zéro engagement.</p>
                </div>
                <div className="relative flex gap-3 flex-wrap flex-shrink-0">
                  <Link to="/ressources/calculateur-bureau/" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-[15px] bg-accent text-white transition-all hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 active:scale-[0.97]">
                    <Calculator size={18} />
                    Calculer ma quotiété →
                  </Link>
                  <Link to="/contact/" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-[15px] bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all">
                    Parler à Mika →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
