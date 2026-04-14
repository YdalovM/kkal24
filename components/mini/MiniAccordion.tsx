"use client";

import type { ReactNode } from "react";

const SHELL =
  "group overflow-hidden rounded-xl border border-border bg-elevated/35 text-sm shadow-sm transition-[border-color,box-shadow] duration-200 open:border-accent/35 open:shadow-[0_0_0_1px_color-mix(in_srgb,var(--app-accent)_14%,transparent)]";

type MiniAccordionProps = {
  summary: string;
  children: ReactNode;
  /** Класс на корневом `<details>` (по умолчанию отступ сверху). */
  className?: string;
};

export function MiniAccordion({
  summary,
  children,
  className = "mt-3",
}: MiniAccordionProps) {
  return (
    <details className={`${SHELL} ${className}`}>
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center gap-3 px-3 py-2.5 outline-none hover:bg-page/15 focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface [&::-webkit-details-marker]:hidden sm:min-h-0 sm:py-3">
        <span
          className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-page/50 text-fg-dim transition-[transform,color,border-color] group-open:rotate-90 group-open:border-accent/35 group-open:text-accent motion-reduce:transition-none motion-reduce:group-open:rotate-0"
          aria-hidden
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
        <span className="min-w-0 flex-1 text-pretty font-medium leading-snug text-fg">
          {summary}
        </span>
      </summary>
      <div className="space-y-2 border-t border-border/60 px-3 pb-3 pt-2.5 text-fg-subtle">
        {children}
      </div>
    </details>
  );
}
