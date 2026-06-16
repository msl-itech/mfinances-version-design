import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import imgMeeting from "@/assets/daf-meeting-team.png";

export interface ServicePageCTAProps {
  /** Title — split for italic accent */
  titleStart: string;
  titleItalic?: string;
  titleEnd?: string;
  /** Lead paragraph */
  description: string;
  /** Editorial watermark behind CTA, e.g. "Parlons-en" */
  watermark?: string;
  /** Primary CTA */
  ctaPrimary: { label: string; href: string };
  /** Secondary CTA */
  ctaSecondary?: { label: string; href: string };
  /** Optional alternative background image */
  bgImage?: string;
  bgImageAlt?: string;
}

export default function ServicePageCTA({
  titleStart,
  titleItalic,
  titleEnd,
  description,
  watermark = "Parlons-en",
  ctaPrimary,
  ctaSecondary,
  bgImage,
  bgImageAlt = "Consultation MFinances",
}: ServicePageCTAProps) {
  return (
    <section className="relative bg-primary py-10 md:py-32 overflow-hidden">
      <img
        src={bgImage || imgMeeting}
        alt={bgImageAlt}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/85 to-primary" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <span
          className="font-display italic font-bold leading-none text-primary-foreground/[0.05]"
          style={{ fontSize: "clamp(120px, 20vw, 280px)", letterSpacing: "-0.04em" }}
        >
          {watermark}
        </span>
      </div>

      <div className="container-mf relative">
        <div className="max-w-[820px] mx-auto text-center">
          {/* hairline + label */}
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-10 bg-primary-foreground/30" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/55 font-medium">
              Prochaine étape
            </span>
            <div className="h-px w-10 bg-primary-foreground/30" />
          </div>

          <h2
            className="font-display font-bold text-primary-foreground leading-[1.08] tracking-[-0.015em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}
          >
            {titleStart}
            {titleItalic && (
              <>
                {" "}
                <span className="italic font-normal text-accent">{titleItalic}</span>
              </>
            )}
            {titleEnd && <> {titleEnd}</>}
          </h2>

          <p className="text-primary-foreground/70 text-[15px] md:text-[16px] leading-[1.75] mt-6 font-body max-w-[640px] mx-auto">
            {description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
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
      </div>
    </section>
  );
}
