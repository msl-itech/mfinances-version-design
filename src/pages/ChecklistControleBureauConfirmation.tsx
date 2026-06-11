import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

function triggerPdfDownload() {
  const link = document.createElement("a");
  link.href = "/ressources/checklist-controle-fiscal-bureau-domicile.pdf";
  link.download = "checklist-controle-fiscal-bureau-domicile.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function ChecklistControleBureauConfirmation() {
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);

  const location = useLocation();
  const prenom = (location.state as { prenom?: string })?.prenom;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={root} className="min-h-screen">
      <SEOHead
        title="Checklist reçue — MFinances"
        description="Votre checklist de contrôle fiscal bureau à domicile est prête."
        canonical="https://mfinances.be/ressources/checklist-controle-bureau/confirmation/"
        noIndex
      />
      <Header />

      <main className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-[580px] px-6 lg:px-12">
          {/* Success block */}
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 shadow-lg text-center">
            <CheckCircle2 size={48} className="text-[hsl(145,63%,30%)] mx-auto mb-5" />
            <h1 className="font-display text-[26px] md:text-[34px] text-foreground leading-[1.15] mb-4">
              {prenom
                ? `C'est parti, ${prenom} : votre checklist est prête`
                : "C'est parti : votre checklist est prête"}
            </h1>

            <Button variant="accent" size="lg" className="rounded-full group mt-2" onClick={triggerPdfDownload}>
              <Download size={16} className="mr-1.5" />
              Télécharger ma checklist PDF
              <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Separator */}
          <div className="w-16 h-px bg-border mx-auto my-10" />

          {/* Next step */}
          <div className="text-center">
            <h2 className="font-display text-[20px] md:text-[26px] text-foreground mb-3">
              Une question sur votre situation spécifique ?
            </h2>
            <p className="text-[15px] text-muted-foreground font-body leading-relaxed mb-2 max-w-[480px] mx-auto">
              La checklist vous donnera une vue d'ensemble. Mais si vous identifiez un point à risque dans votre dossier, l'étape suivante est un échange de 20 minutes avec Mika pour valider votre situation exacte.
            </p>
            <p className="text-[14px] text-muted-foreground/80 font-body italic mb-6">
              Premier échange gratuit, confidentiel, sans engagement.
            </p>
            <Button variant="accent" size="lg" className="rounded-full group" asChild>
              <Link to="/diagnostic/">
                Faire le diagnostic de ma situation
                <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Separator */}
          <div className="w-16 h-px bg-border mx-auto my-10" />

          {/* Pour aller plus loin */}
          <div>
            <h2 className="font-display text-[18px] md:text-[22px] text-foreground mb-4 text-center">
              Pour aller plus loin
            </h2>
            <div className="flex flex-col gap-3 items-center">
              <Link
                to="/ressources/calculateur-bureau/"
                className="text-[14px] text-primary font-body underline underline-offset-2 hover:text-accent transition-colors"
              >
                Calculer ma déduction bureau exactement →
              </Link>
              <Link
                to="/blog/fiscalite-belgique/erreurs-bureau-a-domicile-controle-fiscal/"
                className="text-[14px] text-primary font-body underline underline-offset-2 hover:text-accent transition-colors"
              >
                Les 5 erreurs qui déclenchent un contrôle →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
