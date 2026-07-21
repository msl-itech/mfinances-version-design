import { Sparkles, Mail, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export interface ReportUnlockBannerProps {
  eyebrow?: string;
  titleStart: string;
  titleItalic: string;
  titleEnd?: string;
  description: string;
  bullets?: { icon: "mail" | "shield" | "zap"; text: string }[];
  className?: string;
  targetId?: string;
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
  targetId,
}: ReportUnlockBannerProps) {
  const handleClick = () => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const focusable = el.querySelector<HTMLElement>(
      "input, textarea, select, button"
    );
    focusable?.focus({ preventScroll: true });
  };

  const Title = (
    <>
      <span className="text-white">{titleStart}</span>{" "}
      <span className="italic font-normal text-accent">{titleItalic}</span>
      {titleEnd && <span className="text-white"> {titleEnd}</span>}
    </>
  );

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-5 sm:p-6 mb-5 shadow-md ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -bottom-10 font-display italic font-bold leading-none text-white/[0.06] select-none"
        style={{ fontSize: "clamp(90px, 14vw, 160px)", letterSpacing: "-0.04em" }}
      >
        {titleItalic}
      </span>

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full">
            <Sparkles size={11} />
            {eyebrow}
          </span>
        </div>

        {targetId ? (
          <button
            type="button"
            onClick={handleClick}
            className="group text-left w-full font-display font-bold leading-[1.15] tracking-[-0.01em] mb-2 hover:opacity-95 transition-opacity"
            style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}
          >
            {Title}
            <span className="inline-flex items-center gap-1 ml-2 align-middle text-accent text-[13px] font-body font-semibold not-italic underline underline-offset-4 group-hover:no-underline">
              Compléter <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        ) : (
          <h3
            className="font-display font-bold leading-[1.15] tracking-[-0.01em] mb-2"
            style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}
          >
            {Title}
          </h3>
        )}

        <p className="text-white/80 text-[13px] sm:text-[14px] leading-relaxed font-body max-w-[520px]">
          {description}
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 pt-4 border-t border-white/15">
          {bullets.map((b, i) => {
            const Icon = ICONS[b.icon];
            return (
              <div key={i} className="flex items-center gap-2 text-[12px] text-white/90 font-body">
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                  <Icon size={12} />
                </span>
                <span className="font-medium">{b.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
