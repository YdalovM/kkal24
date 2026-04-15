import type { MetadataRoute } from "next";
import { articleSeoByPath, type ArticleCanonicalPath } from "@/content/seo-routes";
import {
  sitemapLastModifiedForArticle,
  sitemapLastModifiedForHome,
} from "@/lib/seo-page-metadata";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

/**
 * Главная + все ключи `articleSeoByPath` (канонические URL со слэшем).
 * hreflang — как в `buildArticleMetadata` (ru-RU, x-default).
 * `lastModified` — из `homeSeo.lastModified` и дат статей в `articleSeoByPath`, не время сборки.
 *
 * ИИ: новый индексируемый маршрут — запись в `content/seo-routes.ts` (`ArticleCanonicalPath`),
 * иначе страница не попадёт в sitemap. Инструменты с высоким трафиком — `weekly` и приоритет выше.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, "");

  const hreflangs = (path: string) => {
    const abs = `${base}${path}`;
    return {
      languages: {
        "ru-RU": abs,
        "x-default": abs,
      },
    };
  };

  const articlePriority = (path: ArticleCanonicalPath): number => {
    if (path === "/politika-konfidencialnosti/") return 0.45;
    if (path === "/o-proekte/") return 0.65;
    if (path === "/kalkulyator-pitaniya/") return 0.9;
    if (path === "/kkal-produktov/") return 0.88;
    return 0.85;
  };

  const articleChangeFrequency = (
    path: ArticleCanonicalPath,
  ): MetadataRoute.Sitemap[0]["changeFrequency"] => {
    if (path === "/kalkulyator-pitaniya/" || path === "/kkal-produktov/") {
      return "weekly";
    }
    return "monthly";
  };

  const articleEntries: MetadataRoute.Sitemap = (
    Object.keys(articleSeoByPath) as ArticleCanonicalPath[]
  ).map((path) => ({
    url: `${base}${path}`,
    lastModified: sitemapLastModifiedForArticle(path),
    changeFrequency: articleChangeFrequency(path),
    priority: articlePriority(path),
    alternates: hreflangs(path),
  }));

  return [
    {
      url: `${base}/`,
      lastModified: sitemapLastModifiedForHome(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: hreflangs("/"),
    },
    ...articleEntries,
  ];
}
