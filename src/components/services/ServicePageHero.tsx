import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Stamp from "@/components/ui/Stamp";

export interface ServicePageHeroProps {
  /** Slug or label shown above title, e.g. "DAF à temps partiel" */
  breadcrumbLabel: string;
  /** Eyebrow chip (e.g. "Service Excellence", "Premium & Excellence") */
  eyebrow: string;
  /** Editorial number badge, e.g. "01" */
  number: string;
  /** Section descriptor under number, e.g. "Pilotage" */
  sectionLabel: string;
  /** Title parts: first plain, italic accent, then optional after */
  titleStart: string;
  titleItalic: string;
  titleEnd?: string;
  /** Lead paragraph (single, ~2 lines max for hierarchy) */
  description?: string;
  /** Italic disclaimer (rare, e.g. for fiscal/legal pages) */
  disclaimer?: string;
  /** Pills displayed under description (max 3) */
  pills?: string[];
  /** Hero image src */
  image: string;
  /** Hero image alt */
  imageAlt: string;
  /** Image plaque label, top-right corner of image card */
  plaque: string;
  /** Card bottom title (image card overlay), e.g. "Catalogue complet" */
  cardTitlePrefix?: string;
  cardTitleAccent?: string;
  /** Card bottom subtitle */
  cardSubtitle?: string;
  /** Primary CTA */
  ctaPrimary: { label: string; href: string };
  /** Secondary CTA */
  ctaSecondary?: { label: string; href: string };
  /** Giant editorial watermark (very large faded text behind hero) */
  watermark: string;
}

export default function ServicePageHero({
  breadcrumbLabel,
  eyebrow,
  number,
  sectionLabel,
  titleStart,
  titleItalic,
  titleEnd,
  description,
  disclaimer,
  pills,
  image,
  imageAlt,
  plaque,
  cardTitlePrefix,
  cardTitleAccent,
  cardSubtitle,
  ctaPrimary,
  ctaSecondary,
  watermark,
}: ServicePageHeroProps) {
  return (
    <section className="relative bg-primary overflow-hidden bg-precision-grid-light">
      {/* decorative orbs */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.10] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 65%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Giant editorial watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute top-12 left-0 right-0 text-center select-none">
        <span
          className="font-display italic font-bold leading-none text-primary-foreground/[0.04]"
          style={{ fontSize: "clamp(110px, 22vw, 320px)", letterSpacing: "-0.04em" }}
        >
          {watermark}
        </span>
      </div>

      <div className="container-mf relative py-12 md:py-24">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[12px] uppercase tracking-[0.18em]">
                  Accueil
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary-foreground/30" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/services/" className="text-primary-foreground/60 hover:text-primary-foreground text-[12px] uppercase tracking-[0.18em]">
                  Services
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary-foreground/30" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary-foreground text-[12px] uppercase tracking-[0.18em]">{breadcrumbLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          {/* Left — Copy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6 border-l-2 border-accent pl-4">
              <span className="font-display text-[14px] text-accent font-bold tracking-wider">— {number}</span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/55 font-medium">
                {sectionLabel}
              </span>
            </div>

            <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-6">
              {eyebrow}
            </span>

            <h1
              className="font-display font-bold text-primary-foreground leading-[1.05] tracking-[-0.015em]"
              style={{ fontSize: "clamp(30px, 4vw, 56px)" }}
            >
              {titleStart}{" "}
              <span className="italic font-normal text-accent relative inline-block">
                {titleItalic}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-[10px]"
                  viewBox="0 0 300 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 10 Q 75 2, 150 8 T 298 6"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>
              {titleEnd ? <> {titleEnd}</> : null}
            </h1>

            {description && (
              <div className="mt-9 max-w-[560px]">
                <div className="h-px w-12 bg-accent mb-5" />
                <p className="text-[15px] md:text-[16px] text-primary-foreground/70 leading-[1.75] font-body">
                  {description}
                </p>
                {disclaimer && (
                  <p className="text-primary-foreground/55 text-[12px] leading-relaxed mt-3 font-body italic">
                    {disclaimer}
                  </p>
                )}
              </div>
            )}

            {pills && pills.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2.5">
                {pills.map((pill) => (
                  <span
                    key={pill}
                    className="bg-primary-foreground/[0.08] text-primary-foreground/80 text-[12px] font-medium px-3.5 py-1.5 rounded-full border border-primary-foreground/15 backdrop-blur-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button
                variant="accent"
                size="lg"
                className="rounded-full pl-7 pr-3 group h-14 text-[15px] whitespace-nowrap"
                asChild
              >
                <Link to={ctaPrimary.href}>
                  <span className="flex items-center gap-3">
                    {ctaPrimary.label}
                    <span className="w-8 h-8 rounded-full bg-accent-foreground/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shrink-0">
                      <ArrowUpRight size={14} />
                    </span>
                  </span>
                </Link>
              </Button>
              {ctaSecondary && (
                <Button
                  variant="outline-white"
                  size="lg"
                  className="rounded-full px-7 h-14 text-[15px] whitespace-nowrap"
                  asChild
                >
                  <Link to={ctaSecondary.href}>{ctaSecondary.label}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Right — Image card */}
          <div className="lg:col-span-5 lg:pb-4">
            <div className="relative group mt-10 lg:mt-0">
              <div className="absolute -inset-2 bg-accent/20 rounded-[32px] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="absolute -top-12 -right-6 z-20 hidden md:block">
                <Stamp className="text-accent drop-shadow-lg" />
              </div>
              <div className="relative rounded-[28px] overflow-hidden ring-1 ring-primary-foreground/10 cut-corner">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-[340px] md:h-[440px] object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-transparent to-transparent" />
                <div className="absolute top-5 right-5 text-primary-foreground/90 text-[10px] uppercase tracking-[0.2em] font-medium">
                  {plaque}
                </div>
                {(cardTitlePrefix || cardSubtitle) && (
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      {cardTitlePrefix && (
                        <p className="font-display text-primary-foreground text-[18px] leading-none">
                          {cardTitlePrefix}{" "}
                          {cardTitleAccent && <span className="italic text-accent">{cardTitleAccent}</span>}
                        </p>
                      )}
                      {cardSubtitle && (
                        <p className="text-[11px] text-primary-foreground/75 mt-1.5 uppercase tracking-[0.15em]">
                          {cardSubtitle}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
