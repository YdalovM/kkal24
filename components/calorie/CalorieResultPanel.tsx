"use client";

/**
 * Вывод результата расчёта + переключатель базы (TDEE vs BMR) для КБЖУ и таблицы дефицита.
 *
 * Дефицит по строкам считается здесь же, а не в хуке — база выбора локальна для этой панели.
 * ИИ: при смене `DEFICIT_ROWS` обновите подписи в `content/calculator-ux.ts` (`deficitLabels*`).
 */

import { useEffect, useMemo, useState } from "react";
import { CALORIE_CARD_CLASS } from "@/components/calorie/calorie-field-classes";
import { calculatorUx } from "@/content/calculator-ux";
import type { CalorieCalculationResult } from "@/lib/calorie-result";
import {
  DEFICIT_ROWS,
  macrosFromKcal,
  targetKcalForDeficitRow,
} from "@/lib/calories";

const RESULT_CARD_SHELL = `${CALORIE_CARD_CLASS} border-border shadow-[0_6px_28px_rgba(0,0,0,0.28)]`;

type EnergyBasis = "tdee" | "bmr";

type CalorieResultPanelProps = {
  result: CalorieCalculationResult;
  id?: string;
};

export function CalorieResultPanel({
  result,
  id = "calorie-result",
}: CalorieResultPanelProps) {
  const r = calculatorUx.results;
  const [energyBasis, setEnergyBasis] = useState<EnergyBasis>("tdee");

  useEffect(() => {
    setEnergyBasis("tdee");
  }, [result.tdee, result.bmrRounded]);

  const basisKcal = energyBasis === "tdee" ? result.tdee : result.bmrRounded;

  const macros = useMemo(
    () =>
      energyBasis === "tdee"
        ? result.macros
        : macrosFromKcal(result.bmrRounded),
    [energyBasis, result.bmrRounded, result.macros],
  );

  const deficitTable = useMemo(() => {
    const labels =
      energyBasis === "tdee" ? r.deficitLabelsTdee : r.deficitLabelsBmr;
    return DEFICIT_ROWS.map((row, i) => ({
      key: `${energyBasis}-${i}-${row.kind === "pct" ? row.pct : row.delta}`,
      label: labels[i] ?? `—`,
      kcal: targetKcalForDeficitRow(basisKcal, row),
    }));
  }, [energyBasis, basisKcal, r.deficitLabelsTdee, r.deficitLabelsBmr]);

  const cardBase =
    "touch-manipulation min-h-[52px] rounded-lg border px-3 py-3 text-left text-sm transition-[border-color,box-shadow,background-color] outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:min-h-0";

  const cardTdeeActive =
    energyBasis === "tdee"
      ? "border-accent/40 bg-accent/[0.06]"
      : "border-border bg-page/20 hover:border-accent/25";

  const cardBmrActive =
    energyBasis === "bmr"
      ? "border-accent/40 bg-accent/[0.06]"
      : "border-border bg-page/20 hover:border-accent/25";

  const headingAnchorId = `${id}-title`;

  return (
    <div
      id={id}
      className={`${RESULT_CARD_SHELL} flex min-w-0 w-full flex-col gap-5`}
    >
      <div
        id={headingAnchorId}
        className="scroll-mt-[var(--app-scroll-anchor-offset)]"
      >
        <h2 className="text-lg font-semibold tracking-tight text-fg">{r.title}</h2>
        <p className="mt-1 text-sm text-fg-muted">{result.palLabel}</p>
      </div>

      <div>
        <p id="cal-result-energy-label" className="mb-2 text-xs text-fg-subtle">
          {r.energyBasisLegend}
        </p>
        <div
          role="radiogroup"
          aria-labelledby="cal-result-energy-label"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <button
            type="button"
            role="radio"
            aria-checked={energyBasis === "tdee"}
            aria-label={r.energyBasisPickTdee}
            onClick={() => setEnergyBasis("tdee")}
            className={`${cardBase} ${cardTdeeActive}`}
          >
            <span className="block font-medium text-accent">{r.dailyNormTitle}</span>
            <span className="mt-0.5 block text-xs text-fg-muted">{r.dailyNormHint}</span>
            <span className="mt-2 block text-3xl font-bold tabular-nums leading-none tracking-tight text-accent sm:text-2xl">
              {result.tdee}
              <span className="mt-1 block text-sm font-normal text-fg-muted sm:mt-0 sm:inline sm:font-semibold">
                {" "}
                ккал в сутки
              </span>
            </span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={energyBasis === "bmr"}
            aria-label={r.energyBasisPickBmr}
            onClick={() => setEnergyBasis("bmr")}
            className={`${cardBase} ${cardBmrActive}`}
          >
            <span className="block font-medium text-fg">{r.atRestTitle}</span>
            <span className="mt-0.5 block text-xs text-fg-subtle">{r.atRestHint}</span>
            <span className="mt-2 block text-2xl font-semibold tabular-nums text-fg sm:text-xl">
              {result.bmrRounded}{" "}
              <span className="text-sm font-normal text-fg-muted">ккал</span>
            </span>
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-accent/15 bg-elevated/40 px-3 py-3">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <h3 className="font-medium text-fg">{r.macrosTitle}</h3>
          <span className="rounded-md border border-accent/25 bg-accent/[0.07] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-accent">
            {energyBasis === "tdee" ? r.macrosBadgeTdee : r.macrosBadgeBmr}
          </span>
        </div>
        <p className="mb-2 text-xs text-fg-subtle">{r.macrosNote}</p>
        <p className="mb-3 text-xs text-fg-muted">
          {energyBasis === "tdee" ? r.macrosNoteTdeeFoot : r.macrosNoteBmrFoot}
        </p>
        <ul className="space-y-1.5 text-sm text-fg-muted">
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>
              Белки ≈{" "}
              <strong className="font-semibold tabular-nums text-fg">
                {macros.proteinG} г
              </strong>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>
              Жиры ≈{" "}
              <strong className="font-semibold tabular-nums text-fg">
                {macros.fatG} г
              </strong>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>
              Углеводы ≈{" "}
              <strong className="font-semibold tabular-nums text-fg">
                {macros.carbsG} г
              </strong>
            </span>
          </li>
        </ul>
      </div>

      <details className="rounded-lg border border-accent/20 bg-elevated/30 text-sm">
        <summary className="flex min-h-[44px] cursor-pointer items-center px-3 py-2 font-medium text-fg-muted hover:text-accent">
          {r.howTitle}
        </summary>
        <div className="border-t border-border px-3 py-3">
          <p className="text-fg-muted">{r.howSummary}</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-fg-muted marker:text-accent/80">
            {result.steps.map((s) => (
              <li key={s.title}>
                <span className="font-medium text-fg">{s.title}.</span>{" "}
                {s.detail}
              </li>
            ))}
          </ol>
        </div>
      </details>

      <div>
        <h3 className="mb-1.5 font-medium text-fg">{r.deficitTitle}</h3>
        <p className="mb-3 text-xs text-fg-subtle">
          {energyBasis === "tdee" ? r.deficitNoteTdee : r.deficitNoteBmr}
        </p>
        <div className="min-w-0 overflow-x-auto overscroll-x-contain rounded-lg border border-border [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-[min(100%,18rem)] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/10">
                <th className="py-2.5 pl-3 pr-2 font-medium text-accent">
                  {r.deficitColScenario}
                </th>
                <th className="py-2.5 pr-3 font-medium text-accent">
                  {r.deficitColKcal}
                </th>
              </tr>
            </thead>
            <tbody>
              {deficitTable.map(({ key, label, kcal }) => (
                <tr key={key} className="border-b border-border/80 last:border-0">
                  <td className="min-w-0 max-w-[14rem] py-2.5 pl-3 pr-2 align-top text-fg-muted hyphens-auto [overflow-wrap:anywhere] sm:max-w-none">
                    {label}
                  </td>
                  <td className="whitespace-nowrap py-2.5 pr-3 align-top font-medium tabular-nums text-accent">
                    {kcal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
