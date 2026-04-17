import Link from "next/link";
import { footerNavLinkClass } from "@/components/layout/footer-nav-link-classes";
import { siteContent } from "@/content/site";

/**
 * Якоря блоков главной — дубль сайдбара для перелинковки внизу страницы (SEO).
 */
export function FooterCalcLinks() {
  const { base, idle } = footerNavLinkClass;

  return (
    <nav aria-label="Калькуляторы на главной">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
        Калькуляторы
      </p>
      <ul className="flex flex-wrap gap-x-1 gap-y-1">
        {siteContent.calcQuickLinks.map((item) => (
          <li key={item.anchorId}>
            <Link href={`/#${item.anchorId}`} className={`${base} ${idle}`}>
              {item.label}
            </Link>
          </li>
        ))}
        {siteContent.calcPageLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`${base} ${idle}`}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
