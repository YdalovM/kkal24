"use client";

import { ACTIVITY_LEVELS } from "@/constants/pal";
import type { ActivityIndex } from "@/constants/pal";
import { CALCULATOR_FORM_LIMITS } from "@/constants/calculator";
import type { Sex } from "@/lib/calories";
import type { CalorieFieldErrors } from "@/lib/calorie-form-validation";
import {
  CALORIE_CARD_CLASS,
  CALORIE_INPUT_CLASS,
  CALORIE_SELECT_CLASS,
  SEX_SEGMENT_CLASS,
} from "@/components/calorie/calorie-field-classes";
import { calculatorUx } from "@/content/calculator-ux";

const { age: ageL } = CALCULATOR_FORM_LIMITS;

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
    <div className={`${CALORIE_CARD_CLASS} flex min-w-0 w-full flex-col gap-3`}>
      <p className="text-sm leading-relaxed text-fg-muted">{ux.intro}</p>

      {palOverride != null ? (
        <p
          className="rounded-lg border border-warn/40 bg-warn/[0.1] px-3 py-2 text-xs font-medium leading-snug text-fg"
          role="status"
        >
          {ux.urlDataBadge}
        </p>
      ) : null}

      <details className="rounded-lg border border-border bg-elevated/40 text-sm">
        <summary className="min-h-[44px] cursor-pointer list-none px-3 py-2.5 font-medium text-fg outline-none after:ml-1 after:text-fg-subtle after:content-['▾'] hover:text-accent [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
          {ux.trustSummary}
        </summary>
        <div className="border-t border-border px-3 py-3">
          <p className="leading-relaxed text-fg-muted">{ux.trustBody}</p>
        </div>
      </details>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-fg">{ux.sexLegend}</legend>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="sex"
              checked={sex === "m"}
              onChange={() => setSex("m")}
              className="peer sr-only"
            />
            <span className={SEX_SEGMENT_CLASS}>Мужчина</span>
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="sex"
              checked={sex === "f"}
              onChange={() => setSex("f")}
              className="peer sr-only"
            />
            <span className={SEX_SEGMENT_CLASS}>Женщина</span>
          </label>
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-fg">Вес, кг</span>
        <input
          id="cal-field-weight"
          className={CALORIE_INPUT_CLASS}
          type="number"
          min={CALCULATOR_FORM_LIMITS.weightKg.min}
          max={CALCULATOR_FORM_LIMITS.weightKg.max}
          step={0.1}
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="например 72"
          aria-invalid={errors.weight ? true : undefined}
          aria-describedby={errors.weight ? "cal-err-weight" : undefined}
        />
        {errors.weight ? (
          <span id="cal-err-weight" className="text-sm text-danger">
            {errors.weight}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-fg">Рост, см</span>
        <input
          id="cal-field-height"
          className={CALORIE_INPUT_CLASS}
          type="number"
          min={CALCULATOR_FORM_LIMITS.heightCm.min}
          max={CALCULATOR_FORM_LIMITS.heightCm.max}
          inputMode="numeric"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="например 175"
          aria-invalid={errors.height ? true : undefined}
          aria-describedby={errors.height ? "cal-err-height" : undefined}
        />
        {errors.height ? (
          <span id="cal-err-height" className="text-sm text-danger">
            {errors.height}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-fg">Возраст, полных лет</span>
        <input
          id="cal-field-age"
          className={CALORIE_INPUT_CLASS}
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
          <span id="cal-err-age" className="text-sm text-danger">
            {errors.age}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-fg">{ux.activityLabel}</span>
        <select
          id="cal-field-activity"
          className={CALORIE_SELECT_CLASS}
          value={activity}
          onChange={(e) =>
            onActivityChange(Number(e.target.value) as ActivityIndex)
          }
          aria-describedby={palOverride != null ? "cal-hint-pal" : undefined}
        >
          {ACTIVITY_LEVELS.map((lvl) => (
            <option
              key={lvl.id}
              value={lvl.id}
              className="bg-elevated text-fg"
            >
              {lvl.label}
            </option>
          ))}
        </select>
        {palOverride != null ? (
          <span id="cal-hint-pal" className="text-xs text-warn">
            {ux.hintFromUrl}
          </span>
        ) : null}
      </label>

      <button
        type="button"
        className="calorie-primary-glow touch-manipulation min-h-[48px] rounded-full bg-accent px-6 py-3 text-base font-semibold text-on-accent transition-[transform,background-color,filter] duration-150 ease-out hover:bg-accent-hover hover:brightness-[1.03] active:scale-[0.98] active:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:active:scale-100 sm:min-h-0 sm:text-sm"
        onClick={onCalculate}
      >
        {ux.primaryCta}
      </button>

      <div className="flex w-full gap-3">
        <button
          type="button"
          className="touch-manipulation min-h-[48px] min-w-0 flex-1 rounded-lg border border-border bg-elevated px-2 py-2.5 text-center text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg sm:min-h-[44px]"
          onClick={onSaveLocal}
        >
          {ux.save}
        </button>
        <button
          type="button"
          className="touch-manipulation min-h-[48px] min-w-0 flex-1 rounded-lg border border-border bg-elevated px-2 py-2.5 text-center text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg sm:min-h-[44px]"
          onClick={onShare}
        >
          {ux.share}
        </button>
      </div>
      {shareHint && (
        <p className="text-sm text-fg-muted">{shareHint}</p>
      )}
    </div>
  );
}
