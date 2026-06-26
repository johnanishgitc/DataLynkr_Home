#!/usr/bin/env node
/**
 * Clean production build — removes stale build artifacts before generating a fresh static export.
 * Run on the server after upload: npm run build:prod
 *
 * On the server, Apache serves this project root (DataLynkr_Home/), not out/.
 * After next build, out/ is copied here only when DEPLOY=1:
 *   NODE_ENV=production DEPLOY=1 npm run build:prod
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const nextDir = path.join(root, ".next");
const outDir = path.join(root, "out");

/** Top-level route names that must be .html files, not physical directories. */
const STALE_ROUTE_DIRS = [
  "about",
  "pricing",
  "contact",
  "support",
  "login",
  "privacy",
  "terms",
  "changepswd",
];

/** Feature slugs whose old per-slug directories must be removed from features/ on the server.
 *  The old React app deployment created features/slug/ directories with CRA index.html files.
 *  The new Next.js static export serves these as features/slug.html — the old directories
 *  shadow the new files and cause Apache to serve the old "You need to enable JavaScript" page. */
const STALE_FEATURE_DIRS = [
  "authorization-workflows",
  "custom-reports",
  "daily-ledger-reports",
  "dynamic-dashboards",
  "extend-portal-customers",
  "invoice-creation",
  "modern-bcommerce-ordering",
  "offline-transactions",
  "payments-collections",
  "sales-order-management",
  "stock-summary",
];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.copyFileSync(src, dest);
}

function removeStaleRouteDirectories() {
  for (const name of STALE_ROUTE_DIRS) {
    const dirPath = path.join(root, name);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Removed stale directory ${name}/ (was causing 403 on /${name}/).`);
    }
  }
}

function removeStaleFeatureDirectories() {
  const featuresDir = path.join(root, "features");
  if (!fs.existsSync(featuresDir)) return;
  for (const slug of STALE_FEATURE_DIRS) {
    const dirPath = path.join(featuresDir, slug);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Removed stale directory features/${slug}/ (was shadowing features/${slug}.html).`);
    }
  }
}

function deployOutToWebRoot() {
  if (process.env.DEPLOY !== "1") {
    console.log("Build output is in out/. On the server run: DEPLOY=1 npm run build:prod");
    return;
  }

  removeStaleRouteDirectories();
  removeStaleFeatureDirectories();

  for (const entry of fs.readdirSync(outDir)) {
    copyRecursive(path.join(outDir, entry), path.join(root, entry));
  }

  removeStaleRouteDirectories();
  removeStaleFeatureDirectories();

  console.log("Deployed out/ contents to web root (DataLynkr_Home/).");
}

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

  // Copy root .htaccess to out/ for deployment
  const htaccessSrc = path.join(root, ".htaccess");
  const htaccessDest = path.join(outDir, ".htaccess");
  if (fs.existsSync(htaccessSrc)) {
    fs.copyFileSync(htaccessSrc, htaccessDest);
    console.log("Copied .htaccess to out/ directory.");
  }

  // Copy features/.htaccess to out/features/ — features subdirectory runs its own
  // mod_rewrite context so it needs its own .htaccess to serve slug.html files.
  const featuresHtaccessSrc = path.join(root, "features", ".htaccess");
  const featuresHtaccessDest = path.join(outDir, "features", ".htaccess");
  if (fs.existsSync(featuresHtaccessSrc) && fs.existsSync(featuresOutDir)) {
    fs.copyFileSync(featuresHtaccessSrc, featuresHtaccessDest);
    console.log("Copied features/.htaccess to out/features/ directory.");
  }

  deployOutToWebRoot();
} else {
  console.warn("WARNING: out/ directory missing — static export may have failed.");
}

console.log("\nBuild complete. Output is in out/.");
