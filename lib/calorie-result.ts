/**
 * Сборка «результата калькулятора»: числа + человекочитаемые шаги для блока «Как посчитали».
 * Отделено от `calories.ts`, чтобы математика оставалась минимальной, а текст/шаги можно
 * было менять без риска сломать формулы.
 */
import { ACTIVITY_LEVELS } from "@/constants/pal";
import type { ActivityIndex } from "@/constants/pal";
import {
  bmrMifflin,
  getPal,
  macrosFromKcal,
  roundKcal,
  tdeeFromBmr,
  type Sex,
} from "@/lib/calories";

export type CalorieExplanationStep = { title: string; detail: string };

export type CalorieCalculationResult = {
  bmr: number;
  bmrRounded: number;
  tdee: number;
  pal: number;
  palLabel: string;
  steps: CalorieExplanationStep[];
  macros: ReturnType<typeof macrosFromKcal>;
};

export function buildCalorieResult(
  sex: Sex,
  ageYears: number,
  heightCm: number,
  weightKg: number,
  activity: ActivityIndex,
  palOverride: number | null,
): CalorieCalculationResult {
  const pal = getPal(activity, palOverride);
  const palLabel =
    palOverride != null
      ? `Уровень движения взят из ссылки — смените вариант в списке «Обычная активность в жизни», чтобы сбросить.`
      : `Учтён выбранный образ жизни: ${ACTIVITY_LEVELS[activity].label}`;

  const bmr = bmrMifflin({
    sex,
    weightKg,
    heightCm,
    ageYears,
  });
  const bmrRounded = roundKcal(bmr);
  const tdeeRaw = tdeeFromBmr(bmr, pal);
  const tdee = roundKcal(tdeeRaw);

  const sexPart =
    sex === "m"
      ? `10×${weightKg} + 6,25×${heightCm} − 5×${ageYears} + 5`
      : `10×${weightKg} + 6,25×${heightCm} − 5×${ageYears} − 161`;

  const steps: CalorieExplanationStep[] = [
    {
      title: "Расход в покое (формула Миффлина — Сан Жеора)",
      detail: `${sexPart} ≈ ${bmr.toFixed(1)} ккал в сутки, после округления: ${bmrRounded} ккал.`,
    },
    {
      title: "Норма с учётом движения",
      detail: `${bmrRounded} × коэффициент ${pal} ≈ ${tdeeRaw.toFixed(1)} ккал, после округления: ${tdee} ккал в сутки.`,
    },
  ];

  return {
    bmr,
    bmrRounded,
    tdee,
    pal,
    palLabel,
    steps,
    macros: macrosFromKcal(tdee),
  };
}
