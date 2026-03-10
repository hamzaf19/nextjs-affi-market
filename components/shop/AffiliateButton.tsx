"use client";

import { trackAffiliateClick } from "@/lib/ga4";
import type { Product } from "@/lib/types";
import { ExternalLink } from "lucide-react";

interface AffiliateButtonProps {
  product: Product;
  location: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Every outbound product link on the site MUST use this component.
 * It fires an `affiliate_click` GA4 event, waits 150 ms for the
 * beacon, then opens the affiliate URL in a new tab.
 */
export function AffiliateButton({
  product,
  location,
  className = "",
  children,
}: AffiliateButtonProps) {
  const handleClick = () => {
    trackAffiliateClick({
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      category: product.category,
      affiliateUrl: product.affiliateUrl,
      location,
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] ${className}`}
    >
      {children ?? (
        <>
          Buy Now — €{product.price.toFixed(2)}
          <ExternalLink className="h-4 w-4" />
        </>
      )}
    </button>
  );
}
