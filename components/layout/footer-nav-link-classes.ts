/**
 * Стили ссылок в футере (компактные чипы, фокус-кольцо).
 * ИИ: те же классы использует `FooterCalcLinks` (якоря главной); не путать с крупными
 * строками сайдбара (`SiteSidebar`).
 */
export const footerNavLinkClass = {
  base:
    "touch-manipulation inline-flex min-h-10 max-w-full items-center justify-center rounded-lg px-2.5 py-2 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus sm:whitespace-nowrap",
  idle: "text-fg-subtle hover:text-fg",
  active: "bg-elevated text-fg ring-1 ring-border",
} as const;
