"use client";

/**
 * Продукты как фильтры: поиск → выпадающий список → чипы (приоритет / исключить).
 * Состояние `MealPlanPrefs` и URL — в родителе (`onPreferenceChange`).
 */

import {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";
import { CALORIE_FORM_PANEL } from "@/components/calorie/calorie-field-classes";
import {
  LISTBOX_LI_STRETCH,
  LISTBOX_UL_STRETCH,
} from "@/components/listbox-classes";
import { mealPlanUx } from "@/content/meal-plan-ux";
import type {
  MealPlanPreferenceLevel,
  MealPlanPrefs,
} from "@/lib/meal-plan-prefs";
import {
  ALL_MEAL_PLAN_PRODUCT_IDS,
  allMealPlanProductDefs,
  mealPlanProductDefById,
  type MealPlanProductDef,
  type MealPlanProductId,
} from "@/lib/meal-plan-products";

type MealPlanProductPrefsProps = {
  prefs: MealPlanPrefs;
  onPreferenceChange: (
    id: MealPlanProductId,
    level: MealPlanPreferenceLevel,
  ) => void;
};

type AddMode = "prefer" | "exclude";

/**
 * Те же приёмы, что у переключателя режима над полем: accent / warn + ring — в линию с калькулятором.
 */
function Chip({
  label,
  variant,
  onRemove,
  removeAria,
}: {
  label: string;
  variant: "prefer" | "exclude";
  onRemove: () => void;
  removeAria: string;
}) {
  const shell =
    variant === "prefer"
      ? "bg-accent/20 text-fg ring-1 ring-accent/40"
      : "bg-warn/15 text-fg ring-1 ring-warn/35";
  return (
    <span
      className={`inline-flex max-w-full min-h-[34px] items-center gap-0 rounded-lg pl-2.5 pr-0.5 py-0.5 text-[13px] font-medium leading-tight shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${shell}`}
    >
      <span className="min-w-0 py-px [overflow-wrap:anywhere]">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="touch-manipulation flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-fg-muted transition-[color,background-color,box-shadow] hover:bg-page/35 hover:text-fg focus-visible:outline-none focus-visible:ring-[0.5px] focus-visible:ring-inset focus-visible:ring-accent/45 motion-reduce:transition-none"
        aria-label={removeAria}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="shrink-0"
        >
          <path
            d="M18 6 6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </span>
  );
}

export const MealPlanProductPrefsPanel = memo(function MealPlanProductPrefsPanel({
  prefs,
  onPreferenceChange,
}: MealPlanProductPrefsProps) {
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const comboboxId = `${baseId}-combobox`;
  const containerRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<AddMode>("prefer");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const preferIds = useMemo(
    () => ALL_MEAL_PLAN_PRODUCT_IDS.filter((id) => prefs[id] === "prefer"),
    [prefs],
  );
  const excludeIds = useMemo(
    () => ALL_MEAL_PLAN_PRODUCT_IDS.filter((id) => prefs[id] === "exclude"),
    [prefs],
  );

  const candidates = useMemo(() => {
    const all = [...allMealPlanProductDefs()].sort((a, b) =>
      a.label.localeCompare(b.label, "ru"),
    );
    const q = query.trim().toLowerCase();
    const filtered = q
      ? all.filter((p) => p.label.toLowerCase().includes(q))
      : all;
    return filtered.filter((p) => {
      const level = prefs[p.id];
      if (mode === "prefer") return level !== "prefer";
      return level !== "exclude";
    });
  }, [query, prefs, mode]);

  const pickProduct = useCallback(
    (p: MealPlanProductDef) => {
      onPreferenceChange(p.id, mode === "prefer" ? "prefer" : "exclude");
      setQuery("");
      setOpen(false);
      setActiveIndex(-1);
    },
    [mode, onPreferenceChange],
  );

  const onInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveIndex(-1);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex((i) =>
          candidates.length === 0
            ? -1
            : Math.min(i + 1, candidates.length - 1),
        );
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        if (open && candidates.length > 0) {
          const idx = activeIndex >= 0 ? activeIndex : 0;
          const p = candidates[idx];
          if (p) {
            e.preventDefault();
            pickProduct(p);
          }
        }
      }
    },
    [activeIndex, candidates, open, pickProduct],
  );

  useEffect(() => {
    queueMicrotask(() => {
      setActiveIndex(-1);
    });
  }, [query, mode, candidates.length]);

  const emptyListMessage = (() => {
    if (candidates.length > 0) return null;
    if (query.trim()) return mealPlanUx.searchNoResults;
    return mealPlanUx.searchAllAdded;
  })();

  return (
    <div className={`${CALORIE_FORM_PANEL} min-w-0`}>
      <p className="text-sm font-medium text-fg">{mealPlanUx.preferencesTitle}</p>
      <p className="mt-1 text-xs leading-relaxed text-fg-subtle">
        {mealPlanUx.preferencesHint}
      </p>

      <div className="mt-4 space-y-4">
        <div ref={containerRef} className="min-w-0">
          <p
            className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-fg-subtle"
            id={`${baseId}-label`}
          >
            {mealPlanUx.searchLabel}
          </p>

          <div
            className="mb-2 flex gap-1 rounded-lg border border-border/80 bg-page/50 p-0.5"
            role="group"
            aria-label={mealPlanUx.searchLabel}
          >
            <button
              type="button"
              onClick={() => setMode("prefer")}
              className={`touch-manipulation min-h-[44px] flex-1 rounded-md px-2 text-xs font-medium transition-colors ${
                mode === "prefer"
                  ? "bg-accent/20 text-fg ring-1 ring-accent/40"
                  : "text-fg-subtle hover:bg-page/80"
              }`}
            >
              {mealPlanUx.addModePrefer}
            </button>
            <button
              type="button"
              onClick={() => setMode("exclude")}
              className={`touch-manipulation min-h-[44px] flex-1 rounded-md px-2 text-xs font-medium transition-colors ${
                mode === "exclude"
                  ? "bg-warn/15 text-fg ring-1 ring-warn/35"
                  : "text-fg-subtle hover:bg-page/80"
              }`}
            >
              {mealPlanUx.addModeExclude}
            </button>
          </div>

          {/* Только поле + список: иначе `top-full` уезжал ниже из‑за подсказки под инпутом. */}
          <div className="relative">
            <input
              id={comboboxId}
              type="text"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="search"
              role="combobox"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onClick={() => setOpen(true)}
              onKeyDown={onInputKeyDown}
              placeholder={mealPlanUx.searchPlaceholder}
              aria-expanded={open}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-labelledby={`${baseId}-label`}
              className="input-no-spin min-h-[48px] w-full touch-manipulation rounded-lg border border-border/90 bg-page/45 px-3 py-3 text-base text-fg placeholder:text-fg-dim focus:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 sm:text-sm"
            />

            {open ? (
              <ul
                id={listboxId}
                role="listbox"
                aria-label={mealPlanUx.searchLabel}
                className={`meal-plan-product-list ${LISTBOX_UL_STRETCH} absolute left-0 right-0 top-full z-50 mt-1 max-h-[min(18rem,50vh)] overflow-y-auto overscroll-contain rounded-lg border border-border bg-elevated shadow-[0_8px_28px_rgba(0,0,0,0.28)] [-webkit-overflow-scrolling:touch]`}
              >
                {emptyListMessage ? (
                  <li
                    className={`${LISTBOX_LI_STRETCH} block px-3 py-3 text-xs text-fg-muted`}
                  >
                    {emptyListMessage}
                  </li>
                ) : (
                  candidates.map((p, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <li
                        key={p.id}
                        role="presentation"
                        className={`${LISTBOX_LI_STRETCH} flex min-h-[44px] items-center px-3 py-2.5 transition-colors ${
                          isActive
                            ? "bg-accent/15"
                            : "hover:bg-accent/[0.08]"
                        }`}
                        onMouseEnter={() => setActiveIndex(idx)}
                      >
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          className="touch-manipulation block w-full bg-transparent p-0 text-left text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/35"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => pickProduct(p)}
                        >
                          {p.label}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            ) : null}
          </div>

          <p className="mt-1.5 text-xs text-fg-dim">{mealPlanUx.searchHintEmpty}</p>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
            {mealPlanUx.chipsPreferTitle}
          </p>
          {preferIds.length === 0 ? (
            <p className="text-xs text-fg-dim">—</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {preferIds.map((id) => {
                const def = mealPlanProductDefById(id);
                if (!def) return null;
                return (
                  <Chip
                    key={id}
                    label={def.label}
                    variant="prefer"
                    removeAria={mealPlanUx.chipRemovePreferAria}
                    onRemove={() => onPreferenceChange(id, "neutral")}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
            {mealPlanUx.chipsExcludeTitle}
          </p>
          {excludeIds.length === 0 ? (
            <p className="text-xs text-fg-dim">—</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {excludeIds.map((id) => {
                const def = mealPlanProductDefById(id);
                if (!def) return null;
                return (
                  <Chip
                    key={id}
                    label={def.label}
                    variant="exclude"
                    removeAria={mealPlanUx.chipRemoveExcludeAria}
                    onRemove={() => onPreferenceChange(id, "neutral")}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
