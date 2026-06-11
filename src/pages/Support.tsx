import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Download,
  Monitor,
  KeyRound,
  ShieldCheck,
  Info,
} from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const steps = [
  {
    icon: Download,
    num: "1",
    title: "Téléchargez AnyDesk",
    desc: "Choisissez la version correspondant à votre système d'exploitation.",
  },
  {
    icon: Monitor,
    num: "2",
    title: "Lancez AnyDesk",
    desc: "Un code à 9 chiffres s'affiche — c'est votre identifiant de session unique.",
  },
  {
    icon: KeyRound,
    num: "3",
    title: "Communiquez votre code",
    desc: "Partagez ce code avec votre expert-comptable par téléphone ou email.",
  },
  {
    icon: ShieldCheck,
    num: "4",
    title: "Autorisez la connexion",
    desc: "Cliquez sur « Accepter » pour démarrer la session.",
  },
];

const bonASavoir = [
  "La prise en main à distance ne se fait jamais sans votre accord explicite",
  "Vous pouvez interrompre la session à tout moment en fermant AnyDesk",
  "Aucune donnée n'est conservée après la session",
  "Ce service est réservé aux clients MFinances",
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mfinances.be/" },
    { "@type": "ListItem", position: 2, name: "Support", item: "https://mfinances.be/support/" },
  ],
};



export default function Support() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Support Clients — Assistance AnyDesk | MFinances"
        description="Assistance à distance pour clients MFinances. Téléchargez AnyDesk et laissez votre expert-comptable vous accompagner directement dans Odoo."
        canonical="https://mfinances.be/support/"
        schemaJson={breadcrumbJsonLd}
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="bg-primary py-16 md:py-20 bg-precision-grid-light">
          <div className="mx-auto max-w-[800px] px-6 lg:px-12 text-center">
            <Breadcrumb>
              <BreadcrumbList className="justify-center">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground text-[13px]">Accueil</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground text-[13px]">Support</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-8">
              <h1 className="font-display text-[32px] md:text-[48px] leading-[1.12] text-primary-foreground">
                Assistance à distance — <span className="text-accent">support client</span> MFinances
              </h1>
              <p className="text-primary-foreground/75 text-[16px] leading-relaxed mt-5 font-body max-w-[600px] mx-auto">
                Votre expert-comptable peut prendre la main sur votre ordinateur à distance pour vous accompagner directement dans Odoo ou résoudre un problème technique.
              </p>
            </div>
          </div>
        </section>

        {/* ── ÉTAPES ── */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12">
            <div data-anim="fade-up" className="text-center mb-14">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15]">
                Comment ça <span className="text-accent">fonctionne</span> ?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div data-anim="fade-up" data-delay="0.08 + i * 0.06" key={s.num}  className="bg-secondary/60 rounded-2xl p-7 border border-border/50 relative">
                    <span className="absolute top-5 right-5 w-8 h-8 rounded-full bg-primary/10 text-primary text-[14px] font-bold flex items-center justify-center">
                      {s.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[17px] font-bold font-body text-foreground mb-2">{s.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-[1.7] font-body">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TÉLÉCHARGEMENT ── */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[600px] px-6 lg:px-12 text-center">
            <div data-anim="fade-up">
              <h2 className="font-display text-[28px] md:text-[36px] text-foreground leading-[1.15] mb-8">
                Télécharger <span className="text-accent">AnyDesk</span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" className="rounded-full px-8" asChild>
                  <a href="https://get.anydesk.com/dzQb9eHl/AnyDesk_Custom_Client.exe" target="_blank" rel="noopener noreferrer">
                    <Download size={18} className="mr-2" />
                    Windows
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                  <a href="https://get.anydesk.com/U2eK2Jqz/AnyDesk_Custom_Client.dmg" target="_blank" rel="noopener noreferrer">
                    <Download size={18} className="mr-2" />
                    Mac
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── BON À SAVOIR ── */}
        <section className="bg-card py-16 md:py-20">
          <div className="mx-auto max-w-[700px] px-6 lg:px-12">
            <div data-anim="fade-up">
              <div className="bg-secondary/60 rounded-2xl p-8 border border-border/50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Info size={20} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[20px] text-foreground">Bon à savoir</h3>
                </div>
                <ul className="space-y-3">
                  {bonASavoir.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-muted-foreground font-body leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
