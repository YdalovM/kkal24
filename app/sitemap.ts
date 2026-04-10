import type { MetadataRoute } from "next";
import { articleSeoByPath, type ArticleCanonicalPath } from "@/content/seo-routes";
import { getSiteUrl } from "@/lib/site-url";

/**
 * URL из `articleSeoByPath` + hreflang-заготовки (`ru-RU`, `x-default`) для консистентности с `buildArticleMetadata`.
 * ИИ: новый маршрут — ключ в `seo-routes`, иначе URL не попадёт сюда.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, "");
  const now = new Date();

  const hreflangs = (path: string) => {
    const abs = `${base}${path}`;
    return {
      languages: {
        "ru-RU": abs,
        "x-default": abs,
      },
    };
  };

  const articleEntries: MetadataRoute.Sitemap = (
    Object.keys(articleSeoByPath) as ArticleCanonicalPath[]
  ).map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/o-proekte/" ? 0.65 : 0.85,
    alternates: hreflangs(path),
  }));

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: hreflangs("/"),
    },
    ...articleEntries,
  ];
}
