import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

/**
 * Индексация: весь публичный сайт разрешён (`allow: /`). Закрывать от роботов отдельные
 * пути не требуется — служебных маршрутов с дублем контента нет.
 *
 * `sitemap` — абсолютный URL; список URL собирается в `app/sitemap.ts` из главной + `articleSeoByPath`.
 * `host` — для Яндекса (без схемы). ИИ: при смене домена — `NEXT_PUBLIC_SITE_URL` в `lib/site-url.ts`.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  /** Для Яндекса в `Host:` нужен только хост без схемы (не `https://…`). */
  let host: string | undefined;
  try {
    host = new URL(base).host;
  } catch {
    host = undefined;
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    ...(host ? { host } : {}),
  };
}
