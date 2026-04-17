import type { ReactNode } from "react";
import { MobileNavShell } from "@/components/layout/MobileNavShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteSidebar } from "@/components/layout/SiteSidebar";

type SiteLayoutFrameProps = {
  children: ReactNode;
};

/**
 * Оболочка: на мобилке — шапка «название + бургер», сайдбар в выезжающей панели;
 * от `md` — прежняя колонка слева без бургера.
 */
export function SiteLayoutFrame({ children }: SiteLayoutFrameProps) {
  return (
    <>
      <MobileNavShell>
        <div className="app-gutter-x">
          <SiteSidebar />
        </div>
      </MobileNavShell>

      <div className="flex min-h-full min-w-0 flex-1 flex-col pt-14 md:flex-row md:pt-0">
        <aside
          id="site-sidebar"
          className="hidden shrink-0 border-r border-border bg-surface/95 md:sticky md:top-0 md:block md:h-[100dvh] md:w-56 md:overflow-y-auto md:backdrop-blur-sm"
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
    </>
  );
}
