// Draws the sharing image and icons from the site's own fonts and mark:
//   npm run images
// Writes public/og-image.png, favicon.ico, apple-touch-icon.png, icon-192.png and
// icon-512.png. Needs Chrome or Edge; set BROWSER_PATH if it isn't found.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = (name) => path.join(root, "public", name);

const browser = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((candidate) => candidate && fs.existsSync(candidate));
if (!browser) throw new Error("Chrome or Edge not found. Set BROWSER_PATH.");

const font = (file) =>
  `data:font/woff2;base64,${fs.readFileSync(path.join(root, "node_modules", file)).toString("base64")}`;

const mark = fs.readFileSync(out("favicon.svg"), "utf8");
// Phones round the corners themselves, so the larger icons are full squares.
const square = mark.replace(' rx="14"', "");

const ogPage = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:G;src:url(${font("@fontsource-variable/geist/files/geist-latin-wght-normal.woff2")});font-weight:100 900}
@font-face{font-family:S;font-style:italic;src:url(${font("@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2")})}
*{margin:0;padding:0}
body{width:1200px;height:630px;overflow:hidden;background:#0e0e0c;color:#f2eee6;font-family:G;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgb(242 238 230/.07) 1px,transparent 1px),linear-gradient(to bottom,rgb(242 238 230/.07) 1px,transparent 1px);background-size:72px 72px;-webkit-mask-image:radial-gradient(ellipse 90% 85% at 70% 35%,#000 40%,transparent 85%)}
.brand{position:absolute;left:80px;top:72px;font-size:40px;font-weight:600;letter-spacing:-.04em}
h1{position:absolute;left:80px;bottom:78px;font-size:82px;line-height:1.02;font-weight:500;letter-spacing:-.04em}
em{font-family:S;font-weight:400;letter-spacing:0;color:#c9b48a}
</style><div class="grid"></div><div class="brand">Upscaled</div><h1>Web design for<br>businesses in <em>London</em></h1>`;

const iconPage = (svg, size) =>
  `<!doctype html><style>*{margin:0;padding:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`;

const profile = fs.mkdtempSync(path.join(os.tmpdir(), "upscaled-images-"));
const child = spawn(browser, ["--headless=new", "--remote-debugging-port=0", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${profile}`, "about:blank"]);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  // With port 0 the browser picks a free port and writes it to this file.
  const portFile = path.join(profile, "DevToolsActivePort");
  let page;
  for (let i = 0; i < 80 && !page; i++) {
    await sleep(250);
    if (!fs.existsSync(portFile)) continue;
    const port = fs.readFileSync(portFile, "utf8").split("\n")[0];
    const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json().catch(() => []);
    page = targets.find((t) => t.type === "page");
  }
  if (!page) throw new Error("The browser did not start.");

  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let id = 0;
  const waiting = new Map();
  socket.onmessage = (event) => { const message = JSON.parse(event.data); waiting.get(message.id)?.(message); };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const request = ++id;
      waiting.set(request, (message) =>
        message.error ? reject(new Error(`${method}: ${message.error.message}`)) : resolve(message));
      socket.send(JSON.stringify({ id: request, method, params }));
    });

  // Load a blank page ourselves, so the frame can't change under us at start-up.
  await send("Page.navigate", { url: "about:blank" });
  await sleep(1000);
  const { result } = await send("Page.getFrameTree");
  const frameId = result.frameTree.frame.id;

  const draw = async (html, width, height, transparent = false) => {
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    await send("Emulation.setDefaultBackgroundColorOverride", transparent ? { color: { r: 0, g: 0, b: 0, a: 0 } } : {});
    await send("Page.setDocumentContent", { frameId, html });
    await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => new Promise(r => setTimeout(r, 300)))", awaitPromise: true });
    const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width, height, scale: 1 } });
    return Buffer.from(shot.result.data, "base64");
  };

  fs.writeFileSync(out("og-image.png"), await draw(ogPage, 1200, 630));
  for (const [name, size] of [["apple-touch-icon.png", 180], ["icon-192.png", 192], ["icon-512.png", 512]]) {
    fs.writeFileSync(out(name), await draw(iconPage(square, size), size, size));
  }

  // favicon.ico: a short header in front of a 32px PNG.
  const png = await draw(iconPage(mark, 32), 32, 32, true);
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(32, 6); // width
  header.writeUInt8(32, 7); // height
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // where the PNG starts
  fs.writeFileSync(out("favicon.ico"), Buffer.concat([header, png]));
  socket.close();
  console.log("wrote og-image.png, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png");
} finally {
  const closed = new Promise((resolve) => child.once("exit", resolve));
  child.kill();
  await Promise.race([closed, sleep(5000)]);
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
}
