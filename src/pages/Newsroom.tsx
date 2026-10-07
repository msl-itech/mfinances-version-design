import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
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
import { newsroomArticles } from "@/data/newsroom-data";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

/* Texte éditorial « À la une » (emplacement évolutif, remplacé par une actualité plus forte le moment venu). */
const FEATURED_COPY = {
  title: "Finance Connectée : une vision de la finance au service du pilotage",
  meta: "7 septembre 2026 · Marrakech, Maroc",
  summary:
    "Mika Musungayi, expert-comptable et dirigeant de MFINANCES, est intervenu lors de Finance Connectée autour de la facturation électronique, de la rentabilité opérationnelle et du pilotage financier connecté.",
};

export default function Newsroom() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const featured = useMemo(
    () => newsroomArticles.find((a) => a.featured) || newsroomArticles[0],
    []
  );
  // Grille invisible tant qu'il n'existe pas de deuxième actualité réelle.
  const others = newsroomArticles.filter((a) => a.slug !== featured?.slug);
  const allDraft = newsroomArticles.every((a) => !a.validated);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dernières actualités MFINANCES",
    description: "Les actualités, interventions et temps forts qui font vivre MFINANCES.",
    url: "https://mfinances.be/newsroom/",
    hasPart: newsroomArticles.map((a) => ({
      "@type": "NewsArticle",
      headline: a.h1,
      url: `https://mfinances.be/newsroom/${a.slug}/`,
      datePublished: a.eventDate,
    })),
  };

  return (
    <div className="min-h-screen" ref={root}>
      <SEOHead
        title="Dernières actualités | Newsroom MFINANCES"
        description="Les actualités, interventions et temps forts qui font vivre MFINANCES : Finance Connectée, intervention de Mika Musungayi à Marrakech."
        canonical="https://mfinances.be/newsroom/"
        noIndex={allDraft}
        schemaJson={schema}
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
              <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                Dernières <span className="text-accent">actualités</span>
              </h1>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[620px] mx-auto">
                Les actualités, interventions et temps forts qui font vivre MFINANCES.
              </p>
            </div>
          </div>
        </section>

        {/* ── À LA UNE ── */}
        {featured && (
          <section className="bg-secondary py-8 md:py-10">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <Link
                to={`/newsroom/${featured.slug}/`}
                data-anim="fade-up"
                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)] transition-all duration-300"
              >
                <div className="lg:col-span-7 overflow-hidden">
                  <img
                    src={featured.coverImage}
                    alt={featured.coverImageAlt}
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div className="lg:col-span-5 p-6 lg:p-0 lg:pr-8">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-accent bg-accent/10 rounded-full px-3 py-1 mb-5">
                    À la une
                  </span>
                  <h2 className="font-display text-[22px] md:text-[32px] leading-[1.15] text-foreground group-hover:text-accent transition-colors">
                    {FEATURED_COPY.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-[13px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={13} /> 7 septembre 2026
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} /> Marrakech, Maroc
                    </span>
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-foreground/80 font-body">
                    {FEATURED_COPY.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-accent text-[14px] font-semibold group-hover:gap-2 transition-all">
                    Lire l'article <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── ACTUALITÉS SUIVANTES — invisible tant qu'il n'y a pas d'autre contenu ── */}
        {others.length > 0 && (
          <section className="bg-card py-8 md:py-10">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <div data-anim="fade-up" className="text-center mb-10">
                <h2 className="font-display text-[24px] md:text-[36px] text-foreground leading-[1.15]">
                  Toutes les <span className="text-accent">publications</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {others.map((a, i) => (
                  <Link
                    key={a.slug}
                    to={`/newsroom/${a.slug}/`}
                    data-anim="fade-up"
                    data-delay={`${0.05 + i * 0.04}`}
                    className="group block bg-secondary/60 rounded-2xl overflow-hidden border border-border/50 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)] transition-all duration-300"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={a.coverImage}
                        alt={a.coverImageAlt}
                        loading="lazy"
                        className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent">{a.category}</span>
                      <h3 className="font-display text-[18px] leading-snug mt-2 text-foreground group-hover:text-accent transition-colors">{a.h1}</h3>
                      <p className="text-[14px] text-foreground/70 mt-3 line-clamp-3 font-body leading-[1.7]">{a.lead}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-accent text-[13px] font-semibold group-hover:gap-2 transition-all">
                        Lire <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="bg-primary py-8 md:py-10">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center">
            <div data-anim="fade-up">
              <h2 className="font-display text-[24px] md:text-[36px] text-primary-foreground leading-[1.15]">
                Vous souhaitez échanger sur vos <span className="text-accent">enjeux financiers</span> ?
              </h2>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-4 font-body">
                Premier échange gratuit et confidentiel avec un expert MFINANCES.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full" asChild>
                  <Link to="/contact/#form">Prendre rendez-vous <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                  <Link to="/diagnostic/">Faire le diagnostic gratuit <ArrowRight size={16} className="ml-1" /></Link>
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
