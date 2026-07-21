import { Mail, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export interface ReportUnlockBannerProps {
  eyebrow?: string;
  titleStart: string;
  titleItalic: string;
  titleEnd?: string;
  description: string;
  bullets?: { icon: "mail" | "shield" | "zap"; text: string }[];
  className?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const ICONS = { mail: Mail, shield: ShieldCheck, zap: Zap };

export default function ReportUnlockBanner({
  eyebrow = "Dernière étape",
  titleStart,
  titleItalic,
  titleEnd,
  description,
  bullets = [
    { icon: "zap", text: "Résultat immédiat" },
    { icon: "mail", text: "PDF envoyé par email" },
    { icon: "shield", text: "100 % confidentiel" },
  ],
  className = "",
  ctaLabel,
  onCtaClick,
}: ReportUnlockBannerProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#FBF8F3] border border-primary/10 p-6 sm:p-8 mb-6 ${className}`}
      style={{ boxShadow: "0 1px 0 0 hsl(var(--primary) / 0.04), 0 20px 40px -24px hsl(var(--primary) / 0.15)" }}
    >
      {/* Gold hairline accent left */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-6 bottom-6 w-[3px] bg-accent rounded-r"
      />
      {/* Editorial watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-8 font-display italic font-bold leading-none text-primary/[0.04] select-none"
        style={{ fontSize: "clamp(100px, 15vw, 180px)", letterSpacing: "-0.04em" }}
      >
        {titleItalic}
      </span>

      <div className="relative pl-3 sm:pl-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-6 bg-accent" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent font-body">
            {eyebrow}
          </span>
        </div>

        <h3
          className="font-display font-bold text-primary leading-[1.15] tracking-[-0.015em] mb-3"
          style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
        >
          {titleStart}{" "}
          <span className="italic font-normal text-destructive">{titleItalic}</span>
          {titleEnd && <> {titleEnd}</>}
        </h3>

        <p className="text-primary/70 text-[14px] sm:text-[15px] leading-relaxed font-body max-w-[560px]">
          {description}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 pt-5 border-t border-primary/10">
          {bullets.map((b, i) => {
            const Icon = ICONS[b.icon];
            return (
              <div key={i} className="flex items-center gap-2 text-[12.5px] text-primary/75 font-body">
                <Icon size={14} className="text-accent flex-shrink-0" strokeWidth={2} />
                <span className="font-medium">{b.text}</span>
              </div>
            );
          })}
        </div>

        {ctaLabel && onCtaClick && (
          <div className="mt-6">
            <button
              type="button"
              onClick={onCtaClick}
              className="group inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-body font-semibold text-[14px] px-6 py-3 rounded-full hover:brightness-110 transition shadow-sm"
            >
              {ctaLabel}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
