import type { NextConfig } from "next";

const nextConfig = {
  /** Убираем лишний заголовок X-Powered-By (микро-оптимизация и меньше «шума» в ответе). */
  poweredByHeader: false,
  /** Статический экспорт в `out/` — дешёвый хостинг (CDN / статика в App Platform без Node). */
  output: "export",
  /**
   * Встроенный `polyfill-module` Next подмешивает полифилы даже при современном `browserslist`
   * — Lighthouse помечает это как «устаревший JS». Подменяем на пустой модуль: целевые браузеры
   * см. `package.json` → `browserslist`. Внутренний путь Next может меняться между версиями.
   */
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
    },
  },
} satisfies NextConfig;

export default nextConfig;
