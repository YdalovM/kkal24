"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/content/site";
import { CalcAnchorLink } from "@/components/layout/CalcAnchorLink";
import { useLocationHash } from "@/hooks/useLocationHash";
import { normalizeAppPath } from "@/lib/nav-path";

const sectionClass =
  "px-1 pb-1 pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle first:pt-0";

const linkRow =
  "touch-manipulation flex min-h-11 w-full items-center rounded-lg border border-transparent px-3 py-2.5 text-left text-sm text-fg transition-[background-color,border-color,color,transform] duration-200 ease-out hover:border-accent/15 hover:bg-accent/[0.06] hover:text-fg motion-reduce:hover:translate-x-0 md:hover:translate-x-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus";

/**
 * Постоянный сайдбар: единственный источник структуры меню в боковой колонке.
 * Списки берутся из `siteContent` — не дублируйте URL вручную в JSX.
 * ИИ: активный якорь на главной зависит от `useLocationHash` + `normalizeAppPath`.
 */
export function SiteSidebar() {
  const pathname = usePathname();
  const hash = useLocationHash(pathname);

  const p = normalizeAppPath(pathname);
  const onHome = p === "/";

  const calcActive = (anchorId: string) =>
    onHome &&
    (hash === `#${anchorId}` ||
      (anchorId === "calc-main" && (!hash || hash === "#")));

  const articleActive = (href: string) => normalizeAppPath(href) === p;

  return (
    <div className="flex flex-col py-4 pb-5 pt-[max(1rem,env(safe-area-inset-top,0px))] md:py-6">
      <Link
        href="/"
        className="mb-4 px-3 text-sm font-semibold leading-snug text-fg transition-[color,transform] duration-200 hover:text-accent md:hover:translate-x-0.5 motion-reduce:hover:translate-x-0"
      >
        {siteContent.shortName}
      </Link>

      <nav className="min-w-0 flex-1" aria-label="Разделы сайта">
        <div className={sectionClass}>Калькуляторы</div>
        <ul className="mb-1 space-y-0.5">
          {siteContent.calcQuickLinks.map((item) => (
            <li key={item.anchorId}>
              <CalcAnchorLink
                anchorId={item.anchorId}
                className={`${linkRow} ${calcActive(item.anchorId) ? "translate-x-0 border-accent/35 bg-accent/[0.1] text-accent shadow-[inset_0_0_0_1px_rgba(184,233,67,0.12)] md:translate-x-0.5" : ""}`}
              >
                {item.label}
              </CalcAnchorLink>
            </li>
          ))}
        </ul>

        <div className={sectionClass}>Материалы</div>
        <ul className="space-y-0.5">
          {siteContent.articleNavLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${linkRow} ${articleActive(link.href) ? "translate-x-0 border-accent/35 bg-accent/[0.1] text-accent shadow-[inset_0_0_0_1px_rgba(184,233,67,0.12)] md:translate-x-0.5" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
