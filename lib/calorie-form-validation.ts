/**
 * Валидация полей основного калькулятора (строки из input).
 * Ошибки — готовые строки для UI; при смене копирайта править здесь и в `CalorieFormCard`.
 */
import { CALCULATOR_FORM_LIMITS } from "@/constants/calculator";
import type { Sex } from "@/lib/calories";

export type CalorieFieldId = "age" | "height" | "weight";

export type CalorieFieldErrors = Partial<Record<CalorieFieldId, string>>;

export type CalorieValidatedNumbers = {
  ageN: number;
  heightN: number;
  weightN: number;
  sex: Sex;
};

export function validateCalorieFormFields(input: {
  sex: Sex;
  age: string;
  height: string;
  weight: string;
}):
  | { ok: false; errors: CalorieFieldErrors }
  | { ok: true; values: CalorieValidatedNumbers } {
  const { age, height, weight, sex } = input;
  const { age: ageL, heightCm: hL, weightKg: wL } = CALCULATOR_FORM_LIMITS;

  const errors: CalorieFieldErrors = {};

  const ageN = Number.parseInt(age, 10);
  if (!Number.isFinite(ageN) || ageN < ageL.min || ageN > ageL.max) {
    errors.age = `Возраст от ${ageL.min} до ${ageL.max} лет`;
  }

  const heightN = Number.parseFloat(height);
  if (!Number.isFinite(heightN) || heightN < hL.min || heightN > hL.max) {
    errors.height = `Рост ${hL.min}–${hL.max} см`;
  }

  const weightN = Number.parseFloat(weight);
  if (!Number.isFinite(weightN) || weightN < wL.min || weightN > wL.max) {
    errors.weight = `Вес ${wL.min}–${wL.max} кг`;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    values: { ageN, heightN, weightN, sex },
  };
}
