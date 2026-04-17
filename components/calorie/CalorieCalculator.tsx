"use client";

/**
 * Сборка виджета: форма → (после расчёта) тост, панель результата, мобильная TDEE-плашка.
 *
 * ИИ: логику не добавлять — только провода. Статус пересчёта — `RecalcToast` (fixed, без layout shift);
 * длительность через `RECALC_SUCCESS_TOAST_MS` в `constants/ui-behavior.ts`.
 * Нижний padding при `result`: запас под `CalorieMobileTdeeBar` + `safe-area-inset-bottom` (iPhone).
 */
import dynamic from "next/dynamic";
import { useRef } from "react";
import { CalorieFormCard } from "@/components/calorie/CalorieFormCard";
import { RecalcToast } from "@/components/calorie/RecalcToast";
import {
  CALORIE_RESULT_ANCHOR_ID,
  CALORIE_RESULT_HEADING_ANCHOR_ID,
} from "@/constants/calculator";
import { useCalorieCalculator } from "@/hooks/useCalorieCalculator";

const CalorieResultPanel = dynamic(
  () =>
    import("@/components/calorie/CalorieResultPanel").then(
      (m) => m.CalorieResultPanel,
    ),
);

const CalorieMobileTdeeBar = dynamic(
  () =>
    import("@/components/calorie/CalorieMobileTdeeBar").then(
      (m) => m.CalorieMobileTdeeBar,
    ),
);

export function CalorieCalculator() {
  const { form, result, recalcMessage } = useCalorieCalculator();
  const sentinelRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`mx-auto flex min-w-0 w-full max-w-lg flex-col gap-6 ${result ? "pb-[max(7.5rem,calc(4.25rem+env(safe-area-inset-bottom,0px)))] md:pb-0" : ""}`}
    >
      <RecalcToast message={recalcMessage} />
      <CalorieFormCard {...form} />
      {result != null && (
        <>
          <div
            ref={sentinelRef}
            className="pointer-events-none h-px w-full shrink-0"
            aria-hidden
          />
          <CalorieResultPanel
            key={`${result.tdee}-${result.bmrRounded}`}
            id={CALORIE_RESULT_ANCHOR_ID}
            result={result}
          />
          <CalorieMobileTdeeBar
            tdee={result.tdee}
            scrollTargetId={CALORIE_RESULT_HEADING_ANCHOR_ID}
            sentinelRef={sentinelRef}
          />
        </>
      )}
    </div>
  );
}
