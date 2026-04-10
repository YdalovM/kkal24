"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SmoothHashLink } from "@/components/home/SmoothHashLink";
import { isHomeAppPath } from "@/lib/nav-path";

type CalcAnchorLinkProps = {
  /** id элемента на главной без `#` — должен совпадать с `calcQuickLinks[].anchorId` в `content/site.ts`. */
  anchorId: string;
  className?: string;
  children: ReactNode;
  /** Опционально после перехода (например сброс локального UI). */
  onNavigate?: () => void;
};

/**
 * Ссылка на блок калькулятора на главной: с других страниц — `<Link href="/#id">`,
 * уже на главной — плавный скролл через `SmoothHashLink`.
 */
export function CalcAnchorLink({
  anchorId,
  className,
  children,
  onNavigate,
}: CalcAnchorLinkProps) {
  const pathname = usePathname();
  if (isHomeAppPath(pathname)) {
    return (
      <SmoothHashLink
        href={`#${anchorId}`}
        className={className}
        onNavigate={onNavigate}
      >
        {children}
      </SmoothHashLink>
    );
  }
  return (
    <Link
      href={`/#${anchorId}`}
      className={className}
      onClick={() => onNavigate?.()}
    >
      {children}
    </Link>
  );
}
