// -------------------------------------------------------------------
// GA4 Helpers — Client-side only
// -------------------------------------------------------------------
// This module wraps the gtag() global so every affiliate click fires a
// custom GA4 event BEFORE the redirect happens.  The events flow into
// BigQuery via the native GA4 → BigQuery export, giving us a clean
// click-stream for the Power BI command centre.
// -------------------------------------------------------------------

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

// Minimal type guard for the gtag global
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push a custom event to the GA4 data layer.
 */
export function gtagEvent(
  action: string,
  params: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

/**
 * Fire an `affiliate_click` event, then redirect.
 *
 * We use a tiny setTimeout so the beacon has time to dispatch before
 * navigation tears down the page.  150 ms is the industry-standard
 * sweet spot between reliability and UX imperceptibility.
 */
export function trackAffiliateClick({
  productId,
  productName,
  brand,
  category,
  affiliateUrl,
  location,
}: {
  productId: string;
  productName: string;
  brand: string;
  category: string;
  affiliateUrl: string;
  location: string; // e.g. "shop_grid" | "product_page" | "hero_cta"
}) {
  gtagEvent("affiliate_click", {
    product_id: productId,
    product_name: productName,
    brand,
    category,
    affiliate_url: affiliateUrl,
    click_location: location,
  });

  // Allow the event beacon to fire before navigating away
  setTimeout(() => {
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
  }, 150);
}
