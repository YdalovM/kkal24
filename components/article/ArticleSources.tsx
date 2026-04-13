import type { ExternalRef } from "@/content/external-references";

type ArticleSourcesProps = {
  /** Опционально: зачем этот список на конкретной странице. */
  intro?: string;
  items: ExternalRef[];
};

/**
 * Блок «Источники» с внешними ссылками (RU + международные).
 * Открываем в новой вкладке — читатель не теряет контекст статьи.
 */
export function ArticleSources({ intro, items }: ArticleSourcesProps) {
  return (
    <section
      className="article-sources"
      aria-labelledby="article-sources-heading"
    >
      <h2 id="article-sources-heading">Источники и ориентиры</h2>
      {intro ? <p>{intro}</p> : null}
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
            <span className="text-fg-subtle"> — {item.localeNote}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
