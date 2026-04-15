/**
 * Состояние предпочтений по продуктам и синхронизация с query-параметрами страницы
 * `/kalkulyator-pitaniya/`: `exclude=id1,id2`, `prefer=id3` (id из `meal-plan-products`).
 *
 * ИИ: при смене формата URL поддерживайте обратную совместимость или миграцию в
 * `parseMealPlanPrefsFromSearchParams`; неразрешённые id из строки игнорируются.
 */

import {
  ALL_MEAL_PLAN_PRODUCT_IDS,
  type MealPlanProductId,
} from "@/lib/meal-plan-products";

export type MealPlanPreferenceLevel = "exclude" | "neutral" | "prefer";

export type MealPlanPrefs = Record<MealPlanProductId, MealPlanPreferenceLevel>;

export function defaultMealPlanPrefs(): MealPlanPrefs {
  return Object.fromEntries(
    ALL_MEAL_PLAN_PRODUCT_IDS.map((id) => [id, "neutral" as const]),
  ) as MealPlanPrefs;
}

function knownIds(raw: string | null): Set<MealPlanProductId> {
  const set = new Set<MealPlanProductId>();
  for (const s of (raw ?? "").split(",")) {
    const id = s.trim() as MealPlanProductId;
    if (ALL_MEAL_PLAN_PRODUCT_IDS.includes(id)) set.add(id);
  }
  return set;
}

/** Исключение важнее приоритета, если id попал в оба списка. */
export function parseMealPlanPrefsFromSearchParams(
  excludeRaw: string | null,
  preferRaw: string | null,
): MealPlanPrefs {
  const next = defaultMealPlanPrefs();
  const ex = knownIds(excludeRaw);
  const pr = knownIds(preferRaw);
  for (const id of ALL_MEAL_PLAN_PRODUCT_IDS) {
    if (ex.has(id)) next[id] = "exclude";
    else if (pr.has(id)) next[id] = "prefer";
  }
  return next;
}

export function mealPlanPrefsToQueryParts(prefs: MealPlanPrefs): {
  exclude: string | undefined;
  prefer: string | undefined;
} {
  const ex: string[] = [];
  const pr: string[] = [];
  for (const id of ALL_MEAL_PLAN_PRODUCT_IDS) {
    if (prefs[id] === "exclude") ex.push(id);
    else if (prefs[id] === "prefer") pr.push(id);
  }
  return {
    exclude: ex.length > 0 ? ex.join(",") : undefined,
    prefer: pr.length > 0 ? pr.join(",") : undefined,
  };
}
