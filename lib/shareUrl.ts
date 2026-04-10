/**
 * Контракт query для предзаполнения и шаринга. Менять имена параметров только с версией API (см. ТЗ).
 */
import {
  ACTIVITY_QUERY_INDEX_MAX,
  CALCULATOR_FORM_LIMITS,
} from "@/constants/calculator";
import type { ActivityIndex } from "@/constants/pal";
import type { Sex } from "@/lib/calories";

export type ParsedQuery = {
  sex?: Sex;
  age?: number;
  height?: number;
  weight?: number;
  activity?: ActivityIndex;
  pal?: number;
};

const { age: ageL, heightCm: hL, weightKg: wL, pal: palL } =
  CALCULATOR_FORM_LIMITS;

function parseIntBounded(
  raw: string | null,
  min: number,
  max: number,
): number | undefined {
  if (raw === null || raw === "") return undefined;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < min || n > max) return undefined;
  return n;
}

function parseFloatBounded(
  raw: string | null,
  min: number,
  max: number,
): number | undefined {
  if (raw === null || raw === "") return undefined;
  const n = Number.parseFloat(raw);
  if (!Number.isFinite(n) || n < min || n > max) return undefined;
  return n;
}

/** Парсинг query: `pal` перекрывает `activity` при расчёте (как в ТЗ). */
export function parseShareSearchParams(searchParams: URLSearchParams): ParsedQuery {
  const out: ParsedQuery = {};
  const sexRaw = searchParams.get("sex");
  if (sexRaw === "m" || sexRaw === "f") out.sex = sexRaw;

  const age = parseIntBounded(searchParams.get("age"), ageL.min, ageL.max);
  if (age !== undefined) out.age = age;

  const height = parseFloatBounded(searchParams.get("height"), hL.min, hL.max);
  if (height !== undefined) out.height = height;

  const weight = parseFloatBounded(searchParams.get("weight"), wL.min, wL.max);
  if (weight !== undefined) out.weight = weight;

  const act = parseIntBounded(
    searchParams.get("activity"),
    0,
    ACTIVITY_QUERY_INDEX_MAX,
  );
  if (act !== undefined) out.activity = act as ActivityIndex;

  const pal = parseFloatBounded(searchParams.get("pal"), palL.min, palL.max);
  if (pal !== undefined) out.pal = pal;

  return out;
}

export type SerializeInput = {
  sex: Sex;
  age: number;
  height: number;
  weight: number;
  activity: ActivityIndex;
  /** Если задан — в ссылке только `pal`, без `activity` (приоритет PAL из формы/оверрайда). */
  palOverride?: number | null;
};

export function serializeShareParams(input: SerializeInput): string {
  const p = new URLSearchParams();
  p.set("sex", input.sex);
  p.set("age", String(input.age));
  p.set("height", String(input.height));
  p.set("weight", String(input.weight));
  if (input.palOverride != null && Number.isFinite(input.palOverride)) {
    p.set("pal", String(input.palOverride));
  } else {
    p.set("activity", String(input.activity));
  }
  return p.toString();
}
