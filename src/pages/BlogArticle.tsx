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
import { ArrowRight, ArrowLeft, Clock, Calendar, User, Linkedin, Mail, ChevronUp, List } from "lucide-react";
import { blogCategories, getArticleBySlug, getPublishedArticlesByCategory } from "@/data/blog-data";
import { articleContent } from "@/data/blog-articles-content";
import { getArticleGeoFaqs } from "@/data/article-geo-faqs";
import BfrCalculator from "@/components/BfrCalculator";
import RentabilityCockpit from "@/components/RentabilityCockpit";

import heroTresorerie from "@/assets/blog/hero-tresorerie.webp";
import heroDaf from "@/assets/blog/hero-daf-externalise.webp";
import heroControle from "@/assets/blog/hero-controle-gestion.webp";
import heroFiscalite from "@/assets/blog/hero-fiscalite.webp";
import heroCreation from "@/assets/blog/hero-creation-societe.webp";
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

function slugify(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatDateFr(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });
}



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
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  // Combined scroll handler: progress bar, scroll-to-top, sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (el) {
        const { top, height } = el.getBoundingClientRect();
        const progress = Math.min(100, Math.max(0, (-top) / (height - window.innerHeight) * 100));
        setReadProgress(progress);
      }
      setShowScrollTop(window.scrollY > 500);
      if (content?.showCockpit) {
        const hero = document.querySelector("[data-hero-section]");
        if (hero) setShowStickyMobile(window.scrollY > (hero as HTMLElement).offsetHeight);
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

  const ctaLink = content.ctaLink || "/contact/#form";
  const ctaLabel = content.ctaLabel || "Parler à un expert";

  const schemas = [articleLd, breadcrumbLd, ...(faqLd ? [faqLd] : [])];

  // Reading time
  const wordCount = content.sections.reduce((acc, s) => {
    let c = 0;
    if (s.heading) c += s.heading.split(/\s+/).length;
    if (s.subheading) c += s.subheading.split(/\s+/).length;
    s.paragraphs.forEach(p => c += p.split(/\s+/).length);
    if (s.list) s.list.forEach(item => c += item.split(/\s+/).length);
    return acc + c;
  }, 0) + (content.faq?.reduce((a, f) => a + f.question.split(/\s+/).length + f.answer.split(/\s+/).length, 0) || 0);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // TOC items
  const tocItems = content.sections.flatMap(s => {
    const items: { text: string; id: string; level: number }[] = [];
    if (s.heading) items.push({ text: s.heading, id: slugify(s.heading), level: 2 });
    if (s.subheading) items.push({ text: s.subheading, id: slugify(s.subheading), level: 3 });
    return items;
  });

  const shareUrl = `https://mfinances.be/blog/${categorySlug}/${articleSlug}/`;
  const shareTitle = article.seoTitle || article.title;

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

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none">
        <div className="h-full bg-accent transition-[width] duration-150 ease-out" style={{ width: `${readProgress}%` }} />
      </div>

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

              {article.hook && (
                <p className="text-primary-foreground/80 text-[15px] md:text-[17px] font-semibold mt-2">{article.hook}</p>
              )}

              <h1 className="font-display text-[24px] md:text-[40px] leading-[1.15] text-primary-foreground mt-2">
                {article.title}
              </h1>

              {/* Article meta */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[13px] text-primary-foreground/60">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={13} /> {formatDateFr(article.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <User size={13} /> Mika Musungayi
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> {readingTime} min de lecture
                </span>
              </div>

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
        <section ref={articleRef} className="bg-card py-6 md:py-8">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <div className="lg:flex lg:gap-10">

              {/* ── TOC SIDEBAR (desktop) ── */}
              {tocItems.length > 2 && (
                <aside className="hidden lg:block w-[220px] flex-shrink-0">
                  <div className="sticky top-[88px] max-h-[calc(100vh-100px)] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <List size={16} className="text-accent" />
                      <span className="font-display text-[15px] text-foreground">Sommaire</span>
                    </div>
                    <nav>
                      <ul className="space-y-1.5 border-l-2 border-border/50 pl-3">
                        {tocItems.map((item, i) => (
                          <li key={i} className={item.level === 3 ? "ml-3" : ""}>
                            <a
                              href={`#${item.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                              className="block text-[13px] text-foreground/60 hover:text-accent transition-colors font-body leading-relaxed py-0.5"
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    {/* Partager */}
                    <div className="mt-6 pt-4 border-t border-border/40">
                      <span className="text-[12px] text-muted-foreground font-body block mb-2">Partager</span>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                          aria-label="Partager sur LinkedIn"
                        >
                          <Linkedin size={14} />
                        </a>
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                          aria-label="Partager sur WhatsApp"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                        <a
                          href={`https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                          aria-label="Partager sur X"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a
                          href={`https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                          aria-label="Partager sur TikTok"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
                        </a>
                        <a
                          href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareTitle}\n\n${shareUrl}`)}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                          aria-label="Partager par email"
                        >
                          <Mail size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </aside>
              )}

              {/* ── ARTICLE CONTENT ── */}
              <div className="max-w-[700px] flex-1 min-w-0">

                {/* ── TOC COLLAPSIBLE (mobile) ── */}
                {tocItems.length > 2 && (
                  <div data-anim="fade-up" className="lg:hidden mb-8">
                    <button
                      onClick={() => setTocOpen(!tocOpen)}
                      className="flex items-center gap-2 w-full text-left py-3 px-4 bg-secondary/50 border border-border/60 rounded-xl hover:bg-secondary/70 transition-colors"
                    >
                      <List size={16} className="text-accent flex-shrink-0" />
                      <span className="font-display text-[15px] text-foreground flex-1">Sommaire</span>
                      <ChevronUp size={16} className={`text-muted-foreground transition-transform duration-200 ${tocOpen ? "" : "rotate-180"}`} />
                    </button>
                    {tocOpen && (
                      <nav className="mt-2 py-3 px-4 bg-secondary/30 border border-border/40 rounded-xl">
                        <ul className="space-y-1.5">
                          {tocItems.map((item, i) => (
                            <li key={i} className={item.level === 3 ? "ml-4" : ""}>
                              <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                className="block text-[13px] text-foreground/70 hover:text-accent transition-colors font-body leading-relaxed py-0.5"
                              >
                                {item.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
                          <span className="text-[12px] text-muted-foreground font-body">Partager :</span>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                            aria-label="Partager sur LinkedIn"
                          >
                            <Linkedin size={14} />
                          </a>
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                            aria-label="Partager sur WhatsApp"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          </a>
                          <a
                            href={`https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                            aria-label="Partager sur X"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          </a>
                          <a
                            href={`https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                            aria-label="Partager sur TikTok"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
                          </a>
                          <a
                            href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareTitle}\n\n${shareUrl}`)}`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                            aria-label="Partager par email"
                          >
                            <Mail size={14} />
                          </a>
                        </div>
                      </nav>
                    )}
                  </div>
                )}

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
                    <h2 id={slugify(section.heading)} className="font-display text-[22px] md:text-[26px] text-foreground mt-10 mb-4 leading-[1.2] scroll-mt-6">
                      {section.heading}
                    </h2>
                  )}
                  {section.subheading && (
                    <h3 id={slugify(section.subheading)} className="font-display text-[18px] md:text-[21px] text-foreground mt-8 mb-3 leading-[1.25] scroll-mt-6">
                      {section.subheading}
                    </h3>
                  )}
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi} className="text-[15px] text-foreground/80 leading-[1.8] font-body mb-4">
                      {renderInlineLinks(p)}
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

              </div>{/* end article content */}
            </div>{/* end flex wrapper */}
          </div>
        </section>

        {/* ── TOUS LES ARTICLES + ARTICLES LIÉS ── */}
        <section className="bg-secondary py-6 md:py-8">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Colonne gauche — Tous les articles */}
              <div className="md:w-1/3">
                <Link to={category.href} className="inline-flex items-center gap-1.5 text-[15px] font-display text-foreground hover:text-accent transition-colors">
                  <ArrowLeft size={16} /> Tous les articles {category.label}
                </Link>
              </div>

              {/* Colonne droite — À lire aussi */}
              {relatedArticles.length > 0 && (
                <div className="md:w-2/3">
                  <h3 className="font-display text-[22px] text-foreground mb-6">À lire aussi</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-[70] w-10 h-10 rounded-full bg-accent text-primary-foreground shadow-lg hover:bg-accent/90 transition-all flex items-center justify-center"
          aria-label="Retour en haut"
        >
          <ChevronUp size={20} />
        </button>
      )}

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


// Rendu des liens en ligne dans les paragraphes d'article : syntaxe [texte](/url)
// Liens internes -> <Link> ; liens externes (http) -> <a>. Rétrocompatible.
function renderInlineLinks(text: string) {
  const parts: any[] = [];
  const re = /\[([^\]]+)\]\((\/[^)]+|https?:\/\/[^)]+)\)/g;
  let last = 0; let m: RegExpExecArray | null; let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const label = m[1]; const url = m[2];
    if (url.startsWith("/")) {
      parts.push(<Link key={k++} to={url} className="text-accent font-semibold hover:underline">{label}</Link>);
    } else {
      parts.push(<a key={k++} href={url} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">{label}</a>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}
