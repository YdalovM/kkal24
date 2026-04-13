"use client";

/**
 * Мост «основная форма → мини-калькуляторы».
 *
 * - Рост/вес: ИМТ, вода (`revision` заставляет эффекты сработать даже при тех же строках).
 * - `lastTdee`: норма на день для блоков «темп похудения» и «темп набора» (доля от TDEE).
 *
 * Вызывается из `useCalorieCalculator` при успешном расчёте и при полном query в URL.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  /** Третий аргумент — суточная норма (TDEE) из основного расчёта; без него поле не меняется. */
  pushFromMainForm: (
    height: string,
    weight: string,
    tdee?: number | null,
  ) => void;
  revision: number;
  lastHeight: string;
  lastWeight: string;
  /** Норма на день из последнего успешного расчёта блока калорий; для оценки доли дефицита/профицита. */
  lastTdee: number | null;
};

const MainFormToMiniSyncContext = createContext<Ctx | null>(null);

export function MainFormToMiniSyncProvider({ children }: { children: ReactNode }) {
  const [revision, setRevision] = useState(0);
  const [lastHeight, setLastHeight] = useState("");
  const [lastWeight, setLastWeight] = useState("");
  const [lastTdee, setLastTdee] = useState<number | null>(null);

  const pushFromMainForm = useCallback(
    (height: string, weight: string, tdee?: number | null) => {
      setLastHeight(height);
      setLastWeight(weight);
      if (tdee !== undefined) {
        setLastTdee(tdee);
      }
      setRevision((r) => r + 1);
    },
    [],
  );

  const value = useMemo(
    () => ({
      pushFromMainForm,
      revision,
      lastHeight,
      lastWeight,
      lastTdee,
    }),
    [pushFromMainForm, revision, lastHeight, lastWeight, lastTdee],
  );

  return (
    <MainFormToMiniSyncContext.Provider value={value}>
      {children}
    </MainFormToMiniSyncContext.Provider>
  );
}

export function useMainFormToMiniSync(): Ctx {
  const v = useContext(MainFormToMiniSyncContext);
  if (!v) {
    throw new Error("useMainFormToMiniSync: оберните блок в MainFormToMiniSyncProvider");
  }
  return v;
}

/** Для хука калькулятора, если провайдера нет — синхронизация не вызывается. */
export function useMainFormToMiniSyncOptional(): Ctx["pushFromMainForm"] | null {
  const v = useContext(MainFormToMiniSyncContext);
  return v?.pushFromMainForm ?? null;
}
