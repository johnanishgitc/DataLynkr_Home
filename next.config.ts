import type { NextConfig } from "next";
import path from "path";
import { basePath } from "./lib/site";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
