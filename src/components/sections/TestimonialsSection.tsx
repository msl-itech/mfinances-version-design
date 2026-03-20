import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testimonials = [
  {
    quote: "MFINANCES est aujourd'hui plus qu'un conseiller : c'est un vrai partenaire de confiance pour la gestion financière de mon entreprise. Je peux enfin lire et comprendre mes finances.",
    author: "Luc Jeazet",
    role: "Dirigeant d'entreprise, Bruxelles",
    tag: "Pilotage financier",
    tagBg: "bg-[#EBF5FB]",
    tagColor: "text-primary",
  },
  {
    quote: "C'est un service sérieux, humain et ultra rentable. Depuis que leur équipe s'occupe de mon dossier, je récupère chaque année des montants importants grâce à l'optimisation.",
    author: "Sandra",
    role: "Dirigeante, Bruxelles",
    tag: "Optimisation fiscale",
    tagBg: "bg-[#FFF0F0]",
    tagColor: "text-accent",
  },
  {
    quote: "Grâce à leurs conseils pratiques, j'ai mis en place un plan de trésorerie efficace pour piloter mes flux financiers. Je recommande vivement aux entrepreneurs qui veulent une vraie vision sur leurs finances.",
    author: "Rann Rann",
    role: "Entrepreneur, Bruxelles",
    tag: "Trésorerie",
    tagBg: "bg-[#F0FFF4]",
    tagColor: "text-[#1E8449]",
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-white py-20 md:py-[100px]" ref={ref}>
      <div className="container-mf">
        <h2 className={`font-display text-[28px] md:text-[36px] text-center reveal ${isVisible ? "visible" : ""}`}>
          Ils ont changé leur façon de piloter
        </h2>

        {/* Google badge */}
        <div className={`flex justify-center mt-6 mb-12 reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <a
            href="https://www.google.com/maps/place/MFinances"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-border rounded-3xl px-5 py-2 text-[14px] hover:shadow-md transition-shadow"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>5,0 <span className="text-amber-400">★★★★★</span> · 16 avis certifiés Google</span>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`relative bg-white rounded-[20px] p-9 shadow-[0_4px_24px_rgba(27,43,94,0.08)] reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              {/* Decorative quote */}
              <span className="font-display text-[96px] text-accent/15 absolute -top-3 left-4 leading-none select-none">
                "
              </span>

              <p className="italic text-[16px] text-[#444] leading-[1.7] relative z-10 mt-6">
                "{t.quote}"
              </p>

              <div className="mt-6 pt-4 border-t border-border/50">
                <p className="font-bold text-[14px] text-primary">{t.author}</p>
                <p className="text-[13px] text-muted-foreground">{t.role}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${t.tagBg} ${t.tagColor}`}>
                    {t.tag}
                  </span>
                  <span className="text-amber-400 text-[14px]">★★★★★</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-[12px] italic text-muted-foreground">
          Avis authentiques certifiés Google ·{" "}
          <a href="https://www.google.com/maps/place/MFinances" target="_blank" rel="noopener noreferrer" className="link-underline text-accent">
            Voir les 16 avis →
          </a>
        </p>
      </div>
    </section>
  );
}
