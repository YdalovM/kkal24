/**
 * Сборка `Metadata` для Next.js: canonical, hreflang, Open Graph, Twitter, keywords.
 * ИИ: ключевые слова страницы объединяются с глобальными из `site.ts` без дублей.
 * OG/Twitter-картинки — см. `app/opengraph-image.tsx` (дефолт на весь сайт).
 */
import type { Metadata } from "next";
import {
  articleSeoByPath,
  homeSeo,
  type ArticleCanonicalPath,
  type ArticleSeoEntry,
} from "@/content/seo-routes";
import {
  ARTICLE_JSONLD_DATE_MODIFIED,
  ARTICLE_JSONLD_DATE_PUBLISHED,
} from "@/lib/seo-constants";
import { getSiteUrl } from "@/lib/site-url";
import { siteContent } from "@/content/site";

const SITE_KEYWORDS = [...siteContent.keywords];

function mergeKeywords(page: readonly string[]): string[] {
  const set = new Set<string>([...page, ...SITE_KEYWORDS]);
  return [...set];
}

function originWithSlash(): string {
  return `${getSiteUrl().replace(/\/$/, "")}/`;
}

function articleIsoDates(cfg: ArticleSeoEntry): {
  published: string;
  modified: string;
} {
  const published = cfg.datePublished ?? ARTICLE_JSONLD_DATE_PUBLISHED;
  const modified =
    cfg.dateModified ?? cfg.datePublished ?? ARTICLE_JSONLD_DATE_MODIFIED;
  return { published, modified };
}

/** Для `app/sitemap.xml`: реальные даты из SEO, а не время сборки. */
export function sitemapLastModifiedForHome(): Date {
  return new Date(homeSeo.lastModified);
}

export function sitemapLastModifiedForArticle(
  path: ArticleCanonicalPath,
): Date {
  const cfg = articleSeoByPath[path];
  const { modified } = articleIsoDates(cfg);
  return new Date(modified);
}

/**
 * Метаданные главной: полный title (без шаблона), canonical `/`, OG и Twitter.
 */
export function buildHomeMetadata(): Metadata {
  return {
    title: homeSeo.title,
    description: homeSeo.description,
    keywords: mergeKeywords([...homeSeo.keywords]),
    alternates: {
      canonical: "/",
      languages: {
        "ru-RU": "/",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: "/",
      siteName: siteContent.shortName,
      title: homeSeo.title,
      description: homeSeo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: homeSeo.title,
      description: homeSeo.description,
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Метаданные статьи по каноническому пути (со слэшем). Title уходит в шаблон root layout.
 */
export function buildArticleMetadata(path: ArticleCanonicalPath): Metadata {
  const cfg = articleSeoByPath[path];
  const ogDesc = cfg.ogDescription ?? cfg.description;
  const { published, modified } = articleIsoDates(cfg);
  const publisherUrl = originWithSlash();

  return {
    title: cfg.title,
    description: cfg.description,
    keywords: mergeKeywords([...cfg.keywords]),
    authors: [{ name: siteContent.shortName, url: publisherUrl }],
    alternates: {
      canonical: path,
      languages: {
        "ru-RU": path,
        "x-default": path,
      },
    },
    openGraph: {
      type: "article",
      locale: "ru_RU",
      url: path,
      siteName: siteContent.shortName,
      title: cfg.title,
      description: ogDesc,
      publishedTime: published,
      modifiedTime: modified,
      authors: [publisherUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: cfg.title,
      description: ogDesc,
    },
    robots: { index: true, follow: true },
  };
}
