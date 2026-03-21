import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import mikaPhoto from "@/assets/mika-musungayi.png";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const situations = [
  { emoji: "👤", label: "Particulier — déclaration d'impôt" },
  { emoji: "🌱", label: "Je souhaite devenir indépendant" },
  { emoji: "💼", label: "Indépendant en personne physique" },
  { emoji: "🏗️", label: "En train de créer une société" },
  { emoji: "🏢", label: "J'ai déjà une société active" },
  { emoji: "❓", label: "Autre" },
];

const besoins = [
  { emoji: "📊", label: "Comptabilité et déclarations fiscales" },
  { emoji: "💰", label: "Optimisation fiscale" },
  { emoji: "💸", label: "Trésorerie et pilotage financier" },
  { emoji: "🚀", label: "Création d'entreprise" },
  { emoji: "🎯", label: "DAF à temps partiel" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {[1, 2, 3].map((step, i) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold font-body transition-colors ${
              step === current
                ? "bg-accent text-accent-foreground"
                : step < current
                ? "bg-primary text-primary-foreground"
                : "bg-border text-muted-foreground"
            }`}
          >
            {step}
          </div>
          {i < 2 && (
            <div
              className={`w-10 h-0.5 ${
                step < current ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function Contact() {
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState("");
  const [besoin, setBesoin] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contactez MFinances — Expert-Comptable Bruxelles | Consultation Gratuite";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Prenez rendez-vous avec MFinances, cabinet d'expertise comptable à Uccle, Bruxelles. Consultation gratuite sous 72h.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/contact/";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // POST to Odoo would go here
    console.log({
      prenom, nom, email, telephone, message,
      situation, besoin, source: "formulaire-contact",
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* LEFT — Coordonnées (2/5) */}
            <div className="lg:col-span-2">
              <ScrollRevealDiv>
                <h1 className="font-display text-[32px] md:text-[40px] leading-[1.12] text-foreground">
                  Parlons de votre entreprise
                </h1>
                <p className="text-accent font-display italic text-[17px] mt-2">
                  Premier échange gratuit, confidentiel et sans engagement.
                </p>

                {/* Mika */}
                <div className="mt-8 bg-secondary/60 rounded-2xl p-5 border border-border/50">
                  <img
                    src={mikaPhoto}
                    alt="Mika Musungayi, fondateur MFinances"
                    className="w-full h-[200px] object-cover object-top rounded-xl"
                  />
                  <p className="text-[14px] italic text-muted-foreground leading-relaxed mt-4 font-body">
                    "Je rappelle personnellement chaque nouveau contact sous 72h."
                  </p>
                  <p className="text-[13px] font-semibold text-foreground mt-2 font-body">
                    — Mika Musungayi, fondateur MFinances
                  </p>
                </div>

                {/* Contact blocs */}
                <div className="mt-8 space-y-4">
                  <a
                    href="tel:+3228860550"
                    className="flex items-start gap-3 p-4 rounded-xl bg-secondary/60 border border-border/50 hover:bg-secondary transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-foreground font-body">+32 2 886 05 50</p>
                      <p className="text-[12px] text-muted-foreground font-body">Lun-Ven 9h-18h</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@mfinances.be"
                    className="flex items-start gap-3 p-4 rounded-xl bg-secondary/60 border border-border/50 hover:bg-secondary transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-foreground font-body">info@mfinances.be</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/60 border border-border/50">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-foreground font-body">20 Rue de la Magnanerie</p>
                      <p className="text-[12px] text-muted-foreground font-body">1180 Uccle, Bruxelles</p>
                    </div>
                  </div>
                </div>

                {/* Badge Google */}
                <a
                  href="https://g.page/mfinances"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary/60 border border-border/50 hover:bg-secondary transition-colors"
                >
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[13px] font-semibold text-foreground font-body">
                    5,0 / 5 · 16 avis Google →
                  </span>
                </a>
              </ScrollRevealDiv>
            </div>

            {/* RIGHT — Formulaire (3/5) */}
            <div className="lg:col-span-3">
              <ScrollRevealDiv delay={0.1}>
                <div className="bg-card rounded-3xl p-7 md:p-10 shadow-[0_4px_24px_rgba(27,43,94,0.08)] border border-border/50">
                  {submitted ? (
                    /* CONFIRMATION */
                    <div className="text-center py-8">
                      <CheckCircle size={56} className="text-green-500 mx-auto mb-5" strokeWidth={1.5} />
                      <h3 className="font-display text-[26px] text-foreground">
                        C'est envoyé, {prenom} !
                      </h3>
                      <p className="text-muted-foreground text-[15px] leading-relaxed mt-4 font-body max-w-[400px] mx-auto">
                        Mika vous rappelle personnellement sous 72h pour un premier échange gratuit, confidentiel et sans engagement.
                      </p>
                      <Button variant="accent" size="lg" className="rounded-full mt-8" asChild>
                        <Link to="/diagnostic/">
                          En attendant, faire le diagnostic
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <StepIndicator current={step} />

                      {/* STEP 1 */}
                      {step === 1 && (
                        <div>
                          <p className="text-[12px] font-bold text-accent uppercase tracking-wider font-body mb-1">Étape 1/3 — Votre situation actuelle</p>
                          <h3 className="font-display text-[22px] text-foreground mb-6">Commençons par vous connaître</h3>
                          <div className="space-y-2.5">
                            {situations.map((s) => (
                              <button
                                key={s.label}
                                onClick={() => setSituation(s.label)}
                                className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all font-body text-[14px] ${
                                  situation === s.label
                                    ? "border-accent bg-accent/5 text-foreground font-semibold"
                                    : "border-border/50 bg-card text-foreground/80 hover:border-border"
                                }`}
                              >
                                <span className="mr-2.5">{s.emoji}</span>
                                {s.label}
                              </button>
                            ))}
                          </div>
                          <Button
                            variant="accent"
                            size="lg"
                            className="rounded-full w-full mt-6"
                            disabled={!situation}
                            onClick={() => setStep(2)}
                          >
                            Continuer
                            <ArrowRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      )}

                      {/* STEP 2 */}
                      {step === 2 && (
                        <div>
                          <p className="text-[12px] font-bold text-accent uppercase tracking-wider font-body mb-1">Étape 2/3 — Votre besoin principal</p>
                          <h3 className="font-display text-[22px] text-foreground mb-6">Qu'est-ce qui vous préoccupe le plus ?</h3>
                          <div className="space-y-2.5">
                            {besoins.map((b) => (
                              <button
                                key={b.label}
                                onClick={() => setBesoin(b.label)}
                                className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all font-body text-[14px] ${
                                  besoin === b.label
                                    ? "border-accent bg-accent/5 text-foreground font-semibold"
                                    : "border-border/50 bg-card text-foreground/80 hover:border-border"
                                }`}
                              >
                                <span className="mr-2.5">{b.emoji}</span>
                                {b.label}
                              </button>
                            ))}
                          </div>
                          <Button
                            variant="accent"
                            size="lg"
                            className="rounded-full w-full mt-6"
                            disabled={!besoin}
                            onClick={() => setStep(3)}
                          >
                            Continuer
                            <ArrowRight size={16} className="ml-1" />
                          </Button>
                          <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors mt-4 mx-auto font-body"
                          >
                            <ArrowLeft size={14} />
                            Étape précédente
                          </button>
                        </div>
                      )}

                      {/* STEP 3 */}
                      {step === 3 && (
                        <form onSubmit={handleSubmit}>
                          <p className="text-[12px] font-bold text-accent uppercase tracking-wider font-body mb-1">Étape 3/3 — Vos coordonnées</p>
                          <h3 className="font-display text-[22px] text-foreground mb-6">Comment vous rappeler ?</h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[13px] font-semibold text-foreground mb-1.5 font-body">Prénom *</label>
                              <input
                                type="text"
                                required
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body focus:border-accent focus:outline-none transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-[13px] font-semibold text-foreground mb-1.5 font-body">Nom *</label>
                              <input
                                type="text"
                                required
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body focus:border-accent focus:outline-none transition-colors"
                              />
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-[13px] font-semibold text-foreground mb-1.5 font-body">Email professionnel *</label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body focus:border-accent focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="mt-4">
                            <label className="block text-[13px] font-semibold text-foreground mb-1.5 font-body">Téléphone *</label>
                            <input
                              type="tel"
                              required
                              value={telephone}
                              onChange={(e) => setTelephone(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body focus:border-accent focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="mt-4">
                            <label className="block text-[13px] font-semibold text-foreground mb-1.5 font-body">Message (optionnel)</label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={3}
                              placeholder="Décrivez votre situation en 2 lignes..."
                              className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body focus:border-accent focus:outline-none transition-colors resize-none"
                            />
                          </div>

                          <Button
                            variant="accent"
                            size="lg"
                            type="submit"
                            className="rounded-full w-full mt-6 whitespace-normal text-center leading-snug"
                          >
                            Envoyer ma demande — Mika me rappelle sous 72h
                            <ArrowRight size={16} className="ml-1 flex-shrink-0" />
                          </Button>

                          <p className="text-[12px] italic text-muted-foreground text-center mt-3 font-body">
                            Premier échange gratuit, confidentiel et sans engagement. Mika vous rappelle personnellement.
                          </p>

                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors mt-4 mx-auto font-body"
                          >
                            <ArrowLeft size={14} />
                            Étape précédente
                          </button>
                        </form>
                      )}
                    </>
                  )}
                </div>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
