import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { blogCategories, getArticleBySlug, getPublishedArticlesByCategory } from "@/data/blog-data";
import { articleContent } from "@/data/blog-articles-content";
import BfrCalculator from "@/components/BfrCalculator";
import RentabilityCockpit from "@/components/RentabilityCockpit";

import heroTresorerie from "@/assets/blog/hero-tresorerie.jpg";
import heroDaf from "@/assets/blog/hero-daf-externalise.jpg";
import heroControle from "@/assets/blog/hero-controle-gestion.jpg";
import heroFiscalite from "@/assets/blog/hero-fiscalite.jpg";
import heroCreation from "@/assets/blog/hero-creation-societe.jpg";

const categoryHeroImages: Record<string, string> = {
  "tresorerie": heroTresorerie,
  "daf-externalise": heroDaf,
  "controle-de-gestion": heroControle,
  "fiscalite-belgique": heroFiscalite,
  "creation-societe": heroCreation,
};

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function BlogArticle() {
  const { categorySlug, articleSlug } = useParams<{ categorySlug: string; articleSlug: string }>();
  const article = categorySlug && articleSlug ? getArticleBySlug(categorySlug, articleSlug) : undefined;
  const category = blogCategories.find((c) => c.slug === categorySlug);
  const content = articleSlug ? articleContent[articleSlug] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  if (!article || !category || !content) {
    return (
      <div className="min-h-screen">
        <SEOHead title="Article introuvable — MFinances" description="Cet article n'existe pas." canonical="https://mfinances.be/blog/" noIndex />
        <Header />
        <div className="py-20 text-center">
          <h1 className="font-display text-[32px]">Article introuvable</h1>
          <Link to="/blog/" className="text-accent mt-4 inline-block">Retour au blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedArticles = getPublishedArticlesByCategory(categorySlug!).filter((a) => a.slug !== articleSlug).slice(0, 3);

  // JSON-LD Article
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.seoTitle || article.title,
    "description": article.metaDescription || article.excerpt,
    "url": `https://mfinances.be/blog/${categorySlug}/${articleSlug}/`,
    "datePublished": article.date,
    "author": { "@type": "Person", "name": "Mika Musungayi", "jobTitle": "Expert-comptable ITAA" },
    "publisher": { "@type": "Organization", "name": "MFinances", "url": "https://mfinances.be" },
  };

  // JSON-LD BreadcrumbList
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://mfinances.be/blog/" },
      { "@type": "ListItem", position: 3, name: category.label, item: `https://mfinances.be${category.href}` },
      { "@type": "ListItem", position: 4, name: article.title },
    ],
  };

  // JSON-LD FAQPage
  const faqLd = content.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const ctaLink = content.ctaLink || "/contact/";
  const ctaLabel = content.ctaLabel || "Parler à un expert";

  const schemas = [articleLd, breadcrumbLd, ...(faqLd ? [faqLd] : [])];

  return (
    <div className="min-h-screen">
      <SEOHead
        title={article.seoTitle || `${article.title} — MFinances Bruxelles`}
        description={article.metaDescription || article.excerpt}
        canonical={`https://mfinances.be/blog/${categorySlug}/${articleSlug}/`}
        ogImage={categoryHeroImages[categorySlug!]}
        schemaJson={schemas}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-12 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/blog/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Blog</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to={category.href} className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">{category.label}</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground text-[13px] truncate max-w-[200px]">{article.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-6">
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent">{article.category}</span>
              <h1 className="font-display text-[24px] md:text-[40px] leading-[1.15] text-primary-foreground mt-2">
                {article.title}
              </h1>
            </div>
          </div>
        </section>

        {/* ── HERO IMAGE ── */}
        {categorySlug && categoryHeroImages[categorySlug] && (
          <div className="w-full max-h-[360px] overflow-hidden">
            <img
              src={categoryHeroImages[categorySlug]}
              alt={`${category.label} — MFinances`}
              className="w-full h-[360px] object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* ── ARTICLE BODY ── */}
        <section className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-[700px] px-6 lg:px-12">
            <article className="prose-mf">
              {content.sections.map((section, i) => (
                <ScrollRevealDiv key={i} delay={0.06 + i * 0.04}>
                  {section.heading && (
                    <h2 className="font-display text-[22px] md:text-[26px] text-foreground mt-10 mb-4 leading-[1.2]">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi} className="text-[15px] text-foreground/80 leading-[1.8] font-body mb-4">
                      {p}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-2 mb-4">
                      {section.list.map((item, li) => (
                        <li key={li} className="flex items-start gap-2.5 text-[14px] text-foreground/80 font-body leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.table && (
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full text-[13px] font-body border-collapse">
                        <thead>
                          <tr>
                            {section.table.headers.map((h, hi) => (
                              <th key={hi} className="text-left py-3 px-4 bg-secondary text-foreground font-semibold border-b border-border/50 first:rounded-tl-lg last:rounded-tr-lg">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, ri) => (
                            <tr key={ri} className="border-b border-border/30 last:border-0">
                              {row.map((cell, ci) => (
                                <td key={ci} className={`py-3 px-4 text-foreground/80 ${ci === 0 ? "font-semibold text-foreground" : ""}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </ScrollRevealDiv>
              ))}
            </article>

            {/* BFR Calculator */}
            {content.showCalculator && (
              <ScrollRevealDiv delay={0.08} className="mt-4">
                {content.showCalculator && <BfrCalculator />}
                {content.showCockpit && <RentabilityCockpit />}
              </ScrollRevealDiv>

            {/* Pillar page link */}
            {article.pillarPage && (
              <ScrollRevealDiv delay={0.1} className="mt-10">
                <Link
                  to={article.pillarPage}
                  className="inline-flex items-center gap-2 text-accent font-semibold text-[15px] hover:underline font-body"
                >
                  {ctaLabel} <ArrowRight size={16} />
                </Link>
              </ScrollRevealDiv>
            )}

            {/* FAQ */}
            {content.faq && content.faq.length > 0 && (
              <ScrollRevealDiv delay={0.12} className="mt-14">
                <h2 className="font-display text-[22px] md:text-[26px] text-foreground mb-6 leading-[1.2]">
                  Questions fréquentes
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {content.faq.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
                      <AccordionTrigger className="text-left text-[15px] font-body font-semibold text-foreground hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[14px] text-foreground/80 font-body leading-[1.8]">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollRevealDiv>
            )}

            {/* CTA in-article */}
            <ScrollRevealDiv delay={0.14} className="mt-12">
              <div className="bg-primary rounded-2xl p-8 text-center">
                <h3 className="font-display text-[20px] text-primary-foreground mb-3">
                  {content.ctaText || "Besoin d'un accompagnement ?"}
                </h3>
                <p className="text-primary-foreground/70 text-[14px] font-body mb-6">
                  {content.ctaDescription || "Premier échange gratuit — nous analysons votre situation."}
                </p>
                <Button variant="accent" className="rounded-full" asChild>
                  <Link to="/contact/">Parler à un expert <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
              </div>
            </ScrollRevealDiv>

            {/* Back link */}
            <div className="mt-8">
              <Link to={category.href} className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft size={14} /> Tous les articles {category.label}
              </Link>
            </div>
          </div>
        </section>

        {/* ── ARTICLES LIÉS ── */}
        {relatedArticles.length > 0 && (
          <section className="bg-secondary py-12 md:py-16">
            <div className="mx-auto max-w-[900px] px-6 lg:px-12">
              <h3 className="font-display text-[22px] text-foreground mb-6">À lire aussi</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/blog/${a.categorySlug}/${a.slug}/`}
                    className="group block bg-card rounded-2xl p-6 border border-border/50 hover:border-accent/30 transition-all"
                  >
                    <h4 className="text-[15px] font-bold font-body text-foreground group-hover:text-accent transition-colors leading-snug">
                      {a.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-accent text-[12px] font-semibold mt-3">
                      Lire <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
