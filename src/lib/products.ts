import livingImg from "@/assets/cat-living.jpg";
import diningImg from "@/assets/cat-dining.jpg";
import bedroomImg from "@/assets/cat-bedroom.jpg";
import officeImg from "@/assets/cat-office.jpg";
import heroImg from "@/assets/hero-living.jpg";
import showroomImg from "@/assets/showroom.jpg";

export type Product = {
  slug: string;
  title: string;
  tag: string;
  img: string;
  desc: string;
  /** Long description shown on the product detail page. */
  longDesc: string;
  /** Price in TND (Tunisian Dinar). */
  price: number;
  /** Optional original price for showing a discount. */
  originalPrice?: number;
  category: string;
  /** Bullet-point feature list. */
  features: string[];
  /** Key/value spec list for the details panel. */
  specs: { label: string; value: string }[];
  /** Additional gallery images shown on the detail page. */
  gallery?: string[];
  /** Hex color swatches displayed on the catalog card. */
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  rating: number;
  reviews: number;
  /** Higher = newer. Used for the "Nouveau" sort order. */
  createdAt: number;
};

export const products: Product[] = [
  {
    slug: "salon-jazz",
    title: "Salon Jazz",
    tag: "Tendance",
    img: heroImg,
    desc: "Modulable, chaleureux, parfait pour les grands espaces.",
    longDesc:
      "Le Salon Jazz allie modularité et confort haut de gamme. Sa structure en bois massif et ses assises généreuses, garnies d'une mousse haute densité, offrent un maintien parfait pour les longues soirées en famille ou entre amis. Disponible en plusieurs configurations, il s'adapte à toutes les pièces de vie.",
    price: 4890,
    originalPrice: 5490,
    category: "Salons",
    features: [
      "Structure en bois massif",
      "Assises modulables (3, 4 ou 5 places)",
      "Mousse haute densité 35 kg/m³",
      "Tissu déhoussable et anti-taches",
      "Garantie 5 ans sur la structure",
    ],
    specs: [
      { label: "Dimensions", value: "320 × 180 × 85 cm" },
      { label: "Matériaux", value: "Bois massif, tissu premium" },
      { label: "Coloris", value: "Beige sable, gris perle, terracotta" },
      { label: "Délai de livraison", value: "2 à 4 semaines" },
      { label: "Origine", value: "Tunisie" },
    ],
    gallery: [livingImg, showroomImg, heroImg],
    colors: [
      { name: "Beige sable", hex: "#d8c3a5" },
      { name: "Gris perle", hex: "#b6b6b3" },
      { name: "Terracotta", hex: "#c0623e" },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 32,
    createdAt: 5,
  },
  {
    slug: "salon-onda",
    title: "Salon Onda",
    tag: "Nouveau",
    img: livingImg,
    desc: "Lignes courbes, accents terracotta, ambiance contemporaine.",
    longDesc:
      "Inspiré des courbes de la Méditerranée, le Salon Onda apporte une touche contemporaine et chaleureuse à votre intérieur. Ses lignes douces et son revêtement en velours côtelé créent une atmosphère cocooning, parfaite pour se détendre.",
    price: 3990,
    category: "Salons",
    features: [
      "Lignes courbes design",
      "Revêtement en velours côtelé",
      "Pieds en laiton brossé",
      "Coussins moelleux en plumes",
      "Disponible en 4 coloris",
    ],
    specs: [
      { label: "Dimensions", value: "260 × 95 × 80 cm" },
      { label: "Matériaux", value: "Velours, hêtre, laiton" },
      { label: "Coloris", value: "Terracotta, vert sauge, ivoire, bleu nuit" },
      { label: "Délai de livraison", value: "3 à 5 semaines" },
      { label: "Origine", value: "Italie" },
    ],
    gallery: [livingImg, heroImg],
    colors: [
      { name: "Terracotta", hex: "#c0623e" },
      { name: "Vert sauge", hex: "#9aa68b" },
      { name: "Ivoire", hex: "#f1e8d8" },
      { name: "Bleu nuit", hex: "#2b3a55" },
    ],
    inStock: true,
    rating: 4.6,
    reviews: 18,
    createdAt: 9,
  },
  {
    slug: "salle-a-manger-olivia",
    title: "Salle à manger Olivia",
    tag: "Best-seller",
    img: diningImg,
    desc: "Table en bois massif et chaises tapissées sur mesure.",
    longDesc:
      "L'ensemble Olivia conjugue tradition artisanale et élégance moderne. La table en chêne massif accueille jusqu'à 8 convives, accompagnée de chaises tapissées dans un tissu doux au toucher. Idéal pour des dîners conviviaux et raffinés.",
    price: 5650,
    category: "Salles à manger",
    features: [
      "Table en chêne massif (8 places)",
      "6 chaises tapissées incluses",
      "Finition huilée naturelle",
      "Pieds renforcés en métal noir",
      "Rallonge optionnelle (+2 places)",
    ],
    specs: [
      { label: "Dimensions table", value: "220 × 100 × 76 cm" },
      { label: "Matériaux", value: "Chêne massif, tissu lin, métal" },
      { label: "Coloris chaises", value: "Lin naturel, gris anthracite" },
      { label: "Délai de livraison", value: "4 à 6 semaines" },
      { label: "Origine", value: "Tunisie" },
    ],
    gallery: [diningImg, showroomImg],
    colors: [
      { name: "Lin naturel", hex: "#d6c7a8" },
      { name: "Anthracite", hex: "#3a3a3a" },
    ],
    inStock: true,
    rating: 4.9,
    reviews: 47,
    createdAt: 6,
  },
  {
    slug: "table-rivage",
    title: "Table Rivage",
    tag: "Compact",
    img: diningImg,
    desc: "Table ronde 4 places, parfaite pour les petits espaces.",
    longDesc:
      "La table Rivage, ronde et élégante, est conçue pour les intérieurs urbains. Son plateau en marbre véritable et ses pieds en métal noir mat lui donnent une allure résolument contemporaine.",
    price: 1890,
    category: "Salles à manger",
    features: [
      "Plateau en marbre véritable",
      "4 places assises",
      "Pieds en métal noir mat",
      "Idéal petits espaces",
      "Livré monté",
    ],
    specs: [
      { label: "Dimensions", value: "Ø 110 × 75 cm" },
      { label: "Matériaux", value: "Marbre, métal" },
      { label: "Coloris", value: "Marbre blanc, marbre noir" },
      { label: "Délai de livraison", value: "1 à 2 semaines" },
    ],
    gallery: [diningImg],
    colors: [
      { name: "Marbre blanc", hex: "#ece9e2" },
      { name: "Marbre noir", hex: "#1c1c1c" },
    ],
    inStock: true,
    rating: 4.5,
    reviews: 12,
    createdAt: 8,
  },
  {
    slug: "chambre-sahara",
    title: "Chambre Sahara",
    tag: "Premium",
    img: bedroomImg,
    desc: "Tête de lit capitonnée, tons chauds, sérénité absolue.",
    longDesc:
      "Évasion garantie avec la Chambre Sahara. Sa tête de lit capitonnée XXL, ses tons chauds et ses matières nobles créent un cocon propice au repos. L'ensemble inclut le lit, deux chevets et une commode assortie.",
    price: 7290,
    originalPrice: 7990,
    category: "Chambres",
    features: [
      "Tête de lit capitonnée 200 cm",
      "Lit double 160 × 200 cm",
      "2 chevets et 1 commode inclus",
      "Sommier à lattes intégré",
      "Tiroirs de rangement sous le lit",
    ],
    specs: [
      { label: "Dimensions lit", value: "180 × 220 × 130 cm" },
      { label: "Matériaux", value: "Velours, MDF laqué, hêtre" },
      { label: "Coloris", value: "Terracotta, sable, taupe" },
      { label: "Délai de livraison", value: "5 à 7 semaines" },
      { label: "Origine", value: "Tunisie" },
    ],
    gallery: [bedroomImg, showroomImg],
    colors: [
      { name: "Terracotta", hex: "#c0623e" },
      { name: "Sable", hex: "#d8c3a5" },
      { name: "Taupe", hex: "#7a6a5d" },
    ],
    inStock: true,
    rating: 4.9,
    reviews: 25,
    createdAt: 7,
  },
  {
    slug: "lit-mistral",
    title: "Lit Mistral",
    tag: "Essentiel",
    img: bedroomImg,
    desc: "Cadre épuré en bois clair, design minimaliste.",
    longDesc:
      "Le Lit Mistral incarne la pureté du design scandinave. Sa structure en bouleau massif et ses lignes épurées invitent au repos sans superflu.",
    price: 1490,
    category: "Chambres",
    features: [
      "Structure en bouleau massif",
      "Cadre 160 × 200 cm",
      "Sommier à lattes inclus",
      "Finition huilée écologique",
      "Tête de lit ajourée",
    ],
    specs: [
      { label: "Dimensions", value: "180 × 215 × 95 cm" },
      { label: "Matériaux", value: "Bouleau massif" },
      { label: "Coloris", value: "Naturel, blanc cérusé" },
      { label: "Délai de livraison", value: "2 à 3 semaines" },
    ],
    gallery: [bedroomImg],
    colors: [
      { name: "Naturel", hex: "#d8c3a5" },
      { name: "Blanc cérusé", hex: "#ece4d6" },
    ],
    inStock: true,
    rating: 4.4,
    reviews: 9,
    createdAt: 4,
  },
  {
    slug: "bureau-atelier",
    title: "Bureau Atelier",
    tag: "Essentiel",
    img: officeImg,
    desc: "Bois clair, espace de rangement intelligent, lumière naturelle.",
    longDesc:
      "Conçu pour les esprits créatifs, le Bureau Atelier offre un espace de travail ergonomique et lumineux. Ses rangements intégrés et sa surface généreuse en font un compagnon idéal pour le télétravail ou les longues sessions de création.",
    price: 1890,
    category: "Bureaux",
    features: [
      "Plateau spacieux 160 × 80 cm",
      "3 tiroirs avec fermeture douce",
      "Passe-câbles intégré",
      "Finition bois clair scandinave",
      "Compatible avec accessoires modulaires",
    ],
    specs: [
      { label: "Dimensions", value: "160 × 80 × 75 cm" },
      { label: "Matériaux", value: "Chêne clair, métal poudré" },
      { label: "Coloris", value: "Naturel, blanc cassé" },
      { label: "Délai de livraison", value: "2 à 3 semaines" },
      { label: "Origine", value: "Tunisie" },
    ],
    gallery: [officeImg],
    colors: [
      { name: "Naturel", hex: "#d8c3a5" },
      { name: "Blanc cassé", hex: "#ece4d6" },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 14,
    createdAt: 3,
  },
  {
    slug: "fauteuil-luna",
    title: "Fauteuil Luna",
    tag: "Nouveau",
    img: livingImg,
    desc: "Fauteuil enveloppant, idéal coin lecture.",
    longDesc:
      "Le Fauteuil Luna invite à la pause. Sa coque enveloppante et son piétement pivotant lui confèrent une élégance moderne, parfait pour un coin lecture ou une chambre.",
    price: 990,
    category: "Salons",
    features: [
      "Coque enveloppante",
      "Piétement pivotant 360°",
      "Revêtement bouclette",
      "Confort haute densité",
      "Disponible en 3 coloris",
    ],
    specs: [
      { label: "Dimensions", value: "85 × 80 × 95 cm" },
      { label: "Matériaux", value: "Bouclette, métal" },
      { label: "Coloris", value: "Crème, vert sauge, terracotta" },
      { label: "Délai de livraison", value: "1 à 2 semaines" },
    ],
    gallery: [livingImg],
    colors: [
      { name: "Crème", hex: "#ece4d6" },
      { name: "Vert sauge", hex: "#9aa68b" },
      { name: "Terracotta", hex: "#c0623e" },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 21,
    createdAt: 10,
  },
  {
    slug: "ambiance-showroom",
    title: "Ambiance Showroom",
    tag: "Inspiration",
    img: showroomImg,
    desc: "Notre savoir-faire mis en scène à La Soukra.",
    longDesc:
      "Découvrez l'ambiance complète de notre showroom : un mélange harmonieux de pièces issues de toutes nos collections. Composez votre univers sur mesure avec l'aide de nos décorateurs d'intérieur.",
    price: 12500,
    category: "Inspirations",
    features: [
      "Composition complète sur mesure",
      "Conseil décoration inclus",
      "Livraison et installation comprises",
      "Personnalisation des coloris",
      "Visite virtuelle disponible",
    ],
    specs: [
      { label: "Surface couverte", value: "30 à 60 m²" },
      { label: "Pièces incluses", value: "Salon, table, rangements, déco" },
      { label: "Délai", value: "6 à 10 semaines" },
      { label: "Origine", value: "Tunisie / Italie" },
    ],
    gallery: [showroomImg, heroImg, livingImg, diningImg],
    colors: [
      { name: "Sur mesure", hex: "#c0623e" },
    ],
    inStock: false,
    rating: 5,
    reviews: 8,
    createdAt: 2,
  },
];

/** Distinct categories ordered by first appearance. */
export const categories: string[] = Array.from(new Set(products.map((p) => p.category)));

/** Min and max prices in the catalog (in TND). */
export const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    maximumFractionDigits: 0,
  }).format(price);
}
