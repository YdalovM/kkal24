/**
 * Утилиты путей для навигации (сайдбар, активные ссылки) и сравнения с `href` из `site.ts`.
 * Без React — пригодны в тестах и серверном коде при необходимости.
 *
 * ИИ: `usePathname()` в Next может вернуть `/imt` или `/imt/` в зависимости от конфига;
 * нормализация убирает расхождения при подсветке активной ссылки.
 */

/** Приводит путь к виду без завершающего слэша; корень остаётся `/`. */
export function normalizeAppPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

/** `true`, если пользователь на главной (любой вариант слэша). */
export function isHomeAppPath(pathname: string): boolean {
  return normalizeAppPath(pathname) === "/";
}
