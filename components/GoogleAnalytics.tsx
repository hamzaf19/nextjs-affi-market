"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/ga4";

/**
 * Drops the two standard GA4 script tags into <head>.
 * Render this once in the root layout.
 * If NEXT_PUBLIC_GA_MEASUREMENT_ID is empty the scripts are skipped
 * so the site works fine in dev without a real ID.
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}
