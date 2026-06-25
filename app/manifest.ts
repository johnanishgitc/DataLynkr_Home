import type { MetadataRoute } from "next";
import { basePath } from "@/lib/site";

export const dynamic = "force-static";

/** Manifest icons must resolve on the current origin (not a hardcoded production URL in dev). */
function manifestIcon(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DataLynkr — Take Tally Beyond The Finance Team",
    short_name: "DataLynkr",
    description:
      "Extend Tally ERP to your sales, operations, and management teams with real-time mobile and browser access.",
    start_url: basePath ? `${basePath}/` : "/",
    scope: basePath ? `${basePath}/` : "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "en-IN",
    orientation: "portrait-primary",
    icons: [
      {
        src: manifestIcon("/logo.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
