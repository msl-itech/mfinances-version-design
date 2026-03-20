import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoSquare from "@/assets/logo-square.png";

const navLinks = [
  { label: "La Solution", href: "/services/" },
  { label: "Services", href: "/tarifs/" },
  { label: "L'Expert", href: "/a-propos/" },
  { label: "Contact", href: "/contact/" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        style={{ borderBottom: "1px solid rgba(27,43,94,0.06)" }}
      >
        <div className="container-mf flex items-center justify-between h-[64px]">
          <Link to="/" className="flex-shrink-0">
            <img src={logoSquare} alt="MFinances" className="h-9" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button variant="accent" size="sm" className="rounded-full px-5" asChild>
              <Link to="/diagnostic/">Consulter un expert</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white animate-slide-in-right shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <img src={logoSquare} alt="MFinances" className="h-8" />
              <button onClick={() => setMobileOpen(false)} aria-label="Fermer">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block px-4 py-3 rounded-lg text-[15px] font-medium text-foreground hover:bg-background"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-4">
              <Button variant="accent" className="w-full rounded-full" asChild>
                <Link to="/diagnostic/" onClick={() => setMobileOpen(false)}>
                  Consulter un expert
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
