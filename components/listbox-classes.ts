/**
 * Выпадающие списки (role=listbox):
 * - `ul` без паддинга — отступы только у строк (`li`), иначе фон ховера не доходит до края.
 * - `flex flex-col` на `ul`, базовая ширина строк — `LISTBOX_LI_STRETCH`.
 */
export const LISTBOX_UL_STRETCH =
  "m-0 box-border flex w-full min-w-0 list-none flex-col ps-0 pe-0 [list-style-type:none]";

/** База строки; добавьте `block` или `flex` и паддинги (`px-3 py-2.5` и т.д.). */
export const LISTBOX_LI_STRETCH =
  "w-full min-w-0 shrink-0 [list-style-type:none]";

/** Типичный внутренний отступ текста в опции (на `li`, не на `ul`). */
export const LISTBOX_LI_OPTION_PAD = "px-3 py-2.5";
