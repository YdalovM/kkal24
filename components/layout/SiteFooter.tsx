import Link from "next/link";
import { siteContent } from "@/content/site";
import { FooterCalcLinks } from "@/components/layout/FooterCalcLinks";
import { footerNavLinkClass } from "@/components/layout/footer-nav-link-classes";

/**
 * Общий футер: дубль внутренних ссылок (SEO + удобство), дисклеймер.
 * Серверный компонент; клиентский потомок — только `FooterCalcLinks` (якоря с hash).
 */
export function SiteFooter() {
  const { base, idle } = footerNavLinkClass;

  return (
    <footer className="mt-auto border-t border-border bg-page/60 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-8 text-xs leading-relaxed text-fg-subtle">
      <div className="app-gutter-x mx-auto max-w-3xl space-y-5">
        <FooterCalcLinks />

        <nav aria-label="Материалы и статьи">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
            Материалы
          </p>
          <ul className="flex flex-wrap gap-x-1 gap-y-1">
            {siteContent.articleNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`${base} ${idle}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Дисклеймер */}
        <p className="max-w-2xl text-pretty text-fg-dim">
          Информационный сервис, не медицинская услуга. Расчёты — ориентировочные; при
          заболеваниях, беременности или приёме препаратов — только с врачом.{" "}
          <Link
            href="/o-proekte/"
            className="text-fg-subtle underline decoration-border underline-offset-2 hover:text-fg-muted"
          >
            О проекте и ограничениях
          </Link>
          .
        </p>

        <p className="text-fg-dim">
          Редакция: {siteContent.contentRevision}.
        </p>
      </div>
    </footer>
  );
}
