import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsroomArticles } from "@/data/newsroom-data";
import { buildUtmQuery } from "@/lib/utm-enrich";

const BOOKING_URL = "https://odoo.mfinances.be/appointment/11";

/* Texte éditorial « À la une » (emplacement évolutif, remplacé par une actualité plus forte le moment venu). */
const FEATURED_COPY = {
  title: "Finance Connectée : une vision de la finance au service du pilotage",
  meta: "7 septembre 2026 · Marrakech, Maroc",
  summary:
    "Mika Musungayi, expert-comptable et dirigeant de MFINANCES, est intervenu lors de Finance Connectée autour de la facturation électronique, de la rentabilité opérationnelle et du pilotage financier connecté.",
};

export default function Newsroom() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Dernières actualités | Newsroom MFINANCES"
        description="Les actualités, interventions et temps forts qui font vivre MFINANCES : Finance Connectée, intervention de Mika Musungayi à Marrakech."
        canonical="https://mfinances.be/newsroom/"
        noIndex={allDraft}
        schemaJson={schema}
      />
      <Header />

      <main>
        {/* Hero sobre */}
        <section className="pt-14 pb-8 md:pt-20 md:pb-12">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-4">Newsroom</p>
            <h1 className="font-display text-[34px] md:text-[56px] leading-[1.05] tracking-tight">
              Dernières actualités
            </h1>
            <p className="mt-4 text-[16px] md:text-[18px] text-muted-foreground max-w-[560px]">
              Les actualités, interventions et temps forts qui font vivre MFINANCES.
            </p>
            <div className="mt-8 h-px bg-border" />
          </div>
        </section>

        {/* À la une */}
        {featured && (
          <section className="pb-14 md:pb-20">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <Link
                to={`/newsroom/${featured.slug}/`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
              >
                <div className="lg:col-span-7 overflow-hidden rounded-3xl bg-muted">
                  <img
                    src={featured.coverImage}
                    alt={featured.coverImageAlt}
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div className="lg:col-span-5">
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-primary border border-primary/20 rounded-full px-3 py-1 mb-5">
                    À la une
                  </span>
                  <h2 className="font-display text-[26px] md:text-[36px] leading-[1.15]">
                    {FEATURED_COPY.title}
                  </h2>
                  <p className="mt-4 text-[13px] uppercase tracking-[0.15em] text-muted-foreground">
                    {FEATURED_COPY.meta}
                  </p>
                  <p className="mt-5 text-[16px] leading-relaxed text-foreground/80">
                    {FEATURED_COPY.summary}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-primary">
                    <span className="link-underline">Lire l'article</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Actualités suivantes — invisible tant qu'il n'y a pas d'autre contenu */}
        {others.length > 0 && (
          <section className="pb-14 md:pb-20">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
              <div className="h-px bg-border mb-10" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {others.map((a) => (
                  <Link key={a.slug} to={`/newsroom/${a.slug}/`} className="group block">
                    <div className="overflow-hidden rounded-2xl bg-muted mb-4">
                      <img src={a.coverImage} alt={a.coverImageAlt} loading="lazy" className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{a.category}</p>
                    <h3 className="font-display text-[20px] leading-snug mt-2">{a.h1}</h3>
                    <p className="text-[14px] text-foreground/70 mt-2 line-clamp-3">{a.lead}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary">
                      Lire <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA discret */}
        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <div className="border-t border-border pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <p className="font-display text-[22px] md:text-[26px] text-primary">
                Vous souhaitez échanger sur vos enjeux financiers ?
              </p>
              <a
                href={buildUtmQuery(BOOKING_URL)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 h-12 text-[15px] font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors self-start md:self-auto"
              >
                Prendre rendez-vous <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
