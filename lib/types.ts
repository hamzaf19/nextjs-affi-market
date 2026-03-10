export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "Fitness" | "Mindset" | "Productivity";
  price: number;
  currency: string;
  image: string;
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  longReview: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
}
