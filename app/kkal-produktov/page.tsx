import type { Metadata } from "next";
import Link from "next/link";
import {
  ArticleCard,
  ArticleCardGrid,
  ArticleFaq,
  ArticleHighlight,
  ArticleLeadSummary,
  ArticleSources,
  ArticleWhatIsBlurb,
  YmylWhenDoctorBlock,
} from "@/components/article";
import { FoodCalorieTables } from "@/components/food/FoodCalorieTables";
import { ArticleShell, AdSlot } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import { foodCalorieCategories } from "@/content/food-calorie-reference";
import {
  usdaFoodDataCentral,
  whoHealthyDietRu,
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";

export const metadata: Metadata = buildArticleMetadata("/kkal-produktov/");

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Калорийность продуктов", href: "/kkal-produktov/" },
];

export default function FoodCaloriesPage() {
  return (
    <>
      <JsonLd data={buildArticleWebPageJsonLd("/kkal-produktov/")} />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
        <h1>Калорийность продуктов</h1>
        <ArticleWhatIsBlurb path="/kkal-produktov/" />
        <ArticleLeadSummary>
          <p>
            В таблицах ниже — <strong>ориентиры в ккал и БЖУ на 100 г</strong>{" "}
            продукта в указанном виде, а для напитков — на 100 мл. Это справка
            для быстрой оценки, а не точная замена упаковке и весам.
          </p>
          <p>
            Реальная калорийность зависит от рецепта, сорта, жирности и
            производителя. Для точного учёта ориентируйтесь на{" "}
            <strong>этикетку</strong> и вес порции.
          </p>
        </ArticleLeadSummary>

        <AdSlot id="ad-kkal-produkty-top" />

        <h2>Что это за таблица</h2>
        <ArticleCardGrid>
          <ArticleCard eyebrow="Что показано" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Усреднённые значения ккал и БЖУ на 100 г или 100 мл, чтобы быстро
            сравнить продукты между собой.
          </ArticleCard>
          <ArticleCard eyebrow="Что не показано" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Точный рецепт, марка, жирность, количество масла при готовке и
            другие детали, которые сдвигают калорийность.
          </ArticleCard>
        </ArticleCardGrid>

        <h2>Категории</h2>
        <div className="not-prose mt-5 flex flex-wrap gap-2">
          {foodCalorieCategories.map((category) => (
            <Link
              key={category.id}
              href={`#${category.id}`}
              className="inline-flex min-h-[40px] items-center rounded-lg border border-border/80 bg-elevated/35 px-3 py-2 text-sm text-fg-muted transition-colors hover:border-accent/30 hover:bg-accent/[0.06] hover:text-fg"
            >
              {category.title}
            </Link>
          ))}
        </div>

        <h2 id="kak-polzovatsya">Как считать порцию</h2>
        <ArticleHighlight eyebrow="Пример">
          <p className="mt-3 rounded-xl border border-border/70 bg-page/40 px-4 py-4 text-sm font-medium leading-7 text-fg">
            Ккал порции = ккал на 100 г × вес порции / 100
          </p>
          <p className="mt-4 text-sm leading-6 text-fg-muted">
            Например, рис отварной ~130 ккал на 100 г. Порция 180 г даст около{" "}
            <strong className="text-fg">234 ккал</strong>.
          </p>
        </ArticleHighlight>
        <p>
          Если нужна сама норма на день, откройте{" "}
          <Link href="/#calc-main">калькулятор на главной</Link>. Разнести
          суточные ккал по приёмам пищи можно в{" "}
          <Link href="/kalkulyator-pitaniya/">калькуляторе питания</Link>.
        </p>

        <div className="callout">
          <p>
            Для продуктов с упаковкой точнее почти всегда смотреть этикетку, а
            не любую усреднённую таблицу из интернета.
          </p>
        </div>

        <h2>Что чаще путают</h2>
        <ArticleCardGrid columns={3}>
          <ArticleCard title="Сухой и готовый вес">
            Крупы и макароны после варки меняют вес за счёт воды, поэтому цифры
            для сухого и готового продукта отличаются.
          </ArticleCard>
          <ArticleCard title="Рецепт блюда">
            Жарка на масле, соусы, сахар и жирность легко меняют калорийность
            одной и той же еды.
          </ArticleCard>
          <ArticleCard title="Размер порции">
            Небольшая ошибка в граммах у орехов, сладостей и масла даёт
            заметную ошибку в ккал.
          </ArticleCard>
        </ArticleCardGrid>

        <FoodCalorieTables />

        <YmylWhenDoctorBlock />

        <h2>Часто задаваемые вопросы</h2>
        <ArticleFaq
          items={[
            {
              question: "Почему цифра в таблице не совпадает с упаковкой?",
              answer:
                "Потому что в таблице усреднённое значение, а на упаковке указаны данные конкретного продукта и рецептуры.",
            },
            {
              question: "Для круп и макарон смотреть сухой или готовый вес?",
              answer:
                "Зависит от того, что вы измеряете. Если взвешиваете уже готовую порцию, смотрите значения для готового продукта.",
            },
            {
              question: "Можно ли по этой таблице составить рацион на день?",
              answer:
                "Как грубую прикидку — да. Но для полноценного рациона лучше сначала знать свою норму калорий и учитывать реальные порции и этикетки.",
            },
          ]}
        />

        <div className="article-cta">
          <Link href="/kalkulyator-pitaniya/">
            Разнести суточные ккал по приёмам пищи →
          </Link>
        </div>

        <ArticleSources
          intro="Оставил открытую базу состава продуктов и русскоязычный обзор ВОЗ как базовые опоры для справочной страницы."
          items={[usdaFoodDataCentral, whoHealthyDietRu]}
        />

        <h2>Связанные материалы</h2>
        <ul>
          <li>
            <Link href="/#calc-main">Калькулятор калорий на главной</Link>
          </li>
          <li>
            <Link href="/kalkulyator-pitaniya/">
              Калькулятор питания по приёмам
            </Link>
          </li>
          <li>
            <Link href="/bmr-i-tdee/">BMR и TDEE: что это и чем отличаются</Link>
          </li>
          <li>
            <Link href="/deficit-kalorij/">
              Дефицит и профицит калорий
            </Link>
          </li>
        </ul>
      </ArticleShell>
    </>
  );
}
