import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Star, Truck, ShieldCheck, HandHeart } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { getProductBySlug, formatPrice, products } from "@/lib/products";

export const Route = createFileRoute("/collections_/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — Meuble Ton sur Ton` },
          { name: "description", content: loaderData.product.desc },
          { property: "og:title", content: `${loaderData.product.title} — Meuble Ton sur Ton` },
          { property: "og:description", content: loaderData.product.desc },
          { property: "og:image", content: loaderData.product.img },
        ]
      : [{ title: "Produit — Meuble Ton sur Ton" }],
  }),
  component: ProductDetailPage,
  notFoundComponent: () => (
    <Layout>
      <section className="container mx-auto px-4 py-28 text-center">
        <h1 className="font-display text-4xl">Produit introuvable</h1>
        <p className="mt-4 text-muted-foreground">
          Cette pièce n'existe pas ou a été retirée du catalogue.
        </p>
        <Link
          to="/collections"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux collections
        </Link>
      </section>
    </Layout>
  ),
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.img];
  const [activeImg, setActiveImg] = useState(gallery[0]);

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Layout>
      {/* BREADCRUMB */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container mx-auto flex items-center gap-2 px-4 py-4 text-xs uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-primary">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/collections" className="transition-colors hover:text-primary">
            Collections
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>
      </section>

      {/* PRODUCT MAIN */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* GALLERY */}
          <div style={{ animation: "fade-up 0.6s ease-out both" }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card shadow-elegant">
              <img
                src={activeImg}
                alt={product.title}
                className="h-full w-full object-cover transition-opacity duration-500"
              />
              <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary backdrop-blur">
                {product.tag}
              </span>
              {discount && (
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-foreground">
                  -{discount}%
                </span>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setActiveImg(src)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      activeImg === src
                        ? "border-primary shadow-soft"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt={`${product.title} - vue ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6" style={{ animation: "fade-up 0.7s ease-out 0.1s both" }}>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{product.category}</p>
              <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.title}</h1>
              <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star
                      key={k}
                      className={`h-4 w-4 ${k < Math.round(product.rating) ? "fill-primary" : ""}`}
                    />
                  ))}
                </div>
                <span>
                  {product.rating} · {product.reviews} avis
                </span>
                <span>·</span>
                <span className={product.inStock ? "text-emerald-600" : "text-destructive"}>
                  {product.inStock ? "En stock" : "Sur commande"}
                </span>
              </div>
            </div>

            <p className="leading-relaxed text-foreground/85">{product.longDesc}</p>

            {/* PRICE */}
            <div className="flex items-end gap-4 rounded-2xl border border-border bg-card p-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Prix TTC</div>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="font-display text-4xl text-primary">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Paiement en 3× sans frais disponible
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-soft transition-all hover:scale-[1.03] hover:bg-primary/90"
              >
                Demander un devis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-transparent px-7 py-3.5 text-sm font-medium uppercase tracking-wider transition-all hover:border-primary hover:text-primary"
              >
                Visiter le showroom
              </Link>
            </div>

            {/* FEATURES */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-xl">Ce qui rend cette pièce unique</h2>
              <ul className="mt-4 space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* TRUST BAR */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Trust icon={<Truck className="h-4 w-4" />} text="Livraison Tunisie" />
              <Trust icon={<ShieldCheck className="h-4 w-4" />} text="Garantie 5 ans" />
              <Trust icon={<HandHeart className="h-4 w-4" />} text="Conseil sur mesure" />
            </div>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Caractéristiques</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Détails techniques</h2>
            <dl className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-6">
                  <dt className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{s.label}</dt>
                  <dd className="text-sm sm:col-span-2">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="mb-10 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Vous aimerez aussi</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Pièces complémentaires</h2>
            </div>
            <Link
              to="/collections"
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary"
            >
              Toutes les collections
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/collections/$slug"
                params={{ slug: r.slug }}
                className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{r.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{r.desc}</span>
                  </div>
                  <div className="mt-3 font-display text-lg text-primary">{formatPrice(r.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}

function Trust({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
}
