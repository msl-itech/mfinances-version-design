import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import mikaPhoto from "@/assets/mika-musungayi.png";
import imgStory from "@/assets/about-story.jpg";
import { ArrowRight, MapPin, Award, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function ScrollRevealDiv({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className || ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function APropos() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Pourquoi MFinances — Cabinet comptable Bruxelles | Mika Musungayi";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Mika Musungayi a créé MFinances après avoir vu trop de dirigeants de TPE piloter leur croissance sans visibilité financière. Découvrez sa conviction.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://mfinances.be/a-propos/";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center">
            <span className="inline-block bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md mb-5">
              Pourquoi MFinances
            </span>
            <h1 className="font-display text-[32px] md:text-[48px] leading-[1.12] text-primary-foreground">
              Pourquoi j'ai créé MFinances
            </h1>
          </div>
        </section>

        {/* SECTION 1 — L'histoire fondatrice */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <ScrollRevealDiv>
              <h2 className="font-display text-[28px] md:text-[36px] leading-[1.15] text-foreground">
                Il avait triplé son chiffre d'affaires en un an.
                <br />
                <span className="text-accent">Et pourtant.</span>
              </h2>

              <div className="mt-8 space-y-5 font-body text-[15px] text-foreground/75 leading-[1.7]">
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
                  Mais sous la surface, quelque chose couvait. Ses décisions étaient prises à l'intuition. Ses erreurs
                  stratégiques passaient inaperçues — absorbées par la croissance. La rentabilité quotidienne
                  masquait des fragilités accumulées. De beaux bénéfices. Une trésorerie qui, elle, s'affaiblissait
                  en silence.
                </p>
              </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.15}>
              <img
                src={imgStory}
                alt="Un dirigeant face à ses chiffres, tard le soir"
                className="rounded-2xl w-full h-[320px] object-cover shadow-lg"
              />
            </ScrollRevealDiv>
          </div>

          {/* Suite du récit — pleine largeur */}
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 mt-12">
            <ScrollRevealDiv>
              <div className="space-y-5 font-body text-[15px] text-foreground/75 leading-[1.7]">
                <p className="font-semibold text-foreground text-[17px]">
                  Puis le Covid est arrivé.
                </p>
                <p>
                  La croissance ne pouvait plus absorber les erreurs du passé. Les décisions sont devenues
                  urgentes, structurantes, irréversibles. Des emplois ont été détruits. L'entreprise a failli
                  ne pas survivre.
                </p>
                <p>
                  C'est le contrôle de gestion — mis en place dans l'urgence — qui lui a permis de prendre les
                  bonnes décisions. De sauver l'essentiel. Pas sans dommages. Mais debout.
                </p>
                <p className="font-semibold text-foreground text-[17px] border-l-4 border-accent pl-5 py-2">
                  Ce jour-là, j'ai compris quelque chose que je ne pouvais plus ignorer.
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* SECTION 2 — La conviction */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv>
              <h2 className="font-display text-[28px] md:text-[36px] leading-[1.15] text-foreground">
                Les TPE en croissance n'ont pas moins besoin de pilotage.
                <br />
                <span className="text-accent">Elles en ont plus besoin.</span>
              </h2>

              <div className="mt-8 space-y-5 font-body text-[15px] text-foreground/75 leading-[1.7]">
                <p>
                  Je ne crois pas que le rôle d'un expert-comptable se limite à produire des chiffres ou
                  optimiser la fiscalité.
                </p>
                <p>
                  Je m'adresse aux entreprises en forte croissance. Celles qui passent un cap. Celles qui
                  structurent une équipe. Celles qui accélèrent — parfois plus vite que leur organisation.
                </p>
                <p>
                  Et à ce stade, je vois souvent la même chose. Des dirigeants ambitieux, mais sans véritable
                  pilotage financier. Non pas par manque de besoin — mais parce qu'ils pensent encore être
                  « trop petits » pour structurer un contrôle de gestion ou intégrer une fonction de DAF.
                </p>
                <p>
                  Résultat : une trésorerie sous tension. Peu de visibilité. Des décisions prises à l'intuition.
                  Et une croissance qui devient dangereuse à piloter.
                </p>
                <p>
                  Ma conviction est simple : c'est précisément à ce moment-là que le pilotage devient
                  indispensable. Parce que chaque décision compte. Parce que chaque erreur coûte plus cher.
                  Parce que la trésorerie devient stratégique.
                </p>
              </div>

              {/* Citation */}
              <div className="mt-10 bg-primary rounded-2xl p-8 md:p-10 relative overflow-hidden">
                <Quote size={40} className="text-primary-foreground/10 absolute top-4 right-6" />
                <p className="font-display text-[20px] md:text-[24px] leading-[1.35] text-primary-foreground italic">
                  « Arrêtez de vous voir trop petit. Commencez à piloter comme une entreprise en croissance. »
                </p>
                <p className="text-primary-foreground/60 text-[13px] font-body mt-4">
                  — Mika Musungayi
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* SECTION 3 — Ce que je fais différemment */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12">
            <ScrollRevealDiv>
              <h2 className="font-display text-[28px] md:text-[36px] leading-[1.15] text-foreground">
                Un niveau de structure que vous pensiez
                <br />
                <span className="text-accent">réservé aux grandes entreprises</span>
              </h2>

              <div className="mt-8 space-y-5 font-body text-[15px] text-foreground/75 leading-[1.7]">
                <p>
                  Mon rôle est d'apporter clarté et structure — sans alourdir votre organisation. En intégrant
                  un véritable pilotage financier dans votre quotidien : contrôle de gestion, trésorerie
                  prévisionnelle, indicateurs utiles.
                </p>
                <p>
                  Pas pour remplir des tableaux. Pour vous permettre de prendre de meilleures décisions,
                  sécuriser votre croissance et piloter votre entreprise avec sérénité. Même sans DAF en
                  interne. Même en TPE.
                </p>
                <p className="font-semibold text-foreground">
                  C'est ce que j'ai construit avec MFinances. Un cabinet qui fait plus que la comptabilité —
                  un partenaire de pilotage financier pour les dirigeants qui ont décidé de grandir.
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* SECTION 4 — Mika en bref */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <ScrollRevealDiv className="lg:col-span-2">
              <img
                src={mikaPhoto}
                alt="Mika Musungayi, fondateur MFinances"
                className="rounded-2xl w-full h-[360px] object-cover object-top shadow-lg"
              />
            </ScrollRevealDiv>

            <ScrollRevealDiv delay={0.1} className="lg:col-span-3">
              <h2 className="font-display text-[28px] md:text-[36px] leading-[1.15] text-foreground">
                Mika Musungayi
              </h2>
              <p className="text-accent font-body font-semibold text-[15px] mt-1">
                Expert-comptable, fondateur de MFinances
              </p>

              <div className="mt-6 space-y-4 font-body text-[15px] text-foreground/75 leading-[1.7]">
                <div className="flex items-start gap-3">
                  <Award size={18} className="text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <p>
                    Diplômé de la Chambre Belge des Comptables, Experts-Comptables et Conseils Fiscaux.
                    Membre ITAA (n° 50.624.805). Plus de 20 ans d'expérience aux côtés de dirigeants
                    de TPE et PME à Bruxelles.
                  </p>
                </div>

                <p>
                  Depuis 2003, j'accompagne des entrepreneurs dans les moments qui comptent — création,
                  croissance, restructuration, optimisation fiscale.
                </p>
                <p>
                  MFinances, c'est l'aboutissement de cette expérience. La conviction qu'un dirigeant de TPE
                  mérite les mêmes outils de pilotage qu'un grand groupe — avec la proximité et la réactivité
                  d'un cabinet humain.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-6 text-muted-foreground text-[13px] font-body">
                <MapPin size={14} strokeWidth={1.5} />
                20 Rue de la Magnanerie, 1180 Uccle — Bruxelles
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        {/* SECTION 5 — CTA final */}
        <section className="bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center">
            <h2 className="font-display text-[28px] md:text-[36px] text-primary-foreground leading-[1.15]">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
