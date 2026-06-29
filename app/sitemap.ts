import type { MetadataRoute } from "next";
import { FEATURE_SLUGS } from "@/lib/feature-slugs";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const staticPages: MetadataRoute.Sitemap = [
  { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1.0 },
  { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/pricing"), changeFrequency: "weekly", priority: 0.9 },
  { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/support"), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/login"), changeFrequency: "monthly", priority: 0.6 },
  { url: absoluteUrl("/privacy-policy"), changeFrequency: "yearly", priority: 0.3 },
  { url: absoluteUrl("/terms-of-service"), changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const featurePages: MetadataRoute.Sitemap = FEATURE_SLUGS.map((slug) => ({
    url: absoluteUrl(`/features/${slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...featurePages];
}
