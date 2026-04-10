/**
 * Мост к Яндекс.Метрике без жёсткой зависимости от SDK.
 *
 * Подключение на проде: после загрузки счётчика задайте на window `YM_COUNTER_ID`
 * (число). До этого вызовы безопасно no-op. Не передавайте сюда точный возраст,
 * если политика проекта запрещает — используйте бакеты (`ageBucket`).
 */

export function reachGoal(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return;
  const ym = (
    window as unknown as {
      ym?: (id: number, ev: string, goal: string, p?: Record<string, unknown>) => void;
    }
  ).ym;
  const counterId = (window as unknown as { YM_COUNTER_ID?: number }).YM_COUNTER_ID;
  if (typeof ym === "function" && typeof counterId === "number") {
    ym(counterId, "reachGoal", name, params as Record<string, unknown> | undefined);
  }
}

export function ageBucket(age: number): string {
  if (age < 25) return "18-24";
  if (age < 35) return "25-34";
  if (age < 45) return "35-44";
  if (age < 55) return "45-54";
  if (age < 65) return "55-64";
  return "65+";
}
