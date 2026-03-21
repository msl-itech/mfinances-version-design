import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testimonials = [
  {
    quote: "MFINANCES est aujourd'hui plus qu'un conseiller : c'est un vrai partenaire de confiance pour la gestion financière de mon entreprise. Je peux enfin lire et comprendre mes finances.",
    author: "Luc Jeazet",
    role: "Dirigeant d'entreprise, Bruxelles",
  },
  {
    quote: "C'est un service sérieux, humain et ultra rentable. Depuis que leur équipe s'occupe de mon dossier, je récupère chaque année des montants importants grâce à l'optimisation.",
    author: "Sandra",
    role: "Dirigeante, Bruxelles",
  },
  {
    quote: "Grâce à leurs conseils pratiques, j'ai mis en place un plan de trésorerie efficace pour piloter mes flux financiers. Je recommande vivement aux entrepreneurs qui veulent une vraie vision sur leurs finances.",
    author: "Rann Rann",
    role: "Entrepreneur, Bruxelles",
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-28" ref={ref}>
      <div className="container-mf">
        <h2 className={`font-display text-[22px] md:text-[36px] text-center mb-4 reveal ${isVisible ? "visible" : ""}`}>
          Ils nous font <span className="text-accent">confiance</span>
        </h2>

        <div className={`flex justify-center mb-12 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <a
            href="https://www.google.com/maps/place/MFinances"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-foreground/50 hover:text-foreground/70 transition-colors"
          >
            <span className="text-amber-400">★★★★★</span> 5,0/5 · 16 avis Google
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`bg-white rounded-2xl p-8 border border-border/40 hover:shadow-[0_8px_32px_rgba(27,43,94,0.08)] transition-shadow reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
            >
              <p className="text-[14px] text-foreground/65 leading-[1.75] italic">
                "{t.quote}"
              </p>
              <div className="mt-5 pt-4 border-t border-border/30">
                <p className="font-bold text-[14px] text-primary">{t.author}</p>
                <p className="text-[12px] text-foreground/40">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
