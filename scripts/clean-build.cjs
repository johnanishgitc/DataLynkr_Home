#!/usr/bin/env node
/**
 * Clean production build — removes stale build artifacts before generating a fresh static export.
 *
 * Basic usage (build only, no deploy):
 *   npm run build:prod
 *
 * Deploy into the project root (old default — only valid when the repo IS the web root):
 *   NODE_ENV=production DEPLOY=1 npm run build:prod
 *
 * Deploy into a separate web root (e.g. cPanel public_html):
 *   WEB_ROOT=/home/datalynkr/public_html NODE_ENV=production DEPLOY=1 npm run build:prod
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const nextDir = path.join(root, ".next");
const outDir = path.join(root, "out");

/**
 * Resolve the deploy target directory.
 * WEB_ROOT env var wins; falls back to the project root (old behaviour).
 * Supports ~ expansion.
 */
function resolveWebRoot() {
  const env = process.env.WEB_ROOT;
  if (!env) return root;
  if (env.startsWith("~")) return path.join(os.homedir(), env.slice(1));
  return path.resolve(env);
}

const webRoot = resolveWebRoot();

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

/** Feature slugs whose old per-slug directories shadow the new .html files. */
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

/** Old CRA-era root files that should be removed from public_html when deploying to web root. */
const STALE_CRA_ROOT_FILES = [
  "asset-manifest.json",
  "precache-manifest.js",
  "service-worker.js",
  "manifest.json",
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

function removeStaleRouteDirectories(targetDir) {
  for (const name of STALE_ROUTE_DIRS) {
    const dirPath = path.join(targetDir, name);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Removed stale directory ${name}/`);
    }
  }
}

function removeStaleFeatureDirectories(targetDir) {
  const featuresDir = path.join(targetDir, "features");
  if (!fs.existsSync(featuresDir)) return;
  for (const slug of STALE_FEATURE_DIRS) {
    const dirPath = path.join(featuresDir, slug);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Removed stale features/${slug}/`);
    }
  }
}

function removeStaleCraFiles(targetDir) {
  for (const name of STALE_CRA_ROOT_FILES) {
    const filePath = path.join(targetDir, name);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
      console.log(`Removed old CRA file: ${name}`);
    }
  }
}

function deployOutToWebRoot() {
  if (process.env.DEPLOY !== "1") {
    console.log("Build output is in out/.");
    console.log("To deploy, run:");
    console.log("  WEB_ROOT=~/public_html NODE_ENV=production DEPLOY=1 npm run build:prod");
    return;
  }

  console.log(`\nDeploying to: ${webRoot}`);

  removeStaleRouteDirectories(webRoot);
  removeStaleFeatureDirectories(webRoot);
  if (webRoot !== root) removeStaleCraFiles(webRoot);

  for (const entry of fs.readdirSync(outDir)) {
    copyRecursive(path.join(outDir, entry), path.join(webRoot, entry));
  }

  removeStaleRouteDirectories(webRoot);
  removeStaleFeatureDirectories(webRoot);

  console.log(`\nDeployed out/ → ${webRoot}`);
}

// ---------------------------------------------------------------------------
// Remove stale build artifacts before building
// ---------------------------------------------------------------------------

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

execSync("npx next build", { cwd: root, stdio: "inherit" });

// ---------------------------------------------------------------------------
// Post-build: verify + copy .htaccess files into out/, then deploy
// ---------------------------------------------------------------------------

if (fs.existsSync(outDir)) {
  const pages = fs.readdirSync(outDir).filter((n) => n.endsWith(".html"));
  console.log(`\nStatic export complete. HTML pages: ${pages.join(", ") || "(none)"}`);

  const featuresOutDir = path.join(outDir, "features");
  if (fs.existsSync(featuresOutDir)) {
    const featurePages = fs.readdirSync(featuresOutDir).filter((n) => n.endsWith(".html"));
    console.log(`Feature pages: ${featurePages.join(", ") || "(none)"}`);
  }

  const htaccessSrc = path.join(root, ".htaccess");
  const htaccessDest = path.join(outDir, ".htaccess");
  if (fs.existsSync(htaccessSrc)) {
    fs.copyFileSync(htaccessSrc, htaccessDest);
    console.log("Copied .htaccess to out/");
  }

  const featuresHtaccessSrc = path.join(root, "features", ".htaccess");
  const featuresHtaccessDest = path.join(outDir, "features", ".htaccess");
  if (fs.existsSync(featuresHtaccessSrc) && fs.existsSync(featuresOutDir)) {
    fs.copyFileSync(featuresHtaccessSrc, featuresHtaccessDest);
    console.log("Copied features/.htaccess to out/features/");
  }

  deployOutToWebRoot();
} else {
  console.warn("WARNING: out/ directory missing — static export may have failed.");
}

console.log("\nBuild complete. Output is in out/.");
