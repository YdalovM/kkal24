"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type BmiBandLabel,
  bmiBand,
  bmiFromMetric,
} from "@/lib/mini-calculations";
import {
  MINI_HEADING_MARK,
  MINI_HEADING_ROW,
  MINI_INPUT_CLASS,
  MINI_SECTION_CLASS,
} from "@/components/mini/mini-field-classes";
import { useMainFormToMiniSync } from "@/contexts/main-form-to-mini-sync";

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

const BMI_LABELS: Record<BmiBandLabel, string> = {
  unknown: "—",
  under: "ниже обычного диапазона (оценка)",
  normal:
    "в диапазоне, который часто обозначают как нормальный (оценка)",
  overweight:
    "выше диапазона, который часто обозначают как избыточный вес (оценка)",
  obese: "в зоне, которую часто относят к ожирению (оценка)",
};

export function BmiMini() {
  const [h, setH] = useState("175");
  const [w, setW] = useState("72");
  const { revision, lastHeight, lastWeight } = useMainFormToMiniSync();

  useEffect(() => {
    if (revision < 1) return;
    if (lastHeight !== "") setH(lastHeight);
    if (lastWeight !== "") setW(lastWeight);
  }, [revision, lastHeight, lastWeight]);

  const bmi = useMemo(() => {
    const heightN = Number.parseFloat(h);
    const weightN = Number.parseFloat(w);
    return bmiFromMetric(weightN, heightN);
  }, [h, w]);

  const band = bmi == null ? "unknown" : bmiBand(bmi);
  const label = BMI_LABELS[band];

  return (
    <section className={MINI_SECTION_CLASS}>
      <h2 className={MINI_HEADING_ROW}>
        <span className={MINI_HEADING_MARK} aria-hidden />
        ИМТ
      </h2>
      <p className="mb-3 text-sm text-fg-muted">
        Индекс массы тела — грубая оценка соотношения веса и роста. Не диагноз;
        интерпретация индивидуальна.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-1 text-sm">
          Рост, см
          <input
            className={MINI_INPUT_CLASS}
            type="number"
            value={h}
            onChange={(e) => setH(e.target.value)}
          />
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm">
          Вес, кг
          <input
            className={MINI_INPUT_CLASS}
            type="number"
            value={w}
            onChange={(e) => setW(e.target.value)}
          />
        </label>
      </div>
      {bmi != null && (
        <p className="mt-3 text-sm text-fg-muted">
          ИМТ ≈ <strong className="font-semibold text-accent">{round1(bmi)}</strong>{" "}
          — {label}
        </p>
      )}
      <details className="mt-3 text-sm text-fg-subtle">
        <summary className="cursor-pointer font-medium text-fg">
          Кратко про ИМТ
        </summary>
        <p className="mt-2">
          Пороговые значения распространены в популяционной статистике; у
          спортсменов и при беременности трактовка может отличаться. Для решений
          о здоровье ориентируйтесь на специалиста.
        </p>
      </details>
    </section>
  );
}
