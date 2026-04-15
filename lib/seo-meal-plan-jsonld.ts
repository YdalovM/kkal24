import { articleSeoByPath } from "@/content/seo-routes";
import { mealPlanPageFaq } from "@/content/meal-plan-page-seo";
import { siteContent } from "@/content/site";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { getSiteUrl } from "@/lib/site-url";

const PATH = "/kalkulyator-pitaniya/" as const;

/**
 * JSON-LD для страницы калькулятора питания: Article + WebPage + FAQPage + WebApplication.
 * FAQ и текст на странице — из `content/meal-plan-page-seo.ts`.
 */
export function buildMealPlanPageJsonLd() {
  const article = buildArticleWebPageJsonLd(PATH);
  const baseUrl = getSiteUrl().replace(/\/$/, "");
  const url = `${baseUrl}${PATH}`;
  const cfg = articleSeoByPath[PATH];

  const faqPage = {
    "@type": "FAQPage" as const,
    "@id": `${url}#faq`,
    mainEntity: mealPlanPageFaq.map((item) => ({
      "@type": "Question" as const,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.a,
      },
    })),
  };

  const webApp = {
    "@type": "WebApplication" as const,
    "@id": `${url}#webapp`,
    name: cfg.title,
    description: cfg.description,
    url,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    browserRequirements: "Требуется JavaScript. Современный браузер.",
    isAccessibleForFree: true,
    isPartOf: { "@id": `${url}#webpage` },
    offers: {
      "@type": "Offer" as const,
      price: "0",
      priceCurrency: "RUB",
    },
    provider: {
      "@type": "Organization" as const,
      name: siteContent.shortName,
      url: `${baseUrl}/`,
    },
  };

  const graph = article["@graph"] as Record<string, unknown>[];

  return {
    "@context": "https://schema.org",
    "@graph": [...graph, faqPage, webApp],
  };
}
