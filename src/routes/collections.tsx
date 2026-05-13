import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowRight } from "lucide-react";
import livingImg from "@/assets/cat-living.jpg";
import diningImg from "@/assets/cat-dining.jpg";
import bedroomImg from "@/assets/cat-bedroom.jpg";
import officeImg from "@/assets/cat-office.jpg";
import heroImg from "@/assets/hero-living.jpg";
import showroomImg from "@/assets/showroom.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Meuble Ton sur Ton" },
      { name: "description", content: "Découvrez nos collections de salons, salles à manger, chambres et bureaux." },
      { property: "og:title", content: "Collections — Meuble Ton sur Ton" },
      { property: "og:description", content: "Pièces choisies pour sublimer chaque espace de votre intérieur." },
    ],
  }),
  component: CollectionsPage,
});

const items = [
  { title: "Salon Jazz", tag: "Tendance", img: heroImg, desc: "Modulable, chaleureux, parfait pour les grands espaces." },
  { title: "Salon Onda", tag: "Nouveau", img: livingImg, desc: "Lignes courbes, accents terracotta, ambiance contemporaine." },
  { title: "Salle à manger Olivia", tag: "Best-seller", img: diningImg, desc: "Table en bois massif et chaises tapissées sur mesure." },
  { title: "Chambre Sahara", tag: "Premium", img: bedroomImg, desc: "Tête de lit capitonnée, tons chauds, sérénité absolue." },
  { title: "Bureau Atelier", tag: "Essentiel", img: officeImg, desc: "Bois clair, espace de rangement intelligent, lumière naturelle." },
  { title: "Ambiance Showroom", tag: "Inspiration", img: showroomImg, desc: "Notre savoir-faire mis en scène à La Soukra." },
];

function CollectionsPage() {
  return (
    <Layout>
      <section className="bg-gradient-warm">
        <div className="container mx-auto px-4 py-20 text-center md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Nos collections</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl md:text-6xl">
            Chaque pièce, une <span className="italic text-primary">histoire</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Explorez nos univers et trouvez la pièce qui transformera votre intérieur.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={it.title}
              className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
              style={{ animation: `fade-up 0.6s ease-out ${i * 0.08}s both` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={it.img} alt={it.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary backdrop-blur">
                  {it.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wider text-primary">
                  Demander un devis <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
