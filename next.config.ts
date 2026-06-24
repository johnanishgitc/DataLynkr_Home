import type { NextConfig } from "next";
import path from "path";

/*const basePath =
  process.env.NODE_ENV === "production"
    ? "/Hometest"
    : (process.env.NEXT_PUBLIC_BASE_PATH || "");*/


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
