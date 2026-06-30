#!/usr/bin/env node
/**
 * Clean production build — removes stale build artifacts before generating a fresh static export.
 *
 * The repo lives at public_html/DataLynkr_Home/. Built files stay in this folder.
 * public_html/.htaccess (parent) maps clean URLs (datalynkr.com/, /login, …) here.
 *
 * Build only:
 *   npm run build:prod
 *
 * Build + deploy into DataLynkr_Home + update parent public_html/.htaccess:
 *   NODE_ENV=production DEPLOY=1 npm run build:prod
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const parentDir = path.join(root, "..");
const nextDir = path.join(root, ".next");
const outDir = path.join(root, "out");

const MARKER_BEGIN = "# BEGIN DataLynkr Home";
const MARKER_END = "# END DataLynkr Home";

/** Top-level route names that are now directories, meaning any root .html files are stale. */
const ROUTE_NAMES = [
  "about",
  "pricing",
  "contact",
  "support",
  "login",
  "signup",
  "forgot-password",
  "reset-password",
  "privacy",
  "terms",
];

/** Feature slugs whose pages are now directories, meaning any features/*.html files are stale. */
const FEATURE_SLUGS = [
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

/** Next.js default artifacts — not used; marketing site uses logo.svg */
const NEXT_DEFAULT_ARTIFACTS = [
  "favicon.ico",
  "file.svg",
  "globe.svg",
  "next.svg",
  "vercel.svg",
  "window.svg",
];

function removeNextDefaultArtifacts(targetDir) {
  for (const name of NEXT_DEFAULT_ARTIFACTS) {
    const filePath = path.join(targetDir, name);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
      console.log(`Removed Next default artifact: ${name}`);
    }
  }
}

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

function removeStaleRouteFiles(targetDir) {
  for (const name of ROUTE_NAMES) {
    const filePath = path.join(targetDir, `${name}.html`);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
      console.log(`Removed stale route file: ${name}.html`);
    }
    const txtPath = path.join(targetDir, `${name}.txt`);
    if (fs.existsSync(txtPath) && fs.statSync(txtPath).isFile()) {
      fs.unlinkSync(txtPath);
      console.log(`Removed stale route file: ${name}.txt`);
    }
  }
}

function removeStaleFeatureFiles(targetDir) {
  const featuresDir = path.join(targetDir, "features");
  if (!fs.existsSync(featuresDir)) return;
  for (const slug of FEATURE_SLUGS) {
    const filePath = path.join(featuresDir, `${slug}.html`);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
      console.log(`Removed stale feature file: features/${slug}.html`);
    }
  }
}

function extractMarkedBlock(content) {
  const start = content.indexOf(MARKER_BEGIN);
  const end = content.indexOf(MARKER_END);
  if (start === -1 || end === -1 || end < start) return null;
  return content.slice(start, end + MARKER_END.length);
}

function installParentHtaccess() {
  const srcPath = path.join(root, "public_html.htaccess");
  const destPath = path.join(parentDir, ".htaccess");

  if (!fs.existsSync(srcPath)) {
    console.warn("public_html.htaccess not found — skipping parent install.");
    return;
  }

  const newBlock = extractMarkedBlock(fs.readFileSync(srcPath, "utf8"));
  if (!newBlock) {
    console.warn("public_html.htaccess missing markers — skipping parent install.");
    return;
  }

  let destContent = "";
  if (fs.existsSync(destPath)) {
    destContent = fs.readFileSync(destPath, "utf8");
    fs.copyFileSync(destPath, `${destPath}.bak.${Date.now()}`);
    console.log(`Backed up existing ${destPath}`);
  }

  let merged;
  if (destContent.includes(MARKER_BEGIN) && destContent.includes(MARKER_END)) {
    const before = destContent.slice(0, destContent.indexOf(MARKER_BEGIN));
    const after = destContent.slice(destContent.indexOf(MARKER_END) + MARKER_END.length);
    merged = `${before}${newBlock}${after}`;
    console.log("Updated DataLynkr Home block in parent .htaccess");
  } else if (destContent.trim()) {
    merged = `${newBlock}\n\n${destContent}`;
    console.log("Prepended DataLynkr Home block to existing parent .htaccess");
  } else {
    merged = fs.readFileSync(srcPath, "utf8");
    console.log("Installed new parent .htaccess");
  }

  fs.writeFileSync(destPath, merged.trimEnd() + "\n", "utf8");
  console.log(`Parent htaccess: ${destPath}`);
}

function deployOutToProjectRoot() {
  if (process.env.DEPLOY !== "1") {
    console.log("Build output is in out/.");
    console.log("To deploy on the server:");
    console.log("  NODE_ENV=production DEPLOY=1 npm run build:prod");
    return;
  }

  console.log(`\nDeploying to: ${root}`);

  removeStaleRouteFiles(root);
  removeStaleFeatureFiles(root);

  for (const entry of fs.readdirSync(outDir)) {
    copyRecursive(path.join(outDir, entry), path.join(root, entry));
  }

  removeNextDefaultArtifacts(root);

  removeStaleRouteFiles(root);
  removeStaleFeatureFiles(root);

  installParentHtaccess();

  console.log(`\nDeployed out/ → ${root}`);
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

try {
  execSync("node scripts/optimize-posters.cjs", { cwd: root, stdio: "inherit" });
} catch {
  console.warn("Poster optimization skipped.");
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

  removeNextDefaultArtifacts(outDir);

  const robotsPath = path.join(outDir, "robots.txt");
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, "utf8");
    if (/Disallow:\s*\/login/i.test(robotsContent)) {
      console.warn("WARNING: out/robots.txt blocks /login — remove Disallow: /login before deploy.");
    }
    if (!/Allow:\s*\/login/i.test(robotsContent)) {
      console.warn("WARNING: out/robots.txt does not explicitly Allow: /login.");
    }
  }

  deployOutToProjectRoot();
} else {
  console.warn("WARNING: out/ directory missing — static export may have failed.");
}

console.log("\nBuild complete. Output is in out/.");
