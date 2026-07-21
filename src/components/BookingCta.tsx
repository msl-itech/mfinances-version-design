import { Button } from "@/components/ui/button";
import { CalendarCheck, ArrowRight } from "lucide-react";

const BOOKING_URL = "https://odoo.mfinances.be/appointment/11";

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
};

export default function BookingCta({
  eyebrow = "Consultation offerte",
  title = "Réservez 30 minutes avec Mika",
  description = "Un échange gratuit, confidentiel et sans engagement pour valider votre situation et vos prochaines étapes.",
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 text-center bg-primary text-primary-foreground shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.35)] ${className}`}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold uppercase tracking-[0.15em] font-body mb-3">
        <CalendarCheck size={13} />
        {eyebrow}
      </div>
      <h3 className="font-display text-[22px] sm:text-[26px] leading-[1.2] mb-2">{title}</h3>
      <p className="text-[13px] sm:text-[14px] text-primary-foreground/80 font-body max-w-[460px] mx-auto mb-5">
        {description}
      </p>
      <Button
        variant="accent"
        size="lg"
        className="rounded-full px-6 sm:px-8 group"
        asChild
      >
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Réserver mon rendez-vous
          <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
      <p className="text-[11px] text-primary-foreground/60 font-body italic mt-3">
        Premier échange gratuit · sans engagement
      </p>
    </div>
  );
}
