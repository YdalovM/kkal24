"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";
import { calculatorUx } from "@/content/calculator-ux";

type CalorieMobileTdeeBarProps = {
  tdee: number;
  scrollTargetId: string;
  sentinelRef: RefObject<HTMLElement | null>;
};

/**
 * Нижняя плашка TDEE только на узком экране (`md:hidden`).
 * Отступы в `style` — `safe-area-inset-*` под вырез и индикатор «домой».
 */
export function CalorieMobileTdeeBar({
  tdee,
  scrollTargetId,
  sentinelRef,
}: CalorieMobileTdeeBarProps) {
  const r = calculatorUx.results;
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    /* rootMargin сверху: без sticky-шапки; см. --app-scroll-anchor-offset в globals.css */
    const obs = new IntersectionObserver(
      ([e]) => {
        /* Откладываем setState на кадр после отчёта IO — меньше принудительных компоновок на мобильных. */
        requestAnimationFrame(() => {
          setShowBar(!e?.isIntersecting);
        });
      },
      { rootMargin: "-12px 0px 0px 0px", threshold: 0 },
    );

    obs.observe(el);
    return () => obs.disconnect();
    /* tdee не в deps: переподключение observer при каждом пересчёте лишнее и даёт лишние layout/read. */
  }, [sentinelRef]);

  const scrollToResult = useCallback(() => {
    requestAnimationFrame(() => {
      document
        .getElementById(scrollTargetId)
        ?.scrollIntoView({ block: "start", inline: "nearest" });
    });
  }, [scrollTargetId]);

  if (!showBar) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/90 bg-surface/95 pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md motion-reduce:backdrop-blur-none md:hidden"
      style={{
        paddingBottom: "max(0.65rem, env(safe-area-inset-bottom, 0px))",
        paddingLeft: "max(0.75rem, env(safe-area-inset-left, 0px))",
        paddingRight: "max(0.75rem, env(safe-area-inset-right, 0px))",
      }}
      role="region"
      aria-label={r.stickyBarRegion}
    >
      <button
        type="button"
        onClick={scrollToResult}
        className="touch-manipulation flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border border-accent/35 bg-accent/[0.1] px-4 py-3 text-left transition-colors active:bg-accent/[0.16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`${r.stickyBarLabel}: ${tdee} ккал. ${r.stickyBarAction}`}
      >
        <span className="text-xs font-medium text-fg-muted">
          {r.stickyBarLabel}
        </span>
        <span className="shrink-0 text-xl font-bold tabular-nums tracking-tight text-accent">
          {tdee}
          <span className="ml-1 text-sm font-semibold text-fg-muted">ккал</span>
        </span>
      </button>
    </div>
  );
}
