import { useEffect, useMemo, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { blogArticles } from "@/data/blog-data";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import heroTresorerie from "@/assets/blog/hero-tresorerie.jpg";
import heroDaf from "@/assets/blog/hero-daf-externalise.jpg";
import heroControle from "@/assets/blog/hero-controle-gestion.jpg";
import heroFiscalite from "@/assets/blog/hero-fiscalite.jpg";
import heroCreation from "@/assets/blog/hero-creation-societe.jpg";


const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://mfinances.be/blog/" },
  ],
};

type ProblemCard = {
  emoji: string;
  title: string;
  quote: string;
  badge: string;
  categorySlugs: string[];
  href: string;
  image: string;
};

const problemCards: ProblemCard[] = [
  {
    emoji: "💸",
    title: "Je manque toujours de trésorerie",
    quote: "Mon entreprise est rentable mais je n'ai jamais d'argent.",
    badge: "Trésorerie",
    categorySlugs: ["tresorerie"],
    href: "/blog/tresorerie/",
    image: heroTresorerie,
  },
  {
    emoji: "😩",
    title: "J'ai l'impression de payer trop d'impôts",
    quote: "Comment réduire légalement ma fiscalité ?",
    badge: "Fiscalité",
    categorySlugs: ["fiscalite-belgique"],
    href: "/blog/fiscalite-belgique/",
    image: heroFiscalite,
  },
  {
    emoji: "📊",
    title: "Je ne comprends pas mes chiffres",
    quote: "Mon comptable m'envoie des documents que je ne comprends pas.",
    badge: "Contrôle de gestion",
    categorySlugs: ["controle-de-gestion"],
    href: "/blog/controle-de-gestion/",
    image: heroControle,
  },
  {
    emoji: "🧭",
    title: "J'ai besoin d'être accompagné",
    quote: "J'ai un comptable, mais personne ne pilote mes finances.",
    badge: "DAF externalisé",
    categorySlugs: ["daf-externalise"],
    href: "/blog/daf-externalise/",
    image: heroDaf,
  },
  {
    emoji: "🚀",
    title: "Je veux développer mon entreprise",
    quote: "Puis-je recruter ? Investir ? Emprunter ?",
    badge: "Création d'entreprise",
    categorySlugs: ["creation-societe"],
    href: "/blog/creation-societe/",
    image: heroCreation,
  },
];


export default function Blog() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string[] | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ARTICLES_PER_PAGE = 6;

  const latestPublished = blogArticles.filter((a) => a.published);

  const filteredArticles = useMemo(() => {
    let list = latestPublished;
    if (activeCategory) {
      list = list.filter((a) => activeCategory.includes(a.categorySlug));
    }
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [searchQuery, latestPublished, activeCategory]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const handleProblemClick = (card: ProblemCard) => {
    setActiveCategory(card.categorySlugs);
    setTimeout(() => {
      articlesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="min-h-screen" ref={root}>
      <SEOHead
        title="Blog — Pilotage financier TPE | MFinances Bruxelles"
        description="Articles sur la trésorerie, fiscalité belge, contrôle de gestion et création d'entreprise. Pour dirigeants de TPE qui veulent piloter mieux."
        canonical="https://mfinances.be/blog/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-8 md:py-10 bg-precision-grid-light">
          <div className="mx-auto max-w-[820px] px-6 lg:px-12 text-center">
            <Breadcrumb>
              <BreadcrumbList className="justify-center">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground text-[13px]">Blog</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-8">
              <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                Quel est votre <span className="text-accent">défi</span> aujourd'hui ?
              </h1>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[620px] mx-auto">
                Nous avons rédigé des guides simples pour répondre aux questions que se posent les dirigeants de PME.
              </p>
            </div>
          </div>
        </section>

        {/* ── CARTES PROBLÈMES ── */}
        <section className="bg-secondary py-8 md:py-10">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {problemCards.map((card, i) => {
                const isActive =
                  activeCategory && card.categorySlugs.every((s) => activeCategory.includes(s));
                return (
                  <button
                    key={card.title}
                    type="button"
                    onClick={() => handleProblemClick(card)}
                    data-anim="fade-up"
                    data-delay={`${0.05 + i * 0.05}`}
                    className={`group text-left bg-card rounded-2xl p-7 border transition-all duration-300 h-full flex flex-col ${
                      isActive
                        ? "border-accent shadow-[0_8px_30px_rgba(232,57,58,0.15)]"
                        : "border-border/50 hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)]"
                    }`}
                    aria-label={`Voir les articles : ${card.badge}`}
                  >
                    <h2 className="text-[18px] md:text-[19px] font-bold font-body text-foreground leading-snug">
                      <span className="mr-2" aria-hidden="true">{card.emoji}</span>
                      {card.title}
                    </h2>
                    <p className="italic text-[14px] text-muted-foreground leading-[1.7] font-body mt-3">
                      « {card.quote} »
                    </p>
                    <span className="inline-flex items-center gap-1 text-accent text-[13px] font-semibold mt-5 group-hover:gap-2 transition-all">
                      Trouver la solution <ArrowRight size={14} />
                    </span>
                    <div className="mt-5 pt-4 border-t border-border/40">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.08em] uppercase text-foreground/50">
                        <span aria-hidden="true">🏷️</span> {card.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {activeCategory && (
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className="text-[13px] font-body text-accent hover:underline"
                >
                  ← Voir tous les articles
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── ARTICLES ── */}
        {latestPublished.length > 0 && (
          <section className="bg-card py-8 md:py-10" ref={articlesRef}>
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <div data-anim="fade-up" className="text-center mb-10">
                <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                  {activeCategory ? "Articles" : "Derniers"} <span className="text-accent">{activeCategory ? "sélectionnés" : "articles"}</span>
                </h2>
              </div>

              {/* Search */}
              <div className="relative max-w-[480px] mx-auto mb-10">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un article…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 rounded-full border-border/60 bg-secondary/60 font-body text-[15px]"
                />
              </div>

              {paginatedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedArticles.map((article, i) => (
                    <div data-anim="fade-up" data-delay={`${0.05 + i * 0.04}`} key={article.slug}>
                      <Link
                        to={`/blog/${article.categorySlug}/${article.slug}/`}
                        className="group block bg-secondary/60 rounded-2xl p-7 border border-border/50 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)] transition-all duration-300 h-full"
                      >
                        <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent">{article.category}</span>

                        {article.hook && (
                          <p className="text-[17px] md:text-[18px] font-bold text-foreground mt-3 leading-snug group-hover:text-accent transition-colors">
                            {article.hook}
                          </p>
                        )}

                        <p className={`text-[14px] text-muted-foreground leading-[1.7] font-body ${article.hook ? "mt-3" : "mt-3"}`}>
                          {article.excerpt}
                        </p>

                        <p className="text-[12px] italic text-foreground/45 font-body mt-4 leading-snug">
                          {article.title}
                        </p>

                        <span className="inline-flex items-center gap-1 text-accent text-[13px] font-semibold mt-4 group-hover:gap-2 transition-all">
                          Lire <ArrowRight size={14} />
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground font-body py-12">
                  Aucun article trouvé{searchQuery ? ` pour « ${searchQuery} »` : ""}.
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination des articles">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded-full font-body"
                  >
                    ← Précédent
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "accent" : "ghost"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                      className="rounded-full w-9 h-9 text-[14px] font-body"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-full font-body"
                  >
                    Suivant →
                  </Button>
                </nav>
              )}
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="bg-primary py-8 md:py-10">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center">
            <div data-anim="fade-up">
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Envie de passer à l'action ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body">
                Premier échange gratuit et confidentiel : nous analysons votre situation financière.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full" asChild>
                  <Link to="/diagnostic/">Faire le diagnostic gratuit <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                  <Link to="/contact/">Parler à un expert <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
