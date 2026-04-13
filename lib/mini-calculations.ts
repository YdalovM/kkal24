/**
 * Доменная логика мини-калькуляторов (ИМТ, дефицит/профицит по кг/нед, вода).
 * UI-компоненты остаются тонкими; сценарии можно покрыть unit-тестами здесь.
 */

/** Популярное грубое приближение ккал на ~1 кг жировой массы (с большой погрешностью). */
export const KCAL_PER_KG_FAT_APPROX = 7700;

export function bmiFromMetric(
  weightKg: number,
  heightCm: number,
): number | null {
  const heightM = heightCm / 100;
  if (!Number.isFinite(heightM) || heightM <= 0) return null;
  if (!Number.isFinite(weightKg) || weightKg <= 0) return null;
  return weightKg / (heightM * heightM);
}

export type BmiBandLabel =
  | "under"
  | "normal"
  | "overweight"
  | "obese"
  | "unknown";

/** Дискретные полосы для короткой подписи в UI (не клиническая классификация на странице). */
export function bmiBand(bmi: number): BmiBandLabel {
  if (!Number.isFinite(bmi)) return "unknown";
  if (bmi < 18.5) return "under";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

export function dailyKcalDeficitForWeeklyKgLoss(weeklyKg: number): number | null {
  if (!Number.isFinite(weeklyKg) || weeklyKg <= 0) return null;
  return (weeklyKg * KCAL_PER_KG_FAT_APPROX) / 7;
}

/**
 * Суточный профицит (ккал/сут) под цель «~X кг в неделю» — то же арифметическое приближение,
 * что и для дефицита; на практике при наборе больше доля жидкости и гликогена, состав массы другой.
 */
export function dailyKcalSurplusForWeeklyKgGain(weeklyKg: number): number | null {
  return dailyKcalDeficitForWeeklyKgLoss(weeklyKg);
}

/**
 * Насколько суточное отклонение от TDEE «тяжёлое» (доля и абсолютные пороги в ккал).
 * Используется и для дефицита, и для профицита: в обоих случаях передаётся положительное
 * число ккал/сут ниже или выше нормы. null — нормы нет или величина невалидна.
 */
export type DeficitRelativeLevel = "moderate" | "aggressive" | "very_high";

export function deficitRelativeToMaintenance(
  dailyAbsDeltaKcal: number,
  maintenanceKcal: number | null | undefined,
): DeficitRelativeLevel | null {
  if (!Number.isFinite(dailyAbsDeltaKcal) || dailyAbsDeltaKcal <= 0) return null;
  if (
    maintenanceKcal == null ||
    !Number.isFinite(maintenanceKcal) ||
    maintenanceKcal <= 0
  ) {
    return null;
  }
  const frac = dailyAbsDeltaKcal / maintenanceKcal;
  // Пороги грубые: подсказка в интерфейсе, не клинические критерии.
  if (frac >= 0.33 || dailyAbsDeltaKcal >= 750) return "very_high";
  if (frac >= 0.22 || dailyAbsDeltaKcal >= 550) return "aggressive";
  return "moderate";
}

/** Диапазон ккал/сут для ориентира ~0,5–1 кг/нед (то же правило для потери и набора в мини-блоках). */
export function weeklyLossRangeKcalPerDay(): { low: number; high: number } {
  return {
    low: (0.5 * KCAL_PER_KG_FAT_APPROX) / 7,
    high: (1 * KCAL_PER_KG_FAT_APPROX) / 7,
  };
}

/** мл/сут ориентировочно; множитель можно вынести в настройки при A/B контента. */
export function waterMlRoughDaily(weightKg: number, mlPerKg = 35): number | null {
  if (!Number.isFinite(weightKg) || weightKg <= 0) return null;
  return Math.round(weightKg * mlPerKg);
}
