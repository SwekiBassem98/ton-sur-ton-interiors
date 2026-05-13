import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Truck, HandHeart, Star } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import heroImg from "@/assets/hero-living.jpg";
import livingImg from "@/assets/cat-living.jpg";
import diningImg from "@/assets/cat-dining.jpg";
import bedroomImg from "@/assets/cat-bedroom.jpg";
import officeImg from "@/assets/cat-office.jpg";
import showroomImg from "@/assets/showroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meuble Ton sur Ton — Ameublement & Décoration à La Soukra" },
      {
        name: "description",
        content:
          "Meuble Ton sur Ton, magasin d'ameublement et de décoration à La Soukra. Découvrez des collections raffinées pour sublimer votre intérieur.",
      },
      { property: "og:title", content: "Meuble Ton sur Ton — Ameublement & Décoration" },
      { property: "og:description", content: "Sublimez votre intérieur avec nos collections raffinées." },
    ],
  }),
  component: Index,
});

const categories = [
  { title: "Salons", img: livingImg, desc: "Confort et élégance" },
  { title: "Salles à manger", img: diningImg, desc: "Convivialité raffinée" },
  { title: "Chambres", img: bedroomImg, desc: "Repos et sérénité" },
  { title: "Bureaux", img: officeImg, desc: "Productivité et style" },
];

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-warm">
        <div className="container mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24 lg:py-28">
          <div className="space-y-7" style={{ animation: "fade-up 0.8s ease-out both" }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Collection Ton sur Ton
            </div>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              L'art de <span className="italic text-primary">sublimer</span>
              <br />
              votre intérieur
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Design raffiné, confort absolu et finitions soignées. Découvrez nos
              collections pensées pour créer une ambiance chaleureuse et élégante.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/collections"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-soft transition-all hover:scale-[1.03] hover:bg-primary/90"
              >
                Découvrir la collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-transparent px-7 py-3.5 text-sm font-medium uppercase tracking-wider transition-all hover:border-primary hover:text-primary"
              >
                Visiter le showroom
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              <Stat value="500+" label="Références" />
              <Stat value="10K+" label="Clients satisfaits" />
              <Stat value="4,3★" label="Avis Google" />
            </div>
          </div>
          <div className="relative" style={{ animation: "fade-up 1s ease-out 0.2s both" }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-elegant">
              <img
                src={heroImg}
                alt="Salon moderne aménagé par Meuble Ton sur Ton"
                className="h-full w-full object-cover"
                style={{ animation: "slow-zoom 12s ease-in-out infinite alternate" }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-card px-5 py-4 shadow-elegant md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <Star className="h-5 w-5 fill-primary" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Note Google</div>
                  <div className="font-display text-lg">4,3 / 5 — 98 avis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-background">
        <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3">
          <Trust icon={<Truck className="h-5 w-5" />} text="Livraison partout en Tunisie" />
          <Trust icon={<Sparkles className="h-5 w-5" />} text="Qualité & finition haut de gamme" />
          <Trust icon={<HandHeart className="h-5 w-5" />} text="Conseils & accompagnement personnalisés" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="mb-14 flex flex-col items-end justify-between gap-4 md:flex-row">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Nos univers</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Pièces choisies, <span className="italic">harmonie complète</span>
            </h2>
          </div>
          <Link
            to="/collections"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary"
          >
            Voir toutes les collections
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Link
              to="/collections"
              key={c.title}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft"
              style={{ animation: `fade-up 0.6s ease-out ${i * 0.1}s both` }}
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                <div className="text-xs uppercase tracking-widest opacity-80">{c.desc}</div>
                <div className="mt-1 flex items-end justify-between">
                  <h3 className="font-display text-2xl text-background">{c.title}</h3>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SHOWROOM SPLIT */}
      <section className="bg-secondary">
        <div className="container mx-auto grid items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-elegant">
            <img src={showroomImg} alt="Showroom Meuble Ton sur Ton" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Notre showroom</p>
            <h2 className="font-display text-4xl md:text-5xl">
              Venez découvrir <span className="italic">l'expérience</span> en personne
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Situé à La Soukra, notre showroom met en scène nos collections dans des
              ambiances réelles. Touchez les matières, testez les assises, laissez-vous
              guider par notre équipe pour composer un intérieur qui vous ressemble.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Adresse</div>
                <div className="mt-1 font-medium">Résidence FARES, Av. Fattouma Bourguiba, La Soukra 2036</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Horaires</div>
                <div className="mt-1 font-medium">Ouvert · Ferme à 19:00</div>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-soft transition-all hover:scale-[1.03]"
            >
              Nous rendre visite
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Avis clients</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            <span className="italic">4,3</span> sur 5 — 98 avis Google
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-foreground/85">"{t.text}"</p>
              <div className="mt-5 text-sm font-medium">{t.name}</div>
              <div className="text-xs text-muted-foreground">Client vérifié</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="container mx-auto flex flex-col items-center gap-8 px-4 py-20 text-center md:py-28">
          <h2 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Et si votre intérieur devenait <span className="italic text-primary-glow">votre signature ?</span>
          </h2>
          <p className="max-w-xl text-background/70">
            Notre équipe vous accompagne du choix des pièces à l'agencement final pour
            une ambiance qui vous ressemble.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-transform hover:scale-105"
          >
            Prendre rendez-vous
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-primary md:text-3xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Trust({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
}

const testimonials = [
  {
    name: "Sonia B.",
    text: "Un grand choix de meubles modernes et de qualité. L'équipe a été à l'écoute et de très bon conseil pour notre salon.",
  },
  {
    name: "Karim H.",
    text: "Showroom magnifique à La Soukra. Les finitions sont vraiment soignées, on sent le savoir-faire.",
  },
  {
    name: "Leïla M.",
    text: "Livraison rapide et installation impeccable. Notre chambre a complètement changé d'ambiance, merci !",
  },
];
