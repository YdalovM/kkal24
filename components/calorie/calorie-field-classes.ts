/**
 * Tailwind-строки для калорийного виджета и связанных карточек.
 *
 * ИИ:
 * - `CALORIE_FORM_*` / `CALORIE_TOOL_*` — только `CalorieFormCard`.
 * - `CALORIE_CARD_CLASS` — панель результата и мини-секции (`MINI_SECTION_CLASS` импортирует его).
 * - Глобальные хелперы: `input-no-spin` в `app/globals.css`; цвета — токены `:root`.
 */
export const CALORIE_CARD_CLASS =
  "rounded-xl border border-border bg-elevated p-4 shadow-[0_4px_24px_rgba(0,0,0,0.32)]";

/** Основная форма: обёртка без оформления (оформление — `CALORIE_WIDGET_SHELL`). */
export const CALORIE_TOOL_SHELL = "flex min-w-0 w-full flex-col";

export const CALORIE_TOOL_BODY = "flex min-w-0 flex-col";

/**
 * Цельная карточка виджета: акцентная рамка и глубина — «продукт», а не обрубок полей.
 * ИИ: цвета из токенов; жёсткие rgba только для тени.
 */
export const CALORIE_WIDGET_SHELL =
  "relative isolate overflow-visible rounded-2xl border border-accent/30 bg-elevated " +
  "shadow-[0_0_0_1px_rgba(95,184,173,0.12),0_28px_56px_-18px_rgba(0,0,0,0.72)]";

/** Внутренний блок только полей ввода. */
export const CALORIE_FORM_PANEL =
  "rounded-xl border border-white/[0.06] bg-page/[0.18] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5";

export const CALORIE_TOOL_INPUT =
  "input-no-spin min-h-[48px] w-full rounded-lg border border-border/90 bg-page/45 px-3 py-3 text-base text-fg " +
  "placeholder:text-fg-dim/75 " +
  "focus:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:min-h-[44px] sm:text-sm";

export const CALORIE_TOOL_LABEL = "mb-1 block text-sm font-medium text-fg-muted";

/** Подпись для группы «Пол» — чуть плотнее визуальная иерархия. */
export const CALORIE_FORM_LEGEND_MUTED =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-fg-subtle";

/** Дорожка сегмента «пол»: компактнее пары крупных плиток. */
export const CALORIE_FORM_SEX_TRACK =
  "flex w-full max-w-md rounded-lg border border-border/80 bg-page/20 p-1";

export const CALORIE_FORM_SEX_OPTION =
  "flex min-h-[44px] w-full flex-1 cursor-pointer items-center justify-center rounded-md border border-transparent text-center text-sm font-medium text-fg-muted transition-[color,background-color,border-color] " +
  "peer-checked:border-accent/40 peer-checked:bg-accent/[0.12] peer-checked:text-fg " +
  "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-accent/35 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface";
