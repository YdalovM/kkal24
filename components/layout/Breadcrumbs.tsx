import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/site-url";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

/**
 * Хлебные крошки с JSON-LD BreadcrumbList.
 * Последний элемент — текущая страница (aria-current), не ссылка.
 * Всегда начинайте с { label: "Главная", href: "/" }.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const base = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${base}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Хлебные крошки">
        <ol className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-fg-dim">
          {items.map((item, i) => (
            <li key={item.href} className="flex min-w-0 max-w-full items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden className="select-none">
                  /
                </span>
              )}
              {i < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="min-w-0 break-words transition-colors hover:text-fg-muted"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="min-w-0 max-w-full break-words text-fg-subtle"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
