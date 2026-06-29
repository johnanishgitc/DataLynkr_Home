#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "app", "HomeClient.tsx");
const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

if (!lines.some((l) => l.includes("PosterPicture"))) {
  const idx = lines.findIndex((l) => l.includes('import { HOME_FAQ }'));
  if (idx !== -1) {
    lines.splice(idx + 1, 0, 'import PosterPicture from "@/components/PosterPicture";');
  }
}

let patched = 0;
for (let i = 0; i < lines.length; i++) {
  const sourceMatch = lines[i].match(
    /^(\s*)<source src=\{basePath \+ "(\/resources\/videos\/[^"]+)"\} type="video\/mp4" \/>$/,
  );
  if (!sourceMatch) continue;

  const indent = sourceMatch[1];
  const videoPath = sourceMatch[2];
  lines[i] = `${indent}<source type="video/mp4" />`;

  for (let j = i - 1; j >= 0; j--) {
    if (lines[j].includes("<video")) {
      const closeIdx = lines.findIndex((_, k) => k > j && k < i && lines[k].trim() === ">");
      if (closeIdx !== -1) {
        lines.splice(closeIdx, 0, `${indent}data-src={basePath + "${videoPath}"}`);
        patched++;
      }
      break;
    }
  }
}

fs.writeFileSync(filePath, lines.join("\n"));
console.log(`Patched ${patched} videos.`);
