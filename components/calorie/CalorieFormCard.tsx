"use client";

/**
 * Поля ввода основного калорийного виджета. Стили — `calorie-field-classes.ts`;
 * строки UI — `calculatorUx.form`. Логику не добавлять — только `useCalorieCalculator`.
 */
import type { ActivityIndex } from "@/constants/pal";
import { CALCULATOR_FORM_LIMITS } from "@/constants/calculator";
import type { Sex } from "@/lib/calories";
import type { CalorieFieldErrors } from "@/lib/calorie-form-validation";
import {
  CALORIE_FORM_PANEL,
  CALORIE_FORM_SEX_OPTION,
  CALORIE_FORM_SEX_TRACK,
  CALORIE_FORM_LEGEND_MUTED,
  CALORIE_TOOL_INPUT,
  CALORIE_TOOL_LABEL,
  CALORIE_TOOL_SHELL,
  CALORIE_WIDGET_SHELL,
} from "@/components/calorie/calorie-field-classes";
import { ActivityLevelSelect } from "@/components/calorie/ActivityLevelSelect";
import { calculatorUx } from "@/content/calculator-ux";

const { age: ageL } = CALCULATOR_FORM_LIMITS;

const SECONDARY_BTN =
  "touch-manipulation min-h-[44px] rounded-lg px-4 py-2.5 text-center text-sm font-medium text-fg-muted transition-[color,background-color] hover:bg-page/35 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/40";

export type CalorieFormCardProps = {
  sex: Sex;
  setSex: (s: Sex) => void;
  age: string;
  setAge: (v: string) => void;
  height: string;
  setHeight: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  activity: ActivityIndex;
  onActivityChange: (i: ActivityIndex) => void;
  palOverride: number | null;
  errors: CalorieFieldErrors;
  shareHint: string | null;
  onCalculate: () => void;
  onShare: () => void;
  onSaveLocal: () => void;
};

export function CalorieFormCard(props: CalorieFormCardProps) {
  const {
    sex,
    setSex,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    activity,
    onActivityChange,
    palOverride,
    errors,
    shareHint,
    onCalculate,
    onShare,
    onSaveLocal,
  } = props;

  const ux = calculatorUx.form;

  return (
    <div
      role="region"
      className={CALORIE_TOOL_SHELL}
      aria-label={ux.regionAriaLabel}
      aria-describedby="cal-widget-sr-hint"
    >
      <div className={CALORIE_WIDGET_SHELL}>
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-accent/[0.06] blur-3xl motion-reduce:opacity-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(95,184,173,0.14),transparent_55%)] motion-reduce:hidden"
          aria-hidden
        />

        <div className="relative flex min-w-0 flex-col">
          <header className="border-b border-white/[0.08] bg-page/[0.12] px-5 py-4 sm:px-7 sm:py-5">
            <span id="cal-widget-sr-hint" className="sr-only">
              {ux.widgetSrHint}
            </span>
            <h3 className="text-balance text-[1.2rem] font-bold leading-snug tracking-tight text-fg sm:text-[1.4rem]">
              {ux.widgetHeadlineStem}{" "}
              <span className="text-accent">{ux.widgetHeadlineFormula}</span>
            </h3>
            <details className="group mt-2.5">
              <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center text-xs text-fg-subtle underline decoration-border/70 decoration-dotted underline-offset-2 hover:text-fg-muted focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface [&::-webkit-details-marker]:hidden">
                {ux.widgetMoreSummary}
              </summary>
              <div className="mt-2 max-w-prose space-y-2 border-l border-border/50 pl-3 text-xs leading-relaxed text-fg-muted sm:text-sm">
                <p className="text-pretty">{ux.widgetSubhead}</p>
                <ul className="list-disc space-y-1 pl-4 marker:text-accent/70">
                  {ux.sellingPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </details>
          </header>

          <div className="flex min-w-0 flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-7 sm:py-6">
            {palOverride != null ? (
              <p
                className="rounded-lg border border-warn/45 bg-warn/[0.1] px-3 py-2.5 text-xs font-medium leading-snug text-fg"
                role="status"
              >
                {ux.urlDataBadge}
              </p>
            ) : null}

            <div className={CALORIE_FORM_PANEL}>
              <fieldset className="min-w-0 space-y-2">
                <legend className={CALORIE_FORM_LEGEND_MUTED}>{ux.sexLegend}</legend>
                <div className={CALORIE_FORM_SEX_TRACK} role="presentation">
                  <label className="min-w-0 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      checked={sex === "m"}
                      onChange={() => setSex("m")}
                      className="peer sr-only"
                    />
                    <span className={CALORIE_FORM_SEX_OPTION}>Мужчина</span>
                  </label>
                  <label className="min-w-0 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      checked={sex === "f"}
                      onChange={() => setSex("f")}
                      className="peer sr-only"
                    />
                    <span className={CALORIE_FORM_SEX_OPTION}>Женщина</span>
                  </label>
                </div>
              </fieldset>

              <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
                <label className="min-w-0">
                  <span className={CALORIE_TOOL_LABEL}>Вес · кг</span>
                  <input
                    id="cal-field-weight"
                    className={CALORIE_TOOL_INPUT}
                    type="number"
                    min={CALCULATOR_FORM_LIMITS.weightKg.min}
                    max={CALCULATOR_FORM_LIMITS.weightKg.max}
                    step={0.1}
                    inputMode="decimal"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="72"
                    aria-invalid={errors.weight ? true : undefined}
                    aria-describedby={errors.weight ? "cal-err-weight" : undefined}
                  />
                  {errors.weight ? (
                    <span id="cal-err-weight" className="mt-1 block text-xs text-danger">
                      {errors.weight}
                    </span>
                  ) : null}
                </label>

                <label className="min-w-0">
                  <span className={CALORIE_TOOL_LABEL}>Рост · см</span>
                  <input
                    id="cal-field-height"
                    className={CALORIE_TOOL_INPUT}
                    type="number"
                    min={CALCULATOR_FORM_LIMITS.heightCm.min}
                    max={CALCULATOR_FORM_LIMITS.heightCm.max}
                    inputMode="numeric"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    aria-invalid={errors.height ? true : undefined}
                    aria-describedby={errors.height ? "cal-err-height" : undefined}
                  />
                  {errors.height ? (
                    <span id="cal-err-height" className="mt-1 block text-xs text-danger">
                      {errors.height}
                    </span>
                  ) : null}
                </label>

                <label className="min-w-0">
                  <span className={CALORIE_TOOL_LABEL}>Возраст · лет</span>
                  <input
                    id="cal-field-age"
                    className={CALORIE_TOOL_INPUT}
                    type="number"
                    min={ageL.min}
                    max={ageL.max}
                    inputMode="numeric"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder={`${ageL.min}–${ageL.max}`}
                    aria-invalid={errors.age ? true : undefined}
                    aria-describedby={errors.age ? "cal-err-age" : undefined}
                  />
                  {errors.age ? (
                    <span id="cal-err-age" className="mt-1 block text-xs text-danger">
                      {errors.age}
                    </span>
                  ) : null}
                </label>
              </div>

              <label className="mt-5 block min-w-0">
                <span className={CALORIE_TOOL_LABEL}>{ux.activityLabel}</span>
                <ActivityLevelSelect
                  id="cal-field-activity"
                  value={activity}
                  onChange={onActivityChange}
                  aria-describedby={
                    palOverride != null ? "cal-hint-pal" : undefined
                  }
                />
                {palOverride != null ? (
                  <span id="cal-hint-pal" className="mt-1 block text-xs text-warn">
                    {ux.hintFromUrl}
                  </span>
                ) : null}
              </label>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <button
                type="button"
                className="touch-manipulation min-h-[54px] w-full rounded-xl bg-accent px-6 py-4 text-base font-semibold text-on-accent shadow-lg shadow-black/25 transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/20 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:active:scale-100 sm:min-h-[52px] sm:text-[1.02rem]"
                onClick={onCalculate}
              >
                {ux.primaryCta}
              </button>
              <div className="flex flex-col gap-1 pt-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2">
                <button
                  type="button"
                  className={SECONDARY_BTN}
                  onClick={onSaveLocal}
                >
                  {ux.save}
                </button>
                <span
                  className="hidden h-6 self-center border-l border-border/80 sm:block"
                  aria-hidden
                />
                <button type="button" className={SECONDARY_BTN} onClick={onShare}>
                  {ux.share}
                </button>
              </div>
            </div>

            {shareHint ? (
              <p className="text-center text-xs text-fg-subtle">{shareHint}</p>
            ) : null}

            <div className="rounded-xl border border-border/60 bg-page/[0.14] px-4 py-3.5 sm:px-5">
              <p className="text-pretty text-[11px] leading-snug text-fg-subtle sm:text-xs">
                {ux.intro}
              </p>
              <details className="mt-2 text-[11px] sm:text-xs">
                <summary className="inline-flex min-h-[40px] cursor-pointer list-none items-center text-fg-muted underline decoration-border/80 decoration-dotted underline-offset-2 hover:text-accent hover:decoration-accent/50 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-elevated [&::-webkit-details-marker]:hidden">
                  {ux.trustSummary}
                </summary>
                <p className="mt-2 max-w-prose border-l border-border/70 pl-3 leading-relaxed text-fg-muted">
                  {ux.trustBody}
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
