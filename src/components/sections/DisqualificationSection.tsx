import { X, Check } from "lucide-react";
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
    <section className="py-16 md:py-24" ref={ref}>
      <div className="container-mf max-w-[900px]">
        <h2 className={`font-display text-[24px] md:text-[32px] text-center reveal ${isVisible ? "visible" : ""}`}>
          MFinances n'est peut-être <span className="text-accent">pas</span> le bon cabinet pour vous
        </h2>
        <p className={`text-center text-[14px] text-foreground/50 mt-3 mb-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          Nous préférons être clairs avec vous dès le départ.
        </p>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <div className="bg-white rounded-2xl overflow-hidden border border-border/40">
            <div className="bg-accent/5 px-6 py-3.5">
              <span className="font-bold text-accent text-[13px]">CE N'EST PAS NOUS SI…</span>
            </div>
            <div className="p-6 space-y-3.5">
              {notUs.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <X size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-[13px] text-foreground/55">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-border/40">
            <div className="bg-primary/5 px-6 py-3.5">
              <span className="font-bold text-primary text-[13px]">C'EST NOUS SI…</span>
            </div>
            <div className="p-6 space-y-3.5">
              {yesUs.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#27AE60] mt-0.5 flex-shrink-0" />
                  <span className="text-[13px] text-primary font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
