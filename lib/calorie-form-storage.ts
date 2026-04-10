/**
 * Персистенция черновика формы в браузере. Без сервера; смена схемы — новый ключ в constants/calculator.
 */
import { CALORIE_FORM_STORAGE_KEY } from "@/constants/calculator";
import type { ActivityIndex } from "@/constants/pal";
import type { Sex } from "@/lib/calories";

export type CalorieFormPersistedPayload = {
  sex: Sex;
  age: string;
  height: string;
  weight: string;
  activity: ActivityIndex;
  palOverride: number | null;
};

export function loadCalorieFormFromStorage(): Partial<CalorieFormPersistedPayload> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CALORIE_FORM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<CalorieFormPersistedPayload>;
  } catch {
    return null;
  }
}

export function saveCalorieFormToStorage(state: CalorieFormPersistedPayload): void {
  try {
    localStorage.setItem(CALORIE_FORM_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode */
  }
}
