"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteSidebar } from "@/components/layout/SiteSidebar";
import { siteContent } from "@/content/site";

type SiteLayoutFrameProps = {
  children: ReactNode;
};

/**
 * Оболочка: на мобилке — шапка «название + бургер», сайдбар в выезжающей панели;
 * от `md` — прежняя колонка слева без бургера.
 */
export function SiteLayoutFrame({ children }: SiteLayoutFrameProps) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    queueMicrotask(() => {
      setNavOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setNavOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [navOpen]);

  const closeNav = () => setNavOpen(false);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60] border-b border-border bg-surface/95 backdrop-blur-sm md:hidden"
        style={{ paddingTop: "max(0.35rem, env(safe-area-inset-top))" }}
      >
        <div className="app-gutter-x flex h-14 min-h-[3.5rem] items-center justify-between gap-3">
          <Link
            href="/"
            className="min-w-0 truncate text-sm font-semibold text-fg transition-colors hover:text-accent"
            onClick={closeNav}
          >
            {siteContent.shortName}
          </Link>
          <button
            type="button"
            onClick={() => setNavOpen((o) => !o)}
            className="touch-manipulation inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-elevated/80 text-fg transition-colors hover:border-accent/30 hover:bg-accent/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            aria-expanded={navOpen}
            aria-controls="site-sidebar"
            aria-label={navOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {navOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {navOpen ? (
        <button
          type="button"
          aria-label="Закрыть меню"
          className="fixed inset-0 z-[55] bg-black/45 backdrop-blur-[1px] md:hidden"
          onClick={closeNav}
        />
      ) : null}

      <div className="flex min-h-full min-w-0 flex-1 flex-col pt-14 md:flex-row md:pt-0">
        <aside
          id="site-sidebar"
          className={[
            "z-[58] shrink-0 border-border bg-surface transition-[transform,box-shadow] duration-200 ease-out motion-reduce:transition-none",
            "md:relative md:z-auto md:h-[100dvh] md:w-56 md:translate-x-0 md:border-b-0 md:border-r md:bg-surface/95 md:backdrop-blur-sm md:shadow-none",
            "md:sticky md:top-0 md:overflow-y-auto",
            "max-md:fixed max-md:bottom-0 max-md:left-0 max-md:top-14 max-md:w-[min(19rem,calc(100vw-2rem))] max-md:overflow-y-auto max-md:border-r",
            navOpen
              ? "max-md:translate-x-0 max-md:shadow-xl"
              : "max-md:pointer-events-none max-md:-translate-x-full",
          ].join(" ")}
          aria-label="Навигация по разделам сайта"
        >
          <div className="app-gutter-x">
            <SiteSidebar onNavigate={closeNav} />
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
