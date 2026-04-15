import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { ArticleSources, YmylWhenDoctorBlock } from "@/components/article";
import { FoodCalorieTables } from "@/components/food/FoodCalorieTables";
import { ArticleShell } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  usdaFoodDataCentral,
  whoHealthyDietRu,
} from "@/content/external-references";
import {
  mealPlanPageFaq,
  mealPlanPageFaqTitle,
} from "@/content/meal-plan-page-seo";
import { buildMealPlanPageJsonLd } from "@/lib/seo-meal-plan-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";
import { NN } from "@/lib/typography";
import styles from "../page.module.css";

/** Отдельный JS-чанк: тяжёлый клиентский виджет не утяжеляет первый бандл страницы на мобильных. */
const MealPlanCalculator = dynamic(
  () =>
    import("@/components/meal-plan/MealPlanCalculator").then(
      (m) => m.MealPlanCalculator,
    ),
);

export const metadata: Metadata = buildArticleMetadata("/kalkulyator-pitaniya/");

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Калькулятор питания", href: "/kalkulyator-pitaniya/" },
];

export default function MealPlanPage() {
  return (
    <>
      <JsonLd data={buildMealPlanPageJsonLd()} />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
        <h1>Калькулятор питания по приёмам</h1>
        <p className="max-w-prose text-pretty text-sm leading-relaxed text-fg-muted sm:text-[0.9375rem]">
          Введите суточные ккал и число приёмов — расчёт откроется в блоке ниже.
          Суточную норму можно посчитать на главной: ссылка под полем «Суточные
          калории». Подробности — внизу страницы в блоке «Частые вопросы».
        </p>

        <div
          data-calorie-widget
          className={`calculator-shell mt-5 min-w-0 rounded-2xl border border-white/[0.08] bg-surface/85 p-4 transition-[border-color,box-shadow] duration-300 sm:mt-8 md:bg-surface/50 md:backdrop-blur-sm md:p-8 ${styles.calculatorShell}`}
        >
          <Suspense
            fallback={
              <div className="flex min-h-[12rem] items-center justify-center rounded-xl border border-border/80 bg-elevated/50 p-8 text-center text-sm text-fg-muted">
                Загрузка калькулятора…
              </div>
            }
          >
            <MealPlanCalculator />
          </Suspense>
        </div>

        <h2
          id="spravochnik-kaloriy"
          className="scroll-mt-[var(--app-scroll-anchor-offset)] mt-12 text-xl font-semibold tracking-tight text-fg"
        >
          Справочник калорийности продуктов
        </h2>
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted">
          Ориентиры в ккал на 100{NN}г (для напитков — на 100{NN}мл). Как перевести
          в граммы порции — в блоке «Как пользоваться таблицей» на странице{" "}
          <Link href="/kkal-produktov/#kak-polzovatsya">калорийности продуктов</Link>
          .
        </p>

        <FoodCalorieTables />

        <section
          id="faq-kalkulyator-pitaniya"
          aria-labelledby="meal-plan-faq-heading"
          className="scroll-mt-[var(--app-scroll-anchor-offset)] mt-12"
        >
          <h2
            id="meal-plan-faq-heading"
            className="text-xl font-semibold tracking-tight text-fg"
          >
            {mealPlanPageFaqTitle}
          </h2>
          <dl className="mt-4 space-y-5">
            {mealPlanPageFaq.map((item) => (
              <div key={item.q}>
                <dt className="text-base font-semibold leading-snug text-fg">
                  {item.q}
                </dt>
                <dd className="mt-2 max-w-prose text-pretty text-sm leading-relaxed text-fg-muted">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <YmylWhenDoctorBlock />

        <ArticleSources
          intro="Состав продуктов и здоровое питание — у открытых баз и ВОЗ; рацион подбирайте с врачом или диетологом при заболеваниях."
          items={[usdaFoodDataCentral, whoHealthyDietRu]}
        />
      </ArticleShell>
    </>
  );
}
