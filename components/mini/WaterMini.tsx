"use client";

import { useEffect, useMemo, useState } from "react";
import { waterMlRoughDaily } from "@/lib/mini-calculations";
import {
  MINI_HEADING_MARK,
  MINI_HEADING_ROW,
  MINI_INPUT_CLASS,
  MINI_SECTION_CLASS,
} from "@/components/mini/mini-field-classes";
import { useMainFormToMiniSync } from "@/contexts/main-form-to-mini-sync";

export function WaterMini() {
  const [w, setW] = useState("72");
  const { revision, lastWeight } = useMainFormToMiniSync();

  useEffect(() => {
    if (revision < 1) return;
    if (lastWeight !== "") setW(lastWeight);
  }, [revision, lastWeight]);

  const ml = useMemo(() => {
    const weightN = Number.parseFloat(w);
    return waterMlRoughDaily(weightN);
  }, [w]);

  return (
    <section className={MINI_SECTION_CLASS}>
      <h2 className={MINI_HEADING_ROW}>
        <span className={MINI_HEADING_MARK} aria-hidden />
        Вода (грубая оценка)
      </h2>
      <p className="mb-3 text-sm text-fg-muted">
        Распространённое упрощение — около 30–35 мл на кг массы тела; климат,
        нагрузка и болезни сильно меняют потребность.
      </p>
      <label className="flex max-w-xs flex-col gap-1 text-sm">
        Вес, кг
        <input
          className={MINI_INPUT_CLASS}
          type="number"
          value={w}
          onChange={(e) => setW(e.target.value)}
        />
      </label>
      {ml != null && (
        <p className="mt-3 text-sm text-fg-muted">
          Ориентир: ~<strong className="font-semibold text-accent">{ml}</strong> мл
          / сут
          суммарной жидкости (не
          «выпить разом» и не норматив Минздрава для вас лично).
        </p>
      )}
      <details className="mt-3 text-sm text-fg-subtle">
        <summary className="cursor-pointer font-medium text-fg">
          Микро-FAQ
        </summary>
        <p className="mt-2">
          Жажда, цвет мочи и самочувствие — грубые ориентиры. При заболеваниях
          почек, сердца и ряде других состояний норма жидкости обсуждается с
          врачом.
        </p>
      </details>
    </section>
  );
}
