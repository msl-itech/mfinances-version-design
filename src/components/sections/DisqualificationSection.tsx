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
    <section className="bg-background py-16 md:py-20" ref={ref}>
      <div className="container-mf max-w-[900px]">
        <h2 className={`font-display text-[26px] md:text-[32px] text-center reveal ${isVisible ? "visible" : ""}`}>
          MFinances n'est peut-être pas le bon cabinet pour vous
        </h2>
        <p className={`text-center italic text-[16px] text-[#555] mt-3 mb-10 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          Nous préférons être clairs avec vous dès le départ.
        </p>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          {/* Not us */}
          <div className="rounded-xl overflow-hidden border border-border">
            <div className="bg-[#FFF0F0] px-6 py-3.5">
              <span className="font-bold text-accent text-[14px]">CE N'EST PAS NOUS SI…</span>
            </div>
            <div className="p-6 space-y-4 bg-white">
              {notUs.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <X size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-[#555]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Yes us */}
          <div className="rounded-xl overflow-hidden border border-border">
            <div className="bg-[#EBF5FB] px-6 py-3.5">
              <span className="font-bold text-primary text-[14px]">C'EST NOUS SI…</span>
            </div>
            <div className="p-6 space-y-4 bg-white">
              {yesUs.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check size={16} className="text-[#27AE60] mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-primary font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
