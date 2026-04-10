import type { ReactNode } from "react";
import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

type ArticleShellProps = {
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
};

/**
 * Обёртка для информационных статей.
 * Выравнивает ширину, добавляет вертикальные отступы, хлебные крошки.
 * Тег <main> здесь, чтобы screen-reader'ы сразу прыгали к контенту.
 * Фут вынесен в root layout (SiteFooter) — здесь его нет.
 */
export function ArticleShell({ breadcrumbs, children }: ArticleShellProps) {
  return (
    <main className="min-w-0 flex-1 overflow-x-clip">
      <div className="app-gutter-x mx-auto min-w-0 max-w-3xl py-8 sm:py-10 md:py-14">
        <Breadcrumbs items={breadcrumbs} />
        <article className="article-prose mt-6 min-w-0 max-w-full">{children}</article>
      </div>
    </main>
  );
}
