import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Tag } from "lucide-react";
import { getAllSlugs, getProductBySlug } from "@/lib/products";
import { AffiliateButton } from "@/components/shop/AffiliateButton";

// --------------- SSG ---------------
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// --------------- Dynamic Metadata ---------------
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} Review – AffMarket`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} Review – AffMarket`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

// --------------- Page Component ---------------
export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // Split the longReview into paragraphs for rendering
  const reviewParagraphs = product.longReview.split("\n\n");

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      {/* Two-column layout */}
      <div className="grid gap-10 lg:grid-cols-5">
        {/* LEFT — Product Details (2 cols) */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* Meta */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {product.brand} · {product.category}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {product.name}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {product.shortDescription}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col gap-3">
              <p className="text-3xl font-bold">
                €{product.price.toFixed(2)}
              </p>
              <AffiliateButton product={product} location="product_page" />
              <p className="text-xs text-muted-foreground">
                * Affiliate link – you pay the same price; we earn a small
                commission.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Long-form SEO Review (3 cols) */}
        <article className="lg:col-span-3">
          <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 lg:p-10">
            <h2 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">
              In-Depth Review
            </h2>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {reviewParagraphs.map((para, idx) => {
                // Handle bold headings within the review (e.g. **Heading:**)
                if (para.startsWith("**")) {
                  const parts = para.split("**");
                  return (
                    <div key={idx} className="mt-6 first:mt-0">
                      {parts.map((part, i) =>
                        i % 2 === 1 ? (
                          <strong key={i} className="text-foreground">
                            {part}
                          </strong>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </div>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 flex flex-col items-start gap-3 border-t border-border/40 pt-8">
              <p className="font-semibold">
                Ready to level up? Grab the {product.name} today.
              </p>
              <AffiliateButton
                product={product}
                location="product_page_bottom"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
