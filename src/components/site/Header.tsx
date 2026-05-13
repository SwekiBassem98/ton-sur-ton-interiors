import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-foreground text-background text-xs">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="hidden items-center gap-4 md:flex">
            <span className="inline-flex items-center gap-1.5 opacity-80">
              <MapPin className="h-3 w-3" /> Résidence FARES, Av. Fattouma Bourguiba, La Soukra 2036
            </span>
          </div>
          <a href="tel:+21654480694" className="inline-flex items-center gap-1.5 hover:text-primary-foreground/90">
            <Phone className="h-3 w-3" /> 54 480 694
          </a>
        </div>
      </div>
      <div
        className={`transition-all duration-500 ${
          scrolled ? "bg-background/90 shadow-soft backdrop-blur-md" : "bg-background"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="group flex items-baseline gap-1">
            <span className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Meuble
            </span>
            <span className="font-display text-2xl italic text-primary md:text-3xl">
              Ton sur Ton
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:scale-105 hover:bg-primary/90"
            >
              Visiter le showroom
            </Link>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border md:hidden">
            <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-foreground/80"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
