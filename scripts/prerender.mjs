// Writes the rendered HTML into the built pages, so crawlers get the content
// without running JavaScript. Runs as the last step of `npm run build`.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const { render, structuredData } = await import(pathToFileURL(path.join(root, "dist-ssr/prerender.js")));

const pages = { home: "index.html", privacy: "privacy/index.html", cookies: "cookies/index.html", terms: "terms/index.html" };
const slot = '<div id="root"></div>';

for (const [page, file] of Object.entries(pages)) {
  const target = path.join(root, "dist", file);
  let html = fs.readFileSync(target, "utf8");
  if (!html.includes(slot)) throw new Error(`No empty #root in ${file}`);
  // Function replacements, so "$" in the content is never treated as a pattern.
  html = html.replace(slot, () => `<div id="root">${render(page)}</div>`);
  if (page === "home") html = html.replace("</head>", () => `  ${structuredData()}\n  </head>`);
  fs.writeFileSync(target, html);
  console.log(`pre-rendered ${file}`);
}
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
