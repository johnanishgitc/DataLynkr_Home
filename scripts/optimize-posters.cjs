#!/usr/bin/env node
/**
 * Generate 540px-wide poster WebPs for Lighthouse image-delivery savings.
 * Skips quietly when sharp or poster_images/ is unavailable.
 */
const fs = require("fs");
const path = require("path");

let sharp;
try {
  sharp = require("sharp");
} catch {
  console.log("optimize-posters: sharp not installed — run npm i -D sharp on the server.");
  process.exit(0);
}

const posterDir = path.join(__dirname, "..", "resources", "poster_images");
if (!fs.existsSync(posterDir)) {
  console.log("optimize-posters: resources/poster_images not found, skipping.");
  process.exit(0);
}

const targets = [
  "orders.webp",
  "orders_laptop.webp",
  "extendportal.webp",
  "bcomm.webp",
  "bcomm_laptop.webp",
  "invoice.webp",
  "invoice_laptop.webp",
  "approvals.webp",
  "approvals_laptop.webp",
  "ledgers.webp",
  "ledgers_laptop.webp",
  "offline.webp",
  "offline_laptop.webp",
  "dash.webp",
  "collections.webp",
  "collections_laptop.webp",
  "stock.webp",
  "stock_laptop.webp",
  "dealer_growth.webp",
];

(async () => {
  for (const file of targets) {
    const src = path.join(posterDir, file);
    if (!fs.existsSync(src)) continue;

    const stem = file.replace(/\.webp$/i, "");
    const dest = path.join(posterDir, `${stem}_540w.webp`);
    await sharp(src).resize({ width: 540, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
    console.log(`optimize-posters: ${path.basename(dest)}`);
  }
})();
