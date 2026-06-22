import type { NextConfig } from "next";
import path from "path";

const basePath =
  process.env.NODE_ENV === "production"
    ? "/Hometest"
    : (process.env.NEXT_PUBLIC_BASE_PATH || "");

const legacyPageRedirects = [
  "about",
  "pricing",
  "contact",
  "support",
  "login",
  "privacy",
  "terms",
  "changepswd",
].map((page) => ({
  source: `/${page}.html`,
  destination: `/${page}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  turbopack: {},
  async redirects() {
    return [
      { source: "/code.html", destination: "/", permanent: true },
      { source: "/features/:slug.html", destination: "/features/:slug", permanent: true },
      ...legacyPageRedirects,
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
