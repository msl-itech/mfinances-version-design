import { useEffect } from "react";
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
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { blogCategories, blogArticles } from "@/data/blog-data";
import heroTresorerie from "@/assets/blog/hero-tresorerie.jpg";
import heroDaf from "@/assets/blog/hero-daf-externalise.jpg";
import heroControle from "@/assets/blog/hero-controle-gestion.jpg";
import heroFiscalite from "@/assets/blog/hero-fiscalite.jpg";
import heroCreation from "@/assets/blog/hero-creation-societe.jpg";

const categoryImages: Record<string, string> = {
  "tresorerie": heroTresorerie,
  "daf-externalise": heroDaf,
  "controle-de-gestion": heroControle,
  "fiscalite-belgique": heroFiscalite,
  "creation-societe": heroCreation,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://mfinances.be/blog/" },
  ],
};

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog — Pilotage financier TPE | MFinances Bruxelles";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Articles concrets sur la trésorerie, la fiscalité belge, le contrôle de gestion et la création d'entreprise. Pour les dirigeants de TPE qui veulent piloter mieux.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/blog/";

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(breadcrumbJsonLd);
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, []);

  const latestPublished = blogArticles.filter((a) => a.published).slice(0, 6);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center">
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
                Le pilotage financier, <span className="text-accent">sans jargon comptable</span>
              </h1>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
                Des articles concrets pour les dirigeants de TPE qui veulent prendre de meilleures décisions financières.
              </p>
            </div>
          </div>
        </section>

        {/* ── CATÉGORIES ── */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv className="text-center mb-12">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                Explorez par <span className="text-accent">catégorie</span>
              </h2>
            </ScrollRevealDiv>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {blogCategories.map((cat, i) => {
                const articleCount = blogArticles.filter((a) => a.categorySlug === cat.slug && a.published).length;
                const upcomingCount = blogArticles.filter((a) => a.categorySlug === cat.slug && !a.published).length;
                return (
                  <ScrollRevealDiv key={cat.slug} delay={0.08 + i * 0.05}>
                    <Link
                      to={cat.href}
                      className="group block bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)] transition-all duration-300 h-full"
                    >
                      {categoryImages[cat.slug] && (
                        <div className="h-[140px] overflow-hidden">
                          <img
                            src={categoryImages[cat.slug]}
                            alt={`${cat.label} — MFinances blog`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-7">
                        <h3 className="text-[17px] font-bold font-body text-foreground mb-2 group-hover:text-accent transition-colors">
                          {cat.label}
                        </h3>
                        <p className="text-[14px] text-muted-foreground leading-[1.7] font-body mb-4">{cat.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-foreground/40 font-body">
                            {articleCount > 0 ? `${articleCount} article${articleCount > 1 ? "s" : ""}` : ""}
                            {articleCount > 0 && upcomingCount > 0 ? " · " : ""}
                            {upcomingCount > 0 ? `${upcomingCount} à venir` : ""}
                          </span>
                          <ArrowRight size={14} className="text-foreground/20 group-hover:text-accent transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </ScrollRevealDiv>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DERNIERS ARTICLES ── */}
        {latestPublished.length > 0 && (
          <section className="bg-card py-16 md:py-20">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <ScrollRevealDiv className="text-center mb-12">
                <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                  Derniers <span className="text-accent">articles</span>
                </h2>
              </ScrollRevealDiv>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPublished.map((article, i) => (
                  <ScrollRevealDiv key={article.slug} delay={0.08 + i * 0.05}>
                    <Link
                      to={`/blog/${article.categorySlug}/${article.slug}/`}
                      className="group block bg-secondary/60 rounded-2xl p-7 border border-border/50 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)] transition-all duration-300 h-full"
                    >
                      <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent">{article.category}</span>
                      <h3 className="text-[16px] font-bold font-body text-foreground mt-2 mb-2 group-hover:text-accent transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-[13px] text-muted-foreground leading-[1.7] font-body">{article.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-accent text-[13px] font-semibold mt-4 group-hover:gap-2 transition-all">
                        Lire <ArrowRight size={14} />
                      </span>
                    </Link>
                  </ScrollRevealDiv>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center">
            <ScrollRevealDiv>
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Envie de passer à l'action ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body">
                Premier échange gratuit et confidentiel — nous analysons votre situation financière.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full" asChild>
                  <Link to="/diagnostic/">Faire le diagnostic gratuit <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                  <Link to="/contact/">Parler à un expert <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
