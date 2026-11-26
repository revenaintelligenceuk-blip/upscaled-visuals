// Writes the rendered HTML into the built pages, so crawlers get the content
// without running JavaScript, then writes the sitemap. Last step of `npm run build`.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const { render, structuredData, verificationTag, siteUrl } = await import(
  pathToFileURL(path.join(root, "dist-ssr/prerender.js"))
);

const pages = { home: "index.html", work: "work/index.html", privacy: "privacy/index.html", cookies: "cookies/index.html", terms: "terms/index.html", notFound: "404.html" };
const slot = '<div id="root"></div>';
const urls = [];

for (const [page, file] of Object.entries(pages)) {
  const target = path.join(root, "dist", file);
  // The work page is only built once there is work to show.
  if (page === "work" && !fs.existsSync(target)) continue;
  let html = fs.readFileSync(target, "utf8");
  if (!html.includes(slot)) throw new Error(`No empty #root in ${file}`);
  // Function replacements, so "$" in the content is never treated as a pattern.
  html = html.replace(slot, () => `<div id="root">${render(page)}</div>`);
  if (page === "home") html = html.replace("</head>", () => `  ${verificationTag()}\n    ${structuredData()}\n  </head>`);
  fs.writeFileSync(target, html);
  if (page !== "notFound") urls.push(`${siteUrl}/${file.replace("index.html", "")}`);
  console.log(`pre-rendered ${file}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "dist", "sitemap.xml"), sitemap);
console.log(`sitemap: ${urls.length} pages`);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
