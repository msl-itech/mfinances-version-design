import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useEffect, useCallback } from "react";

const reviews = [
  { name: "Mari Carmen Rejas Martin", text: "Sans hésitation, je ne peux que recommander MFinances, tant pour son professionnalisme, son accueil, sa réactivité lors d'un doute, son humanité etc." },
  { name: "Audrey Pepka épouse Mbog", text: "Tellement satisfaite du service accordé par MFinances ! Je recommande vivement." },
  { name: "Luc Jeazet", text: "MFINANCES MERCI !! Avec Mika et sa merveilleuse équipe, mon entreprise a pris un vrai tournant." },
  { name: "rann rann", text: "En tant qu'entrepreneur à Bruxelles avec plusieurs activités dans des secteurs différents, j'avais besoin d'un accompagnement sur mesure. MFinances a parfaitement répondu à mes attentes." },
  { name: "fitness Move", text: "Super expérience avec MFINANCES ! En tant qu'indépendant basé à Lot, je n'ai aucune formation en finance et j'avais besoin d'un vrai accompagnement. Service impeccable." },
  { name: "Sandra", text: "Je fais appel à MFINANCES depuis plusieurs années pour ma déclaration d'impôt, et c'est l'une des meilleures décisions que j'ai prises." },
  { name: "Sophie acdp", text: "J'utilise les services de MFinances depuis près de 3 ans. Plus qu'un comptable, Mika se montre disponible pour mes questions et m'accompagne au quotidien." },
  { name: "Yannick Nguangu", text: "Mon entreprise se porte mieux grâce à Mfinances. Suivi et conseils exceptionnels et personnalisés : tout est clair et transparent." },
  { name: "Verdilamil", text: "J'ai la chance d'avoir croisé le chemin de MFINANCES. Cela fait déjà trois ans que je ne me fais plus de soucis pour ma comptabilité." },
  { name: "Rkia Chadili", text: "Excellent service, rapidité, efficacité, professionnalisme, bref tout ce qu'un(e) professionnel(le) a besoin pour mener son activité sereinement." },
  { name: "Paulo Verwacht", text: "En tant qu'étudiant on ne s'attend pas à devoir rentrer une déclaration d'impôts. Sans l'assistance de Mr Mika, je n'y serais jamais arrivé. Merci !" },
  { name: "Cindie Adonai", text: "Un service de qualité, mais surtout complet, ce qui est très rare. Je recommande à 100 %." },
  { name: "Hayat Karim", text: "MFinances fait preuve d'un sérieux et d'une précision exemplaire. Mika et ses collaborateurs sont très professionnels." },
  { name: "Magalie Kanga", text: "Service au top." },
  { name: "Pedro Soares", text: "Très satisfaits de leurs services. Des prix raisonnables et un service au top !" },
  { name: "The Global Bird", text: "Very nice staff, thank you!" },
];

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const maxPage = Math.ceil(reviews.length / perPage) - 1;

  const next = useCallback(() => setCurrent((c) => (c >= maxPage ? 0 : c + 1)), [maxPage]);
  const prev = useCallback(() => setCurrent((c) => (c <= 0 ? maxPage : c - 1)), [maxPage]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const visible = reviews.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="py-14 md:py-32 bg-card relative overflow-hidden" ref={ref}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 text-center font-display italic font-bold text-[140px] md:text-[240px] leading-none text-primary/[0.025] pointer-events-none select-none whitespace-nowrap"
      >
        Confiance
      </div>

      <div className="container-mf relative">
        <div className={`text-center mb-12 md:mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
              Témoignages
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-display text-[28px] md:text-[44px] leading-[1.08]">
            Ils nous font <span className="text-accent italic">confiance</span>
          </h2>
          <a
            href="https://www.google.com/maps/place/MFinances"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-secondary border border-border/50 text-[13px] text-foreground/70 hover:border-accent/30 hover:text-foreground transition-all"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold">5,0/5</span>
            <span className="text-muted-foreground">· {reviews.length} avis Google</span>
          </a>
        </div>

        <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {visible.map((r, i) => (
              <div
                key={`${current}-${i}`}
                className="group relative bg-secondary/60 border border-border/50 rounded-3xl p-7 flex flex-col gap-4 animate-fade-in transition-all duration-500 hover:bg-card hover:border-accent/20 hover:shadow-[0_16px_40px_rgba(27,43,94,0.08)] hover:-translate-y-1"
              >
                {/* Quote icon */}
                <Quote size={32} className="text-accent/15 absolute top-5 right-5 -scale-x-100" strokeWidth={1.5} />

                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-[14.5px] text-foreground/85 leading-[1.7] font-body flex-1">
                  {r.text}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light text-primary-foreground flex items-center justify-center text-[13px] font-bold flex-shrink-0">
                    {getInitials(r.name)}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-foreground leading-tight">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Avis Google vérifié</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="Avis précédents"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? "bg-accent w-8" : "bg-border w-2 hover:bg-muted-foreground"}`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              aria-label="Avis suivants"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
