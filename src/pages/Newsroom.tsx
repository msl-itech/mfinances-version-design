import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Newspaper,
  SlidersHorizontal,
  Check,
  X,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
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
import { Input } from "@/components/ui/input";
import { newsroomArticles } from "@/data/newsroom-data";
import { toast } from "sonner";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";
import avatarMika from "@/assets/avatar-mika-96.webp";
import mikaPresse from "@/assets/newsroom/DSC08580.jpg";

type CategoryFilter =
  | "Toutes"
  | "Interventions"
  | "Réglementation & PEPPOL"
  | "Tribunes & Analyses"
  | "Événements & Tables Rondes";

export default function Newsroom() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Toutes");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const categories: CategoryFilter[] = [
    "Toutes",
    "Interventions",
    "Réglementation & PEPPOL",
    "Tribunes & Analyses",
    "Événements & Tables Rondes",
  ];

  const filteredArticles = useMemo(() => {
    return newsroomArticles.filter((article) => {
      const matchCat =
        selectedCategory === "Toutes" || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        article.h1.toLowerCase().includes(q) ||
        article.lead.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q)) ||
        (article.location && article.location.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    return newsroomArticles.find((a) => a.featured) || newsroomArticles[0];
  }, []);

  const regularArticles = useMemo(() => {
    if (selectedCategory !== "Toutes" || searchQuery.trim() !== "") {
      return filteredArticles;
    }
    return filteredArticles.filter((a) => a.slug !== featuredArticle?.slug);
  }, [filteredArticles, selectedCategory, searchQuery, featuredArticle]);

  const handleCopyPressEmail = () => {
    navigator.clipboard.writeText("info@mfinances.be");
    setCopiedEmail(true);
    toast.success("Adresse presse copiée dans le presse-papier : info@mfinances.be");
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const allDraft = newsroomArticles.every((a) => !a.validated);

  const newsroomSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Newsroom MFINANCES — Espace Presse & Prises de Parole",
    description:
      "Espace presse officiel, interventions publiques, tribunes et analyses de Mika Musungayi et MFINANCES : pilotage financier, Odoo Finance, réglementation PEPPOL.",
    url: "https://mfinances.be/newsroom/",
    publisher: {
      "@type": "AccountingService",
      name: "MFINANCES",
      url: "https://mfinances.be/",
      logo: "https://mfinances.be/logo-square.webp",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rue de la Magnanerie 20",
        addressLocality: "Uccle",
        postalCode: "1180",
        addressCountry: "BE",
      },
    },
    hasPart: newsroomArticles.map((a) => ({
      "@type": "NewsArticle",
      headline: a.h1,
      description: a.description,
      url: `https://mfinances.be/newsroom/${a.slug}/`,
      datePublished: a.eventDate,
      author: {
        "@type": "Person",
        name: a.author.name,
      },
    })),
  };

  return (
    <div className="min-h-screen" ref={root}>
      <SEOHead
        title="Newsroom MFINANCES — Espace Presse & Prises de Parole Officielles"
        description="Espace presse officiel, interventions publiques, décryptages PEPPOL 2026 et tribunes de Mika Musungayi : pilotage financier, Odoo Finance et stratégie des PME belges."
        canonical="https://mfinances.be/newsroom/"
        noIndex={allDraft}
        schemaJson={newsroomSchema}
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
                  <BreadcrumbPage className="text-primary-foreground text-[13px]">Newsroom</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-8">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">
                <span className="w-6 h-[2px] bg-accent" />
                Espace Presse Officiel 2026
                <span className="w-6 h-[2px] bg-accent" />
              </div>
              <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                L'actualité stratégique du <span className="text-accent">pilotage financier</span>
              </h1>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[620px] mx-auto">
                Interventions publiques de <strong className="text-primary-foreground font-semibold">Mika Musungayi</strong>, décryptages PEPPOL 2026 et analyses de fond sur la transformation de la finance des PME belges.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-primary-foreground/20">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-accent">{newsroomArticles.length}</div>
                  <div className="text-[11px] text-primary-foreground/60 uppercase tracking-wider mt-1">Publications</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-accent">ITAA</div>
                  <div className="text-[11px] text-primary-foreground/60 uppercase tracking-wider mt-1">n° 50.624.805</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-accent">Bruxelles</div>
                  <div className="text-[11px] text-primary-foreground/60 uppercase tracking-wider mt-1">& Wallonie</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <a href="#contact-presse" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent hover:bg-accent/90 text-white text-xs font-semibold transition-colors">
                  <Mail size={13} /> Contacter Mika Musungayi
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED ("À la Une") ── */}
        {selectedCategory === "Toutes" && !searchQuery.trim() && featuredArticle && (
          <section className="bg-secondary py-8 md:py-10">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <div data-anim="fade-up" className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-accent" />
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground/70">
                  À la Une · Intervention Internationale
                </h2>
              </div>

              <div data-anim="fade-up" data-delay="0.05" className="group relative rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)] transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Image */}
                  <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] overflow-hidden">
                    <img
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.coverImageAlt}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-accent text-white text-[11px] font-bold tracking-wider uppercase">
                        {featuredArticle.category}
                      </span>
                      {featuredArticle.location && (
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium flex items-center gap-1 border border-white/20">
                          <MapPin size={11} /> {featuredArticle.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground uppercase tracking-widest font-semibold mb-4">
                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-accent" />{featuredArticle.displayDate}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-accent" />{featuredArticle.readingTime}</span>
                      </div>

                      <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-bold mb-2">
                        {featuredArticle.kicker}
                      </p>

                      <h3 className="font-display text-[22px] sm:text-[28px] text-foreground font-bold leading-snug mb-4 group-hover:text-accent transition-colors">
                        <Link to={`/newsroom/${featuredArticle.slug}/`}>
                          {featuredArticle.h1}
                        </Link>
                      </h3>

                      <p className="text-[14px] text-muted-foreground leading-[1.7] font-body mb-5 line-clamp-3">
                        {featuredArticle.lead}
                      </p>

                      {featuredArticle.keyQuote && (
                        <div className="p-4 rounded-xl bg-secondary border-l-4 border-accent text-[13px] text-foreground/85 italic mb-6">
                          "{featuredArticle.keyQuote.text}"
                        </div>
                      )}
                    </div>

                    <div className="pt-5 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={featuredArticle.author.avatar || avatarMika}
                          alt={featuredArticle.author.name}
                          className="w-8 h-8 rounded-full border border-primary/20 object-cover"
                        />
                        <div>
                          <div className="text-[13px] font-semibold text-foreground">{featuredArticle.author.name}</div>
                          <div className="text-[11px] text-muted-foreground">Fondateur MFINANCES · ITAA</div>
                        </div>
                      </div>
                      <Link
                        to={`/newsroom/${featuredArticle.slug}/`}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-accent group-hover:gap-2.5 transition-all"
                      >
                        Lire l'intervention <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── FILTERS & ARTICLES ── */}
        <section className="bg-card py-8 md:py-10" ref={articlesRef}>
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            {/* Filters + Search */}
            <div data-anim="fade-up" className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold pr-2 flex items-center gap-1.5 shrink-0">
                  <SlidersHorizontal size={13} /> Filtres :
                </span>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const count =
                    cat === "Toutes"
                      ? newsroomArticles.length
                      : newsroomArticles.filter((a) => a.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-secondary text-foreground/80 hover:bg-secondary/80"
                      }`}
                    >
                      {cat}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-card text-muted-foreground"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full lg:w-72">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher... PEPPOL, Odoo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-8 h-11 rounded-full border-border/60 bg-secondary/60 font-body text-[14px]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Effacer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Section header */}
            <div data-anim="fade-up" className="text-center mb-10">
              <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                {selectedCategory === "Toutes" && !searchQuery
                  ? <>Toutes les <span className="text-accent">publications</span></>
                  : <><span className="text-accent">Résultats</span> de recherche</>}
              </h2>
              <p className="text-[13px] text-muted-foreground mt-2">
                {regularArticles.length} {regularArticles.length > 1 ? "analyses disponibles" : "analyse disponible"}
                {(selectedCategory !== "Toutes" || searchQuery) && (
                  <button
                    onClick={() => { setSelectedCategory("Toutes"); setSearchQuery(""); }}
                    className="ml-3 text-accent font-semibold hover:underline"
                  >
                    ← Tout afficher
                  </button>
                )}
              </p>
            </div>

            {/* Articles grid */}
            {regularArticles.length === 0 ? (
              <div data-anim="fade-up" className="p-12 text-center rounded-2xl border border-dashed border-border/50 bg-secondary/40">
                <Newspaper className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
                <h3 className="font-display text-[20px] text-foreground font-semibold mb-2">Aucun article trouvé</h3>
                <p className="text-[14px] text-muted-foreground max-w-md mx-auto mb-6">
                  Aucune publication ne correspond à vos critères. Modifiez vos filtres ou explorez toutes nos tribunes.
                </p>
                <Button variant="outline" onClick={() => { setSelectedCategory("Toutes"); setSearchQuery(""); }} className="rounded-full">
                  Voir tous les articles
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article, i) => (
                  <div data-anim="fade-up" data-delay={`${0.05 + i * 0.04}`} key={article.slug}>
                    <Link
                      to={`/newsroom/${article.slug}/`}
                      className="group flex flex-col bg-secondary/60 rounded-2xl border border-border/50 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)] transition-all duration-300 h-full overflow-hidden"
                    >
                      {/* Image */}
                      <div className="h-[180px] overflow-hidden">
                        <img
                          src={article.coverImage}
                          alt={article.coverImageAlt}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>

                      {/* Body */}
                      <div className="p-7 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent">{article.category}</span>
                          {article.location && (
                            <>
                              <span className="text-muted-foreground/50">·</span>
                              <span className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin size={10} />{article.location}</span>
                            </>
                          )}
                        </div>

                        <h3 className="text-[17px] md:text-[18px] font-bold font-body text-foreground leading-snug group-hover:text-accent transition-colors mb-3">
                          {article.h1}
                        </h3>

                        <p className="text-[14px] text-muted-foreground leading-[1.7] font-body line-clamp-3 mb-4 flex-1 min-h-0">
                          {article.lead}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4 pt-4 border-t border-border/40">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-card text-[10px] font-medium text-foreground/60">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={article.author.avatar || avatarMika}
                              alt={article.author.name}
                              className="w-6 h-6 rounded-full object-cover border border-primary/20"
                            />
                            <div className="text-[11px] text-muted-foreground">
                              <span className="font-semibold text-foreground/80">{article.author.name}</span>
                              <span className="mx-1">·</span>
                              {article.displayDate}
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-accent text-[13px] font-semibold group-hover:gap-2 transition-all">
                            Lire <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CONTACT PRESSE ── */}
        <section id="contact-presse" className="bg-secondary py-8 md:py-10">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div data-anim="fade-up" className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/50">
                  <img
                    src={mikaPresse}
                    alt="Mika Musungayi - Dirigeant MFINANCES"
                    className="w-full h-72 object-cover object-center sm:h-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                      Porte-Parole Officiel
                    </span>
                    <h3 className="font-display text-[22px] font-bold text-white">Mika Musungayi</h3>
                    <p className="text-[12px] text-white/75">
                      Fondateur & Dirigeant de MFINANCES · Expert-Comptable ITAA n° 50.624.805
                    </p>
                  </div>
                </div>
              </div>

              <div data-anim="fade-up" data-delay="0.1" className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">
                  <span className="w-6 h-[2px] bg-accent" />
                  Relations Médias & Prises de Parole
                </div>
                <h2 className="font-display text-[28px] md:text-[36px] text-foreground font-bold leading-tight mb-4">
                  Solliciter une interview ou une intervention
                </h2>
                <p className="text-[15px] text-muted-foreground leading-relaxed font-body mb-6">
                  Mika Musungayi intervient auprès des médias économiques, podcasts d'affaires et conférences de dirigeants sur :
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { title: "Obligation PEPPOL 2026", desc: "Impact sur les PME belges et la trésorerie B2B." },
                    { title: "Odoo Finance & ERP", desc: "Transformer la comptabilité en cockpit de pilotage." },
                    { title: "DAF externalisé", desc: "Le modèle direction financière part-time pour PME." },
                    { title: "Fiscalité & Rémunération", desc: "Arbitrages légaux en Belgique (VVPR-bis)." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-2.5 text-[13px] text-foreground/85 p-3.5 rounded-xl bg-card border border-border/40">
                      <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                      <span><strong className="font-semibold">{item.title} :</strong> {item.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl border border-border/50 bg-card flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="text-center sm:text-left">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Service de Presse</div>
                    <div className="text-[14px] font-bold text-foreground mt-0.5">Réponse prioritaire sous 4h ouvrées</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">Rue de la Magnanerie 20, 1180 Uccle</div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <Button
                      onClick={handleCopyPressEmail}
                      variant="outline"
                      className="w-full sm:w-auto rounded-full text-[12px] font-semibold"
                    >
                      {copiedEmail ? (
                        <><Check size={13} className="mr-1.5 text-emerald-600" /> Email copié !</>
                      ) : (
                        <><Mail size={13} className="mr-1.5 text-primary" /> info@mfinances.be</>
                      )}
                    </Button>
                    <Button asChild className="w-full sm:w-auto rounded-full bg-accent hover:bg-accent/90 text-white text-[12px] font-semibold">
                      <a href="tel:+3228860550">
                        <Phone size={13} className="mr-1.5" /> +32 2 886 05 50
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
