import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const featureSlugs = [
  "sales-order-management",
  "extend-portal-customers",
  "modern-bcommerce-ordering",
  "invoice-creation",
  "authorization-workflows",
  "daily-ledger-reports",
  "offline-transactions",
  "dynamic-dashboards",
  "payments-collections",
  "stock-summary",
  "custom-reports",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/about"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/pricing"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/contact"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/support"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/login"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/changepswd"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacy"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const featurePages: MetadataRoute.Sitemap = featureSlugs.map((slug) => ({
    url: absoluteUrl(`/features/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...featurePages];
}
