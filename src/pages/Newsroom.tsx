import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsroomArticles } from "@/data/newsroom-data";

export default function Newsroom() {
  const allDraft = newsroomArticles.every((a) => !a.validated);
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Newsroom MFINANCES — Interventions et actualités"
        description="Interventions, événements et actualités de MFINANCES et de Mika Musungayi : pilotage financier, Odoo Finance, PME."
        canonical="https://mfinances.be/newsroom/"
        noIndex={allDraft}
      />
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Newsroom</p>
        <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Interventions et actualités</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          Les prises de parole, événements et nouvelles de MFINANCES.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {newsroomArticles.map((a) => (
            <Link
              key={a.slug}
              to={`/newsroom/${a.slug}/`}
              className="group rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-xl"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">
                {a.category} · {a.readingTime}
              </p>
              <h2 className="font-display text-2xl text-primary mb-3 leading-snug">{a.h1}</h2>
              <p className="text-muted-foreground mb-6 line-clamp-3">{a.lead}</p>
              <span className="inline-flex items-center gap-2 font-semibold text-primary">
                Lire l'article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
