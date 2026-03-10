import Link from "next/link";
import { ArrowRight, Dumbbell, Brain, Zap } from "lucide-react";
import { getFeaturedProducts, getAllCategories } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

const categoryIcons: Record<string, React.ReactNode> = {
  Fitness: <Dumbbell className="h-6 w-6" />,
  Mindset: <Brain className="h-6 w-6" />,
  Productivity: <Zap className="h-6 w-6" />,
};

const categoryDescriptions: Record<string, string> = {
  Fitness:
    "Supplements, equipment, and gear to build your strongest body.",
  Mindset:
    "Books and resources that sharpen your mental edge.",
  Productivity:
    "Tools and systems to maximise every hour of your day.",
};

export default function Home() {
  const featured = getFeaturedProducts();
  const categories = getAllCategories();

  return (
    <main>
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <span className="rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            Curated Reviews · Affiliate Picks
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Level Up Your Body,{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Mind &amp; Productivity
            </span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Honest, in-depth reviews of the best European fitness gear, mindset
            books, and productivity tools — handpicked so you don&apos;t have to
            scroll through noise.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse the Shop
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop?category=Fitness"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Fitness Picks
            </Link>
          </div>
        </div>
        {/* Decorative gradient blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-500/20 via-violet-500/20 to-transparent blur-3xl"
        />
      </section>

      {/* ───── Categories ───── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Shop by Category
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/shop?category=${encodeURIComponent(cat)}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 transition-all hover:shadow-lg hover:border-border"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground">
                {categoryIcons[cat]}
              </span>
              <h3 className="text-lg font-semibold">{cat}</h3>
              <p className="text-sm text-muted-foreground">
                {categoryDescriptions[cat]}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───── Featured Products ───── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Picks
            </h2>
            <p className="mt-1 text-muted-foreground">
              Our most-reviewed, highest-rated recommendations.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-1 text-sm font-medium text-primary sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ───── CTA Banner ───── */}
      <section className="border-t border-border/40 bg-secondary/50">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your journey starts with the right tools
          </h2>
          <p className="text-muted-foreground">
            Every product on AffMarket is personally tested and reviewed. We
            only recommend what we&apos;d use ourselves.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
