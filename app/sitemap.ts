import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

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
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/pricing"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/login"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/support"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/privacy-policy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms-of-service"), changeFrequency: "yearly", priority: 0.3 },
  ];

  const featurePages: MetadataRoute.Sitemap = featureSlugs.map((slug) => ({
    url: absoluteUrl(`/features/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...featurePages];
}
