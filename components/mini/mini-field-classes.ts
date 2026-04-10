import { CALORIE_CARD_CLASS } from "@/components/calorie/calorie-field-classes";

export const MINI_INPUT_CLASS =
  "input-no-spin min-h-[44px] rounded-lg border border-border bg-elevated px-3 py-2.5 text-base text-fg shadow-inner placeholder:text-fg-subtle/70 sm:min-h-0 sm:text-sm " +
  "focus:border-border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

/** Левый лайм — визуальная связь со второй секцией и общей темой. */
export const MINI_SECTION_CLASS = `${CALORIE_CARD_CLASS} min-w-0 w-full border-l-4 border-l-accent/80`;

export const MINI_HEADING_ROW =
  "mb-2 flex items-center gap-2.5 text-lg font-semibold tracking-tight text-fg";
export const MINI_HEADING_MARK =
  "inline-block h-5 w-1 shrink-0 rounded-full bg-accent shadow-sm shadow-accent/20";
