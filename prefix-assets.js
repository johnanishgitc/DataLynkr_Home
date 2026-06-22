const fs = require("fs");
const path = require("path");

const filesToUpdate = [
  path.join(__dirname, "app/HomeClient.tsx"),
  path.join(__dirname, "app/login/LoginClient.tsx"),
];

filesToUpdate.forEach(filePath => {
  let content = fs.readFileSync(filePath, "utf8");

  // Add the import if not present
  if (!content.includes("import { basePath }")) {
    content = content.replace(
      /"use client";\r?\n/,
      `"use client";\n\nimport { basePath } from "@/lib/site";\n`
    );
  }

  // Replace src="/resources/... " with src={basePath + "/resources/... "}
  content = content.replace(/src="\/resources\/([^"]+)"/g, 'src={basePath + "/resources/$1"}');
  
  // Replace poster="/resources/... " with poster={basePath + "/resources/... "}
  content = content.replace(/poster="\/resources\/([^"]+)"/g, 'poster={basePath + "/resources/$1"}');

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated ${filePath}`);
});
