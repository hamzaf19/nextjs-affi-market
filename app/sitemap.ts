import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products";

const BASE_URL = "https://nextjs-affi-market-production.up.railway.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const productPages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/shop/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
