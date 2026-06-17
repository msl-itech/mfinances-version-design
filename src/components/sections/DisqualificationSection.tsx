import { X, Check, ShieldX, Handshake } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import MobileCarousel from "@/components/MobileCarousel";

const notUs = [
  "Vous cherchez le comptable le moins cher possible",
  "Vous voulez juste déposer vos documents et ne plus y penser",
  "Vous n'êtes pas prêt à investir dans le pilotage de votre entreprise",
  "Vous préférez découvrir votre situation en fin d'année",
];

const yesUs = [
  "Vous voulez comprendre vos chiffres et prendre de meilleures décisions",
  "Vous cherchez un partenaire, pas un simple prestataire",
  "Vous êtes prêt à structurer votre gestion pour grandir sereinement",
  "Vous voulez anticiper plutôt que subir",
];

function DisqualCard({ items, type }: { items: string[]; type: "not" | "yes" }) {
  const isNot = type === "not";
  return (
    <div
      className={`group relative rounded-3xl overflow-hidden h-full transition-all duration-500 ${
        isNot
          ? "bg-card border border-accent/20 hover:shadow-[0_16px_40px_rgba(232,57,58,0.08)]"
          : "bg-primary text-primary-foreground shadow-[0_16px_50px_rgba(27,43,94,0.18)] hover:shadow-[0_24px_70px_rgba(27,43,94,0.25)]"
      }`}
    >
      {!isNot && (
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-[240px] h-[240px] rounded-full opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 60%)" }}
        />
      )}

      <div className="relative px-7 md:px-8 pt-8 pb-2 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-6deg] ${
            isNot
              ? "bg-accent/10"
              : "bg-accent shadow-[0_8px_24px_rgba(232,57,58,0.35)]"
          }`}
        >
          {isNot ? (
            <ShieldX size={22} className="text-accent" strokeWidth={1.5} />
          ) : (
            <Handshake size={22} className="text-accent-foreground" strokeWidth={1.75} />
          )}
        </div>
        <div>
          <span
            className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
              isNot ? "text-accent" : "text-accent"
            }`}
          >
            {isNot ? "Pas pour vous" : "Pour vous"}
          </span>
          <h3
            className={`font-display text-[20px] md:text-[22px] leading-tight mt-0.5 ${
              isNot ? "text-primary" : "text-primary-foreground"
            }`}
          >
            {isNot ? "Ce n'est pas nous si…" : "C'est nous si…"}
          </h3>
        </div>
      </div>

      <div className="relative px-7 md:px-8 pb-8 pt-5 space-y-4">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                isNot ? "bg-accent/10" : "bg-accent"
              }`}
            >
              {isNot ? (
                <X size={11} className="text-accent" strokeWidth={3} />
              ) : (
                <Check size={11} className="text-accent-foreground" strokeWidth={3} />
              )}
            </div>
            <span
              className={`text-[14px] leading-snug ${
                isNot ? "text-muted-foreground" : "text-primary-foreground/85"
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DisqualificationSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-8 md:py-14 bg-card relative overflow-hidden" ref={ref}>
      <div
        aria-hidden="true" data-anim="text-scrub" data-scrub-dir="right"
        className="absolute inset-x-0 top-10 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.025] pointer-events-none select-none whitespace-nowrap"
      >
        Honnêteté
      </div>

      <div className="container-mf max-w-[1000px] relative">
        <div className={`text-center mb-12 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent/75 text-[11px] font-bold tracking-[0.2em] uppercase">
              Transparence
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-display text-[28px] md:text-[44px] leading-[1.08]">
            MFinances n'est peut-être
            <br className="hidden md:block" />
            <span className="text-accent italic">pas</span> le bon cabinet pour vous
          </h2>
          <p className="text-muted-foreground text-[14px] mt-5 max-w-[520px] mx-auto leading-[1.7]">
            Nous préférons être honnêtes dès le départ — c'est le meilleur moyen de construire une relation de confiance.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <DisqualCard items={notUs} type="not" />
          </div>
          <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.25s" }}>
            <DisqualCard items={yesUs} type="yes" />
          </div>
        </div>

        {/* Mobile carousel */}
        <div className={`md:hidden reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          <MobileCarousel>
            <DisqualCard items={notUs} type="not" />
            <DisqualCard items={yesUs} type="yes" />
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}
