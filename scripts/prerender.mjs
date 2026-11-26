// Writes the rendered HTML and head tags into the built pages, so crawlers get the
// content without running JavaScript, then writes the sitemap.
// Last step of `npm run build`.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const { render, headTags, pages, siteUrl } = await import(
  pathToFileURL(path.join(root, "dist-ssr/prerender.js"))
);

const slot = '<div id="root"></div>';
const urls = [];

// Preload the two fonts used by the main headline, so it paints sooner.
const assets = fs.readdirSync(path.join(root, "dist/assets"));
const fontPreloads = [/^geist-latin-wght-normal-.*\.woff2$/, /^instrument-serif-latin-400-italic-.*\.woff2$/].map((pattern) => {
  const file = assets.find((name) => pattern.test(name));
  if (!file) throw new Error(`No font matching ${pattern} in dist/assets`);
  return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;
});

for (const [page, { path: route, index }] of Object.entries(pages)) {
  const file = route.endsWith("/") ? `${route.slice(1)}index.html` : route.slice(1);
  const target = path.join(root, "dist", file);
  // The work page is only built once there is work to show.
  if (page === "work" && !fs.existsSync(target)) continue;
  let html = fs.readFileSync(target, "utf8");
  if (!html.includes(slot)) throw new Error(`No empty #root in ${file}`);
  // The source pages carry a plain <title> for the dev server. Replace it.
  html = html.replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n/, "");
  const head = [headTags(page), ...(page === "home" ? fontPreloads : [])].join("\n    ");
  // Function replacements, so "$" in the content is never treated as a pattern.
  html = html.replace(/<meta name="viewport"[^>]*>/, (viewport) => `${viewport}\n    ${head}`);
  html = html.replace(slot, () => `<div id="root">${render(page)}</div>`);
  fs.writeFileSync(target, html);
  if (index !== false) urls.push(`${siteUrl}${route}`);
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
