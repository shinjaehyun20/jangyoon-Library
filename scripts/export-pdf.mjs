import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const outDir = path.join(root, "outputs");
const basePath = "/jangyoon-Library/";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

await fs.mkdir(outDir, { recursive: true });

if (process.platform === "win32") {
  execFileSync("cmd.exe", ["/d", "/s", "/c", "npm run build"], {
    cwd: root,
    stdio: "inherit"
  });
} else {
  execFileSync("npm", ["run", "build"], {
    cwd: root,
    stdio: "inherit"
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url ?? "/", "http://127.0.0.1:4173");
    let relativePath = requestUrl.pathname;

    if (relativePath === "/" || relativePath === basePath) {
      relativePath = "/index.html";
    } else if (relativePath.startsWith(basePath)) {
      relativePath = relativePath.slice(basePath.length - 1);
    }

    const filePath = path.join(distDir, relativePath);
    const payload = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();

    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] ?? "application/octet-stream"
    });
    res.end(payload);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const port =
  typeof address === "object" && address && "port" in address ? address.port : 4173;

try {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  await page.goto(`http://127.0.0.1:${port}/jangyoon-Library/?edition=kr`, {
    waitUntil: "networkidle"
  });

  await page.pdf({
    path: path.join(outDir, "north-wind-and-the-sun-kr.pdf"),
    format: "A4",
    printBackground: true
  });

  await page.goto(`http://127.0.0.1:${port}/jangyoon-Library/?edition=bilingual`, {
    waitUntil: "networkidle"
  });

  await page.pdf({
    path: path.join(outDir, "north-wind-and-the-sun-bilingual.pdf"),
    format: "A4",
    printBackground: true
  });

  await browser.close();
  console.log(`PDF exported to ${outDir}`);
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
