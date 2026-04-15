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
  return (
    <>
      {foodCalorieCategories.map((cat) => {
        const kcalHeader =
          cat.kcalUnit === "per100ml" ? "ккал / 100мл" : "ккал / 100г*";
        return (
          <section
            key={cat.id}
            id={cat.id}
            className="scroll-mt-[var(--app-scroll-anchor-offset)]"
          >
            <h2>{cat.title}</h2>
            {cat.intro ? <p>{cat.intro}</p> : null}
            <div className="min-w-0 overflow-x-auto overscroll-x-contain rounded-lg border border-border [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[min(100%,18rem)] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-accent/10">
                    <th className="py-2.5 pl-3 pr-2 font-medium text-accent">
                      Продукт
                    </th>
                    <th className="whitespace-nowrap py-2.5 pr-2 font-medium text-accent">
                      {kcalHeader}
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
          100{NN}г.
        </p>
      ) : null}
    </>
  );
}
