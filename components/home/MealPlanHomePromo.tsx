import Link from "next/link";
import { calculatorUx } from "@/content/calculator-ux";

const ux = calculatorUx.homeMealPlanPromo;

/**
 * Заметный призыв на главной: калькулятор питания (не только мелкая ссылка внизу страницы).
 */
export function MealPlanHomePromo() {
  return (
    <aside
      className="relative overflow-hidden rounded-2xl border border-accent/35 bg-gradient-to-br from-accent/[0.12] via-page/[0.35] to-page/[0.08] p-4 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)] sm:p-5"
      aria-labelledby="home-meal-plan-promo-title"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/15 blur-2xl"
        aria-hidden
      />
      <div className="relative min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
          {ux.kicker}
        </p>
        <h2
          id="home-meal-plan-promo-title"
          className="mt-1.5 text-balance text-lg font-bold leading-snug tracking-tight text-fg sm:text-xl"
        >
          {ux.titleLeading}{" "}
          <span className="text-accent">{ux.titleAccent}</span>
        </h2>
        <p className="mt-2 max-w-prose text-pretty text-sm leading-relaxed text-fg-muted">
          {ux.body}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={ux.href}
            className="touch-manipulation inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-center text-sm font-semibold text-on-accent shadow-lg shadow-black/25 transition-[transform,background-color,box-shadow] duration-150 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-auto sm:min-w-[14rem]"
          >
            {ux.cta}
          </Link>
          <span className="text-center text-xs text-fg-subtle sm:text-left">
            {ux.hint}
          </span>
        </div>
      </div>
    </aside>
  );
}
