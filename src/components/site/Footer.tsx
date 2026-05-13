import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/90">
      <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-2xl">
            Meuble <span className="italic text-primary-glow">Ton sur Ton</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-background/60">
            Magasin d'ameublement et de décoration. Sublimez votre intérieur avec
            des pièces choisies avec soin.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-background/20 transition hover:bg-primary hover:border-primary">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-background/20 transition hover:bg-primary hover:border-primary">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg">Navigation</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/" className="hover:text-primary-glow">Accueil</Link></li>
            <li><Link to="/collections" className="hover:text-primary-glow">Collections</Link></li>
            <li><Link to="/about" className="hover:text-primary-glow">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-primary-glow">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-background/70">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" /> Résidence FARES, Av. Fattouma Bourguiba, La Soukra 2036</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" /> <a href="tel:+21654480694">54 480 694</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg">Horaires</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary-glow" /> Lun – Sam : 9h – 19h</li>
            <li className="ml-6">Dimanche : Fermé</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-background/50 md:flex-row">
          <p>© {new Date().getFullYear()} Meuble Ton sur Ton. Tous droits réservés.</p>
          <p>Conçu avec passion en Tunisie</p>
        </div>
      </div>
    </footer>
  );
}
