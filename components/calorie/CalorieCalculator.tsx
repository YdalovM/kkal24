"use client";

/**
 * Сборка виджета: форма → (после расчёта) тост, панель результата, мобильная TDEE-плашка.
 *
 * ИИ: логику не добавлять — только провода. Статус пересчёта — `RecalcToast` (fixed, без layout shift);
 * длительность через `RECALC_SUCCESS_TOAST_MS` в `constants/ui-behavior.ts`.
 */
import { useRef } from "react";
import { CalorieFormCard } from "@/components/calorie/CalorieFormCard";
import { CalorieMobileTdeeBar } from "@/components/calorie/CalorieMobileTdeeBar";
import { CalorieResultPanel } from "@/components/calorie/CalorieResultPanel";
import { RecalcToast } from "@/components/calorie/RecalcToast";
import { useCalorieCalculator } from "@/hooks/useCalorieCalculator";

const RESULT_ANCHOR_ID = "calorie-result";

export function CalorieCalculator() {
  const { form, result, recalcMessage } = useCalorieCalculator();
  const sentinelRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`mx-auto flex min-w-0 w-full max-w-lg flex-col gap-6 ${result ? "pb-[max(5.5rem,env(safe-area-inset-bottom,0px))] md:pb-0" : ""}`}
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
          <CalorieResultPanel id={RESULT_ANCHOR_ID} result={result} />
          <CalorieMobileTdeeBar
            tdee={result.tdee}
            scrollTargetId={RESULT_ANCHOR_ID}
            sentinelRef={sentinelRef}
          />
        </>
      )}
    </div>
  );
}
