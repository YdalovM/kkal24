import type { Metadata } from "next";
import Link from "next/link";
import {
  ArticleLeadSummary,
  ArticleSources,
  ArticleWhatIsBlurb,
  YmylWhenDoctorBlock,
} from "@/components/article";
import { FoodCalorieTables } from "@/components/food/FoodCalorieTables";
import { ArticleShell, AdSlot } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  usdaFoodDataCentral,
  whoHealthyDietRu,
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";
import { NN } from "@/lib/typography";

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
            После расчёта <Link href="/bmr-i-tdee/">суточной нормы (TDEE)</Link>{" "}
            удобно сопоставить её с едой: в таблицах ниже —{" "}
            <strong>ориентиры в ккал на 100 г</strong> готового продукта (для
            напитков — на 100 мл).
          </p>
          <p>
            Реальная калорийность зависит от рецепта, сорта, жирности и
            производителя: для точного учёта ориентируйтесь на{" "}
            <strong>этикетку</strong> и вес порции (весы или мерная посуда).
          </p>
        </ArticleLeadSummary>
        <p>
          Если нужна сама норма на день, откройте{" "}
          <Link href="/#calc-main">калькулятор на главной</Link> — эта страница
          не подменяет расчёт, а помогает грубо оценить продукты вроде макарон,
          тортов или сока в сравнении с вашим TDEE. Разнести суточные ккал по
          завтраку, обеду и ужину можно в{" "}
          <Link href="/kalkulyator-pitaniya/">калькуляторе питания</Link>.
        </p>

        <AdSlot id="ad-kkal-produkty-top" />

        <h2 id="kak-polzovatsya">Как пользоваться таблицей</h2>
        <p>
          Умножьте ккал на 100{NN}г на массу порции в граммах и разделите на 100.
          Пример: рис отварной ~130{NN}ккал/100{NN}г; порция 180{NN}г ≈{" "}
          <strong>234{NN}ккал</strong> (130 × 180 / 100).
        </p>
        <p>
          Для сравнения: в справке про{" "}
          <Link href="/deficit-kalorij/">дефицит и профицит</Link> те же калории
          считают от TDEE как «бюджет» на день.
        </p>

        <FoodCalorieTables />

        <YmylWhenDoctorBlock />

        <ArticleSources
          intro="По составу продуктов удобно сверяться с открытыми базами и рекомендациями по здоровому питанию (контекст к калориям, не персональная диета)."
          items={[usdaFoodDataCentral, whoHealthyDietRu]}
        />
      </ArticleShell>
    </>
  );
}
