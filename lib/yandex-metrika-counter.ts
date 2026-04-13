/**
 * Базовый номер счётчика kkal24.ru. Переопределение: `NEXT_PUBLIC_YM_COUNTER_ID` при сборке (если задан корректно).
 * ИИ: без fallback на проде счётчик пропадёт, если на хостинге не задали env — Метрика пишет «счётчик не подключён».
 */
export const YANDEX_METRIKA_COUNTER_ID_DEFAULT = 108521872;

export function resolveYandexMetrikaCounterId(): number {
  const raw = process.env.NEXT_PUBLIC_YM_COUNTER_ID;
  if (raw === undefined || raw === "") {
    return YANDEX_METRIKA_COUNTER_ID_DEFAULT;
  }
  const n = Number.parseInt(String(raw).trim(), 10);
  if (!Number.isFinite(n) || n <= 0) {
    return YANDEX_METRIKA_COUNTER_ID_DEFAULT;
  }
  return n;
}
