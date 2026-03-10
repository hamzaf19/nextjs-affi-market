"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface CategoryFilterProps {
  categories: string[];
}

function CategoryFilterInner({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "All";

  const handleClick = (cat: string) => {
    if (cat === "All") {
      router.push("/shop", { scroll: false });
    } else {
      router.push(`/shop?category=${encodeURIComponent(cat)}`, {
        scroll: false,
      });
    }
  };

  const allCategories = ["All", ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((cat) => {
        const isActive = cat === active || (cat === "All" && active === "All" && !searchParams.has("category"));

        return (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <Suspense
      fallback={
        <div className="flex gap-2">
          {["All", ...categories].map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
            >
              {cat}
            </span>
          ))}
        </div>
      }
    >
      <CategoryFilterInner categories={categories} />
    </Suspense>
  );
}
