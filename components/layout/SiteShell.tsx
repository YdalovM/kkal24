import type { ReactNode } from "react";
import { SiteLayoutFrame } from "@/components/layout/SiteLayoutFrame";

type SiteShellProps = {
  children: ReactNode;
};

/**
 * Глобальная оболочка приложения.
 *
 * ИИ / SEO: один семантический `<aside>` с навигацией; у каждой страницы свой `<main>`
 * (главная `app/page.tsx`, статьи `ArticleShell`). Skip-link улучшает доступность и
 * косвенно сигнал качества для поисковиков. Не вводите второй `<main>` сюда.
 * На узких экранах навигация в выезжающей панели — см. `SiteLayoutFrame`.
 */
export function SiteShell({ children }: SiteShellProps) {
  return <SiteLayoutFrame>{children}</SiteLayoutFrame>;
}
