/**
 * Чистая математика калорийности (без React, без строк UI).
 * Новые формулы (например альтернативный BMR) добавлять сюда и писать тесты;
 * презентацию шагов — в `lib/calorie-result.ts`.
 */
import type { ActivityIndex } from "@/constants/pal";
import { ACTIVITY_LEVELS } from "@/constants/pal";

export type Sex = "m" | "f";

export function bmrMifflin(params: {
  sex: Sex;
  weightKg: number;
  heightCm: number;
  ageYears: number;
}): number {
  const { sex, weightKg, heightCm, ageYears } = params;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sex === "m" ? base + 5 : base - 161;
}

export function roundKcal(value: number): number {
  return Math.round(value);
}

export function roundMacroGrams(value: number): number {
  return Math.round(value);
}

export function tdeeFromBmr(bmr: number, pal: number): number {
  return bmr * pal;
}

export function getPal(
  activityIndex: ActivityIndex,
  palOverride: number | null,
): number {
  if (palOverride !== null && Number.isFinite(palOverride)) {
    const clamped = Math.min(1.9, Math.max(1.2, palOverride));
    return clamped;
  }
  return ACTIVITY_LEVELS[activityIndex].pal;
}

/** Доли КБЖУ по калориям по умолчанию: 30% / 30% / 40% (ориентир, не норматив). */
const P_FAT = 0.3;
const P_PROTEIN = 0.3;
const P_CARBS = 0.4;

export function macrosFromKcal(totalKcal: number): {
  proteinG: number;
  fatG: number;
  carbsG: number;
} {
  const proteinG = roundMacroGrams((totalKcal * P_PROTEIN) / 4);
  const fatG = roundMacroGrams((totalKcal * P_FAT) / 9);
  const carbsG = roundMacroGrams((totalKcal * P_CARBS) / 4);
  return { proteinG, fatG, carbsG };
}

export type DeficitRow =
  | { kind: "pct"; label: string; pct: number }
  | { kind: "fixed"; label: string; delta: number };

/**
 * Структура сценариев дефицита (pct / фикс. минус). Поле `label` — запасное для тестов;
 * в UI подписи берутся из `calculatorUx.results.deficitLabelsTdee|Bmr` в том же порядке.
 */
export const DEFICIT_ROWS: DeficitRow[] = [
  { kind: "pct", label: "На 10% меньше вашей нормы", pct: 0.1 },
  { kind: "pct", label: "На 15% меньше вашей нормы", pct: 0.15 },
  { kind: "pct", label: "На 20% меньше вашей нормы", pct: 0.2 },
  { kind: "fixed", label: "Норма минус 300 ккал", delta: -300 },
  { kind: "fixed", label: "Норма минус 400 ккал", delta: -400 },
  { kind: "fixed", label: "Норма минус 500 ккал", delta: -500 },
];

export function targetKcalForDeficitRow(tdee: number, row: DeficitRow): number {
  const t = roundKcal(tdee);
  if (row.kind === "pct") {
    return roundKcal(t * (1 - row.pct));
  }
  return roundKcal(t + row.delta);
}
