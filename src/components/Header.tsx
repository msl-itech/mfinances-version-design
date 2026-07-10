import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  ArrowRight,
  Calculator,
  Home,
  FileText,
  ClipboardCheck,
  CheckSquare,
} from "lucide-react";

import logoSquare from "@/assets/logo-square.webp";

const servicesLinks = [
  { label: "DAF à temps partiel", href: "/services/daf-externalise/" },
  { label: "Contrôle de gestion", href: "/services/controle-de-gestion/" },
  { label: "Trésorerie", href: "/services/tresorerie/" },
  { label: "Comptabilité", href: "/services/comptabilite/" },
  { label: "Fiscalité", href: "/services/fiscalite/" },
  { label: "Création d'entreprise", href: "/services/creation-entreprise/" },
];

const audienceLeft = [
  { label: "Indépendants & Startups", href: "/qui-nous-accompagnons/independants-et-startups/" },
  { label: "Commerce & Horeca", href: "/qui-nous-accompagnons/commerce-et-horeca/" },
  { label: "Professions de santé", href: "/qui-nous-accompagnons/professions-de-sante/" },
  { label: "Entreprises en croissance", href: "/qui-nous-accompagnons/entreprises-en-croissance/" },
  { label: "Promoteurs immobiliers", href: "/qui-nous-accompagnons/promoteurs-immobiliers/" },
];

const audienceRight = [
  { label: "ASBL", href: "/qui-nous-accompagnons/asbl/" },
  { label: "Société d'exploitation", href: "/qui-nous-accompagnons/societe-exploitation/" },
  { label: "Société de management", href: "/qui-nous-accompagnons/societe-de-management/" },
  { label: "Société de moyens", href: "/qui-nous-accompagnons/societe-de-moyens/" },
];

const homeVersions = [
  { label: "Accueil V2", href: "/accueilv2/" },
  { label: "Accueil V3", href: "/accueilv3/" },
];

const outilsLinks = [
  { label: "Frais Défendables", href: "/frais-defendables/", icon: Calculator, description: "Vérifiez la déductibilité de 30 charges" },
  { label: "Calculateur bureau à domicile", href: "/ressources/calculateur-bureau/", icon: Home, description: "Calculez votre part professionnelle" },
  { label: "Générateur de bail pro", href: "/ressources/generateur-bail/", icon: FileText, description: "Bail meublé 60/40 en quelques clics" },
  { label: "Checklist trésorerie", href: "/checklist-tresorerie/", icon: ClipboardCheck, description: "Anticipez les risques de trésorerie" },
  { label: "Checklist contrôle bureau", href: "/ressources/checklist-controle-bureau/", icon: CheckSquare, description: "Préparez votre contrôle fiscal" },
];

function DropdownWrapper({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const ref = useRef<HTMLDivElement>(null);

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <Link to={href} className="flex items-center gap-1 text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors py-2">
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Link>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[150]">
          <div
            className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(27,43,94,0.14)] border border-border/50 animate-in fade-in-0 slide-in-from-top-2 duration-200"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAudienceOpen, setMobileAudienceOpen] = useState(false);
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
  const [mobileDiagOpen, setMobileDiagOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[100] transition-all duration-200 bg-white ${
          scrolled ? "shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-md" : ""
        }`}
        style={{ borderBottom: scrolled ? "none" : "1px solid rgba(27,43,94,0.06)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 flex items-center justify-between h-[60px] md:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logoSquare}
              alt="MFinances — Cabinet d'expertise comptable Bruxelles"
              className="h-9 md:h-10"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {/* Services dropdown */}
            <DropdownWrapper label="Services" href="/services/">
              <div className="p-3 min-w-[220px]">
                {servicesLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block px-4 py-2.5 rounded-lg text-[14px] text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </DropdownWrapper>

            {/* Audience dropdown */}
            <DropdownWrapper label="Qui nous accompagnons" href="/qui-nous-accompagnons/">
              <div className="p-4 min-w-[440px] grid grid-cols-2 gap-x-6">
                <div>
                  <div className="px-4 pb-2 mb-1 border-b-2 border-accent">
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/50">Profils</span>
                  </div>
                  {audienceLeft.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-4 py-2.5 rounded-lg text-[14px] text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div>
                  <div className="px-4 pb-2 mb-1 border-b-2 border-accent">
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/50">Structures</span>
                  </div>
                  {audienceRight.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-4 py-2.5 rounded-lg text-[14px] text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </DropdownWrapper>

            <Link to="/tarifs/" className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors">
              Tarifs
            </Link>

            <DropdownWrapper label="Diagnostic & Outils" href="/diagnostic/">
              <div className="flex min-w-[640px] rounded-2xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(27,43,94,0.14)] border border-border/50">
                {/* Left — Diagnostic featured */}
                <div className="w-[260px] bg-primary p-6 text-primary-foreground flex flex-col justify-between relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-primary-foreground/10 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4">
                      Diagnostic
                    </span>
                    <h3 className="font-display text-[22px] leading-tight mb-3">
                      Suis-je en danger
                      <br />sans le savoir ?
                    </h3>
                    <p className="text-primary-foreground/80 text-[13px] leading-relaxed mb-6">
                      8 questions ciblées pour identifier vos fragilités financières en 3 minutes.
                    </p>
                    <Link
                      to="/diagnostic/"
                      className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-semibold text-[13px] transition-all hover:bg-accent/90"
                    >
                      Lancer le diagnostic
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right — Outils grid */}
                <div className="flex-1 p-6 bg-background">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/50">Outils & Ressources</h4>
                    <span className="text-[11px] text-foreground/40">5 outils disponibles</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {outilsLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="group flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-muted"
                        >
                          <div className="shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon size={18} strokeWidth={1.5} />
                          </div>
                          <div>
                            <div className="text-[13px] font-semibold text-foreground leading-snug">{link.label}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{link.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </DropdownWrapper>

            <Link to="/blog/" className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors">
              Blog
            </Link>

            <Link to="/contact/" className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+3228860550"
              className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone size={14} strokeWidth={1.5} />
              +32 2 886 05 50
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white animate-in slide-in-from-right duration-300 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <img src={logoSquare} alt="MFinances" className="h-8" />
              <button onClick={() => setMobileOpen(false)} aria-label="Fermer">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-0.5">
              {/* Services accordion */}
              <button
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-[15px] font-medium text-foreground hover:bg-muted"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services
                <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 pb-2">
                  {servicesLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-4 py-2 text-[14px] text-foreground/70 hover:text-foreground rounded-lg hover:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Audience accordion */}
              <button
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-[15px] font-medium text-foreground hover:bg-muted"
                onClick={() => setMobileAudienceOpen(!mobileAudienceOpen)}
              >
                Qui nous accompagnons
                <ChevronDown size={16} className={`transition-transform ${mobileAudienceOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAudienceOpen && (
                <div className="pl-4 pb-2">
                  <span className="block px-4 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/40">Profils</span>
                  {audienceLeft.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-4 py-2 text-[14px] text-foreground/70 hover:text-foreground rounded-lg hover:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <span className="block px-4 pt-2 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/40">Structures</span>
                  {audienceRight.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-4 py-2 text-[14px] text-foreground/70 hover:text-foreground rounded-lg hover:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link to="/tarifs/" className="block px-4 py-3 rounded-lg text-[15px] font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
                Tarifs
              </Link>
              <button
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-[15px] font-medium text-foreground hover:bg-muted"
                onClick={() => setMobileDiagOpen(!mobileDiagOpen)}
              >
                Diagnostic & Outils
                <ChevronDown size={16} className={`transition-transform ${mobileDiagOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileDiagOpen && (
                <div className="pl-4 pb-2">
                  <span className="block px-4 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/40">Diagnostic</span>
                  <Link
                    to="/diagnostic/"
                    className="block px-4 py-2 text-[14px] text-foreground/70 hover:text-foreground rounded-lg hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    Diagnostic gratuit
                  </Link>
                  <span className="block px-4 pt-2 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase text-foreground/40">Outils</span>
                  {outilsLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-4 py-2 text-[14px] text-foreground/70 hover:text-foreground rounded-lg hover:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
              <Link to="/blog/" className="block px-4 py-3 rounded-lg text-[15px] font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
                Blog
              </Link>
              <Link to="/contact/" className="block px-4 py-3 rounded-lg text-[15px] font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>

              <a href="tel:+3228860550" className="flex items-center gap-2 px-4 py-3 text-[14px] text-muted-foreground">
                <Phone size={16} strokeWidth={1.5} />
                +32 2 886 05 50
              </a>
            </nav>

          </div>
        </div>
      )}
    </>
  );
}
