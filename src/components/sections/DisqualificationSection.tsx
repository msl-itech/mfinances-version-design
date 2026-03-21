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
    <section className="py-14 md:py-28 bg-card" ref={ref}>
      <div className="container-mf max-w-[960px]">
        <div className={`text-center mb-10 md:mb-14 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
            TRANSPARENCE
          </span>
          <h2 className="font-display text-[24px] md:text-[38px] leading-[1.12] mt-3">
            MFinances n'est peut-être
            <br className="hidden md:block" />
            <span className="text-accent">pas</span> le bon cabinet pour vous
          </h2>
          <p className="text-muted-foreground text-[14px] mt-4 max-w-[500px] mx-auto leading-relaxed">
            Nous préférons être honnêtes dès le départ — c'est le meilleur moyen de construire une relation de confiance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* NOT US */}
          <div
            className={`rounded-3xl overflow-hidden border border-accent/15 bg-gradient-to-b from-accent/[0.03] to-background reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="px-6 md:px-7 pt-6 md:pt-7 pb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <ShieldX size={20} className="text-accent" strokeWidth={1.5} />
              </div>
              <span className="font-bold text-accent text-[15px]">Ce n'est pas nous si…</span>
            </div>
            <div className="px-6 md:px-7 pb-6 md:pb-7 pt-4 space-y-4">
              {notUs.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <X size={11} className="text-accent" strokeWidth={3} />
                  </div>
                  <span className="text-[14px] text-muted-foreground leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* YES US */}
          <div
            className={`rounded-3xl overflow-hidden border-2 border-primary/20 bg-gradient-to-b from-primary/[0.04] to-background shadow-[0_4px_24px_rgba(27,43,94,0.06)] reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.25s" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-light" />
            <div className="px-6 md:px-7 pt-6 md:pt-7 pb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Handshake size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-bold text-primary text-[15px]">C'est nous si…</span>
            </div>
            <div className="px-6 md:px-7 pb-6 md:pb-7 pt-4 space-y-4">
              {yesUs.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check size={11} className="text-emerald-600" strokeWidth={3} />
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
