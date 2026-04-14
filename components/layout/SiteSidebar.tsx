"use client";

import Link from "next/link";
import { siteContent } from "@/content/site";

const sectionClass =
  "px-1 pb-1 pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle first:pt-0";

const linkRow =
  "touch-manipulation flex min-h-11 w-full min-w-0 items-center rounded-lg border border-transparent px-3 py-2.5 text-left text-sm leading-snug text-fg transition-[background-color,border-color,color,transform] duration-200 ease-out [overflow-wrap:anywhere] hover:border-accent/15 hover:bg-accent/[0.06] hover:text-fg motion-reduce:hover:translate-x-0 md:hover:translate-x-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus";

type SiteSidebarProps = {
  /** Закрыть мобильное меню после перехода (хэш на главной не меняет `pathname`). */
  onNavigate?: () => void;
};

/**
 * Постоянный сайдбар: единственный источник структуры меню в боковой колонке.
 * Списки берутся из `siteContent` — не дублируйте URL вручную в JSX.
 * ИИ: активный якорь на главной зависит от `useLocationHash` + `normalizeAppPath`.
 */
export function SiteSidebar({ onNavigate }: SiteSidebarProps) {
  const afterNav = () => {
    onNavigate?.();
  };

  return (
    <div className="flex flex-col py-4 pb-5 pt-[max(1rem,env(safe-area-inset-top,0px))] md:py-6">
      <Link
        href="/"
        className="mb-4 px-3 text-sm font-semibold leading-snug text-fg transition-[color,transform] duration-200 hover:text-accent md:hover:translate-x-0.5 motion-reduce:hover:translate-x-0"
        onClick={afterNav}
      >
        {siteContent.shortName}
      </Link>

      <nav className="min-w-0 flex-1" aria-label="Разделы сайта">
        <div className={sectionClass}>Калькуляторы</div>
        <ul className="mb-1 space-y-0.5">
          {siteContent.calcQuickLinks.map((item) => (
            <li key={item.anchorId}>
              <a
                href={`/#${item.anchorId}`}
                className={linkRow}
                onClick={afterNav}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={sectionClass}>Материалы</div>
        <ul className="space-y-0.5">
          {siteContent.articleNavLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkRow} onClick={afterNav}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
