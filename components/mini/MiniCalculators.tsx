"use client";

/**
 * Составная секция мини-инструментов на главной.
 *
 * ИИ: `id` на обёртках (`mini-bmi`, `mini-balance`, `mini-water`) = `siteContent.calcQuickLinks`.
 * `mini-balance` — один якорь на два мини (дефицит + профицит); в меню не плодить отдельные URL.
 * Новый мини: `lib/mini-calculations.ts` → компонент → обёртка с `id` → `site.ts` → при нужде контекст.
 */
import { BmiMini } from "@/components/mini/BmiMini";
import { WeeklyDeficitMini } from "@/components/mini/WeeklyDeficitMini";
import { WeeklySurplusMini } from "@/components/mini/WeeklySurplusMini";
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
        id="mini-balance"
        className="min-w-0 scroll-mt-[var(--app-scroll-anchor-offset)] space-y-6 sm:space-y-8"
      >
        <WeeklyDeficitMini />
        <WeeklySurplusMini />
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
