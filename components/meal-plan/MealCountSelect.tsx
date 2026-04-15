"use client";

/**
 * Кастомный выбор числа приёмов пищи (2–6) — визуально как `ActivityLevelSelect` на главной.
 */

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
} from "react";
import { CALORIE_TOOL_INPUT } from "@/components/calorie/calorie-field-classes";
import {
  LISTBOX_LI_OPTION_PAD,
  LISTBOX_LI_STRETCH,
  LISTBOX_UL_STRETCH,
} from "@/components/listbox-classes";
import { MEAL_PLAN_MEALS_MAX, MEAL_PLAN_MEALS_MIN } from "@/lib/meal-plan";

const OPTIONS: readonly number[] = Array.from(
  { length: MEAL_PLAN_MEALS_MAX - MEAL_PLAN_MEALS_MIN + 1 },
  (_, i) => MEAL_PLAN_MEALS_MIN + i,
);

const TRIGGER_CLASS = `${CALORIE_TOOL_INPUT} flex w-full cursor-pointer items-center justify-between gap-2 text-left`;

const LISTBOX_CLASS = `${LISTBOX_UL_STRETCH} absolute left-0 right-0 top-[calc(100%+0.25rem)] z-[80] overflow-hidden rounded-lg border border-border/95 bg-elevated p-0 pl-0 shadow-[0_12px_40px_rgba(0,0,0,0.55)]`;

/** Фон строки на `li`; отступ текста — на `li` (`LISTBOX_LI_OPTION_PAD`), не на `ul`. */
const OPTION_ROW_BASE = `${LISTBOX_LI_STRETCH} block ${LISTBOX_LI_OPTION_PAD} transition-[background-color,color]`;

const OPTION_BTN =
  "block w-full cursor-pointer border-0 bg-transparent p-0 text-left text-sm tabular-nums leading-snug text-fg focus-visible:outline-none focus-visible:ring-0";

const OPTION_ROW_ACTIVE = " bg-accent/[0.16] text-fg";

const OPTION_ROW_IDLE = " hover:bg-accent/[0.1]";

function optionRound(idx: number, len: number): string {
  if (len <= 1) return "rounded-lg";
  if (idx === 0) return "rounded-t-lg";
  if (idx === len - 1) return "rounded-b-lg";
  return "";
}

type MealCountSelectProps = {
  id: string;
  /** `id` подписи поля («Приёмов пищи в день») — для `aria-labelledby` у списка. */
  labelId: string;
  value: number;
  onChange: (meals: number) => void;
};

export function MealCountSelect({
  id,
  labelId,
  value,
  onChange,
}: MealCountSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(() =>
    Math.max(0, OPTIONS.indexOf(value)),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const close = useCallback((opts?: { focusTrigger?: boolean }) => {
    setOpen(false);
    if (opts?.focusTrigger) triggerRef.current?.focus();
  }, []);

  const openMenu = useCallback(() => {
    const i = OPTIONS.indexOf(value);
    setHighlightedIdx(i >= 0 ? i : 0);
    setOpen(true);
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const node = rootRef.current;
      if (!node || node.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  const onBlurRoot = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      if (!open) return;
      const next = e.relatedTarget as Node | null;
      if (next && rootRef.current?.contains(next)) return;
      setOpen(false);
    },
    [open],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setOpen(false);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        close({ focusTrigger: true });
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIdx((i) => Math.min(OPTIONS.length - 1, i + 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIdx((i) => Math.max(0, i - 1));
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        setHighlightedIdx(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        setHighlightedIdx(OPTIONS.length - 1);
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const n = OPTIONS[highlightedIdx];
        if (n !== undefined) {
          onChange(n);
          close({ focusTrigger: true });
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, highlightedIdx, onChange, close]);

  useEffect(() => {
    if (!open) return;
    queueMicrotask(() => {
      const i = OPTIONS.indexOf(value);
      setHighlightedIdx(i >= 0 ? i : 0);
    });
  }, [value, open]);

  return (
    <div ref={rootRef} className="relative min-w-0" onBlur={onBlurRoot}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={TRIGGER_CLASS}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => (open ? close({ focusTrigger: false }) : openMenu())}
      >
        <span className="min-w-0 flex-1 truncate tabular-nums">{value}</span>
        <span
          className={`ml-1 shrink-0 text-fg-dim transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className={LISTBOX_CLASS}
        >
          {OPTIONS.map((n, idx) => {
            const isValue = n === value;
            const isHi = idx === highlightedIdx;
            const round = optionRound(idx, OPTIONS.length);
            return (
              <li
                key={n}
                role="presentation"
                className={`${OPTION_ROW_BASE} ${round}${isHi ? OPTION_ROW_ACTIVE : OPTION_ROW_IDLE}`}
                onMouseEnter={() => setHighlightedIdx(idx)}
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={isValue}
                  tabIndex={-1}
                  className={OPTION_BTN}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(n);
                    close({ focusTrigger: false });
                  }}
                >
                  {n}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
