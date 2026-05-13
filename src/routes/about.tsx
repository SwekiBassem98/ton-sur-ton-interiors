import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Award, Heart, Users, Sparkles } from "lucide-react";
import showroomImg from "@/assets/showroom.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — Meuble Ton sur Ton" },
      { name: "description", content: "Découvrez l'histoire de Meuble Ton sur Ton, magasin d'ameublement et de décoration à La Soukra." },
      { property: "og:title", content: "À propos — Meuble Ton sur Ton" },
      { property: "og:description", content: "Notre histoire, notre savoir-faire, notre showroom à La Soukra." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Award, title: "Qualité", desc: "Des matériaux nobles et des finitions soignées sur chaque pièce." },
  { icon: Heart, title: "Passion", desc: "Une équipe passionnée par la décoration et l'art de vivre." },
  { icon: Users, title: "Proximité", desc: "Un accompagnement personnalisé du choix à l'installation." },
  { icon: Sparkles, title: "Élégance", desc: "Un style intemporel qui sublime tous les intérieurs." },
];

function AboutPage() {
  return (
    <Layout>
      <section className="bg-gradient-warm">
        <div className="container mx-auto grid items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">À propos</p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">
              L'art de vivre, <span className="italic text-primary">à la tunisienne</span>
            </h1>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Meuble Ton sur Ton est un magasin d'ameublement et de décoration installé
              à La Soukra. Depuis sa création, notre maison rassemble des collections
              choisies avec soin pour offrir des intérieurs élégants, chaleureux et
              durables.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Notée 4,3 sur 5 par nos clients sur Google, notre équipe vous accueille
              dans un showroom pensé comme un véritable lieu d'inspiration.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-elegant">
            <img src={showroomImg} alt="Notre showroom" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mb-14 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Nos valeurs</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Ce qui nous <span className="italic">anime</span></h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
              style={{ animation: `fade-up 0.6s ease-out ${i * 0.1}s both` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-20 text-center">
          <h2 className="max-w-2xl font-display text-4xl md:text-5xl">
            Envie d'en discuter <span className="italic text-primary-glow">autour d'un café ?</span>
          </h2>
          <Link to="/contact" className="rounded-full bg-primary px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-transform hover:scale-105">
            Nous contacter
          </Link>
        </div>
      </section>
    </Layout>
  );
}
