"use client";

/**
 * Клиентский калькулятор питания: ккал, число приёмов, пресет долей, предпочтения по продуктам, URL-синхронизация.
 *
 * ИИ: параметры `kcal`, `meals`, `preset`, `exclude`, `prefer` — единый контракт с `lib/meal-plan-prefs.ts`.
 * Тяжёлые вычисления ориентиров — в `useMemo` (`rows`); панель продуктов мемоизирована и не должна
 * ререндериться при вводе ккал (стабильный `onMealPreferenceChange` + refs).
 */

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CALORIE_FORM_LEGEND_MUTED,
  CALORIE_FORM_PANEL,
  CALORIE_TOOL_INPUT,
  CALORIE_TOOL_LABEL,
  CALORIE_TOOL_SHELL,
  CALORIE_WIDGET_HEADLINE,
  CALORIE_WIDGET_SHELL,
} from "@/components/calorie/calorie-field-classes";
import { mealPlanUx } from "@/content/meal-plan-ux";
import { MealCountSelect } from "@/components/meal-plan/MealCountSelect";
import { MealPlanProductPrefsPanel } from "@/components/meal-plan/MealPlanProductPrefs";
import {
  defaultMealPlanPrefs,
  mealPlanPrefsToQueryParts,
  parseMealPlanPrefsFromSearchParams,
  type MealPlanPreferenceLevel,
  type MealPlanPrefs,
} from "@/lib/meal-plan-prefs";
import { getMealPortionBullets } from "@/lib/meal-plan-suggestions";
import type { MealPlanProductId } from "@/lib/meal-plan-products";
import { macrosFromKcal } from "@/lib/calories";
import {
  MEAL_PLAN_KCAL_MAX,
  MEAL_PLAN_KCAL_MIN,
  findPreset,
  getPresetsForMealCount,
  mealLabelsForCount,
  parseMealPlanKcal,
  parseMealPlanMeals,
  parseMealPlanPreset,
  splitKcalByWeights,
} from "@/lib/meal-plan";
import type { MealDistributionPreset } from "@/lib/meal-plan";

const DEFAULT_KCAL = 2000;
const DEFAULT_MEALS = 3;
const DEFAULT_PRESET = "equal";

function clampKcal(n: number): number {
  return Math.min(
    MEAL_PLAN_KCAL_MAX,
    Math.max(MEAL_PLAN_KCAL_MIN, Math.round(n)),
  );
}

/**
 * Доли `weights` — колонки `grid` в `fr` + `gap`; сверху — ккал на приём (как в `splitKcalByWeights`).
 */
const PresetBar = memo(function PresetBar({
  weights,
  kcalParts,
}: {
  weights: number[];
  kcalParts: number[];
}) {
  const n = weights.length;
  const gridCols = weights.map((w) => `${w}fr`).join(" ");
  return (
    <div className="flex w-full min-w-0 flex-col gap-1 sm:min-w-[10rem] sm:flex-1">
      <div
        className="grid w-full min-w-0 gap-1 text-center"
        style={{ gridTemplateColumns: gridCols }}
      >
        {kcalParts.map((kc, idx) => (
          <span
            key={idx}
            className="min-w-0 truncate px-0.5 text-[10px] font-medium tabular-nums leading-none text-fg-muted sm:text-[11px]"
            title={`${kc} ккал`}
          >
            {kc} ккал
          </span>
        ))}
      </div>
      <div
        className="grid h-4 w-full min-w-0 gap-1 overflow-hidden rounded-full border border-border/70 bg-surface/95 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        style={{ gridTemplateColumns: gridCols }}
        aria-hidden
      >
        {weights.map((_, idx) => (
          <div
            key={idx}
            className={`min-h-[6px] min-w-0 rounded-md bg-gradient-to-b from-accent to-accent/75 shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)] ${
              idx % 2 === 1 ? "from-accent/90 to-accent/65" : ""
            } ${idx === 0 ? "rounded-l-[0.4rem]" : ""} ${
              idx === n - 1 ? "rounded-r-[0.4rem]" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
});

export function MealPlanCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const distributionGroupId = useId();
  const mealsFieldLabelId = useId();
  const mealsSelectId = useId();

  const [kcal, setKcal] = useState(DEFAULT_KCAL);
  const [meals, setMeals] = useState(DEFAULT_MEALS);
  const [presetId, setPresetId] = useState(DEFAULT_PRESET);
  const [mealPrefs, setMealPrefs] = useState<MealPlanPrefs>(() =>
    defaultMealPlanPrefs(),
  );
  /** Сдвиг выбора продуктов по кнопке «Другой вариант» для каждого приёма (индекс в списке). */
  const [mealPortionVariant, setMealPortionVariant] = useState<number[]>([]);

  const kcalRef = useRef(kcal);
  const mealsRef = useRef(meals);
  const presetIdRef = useRef(presetId);
  const mealPrefsRef = useRef(mealPrefs);

  useEffect(() => {
    kcalRef.current = kcal;
    mealsRef.current = meals;
    presetIdRef.current = presetId;
    mealPrefsRef.current = mealPrefs;
  });

  const syncFromSearchParams = useCallback(() => {
    const k = parseMealPlanKcal(searchParams.get("kcal"));
    const m = parseMealPlanMeals(searchParams.get("meals"));
    const p = parseMealPlanPreset(searchParams.get("preset"));
    if (k !== undefined) setKcal(k);
    if (m !== undefined) setMeals(m);
    if (p !== undefined) {
      const countForPreset = m ?? DEFAULT_MEALS;
      setPresetId(findPreset(countForPreset, p).id);
    }
    setMealPrefs(
      parseMealPlanPrefsFromSearchParams(
        searchParams.get("exclude"),
        searchParams.get("prefer"),
      ),
    );
  }, [searchParams]);

  useEffect(() => {
    queueMicrotask(() => {
      syncFromSearchParams();
    });
  }, [syncFromSearchParams]);

  useEffect(() => {
    queueMicrotask(() => {
      setMealPortionVariant((prev) => {
        if (prev.length === meals) return prev;
        const next = prev.slice(0, meals);
        while (next.length < meals) next.push(0);
        return next;
      });
    });
  }, [meals]);

  const bumpMealPortionVariant = useCallback((mealIdx: number) => {
    setMealPortionVariant((prev) => {
      const next = [...prev];
      while (next.length <= mealIdx) next.push(0);
      next[mealIdx] = (next[mealIdx] ?? 0) + 1;
      return next;
    });
  }, []);

  const pushFullQuery = useCallback(
    (
      nextKcal: number,
      nextMeals: number,
      nextPreset: string,
      nextPrefs: MealPlanPrefs,
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("kcal", String(nextKcal));
      params.set("meals", String(nextMeals));
      params.set("preset", nextPreset);
      const { exclude, prefer } = mealPlanPrefsToQueryParts(nextPrefs);
      if (exclude) params.set("exclude", exclude);
      else params.delete("exclude");
      if (prefer) params.set("prefer", prefer);
      else params.delete("prefer");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  /** Стабильная ссылка: панель продуктов не должна получать новый колбэк при каждом вводе ккал. */
  const onMealPreferenceChange = useCallback(
    (id: MealPlanProductId, level: MealPlanPreferenceLevel) => {
      const next = { ...mealPrefsRef.current, [id]: level };
      setMealPrefs(next);
      pushFullQuery(
        kcalRef.current,
        mealsRef.current,
        presetIdRef.current,
        next,
      );
    },
    [pushFullQuery],
  );

  const preset = useMemo(() => findPreset(meals, presetId), [meals, presetId]);

  const presetOptions = useMemo(() => getPresetsForMealCount(meals), [meals]);

  const rows = useMemo(() => {
    const parts = splitKcalByWeights(kcal, preset.weights);
    const labels = mealLabelsForCount(meals);
    return parts.map((partKcal, i) => ({
      label: labels[i] ?? `Приём ${i + 1}`,
      kcal: partKcal,
      macros: macrosFromKcal(partKcal),
      portionBullets: getMealPortionBullets(
        i,
        partKcal,
        mealPrefs,
        mealPortionVariant[i] ?? 0,
      ),
    }));
  }, [kcal, meals, preset, mealPrefs, mealPortionVariant]);

  const sumKcal = useMemo(() => rows.reduce((a, r) => a + r.kcal, 0), [rows]);

  const presetBtnBase =
    "touch-manipulation w-full min-h-[48px] rounded-lg border px-3 py-3 text-left outline-none transition-[border-color,background-color] focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

  return (
    <div
      role="region"
      className={`${CALORIE_TOOL_SHELL} w-full min-w-0`}
      aria-label={mealPlanUx.regionAriaLabel}
    >
      <div className={CALORIE_WIDGET_SHELL}>
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 hidden h-56 w-56 rounded-full bg-accent/[0.06] blur-3xl motion-reduce:opacity-40 md:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(95,184,173,0.14),transparent_55%)] motion-reduce:hidden md:block"
          aria-hidden
        />

        <div className="relative flex min-w-0 flex-col overflow-x-hidden">
          <header className="border-b border-white/[0.08] bg-page/[0.12] px-5 py-4 sm:px-7 sm:py-5">
            <h3 className={CALORIE_WIDGET_HEADLINE}>
              {mealPlanUx.widgetHeadlineStem}{" "}
              <span className="text-accent">
                {mealPlanUx.widgetHeadlineAccent}
              </span>
            </h3>
          </header>

          <div className="flex min-w-0 flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-7 sm:py-6">
            <div className={CALORIE_FORM_PANEL}>
              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                <label className="min-w-0">
                  <span className={CALORIE_TOOL_LABEL}>
                    {mealPlanUx.kcalLabel}
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={MEAL_PLAN_KCAL_MIN}
                    max={MEAL_PLAN_KCAL_MAX}
                    value={kcal}
                    onChange={(e) => {
                      const v = Number.parseInt(e.target.value, 10);
                      if (!Number.isFinite(v)) return;
                      const c = clampKcal(v);
                      setKcal(c);
                      pushFullQuery(c, meals, presetId, mealPrefs);
                    }}
                    className={CALORIE_TOOL_INPUT}
                  />
                  <span className="mt-1 block text-xs text-fg-subtle">
                    {mealPlanUx.kcalHint}
                  </span>
                </label>

                <label className="min-w-0">
                  <span id={mealsFieldLabelId} className={CALORIE_TOOL_LABEL}>
                    {mealPlanUx.mealsLabel}
                  </span>
                  <MealCountSelect
                    id={mealsSelectId}
                    labelId={mealsFieldLabelId}
                    value={meals}
                    onChange={(c) => {
                      const nextPresets = getPresetsForMealCount(c);
                      const stillValid = nextPresets.some(
                        (p) => p.id === presetId,
                      );
                      const nextPreset = stillValid
                        ? presetId
                        : (nextPresets[0]?.id ?? DEFAULT_PRESET);
                      setMeals(c);
                      if (!stillValid) setPresetId(nextPreset);
                      pushFullQuery(kcal, c, nextPreset, mealPrefs);
                    }}
                  />
                  <span className="mt-1 block text-xs text-fg-subtle">
                    {mealPlanUx.mealsHint}
                  </span>
                </label>

                <div className="min-w-0 sm:col-span-2">
                  <p
                    className="mt-2 flex min-h-[1.25rem] flex-nowrap items-baseline gap-x-1 overflow-x-auto pb-0.5 text-[11px] leading-snug text-fg-muted [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] sm:mt-3 sm:text-xs"
                    role="note"
                  >
                    <span className="shrink-0">{mealPlanUx.kcalTdeeHintPrefix}</span>
                    <Link
                      href="/#calc-main"
                      aria-label={mealPlanUx.kcalTdeeHintLinkAria}
                      className="shrink-0 font-medium text-accent underline decoration-accent/35 decoration-1 underline-offset-2 hover:decoration-accent"
                    >
                      {mealPlanUx.kcalTdeeHintLink}
                    </Link>
                    <span className="shrink-0">{mealPlanUx.kcalTdeeHintSuffix}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={CALORIE_FORM_PANEL}>
              <p id={distributionGroupId} className={CALORIE_FORM_LEGEND_MUTED}>
                {mealPlanUx.distributionLabel}
              </p>
              <p className="mb-3 mt-2 text-xs leading-relaxed text-fg-subtle">
                {mealPlanUx.distributionHintIntro}
              </p>
              <fieldset
                className="min-w-0 space-y-2 border-0 p-0"
                role="radiogroup"
                aria-labelledby={distributionGroupId}
              >
                {presetOptions.map((p: MealDistributionPreset) => {
                  const selected = preset.id === p.id;
                  const kcalParts = splitKcalByWeights(kcal, p.weights);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setPresetId(p.id);
                        pushFullQuery(kcal, meals, p.id, mealPrefs);
                      }}
                      className={`${presetBtnBase} ${
                        selected
                          ? "border-accent/40 bg-accent/[0.06]"
                          : "border-border bg-page/20 hover:border-accent/25"
                      }`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-fg">
                            {p.label}
                          </p>
                          <p className="mt-0.5 text-xs leading-snug text-fg-subtle">
                            {p.hint}
                          </p>
                        </div>
                        <PresetBar weights={p.weights} kcalParts={kcalParts} />
                      </div>
                    </button>
                  );
                })}
              </fieldset>
            </div>

            <MealPlanProductPrefsPanel
              prefs={mealPrefs}
              onPreferenceChange={onMealPreferenceChange}
            />

            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-tight text-fg">
                {mealPlanUx.mealCardsTitle}
              </h3>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-fg-subtle">
                {mealPlanUx.portionBulletsTitle}
              </p>
              <ul className="mt-4 flex flex-col gap-3.5">
                {rows.map((row, i) => (
                  <li
                    key={`${row.label}-${i}`}
                    className="overflow-hidden rounded-xl border border-border/80 bg-gradient-to-b from-page/[0.22] to-page/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,box-shadow] hover:border-accent/25 hover:shadow-[0_0_0_1px_rgba(95,184,173,0.12)]"
                  >
                    <div className="flex gap-3 border-b border-border/55 bg-page/[0.12] px-3 py-3 sm:px-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-semibold leading-tight text-fg">
                          {row.label}
                        </p>
                        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] tabular-nums leading-snug text-fg-muted sm:text-xs">
                          <span>
                            <span className="text-fg-subtle">Б</span>{" "}
                            {row.macros.proteinG} г
                          </span>
                          <span className="text-border" aria-hidden>
                            ·
                          </span>
                          <span>
                            <span className="text-fg-subtle">Ж</span>{" "}
                            {row.macros.fatG} г
                          </span>
                          <span className="text-border" aria-hidden>
                            ·
                          </span>
                          <span>
                            <span className="text-fg-subtle">У</span>{" "}
                            {row.macros.carbsG} г
                          </span>
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5 self-start">
                        <div className="rounded-lg bg-accent/[0.12] px-2.5 py-1.5 text-sm font-semibold tabular-nums leading-tight text-accent ring-1 ring-inset ring-accent/25">
                          {row.kcal} ккал
                        </div>
                        <button
                          type="button"
                          title={mealPlanUx.mealCardRefreshTitle}
                          aria-label={`${mealPlanUx.mealCardRefreshLabel} — ${row.label}`}
                          onClick={() => bumpMealPortionVariant(i)}
                          className="touch-manipulation rounded-md border border-border/70 bg-page/30 px-2 py-1 text-[11px] font-medium leading-tight text-fg-muted transition-[border-color,background-color,color] hover:border-accent/30 hover:bg-page/50 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
                        >
                          {mealPlanUx.mealCardRefreshLabel}
                        </button>
                      </div>
                    </div>
                    <ul className="space-y-2 pl-3 py-3 sm:px-4 sm:py-3.5">
                      {row.portionBullets.map((b, bi) => (
                        <li
                          key={`${i}-${bi}-${mealPortionVariant[i] ?? 0}`}
                          className="flex gap-2.5 text-xs leading-relaxed text-fg-muted"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/65 shadow-[0_0_0_1px_rgba(95,184,173,0.2)]"
                            aria-hidden
                          />
                          <span className="min-w-0 [overflow-wrap:anywhere]">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
                {mealPlanUx.portionFootnote}
              </p>
            </div>

            <div className="mt-6 rounded-lg border border-accent/15 bg-elevated/40 px-3 py-3 sm:px-4">
              <p className="text-xs text-fg-muted">
                {mealPlanUx.totalCheck}{" "}
                <strong className="tabular-nums text-accent">{sumKcal}</strong>{" "}
                ккал
              </p>
              <p className="mt-2 text-xs leading-relaxed text-fg-subtle">
                {mealPlanUx.macroNote}
              </p>
            </div>

            <p className="text-sm text-fg-muted">
              {mealPlanUx.linkToProductsLead}{" "}
              <Link
                href="#spravochnik-kaloriy"
                className="font-medium text-accent underline decoration-accent/35 decoration-1 underline-offset-2 hover:decoration-accent"
              >
                {mealPlanUx.linkToProducts}
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
