import { Link } from "react-router-dom";
import { FileText, Activity, Calendar, ArrowUpRight } from "lucide-react";
import checklistImg from "@/assets/service-tresorerie.jpg";
import diagnosticImg from "@/assets/daf-dashboard.jpg";
import rdvImg from "@/assets/mika-contact.png";

export default function EntryPointsBentoSection() {
  return (
    <section className="py-16 md:py-28 bg-secondary relative overflow-hidden">
      {/* Watermark */}
      <div
        aria-hidden="true" data-anim="text-scrub"
        className="absolute -top-10 left-0 right-0 text-center font-display font-bold text-[180px] md:text-[280px] leading-none text-primary/[0.025] pointer-events-none select-none whitespace-nowrap"
      >
        START
      </div>

      <div className="container-mf relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-anim="fade-up">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
              3 façons de commencer
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-display text-[28px] md:text-[44px] leading-[1.1] max-w-[720px] mx-auto text-primary">
            Par où <span className="text-accent italic">commencer</span> ?
          </h2>
          <p className="text-muted-foreground text-[15px] mt-4 max-w-[480px] mx-auto leading-relaxed">
            Choisissez votre premier pas — chaque option est gratuite et sans engagement.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5 md:auto-rows-[200px]">
          {/* CARD 1 — Checklist (top-left) */}
          <Link
            to="/checklist-tresorerie/"
            className="group relative md:col-span-1 md:row-span-1 bg-card rounded-3xl overflow-hidden border border-border/50 shadow-[0_2px_12px_rgba(27,43,94,0.04)] hover:shadow-[0_16px_50px_rgba(27,43,94,0.12)] transition-all duration-500 flex flex-col min-h-[260px]"
            data-anim="fade-up"
          >
            <div className="relative h-32 md:h-28 overflow-hidden shrink-0">
              <img
                src={checklistImg}
                alt="Checklist trésorerie"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-card/90 backdrop-blur flex items-center justify-center shadow-md">
                <FileText size={18} className="text-primary" strokeWidth={1.75} />
              </div>
              <span className="absolute top-3 right-3 text-[10px] font-bold tracking-[0.12em] uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                PDF gratuit
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-[19px] font-bold text-primary leading-tight">
                Checklist gratuite
              </h3>
              <p className="text-[13px] text-muted-foreground mt-2 leading-[1.6] flex-1">
                Les 5 erreurs silencieuses qui vident la trésorerie — identifiez-les en 2 minutes.
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-primary">
                  Télécharger le PDF
                </span>
                <span className="w-8 h-8 rounded-full bg-primary/[0.06] text-primary flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45">
                  <ArrowUpRight size={14} strokeWidth={2} />
                </span>
              </div>
            </div>
          </Link>

          {/* CARD 2 — Diagnostic (FEATURED, spans full height) */}
          <Link
            to="/diagnostic/"
            className="group relative md:col-span-1 md:row-span-2 bg-primary rounded-3xl overflow-hidden border border-accent/40 shadow-[0_8px_32px_rgba(232,57,58,0.12)] hover:shadow-[0_24px_70px_rgba(232,57,58,0.22)] transition-all duration-500 flex flex-col min-h-[420px]"
            data-anim="fade-up"
            data-delay="0.1"
          >
            <div className="relative flex-1 overflow-hidden">
              <img
                src={diagnosticImg}
                alt="Diagnostic trésorerie"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />

              {/* Badge recommandé */}
              <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.12em] uppercase shadow-lg">
                ★ Recommandé
              </span>

              {/* Icon */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-[0_8px_24px_rgba(232,57,58,0.4)] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                <Activity size={22} className="text-accent-foreground" strokeWidth={1.75} />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-primary-foreground">
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-accent mb-3">
                  — 02 / Diagnostic
                </div>
                <h3 className="font-display text-[26px] md:text-[30px] font-bold leading-[1.05]">
                  Diagnostic <span className="italic text-accent">trésorerie</span>
                </h3>
                <p className="text-[13.5px] text-primary-foreground/80 mt-3 leading-[1.6] max-w-[300px]">
                  8 questions · 3 minutes · Score instantané de votre santé financière.
                </p>

                <div className="mt-5 flex items-center gap-3 text-accent">
                  <span className="text-[13px] font-bold uppercase tracking-[0.1em]">
                    Lancer le diagnostic
                  </span>
                  <span className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center transition-all duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={15} strokeWidth={2} />
                  </span>
                </div>
                <p className="mt-3 text-[10px] text-primary-foreground/55 font-bold tracking-[0.15em] uppercase">
                  Résultat immédiat
                </p>
              </div>
            </div>
          </Link>

          {/* CARD 3 — RDV (top-right) */}
          <Link
            to="/contact/"
            className="group relative md:col-span-1 md:row-span-1 bg-card rounded-3xl overflow-hidden border border-border/50 shadow-[0_2px_12px_rgba(27,43,94,0.04)] hover:shadow-[0_16px_50px_rgba(27,43,94,0.12)] transition-all duration-500 flex flex-col min-h-[260px]"
            data-anim="fade-up"
            data-delay="0.15"
          >
            <div className="relative h-44 md:h-40 overflow-hidden shrink-0">
              <img
                src={rdvImg}
                alt="Mika MFinances"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ objectPosition: "center 22%" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-card/90 backdrop-blur flex items-center justify-center shadow-md">
                <Calendar size={18} className="text-primary" strokeWidth={1.75} />
              </div>
              <span className="absolute top-3 right-3 text-[10px] font-bold tracking-[0.12em] uppercase bg-card/90 backdrop-blur text-primary px-2.5 py-1 rounded-full shadow-sm">
                30 min
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-[19px] font-bold text-primary leading-tight">
                Rendez-vous gratuit
              </h3>
              <p className="text-[13px] text-muted-foreground mt-2 leading-[1.6] flex-1">
                30 min avec Mika. Confidentiel, personnalisé, sans engagement.
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-primary">
                  Réserver un créneau
                </span>
                <span className="w-8 h-8 rounded-full bg-primary/[0.06] text-primary flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45">
                  <ArrowUpRight size={14} strokeWidth={2} />
                </span>
              </div>
            </div>
          </Link>

          {/* CARD 4 — Reassurance band (bottom-left, spans 1) */}
          <div className="hidden md:flex md:col-span-1 md:row-span-1 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] rounded-3xl border border-border/40 p-6 flex-col justify-center">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-accent mb-3">
              — Notre promesse
            </p>
            <p className="font-display text-[20px] text-primary leading-[1.2]">
              Réponse <span className="italic text-accent">sous 72h</span>, toujours.
            </p>
            <p className="text-[12.5px] text-muted-foreground mt-2 leading-[1.55]">
              Confidentialité totale. Aucun engagement. Conseil concret dès le 1er échange.
            </p>
          </div>

          {/* CARD 5 — Trust band (bottom-right) */}
          <div className="hidden md:flex md:col-span-1 md:row-span-1 bg-primary text-primary-foreground rounded-3xl p-6 flex-col justify-center relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-6 -right-6 font-display italic font-bold text-[120px] leading-none text-accent/10 select-none"
            >
              5.0
            </div>
            <div className="relative">
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent text-[14px]">★</span>
                ))}
              </div>
              <p className="font-display text-[20px] leading-[1.2]">
                <span className="italic text-accent">200+</span> dirigeants accompagnés
              </p>
              <p className="text-[12px] text-primary-foreground/65 mt-2 leading-[1.55]">
                16 avis Google · 5,0/5 · 20 ans d'expertise comptable à Bruxelles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
