import type { NextConfig } from "next";
import path from "path";
import { basePath } from "./lib/site";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  // Allow HMR when testing on phone/tablet via LAN IP (e.g. http://192.168.1.196:3000)
  allowedDevOrigins: ["192.168.1.196"],
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
