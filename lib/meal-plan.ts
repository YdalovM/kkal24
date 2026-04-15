/**
 * Распределение суточных калорий по приёмам пищи (равномерно, остаток — в первые приёмы).
 * Границы — для URL и формы; не медицинская норма.
 */
export const MEAL_PLAN_KCAL_MIN = 800;
export const MEAL_PLAN_KCAL_MAX = 6000;
export const MEAL_PLAN_MEALS_MIN = 2;
export const MEAL_PLAN_MEALS_MAX = 6;

export function splitKcalAcrossMeals(totalKcal: number, mealCount: number): number[] {
  const w = Array.from({ length: mealCount }, () => 1 / mealCount);
  return splitKcalByWeights(totalKcal, w);
}

/**
 * Делит суточные ккал по долям `weights` (любые положительные, сумма произвольная — нормализуем).
 * Сумма по результатам = округлённому `totalKcal`.
 */
export function splitKcalByWeights(totalKcal: number, weights: number[]): number[] {
  const n = Math.round(totalKcal);
  const len = weights.length;
  if (len === 0) return [n];
  if (len === 1) return [n];
  const sumW = weights.reduce((a, b) => a + b, 0);
  if (sumW <= 0) {
    return splitKcalAcrossMeals(n, len);
  }
  const norm = weights.map((w) => w / sumW);
  const exact = norm.map((w) => w * n);
  const floors = exact.map((x) => Math.floor(x));
  const rem = n - floors.reduce((a, b) => a + b, 0);
  const order = exact
    .map((x, i) => ({ i, frac: x - floors[i] }))
    .sort((a, b) => b.frac - a.frac);
  const result = [...floors];
  for (let k = 0; k < rem; k++) {
    result[order[k]!.i]++;
  }
  return result;
}

export type MealDistributionPresetId = string;

export type MealDistributionPreset = {
  id: MealDistributionPresetId;
  /** Подпись в селекте (RU). */
  label: string;
  /** Кратко, зачем режим (под селектом или title). */
  hint: string;
  weights: number[];
};

/** Предустановки долей по числу приёмов: id уникален внутри `mealCount`. */
export const MEAL_DISTRIBUTION_PRESETS: Record<
  number,
  readonly MealDistributionPreset[]
> = {
  2: [
    {
      id: "equal",
      label: "Поровну",
      hint: "Половина суток на завтрак, половина на ужин.",
      weights: [0.5, 0.5],
    },
    {
      id: "morning_heavy",
      label: "Завтрак плотнее",
      hint: "Чуть больше ккал утром — удобно при раннем подъёме.",
      weights: [0.55, 0.45],
    },
  ],
  3: [
    {
      id: "equal",
      label: "Поровну",
      hint: "Три основных приёма с одинаковой долей калорий.",
      weights: [1 / 3, 1 / 3, 1 / 3],
    },
    {
      id: "morning_heavy",
      label: "Завтрак сытнее",
      hint: "Больше на завтрак, меньше к вечеру.",
      weights: [0.38, 0.34, 0.28],
    },
    {
      id: "lunch_heavy",
      label: "Обед главный",
      hint: "Основная порция днём — типичный офисный график.",
      weights: [0.28, 0.42, 0.3],
    },
  ],
  4: [
    {
      id: "equal",
      label: "Поровну",
      hint: "Четыре равные доли.",
      weights: [0.25, 0.25, 0.25, 0.25],
    },
    {
      id: "classic",
      label: "Завтрак — обед — полдник — ужин",
      hint: "Сильнее обед, легче ужин и полдник.",
      weights: [0.22, 0.32, 0.18, 0.28],
    },
    {
      id: "light_evening",
      label: "Лёгкий вечер",
      hint: "Меньше ккал на ужин, больше днём.",
      weights: [0.25, 0.35, 0.15, 0.25],
    },
  ],
  5: [
    {
      id: "equal",
      label: "Поровну",
      hint: "Пять примерно равных приёмов.",
      weights: [0.2, 0.2, 0.2, 0.2, 0.2],
    },
    {
      id: "main_lunch",
      label: "Акцент на обед",
      hint: "Завтрак и ужин скромнее, обед и перекусы — основа.",
      weights: [0.18, 0.12, 0.32, 0.2, 0.18],
    },
  ],
  6: [
    {
      id: "equal",
      label: "Поровну",
      hint: "Шесть небольших приёмов.",
      weights: [1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6],
    },
    {
      id: "frequent",
      label: "Частые небольшие",
      hint: "Чуть больше на обед и после него, меньше «хвост» вечера.",
      weights: [0.17, 0.14, 0.22, 0.18, 0.17, 0.12],
    },
  ],
};

export function getPresetsForMealCount(mealCount: number): readonly MealDistributionPreset[] {
  const list = MEAL_DISTRIBUTION_PRESETS[mealCount];
  return list ?? MEAL_DISTRIBUTION_PRESETS[3]!;
}

export function findPreset(
  mealCount: number,
  presetId: string | null,
): MealDistributionPreset {
  const list = [...getPresetsForMealCount(mealCount)];
  const found = list.find((p) => p.id === presetId);
  return found ?? list[0]!;
}

/** Подписи приёмов для 2–6 раз в день (ориентир, не жёсткий регламент). */
export function mealLabelsForCount(count: number): string[] {
  const presets: Record<number, readonly string[]> = {
    2: ["Завтрак", "Ужин"],
    3: ["Завтрак", "Обед", "Ужин"],
    4: ["Завтрак", "Обед", "Полдник", "Ужин"],
    5: ["Завтрак", "Перекус", "Обед", "Полдник", "Ужин"],
    6: ["Завтрак", "Перекус", "Обед", "Полдник", "Ужин", "Поздний перекус"],
  };
  const p = presets[count];
  if (p) return [...p];
  return Array.from({ length: count }, (_, i) => `Приём ${i + 1}`);
}

export function parseMealPlanKcal(raw: string | null): number | undefined {
  if (raw === null || raw === "") return undefined;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < MEAL_PLAN_KCAL_MIN || n > MEAL_PLAN_KCAL_MAX) {
    return undefined;
  }
  return n;
}

export function parseMealPlanMeals(raw: string | null): number | undefined {
  if (raw === null || raw === "") return undefined;
  const n = Number.parseInt(raw, 10);
  if (
    !Number.isFinite(n) ||
    n < MEAL_PLAN_MEALS_MIN ||
    n > MEAL_PLAN_MEALS_MAX
  ) {
    return undefined;
  }
  return n;
}

/** Параметр `preset` в query: латиница, цифры, подчёркивание. */
export function parseMealPlanPreset(raw: string | null): string | undefined {
  if (raw === null || raw === "") return undefined;
  if (raw.length > 48) return undefined;
  return /^[a-z][a-z0-9_]*$/.test(raw) ? raw : undefined;
}
