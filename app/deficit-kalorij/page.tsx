import type { Metadata } from "next";
import Link from "next/link";
import {
  ArticleCard,
  ArticleCardGrid,
  ArticleFaq,
  ArticleLeadSummary,
  ArticleSources,
  ArticleWhatIsBlurb,
  YmylWhenDoctorBlock,
} from "@/components/article";
import { ArticleShell, AdSlot } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  faoWhoUnuHumanEnergy2004,
  hallEnergyBalancePmc,
  nhsCaloriesOverview,
  whoHealthyDietRu,
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";
import { NN } from "@/lib/typography";

export const metadata: Metadata = buildArticleMetadata("/deficit-kalorij/");

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Дефицит и профицит", href: "/deficit-kalorij/" },
];

export default function DeficitAndSurplusPage() {
  return (
    <>
      <JsonLd data={buildArticleWebPageJsonLd("/deficit-kalorij/")} />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
        <h1>Дефицит и профицит калорий — ориентиры от TDEE</h1>
        <ArticleWhatIsBlurb path="/deficit-kalorij/" />
        <ArticleLeadSummary>
          <p>
            <strong>Дефицит</strong> — это питание ниже суточной траты энергии.
            <strong> Профицит</strong> — выше неё. Обычно обе стратегии считают
            от <Link href="/bmr-i-tdee/">TDEE</Link>, то есть от нормы калорий с
            учётом активности.
          </p>
          <p>
            Ниже — простые формулы, ориентиры по диапазонам и ограничения, из-за
            которых дефицит или профицит не стоит делать слишком агрессивными.
          </p>
        </ArticleLeadSummary>

        <AdSlot id="ad-deficit-top" />

        <h2>Что такое дефицит и профицит</h2>
        <ArticleCardGrid>
          <ArticleCard eyebrow="Дефицит" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Вы едите меньше энергии, чем тратит организм. В ответ тело начинает
            использовать запасы, прежде всего жировую ткань.
          </ArticleCard>
          <ArticleCard eyebrow="Профицит" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Вы едите больше энергии, чем тратит организм. Это база для набора,
            но избыток не всегда идёт в мышцы.
          </ArticleCard>
        </ArticleCardGrid>

        <h2>Как считать от TDEE</h2>
        <ArticleCardGrid>
          <ArticleCard eyebrow="Для похудения" className="bg-elevated/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="rounded-lg border border-border/70 bg-page/35 px-3 py-3 text-sm font-medium leading-6 text-fg">
              Калораж = TDEE − дефицит (ккал/сут)
            </p>
          </ArticleCard>
          <ArticleCard eyebrow="Для набора" className="bg-elevated/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="rounded-lg border border-border/70 bg-page/35 px-3 py-3 text-sm font-medium leading-6 text-fg">
              Калораж = TDEE + профицит (ккал/сут)
            </p>
          </ArticleCard>
        </ArticleCardGrid>
        <p>
          Например, при TDEE 2{NN}100 ккал и дефиците 400 ккал/сут ориентир по
          рациону будет около 1{NN}700 ккал. При TDEE 2{NN}400 ккал и профиците
          300 ккал/сут — около 2{NN}700 ккал.
        </p>
        <div className="callout">
          <p>
            Самая частая ошибка здесь — не в математике, а в завышенной оценке{" "}
            <Link href="/bmr-i-tdee/">TDEE и активности</Link>.
          </p>
        </div>

        <h2 id="deficit">Ориентиры по дефициту</h2>
        <div className="not-prose mt-5 grid gap-3 sm:grid-cols-2">
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">Мягкий</h3>
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                100–250
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Обычно это самый мягкий и переносимый вариант с медленным темпом.
            </p>
          </section>
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">Умеренный</h3>
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                300–500
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Самый частый бытовой диапазон для спокойного старта.
            </p>
          </section>
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">Высокий</h3>
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                500–750
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Результат может идти быстрее, но обычно выше и цена: голод,
              усталость и риск потери мышц.
            </p>
          </section>
          <section className="rounded-xl border border-warn/20 bg-warn/[0.06] p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">Агрессивный</h3>
              <span className="rounded-lg border border-warn/25 bg-page/35 px-2.5 py-1 text-sm font-semibold text-warn">
                750+
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Такой уровень уже ближе к зоне, где нужен медицинский контроль и осторожность.
            </p>
          </section>
        </div>
        <p>
          Цифры здесь приблизительные. Реальная скорость зависит от воды,
          гликогена, состава тела, сна, стресса и того, насколько точно вы
          вообще считаете еду.
        </p>
        <div className="callout">
          <p>
            Правило ~7{NN}700 ккал на 1 кг массы — грубое приближение. На весах
            меняется не только жир, поэтому реальный темп редко идёт по прямой.
          </p>
        </div>

        <h2>Когда с дефицитом лучше осторожно</h2>
        <div className="not-prose mt-5 grid gap-3 sm:grid-cols-2">
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <h3 className="text-sm font-semibold text-fg">Слишком большой минус</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Если дефицит становится слишком большой долей вашего TDEE,
              переносимость и риск срывов обычно ухудшаются.
            </p>
          </section>
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <h3 className="text-sm font-semibold text-fg">Слишком низкий калораж</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Если рацион уходит в очень низкокалорийную зону, становится
              труднее закрывать белок, жиры и микронутриенты. Диеты ниже
              800{NN}ккал/сут — это уже не бытовой режим, а история для врача.
            </p>
          </section>
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <h3 className="text-sm font-semibold text-fg">Плохое самочувствие</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Хроническая усталость, выпадение волос, нарушения цикла — повод остановиться и пересмотреть стратегию.
            </p>
          </section>
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <h3 className="text-sm font-semibold text-fg">Вес уже низкий</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Если <Link href="/imt/">ИМТ</Link> уже в норме или ниже, агрессивный дефицит редко бывает хорошей идеей.
            </p>
          </section>
        </div>

        <AdSlot id="ad-deficit-mid" />

        <h2 id="profic">Профицит и набор веса</h2>
        <p>
          Стартовая точка та же — <Link href="/bmr-i-tdee/">TDEE</Link>. Но
          при наборе проблема обычно не в том, чтобы «есть больше любой ценой», а
          в том, чтобы не превращать профицит в бесконтрольный перекорм.
        </p>
        <div className="not-prose mt-5 grid gap-3 sm:grid-cols-2">
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">Мягкий</h3>
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                100–250
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Часто самый спокойный вариант, особенно если важен контроль качества набора.
            </p>
          </section>
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">Умеренный</h3>
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                300–500
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Часто связывают с более заметным набором, но многое зависит от тренировок и сна.
            </p>
          </section>
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">Высокий</h3>
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                500–750
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Растёт риск жира, дискомфорта ЖКТ и ощущения «ем много, а качество набора не растёт».
            </p>
          </section>
          <section className="rounded-xl border border-warn/20 bg-warn/[0.06] p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">Очень высокий</h3>
              <span className="rounded-lg border border-warn/25 bg-page/35 px-2.5 py-1 text-sm font-semibold text-warn">
                750+
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Обычно имеет смысл только под контролем специалиста и при очень понятной задаче.
            </p>
          </section>
        </div>
        <p>
          При наборе вес на старте часто растёт не только из-за жира, но и из-за
          воды и гликогена. Поэтому цифра на весах в первые недели не всегда
          показывает качество профицита.
        </p>
        <div className="callout">
          <p>
            То же правило ~7{NN}700 ккал здесь ещё грубее, чем при дефиците:
            при наборе доля воды, гликогена и мышц делает расчёт «на кг»
            менее точным.
          </p>
        </div>

        <h2>Когда профицит — плохая идея</h2>
        <div className="not-prose mt-5 grid gap-3 sm:grid-cols-2">
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <h3 className="text-sm font-semibold text-fg">Уже есть избыток веса</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Если <Link href="/imt/">ИМТ</Link> уже в зоне избыточного веса или ожирения, лишние калории чаще идут в жир.
            </p>
          </section>
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4">
            <h3 className="text-sm font-semibold text-fg">Нет регулярной нагрузки</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Без силового стимула избыток энергии реже превращается в желаемый качественный набор.
            </p>
          </section>
          <section className="rounded-xl border border-border/80 bg-elevated/35 p-4 sm:col-span-2">
            <h3 className="text-sm font-semibold text-fg">Слишком большой плюс</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">
              Очень крупный профицит чаще добавляет лишний жир и хуже
              переносится, чем реально помогает качественному набору.
            </p>
          </section>
        </div>

        <YmylWhenDoctorBlock />

        <h2>Часто задаваемые вопросы</h2>
        <ArticleFaq
          items={[
            {
              question: "Нужно ли считать калории каждый день?",
              answer: (
                <>
                  Не обязательно, но систематический подсчёт часто помогает
                  лучше контролировать дефицит или профицит. Главный ориентир
                  всё равно — динамика веса и самочувствие за 2–4{NN}недели.
                </>
              ),
            },
            {
              question: "Почему вес стоит при дефиците?",
              answer:
                "Частые причины — задержка воды, адаптивное снижение расхода и ошибки в подсчёте порций. Короткий отрезок на весах редко даёт полную картину.",
            },
            {
              question: "Можно ли делать большой дефицит периодически?",
              answer:
                "Для большинства людей умеренный стабильный дефицит переносится лучше и предсказуемее, чем резкие качели с жёсткими ограничениями.",
            },
            {
              question: "«Грязный» и «чистый» набор — в чём разница?",
              answer:
                "В быту под «грязным» набором понимают большой профицит без контроля качества еды, а под «чистым» — умеренный плюс с акцентом на белок, клетчатку и режим.",
            },
            {
              question: "Почему ем сверх нормы, а вес не растёт?",
              answer:
                "Часто причина в завышенной оценке TDEE, недосчёте порций, высокой непроизвольной активности, стрессе или плохом сне.",
            },
            {
              question: "Нужен ли набор всем с низким ИМТ?",
              answer:
                "Не всегда. Иногда важнее состав тела, гормональный фон и причины низкого веса, а не сама цифра на калькуляторе.",
            },
          ]}
        />

        <div className="article-cta">
          <Link href="/#calc-main">Рассчитать норму калорий (TDEE) на главной →</Link>
        </div>

        <ArticleSources
          intro="Оставил русскоязычный обзор ВОЗ и базовые источники по энергетическому балансу и суточной потребности."
          items={[
            whoHealthyDietRu,
            faoWhoUnuHumanEnergy2004,
            hallEnergyBalancePmc,
            nhsCaloriesOverview,
          ]}
        />

        <h2>Связанные материалы</h2>
        <ul>
          <li>
            <Link href="/bmr-i-tdee/">Что такое BMR и TDEE</Link>
          </li>
          <li>
            <Link href="/imt/">Индекс массы тела (ИМТ)</Link>
          </li>
          <li>
            <Link href="/norma-vody/">Норма воды в день</Link>
          </li>
          <li>
            <Link href="/mifflin-san-zheor/">Формула Миффлина — Сан Жеора</Link>
          </li>
        </ul>
      </ArticleShell>
    </>
  );
}
