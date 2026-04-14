/**
 * Оркестрация основного калькулятора (клиент).
 *
 * Зоны ответственности:
 * - Синхронизация формы с `?query` и обратно (`lib/shareUrl.ts`).
 * - Валидация → `buildCalorieResult` → `result`; проброс роста/веса/TDEE в мини-блоки
 *   через `contexts/main-form-to-mini-sync.tsx` (опционально, если виджет в провайдере).
 * - `recalcMessage`: только после ручного `onCalculate`, не при первичной загрузке из URL
 *   (чтобы не дублировать объявления скринридеру).
 *
 * ИИ: новые поля формы — см. `docs/ARCHITECTURE.md`; не импортируйте сюда компоненты.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  CALCULATOR_FORM_LIMITS,
  CALORIE_RESULT_HEADING_ANCHOR_ID,
  DEFAULT_ACTIVITY_INDEX,
} from "@/constants/calculator";
import {
  EPHEMERAL_FORM_HINT_MS,
  RECALC_SUCCESS_TOAST_MS,
} from "@/constants/ui-behavior";
import type { ActivityIndex } from "@/constants/pal";
import { ageBucket, reachGoal } from "@/lib/analytics";
import {
  buildCalorieResult,
  type CalorieCalculationResult,
} from "@/lib/calorie-result";
import {
  loadCalorieFormFromStorage,
  saveCalorieFormToStorage,
} from "@/lib/calorie-form-storage";
import { validateCalorieFormFields } from "@/lib/calorie-form-validation";
import { getPal, type Sex } from "@/lib/calories";
import {
  parseShareSearchParams,
  serializeShareParams,
  stableSearchParamsKey,
} from "@/lib/shareUrl";
import type { CalorieFieldErrors } from "@/lib/calorie-form-validation";
import { calculatorUx } from "@/content/calculator-ux";
import { useMainFormToMiniSyncOptional } from "@/contexts/main-form-to-mini-sync";

export function useCalorieCalculator() {
  const searchParams = useSearchParams();
  /**
   * Каноническая строка query: и порядок ключей нормализован (см. `stableSearchParamsKey`),
   * иначе `toString()` между рендерами может «прыгать» → эффект синхронизации с URL
   * срабатывает снова и снова → падение вкладки / `__next_error__` на проде.
   */
  const searchParamsKey = stableSearchParamsKey(searchParams);
  const pathname = usePathname();
  const pushToMinis = useMainFormToMiniSyncOptional();
  const pushToMinisRef = useRef(pushToMinis);
  pushToMinisRef.current = pushToMinis;

  const [sex, setSex] = useState<Sex>("m");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<ActivityIndex>(DEFAULT_ACTIVITY_INDEX);
  const [palOverride, setPalOverride] = useState<number | null>(null);

  const [errors, setErrors] = useState<CalorieFieldErrors>({});
  const [result, setResult] = useState<CalorieCalculationResult | null>(null);
  const [shareHint, setShareHint] = useState<string | null>(null);
  const [recalcMessage, setRecalcMessage] = useState<string | null>(null);

  const prevTdeeAfterUserCalcRef = useRef<number | null>(null);
  const recalcClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (recalcClearTimerRef.current) {
        clearTimeout(recalcClearTimerRef.current);
      }
    };
  }, []);

  const applyParsedQuery = useCallback(
    (parsed: ReturnType<typeof parseShareSearchParams>) => {
      if (parsed.sex) setSex(parsed.sex);
      if (parsed.age !== undefined) setAge(String(parsed.age));
      if (parsed.height !== undefined) setHeight(String(parsed.height));
      if (parsed.weight !== undefined) setWeight(String(parsed.weight));
      if (parsed.activity !== undefined) setActivity(parsed.activity);
      if (parsed.pal !== undefined) {
        setPalOverride(parsed.pal);
      } else if (parsed.activity !== undefined) {
        setPalOverride(null);
      }
    },
    [],
  );

  useEffect(() => {
    const parsed = parseShareSearchParams(
      new URLSearchParams(searchParamsKey),
    );
    const hasQuery =
      parsed.sex != null ||
      parsed.age != null ||
      parsed.height != null ||
      parsed.weight != null ||
      parsed.activity != null ||
      parsed.pal != null;

    if (hasQuery) {
      applyParsedQuery(parsed);
      if (
        parsed.sex != null &&
        parsed.age != null &&
        parsed.height != null &&
        parsed.weight != null
      ) {
        const act = (parsed.activity ?? DEFAULT_ACTIVITY_INDEX) as ActivityIndex;
        const palO = parsed.pal ?? null;
        try {
          const built = buildCalorieResult(
            parsed.sex,
            parsed.age,
            parsed.height,
            parsed.weight,
            act,
            palO,
          );
          setResult(built);
          pushToMinisRef.current?.(
            String(parsed.height),
            String(parsed.weight),
            built.tdee,
          );
          prevTdeeAfterUserCalcRef.current = built.tdee;
        } catch {
          setResult(null);
          prevTdeeAfterUserCalcRef.current = null;
        }
      } else {
        setResult(null);
        prevTdeeAfterUserCalcRef.current = null;
      }
    } else {
      const saved = loadCalorieFormFromStorage();
      if (saved) {
        if (saved.sex) setSex(saved.sex);
        if (saved.age != null) setAge(saved.age);
        if (saved.height != null) setHeight(saved.height);
        if (saved.weight != null) setWeight(saved.weight);
        if (saved.activity != null) setActivity(saved.activity);
        if (saved.palOverride !== undefined) setPalOverride(saved.palOverride);
      }
      setResult(null);
      prevTdeeAfterUserCalcRef.current = null;
    }
  }, [applyParsedQuery, searchParamsKey]);

  const onCalculate = useCallback(() => {
    setErrors({});
    const validated = validateCalorieFormFields({ sex, age, height, weight });
    if (!validated.ok) {
      setErrors(validated.errors);
      setResult(null);
      prevTdeeAfterUserCalcRef.current = null;
      return;
    }

    const { ageN, heightN, weightN, sex: sexV } = validated.values;

    const built = buildCalorieResult(
      sexV,
      ageN,
      heightN,
      weightN,
      activity,
      palOverride,
    );
    setResult(built);

    const scrollToResultPanel = () => {
      const el = document.getElementById(CALORIE_RESULT_HEADING_ANCHOR_ID);
      if (!el) return;
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      el.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToResultPanel);
    });

    pushToMinis?.(height, weight, built.tdee);

    const prev = prevTdeeAfterUserCalcRef.current;
    prevTdeeAfterUserCalcRef.current = built.tdee;
    const { recalcDone, recalcSameTdee, recalcDelta } = calculatorUx.results;
    let msg: string = recalcDone;
    if (prev !== null && prev !== built.tdee) {
      msg = `${recalcDone} ${recalcDelta.replace("{from}", String(prev)).replace("{to}", String(built.tdee))}`;
    } else if (prev !== null && prev === built.tdee) {
      msg = `${recalcDone} ${recalcSameTdee.replace("{kcal}", String(built.tdee))}`;
    }
    if (recalcClearTimerRef.current) {
      clearTimeout(recalcClearTimerRef.current);
    }
    setRecalcMessage(msg);
    recalcClearTimerRef.current = setTimeout(() => {
      setRecalcMessage(null);
      recalcClearTimerRef.current = null;
    }, RECALC_SUCCESS_TOAST_MS);

    reachGoal("calc_submit", {
      sex: sexV,
      pal: getPal(activity, palOverride),
      age_range: ageBucket(ageN),
      pal_source: palOverride != null ? "override" : "activity",
    });
  }, [activity, palOverride, sex, age, height, weight, pushToMinis]);

  const { age: ageL, heightCm: hL, weightKg: wL } = CALCULATOR_FORM_LIMITS;

  const shareQuery = serializeShareParams({
    sex,
    age: Number.parseInt(age, 10) || ageL.min,
    height: Number.parseFloat(height) || hL.min,
    weight: Number.parseFloat(weight) || wL.min,
    activity,
    palOverride,
  });

  const buildShareUrl = useCallback(
    () =>
      `${typeof window !== "undefined" ? window.location.origin : ""}${pathname}?${shareQuery}`,
    [pathname, shareQuery],
  );

  const onShare = useCallback(async () => {
    const url = buildShareUrl();
    const { shareDialogTitle, shareDialogText } = calculatorUx.form;
    const title = shareDialogTitle;
    const text = shareDialogText;
    setShareHint(null);

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        reachGoal("share_click", { method: "web_share" });
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareHint("Ссылка скопирована в буфер обмена");
      reachGoal("share_click", { method: "clipboard" });
    } catch {
      setShareHint("Не удалось скопировать ссылку");
    }
  }, [buildShareUrl]);

  const onSaveLocal = useCallback(() => {
    saveCalorieFormToStorage({
      sex,
      age,
      height,
      weight,
      activity,
      palOverride,
    });
    setShareHint("Сохранено в этом браузере");
    setTimeout(() => setShareHint(null), EPHEMERAL_FORM_HINT_MS);
  }, [activity, age, height, palOverride, sex, weight]);

  const onActivityChange = useCallback((next: ActivityIndex) => {
    setActivity(next);
    setPalOverride(null);
  }, []);

  return {
    form: {
      sex,
      setSex,
      age,
      setAge,
      height,
      setHeight,
      weight,
      setWeight,
      activity,
      onActivityChange,
      palOverride,
      errors,
      shareHint,
      onCalculate,
      onShare,
      onSaveLocal,
    },
    result,
    recalcMessage,
  };
}
