import type { Metadata } from "next";
import { getAllProducts, getAllCategories } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryFilter } from "@/components/shop/CategoryFilter";

export const metadata: Metadata = {
  title: "Shop – AffMarket | Fitness, Mindset & Productivity Gear",
  description:
    "Browse curated reviews of the best fitness supplements, training equipment, mindset books, and productivity tools in Europe.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const allProducts = getAllProducts();
  const categories = getAllCategories();

  const filtered = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Shop
        </h1>
        <p className="mt-2 text-muted-foreground">
          Honest reviews &amp; curated picks — every link supports this site
          through affiliate partnerships.
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-8">
        <CategoryFilter categories={categories} />
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-muted-foreground">
          No products found in this category.
        </p>
      )}
    </section>
  );
}
