"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteSidebar } from "@/components/layout/SiteSidebar";

type SiteShellProps = {
  children: ReactNode;
};

/**
 * Глобальная оболочка приложения.
 *
 * ИИ / SEO: один семантический `<aside>` с навигацией; у каждой страницы свой `<main>`
 * (главная `app/page.tsx`, статьи `ArticleShell`). Skip-link улучшает доступность и
 * косвенно сигнал качества для поисковиков. Не вводите второй `<main>` сюда.
 */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col md:flex-row">
      <aside
        className="w-full shrink-0 border-b border-border bg-surface/95 backdrop-blur-sm md:sticky md:top-0 md:h-[100dvh] md:w-56 md:shrink-0 md:overflow-y-auto md:border-b-0 md:border-r"
        aria-label="Навигация по разделам сайта"
      >
        <div className="app-gutter-x">
          <SiteSidebar />
        </div>
      </aside>
      <div
        id="site-primary"
        tabIndex={-1}
        className="flex min-h-0 min-w-0 flex-1 flex-col outline-none"
      >
        <a href="#site-primary" className="skip-to-main">
          К основному содержимому
        </a>
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
