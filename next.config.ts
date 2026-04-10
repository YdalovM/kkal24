import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Убираем лишний заголовок X-Powered-By (микро-оптимизация и меньше «шума» в ответе). */
  poweredByHeader: false,
  /**
   * Сборка «standalone» — один каталог `.next/standalone` + статика для VPS/Docker (Timeweb и т.п.).
   * ИИ: после `next build` на сервере скопируйте `public` и `.next/static` — см. `docs/DEPLOY.md`.
   */
  output: "standalone",
};

export default nextConfig;
