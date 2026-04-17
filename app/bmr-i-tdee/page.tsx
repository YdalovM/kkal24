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
import {
  faoWhoUnuHumanEnergy2004,
  frankenfieldMifflinDoi,
  nhsCaloriesOverview,
  whoHealthyDietRu,
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";
import { NN } from "@/lib/typography";

export const metadata: Metadata = buildArticleMetadata("/bmr-i-tdee/");

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "BMR и TDEE", href: "/bmr-i-tdee/" },
];

export default function BmrTdeePage() {
  return (
    <>
      <JsonLd data={buildArticleWebPageJsonLd("/bmr-i-tdee/")} />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
        <h1>BMR и TDEE — базальный обмен и суточная норма калорий</h1>
        <ArticleWhatIsBlurb path="/bmr-i-tdee/" />
        <ArticleLeadSummary>
          <p>
            <strong>BMR</strong> — это расход энергии в покое.{" "}
            <strong>TDEE</strong> — суточная норма с учётом обычной активности.
            Одна цифра отвечает на вопрос «сколько организм тратит без движения»,
            вторая — «сколько примерно нужно на день».
          </p>
          <p>
            Для бытового расчёта это удобная связка: сначала считают BMR, затем
            переводят его в TDEE через коэффициент активности. Ниже — короткие
            определения, формула и ориентиры по PAL.
          </p>
        </ArticleLeadSummary>

        <AdSlot id="ad-bmr-top" />

        <h2>Что такое BMR и TDEE</h2>
        <ArticleCardGrid>
          <ArticleCard eyebrow="BMR" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Базальный обмен: энергия на дыхание, работу сердца, почек,
            поддержание температуры тела и другие процессы в полном покое.
          </ArticleCard>
          <ArticleCard eyebrow="TDEE" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Суточные энергозатраты с учётом образа жизни: шагов, работы,
            тренировок и общего движения в течение дня.
          </ArticleCard>
        </ArticleCardGrid>

        <h2>BMR — базальный обмен</h2>
        <p>
          <strong>BMR (Basal Metabolic Rate)</strong> — энергия, которую
          организм расходует в состоянии полного покоя: на дыхание, поддержание
          температуры тела, работу сердца, почек и других органов. Грубо говоря
          — это минимум калорий, необходимый для выживания в положении лёжа без
          движения.
        </p>
        <p>
          BMR не включает никакую физическую активность — ни прогулки, ни
          тренировки, ни даже переваривание пищи. Термический эффект питания в
          бытовых оценках часто упрощают до порядка ~10{NN}% от калорийности
          суточного рациона (не от BMR) — величина грубая и зависит от состава
          еды.
        </p>
        <p>
          Рассчитывается по формуле с учётом пола, возраста, роста и веса. Среди
          распространённых уравнений для взрослых чаще используют{" "}
          <Link href="/mifflin-san-zheor/">Миффлина — Сан Жеора</Link>: в
          обзорах у современных взрослых оно в среднем ближе к измерениям, чем
          старые формулы вроде Харриса — Бенедикта, но для конкретного человека
          разброс всё равно остаётся.
        </p>
        <div className="callout">
          <p>
            BMR — не норма калорий на весь день. Для суточной оценки нужен уже
            TDEE, где учтена активность.
          </p>
        </div>

        <h2>TDEE — суточная норма с учётом активности</h2>
        <p>
          <strong>TDEE (Total Daily Energy Expenditure)</strong> — полные
          суточные энергозатраты с учётом образа жизни и физической активности.
          Это более практичная цифра для питания, чем один только BMR.
        </p>
        <ArticleHighlight eyebrow="Формула">
          <p className="mt-3 rounded-xl border border-border/70 bg-page/40 px-4 py-4 text-sm font-medium leading-7 text-fg">
            TDEE = BMR × PAL
          </p>
          <p className="mt-4 text-sm leading-6 text-fg-muted">
            Где <strong className="text-fg">PAL</strong> — коэффициент
            физической активности. Чем активнее образ жизни, тем выше PAL и тем
            больше калорий нужно организму.
          </p>
        </ArticleHighlight>
        <p>
          Где <strong>PAL (Physical Activity Level)</strong> — коэффициент
          физической активности. Его сложнее всего оценить «на глаз», поэтому
          люди чаще ошибаются именно здесь.
        </p>

        <h2>Коэффициенты активности PAL</h2>
        <ArticleCardGrid>
          <ArticleCard
            title="Минимальная"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                1,2
              </span>
            }
          >
            Лежачий режим, восстановление после болезни, почти полное отсутствие движения.
          </ArticleCard>
          <ArticleCard
            title="Сидячая работа"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                1,375
              </span>
            }
          >
            Офис, немного шагов, редкие тренировки 1–2 раза в неделю.
          </ArticleCard>
          <ArticleCard
            title="Умеренная"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                1,55
              </span>
            }
          >
            Тренировки 3–5 дней в неделю плюс заметно более подвижный быт.
          </ArticleCard>
          <ArticleCard
            title="Высокая"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                1,725
              </span>
            }
          >
            Частые тренировки 6–7 дней в неделю или тяжёлый физический труд.
          </ArticleCard>
          <ArticleCard
            title="Очень высокая"
            className="sm:col-span-2"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                1,9
              </span>
            }
          >
            Профессиональный спорт или стабильно тяжёлый физический труд каждый день.
          </ArticleCard>
        </ArticleCardGrid>
        <p>
          Большинство городских жителей попадают в диапазон 1,375–1,55. Если вы
          ходите в зал 3 раза в неделю, но при этом весь день сидите — PAL
          скорее 1,4–1,5, чем 1,725.
        </p>
        <p>
          Эти коэффициенты удобны как <strong>практические ступени</strong> для
          онлайн-калькулятора. В реальности активность непрерывна, поэтому PAL —
          это не пять «официальных полок», а грубая рабочая оценка.
        </p>

        <AdSlot id="ad-bmr-mid" />

        <h2>Как читать результат</h2>
        <ArticleCardGrid columns={3}>
          <ArticleCard title="Поддержание">
            Питание около TDEE. Если вес стабилен 2–3{NN}недели, оценка близка к реальности.
          </ArticleCard>
          <ArticleCard title="Снижение веса">
            <>
              Обычно отталкиваются от TDEE и задают умеренный{" "}
              <Link href="/deficit-kalorij/">дефицит</Link>.
            </>
          </ArticleCard>
          <ArticleCard title="Набор">
            К TDEE добавляют умеренный плюс, чтобы не ускорять набор жира.
          </ArticleCard>
        </ArticleCardGrid>
        <div className="callout">
          <p>
            PAL часто оценивают слишком оптимистично. Даже при одинаковом TDEE
            по формуле реальные траты могут различаться из-за шагов, сна,
            стресса, состава тела и непроизвольной активности.
          </p>
        </div>

        <YmylWhenDoctorBlock />

        <h2>Часто задаваемые вопросы</h2>
        <ArticleFaq
          items={[
            {
              question: "BMR и основной обмен — это одно и то же?",
              answer:
                "В быту почти да. Строго говоря, BMR измеряют в очень жёстких условиях, а основной обмен в широком смысле может пониматься чуть свободнее. Практическая разница обычно невелика.",
            },
            {
              question: "Меняется ли BMR со временем?",
              answer:
                "Да. С возрастом базальный обмен обычно снижается, главным образом из-за уменьшения мышечной массы и изменений в образе жизни.",
            },
            {
              question: "Почему вес не меняется, хотя ем «по норме»?",
              answer: (
                <>
                  Скорее всего, реальная норма немного выше или ниже расчётной.
                  Начните с TDEE, понаблюдайте 2–3{NN}недели и затем
                  корректируйте рацион по реальному результату.
                </>
              ),
            },
            {
              question: "Что чаще ошибается: BMR или PAL?",
              answer:
                "Чаще ошибаются именно в PAL. Формула BMR относительно стабильна, а вот повседневную активность люди обычно переоценивают.",
            },
          ]}
        />

        <div className="article-cta">
          <Link href="/#calc-main">Рассчитать BMR и TDEE онлайн →</Link>
        </div>

        <ArticleSources
          intro="Оставил и русскоязычный обзор ВОЗ, и базовые источники по уравнениям BMR и суточной энергии."
          items={[
            whoHealthyDietRu,
            faoWhoUnuHumanEnergy2004,
            frankenfieldMifflinDoi,
            nhsCaloriesOverview,
          ]}
        />

        <h2>Связанные материалы</h2>
        <ul>
          <li>
            <Link href="/#calc-main">Калькулятор калорий на главной</Link>
          </li>
          <li>
            <Link href="/norma-kalorij-dlya-zhenshchin-i-muzhchin/">
              Норма калорий для женщин и мужчин
            </Link>
          </li>
          <li>
            <Link href="/mifflin-san-zheor/">Формула Миффлина — Сан Жеора</Link>
          </li>
          <li>
            <Link href="/deficit-kalorij/">
              Дефицит и профицит: сколько и как безопасно
            </Link>
          </li>
          <li>
            <Link href="/imt/">Индекс массы тела (ИМТ)</Link>
          </li>
        </ul>
      </ArticleShell>
    </>
  );
}
