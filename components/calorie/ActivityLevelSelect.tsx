"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
} from "react";
import { ACTIVITY_LEVELS } from "@/constants/pal";
import type { ActivityIndex } from "@/constants/pal";
import { CALORIE_TOOL_INPUT } from "@/components/calorie/calorie-field-classes";

const TRIGGER_CLASS =
  `${CALORIE_TOOL_INPUT} flex w-full cursor-pointer items-center justify-between gap-2 text-left pr-3`;

const LISTBOX_CLASS =
  "absolute left-0 right-0 top-[calc(100%+0.25rem)] z-[80] max-h-[min(20rem,55vh)] overflow-y-auto rounded-lg border border-border/95 bg-elevated py-1 shadow-[0_12px_40px_rgba(0,0,0,0.55)]";

const OPTION_CLASS =
  "flex w-full cursor-pointer border-0 px-3 py-2.5 text-left text-sm leading-snug text-fg transition-[background-color,color] hover:bg-accent/[0.08] focus-visible:bg-accent/[0.1] focus-visible:outline-none";

const OPTION_ACTIVE_CLASS = " bg-accent/[0.14] text-fg";

type ActivityLevelSelectProps = {
  id: string;
  value: ActivityIndex;
  onChange: (i: ActivityIndex) => void;
  "aria-describedby"?: string;
};

export function ActivityLevelSelect({
  id,
  value,
  onChange,
  "aria-describedby": ariaDescribedBy,
}: ActivityLevelSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<ActivityIndex>(value);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const currentLabel = ACTIVITY_LEVELS[value].label;

  const close = useCallback((opts?: { focusTrigger?: boolean }) => {
    setOpen(false);
    if (opts?.focusTrigger) {
      triggerRef.current?.focus();
    }
  }, []);

  const openMenu = useCallback(() => {
    setHighlighted(value);
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
        setHighlighted((h) => {
          const next = Math.min(4, h + 1) as ActivityIndex;
          return next;
        });
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((h) => {
          const next = Math.max(0, h - 1) as ActivityIndex;
          return next;
        });
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        setHighlighted(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        setHighlighted(4);
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange(highlighted);
        close({ focusTrigger: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, highlighted, onChange, close]);

  useEffect(() => {
    if (open) setHighlighted(value);
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
        aria-describedby={ariaDescribedBy}
        onClick={() =>
          open ? close({ focusTrigger: false }) : openMenu()
        }
      >
        <span className="min-w-0 flex-1 truncate">{currentLabel}</span>
        <span
          className={`ml-1 shrink-0 text-fg-dim transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
          aria-labelledby={id}
          className={LISTBOX_CLASS}
        >
          {ACTIVITY_LEVELS.map((lvl) => {
            const isValue = lvl.id === value;
            const isHi = lvl.id === highlighted;
            return (
              <li key={lvl.id} role="presentation" className="min-w-0">
                <button
                  type="button"
                  role="option"
                  aria-selected={isValue}
                  tabIndex={-1}
                  className={`${OPTION_CLASS}${isHi ? OPTION_ACTIVE_CLASS : ""}`}
                  onMouseEnter={() => setHighlighted(lvl.id as ActivityIndex)}
                  onClick={() => {
                    onChange(lvl.id as ActivityIndex);
                    close({ focusTrigger: false });
                  }}
                >
                  {lvl.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
