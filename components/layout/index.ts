/**
 * Реэкспорт layout-слоя для страниц и статей.
 *
 * ИИ: навигация живёт в `SiteShell` → `SiteSidebar` + `content/site.ts`. Новая статья:
 * `ArticleShell` + `app/<маршрут>/page.tsx` + запись в `seo-routes.ts` и `articleNavLinks`.
 */
export { SiteShell } from "@/components/layout/SiteShell";
export { CalcAnchorLink } from "@/components/layout/CalcAnchorLink";
export { SiteFooter } from "@/components/layout/SiteFooter";
export { Breadcrumbs } from "@/components/layout/Breadcrumbs";
export type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
export { ArticleShell } from "@/components/layout/ArticleShell";
export { AdSlot } from "@/components/layout/AdSlot";
