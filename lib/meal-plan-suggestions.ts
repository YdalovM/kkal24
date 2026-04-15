/**
 * Ориентиры порций по ккал приёма: ккал/100 г — как в `content/food-calorie-reference.ts`
 * (таблица на странице калькулятора питания); где в таблице нет строки — те же ориентиры, что в `meal-plan-products`.
 * Набор продуктов учитывает `MealPlanPrefs` (исключить / приоритет).
 * Сумма ккал по строкам ≈ `mealKcal`: доля исключённой группы переносится на белок (или на одну строку).
 *
 * Чистые функции без React — вызываются из `useMemo` в `MealPlanCalculator`.
 */

import type { MealPlanPrefs } from "@/lib/meal-plan-prefs";
import {
  MEAL_PLAN_CARBS,
  MEAL_PLAN_EXTRA_FRUIT,
  MEAL_PLAN_EXTRA_VEG,
  MEAL_PLAN_PROTEINS,
  MEAL_PLAN_SNACK_FRUITS,
  type MealPlanProductDef,
} from "@/lib/meal-plan-products";

function g(kcal: number, kcalPer100: number): number {
  return Math.max(1, Math.round((kcal / kcalPer100) * 100));
}

/**
 * Ротация по приёмам: сначала «prefer», затем нейтральные.
 * `variant` — сдвиг при «Другой вариант» (те же ккал и доли, другие позиции в пуле).
 */
function pickFromPool(
  pool: readonly MealPlanProductDef[],
  prefs: MealPlanPrefs,
  mealIndex: number,
  salt: number,
  variant: number,
): MealPlanProductDef | null {
  const available = pool.filter((p) => prefs[p.id] !== "exclude");
  if (available.length === 0) return null;
  const preferred = available.filter((p) => prefs[p.id] === "prefer");
  const rest = available.filter((p) => prefs[p.id] !== "prefer");
  const ordered = [...preferred, ...rest];
  const n = ordered.length;
  const idx = (mealIndex + salt + variant) % n;
  return ordered[idx] ?? null;
}

function formatProteinLine(kcal: number, protein: MealPlanProductDef): string {
  if (protein.id === "prot_egg") {
    const eggs = Math.max(1, Math.min(4, Math.round(kcal / 78)));
    return `~${eggs} яйца (~${eggs * 50} г)`;
  }
  return `~${g(kcal, protein.kcal100)} г ${protein.portionName}`;
}

/**
 * Доля 0.16·k на овощ/фрукт; то, что не уходит в отдельные строки, — в `extraToProtein`.
 */
function extraVegFruitKcal(
  k: number,
  prefs: MealPlanPrefs,
): { vegK: number; fruitK: number; extraToProtein: number } {
  const kExtra = k * 0.16;
  let vegK = 0;
  let fruitK = 0;
  let extraToProtein = 0;

  if (kExtra <= 35) {
    extraToProtein += kExtra;
  } else if (kExtra <= 55) {
    vegK = kExtra * 0.6;
    extraToProtein += kExtra * 0.4;
    if (prefs[`extra_veg`] === "exclude") {
      extraToProtein += vegK;
      vegK = 0;
    }
  } else {
    vegK = kExtra * 0.6;
    fruitK = kExtra * 0.4;
    if (prefs[`extra_veg`] === "exclude") {
      extraToProtein += vegK;
      vegK = 0;
    }
    if (prefs[`extra_fruit`] === "exclude") {
      extraToProtein += fruitK;
      fruitK = 0;
    }
  }

  return { vegK, fruitK, extraToProtein };
}

export function getMealPortionBullets(
  mealIndex: number,
  mealKcal: number,
  prefs: MealPlanPrefs,
  variant = 0,
): string[] {
  const k = Math.round(mealKcal);
  const i = mealIndex;
  const v = variant;

  if (k < 95) {
    const kProt = k * 0.55;
    const kFruit = k * 0.45;
    const proteinPick = pickFromPool(MEAL_PLAN_PROTEINS, prefs, i, 0, v);
    const fruitPick = pickFromPool(MEAL_PLAN_SNACK_FRUITS, prefs, i, 1, v);

    if (!proteinPick && !fruitPick) {
      return [`~${g(k, 165)} г белка или фрукта по выбору`];
    }

    if (!proteinPick) {
      if (fruitPick) {
        return [`~${g(k, fruitPick.kcal100)} г ${fruitPick.portionName}`];
      }
      return [`~${g(k, 52)} г фрукта по выбору`];
    }

    if (!fruitPick) {
      return [formatProteinLine(k, proteinPick)];
    }

    return [
      formatProteinLine(kProt, proteinPick),
      `~${g(kFruit, fruitPick.kcal100)} г ${fruitPick.portionName}`,
    ];
  }

  if (k < 200) {
    const pr = pickFromPool(MEAL_PLAN_PROTEINS, prefs, i, 0, v);
    if (!pr) {
      return [`~${g(k, 165)} г белка по выбору`];
    }
    return [formatProteinLine(k, pr)];
  }

  let bCarb = k * 0.42;
  let bProt = k * 0.42;
  const { vegK, fruitK, extraToProtein } = extraVegFruitKcal(k, prefs);
  bProt += extraToProtein;

  const carb = pickFromPool(MEAL_PLAN_CARBS, prefs, i, 0, v);
  const prot = pickFromPool(MEAL_PLAN_PROTEINS, prefs, i, 2, v);

  if (!carb) {
    bProt += bCarb;
    bCarb = 0;
  }

  const lines: string[] = [];

  if (bCarb > 0) {
    if (carb) {
      lines.push(`~${g(bCarb, carb.kcal100)} г ${carb.portionName}`);
    } else {
      lines.push(`~${g(bCarb, 130)} г готового гарнира (крупы или макароны)`);
    }
  }

  if (bProt > 0) {
    if (prot) {
      lines.push(formatProteinLine(bProt, prot));
    } else {
      lines.push(`~${g(bProt, 165)} г белка по выбору`);
    }
  }

  if (vegK > 0) {
    lines.push(
      `~${g(vegK, MEAL_PLAN_EXTRA_VEG.kcal100)} г ${MEAL_PLAN_EXTRA_VEG.portionName}`,
    );
  }

  if (fruitK > 0) {
    lines.push(
      `~${g(fruitK, MEAL_PLAN_EXTRA_FRUIT.kcal100)} г ${MEAL_PLAN_EXTRA_FRUIT.portionName}`,
    );
  }

  if (lines.length === 0) {
    lines.push(`~${g(k, 165)} г порции по выбору`);
  }

  return lines;
}
