import type { ReactNode } from "react";

type ArticleCardTone = "default" | "accent" | "warn";

type ArticleCardGridProps = {
  children: ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
};

type ArticleCardProps = {
  children?: ReactNode;
  title?: ReactNode;
  eyebrow?: ReactNode;
  aside?: ReactNode;
  tone?: ArticleCardTone;
  className?: string;
};

type ArticleHighlightProps = {
  children: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
};

type ArticleFaqItem = {
  question: ReactNode;
  answer: ReactNode;
};

type ArticleFaqProps = {
  items: ArticleFaqItem[];
  className?: string;
};

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

/**
 * Базовые визуальные блоки для справочных статей.
 * ИИ: сначала пробуйте собрать страницу из этих примитивов, а не копировать
 * длинные className между файлами. Новые варианты добавляйте только если
 * текущих реально не хватает на 2-3 статьи подряд.
 */
export function ArticleCardGrid({
  children,
  columns = 2,
  className,
}: ArticleCardGridProps) {
  const columnsClassName =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={joinClasses("not-prose mt-5 grid gap-3", columnsClassName, className)}>
      {children}
    </div>
  );
}

export function ArticleCard({
  children,
  title,
  eyebrow,
  aside,
  tone = "default",
  className,
}: ArticleCardProps) {
  const toneClassName =
    tone === "accent"
      ? "border border-accent/20 bg-accent/[0.06]"
      : tone === "warn"
        ? "border border-warn/20 bg-warn/[0.06]"
        : "border border-border/80 bg-elevated/35";
  const hasHeader = Boolean(title || aside);
  const hasEyebrow = Boolean(eyebrow);
  const hasChildren = Boolean(children);

  return (
    <section className={joinClasses("rounded-xl p-4", toneClassName, className)}>
      {hasEyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent/80">
          {eyebrow}
        </p>
      ) : null}
      {hasHeader ? (
        <div
          className={joinClasses(
            "flex items-start justify-between gap-3",
            hasEyebrow ? "mt-3" : undefined,
          )}
        >
          {title ? <h3 className="text-sm font-semibold text-fg">{title}</h3> : <div />}
          {aside}
        </div>
      ) : null}
      {hasChildren ? (
        <div
          className={joinClasses(
            hasHeader ? "mt-2" : undefined,
            "text-sm leading-6 text-fg-muted",
          )}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}

export function ArticleHighlight({
  children,
  eyebrow,
  className,
}: ArticleHighlightProps) {
  return (
    <div
      className={joinClasses(
        "not-prose mt-5 rounded-2xl border border-accent/15 bg-gradient-to-br from-elevated/75 via-elevated/50 to-page/40 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent/80">
          {eyebrow}
        </p>
      ) : null}
      {children}
    </div>
  );
}

export function ArticleFaq({ items, className }: ArticleFaqProps) {
  return (
    <div className={joinClasses("not-prose mt-5 space-y-3", className)}>
      {items.map((item, index) => (
        <details
          key={index}
          className="overflow-hidden rounded-xl border border-border/80 bg-elevated/30"
        >
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-fg marker:hidden">
            {item.question}
          </summary>
          <div className="border-t border-border/70 px-4 py-3 text-sm leading-6 text-fg-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
