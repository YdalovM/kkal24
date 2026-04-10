"use client";

/**
 * Составная секция мини-инструментов на главной.
 *
 * ИИ: `id` на обёртках (`mini-bmi`, …) должны совпадать с `siteContent.calcQuickLinks`
 * в `content/site.ts`. Новый мини: математика в `lib/mini-calculations.ts`, компонент здесь,
 * строка в этом файле + запись в `site.ts` + при необходимости контекст `main-form-to-mini-sync`.
 */
import { BmiMini } from "@/components/mini/BmiMini";
import { WeeklyDeficitMini } from "@/components/mini/WeeklyDeficitMini";
import { WaterMini } from "@/components/mini/WaterMini";

export function MiniCalculators() {
  return (
    <div className="grid min-w-0 w-full max-w-4xl grid-cols-1 gap-6 sm:gap-8">
      <div
        id="mini-bmi"
        className="min-w-0 scroll-mt-[var(--app-scroll-anchor-offset)]"
      >
        <BmiMini />
      </div>
      <div
        id="mini-deficit"
        className="min-w-0 scroll-mt-[var(--app-scroll-anchor-offset)]"
      >
        <WeeklyDeficitMini />
      </div>
      <div
        id="mini-water"
        className="min-w-0 scroll-mt-[var(--app-scroll-anchor-offset)]"
      >
        <WaterMini />
      </div>
    </div>
  );
}
