import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:shadow-lg hover:border-border"
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </p>

        <h3 className="text-base font-semibold leading-snug line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="mt-auto flex items-center gap-1 pt-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold">
          €{product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
