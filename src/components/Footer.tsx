import { Link } from "react-router-dom";
import logoSquare from "@/assets/logo-square.png";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white relative">
      {/* Red top line */}
      <div className="h-[3px] bg-accent w-full" />

      <div className="container-mf py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <img src={logoSquare} alt="MFinances" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-white/60 text-[13px] leading-relaxed">
              MFinances S.R.L.<br />
              20 Rue de la Magnanerie<br />
              1180 Uccle, Bruxelles<br />
              <a href="tel:+3228860550" className="hover:text-white transition-colors">+32 2 886 05 50</a><br />
              <a href="mailto:info@mfinances.be" className="hover:text-white transition-colors">info@mfinances.be</a>
            </p>
            <p className="text-white/40 text-[11px] mt-3">
              BCE 0827.635.870 · ITAA 50.624.805
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-[14px] mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              {[
                ["Contrôle de gestion", "/services/controle-de-gestion/"],
                ["DAF à temps partiel", "/services/daf-externalise/"],
                ["Trésorerie prévisionnelle", "/services/tresorerie/"],
                ["Comptabilité", "/services/comptabilite/"],
                ["Fiscalité", "/services/fiscalite/"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-white/60 text-[13px] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-[14px] mb-4 text-white">Ressources</h4>
            <ul className="space-y-2">
              {[
                ["Diagnostic trésorerie", "/diagnostic/"],
                ["Checklist trésorerie", "/checklist-tresorerie/"],
                ["Tarifs", "/tarifs/"],
                ["Blog", "/blog/"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-white/60 text-[13px] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-[14px] mb-4 text-white">Légal</h4>
            <ul className="space-y-2">
              {[
                ["Mentions légales", "/mentions-legales/"],
                ["Politique de confidentialité", "/politique-de-confidentialite/"],
                ["Politique de cookies", "/politique-de-cookies/"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-white/60 text-[13px] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-mf py-4 text-center">
          <p className="text-white/40 text-[12px]">
            © {new Date().getFullYear()} MFinances S.R.L. — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
