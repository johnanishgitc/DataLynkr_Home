#!/usr/bin/env node
/**
 * Clean production build — removes stale build artifacts before generating a fresh static export.
 * Run on the server after upload: npm run build:prod
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const nextDir = path.join(root, ".next");
const outDir = path.join(root, "out");

// Remove stale build artifacts
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next for a clean build.");
}

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
  console.log("Removed out/ for a clean build.");
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

execSync("next build", { cwd: root, stdio: "inherit" });

// Verify static export output
if (fs.existsSync(outDir)) {
  const pages = fs.readdirSync(outDir).filter((name) => name.endsWith(".html"));
  console.log(`\nStatic export complete. HTML pages in out/: ${pages.join(", ") || "(none)"}`);

  const featuresOutDir = path.join(outDir, "features");
  if (fs.existsSync(featuresOutDir)) {
    const featurePages = fs.readdirSync(featuresOutDir).filter((name) => name.endsWith(".html"));
    console.log(`Feature pages: ${featurePages.join(", ") || "(none)"}`);
  }

  // Copy .htaccess to out/ directory for deployment convenience
  const htaccessSrc = path.join(root, ".htaccess");
  const htaccessDest = path.join(outDir, ".htaccess");
  if (fs.existsSync(htaccessSrc)) {
    fs.copyFileSync(htaccessSrc, htaccessDest);
    console.log("Copied .htaccess to out/ directory.");
  }
} else {
  console.warn("WARNING: out/ directory missing — static export may have failed.");
}

console.log("\nBuild complete. Upload the out/ directory contents to your web root.");
