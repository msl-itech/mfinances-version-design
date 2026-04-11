import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useEffect, useCallback } from "react";

const reviews = [
  {
    name: "Mari Carmen Rejas Martin",
    text: "Sans hésitation, je ne peux que recommander MFinances, tant pour son professionnalisme, son accueil, sa réactivité lors d'un doute, son humanité etc.",
    date: "Il y a 5 semaines",
  },
  {
    name: "Audrey Pepka épouse Mbog",
    text: "Tellement satisfaite du service accordé par MFinances ! Je recommande vivement.",
    date: "Il y a 23 semaines",
  },
  {
    name: "Luc Jeazet",
    text: "MFINANCES MERCI !! Avec Mika et sa merveilleuse équipe, mon entreprise a pris un vrai tournant.",
    date: "Il y a 28 semaines",
  },
  {
    name: "rann rann",
    text: "En tant qu'entrepreneur à Bruxelles avec plusieurs activités dans des secteurs différents, j'avais besoin d'un accompagnement sur mesure. MFinances a parfaitement répondu à mes attentes.",
    date: "Il y a 28 semaines",
  },
  {
    name: "fitness Move",
    text: "Super expérience avec MFINANCES ! En tant qu'indépendant basé à Lot, je n'ai aucune formation en finance et j'avais besoin d'un vrai accompagnement. Service impeccable.",
    date: "Il y a 28 semaines",
  },
  {
    name: "Sandra",
    text: "Je fais appel à MFINANCES depuis plusieurs années pour ma déclaration d'impôt, et c'est l'une des meilleures décisions que j'ai prises.",
    date: "Il y a 28 semaines",
  },
  {
    name: "Sophie acdp",
    text: "J'utilise les services de MFinances depuis près de 3 ans. Plus qu'un comptable, Mika se montre disponible pour mes questions et m'accompagne au quotidien.",
    date: "Il y a 28 semaines",
  },
  {
    name: "Yannick Nguangu",
    text: "Mon entreprise se porte mieux grâce à Mfinances. Suivi et conseils exceptionnels et personnalisés : tout est clair et transparent.",
    date: "Il y a 29 semaines",
  },
  {
    name: "Verdilamil",
    text: "J'ai la chance d'avoir croisé le chemin de MFINANCES. Cela fait déjà trois ans que je ne me fais plus de soucis pour ma comptabilité.",
    date: "Il y a 30 semaines",
  },
  {
    name: "Rkia Chadili",
    text: "Excellent service, rapidité, efficacité, professionnalisme, bref tout ce qu'un(e) professionnel(le) a besoin pour mener son activité sereinement.",
    date: "Il y a 30 semaines",
  },
  {
    name: "Paulo Verwacht",
    text: "En tant qu'étudiant on ne s'attend pas à devoir rentrer une déclaration d'impôts. Sans l'assistance de Mr Mika, je n'y serais jamais arrivé. Merci !",
    date: "Il y a 31 semaines",
  },
  {
    name: "Cindie Adonai",
    text: "Un service de qualité, mais surtout complet, ce qui est très rare. Je recommande à 100 %.",
    date: "Il y a 32 semaines",
  },
  {
    name: "Hayat Karim",
    text: "MFinances fait preuve d'un sérieux et d'une précision exemplaire. Mika et ses collaborateurs sont très professionnels.",
    date: "Il y a 32 semaines",
  },
  {
    name: "Magalie Kanga",
    text: "Service au top.",
    date: "27 août 2024",
  },
  {
    name: "Pedro Soares",
    text: "Très satisfaits de leurs services. Des prix raisonnables et un service au top !",
    date: "18 déc. 2020",
  },
  {
    name: "The Global Bird",
    text: "Very nice staff, thank you!",
    date: "23 déc. 2020",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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
    <section className="py-10 md:py-28 bg-card" ref={ref}>
      <div className="container-mf">
        <div className={`text-center mb-8 md:mb-14 reveal ${isVisible ? "visible" : ""}`}>
          <span className="text-accent text-[11px] font-bold tracking-[0.15em] uppercase">
            TÉMOIGNAGES
          </span>
          <h2 className="font-display text-[24px] md:text-[38px] mt-3 leading-[1.15]">
            Ils nous font <span className="text-accent">confiance</span>
          </h2>
          <a
            href="https://www.google.com/maps/place/MFinances"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>5,0/5 · {reviews.length} avis Google</span>
          </a>
        </div>

        <div className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visible.map((r, i) => (
              <div
                key={`${current}-${i}`}
                className="bg-secondary/60 border border-border/50 rounded-2xl p-6 flex flex-col gap-4 animate-fade-in"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[13px] font-bold flex-shrink-0">
                    {getInitials(r.name)}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-foreground leading-tight">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[14px] text-foreground/80 leading-relaxed font-body flex-1">
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Avis précédents"
            >
              <ChevronLeft size={18} className="text-muted-foreground" />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-border"}`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Avis suivants"
            >
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
