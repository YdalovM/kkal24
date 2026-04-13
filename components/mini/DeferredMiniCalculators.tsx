"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const MiniCalculatorsLazy = dynamic(
  () => import("@/components/mini/MiniCalculators").then((m) => m.MiniCalculators),
  { ssr: false },
);

/**
 * Отложенная загрузка мини-калькуляторов: не тянем тяжёлый клиентский код,
 * пока пользователь не приблизился к секции дополнительных расчётов.
 */
export function DeferredMiniCalculators() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldLoad) return;
    const node = triggerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          requestAnimationFrame(() => {
            setShouldLoad(true);
          });
        }
      },
      { rootMargin: "420px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={triggerRef} className="min-w-0">
      {shouldLoad ? (
        <MiniCalculatorsLazy />
      ) : (
        <div className="rounded-xl border border-border bg-elevated/40 p-4 text-sm text-fg-muted">
          Загрузка дополнительных калькуляторов…
        </div>
      )}
    </div>
  );
}
