import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import logoSquare from "@/assets/logo-square.webp";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.53V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socialLinks = [
  { label: "LinkedIn (Mika)", href: "https://www.linkedin.com/in/mika-musungayi-4b0b9798/", icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575798073143", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/mfinances_expertcomptable", icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@mfinances8", icon: TikTokIcon },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCS-d-jxSx2kdOb9i06UUNqw", icon: Youtube },
];

const servicesLinks = [
  { label: "DAF à temps partiel", href: "/services/daf-externalise/" },
  { label: "Contrôle de gestion", href: "/services/controle-de-gestion/" },
  { label: "Trésorerie", href: "/services/tresorerie/" },
  { label: "Comptabilité", href: "/services/comptabilite/" },
  { label: "Fiscalité", href: "/services/fiscalite/" },
  { label: "Création d'entreprise", href: "/services/creation-entreprise/" },
  { label: "À propos", href: "/a-propos/" },
];

const profilsLinks = [
  { label: "Indépendants & Startups", href: "/qui-nous-accompagnons/independants-et-startups/" },
  { label: "Commerce & Horeca", href: "/qui-nous-accompagnons/commerce-et-horeca/" },
  { label: "Professions de santé", href: "/qui-nous-accompagnons/professions-de-sante/" },
  { label: "Entreprises en croissance", href: "/qui-nous-accompagnons/entreprises-en-croissance/" },
  { label: "Promoteurs immobiliers", href: "/qui-nous-accompagnons/promoteurs-immobiliers/" },
];

const ressourcesLinks = [
  { label: "Blog", href: "/blog/" },
  { label: "Diagnostic gratuit", href: "/diagnostic/" },
  { label: "Frais Défendables", href: "/frais-defendables/" },
  { label: "Guide trésorerie gratuit", href: "/checklist-tresorerie/" },
  { label: "Calculateur bureau à domicile", href: "/ressources/calculateur-bureau/" },
  { label: "Générateur de bail pro", href: "/ressources/generateur-bail/" },
  { label: "Checklist contrôle bureau", href: "/ressources/checklist-controle-bureau/" },
  { label: "Support", href: "/support/" },
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
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-8 md:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-8">
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

            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-2.5">Suivez-nous</p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-white text-white/70 flex items-center justify-center transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="font-semibold text-[15px] mb-4 tracking-wide text-[#E8393A]">Services</h3>
            <nav className="space-y-0.5">
              {servicesLinks.map((l) => (
                <Link key={l.label} to={l.href} className={linkClass}>{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Profils */}
          <div>
            <h3 className="font-semibold text-[15px] mb-4 tracking-wide text-[#E8393A]">Profils</h3>
            <nav className="space-y-0.5">
              {profilsLinks.map((l) => (
                <Link key={l.label} to={l.href} className={linkClass}>{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Ressources */}
          <div>
            <h3 className="font-semibold text-[15px] mb-4 tracking-wide text-[#E8393A]">Ressources</h3>
            <nav className="space-y-0.5">
              {ressourcesLinks.map((l) => (
                <Link key={l.label} to={l.href} className={linkClass}>{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Structures */}
          <div>
            <h3 className="font-semibold text-[15px] mb-4 tracking-wide text-[#E8393A]">Structures</h3>
            <nav className="space-y-0.5">
              {structuresLinks.map((l) => (
                <Link key={l.label} to={l.href} className={linkClass}>{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Col 5 — Légal */}
          <div>
            <h3 className="font-semibold text-[15px] mb-4 tracking-wide text-[#E8393A]">Légal</h3>
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
