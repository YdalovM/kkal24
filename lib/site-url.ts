/**
 * Базовый URL сайта для метаданных, canonical, OG, sitemap и robots.
 *
 * ИИ/деплой: в проде задайте `NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru` (без слэша в конце).
 * На Vercel при отсутствии переменной часто хватает `VERCEL_URL` (см. ниже).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const vercel = process.env.VERCEL_URL?.trim().replace(/^https?:\/\//, "");
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
