"use client";

import type { ReactNode } from "react";

type SmoothHashLinkProps = {
  href: `#${string}`;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  /** После прокрутки к якорю (опциональный колбэк родителя). */
  onNavigate?: () => void;
};

/**
 * Внутренние ссылки-якоря с плавной прокруткой (`scrollIntoView`), плюс `replaceState` для URL.
 * Нужен client boundary: обычный `<a href="#...">` в части окружений скроллит без smooth.
 */
export function SmoothHashLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
  onNavigate,
}: SmoothHashLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const raw = href.slice(1);
    if (!raw) return;
    e.preventDefault();
    const el = document.getElementById(raw);
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    const url = `${window.location.pathname}${window.location.search}${href}`;
    window.history.replaceState(null, "", url);
    onNavigate?.();
  };

  return (
    <a href={href} className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
