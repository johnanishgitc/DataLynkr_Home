#!/usr/bin/env node
/** Switch mobile/laptop toggle sections from stacked grid to conditional render (one video in DOM). */
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "app", "HomeClient.tsx");
let s = fs.readFileSync(filePath, "utf8");

if (!s.includes("renderToggleMedia")) {
  s = s.replace(
    `  const getContainerClass = (sectionId: string, view: "mobile" | "laptop") => {
    const isActive = activeViews[sectionId] === view;
    return \`col-start-1 row-start-1 w-full flex justify-center transition-all duration-500 ease-out \${
      isActive
        ? "opacity-100 scale-100 pointer-events-auto z-10 visible"
        : "opacity-0 scale-95 pointer-events-none z-0 invisible"
    }\`;
  };`,
    `  const renderToggleMedia = (
    sectionId: string,
    mobile: React.ReactNode,
    laptop: React.ReactNode,
  ) => (
    <div className="w-full flex justify-center transition-all duration-500 ease-out">
      {activeViews[sectionId] === "mobile" ? mobile : laptop}
    </div>
  );`,
  );
}

const sections = [
  "sales-order",
  "bcommerce",
  "invoice",
  "workflows",
  "ledgers",
  "offline",
  "payments",
  "stock",
];

for (const id of sections) {
  const gridRe = new RegExp(
    `<div className="grid w-full items-center">\\s*<div className=\\{getContainerClass\\("${id}", "mobile"\\)\\}>([\\s\\S]*?)</div>\\s*<div className=\\{getContainerClass\\("${id}", "laptop"\\)\\}>([\\s\\S]*?)</div>\\s*</div>`,
  );
  s = s.replace(gridRe, (_, mobile, laptop) => {
    const trim = (block) => block.trim();
    return `{renderToggleMedia("${id}",\n                (${trim(mobile)}),\n                (${trim(laptop)}),\n              )}`;
  });
}

fs.writeFileSync(filePath, s);
console.log("Toggle sections patched:", sections.filter((id) => s.includes(`renderToggleMedia("${id}"`)).length);
