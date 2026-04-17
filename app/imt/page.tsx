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
import { ArticleShell, AdSlot } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import { whoBmiRu, whoOverweightRu } from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";
import { NN } from "@/lib/typography";

export const metadata: Metadata = buildArticleMetadata("/imt/");

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "ИМТ", href: "/imt/" },
];

export default function ImtPage() {
  return (
    <>
      <JsonLd data={buildArticleWebPageJsonLd("/imt/")} />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
        <h1>Индекс массы тела (ИМТ)</h1>
        <ArticleWhatIsBlurb path="/imt/" />
        <ArticleLeadSummary>
          <p>
            <strong>ИМТ</strong> = вес (кг) / рост² (м). Это быстрый способ
            понять, в какой диапазон массы тела попадает взрослый человек по
            шкале ВОЗ.
          </p>
          <p>
            Но ИМТ — это <strong>скрининговый</strong> показатель, а не диагноз.
            Он не показывает состав тела и не заменяет очную оценку здоровья.
          </p>
        </ArticleLeadSummary>

        <AdSlot id="ad-imt-top" />

        <h2>Что показывает ИМТ</h2>
        <ArticleCardGrid>
          <ArticleCard eyebrow="Для чего полезен" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Быстро показывает, выходит ли масса тела за типичный диапазон для взрослых.
          </ArticleCard>
          <ArticleCard eyebrow="Для чего не подходит" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Не определяет качество состава тела и не отвечает сам по себе на вопрос о здоровье.
          </ArticleCard>
        </ArticleCardGrid>

        <h2>Формула расчёта</h2>
        <ArticleHighlight eyebrow="Формула">
          <p className="mt-3 rounded-xl border border-border/70 bg-page/40 px-4 py-4 text-sm font-medium leading-7 text-fg">
            ИМТ = вес (кг) / рост² (м)
          </p>
          <p className="mt-4 text-sm leading-6 text-fg-muted">
            Пример: вес{NN}75 кг, рост{NN}1,75 м. ИМТ = 75 / (1,75 × 1,75) ≈{" "}
            <strong className="text-fg">24,5</strong>.
          </p>
        </ArticleHighlight>

        <h2>Диапазоны ВОЗ для взрослых</h2>
        <ArticleCardGrid>
          <ArticleCard title="Менее 16,0">Выраженный дефицит массы</ArticleCard>
          <ArticleCard title="16,0–17,9">Умеренный дефицит</ArticleCard>
          <ArticleCard title="18,0–18,4">Лёгкий дефицит</ArticleCard>
          <ArticleCard title="18,5–24,9" tone="accent">
            Нормальный диапазон
          </ArticleCard>
          <ArticleCard title="25,0–29,9">Предожирение</ArticleCard>
          <ArticleCard title="30,0–34,9">Ожирение I степени</ArticleCard>
          <ArticleCard title="35,0–39,9">Ожирение II степени</ArticleCard>
          <ArticleCard title="40,0 и более" tone="warn">
            Ожирение III степени
          </ArticleCard>
        </ArticleCardGrid>
        <p>
          Пороговые значения приведены в духе классификации ВОЗ; актуальные
          формулировки — на страницах{" "}
          <a
            href={whoBmiRu.href}
            className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
            target="_blank"
            rel="noopener noreferrer"
          >
            ВОЗ (RU)
          </a>{" "}
          и{" "}
          <a
            href={whoOverweightRu.href}
            className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
            target="_blank"
            rel="noopener noreferrer"
          >
            ВОЗ — избыточный вес и ожирение (RU)
          </a>
          .
        </p>

        <h2>Когда ИМТ вводит в заблуждение</h2>
        <div className="callout">
          <p>
            ИМТ не учитывает состав тела: долю мышц, жира, воды и костную
            плотность. Поэтому его нельзя использовать как единственный критерий.
          </p>
        </div>
        <ArticleCardGrid>
          <ArticleCard title="Спортсмены">
            Высокая мышечная масса может уводить ИМТ в зону «предожирения» при нормальном проценте жира.
          </ArticleCard>
          <ArticleCard title="Пожилые люди">
            Нормальный ИМТ может скрывать саркопению, то есть потерю мышечной массы.
          </ArticleCard>
          <ArticleCard title="Дети и подростки">
            Для них используют отдельные нормативы и центильные таблицы, а не взрослые диапазоны.
          </ArticleCard>
          <ArticleCard title="Беременность">
            В этот период ИМТ не интерпретируют по стандартной взрослой шкале.
          </ArticleCard>
          <ArticleCard title="Разные группы населения" className="sm:col-span-2">
            Для части популяций пороги риска могут быть ниже стандартных значений ВОЗ для взрослых.
          </ArticleCard>
        </ArticleCardGrid>

        <AdSlot id="ad-imt-mid" />

        <h2>Что смотреть вместе с ИМТ</h2>
        <ArticleCardGrid columns={3}>
          <ArticleCard title="Окружность талии">
            Помогает оценить риск висцерального жира и метаболических нарушений.
          </ArticleCard>
          <ArticleCard title="Талия / рост">
            Иногда полезнее одного ИМТ, когда важно распределение жира.
          </ArticleCard>
          <ArticleCard title="Состав тела">
            При возможности полезно понимать процент жира и мышечную массу, а не только общий вес.
          </ArticleCard>
        </ArticleCardGrid>

        <h2>Часто задаваемые вопросы</h2>
        <ArticleFaq
          items={[
            {
              question: "ИМТ 26 — это уже обязательно нужно худеть?",
              answer:
                "Не обязательно. Это ориентир для наблюдения, а не диагноз. Важны анализы, самочувствие, окружность талии и образ жизни.",
            },
            {
              question: "Почему у спортсмена ИМТ может быть высоким?",
              answer:
                "Потому что ИМТ считает только рост и вес. Если большая доля веса — это мышцы, показатель может выглядеть завышенным.",
            },
            {
              question: "Какой ИМТ считается лучшим для здоровья?",
              answer:
                "Для большинства взрослых ориентируются на нормальный диапазон ВОЗ, но итоговая оценка всё равно зависит от возраста и состава тела.",
            },
          ]}
        />

        <YmylWhenDoctorBlock />

        <div className="article-cta">
          <Link href="/#calc-extra">Рассчитать ИМТ онлайн →</Link>
        </div>

        <ArticleSources
          intro="Оставил официальные русскоязычные страницы ВОЗ по ИМТ и избыточному весу."
          items={[whoBmiRu, whoOverweightRu]}
        />

        <h2>Связанные материалы</h2>
        <ul>
          <li>
            <Link href="/#calc-main">Калькулятор калорий и КБЖУ на главной</Link>
          </li>
          <li>
            <Link href="/bmr-i-tdee/">Что такое BMR и TDEE</Link>
          </li>
          <li>
            <Link href="/deficit-kalorij/">Дефицит и набор веса</Link>
          </li>
          <li>
            <Link href="/mifflin-san-zheor/">Формула Миффлина — Сан Жеора</Link>
          </li>
        </ul>
      </ArticleShell>
    </>
  );
}
