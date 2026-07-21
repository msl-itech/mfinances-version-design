import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link, useParams } from "react-router-dom";
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
import { ArrowRight, Clock } from "lucide-react";
import { blogCategories, getArticlesByCategory } from "@/data/blog-data";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";



export default function BlogCategory() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = blogCategories.find((c) => c.slug === categorySlug);
  const articles = categorySlug ? getArticlesByCategory(categorySlug) : [];
  const published = articles.filter((a) => a.published);
  const upcoming = articles.filter((a) => !a.published);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!category) {
    return (
      <div className="min-h-screen">
        <SEOHead title="Catégorie introuvable — MFinances" description="Cette catégorie n'existe pas." canonical="https://mfinances.be/blog/" noIndex />
        <Header />
        <div className="py-10 text-center">
          <h1 className="font-display text-[32px]">Catégorie introuvable</h1>
          <Link to="/blog/" className="text-accent mt-4 inline-block">Retour au blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${category.label} — Blog MFinances Bruxelles`}
        description={category.description}
        canonical={`https://mfinances.be/blog/${categorySlug}/`}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-8 md:py-10 bg-precision-grid-light">
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
                  <BreadcrumbLink asChild>
                    <Link to="/blog/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground text-[13px]">{category.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-8">
              <h1 className="font-display text-[26px] md:text-[48px] leading-[1.12] text-primary-foreground">
                {category.label}
              </h1>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* ── ARTICLES PUBLIÉS ── */}
        {published.length > 0 && (
          <section className="bg-card py-8 md:py-10">
            <div className="mx-auto max-w-[900px] px-6 lg:px-12">
              <div className="space-y-5">
                {published.map((article, i) => (
                  <div data-anim="fade-up" data-delay="0.08 + i * 0.05" key={article.slug} >
                    <Link
                      to={`/blog/${article.categorySlug}/${article.slug}/`}
                      className="group block bg-secondary/60 rounded-2xl p-7 border border-border/50 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(27,43,94,0.08)] transition-all duration-300"
                    >
                      {article.hook && (
                        <p className="text-[17px] md:text-[18px] font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                          {article.hook}
                        </p>
                      )}
                      <p className="text-[14px] text-muted-foreground leading-[1.7] font-body mt-3">
                        {article.excerpt}
                      </p>
                      <p className="text-[12px] italic text-foreground/45 font-body mt-4 leading-snug">
                        {article.title}
                      </p>
                      <span className="inline-flex items-center gap-1 text-accent text-[13px] font-semibold mt-4 group-hover:gap-2 transition-all">
                        Lire l'article <ArrowRight size={14} />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── ARTICLES À VENIR ── */}
        {upcoming.length > 0 && (
          <section className="bg-secondary py-8 md:py-10">
            <div className="mx-auto max-w-[900px] px-6 lg:px-12">
              <div data-anim="fade-up" className="text-center mb-10">
                <h2 className="font-display text-[24px] md:text-[30px] text-foreground leading-[1.15]">
                  Articles <span className="text-accent">à venir</span>
                </h2>
              </div>

              <div className="space-y-4">
                {upcoming.map((article, i) => (
                  <div data-anim="fade-up" data-delay="0.08 + i * 0.05" key={article.slug} >
                    <div className="bg-card rounded-2xl p-6 border border-border/50 opacity-75">
                      <div className="flex items-start gap-3">
                        <Clock size={16} className="text-foreground/30 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-[15px] font-bold font-body text-foreground/70 leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-[13px] text-muted-foreground font-body mt-1">{article.excerpt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                Besoin d'un accompagnement personnalisé ?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button variant="accent" size="lg" className="rounded-full" asChild>
                  <Link to="/contact/">Consultation gratuite <ArrowRight size={16} className="ml-1" /></Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                  <Link to="/blog/">Toutes les catégories <ArrowRight size={16} className="ml-1" /></Link>
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
