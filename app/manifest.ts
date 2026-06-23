import type { MetadataRoute } from "next";
import { absoluteUrl, basePath } from "@/lib/site";

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
    theme_color: "#1F3A89",
    lang: "en-IN",
    orientation: "portrait-primary",
    icons: [
      {
        src: absoluteUrl("/logo.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
