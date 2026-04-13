/**
 * После `next build` (static export) Next подставляет cache-bust вроде
 * `/favicon.ico?favicon…` или `/icon.png?icon…`. Часть статических хостингов по URL с `?`
 * отдаёт 500. Убираем query в этих href во всех HTML в `out/`.
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
/**
 * Важно: правим только настоящие HTML-атрибуты href="..."
 * (иначе можно зацепить сериализованный JSON внутри inline-скриптов Next
 * и сломать рантайм с `Invalid or unexpected token`).
 */
const htmlHrefPatterns = [
  [/href="\/favicon\.ico\?favicon\.[^"]*"/g, 'href="/favicon.ico"'],
  [/href="\/icon\.png\?icon\.[^"]*"/g, 'href="/icon.png"'],
];

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (name.name.endsWith(".html")) {
      let s = fs.readFileSync(p, "utf8");
      let next = s;
      for (const [re, rep] of htmlHrefPatterns) {
        next = next.replace(re, rep);
      }
      if (next !== s) fs.writeFileSync(p, next, "utf8");
    }
  }
}

if (fs.existsSync(outDir)) {
  walk(outDir);
}
