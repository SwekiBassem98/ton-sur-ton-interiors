import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Heart, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { categories, formatPrice, priceBounds, products, type Product } from "@/lib/products";
import { useWishlist } from "@/hooks/use-wishlist";

const sortValues = ["featured", "price-asc", "price-desc", "newest", "rating"] as const;
type SortValue = (typeof sortValues)[number];

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(sortValues).optional(),
  max: z.coerce.number().int().positive().optional(),
  fav: z.coerce.boolean().optional(),
});

type CollectionsSearch = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/collections")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Collections — Meuble Ton sur Ton" },
      { name: "description", content: "Explorez nos collections de salons, salles à manger, chambres et bureaux." },
      { property: "og:title", content: "Collections — Meuble Ton sur Ton" },
      { property: "og:description", content: "Pièces choisies pour sublimer chaque espace de votre intérieur." },
    ],
  }),
  component: CollectionsPage,
});

const sortLabels: Record<SortValue, string> = {
  featured: "Sélection",
  newest: "Nouveautés",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  rating: "Mieux notés",
};

function CollectionsPage() {
  const search = Route.useSearch() as CollectionsSearch;
  const navigate = useNavigate({ from: "/collections" });
  const { has, toggle, hydrated } = useWishlist();

  const activeCategory = search.category ?? "Toutes";
  const query = search.q ?? "";
  const sort: SortValue = search.sort ?? "featured";
  const maxPrice = search.max ?? priceBounds.max;
  const onlyFavs = search.fav ?? false;

  const setSearch = (patch: Partial<CollectionsSearch>) => {
    navigate({
      search: (prev) => {
        const next = { ...(prev as CollectionsSearch), ...patch };
        // Strip empty/default values to keep the URL clean.
        if (!next.category || next.category === "Toutes") delete next.category;
        if (!next.q) delete next.q;
        if (!next.sort || next.sort === "featured") delete next.sort;
        if (!next.max || next.max >= priceBounds.max) delete next.max;
        if (!next.fav) delete next.fav;
        return next;
      },
      replace: true,
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (activeCategory !== "Toutes" && p.category !== activeCategory) return false;
      if (p.price > maxPrice) return false;
      if (onlyFavs && !has(p.slug)) return false;
      if (q && !`${p.title} ${p.desc} ${p.tag} ${p.category}`.toLowerCase().includes(q)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return b.createdAt - a.createdAt;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return list;
  }, [activeCategory, query, sort, maxPrice, onlyFavs, has]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set("Toutes", products.length);
    for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  const hasActiveFilters =
    activeCategory !== "Toutes" || !!query || sort !== "featured" || maxPrice < priceBounds.max || onlyFavs;

  return (
    <Layout>
      {/* HERO */}
      <section className="bg-gradient-warm">
        <div className="container mx-auto px-4 py-20 text-center md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Nos collections
          </div>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl md:text-6xl">
            Chaque pièce, une <span className="italic text-primary">histoire</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Filtrez par univers, ajustez votre budget, et trouvez la pièce qui transformera votre intérieur.
          </p>
        </div>
      </section>

      {/* STICKY FILTER BAR */}
      <section className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto px-4 py-4">
          {/* Category pills + search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <CategoryPill
                label="Toutes"
                count={counts.get("Toutes") ?? 0}
                active={activeCategory === "Toutes"}
                onClick={() => setSearch({ category: undefined })}
              />
              {categories.map((c) => (
                <CategoryPill
                  key={c}
                  label={c}
                  count={counts.get(c) ?? 0}
                  active={activeCategory === c}
                  onClick={() => setSearch({ category: c })}
                />
              ))}
            </div>
            <SearchInput value={query} onChange={(v) => setSearch({ q: v || undefined })} />
          </div>

          {/* Secondary controls */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <SortMenu value={sort} onChange={(v) => setSearch({ sort: v })} />

            <PriceSlider value={maxPrice} onChange={(v) => setSearch({ max: v })} />

            <button
              type="button"
              onClick={() => setSearch({ fav: !onlyFavs || undefined })}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                onlyFavs
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/40 hover:text-primary"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${onlyFavs ? "fill-current" : ""}`} />
              Favoris
            </button>

            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                <strong className="text-foreground">{filtered.length}</strong> {filtered.length > 1 ? "pièces" : "pièce"}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() =>
                    navigate({
                      search: {} as CollectionsSearch,
                      replace: true,
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <X className="h-3 w-3" /> Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="container mx-auto px-4 py-14 md:py-20">
        {filtered.length === 0 ? (
          <EmptyState
            onReset={() =>
              navigate({
                search: {} as CollectionsSearch,
                replace: true,
              })
            }
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                index={i}
                isFavorite={hydrated && has(p.slug)}
                onToggleFav={() => toggle(p.slug)}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

/* ----------------------------- subcomponents ----------------------------- */

function CategoryPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
        active
          ? "border-primary bg-primary text-primary-foreground shadow-soft"
          : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-soft"
      }`}
    >
      <span>{label}</span>
      <span
        className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
          active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full sm:w-72">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder="Rechercher une pièce…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-9 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {value && (
        <button
          type="button"
          aria-label="Effacer la recherche"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function SortMenu({ value, onChange }: { value: SortValue; onChange: (v: SortValue) => void }) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors hover:border-primary/40">
      <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-muted-foreground">Tri :</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className="cursor-pointer bg-transparent pr-1 text-xs font-medium uppercase tracking-wider text-foreground outline-none"
      >
        {sortValues.map((v) => (
          <option key={v} value={v}>
            {sortLabels[v]}
          </option>
        ))}
      </select>
    </label>
  );
}

function PriceSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Budget max</span>
      <input
        type="range"
        min={priceBounds.min}
        max={priceBounds.max}
        step={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-32 cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
        aria-label="Prix maximum"
      />
      <span className="min-w-[5.5rem] text-right text-xs font-semibold tabular-nums text-primary">
        {formatPrice(value)}
      </span>
    </div>
  );
}

function ProductCard({
  product,
  index,
  isFavorite,
  onToggleFav,
}: {
  product: Product;
  index: number;
  isFavorite: boolean;
  onToggleFav: () => void;
}) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
      style={{ animation: `fade-up 0.5s ease-out ${Math.min(index, 8) * 0.05}s both` }}
    >
      <Link to="/collections/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.img}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary backdrop-blur">
            {product.tag}
          </span>
          {discount && (
            <span className="absolute left-4 top-12 rounded-full bg-primary px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-foreground">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="absolute right-4 bottom-4 rounded-full bg-foreground/85 px-3 py-1 text-xs font-medium uppercase tracking-wider text-background backdrop-blur">
              Sur commande
            </span>
          )}

          {/* Quick view chip */}
          <span className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto flex w-max translate-y-3 items-center gap-1.5 rounded-full bg-background/95 px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground opacity-0 shadow-soft backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Voir détails <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        type="button"
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        onClick={onToggleFav}
        className={`absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-all hover:scale-110 ${
          isFavorite
            ? "bg-primary text-primary-foreground"
            : "bg-background/85 text-foreground hover:bg-background"
        }`}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      </button>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {product.category}
            </p>
            <h3 className="mt-1 font-display text-2xl">{product.title}</h3>
          </div>
          {product.colors && product.colors.length > 0 && (
            <div className="flex shrink-0 -space-x-1.5 pt-1">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.hex}
                  title={c.name}
                  aria-label={c.name}
                  className="h-4 w-4 rounded-full border-2 border-card shadow-sm"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.desc}</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="font-display text-xl text-primary">{formatPrice(product.price)}</div>
            {product.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</div>
            )}
          </div>
          <Link
            to="/collections/$slug"
            params={{ slug: product.slug }}
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary transition-transform group-hover:translate-x-1"
          >
            Voir détails <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center"
      style={{ animation: "fade-up 0.5s ease-out both" }}
    >
      <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
        <Search className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-2xl">Aucune pièce ne correspond</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Essayez d'élargir votre budget, de changer de catégorie ou d'ajuster votre recherche.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-transform hover:scale-105"
      >
        <X className="h-3.5 w-3.5" /> Réinitialiser les filtres
      </button>
    </div>
  );
}
