import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import equipePhoto from "@/assets/mfinances-team-hero.png";
import mikaPortrait from "@/assets/mika-apropos-hero.png";
import imgStory from "@/assets/about-story.jpg";
import imgMeeting from "@/assets/meeting-warm.jpg";
import imgDashboard from "@/assets/dashboard-laptop.jpg";
import {
  ArrowRight,
  MapPin,
  Award,
  Quote,
  Target,
  TrendingUp,
  Shield,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { createBreadcrumbSchema } from "@/lib/seo-schemas";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function SR({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const values = [
  {
    icon: Target,
    title: "Clarté",
    desc: "Des chiffres lisibles, des indicateurs utiles, des recommandations concrètes.",
  },
  {
    icon: Shield,
    title: "Rigueur",
    desc: "Une comptabilité irréprochable et un pilotage financier structuré.",
  },
  {
    icon: TrendingUp,
    title: "Anticipation",
    desc: "Voir les risques avant qu'ils ne deviennent des problèmes.",
  },
  {
    icon: Users,
    title: "Proximité",
    desc: "Un interlocuteur unique, disponible et impliqué dans votre réussite.",
  },
];

const stats = [
  { value: "20+", label: "années d'expérience" },
  { value: "200+", label: "entreprises accompagnées" },
  { value: "5.0", label: "note Google (16 avis)" },
  { value: "72h", label: "délai de réponse max." },
];

export default function APropos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Pourquoi MFinances | Cabinet Comptable Bruxelles"
        description="Mika Musungayi a créé MFinances après avoir vu trop de dirigeants de TPE piloter leur croissance sans visibilité financière. Découvrez sa conviction."
        canonical="https://mfinances.be/a-propos/"
        schemaJson={createBreadcrumbSchema([
          { name: "Accueil", url: "https://mfinances.be/" },
          { name: "À propos", url: "https://mfinances.be/a-propos/" },
        ])}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary-foreground text-[13px]">Pourquoi MFinances</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="mt-6">
                <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-4">
                  Notre histoire
                </span>
                <h1 className="font-display text-[26px] md:text-[44px] leading-[1.12] text-primary-foreground">
                  Pourquoi j'ai créé <span className="text-accent">MFinances</span>
                </h1>
                <p className="text-primary-foreground/70 text-[16px] leading-relaxed mt-4 font-body max-w-[480px]">
                  Parce que trop de dirigeants de TPE pilotent leur croissance sans visibilité — et que ça ne devrait pas être une fatalité.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 rounded-2xl shadow-2xl overflow-hidden">
              <img src={equipePhoto} alt="Équipe MFinances — Cabinet comptable à Uccle, Bruxelles" className="w-full h-auto object-contain rounded-2xl" />
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="bg-card py-8 md:py-12 border-b border-border/50">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((s, i) => (
                <SR key={s.label} delay={i * 0.06} className="text-center">
                  <div className="font-display text-[28px] md:text-[36px] text-accent leading-none">{s.value}</div>
                  <p className="text-muted-foreground text-[13px] font-body mt-1.5">{s.label}</p>
                </SR>
              ))}
            </div>
          </div>
        </section>

        {/* ── L'HISTOIRE FONDATRICE ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <SR>
              <h2 className="font-display text-[22px] md:text-[34px] leading-[1.15] text-foreground">
                Il avait triplé son chiffre d'affaires en un an.
                <br />
                <span className="text-accent">Et pourtant.</span>
              </h2>

              <div className="mt-6 space-y-4 font-body text-[15px] text-foreground/75 leading-[1.7]">
                <p>
                  Je me souviens d'un jeune entrepreneur. Ambitieux, intuitif, talentueux. Il vendait des terminaux
                  de paiement sur un marché de niche — et il avait du flair.
                </p>
                <p>
                  Ensemble, nous avions analysé son modèle économique. Le diagnostic était clair : intégrer une
                  offre de location-financement pouvait transformer son business. Il l'a fait. Son chiffre d'affaires
                  a triplé en moins d'un an.
                </p>
                <p className="font-semibold text-foreground">
                  Sur le papier, c'était un succès.
                </p>
                <p>
                  Mais sous la surface, quelque chose couvait. Ses décisions étaient prises à l'intuition. La rentabilité
                  masquait des fragilités accumulées. Une trésorerie qui s'affaiblissait en silence.
                </p>
              </div>
            </SR>

            <SR delay={0.15}>
              <img
                src={imgStory}
                alt="Un dirigeant face à ses chiffres"
                className="rounded-2xl w-full h-[360px] md:h-[480px] object-cover object-top shadow-lg"
              />
            </SR>
          </div>
        </section>

        {/* ── LE TOURNANT ── */}
        <section className="bg-primary py-10 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <SR>
              <div className="text-center">
                <p className="font-display text-[20px] md:text-[28px] text-primary-foreground leading-[1.3] italic">
                  « Puis le Covid est arrivé. La croissance ne pouvait plus absorber les erreurs du passé. »
                </p>
                <div className="w-12 h-[2px] bg-accent mx-auto mt-6 mb-6" />
                <p className="text-primary-foreground/70 text-[15px] font-body leading-[1.7] max-w-[600px] mx-auto">
                  C'est le contrôle de gestion — mis en place dans l'urgence — qui lui a permis de prendre les
                  bonnes décisions. De sauver l'essentiel. Pas sans dommages. Mais debout.
                </p>
                <p className="font-semibold text-accent text-[16px] font-body mt-6">
                  Ce jour-là, j'ai compris quelque chose que je ne pouvais plus ignorer.
                </p>
              </div>
            </SR>
          </div>
        </section>

        {/* ── LA CONVICTION ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <SR delay={0.1}>
              <img
                src={imgDashboard}
                alt="Dashboard de pilotage financier"
                className="rounded-2xl w-full h-[260px] md:h-[340px] object-cover shadow-lg"
              />
            </SR>

            <SR>
              <h2 className="font-display text-[22px] md:text-[34px] leading-[1.15] text-foreground">
                Les TPE en croissance n'ont pas moins besoin de pilotage.
                <br />
                <span className="text-accent">Elles en ont plus besoin.</span>
              </h2>

              <div className="mt-6 space-y-4 font-body text-[15px] text-foreground/75 leading-[1.7]">
                <p>
                  Je m'adresse aux entreprises en forte croissance. Celles qui passent un cap. Celles qui
                  accélèrent — parfois plus vite que leur organisation.
                </p>
                <p>
                  Des dirigeants ambitieux, mais sans véritable pilotage financier. Non pas par manque de besoin —
                  mais parce qu'ils pensent encore être « trop petits » pour structurer un contrôle de gestion.
                </p>
                <p>
                  Ma conviction est simple : c'est précisément à ce moment-là que le pilotage devient
                  indispensable. Parce que chaque décision compte. Parce que chaque erreur coûte plus cher.
                </p>
              </div>
            </SR>
          </div>
        </section>

        {/* ── NOS VALEURS ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <SR className="text-center mb-8 md:mb-12">
              <h2 className="font-display text-[22px] md:text-[34px] text-foreground leading-[1.15]">
                Ce qui guide <span className="text-accent">notre approche</span>
              </h2>
            </SR>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, i) => (
                <SR key={v.title} delay={0.06 + i * 0.05}>
                  <div className="bg-secondary rounded-2xl p-6 h-full border border-border/30">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <v.icon size={20} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[16px] font-bold font-body text-foreground mb-2">{v.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{v.desc}</p>
                  </div>
                </SR>
              ))}
            </div>
          </div>
        </section>

        {/* ── CITATION ── */}
        <section className="bg-primary py-10 md:py-16">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative">
            <Quote size={48} className="text-primary-foreground/8 mx-auto mb-4" />
            <p className="font-display text-[20px] md:text-[26px] leading-[1.35] text-primary-foreground italic">
              « Arrêtez de vous voir trop petit. Commencez à piloter comme une entreprise en croissance. »
            </p>
            <p className="text-primary-foreground/50 text-[13px] font-body mt-4">
              — Mika MUSUNGAYI, fondateur
            </p>
          </div>
        </section>

        {/* ── MIKA EN BREF ── */}
        <section className="bg-secondary py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 items-center">
            <SR className="lg:col-span-2">
              <img
                src={mikaPortrait}
                alt="Mika MUSUNGAYI — Fondateur de MFinances"
                className="rounded-2xl w-full h-[300px] md:h-[380px] object-cover object-top shadow-lg"
              />
            </SR>

            <SR delay={0.1} className="lg:col-span-3">
              <h2 className="font-display text-[22px] md:text-[34px] leading-[1.15]">
                <span className="text-accent">Mika</span> <span className="text-primary">MUSUNGAYI</span>
              </h2>
              <p className="text-accent font-body font-semibold text-[15px] mt-1">
                Expert-comptable · Fondateur de MFinances
              </p>

              <div className="mt-5 space-y-4 font-body text-[15px] text-foreground/75 leading-[1.7]">
                <div className="flex items-start gap-3">
                  <Award size={18} className="text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <p>
                    Diplômé de la Chambre Belge des Comptables, Experts-Comptables et Conseils Fiscaux.
                    Membre ITAA (n° 50.624.805). Plus de 20 ans d'expérience aux côtés de dirigeants
                    de TPE et PME à Bruxelles.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <p>
                    Depuis 2003, j'accompagne des entrepreneurs dans les moments qui comptent — création,
                    croissance, restructuration, optimisation fiscale.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart3 size={18} className="text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <p>
                    MFinances, c'est l'aboutissement de cette expérience. La conviction qu'un dirigeant de TPE
                    mérite les mêmes outils de pilotage qu'un grand groupe.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5 text-muted-foreground text-[13px] font-body">
                <MapPin size={14} strokeWidth={1.5} />
                20 Rue de la Magnanerie, 1180 Uccle — Bruxelles
              </div>
            </SR>
          </div>
        </section>

        {/* ── CE QUE NOUS FAISONS DIFFÉREMMENT ── */}
        <section className="bg-card py-10 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <SR>
              <h2 className="font-display text-[22px] md:text-[34px] leading-[1.15] text-foreground">
                Un niveau de structure que vous pensiez
                <span className="text-accent"> réservé aux grandes entreprises</span>
              </h2>

              <div className="mt-6 space-y-4 font-body text-[15px] text-foreground/75 leading-[1.7]">
                <p>
                  Mon rôle est d'apporter clarté et structure — sans alourdir votre organisation. En intégrant
                  un véritable pilotage financier dans votre quotidien : contrôle de gestion, trésorerie
                  prévisionnelle, indicateurs utiles.
                </p>
                <p>
                  Pas pour remplir des tableaux. Pour vous permettre de prendre de meilleures décisions,
                  sécuriser votre croissance et piloter votre entreprise avec sérénité.
                </p>
                <p className="font-semibold text-foreground">
                  C'est ce que j'ai construit avec MFinances. Un partenaire de pilotage financier pour les
                  dirigeants qui ont décidé de grandir.
                </p>
              </div>
            </SR>

            <SR delay={0.1}>
              <img
                src={imgMeeting}
                alt="Réunion de conseil avec un dirigeant"
                className="rounded-2xl w-full h-[260px] md:h-[340px] object-cover shadow-lg"
              />
            </SR>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary py-10 md:py-20 relative overflow-hidden">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center relative z-10">
            <SR>
              <h2 className="font-display text-[22px] md:text-[34px] text-primary-foreground leading-[1.15]">
                Vous reconnaissez-vous dans cette histoire ?
              </h2>
              <p className="text-primary-foreground/70 text-[16px] mt-4 font-body max-w-[560px] mx-auto">
                Si vous pilotez votre entreprise à l'intuition et que vous sentez que les décisions deviennent
                plus complexes — c'est le bon moment pour en parler.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button variant="accent" size="lg" className="rounded-full" asChild>
                  <Link to="/contact/">
                    Prendre rendez-vous
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Button>
                <Button variant="outline-white" size="lg" className="rounded-full" asChild>
                  <Link to="/services/">Découvrir nos services →</Link>
                </Button>
              </div>
            </SR>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
