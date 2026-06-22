#!/usr/bin/env node
/**
 * Clean production build — prevents stale chunk hashes (ChunkLoadError / 500 on layout-*.js).
 * Run on the server after upload: npm run build:prod
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const nextDir = path.join(root, ".next");

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next for a clean build.");
}

const featuresDir = path.join(root, "features");
if (fs.existsSync(featuresDir)) {
  for (const name of fs.readdirSync(featuresDir)) {
    if (name.endsWith(".html")) {
      fs.unlinkSync(path.join(featuresDir, name));
      console.log(`Removed legacy static file features/${name}`);
    }
  }
}

execSync("next build --webpack", { cwd: root, stdio: "inherit" });

const featureChunkDir = path.join(root, ".next", "static", "chunks", "app", "features", "[slug]");
if (fs.existsSync(featureChunkDir)) {
  const chunkFiles = fs.readdirSync(featureChunkDir).filter((name) => name.startsWith("page-"));
  console.log(`Feature page chunks built: ${chunkFiles.join(", ") || "(none)"}`);
} else {
  console.warn("WARNING: .next/static/chunks/app/features/[slug]/ missing — feature pages will 404 chunks.");
}

console.log("Build complete. Restart Passenger / PM2 before testing.");
