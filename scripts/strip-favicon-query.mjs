/**
 * После `next build` (static export) Next подставляет cache-bust вроде
 * `/favicon.ico?favicon.xxx.ico`. Часть статических хостингов отдаёт по такому URL 500;
 * Яндекс и браузеры тогда не видят фавикон. Убираем query у favicon во всех HTML в `out/`.
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const re = /\/favicon\.ico\?favicon\.[^"]+/g;

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (name.name.endsWith(".html")) {
      let s = fs.readFileSync(p, "utf8");
      const next = s.replace(re, "/favicon.ico");
      if (next !== s) fs.writeFileSync(p, next, "utf8");
    }
  }
}

if (fs.existsSync(outDir)) {
  walk(outDir);
}
