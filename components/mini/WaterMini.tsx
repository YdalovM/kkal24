"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { waterMlRoughDaily } from "@/lib/mini-calculations";
import {
  MINI_HEADING_MARK,
  MINI_HEADING_ROW,
  MINI_INPUT_CLASS,
  MINI_SECTION_CLASS,
} from "@/components/mini/mini-field-classes";
import { MiniAccordion } from "@/components/mini/MiniAccordion";
import { useMainFormToMiniSync } from "@/contexts/main-form-to-mini-sync";
import { calculatorUx } from "@/content/calculator-ux";

export function WaterMini() {
  const ux = calculatorUx.miniWater;
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
        {ux.title}
      </h2>
      <label className="flex max-w-xs flex-col gap-1 text-sm">
        {ux.fieldLabel}
        <input
          className={MINI_INPUT_CLASS}
          type="number"
          value={w}
          onChange={(e) => setW(e.target.value)}
        />
      </label>
      {ml != null && (
        <p className="mt-3 text-sm text-fg-muted">
          {ux.resultBefore}
          <strong className="font-semibold text-accent">{ml}</strong>
          {ux.resultAfter}
        </p>
      )}
      <MiniAccordion summary={ux.aboutSummary}>
        <p className="text-pretty text-fg-muted">{ux.lead}</p>
        <p className="text-pretty text-fg-muted">{ux.extraNote}</p>
        <p className="text-pretty text-sm text-fg-muted">
          <Link
            href={ux.readMoreHref}
            className="font-medium text-accent underline-offset-2 hover:underline"
          >
            {ux.readMore}
          </Link>
        </p>
      </MiniAccordion>
    </section>
  );
}
