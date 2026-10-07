import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Quote,
  Check,
  Linkedin,
  Mail,
  ChevronUp,
  List,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  User,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { newsroomArticles } from "@/data/newsroom-data";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/seo-schemas";
import NotFound from "./NotFound";
import { toast } from "sonner";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import avatarMika from "@/assets/avatar-mika-96.webp";

function slugify(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NewsroomArticlePage() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const { slug } = useParams();
  const article = newsroomArticles.find((x) => x.slug === slug);

  const [copiedLink, setCopiedLink] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (el) {
        const { top, height } = el.getBoundingClientRect();
        const progress = Math.min(100, Math.max(0, (-top) / (height - window.innerHeight) * 100));
        setReadProgress(progress);
      }
      setShowScrollTop(window.scrollY > 500);

      // Active section tracking
      if (article?.sections) {
        const sectionEls = article.sections
          .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
          .filter((x): x is { id: string; el: HTMLElement } => x.el !== null);
        for (const { id, el } of sectionEls) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSectionId(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) return <NotFound />;

  const url = `https://mfinances.be/newsroom/${article.slug}/`;

  const relatedArticles = newsroomArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    toast.success("Lien copié dans le presse-papier !");
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleShareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const handleShareEmail = () => {
    const subject = `À lire : ${article.h1}`;
    const body = `Bonjour,\n\nJe vous partage cette publication de MFINANCES :\n\n${article.h1}\n\n${article.lead}\n\nLire l'article complet : ${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const tocItems = article.sections.map((s, i) => ({ text: s.h2, id: s.id, index: i }));

  const shareTitle = article.h1;

  return (
    <div className="min-h-screen" ref={root}>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none">
        <div className="h-full bg-accent transition-[width] duration-150 ease-out" style={{ width: `${readProgress}%` }} />
      </div>

      <SEOHead
        title={article.title}
        description={article.description}
        canonical={url}
        noIndex={!article.validated}
        schemaJson={[
          createBreadcrumbSchema([
            { name: "Accueil", url: "https://mfinances.be/" },
            { name: "Newsroom", url: "https://mfinances.be/newsroom/" },
            { name: article.category, url: "https://mfinances.be/newsroom/" },
            { name: article.h1, url },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.h1,
            description: article.description,
            inLanguage: "fr-BE",
            articleSection: article.category,
            keywords: article.tags.join(", "),
            mainEntityOfPage: url,
            datePublished: article.eventDate,
            image: article.coverImage,
            author: { "@type": "Person", name: article.author.name, jobTitle: article.author.role },
            publisher: {
              "@type": "AccountingService",
              "@id": "https://mfinances.be/#organization",
              name: "MFINANCES S.R.L.",
              logo: "https://mfinances.be/logo-square.webp",
            },
          },
          createFaqSchema(article.faqs),
        ]}
      />

      <Header />

      <main>
        {/* ── HERO ── */}
        <section data-hero-section className="bg-primary py-6 md:py-8 bg-precision-grid-light">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/newsroom/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Newsroom</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground text-[13px] truncate max-w-[200px]">{article.category}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent">{article.category}</span>
                {article.location && (
                  <>
                    <span className="text-primary-foreground/40">·</span>
                    <span className="text-[11px] text-primary-foreground/60 flex items-center gap-1">
                      <MapPin size={11} /> {article.location}
                    </span>
                  </>
                )}
              </div>

              <p className="text-primary-foreground/75 text-[14px] md:text-[16px] font-semibold mb-2">
                {article.kicker}
              </p>

              <h1 className="font-display text-[24px] md:text-[40px] leading-[1.15] text-primary-foreground">
                {article.h1}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[13px] text-primary-foreground/60">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={13} /> {article.displayDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <User size={13} /> {article.author.name}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> {article.readingTime} de lecture
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── COVER IMAGE full-bleed ── */}
        <div className="w-full max-h-[360px] overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.coverImageAlt}
            className="w-full h-[360px] object-cover"
            style={{ objectPosition: "center 50%" }}
            loading="eager"
          />
        </div>

        {/* ── ARTICLE BODY ── */}
        <section ref={articleRef} className="bg-card py-6 md:py-8">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <div className="lg:flex lg:gap-10">

              {/* ── TOC SIDEBAR (desktop) ── */}
              {tocItems.length > 0 && (
                <aside className="hidden lg:block w-[220px] flex-shrink-0">
                  <div className="sticky top-[88px] max-h-[calc(100vh-100px)] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <List size={16} className="text-accent" />
                      <span className="font-display text-[15px] text-foreground">Sommaire</span>
                    </div>
                    <nav>
                      <ul className="space-y-1.5 border-l-2 border-border/50 pl-3">
                        {tocItems.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                              className={`block text-[13px] transition-colors font-body leading-relaxed py-0.5 ${
                                activeSectionId === item.id
                                  ? "text-accent font-semibold"
                                  : "text-foreground/60 hover:text-accent"
                              }`}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    {/* Share */}
                    <div className="mt-6 pt-4 border-t border-border/40">
                      <span className="text-[12px] text-muted-foreground font-body block mb-2">Partager</span>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={handleShareLinkedIn}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                          aria-label="Partager sur LinkedIn"
                        >
                          <Linkedin size={14} />
                        </button>
                        <button
                          onClick={handleShareEmail}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                          aria-label="Envoyer par email"
                        >
                          <Mail size={14} />
                        </button>
                        <button
                          onClick={handleCopyLink}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors"
                          aria-label="Copier le lien"
                          title={copiedLink ? "Lien copié !" : "Copier le lien"}
                        >
                          {copiedLink ? <Check size={14} className="text-emerald-600" /> : (
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Press contact */}
                    <div className="mt-6 pt-4 border-t border-border/40 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-accent">Presse & Médias</span>
                      <p className="text-[12px] text-foreground/70 leading-relaxed font-body">
                        Mika Musungayi répond aux journalistes et organisateurs d'événements économiques.
                      </p>
                      <Button asChild size="sm" className="w-full rounded-full bg-primary hover:bg-primary-dark text-white text-[12px]">
                        <a href="mailto:info@mfinances.be">
                          <Mail size={12} className="mr-1.5" /> Contacter la presse
                        </a>
                      </Button>
                    </div>

                    {/* CTA sidebar */}
                    <div className="mt-4 p-4 bg-primary rounded-xl space-y-2">
                      <p className="text-[12px] font-bold text-white leading-snug">Faire auditer vos processus financiers</p>
                      <Button asChild size="sm" className="w-full rounded-full bg-accent hover:bg-accent/90 text-white text-[12px] font-semibold">
                        <Link to="/contact/">
                          Prendre rendez-vous <ArrowRight size={12} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </aside>
              )}

              {/* ── ARTICLE CONTENT ── */}
              <div className="max-w-[700px] flex-1 min-w-0">

                {/* Mobile TOC */}
                {tocItems.length > 0 && (
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
                          {tocItems.map((item) => (
                            <li key={item.id}>
                              <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setTocOpen(false);
                                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                className={`block text-[13px] transition-colors font-body leading-relaxed py-0.5 ${
                                  activeSectionId === item.id
                                    ? "text-accent font-semibold"
                                    : "text-foreground/70 hover:text-accent"
                                }`}
                              >
                                {item.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
                          <span className="text-[12px] text-muted-foreground font-body">Partager :</span>
                          <button onClick={handleShareLinkedIn} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors" aria-label="LinkedIn">
                            <Linkedin size={14} />
                          </button>
                          <button onClick={handleShareEmail} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors" aria-label="Email">
                            <Mail size={14} />
                          </button>
                          <button onClick={handleCopyLink} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-accent/10 border border-border/50 text-foreground/60 hover:text-accent transition-colors" aria-label="Copier">
                            {copiedLink ? <Check size={14} className="text-emerald-600" /> : <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>}
                          </button>
                        </div>
                      </nav>
                    )}
                  </div>
                )}

                {/* Lead (chapeau) */}
                <p data-anim="fade-up" className="text-[17px] md:text-[19px] text-foreground/80 leading-[1.8] font-body mb-6">
                  {article.lead}
                </p>

                {/* Intro paragraphs (before first H2) */}
                {article.intro && article.intro.length > 0 && (
                  <div data-anim="fade-up" data-delay="0.03" className="mb-8 pb-6 border-b border-border/50">
                    {article.intro.map((p, i) => (
                      <p key={i} className="text-[15px] text-foreground/80 leading-[1.8] font-body mb-4 last:mb-0">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* Key Quote */}
                {article.keyQuote && (
                  <div data-anim="fade-up" data-delay="0.04" className="mb-8 p-5 rounded-xl bg-secondary/50 border-l-4 border-accent relative">
                    <Quote className="h-8 w-8 text-accent/15 absolute right-3 top-3 pointer-events-none" />
                    <blockquote className="font-display text-[18px] md:text-[20px] text-foreground font-medium italic leading-snug mb-3">
                      "{article.keyQuote.text}"
                    </blockquote>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-foreground/70">
                      <span className="w-4 h-[1px] bg-accent" />
                      <span>{article.keyQuote.author}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{article.keyQuote.role}</span>
                    </div>
                  </div>
                )}

                {/* Summary box */}
                {article.summary && article.summary.length > 0 && (
                  <div data-anim="fade-up" data-delay="0.06" className="mb-8 bg-secondary/50 border border-border/60 rounded-2xl p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block w-1.5 h-5 bg-accent rounded-full" />
                      <span className="font-display text-[17px] md:text-[19px] text-foreground">Points clés</span>
                    </div>
                    <ul className="space-y-2.5">
                      {article.summary.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[14px] text-foreground/80 font-body leading-relaxed">
                          <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Article sections */}
                <article className="prose-mf">
                  {article.sections.map((section, idx) => (
                    <div
                      key={section.id}
                      id={section.id}
                      data-anim="fade-up"
                      data-delay={`${0.06 + idx * 0.04}`}
                      className="scroll-mt-6"
                    >
                      <h2 className="font-display text-[22px] md:text-[26px] text-foreground mt-10 mb-4 leading-[1.2]">
                        {section.h2}
                      </h2>

                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-[15px] text-foreground/80 leading-[1.8] font-body mb-4">
                          {p}
                        </p>
                      ))}

                      {section.sectionQuote && (
                        <blockquote className="my-5 pl-4 border-l-4 border-accent text-[15px] italic text-foreground/75 font-body leading-[1.8]">
                          « {section.sectionQuote} »
                        </blockquote>
                      )}

                      {section.callout && (
                        <div className="mt-4 mb-4 p-4 rounded-xl bg-secondary/60 border border-border/50 text-[14px] text-foreground/85 font-body flex items-start gap-2.5">
                          <ShieldCheck size={16} className="text-accent shrink-0 mt-0.5" />
                          <span>{section.callout}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </article>

                {/* Definitions */}
                {article.definitions && article.definitions.length > 0 && (
                  <div data-anim="fade-up" className="mt-10 bg-secondary/50 border border-border/60 rounded-2xl p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <BookOpen size={16} className="text-accent" />
                      <span className="font-display text-[17px] md:text-[19px] text-foreground">Repères & Définitions</span>
                    </div>
                    <dl className="space-y-4">
                      {article.definitions.map((def) => (
                        <div key={def.term} className="pb-4 border-b border-border/50 last:border-b-0 last:pb-0">
                          <dt className="font-semibold text-[14px] text-foreground mb-1">{def.term}</dt>
                          <dd className="text-[13px] text-foreground/75 leading-[1.7] font-body">{def.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* FAQ — Accordion */}
                {article.faqs && article.faqs.length > 0 && (
                  <div data-anim="fade-up" className="mt-12">
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle size={15} className="text-accent" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-accent">Questions fréquentes</span>
                    </div>
                    <h2 className="font-display text-[22px] md:text-[26px] text-foreground mb-6 leading-[1.2]">
                      Ce que les dirigeants demandent souvent
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {article.faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
                          <AccordionTrigger className="text-left text-[15px] font-body font-semibold text-foreground hover:no-underline">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-[14px] text-foreground/80 font-body leading-[1.8]">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {/* CTA in-article */}
                <div data-anim="fade-up" className="mt-12">
                  <div className="bg-primary rounded-2xl p-8 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent text-[11px] font-bold uppercase tracking-wider mb-4">
                      <Sparkles size={11} /> Pilotage Financier Dirigeants
                    </div>
                    <h3 className="font-display text-[20px] md:text-[24px] text-primary-foreground mb-3 leading-snug">
                      Vos chiffres vous aident-ils vraiment à décider ?
                    </h3>
                    <p className="text-primary-foreground/70 text-[14px] font-body mb-6 max-w-sm mx-auto">
                      MFINANCES transforme votre comptabilité en cockpit de décision en temps réel.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="accent" className="rounded-full" asChild>
                        <Link to="/contact/">
                          Prendre rendez-vous <ArrowRight size={15} className="ml-1" />
                        </Link>
                      </Button>
                      <Button asChild className="rounded-full border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                        <Link to="/diagnostic/">
                          Faire le diagnostic (3 min)
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Author bio */}
                <div data-anim="fade-up" className="mt-10 flex items-center gap-4 p-5 bg-secondary/40 border border-border/50 rounded-xl">
                  <img
                    src={article.author.avatar || avatarMika}
                    alt={article.author.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shrink-0"
                  />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-accent mb-0.5">Auteur de l'analyse</div>
                    <div className="font-display text-[16px] font-bold text-foreground">{article.author.name}</div>
                    <p className="text-[12px] text-foreground/70 leading-relaxed font-body mt-1">
                      Fondateur & Dirigeant de MFINANCES · Expert-Comptable certifié ITAA (n° 50.624.805). Accompagne les dirigeants de PME dans l'optimisation de leur gouvernance financière, le déploiement d'Odoo Finance et la mise en conformité PEPPOL en Belgique.
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-[11px] font-medium text-foreground/60">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Legal note */}
                <aside className="text-[12px] text-muted-foreground border-t border-border/50 pt-5 mt-8 leading-relaxed font-body">
                  <strong>MFINANCES S.R.L.</strong> : Cabinet d'expertise comptable agréé ITAA (n° 50.624.805). Spécialiste Odoo Finance, direction financière externalisée (DAF) et conformité PEPPOL 2026. Siège social : Rue de la Magnanerie 20, 1180 Uccle, Bruxelles.
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        {relatedArticles.length > 0 && (
          <section className="bg-secondary py-6 md:py-8">
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="md:w-1/4">
                  <Link to="/newsroom/" className="inline-flex items-center gap-1.5 text-[15px] font-display text-foreground hover:text-accent transition-colors">
                    <ArrowLeft size={16} /> Toutes les publications
                  </Link>
                </div>
                <div className="md:w-3/4">
                  <h3 className="font-display text-[22px] text-foreground mb-6">À lire aussi</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {relatedArticles.map((rel) => (
                      <Link
                        key={rel.slug}
                        to={`/newsroom/${rel.slug}/`}
                        className="group block bg-card rounded-2xl p-6 border border-border/50 hover:border-accent/30 transition-all"
                      >
                        <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{rel.category}</span>
                        <h4 className="text-[15px] font-bold font-body text-foreground group-hover:text-accent transition-colors leading-snug mt-2 mb-3 line-clamp-2">
                          {rel.h1}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-accent text-[12px] font-semibold">
                          Lire <ArrowRight size={12} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
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
    </div>
  );
}
