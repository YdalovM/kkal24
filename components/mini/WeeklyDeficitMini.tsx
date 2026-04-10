"use client";

import { useMemo, useState } from "react";
import { useMainFormToMiniSync } from "@/contexts/main-form-to-mini-sync";
import {
  KCAL_PER_KG_FAT_APPROX,
  dailyKcalDeficitForWeeklyKgLoss,
  deficitRelativeToMaintenance,
  weeklyLossRangeKcalPerDay,
} from "@/lib/mini-calculations";
import {
  MINI_HEADING_MARK,
  MINI_HEADING_ROW,
  MINI_INPUT_CLASS,
  MINI_SECTION_CLASS,
} from "@/components/mini/mini-field-classes";
import { calculatorUx } from "@/content/calculator-ux";

export function WeeklyDeficitMini() {
  const { miniWeekly: ux } = calculatorUx;
  const { lastTdee } = useMainFormToMiniSync();
  const [kg, setKg] = useState("0.7");

  const range = useMemo(() => {
    const k = Number.parseFloat(kg);
    const pick = dailyKcalDeficitForWeeklyKgLoss(k);
    if (pick == null) return null;
    const { low, high } = weeklyLossRangeKcalPerDay();
    return { low, high, pick };
  }, [kg]);

  const relativeLevel = useMemo(() => {
    if (range == null) return null;
    return deficitRelativeToMaintenance(range.pick, lastTdee);
  }, [range, lastTdee]);

  const pctOfNorm =
    range != null &&
    lastTdee != null &&
    lastTdee > 0 &&
    Number.isFinite(range.pick)
      ? Math.round((range.pick / lastTdee) * 100)
      : null;

  return (
    <section className={MINI_SECTION_CLASS}>
      <h2 className={MINI_HEADING_ROW}>
        <span className={MINI_HEADING_MARK} aria-hidden />
        {ux.title}
      </h2>
      <p className="mb-3 text-sm text-fg-muted">{ux.lead}</p>
      <label className="flex max-w-xs flex-col gap-1 text-sm">
        {ux.fieldLabel}
        <input
          className={MINI_INPUT_CLASS}
          type="number"
          min={0.1}
          step={0.1}
          value={kg}
          onChange={(e) => setKg(e.target.value)}
          placeholder={ux.fieldHint}
        />
      </label>
      {range && (
        <div className="mt-3 space-y-3 text-sm text-fg-muted">
          <p>
            При ~{kg} кг в неделю по этому приближению выходит порядка{" "}
            <strong className="font-semibold text-accent">
              ~{Math.round(range.pick)}
            </strong>{" "}
            ккал в сутки ниже поддержания. Для схемы «~0,5–1 кг в неделю»
            обычно упоминают диапазон порядка{" "}
            <strong className="font-semibold text-accent">
              {Math.round(range.low)}–{Math.round(range.high)}
            </strong>{" "}
            ккал в сутки — снова как ориентир, а не назначение.
          </p>
          {lastTdee == null ? (
            <p className="rounded-lg border border-border bg-elevated/80 px-3 py-2 text-fg">
              {ux.hintNeedMainCalc}
            </p>
          ) : pctOfNorm != null ? (
            <>
              <p>
                {ux.hintCompareFraction.replace("{pct}", String(pctOfNorm))}
              </p>
              {relativeLevel === "aggressive" ? (
                <p className="rounded-lg border border-warn/40 bg-warn/[0.12] px-3 py-2 text-fg">
                  {ux.warnAggressive}
                </p>
              ) : null}
              {relativeLevel === "very_high" ? (
                <p className="rounded-lg border border-danger/35 bg-danger/[0.1] px-3 py-2 text-fg">
                  {ux.warnVeryHigh}
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      )}
      <details className="mt-3 text-sm text-fg-subtle">
        <summary className="cursor-pointer font-medium text-fg">
          Почему это приближение
        </summary>
        <p className="mt-2">
          Реальный расход и состав потерь веса индивидуальны; число{" "}
          {KCAL_PER_KG_FAT_APPROX} удобно для порядка величины, не для точного
          плана без мониторинга и врача / диетолога.
        </p>
      </details>
    </section>
  );
}
