import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testimonials = [
  {
    quote: "MFINANCES est aujourd'hui plus qu'un conseiller : c'est un vrai partenaire de confiance pour la gestion financière de mon entreprise. Je peux enfin lire et comprendre mes finances.",
    author: "Luc Jeazet",
    role: "Dirigeant d'entreprise, Bruxelles",
    initials: "LJ",
  },
  {
    quote: "C'est un service sérieux, humain et ultra rentable. Depuis que leur équipe s'occupe de mon dossier, je récupère chaque année des montants importants grâce à l'optimisation.",
    author: "Sandra",
    role: "Dirigeante, Bruxelles",
    initials: "S",
  },
  {
    quote: "Grâce à leurs conseils pratiques, j'ai mis en place un plan de trésorerie efficace pour piloter mes flux financiers. Je recommande vivement aux entrepreneurs qui veulent une vraie vision sur leurs finances.",
    author: "Rann Rann",
    role: "Entrepreneur, Bruxelles",
    initials: "RR",
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-14 md:py-28 bg-card" ref={ref}>
      <div className="container-mf">
        <div className={`text-center mb-10 md:mb-14 reveal ${isVisible ? "visible" : ""}`}>
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
            <span>5,0/5 · 16 avis Google</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`relative bg-background rounded-2xl p-6 md:p-8 border border-border/30 hover:shadow-[0_8px_32px_rgba(27,43,94,0.06)] transition-all duration-300 reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
            >
              <Quote size={32} className="text-accent/10 mb-3" />
              <p className="text-[14px] text-foreground/70 leading-[1.8]">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[12px] font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-[14px] text-foreground">{t.author}</p>
                  <p className="text-[12px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
