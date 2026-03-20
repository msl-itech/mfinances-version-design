import { Link } from "react-router-dom";
import logoSquare from "@/assets/logo-square.png";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-mf py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <img src={logoSquare} alt="MFinances" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-white/40 text-[13px] leading-relaxed">
              CABINET D'EXPERTISE COMPTABLE &<br />
              DE PILOTAGE FINANCIER, PM
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-[13px] mb-4 text-white/70 uppercase tracking-wide">Services</h4>
            <ul className="space-y-2">
              {[
                ["Contrôle de gestion", "/services/controle-de-gestion/"],
                ["DAF externalisé", "/services/daf-externalise/"],
                ["Plan de trésorerie", "/services/tresorerie/"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-white/40 text-[13px] hover:text-white/70 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[13px] mb-4 text-white/70 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-white/40 text-[13px]">
              <li>1180 Uccle, Bruxelles</li>
              <li>
                <a href="tel:+3228860550" className="hover:text-white/70 transition-colors">+32 2 886 05 50</a>
              </li>
              <li>
                <a href="mailto:info@mfinances.be" className="hover:text-white/70 transition-colors">info@mfinances.be</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-mf py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-[11px]">
            © {new Date().getFullYear()} MFinances S.R.L. · Tous droits réservés.
          </p>
          <div className="flex gap-4 text-white/25 text-[11px]">
            <Link to="/mentions-legales/" className="hover:text-white/40 transition-colors">Confidentialité</Link>
            <Link to="/politique-de-cookies/" className="hover:text-white/40 transition-colors">Politique de cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
