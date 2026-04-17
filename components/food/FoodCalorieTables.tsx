import { foodCalorieCategories } from "@/content/food-calorie-reference";
import { NN } from "@/lib/typography";

type FoodCalorieTablesProps = {
  /** Показать сноску про 100 г внизу. */
  showFooterNote?: boolean;
};

/**
 * Справочные таблицы калорийности по категориям — общий блок для
 * `/kkal-produktov/` и `/kalkulyator-pitaniya/`.
 */
export function FoodCalorieTables({
  showFooterNote = true,
}: FoodCalorieTablesProps) {
  const formatMacro = (value: number) =>
    Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".", ",");

  return (
    <>
      {foodCalorieCategories.map((cat) => {
        const kcalHeader =
          cat.kcalUnit === "per100ml" ? "ккал / 100мл" : "ккал / 100г*";
        const bjuHeader =
          cat.kcalUnit === "per100ml" ? "Б / Ж / У на 100мл" : "Б / Ж / У на 100г";
        return (
          <section
            key={cat.id}
            id={cat.id}
            className="scroll-mt-[var(--app-scroll-anchor-offset)]"
          >
            <h2>{cat.title}</h2>
            {cat.intro ? <p>{cat.intro}</p> : null}
            <div className="not-prose mt-5 space-y-2 sm:hidden">
              {cat.rows.map((row) => (
                <section
                  key={row.name}
                  className="rounded-xl border border-border/80 bg-elevated/35 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 text-sm font-medium leading-5 text-fg">
                      {row.name}
                    </h3>
                    <span className="shrink-0 rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold tabular-nums text-accent">
                      {row.kcal100}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
                    {kcalHeader}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-fg-muted">
                    <span className="text-fg-subtle">Б</span> {formatMacro(row.protein100)} г
                    <span className="mx-1.5 text-border">·</span>
                    <span className="text-fg-subtle">Ж</span> {formatMacro(row.fat100)} г
                    <span className="mx-1.5 text-border">·</span>
                    <span className="text-fg-subtle">У</span> {formatMacro(row.carbs100)} г
                  </p>
                  {row.note ? (
                    <p className="mt-2 text-sm leading-5 text-fg-muted">
                      {row.note}
                    </p>
                  ) : null}
                </section>
              ))}
            </div>
            <div className="hidden min-w-0 overflow-x-auto overscroll-x-contain rounded-lg border border-border [-webkit-overflow-scrolling:touch] sm:block">
              <table className="w-full min-w-[min(100%,18rem)] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-accent/10">
                    <th className="py-2.5 pl-3 pr-2 font-medium text-accent">
                      Продукт
                    </th>
                    <th className="whitespace-nowrap py-2.5 pr-2 font-medium text-accent">
                      {kcalHeader}
                    </th>
                    <th className="whitespace-nowrap py-2.5 pr-2 font-medium text-accent">
                      {bjuHeader}
                    </th>
                    <th className="py-2.5 pr-3 font-medium text-accent">
                      Примечание
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cat.rows.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-border/80 last:border-0"
                    >
                      <td className="min-w-0 max-w-[14rem] py-2.5 pl-3 pr-2 align-top text-fg-muted hyphens-auto [overflow-wrap:anywhere] sm:max-w-none">
                        {row.name}
                      </td>
                      <td className="whitespace-nowrap py-2.5 pr-2 align-top font-medium tabular-nums text-accent">
                        {row.kcal100}
                      </td>
                      <td className="whitespace-nowrap py-2.5 pr-2 align-top text-fg-muted">
                        <span className="tabular-nums">
                          Б {formatMacro(row.protein100)}
                        </span>
                        <span className="mx-1 text-border" aria-hidden>
                          ·
                        </span>
                        <span className="tabular-nums">
                          Ж {formatMacro(row.fat100)}
                        </span>
                        <span className="mx-1 text-border" aria-hidden>
                          ·
                        </span>
                        <span className="tabular-nums">
                          У {formatMacro(row.carbs100)}
                        </span>
                      </td>
                      <td className="min-w-0 py-2.5 pr-3 align-top text-fg-muted">
                        {row.note ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      {showFooterNote ? (
        <p className="text-xs text-fg-subtle">
          * Для твёрдых и жидких продуктов (кроме блока «Напитки») — ккал на
          100{NN}г. БЖУ тоже указаны на 100{NN}г или 100{NN}мл; у алкогольных
          напитков часть калорий даёт сам алкоголь, поэтому БЖУ не объясняют всю
          энергетическую ценность.
        </p>
      ) : null}
    </>
  );
}
