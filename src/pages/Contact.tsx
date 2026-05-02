import { useEffect, useState, useRef } from "react";
import { submitLead } from "@/lib/odoo-submit";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY, verifyRecaptchaToken } from "@/lib/recaptcha";
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
  Sparkles,
  Quote,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const situations = [
  { emoji: "🌱", label: "Je souhaite devenir indépendant" },
  { emoji: "💼", label: "Je suis déjà indépendant en personne physique" },
  { emoji: "🏗️", label: "Je suis en train de créer une société" },
  { emoji: "🏢", label: "J'ai déjà une société active" },
  { emoji: "❓", label: "Autre / Particulier" },
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
    <div className="mb-5 md:mb-8">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-1.5 md:gap-2">
            <div
              className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[12px] md:text-[13px] font-bold font-body transition-all duration-300 ${
                step === current
                  ? "bg-accent text-accent-foreground shadow-md scale-110"
                  : step < current
                  ? "bg-primary text-primary-foreground"
                  : "bg-border text-muted-foreground"
              }`}
            >
              {step < current ? "✓" : step}
            </div>
            <span className={`text-[11px] md:text-[12px] font-body hidden sm:inline ${
              step === current ? "text-foreground font-semibold" : "text-muted-foreground"
            }`}>
              {step === 1 ? "Situation" : step === 2 ? "Besoin" : "Coordonnées"}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full h-1 md:h-1.5 bg-border rounded-full overflow-hidden">
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
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) return;
    setIsLoading(true);

    const isHuman = await verifyRecaptchaToken(recaptchaToken);
    if (!isHuman) {
      setIsLoading(false);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      return;
    }

    const descParts = [
      `<h3>Informations du contact</h3>`,
      `<p><strong>Situation actuelle:</strong> ${situation}</p>`,
      `<p><strong>Besoin principal:</strong> ${besoin}</p>`,
      `<p><strong>Téléphone:</strong> ${telephone}</p>`,
      message ? `<p><strong>Message:</strong> ${message}</p>` : "",
      `<p><strong>Source:</strong> Formulaire Contact - Site MFinances</p>`,
    ].filter(Boolean);

    await submitLead({
      name: `${prenom} ${nom}`,
      email_from: email,
      phone: telephone,
      description: descParts.join(""),
    });

    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact | Expert-Comptable Bruxelles — MFinances"
        description="Prenez rendez-vous avec MFinances, cabinet d'expertise comptable à Uccle, Bruxelles. Consultation gratuite sous 72h."
        canonical="https://mfinances.be/contact/"
        schemaJson={createBreadcrumbSchema([
          { name: "Accueil", url: "https://mfinances.be/" },
          { name: "Contact", url: "https://mfinances.be/contact/" },
        ])}
      />
      <Header />

      <main>
        {/* Hero banner — éditorial premium */}
        <section className="bg-primary text-primary-foreground py-12 md:py-24 relative overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-6 -left-4 md:-top-10 md:-left-8 font-display italic text-primary-foreground/[0.06] text-[110px] md:text-[220px] leading-none tracking-tight"
          >
            Contact
          </span>
          <div className="pointer-events-none absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-accent/10 blur-3xl" />

          <div className="mx-auto max-w-[900px] px-6 lg:px-12 relative z-10 text-center">
            <ScrollRevealDiv>
              <div className="inline-flex items-center gap-2 mb-5 md:mb-6">
                <span className="h-px w-10 bg-accent" />
                <span className="font-body text-[11px] font-bold tracking-[0.25em] uppercase text-accent">
                  Premier échange · Gratuit
                </span>
                <span className="h-px w-10 bg-accent" />
              </div>
              <h1 className="font-display text-[28px] sm:text-[36px] md:text-[56px] leading-[1.08] text-primary-foreground tracking-tight">
                Parlons de votre <span className="italic font-light text-accent">entreprise</span>
              </h1>
              <p className="text-primary-foreground/75 font-body text-[15px] md:text-[17px] mt-5 md:mt-7 max-w-[620px] mx-auto leading-[1.75]">
                Décrivez-nous votre situation en 2 minutes. Mika vous rappelle personnellement sous <strong className="text-primary-foreground">72h</strong> — gratuit, confidentiel, sans engagement.
              </p>
              <div className="flex items-center justify-center gap-4 md:gap-6 mt-7 text-[12px] md:text-[13px] text-primary-foreground/70 font-body">
                <span className="inline-flex items-center gap-1.5"><Shield size={13} className="text-accent" strokeWidth={1.8} /> Confidentiel</span>
                <span className="w-px h-3 bg-primary-foreground/20" />
                <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-accent" strokeWidth={1.8} /> Sous 72h</span>
                <span className="w-px h-3 bg-primary-foreground/20" />
                <span className="inline-flex items-center gap-1.5"><CheckCircle size={13} className="text-accent" strokeWidth={1.8} /> Gratuit</span>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>


        {/* 3 contact methods — premium */}
        <section className="bg-background py-6 md:py-16 relative">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <ScrollRevealDiv>
              <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:overflow-visible">
                {[
                  { Icon: Phone, title: "Téléphone", value: "+32 2 886 05 50", sub: "Lun-Ven · 9h-18h", href: "tel:+3228860550" },
                  { Icon: Mail, title: "Email", value: "info@mfinances.be", sub: "Réponse sous 24h", href: "mailto:info@mfinances.be" },
                  { Icon: MapPin, title: "En personne", value: "Uccle, Bruxelles", sub: "Sur RDV uniquement", href: null },
                ].map(({ Icon, title, value, sub, href }) => {
                  const Tag = (href ? "a" : "div") as React.ElementType;
                  const props = href ? { href } : {};
                  return (
                    <Tag
                      key={title}
                      {...props}
                      className={`group relative flex-shrink-0 w-[160px] md:w-auto flex flex-col items-center text-center p-4 md:p-7 rounded-2xl md:rounded-3xl bg-card border border-border/60 ${href ? "hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.25)]" : ""} transition-all duration-500 snap-center overflow-hidden`}
                    >
                      <div className="relative w-10 h-10 md:w-13 md:h-13 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center mb-3 md:mb-5 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
                        <Icon size={20} className="text-accent md:hidden" strokeWidth={1.5} />
                        <Icon size={22} className="text-accent hidden md:block" strokeWidth={1.5} />
                      </div>

                      <h3 className="relative font-display text-[14px] md:text-[18px] text-foreground tracking-tight">{title}</h3>
                      <p className="relative text-[12px] md:text-[15px] font-semibold text-foreground mt-1 md:mt-1.5 font-body">{value}</p>
                      <p className="relative text-[10px] md:text-[12px] text-muted-foreground font-body mt-0.5 md:mt-1.5">{sub}</p>
                    </Tag>
                  );
                })}
              </div>
            </ScrollRevealDiv>
          </div>
        </section>


        {/* Form + sidebar */}
        <section className="bg-background pb-14 md:pb-28 relative overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-4 right-0 font-display italic text-primary/[0.03] text-[110px] md:text-[200px] leading-none tracking-tight hidden md:block"
          >
            Échangeons
          </span>

          <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-14 relative z-10">
            {/* LEFT — Formulaire (3/5) */}
            <div className="lg:col-span-3 order-1 lg:order-1">
              <ScrollRevealDiv>
                <div className="relative bg-card rounded-3xl p-6 md:p-10 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.25)] border border-border/60 overflow-hidden">
                  {/* Accent bar top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/60 to-accent" />

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

                          <div className="mt-5 flex justify-center">
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={RECAPTCHA_SITE_KEY}
                              onChange={(token) => setRecaptchaToken(token)}
                              onExpired={() => setRecaptchaToken(null)}
                            />
                          </div>

                          <Button
                            variant="accent"
                            size="lg"
                            type="submit"
                            disabled={isLoading || !recaptchaToken}
                            className="rounded-full w-full mt-5 whitespace-normal text-center leading-snug text-[15px]"
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

            {/* RIGHT — Sidebar (2/5) — hidden on mobile */}
            <div className="lg:col-span-2 order-2 lg:order-2 hidden lg:block">
              <ScrollRevealDiv delay={0.15}>
                {/* Mika card — éditorial */}
                <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.5)]">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -top-4 right-2 font-display italic text-primary-foreground/[0.07] text-[88px] leading-none z-10"
                  >
                    Mika
                  </span>
                  <div className="relative overflow-hidden">
                    <img
                      src={mikaPhoto}
                      alt="Mika MUSUNGAYI, fondateur MFinances"
                      className="w-full h-[320px] object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-full px-3 py-1.5">
                      <Sparkles size={12} className="text-accent" strokeWidth={1.8} />
                      <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-primary-foreground">ITAA · 20 ans</span>
                    </span>
                  </div>
                  <div className="relative p-6 pt-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="h-px w-6 bg-accent" />
                      <p className="text-[10px] font-bold text-accent font-body uppercase tracking-[0.25em]">Votre interlocuteur</p>
                    </div>
                    <Quote size={20} className="text-accent/60 mb-2" strokeWidth={1.5} />
                    <p className="text-[15px] italic font-display text-primary-foreground/90 leading-[1.5] font-light">
                      Je rappelle personnellement chaque nouveau contact sous 72h pour un premier échange gratuit.
                    </p>
                    <div className="mt-5 pt-4 border-t border-primary-foreground/15">
                      <p className="font-display text-[18px] tracking-tight">
                        <span className="italic font-light text-accent">Mika</span> <span className="text-primary-foreground">MUSUNGAYI</span>
                      </p>
                      <p className="text-[12px] text-primary-foreground/60 font-body mt-0.5">
                        Fondateur · Expert-Comptable
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 space-y-3">
                  {[
                    { Icon: CheckCircle, title: "100% gratuit", sub: "Premier échange sans engagement" },
                    { Icon: Clock, title: "Rappel sous 72h", sub: "Par Mika personnellement" },
                    { Icon: Shield, title: "Confidentiel", sub: "Vos données restent privées" },
                  ].map(({ Icon, title, sub }) => (
                    <div
                      key={title}
                      className="group flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/60 hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
                        <Icon size={18} className="text-accent" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-foreground font-body">{title}</p>
                        <p className="text-[11px] text-muted-foreground font-body">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Google badge */}
                <a
                  href="https://g.page/mfinances"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/60 hover:border-accent/30 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-20px_hsl(var(--primary)/0.25)] transition-all duration-300"
                >
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground font-body">5,0 / 5 · 16 avis Google</p>
                    <p className="text-[11px] text-muted-foreground font-body">Voir tous les avis</p>
                  </div>
                  <ArrowRight size={14} className="text-accent ml-auto group-hover:translate-x-1 transition-transform" />
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
