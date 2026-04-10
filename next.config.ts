import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Убираем лишний заголовок X-Powered-By (микро-оптимизация и меньше «шума» в ответе). */
  poweredByHeader: false,
  /** Статический экспорт в `out/` — дешёвый хостинг (CDN / статика в App Platform без Node). */
  output: "export",
};

export default nextConfig;
