import { X, Check, ShieldX, Handshake } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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

export default function DisqualificationSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-28 bg-background" ref={ref}>
      <div className="container-mf max-w-[960px]">
        <p className={`text-center text-accent text-[13px] font-semibold tracking-widest uppercase mb-4 reveal ${isVisible ? "visible" : ""}`}>
          Transparence
        </p>
        <h2 className={`font-display text-[22px] md:text-[36px] text-center leading-[1.15] reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.05s" }}>
          MFinances n'est peut-être <br className="hidden md:block" />
          <span className="text-accent">pas</span> le bon cabinet pour vous
        </h2>
        <p className={`text-center text-[14px] text-foreground/50 mt-4 mb-8 md:mb-14 max-w-[520px] mx-auto leading-relaxed reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          Nous préférons être honnêtes dès le départ — c'est le meilleur moyen de construire une relation de confiance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NOT US */}
          <div
            className={`relative rounded-3xl overflow-hidden border border-accent/15 bg-gradient-to-b from-accent/[0.03] to-white shadow-[0_2px_16px_rgba(232,57,58,0.04)] reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="px-5 md:px-7 pt-5 md:pt-7 pb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <ShieldX size={20} className="text-accent" strokeWidth={1.5} />
              </div>
              <span className="font-bold text-accent text-[15px] tracking-wide">Ce n'est pas nous si…</span>
            </div>
            <div className="px-5 md:px-7 pb-5 md:pb-7 pt-4 space-y-3 md:space-y-4">
              {notUs.map((item, i) => (
                <div key={item} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <X size={12} className="text-accent" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] text-foreground/60 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* YES US */}
          <div
            className={`relative rounded-3xl overflow-hidden border-2 border-primary/20 bg-gradient-to-b from-primary/[0.04] to-white shadow-[0_4px_24px_rgba(27,43,94,0.08)] reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.25s" }}
          >
            {/* Subtle accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-light" />
            <div className="px-7 pt-7 pb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Handshake size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-bold text-primary text-[15px] tracking-wide">C'est nous si…</span>
            </div>
            <div className="px-7 pb-7 pt-4 space-y-4">
              {yesUs.map((item, i) => (
                <div key={item} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check size={12} className="text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] text-primary font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
