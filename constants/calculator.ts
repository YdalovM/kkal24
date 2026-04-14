/**
 * Сводные настройки основного калькулятора калорий.
 *
 * Правило масштабируемости: любые числовые границы для формы и для parse URL
 * должны браться отсюда (или от производных ниже), иначе расходятся валидация,
 * шаринг и документация.
 */
import type { ActivityIndex } from "@/constants/pal";
import { ACTIVITY_LEVELS } from "@/constants/pal";

export const CALCULATOR_FORM_LIMITS = {
  age: { min: 18, max: 90 },
  heightCm: { min: 100, max: 250 },
  weightKg: { min: 30, max: 300 },
  pal: { min: 1.2, max: 1.9 },
} as const;

/** Верхний допустимый индекс `activity` в query; синхронизирован с `ACTIVITY_LEVELS`. */
export const ACTIVITY_QUERY_INDEX_MAX = ACTIVITY_LEVELS.length - 1;

/** Ключ localStorage; при смене формы данных увеличить суффикс (`_v2`), миграцию описать в storage-слое. */
export const CALORIE_FORM_STORAGE_KEY = "med_calcul_form_v1";

/** Стартовый уровень активности в UI при пустом состоянии. */
export const DEFAULT_ACTIVITY_INDEX = 2 as ActivityIndex;

/** `id` обёртки панели результата; якорь для карточки целиком. */
export const CALORIE_RESULT_ANCHOR_ID = "calorie-result";

/** Якорь заголовка «Расчёт по вашим полям» — скролл после «Показать расчёт» и кнопка мобильной плашки TDEE. */
export const CALORIE_RESULT_HEADING_ANCHOR_ID = `${CALORIE_RESULT_ANCHOR_ID}-title`;
