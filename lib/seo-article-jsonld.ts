import {
  articleSeoByPath,
  type ArticleCanonicalPath,
  type ArticleSeoEntry,
} from "@/content/seo-routes";
import {
  ARTICLE_JSONLD_DATE_MODIFIED,
  ARTICLE_JSONLD_DATE_PUBLISHED,
} from "@/lib/seo-constants";
import { siteContent } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

function originSlash(): string {
  return `${getSiteUrl().replace(/\/$/, "")}/`;
}

function articleDates(cfg: ArticleSeoEntry) {
  const datePublished = cfg.datePublished ?? ARTICLE_JSONLD_DATE_PUBLISHED;
  const dateModified =
    cfg.dateModified ?? cfg.datePublished ?? ARTICLE_JSONLD_DATE_MODIFIED;
  return { datePublished, dateModified };
}

/**
 * JSON-LD для статей: WebPage + Article, связь с тем же WebSite `@id`, что на главной.
 * ИИ: не добавляйте FAQ, если блока FAQ нет на странице. Даты — из записи или `seo-constants`.
 */
export function buildArticleWebPageJsonLd(path: ArticleCanonicalPath) {
  const base = getSiteUrl().replace(/\/$/, "");
  const cfg = articleSeoByPath[path];
  const url = `${base}${path}`;
  const origin = originSlash();
  const websiteId = `${origin}#website`;
  const { datePublished, dateModified } = articleDates(cfg);

  const org = {
    "@type": "Organization" as const,
    name: siteContent.shortName,
    url: origin,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: cfg.title,
        description: cfg.description,
        inLanguage: "ru-RU",
        isPartOf: { "@id": websiteId },
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: cfg.title,
        description: cfg.description,
        datePublished,
        dateModified,
        author: org,
        publisher: org,
        inLanguage: "ru-RU",
        isAccessibleForFree: true,
        mainEntityOfPage: { "@id": `${url}#webpage` },
      },
    ],
  };
}
