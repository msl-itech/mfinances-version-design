import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { newsroomArticles } from "@/data/newsroom-data";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/seo-schemas";
import NotFound from "./NotFound";

export default function NewsroomArticle() {
  const { slug } = useParams();
  const a = newsroomArticles.find((x) => x.slug === slug);
  if (!a) return <NotFound />;
  const url = `https://mfinances.be/newsroom/${a.slug}/`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={a.title}
        description={a.description}
        canonical={url}
        noIndex={!a.validated}
        schemaJson={[
          createBreadcrumbSchema([
            { name: "Accueil", url: "https://mfinances.be/" },
            { name: "Newsroom", url: "https://mfinances.be/newsroom/" },
            { name: a.title, url },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: a.title,
            description: a.description,
            inLanguage: "fr-BE",
            articleSection: a.category,
            keywords: a.tags.join(", "),
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: "Rédaction MFINANCES" },
            publisher: { "@id": "https://mfinances.be/#organization" },
            about: { "@type": "Person", name: "Mika Musungayi" },
          },
          createFaqSchema(a.faqs),
        ]}
      />
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <nav className="text-sm text-muted-foreground mb-8">
          <Link to="/newsroom/" className="hover:text-primary">Newsroom</Link> / {a.category}
        </nav>
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">{a.kicker}</p>
        <h1 className="font-display text-3xl md:text-5xl text-primary leading-tight mb-6">{a.h1}</h1>
        <p className="text-sm text-muted-foreground mb-8">Rédaction MFINANCES · {a.readingTime} de lecture</p>
        <p className="text-xl text-foreground/90 leading-relaxed mb-10">{a.lead}</p>

        <aside className="rounded-3xl bg-secondary p-7 mb-12">
          <p className="font-semibold text-primary mb-3">En bref</p>
          <ul className="space-y-2 list-disc pl-5 text-foreground/90">
            {a.summary.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </aside>

        {a.sections.map((s) => (
          <section key={s.h2} className="mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">{s.h2}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-foreground/90 mb-4">{p}</p>
            ))}
          </section>
        ))}

        <details className="rounded-3xl border border-border p-7 mb-10">
          <summary className="cursor-pointer font-semibold text-primary min-h-12 flex items-center">Définitions</summary>
          <dl className="mt-4 space-y-4">
            {a.definitions.map((d) => (
              <div key={d.term}>
                <dt className="font-semibold">{d.term}</dt>
                <dd className="text-foreground/80">{d.text}</dd>
              </div>
            ))}
          </dl>
        </details>

        <section className="mb-12">
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-6">Questions fréquentes</h2>
          {a.faqs.map((f) => (
            <div key={f.q} className="mb-5">
              <h3 className="font-semibold text-lg mb-1">{f.q}</h3>
              <p className="text-foreground/80">{f.a}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-10 mb-12">
          <h2 className="font-display text-2xl md:text-3xl mb-3">Vos chiffres vous aident-ils vraiment à décider ?</h2>
          <p className="opacity-90 mb-6">MFINANCES accompagne les TPE et PME belges en croissance pour transformer leur comptabilité en outil de pilotage.</p>
          <Button asChild variant="destructive" size="lg" className="rounded-full">
            <Link to="/services/controle-de-gestion/">Parler de votre pilotage financier <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </section>

        <aside className="text-sm text-muted-foreground border-t border-border pt-6">
          <p><strong>MFINANCES</strong> : cabinet d'expertise comptable en Belgique, spécialisé en Odoo Finance, contrôle de gestion et direction financière externalisée.</p>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
