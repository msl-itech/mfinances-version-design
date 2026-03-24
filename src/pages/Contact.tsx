import { useEffect, useState } from "react";
import { submitLead } from "@/lib/odoo-submit";
import { Link } from "react-router-dom";
import { createBreadcrumbSchema } from "@/lib/seo-schemas";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import mikaPhoto from "@/assets/mika-contact.png";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  Clock,
  MessageCircle,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const situations = [
  { emoji: "👤", label: "Particulier — j'ai besoin d'aide pour ma déclaration d'impôt" },
  { emoji: "🌱", label: "Je souhaite devenir indépendant" },
  { emoji: "💼", label: "Je suis déjà indépendant en personne physique" },
  { emoji: "🏗️", label: "Je suis en train de créer une société" },
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

function ProgressBar({ current }: { current: number }) {
  const progress = (current / 3) * 100;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold font-body transition-all duration-300 ${
                step === current
                  ? "bg-accent text-accent-foreground shadow-md scale-110"
                  : step < current
                  ? "bg-primary text-primary-foreground"
                  : "bg-border text-muted-foreground"
              }`}
            >
              {step < current ? "✓" : step}
            </div>
            <span className={`text-[12px] font-body hidden sm:inline ${
              step === current ? "text-foreground font-semibold" : "text-muted-foreground"
            }`}>
              {step === 1 ? "Situation" : step === 2 ? "Besoin" : "Coordonnées"}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const descParts = [
      `📋 Lead Formulaire Contact`,
      `\n👤 Situation: ${situation}`,
      `🎯 Besoin: ${besoin}`,
      `\n📞 Téléphone: ${telephone}`,
      message ? `💬 Message: ${message}` : "",
      `\nSource: Formulaire Contact - Site MFinances`,
    ].filter(Boolean);

    await submitLead({
      name: `${prenom} ${nom}`,
      email_from: email,
      phone: telephone,
      description: descParts.join("\n"),
    });

    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact — Expert-Comptable Bruxelles | MFinances"
        description="Prenez rendez-vous avec MFinances, cabinet d'expertise comptable à Uccle, Bruxelles. Consultation gratuite sous 72h."
        canonical="https://mfinances.be/contact/"
        schemaJson={createBreadcrumbSchema([
          { name: "Accueil", url: "https://mfinances.be/" },
          { name: "Contact", url: "https://mfinances.be/contact/" },
        ])}
      />
      <Header />

      <main>
        {/* Hero banner */}
        <section className="bg-primary text-primary-foreground py-14 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.12),transparent_60%)]" />
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 relative z-10 text-center">
            <ScrollRevealDiv>
              <p className="text-accent font-body text-[13px] font-bold uppercase tracking-widest mb-4">
                Premier échange gratuit
              </p>
              <h1 className="font-display text-[32px] md:text-[46px] leading-[1.1] max-w-[700px] mx-auto">
                Parlons de votre entreprise
              </h1>
              <p className="text-primary-foreground/70 font-body text-[16px] md:text-[18px] mt-4 max-w-[560px] mx-auto leading-relaxed">
                Décrivez-nous votre situation en 2 minutes. Mika vous rappelle personnellement sous 72h — gratuit, confidentiel, sans engagement.
              </p>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* 3 contact methods */}
        <section className="bg-background py-10 md:py-14">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <a
                  href="tel:+3228860550"
                  className="group flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Phone size={22} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[17px] text-foreground">Par téléphone</h3>
                  <p className="text-[15px] font-semibold text-foreground mt-1 font-body">+32 2 886 05 50</p>
                  <p className="text-[12px] text-muted-foreground font-body mt-1">Lun-Ven · 9h-18h</p>
                </a>

                <a
                  href="mailto:info@mfinances.be"
                  className="group flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Mail size={22} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[17px] text-foreground">Par email</h3>
                  <p className="text-[15px] font-semibold text-foreground mt-1 font-body">info@mfinances.be</p>
                  <p className="text-[12px] text-muted-foreground font-body mt-1">Réponse sous 24h</p>
                </a>

                <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <MapPin size={22} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[17px] text-foreground">En personne</h3>
                  <p className="text-[15px] font-semibold text-foreground mt-1 font-body">20 Rue de la Magnanerie</p>
                  <p className="text-[12px] text-muted-foreground font-body mt-1">1180 Uccle · Sur RDV uniquement</p>
                </div>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="bg-background pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* LEFT — Formulaire (3/5) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <ScrollRevealDiv>
                <div className="bg-card rounded-3xl p-7 md:p-10 shadow-[0_8px_40px_rgba(27,43,94,0.08)] border border-border/50">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle size={32} className="text-green-600" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-[28px] text-foreground">
                        Merci {prenom} !
                      </h3>
                      <p className="text-muted-foreground text-[15px] leading-relaxed mt-4 font-body max-w-[420px] mx-auto">
                        Mika vous rappelle personnellement sous 72h pour un premier échange gratuit, confidentiel et sans engagement.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <Button variant="accent" size="lg" className="rounded-full" asChild>
                          <Link to="/diagnostic/">
                            Faire le diagnostic gratuit
                            <ArrowRight size={16} className="ml-1" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full" asChild>
                          <Link to="/">Retour à l'accueil</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ProgressBar current={step} />

                      {/* STEP 1 */}
                      {step === 1 && (
                        <div>
                          <p className="text-[12px] font-bold text-accent uppercase tracking-wider font-body mb-1">
                            Étape 1 sur 3
                          </p>
                          <h2 className="font-display text-[24px] text-foreground mb-2">
                            Quelle est votre situation actuelle ?
                          </h2>
                          <p className="text-muted-foreground text-[14px] font-body mb-6">
                            Sélectionnez l'option qui vous correspond le mieux.
                          </p>
                          <div className="space-y-2.5">
                            {situations.map((s) => (
                              <button
                                key={s.label}
                                onClick={() => setSituation(s.label)}
                                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-body text-[14px] flex items-center gap-3 ${
                                  situation === s.label
                                    ? "border-accent bg-accent/5 text-foreground font-semibold shadow-sm"
                                    : "border-border/50 bg-card text-foreground/80 hover:border-border hover:bg-secondary/40"
                                }`}
                              >
                                <span className="text-[18px] flex-shrink-0">{s.emoji}</span>
                                {s.label}
                              </button>
                            ))}
                          </div>
                          <Button
                            variant="accent"
                            size="lg"
                            className="rounded-full w-full mt-7 text-[15px]"
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
                          <p className="text-[12px] font-bold text-accent uppercase tracking-wider font-body mb-1">
                            Étape 2 sur 3
                          </p>
                          <h2 className="font-display text-[24px] text-foreground mb-2">
                            Quel est votre besoin principal ?
                          </h2>
                          <p className="text-muted-foreground text-[14px] font-body mb-6">
                            Qu'est-ce qui vous préoccupe le plus en ce moment ?
                          </p>
                          <div className="space-y-2.5">
                            {besoins.map((b) => (
                              <button
                                key={b.label}
                                onClick={() => setBesoin(b.label)}
                                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-body text-[14px] flex items-center gap-3 ${
                                  besoin === b.label
                                    ? "border-accent bg-accent/5 text-foreground font-semibold shadow-sm"
                                    : "border-border/50 bg-card text-foreground/80 hover:border-border hover:bg-secondary/40"
                                }`}
                              >
                                <span className="text-[18px] flex-shrink-0">{b.emoji}</span>
                                {b.label}
                              </button>
                            ))}
                          </div>
                          <Button
                            variant="accent"
                            size="lg"
                            className="rounded-full w-full mt-7 text-[15px]"
                            disabled={!besoin}
                            onClick={() => setStep(3)}
                          >
                            Continuer
                            <ArrowRight size={16} className="ml-1" />
                          </Button>
                          <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mt-4 mx-auto font-body"
                          >
                            <ArrowLeft size={14} />
                            Étape précédente
                          </button>
                        </div>
                      )}

                      {/* STEP 3 */}
                      {step === 3 && (
                        <form onSubmit={handleSubmit}>
                          <p className="text-[12px] font-bold text-accent uppercase tracking-wider font-body mb-1">
                            Étape 3 sur 3
                          </p>
                          <h2 className="font-display text-[24px] text-foreground mb-2">
                            Vos coordonnées
                          </h2>
                          <p className="text-muted-foreground text-[14px] font-body mb-6">
                            Pour que Mika puisse vous rappeler personnellement.
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[13px] font-semibold text-foreground mb-1.5 font-body">Prénom *</label>
                              <input
                                type="text"
                                required
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                placeholder="Votre prénom"
                                className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-[13px] font-semibold text-foreground mb-1.5 font-body">Nom *</label>
                              <input
                                type="text"
                                required
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                placeholder="Votre nom"
                                className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors"
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
                              placeholder="votre@email.com"
                              className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="mt-4">
                            <label className="block text-[13px] font-semibold text-foreground mb-1.5 font-body">Téléphone *</label>
                            <input
                              type="tel"
                              required
                              value={telephone}
                              onChange={(e) => setTelephone(e.target.value)}
                              placeholder="+32 4XX XX XX XX"
                              className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="mt-4">
                            <label className="block text-[13px] font-semibold text-foreground mb-1.5 font-body">Message <span className="font-normal text-muted-foreground">(optionnel)</span></label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={3}
                              placeholder="Décrivez votre situation en 2 lignes..."
                              className="w-full px-4 py-3 rounded-xl border-2 border-border/50 bg-card text-foreground text-[14px] font-body placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none transition-colors resize-none"
                            />
                          </div>

                          <Button
                            variant="accent"
                            size="lg"
                            type="submit"
                            disabled={isLoading}
                            className="rounded-full w-full mt-7 whitespace-normal text-center leading-snug text-[15px]"
                          >
                            {isLoading ? "Envoi en cours..." : "Envoyer ma demande — Mika me rappelle sous 72h"}
                            <ArrowRight size={16} className="ml-1 flex-shrink-0" />
                          </Button>

                          <div className="flex items-center justify-center gap-2 mt-4">
                            <Shield size={14} className="text-muted-foreground" />
                            <p className="text-[12px] text-muted-foreground text-center font-body">
                              Premier échange gratuit, confidentiel et sans engagement.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mt-4 mx-auto font-body"
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

            {/* RIGHT — Sidebar (2/5) */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <ScrollRevealDiv delay={0.15}>
                {/* Mika card */}
                <div className="bg-card rounded-3xl overflow-hidden border border-border/50 shadow-[0_4px_20px_rgba(27,43,94,0.06)]">
                  <div className="bg-gradient-to-b from-muted/50 to-card flex justify-center pt-4 px-6">
                    <img
                      src={mikaPhoto}
                      alt="Mika MUSUNGAYI, fondateur MFinances"
                      className="h-[280px] object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageCircle size={16} className="text-accent" />
                      <p className="text-[13px] font-bold text-accent font-body uppercase tracking-wider">Votre interlocuteur</p>
                    </div>
                    <p className="text-[15px] italic text-foreground/80 leading-relaxed font-body">
                      "Je rappelle personnellement chaque nouveau contact sous 72h pour un premier échange gratuit."
                    </p>
                     <p className="text-[14px] font-semibold mt-3 font-body">
                       <span className="text-accent">Mika</span> <span className="text-primary">MUSUNGAYI</span>
                     </p>
                    <p className="text-[12px] text-muted-foreground font-body">
                      Fondateur · Expert-Comptable
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={18} className="text-green-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground font-body">100% gratuit</p>
                      <p className="text-[11px] text-muted-foreground font-body">Premier échange sans engagement</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground font-body">Rappel sous 72h</p>
                      <p className="text-[11px] text-muted-foreground font-body">Par Mika personnellement</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <Shield size={18} className="text-purple-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground font-body">Confidentiel</p>
                      <p className="text-[11px] text-muted-foreground font-body">Vos données restent privées</p>
                    </div>
                  </div>
                </div>

                {/* Google badge */}
                <a
                  href="https://g.page/mfinances"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-all"
                >
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground font-body">5,0 / 5 · 16 avis Google</p>
                  </div>
                  <ArrowRight size={14} className="text-muted-foreground ml-auto" />
                </a>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
