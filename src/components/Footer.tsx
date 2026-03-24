import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logoSquare from "@/assets/logo-square.webp";

const servicesLinks = [
  { label: "DAF à temps partiel", href: "/services/daf-externalise/" },
  { label: "Contrôle de gestion", href: "/services/controle-de-gestion/" },
  { label: "Trésorerie", href: "/services/tresorerie/" },
  { label: "Comptabilité", href: "/services/comptabilite/" },
  { label: "Fiscalité", href: "/services/fiscalite/" },
  { label: "Création d'entreprise", href: "/services/creation-entreprise/" },
];

const ressourcesLinks = [
  { label: "Blog", href: "/blog/" },
  { label: "Diagnostic gratuit", href: "/diagnostic/" },
  { label: "Guide trésorerie gratuit", href: "/checklist-tresorerie/" },
  { label: "Support", href: "/support/" },
  { label: "Pourquoi MFinances", href: "/a-propos/" },
];

const structuresLinks = [
  { label: "Société d'exploitation", href: "/qui-nous-accompagnons/societe-exploitation/" },
  { label: "Société de management", href: "/qui-nous-accompagnons/societe-de-management/" },
  { label: "Société de moyens", href: "/qui-nous-accompagnons/societe-de-moyens/" },
  { label: "ASBL", href: "/qui-nous-accompagnons/asbl/" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales/" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite/" },
  { label: "Politique de cookies", href: "/politique-de-cookies/" },
];

const linkClass = "block text-[14px] text-white/70 hover:text-white transition-colors py-1";

export default function Footer() {
  return (
    <footer className="bg-[#1B2B5E] text-white">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1 — À propos */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <img src={logoSquare} alt="MFinances" className="h-[60px] rounded-lg" />
            <p className="text-accent text-sm italic leading-relaxed">
              "Transformez votre stress en succès."
            </p>
            <div className="space-y-2.5 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/50" />
                <span>20 Rue de la Magnanerie,<br />1180 Uccle, Bruxelles</span>
              </div>
              <a href="tel:+3228860550" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={15} className="shrink-0 text-white/50" />
                +32 2 886 05 50
              </a>
              <a href="mailto:info@mfinances.be" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={15} className="shrink-0 text-white/50" />
                info@mfinances.be
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] text-white/50 bg-white/10 rounded px-2.5 py-1">ITAA 50.624.805</span>
              <span className="text-[11px] text-white/50 bg-white/10 rounded px-2.5 py-1">BCE 0827.635.870</span>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="font-semibold text-[15px] mb-4 tracking-wide">Services</h3>
            <nav className="space-y-0.5">
              {servicesLinks.map((l) => (
                <Link key={l.label} to={l.href} className={linkClass}>{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Ressources */}
          <div>
            <h3 className="font-semibold text-[15px] mb-4 tracking-wide">Ressources</h3>
            <nav className="space-y-0.5">
              {ressourcesLinks.map((l) => (
                <Link key={l.label} to={l.href} className={linkClass}>{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Légal */}
          <div>
            <h3 className="font-semibold text-[15px] mb-4 tracking-wide">Légal</h3>
            <nav className="space-y-0.5">
              {legalLinks.map((l) => (
                <Link key={l.label} to={l.href} className={linkClass}>{l.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t-2 border-accent">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-white/40">
          <span>© 2026 MFinances S.R.L. — Tous droits réservés | mfinances.be | info@mfinances.be</span>
          <span>TVA BE 0827.635.870 | ITAA 50.624.805 | Design by <a href="https://msl-itech.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent transition-colors">msl-itech.com</a></span>
        </div>
      </div>
    </footer>
  );
}
