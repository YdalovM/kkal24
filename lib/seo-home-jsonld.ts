import { siteContent } from "@/content/site";
import { trustPublicContent } from "@/content/trust-public";
import { getSiteUrl } from "@/lib/site-url";

/**
 * JSON-LD для главной: WebSite, WebApplication, FAQPage (вопросы из `trust-public`).
 * ИИ: не подменяйте FAQ текстом, которого нет на странице.
 */
export function buildHomeJsonLd() {
  const baseRaw = getSiteUrl().replace(/\/$/, "");
  const originSlash = `${baseRaw}/`;

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${originSlash}#faq`,
    mainEntity: trustPublicContent.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${originSlash}#website`,
        name: siteContent.shortName,
        description: siteContent.description,
        url: originSlash,
        inLanguage: "ru-RU",
        publisher: {
          "@type": "Organization",
          name: siteContent.shortName,
          url: originSlash,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${originSlash}#webpage`,
        url: originSlash,
        name: siteContent.title,
        description: siteContent.description,
        inLanguage: "ru-RU",
        isPartOf: { "@id": `${originSlash}#website` },
      },
      {
        "@type": "WebApplication",
        "@id": `${originSlash}#webapp`,
        name: siteContent.title,
        description: siteContent.description,
        url: originSlash,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Any",
        browserRequirements: "Требуется JavaScript. Современный браузер.",
        isAccessibleForFree: true,
        isPartOf: { "@id": `${originSlash}#webpage` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "RUB",
        },
      },
      faqPage,
    ],
  };
}
