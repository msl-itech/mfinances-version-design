import { useEffect, useRef, useState } from "react";
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
import { blogCategories, getArticleBySlug, getPublishedArticlesByCategory } from "@/data/blog-data";
import { articleContent } from "@/data/blog-articles-content";
import { getArticleGeoFaqs } from "@/data/article-geo-faqs";
import BfrCalculator from "@/components/BfrCalculator";
import RentabilityCockpit from "@/components/RentabilityCockpit";

import heroTresorerie from "@/assets/blog/hero-tresorerie.jpg";
import heroDaf from "@/assets/blog/hero-daf-externalise.jpg";
import heroControle from "@/assets/blog/hero-controle-gestion.jpg";
import heroFiscalite from "@/assets/blog/hero-fiscalite.jpg";
import heroCreation from "@/assets/blog/hero-creation-societe.jpg";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const categoryHeroImages: Record<string, string> = {
  "tresorerie": heroTresorerie,
  "daf-externalise": heroDaf,
  "controle-de-gestion": heroControle,
  "fiscalite-belgique": heroFiscalite,
  "creation-societe": heroCreation,
};



export default function BlogArticle() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const { categorySlug, articleSlug } = useParams<{ categorySlug: string; articleSlug: string }>();
  const article = categorySlug && articleSlug ? getArticleBySlug(categorySlug, articleSlug) : undefined;
  const category = blogCategories.find((c) => c.slug === categorySlug);
  const content = articleSlug ? articleContent[articleSlug] : undefined;

  const [showStickyMobile, setShowStickyMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  // Sticky mobile CTA — show after scrolling past hero
  useEffect(() => {
    if (!content?.showCockpit) return;
    const handleScroll = () => {
      const hero = document.querySelector("[data-hero-section]");
      if (hero) {
        setShowStickyMobile(window.scrollY > (hero as HTMLElement).offsetHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content?.showCockpit]);

  if (!article || !category || !content) {
    return (
      <div className="min-h-screen">
        <SEOHead title="Article introuvable — MFinances" description="Cet article n'existe pas." canonical="https://mfinances.be/blog/" noIndex />
        <Header />
        <div className="py-10 text-center">
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

  // Bloc GEO-citable (haut d'article) — pour LLMs (ChatGPT, Claude, Perplexity)
  const geoFaqs = getArticleGeoFaqs(articleSlug);

  // JSON-LD FAQPage : on fusionne les Q/R GEO + FAQ de fin d'article
  const allFaqs = [
    ...(geoFaqs ?? []),
    ...(content.faq ?? []),
  ];

  const faqLd = allFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map((f) => ({
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
        <section data-hero-section className="bg-primary py-6 md:py-8 bg-precision-grid-light">
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

              {/* Hero CTA above H1 */}
              {content.heroCta && (
                <Link to={content.heroCta.link} className="inline-flex items-center gap-1.5 text-accent font-bold text-[14px] mt-3 mb-4 hover:underline">
                  {content.heroCta.text} <ArrowRight size={14} />
                </Link>
              )}

              <h1 className="font-display text-[24px] md:text-[40px] leading-[1.15] text-primary-foreground mt-2">
                {article.title}
              </h1>

              {/* Hero CTAs for cockpit article */}
              {content.showCockpit && (
                <div className="flex flex-wrap gap-3 mt-6">
                  <Button variant="accent" className="rounded-full" asChild>
                    <a href="#cockpit">Calculer ma rentabilité <ArrowRight size={16} className="ml-1" /></a>
                  </Button>
                  <Button className="rounded-full border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <a href="#cockpit">Découvrir mon angle mort <ArrowRight size={16} className="ml-1" /></a>
                  </Button>
                </div>
              )}
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
        <section className="bg-card py-6 md:py-8">
          <div className="mx-auto max-w-[700px] px-6 lg:px-12">
            {/* ── BLOC GEO-CITABLE (haut d'article) ── */}
            {geoFaqs && (
              <div data-anim="fade-up" data-delay="0.04"  className="mb-10">
                <div className="bg-secondary/50 border border-border/60 rounded-2xl p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block w-1.5 h-5 bg-accent rounded-full" />
                    <h2 className="font-display text-[18px] md:text-[20px] text-foreground leading-tight">
                      Réponses directes
                    </h2>
                  </div>
                  <Accordion type="single" collapsible defaultValue="geo-0" className="w-full">
                    {geoFaqs.map((item, i) => (
                      <AccordionItem
                        key={i}
                        value={`geo-${i}`}
                        className="border-border/40 last:border-b-0"
                      >
                        <AccordionTrigger className="text-left text-[14px] md:text-[15px] font-body font-semibold text-foreground hover:no-underline py-3.5">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-[14px] text-foreground/80 font-body leading-[1.75] pb-4">
                          {item.answer}
                          {item.ctaInline && (
                            <Link to={item.ctaInline.link} className="inline-flex items-center gap-1.5 text-accent font-bold text-[14px] mt-3 hover:underline">
                              {item.ctaInline.text} <ArrowRight size={14} />
                            </Link>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            )}

            <article className="prose-mf">
              {content.sections.map((section, i) => (
                <div data-anim="fade-up" data-delay="0.06 + i * 0.04" key={i} >
                  {section.heading && (
                    <h2 className="font-display text-[22px] md:text-[26px] text-foreground mt-10 mb-4 leading-[1.2]">
                      {section.heading}
                    </h2>
                  )}
                  {section.subheading && (
                    <h3 className="font-display text-[18px] md:text-[21px] text-foreground mt-8 mb-3 leading-[1.25]">
                      {section.subheading}
                    </h3>
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
                  {section.relatedLinks && section.relatedLinks.length > 0 && (
                    <div className="flex flex-col gap-1.5 mb-4">
                      {section.relatedLinks.map((rl, rli) => (
                        <Link key={rli} to={rl.link} className="inline-flex items-center gap-1.5 text-accent font-semibold text-[14px] hover:underline">
                          {rl.text} <ArrowRight size={13} />
                        </Link>
                      ))}
                    </div>
                  )}
                  {section.ctaInline && (
                    <Link to={section.ctaInline.link} className="inline-flex items-center gap-1.5 text-accent font-bold text-[14px] mb-4 hover:underline">
                      {section.ctaInline.text} <ArrowRight size={14} />
                    </Link>
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
                </div>
              ))}
            </article>

            {/* Interactive tools */}
            {(content.showCalculator || content.showCockpit) && (
              <div data-anim="fade-up" data-delay="0.08"  className="mt-4">
                {content.showCalculator && <BfrCalculator />}
                {content.showCockpit && <RentabilityCockpit />}
              </div>
            )}
            {/* Pillar page link */}
            {article.pillarPage && (
              <div data-anim="fade-up" data-delay="0.1"  className="mt-10">
                <Link
                  to={article.pillarPage}
                  className="inline-flex items-center gap-2 text-accent font-semibold text-[15px] hover:underline font-body"
                >
                  {ctaLabel} <ArrowRight size={16} />
                </Link>
              </div>
            )}

            {/* FAQ */}
            {content.faq && content.faq.length > 0 && (
              <div data-anim="fade-up" data-delay="0.12"  className="mt-14">
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
              </div>
            )}

            {/* CTA in-article */}
            <div data-anim="fade-up" data-delay="0.14"  className="mt-12">
              <div className="bg-primary rounded-2xl p-8 text-center">
                <h3 className="font-display text-[20px] text-primary-foreground mb-3">
                  {content.ctaText || "Besoin d'un accompagnement ?"}
                </h3>
                <p className="text-primary-foreground/70 text-[14px] font-body mb-6">
                  {content.ctaDescription || "Premier échange gratuit : nous analysons votre situation."}
                </p>
                <Button variant="accent" className="rounded-full" asChild>
                  <Link to={ctaLink}>
                    {ctaLabel}
                    {!ctaLabel.endsWith("→") && <ArrowRight size={16} className="ml-1" />}
                  </Link>
                </Button>
              </div>
            </div>

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
          <section className="bg-secondary py-6 md:py-8">
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

      {/* Sticky mobile CTA — cockpit articles only */}
      {content.showCockpit && showStickyMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-[80] bg-card border-t border-border p-2.5 px-4 sm:!hidden">
          <Button variant="accent" className="rounded-full w-full" asChild>
            <Link to="/contact/">
              Prendre RDV gratuit <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      )}

      {/* Body padding for sticky mobile */}
      {content.showCockpit && <div className="h-[70px] sm:hidden" />}
    </div>
  );
}
