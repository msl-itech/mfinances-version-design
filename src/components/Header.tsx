import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoSquare from "@/assets/logo-square.png";

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
  { label: "Société de management", href: "/qui-nous-accompagnons/" },
  { label: "Société de moyens", href: "/qui-nous-accompagnons/societe-de-moyens/" },
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
            <DropdownWrapper label="Services">
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
            <DropdownWrapper label="Qui nous accompagnons">
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

            <Link
              to="/diagnostic/"
              className="text-[14px] font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Diagnostic
            </Link>

            <Link to="/a-propos/" className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors">
              Pourquoi MFinances
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
            <Button variant="accent" size="sm" className="rounded-lg px-5 text-[14px]" asChild>
              <Link to="/diagnostic/">Voir si mon entreprise est en danger →</Link>
            </Button>
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
              <Link to="/diagnostic/" className="block px-4 py-3 rounded-lg text-[15px] font-semibold text-accent hover:bg-accent/5" onClick={() => setMobileOpen(false)}>
                Diagnostic
              </Link>
              <Link to="/a-propos/" className="block px-4 py-3 rounded-lg text-[15px] font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
                Pourquoi MFinances
              </Link>
              <Link to="/contact/" className="block px-4 py-3 rounded-lg text-[15px] font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>

              <a href="tel:+3228860550" className="flex items-center gap-2 px-4 py-3 text-[14px] text-muted-foreground">
                <Phone size={16} strokeWidth={1.5} />
                +32 2 886 05 50
              </a>
            </nav>

            <div className="p-4 border-t border-border">
              <Button variant="accent" className="w-full rounded-lg" asChild>
                <Link to="/diagnostic/" onClick={() => setMobileOpen(false)}>
                  Voir si mon entreprise est en danger →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
