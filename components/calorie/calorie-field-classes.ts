/**
 * Tailwind-классы для формы калорий. Числовые поля: `input-no-spin` в `app/globals.css`.
 * Селект активности: `calorie-select` там же (стрелка и фон option).
 */
export const CALORIE_INPUT_CLASS =
  "input-no-spin min-h-[44px] rounded-lg border border-border bg-elevated px-3 py-2.5 text-base text-fg shadow-inner placeholder:text-fg-subtle/70 sm:min-h-0 sm:text-sm " +
  "focus:border-border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export const CALORIE_CARD_CLASS =
  "rounded-xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)]";

/** Нативный select с кастомной стрелкой — см. `select.calorie-select` в globals.css. */
export const CALORIE_SELECT_CLASS = `${CALORIE_INPUT_CLASS} calorie-select cursor-pointer pr-10`;

/** Сегмент выбора пола: скрытый radio + видимая «кнопка». */
export const SEX_SEGMENT_CLASS =
  "flex min-h-[48px] items-center justify-center rounded-lg border-2 border-border bg-elevated text-center text-sm font-medium text-fg-muted transition-colors touch-manipulation " +
  "peer-checked:border-accent peer-checked:bg-accent/[0.09] peer-checked:text-fg " +
  "peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface";
