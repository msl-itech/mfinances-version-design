import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoSquare from "@/assets/logo-square.png";

const navLinks = [
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "Contrôle de gestion", href: "/services/controle-de-gestion/" },
      { label: "DAF à temps partiel", href: "/services/daf-externalise/" },
      { label: "Trésorerie prévisionnelle", href: "/services/tresorerie/" },
      { label: "Comptabilité", href: "/services/comptabilite/" },
      { label: "Fiscalité", href: "/services/fiscalite/" },
      { label: "Création d'entreprise", href: "/services/creation-entreprise/" },
    ],
  },
  {
    label: "Qui nous accompagnons",
    href: "/qui-nous-accompagnons/",
    children: [
      { label: "Indépendants & Startups", href: "/qui-nous-accompagnons/independants-et-startups/" },
      { label: "Commerce & Horeca", href: "/qui-nous-accompagnons/commerce-et-horeca/" },
      { label: "Professions de santé", href: "/qui-nous-accompagnons/professions-de-sante/" },
      { label: "Entreprises en croissance", href: "/qui-nous-accompagnons/entreprises-en-croissance/" },
      { label: "Promoteurs immobiliers", href: "/qui-nous-accompagnons/promoteurs-immobiliers/" },
    ],
  },
  { label: "Tarifs", href: "/tarifs/" },
  { label: "Diagnostic", href: "/diagnostic/", highlight: true },
  { label: "Pourquoi MFinances", href: "/a-propos/" },
  { label: "Contact", href: "/contact/" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[100] transition-all duration-200 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
        style={{ borderBottom: "1px solid rgba(27,43,94,0.08)" }}
      >
        <div className="container-mf flex items-center justify-between h-[72px] md:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logoSquare} alt="MFinances" className="h-10" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`link-underline px-3 py-2 text-[14px] font-medium transition-colors ${
                    link.highlight
                      ? "text-accent hover:bg-[#FFF0F0] rounded-lg"
                      : "text-primary hover:text-primary-light"
                  } flex items-center gap-1`}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className="opacity-50" />}
                </Link>

                {link.children && openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 pt-2 animate-fade-up"
                    style={{ animationDuration: "0.2s" }}
                  >
                    <div className="bg-white rounded-2xl shadow-[0_12px_48px_rgba(27,43,94,0.12)] border border-border p-2 min-w-[240px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2.5 text-[13px] text-foreground hover:bg-background rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-[13px] text-muted-foreground">+32 2 886 05 50</span>
            <Button variant="accent" size="sm" asChild>
              <Link to="/diagnostic/">Voir si mon entreprise est en danger →</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-primary"
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
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white animate-slide-in-right shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <img src={logoSquare} alt="MFinances" className="h-8" />
              <button onClick={() => setMobileOpen(false)} aria-label="Fermer">
                <X size={24} strokeWidth={1.5} className="text-primary" />
              </button>
            </div>
            <nav className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    className={`block px-4 py-3 rounded-lg text-[15px] font-medium ${
                      link.highlight ? "text-accent bg-[#FFF0F0]" : "text-primary hover:bg-background"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-[13px] text-muted-foreground hover:text-primary"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="p-4">
              <Button variant="accent" className="w-full" asChild>
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
