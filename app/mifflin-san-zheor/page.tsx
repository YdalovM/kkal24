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
  mifflinOriginalDoi,
  whoHealthyDietRu,
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";
import { NN } from "@/lib/typography";

export const metadata: Metadata = buildArticleMetadata("/mifflin-san-zheor/");

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Формула Миффлина — Сан Жеора", href: "/mifflin-san-zheor/" },
];

export default function MifflinPage() {
  return (
    <>
      <JsonLd data={buildArticleWebPageJsonLd("/mifflin-san-zheor/")} />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
        <h1>
          Формула Миффлина{NN}—{NN}Сан{NN}Жеора
        </h1>
        <ArticleWhatIsBlurb path="/mifflin-san-zheor/" />
        <ArticleLeadSummary>
          <p>
            Формула <strong>Миффлина — Сан Жеора</strong> оценивает{" "}
            <strong>BMR</strong> — базовый расход энергии в покое — по полу,
            возрасту, росту и весу. Это не норма калорий на весь день, а
            стартовая оценка обмена без учёта обычной активности.
          </p>
          <p>
            У современных взрослых это уравнение часто используют как
            практичный ориентир. Ниже — сами уравнения, короткий пример
            расчёта и главные ограничения, из-за которых цифру не стоит
            считать точной.
          </p>
        </ArticleLeadSummary>

        <AdSlot id="ad-mifflin-top" />

        <h2>Что считает формула</h2>
        <p>
          Формула оценивает <strong>BMR</strong> — минимальный расход энергии в
          полном покое. Это калории «на существование»: дыхание, работа сердца,
          поддержание температуры тела и базовые процессы организма.
        </p>
        <p>
          Она учитывает пол, возраст, рост и вес, но не видит напрямую долю
          мышц и жира, лекарства, болезни, качество сна и генетику. Поэтому
          итог всегда остаётся приближением.
        </p>
        <div className="callout">
          <p>
            BMR — это не рацион на день. Для суточной нормы используют уже{" "}
            <Link href="/bmr-i-tdee/">TDEE с учётом активности</Link>.
          </p>
        </div>

        <h2>Уравнения для мужчин и женщин</h2>
        <ArticleCardGrid>
          <ArticleCard eyebrow="Мужчины" className="bg-elevated/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="rounded-lg border border-border/70 bg-page/35 px-3 py-3 text-sm font-medium leading-6 text-fg">
              10 × вес(кг) + 6,25 × рост(см) − 5 × возраст(лет) + 5
            </p>
          </ArticleCard>
          <ArticleCard eyebrow="Женщины" className="bg-elevated/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="rounded-lg border border-border/70 bg-page/35 px-3 py-3 text-sm font-medium leading-6 text-fg">
              10 × вес(кг) + 6,25 × рост(см) − 5 × возраст(лет) − 161
            </p>
          </ArticleCard>
        </ArticleCardGrid>
        <p>
          Разница в константах (+5 для мужчин, −161 для женщин) отражает
          усреднённые различия в составе тела у взрослых: мужчины в среднем
          имеют больше мышечной ткани, а она требует больше энергии в покое.
        </p>

        <h2>Пример расчёта на практике</h2>
        <ArticleHighlight eyebrow="Пример">
          <p className="mt-2 text-sm leading-6 text-fg-muted">
            Женщина, 32 года, рост{NN}165{NN}см, вес{NN}62{NN}кг
          </p>
          <p className="mt-4 rounded-xl border border-border/70 bg-page/40 px-4 py-4 text-sm leading-7 text-fg">
            BMR = 10 × 62 + 6,25 × 165 − 5 × 32 − 161 = 620 + 1{NN}031,25 − 160 −
            161 = <strong>1{NN}330{NN}ккал/сут</strong>
          </p>
          <p className="mt-4 text-sm leading-6 text-fg-muted">
            Это энергия только на базовые процессы. Чтобы получить реальную
            суточную норму с учётом активности, BMR умножают на коэффициент PAL —
            подробнее в статье <Link href="/bmr-i-tdee/">про BMR и TDEE</Link>.
          </p>
        </ArticleHighlight>

        <h2>Почему чаще используют именно Миффлина</h2>
        <p>
          Формула Харриса — Бенедикта (1919) создавалась на значительно более
          стройных людях начала XX{NN}века. Обзор Frankenfield et al. (2005)
          показал, что у современных взрослых с нормальным и избыточным весом
          уравнение Миффлина — Сан Жеора чаще попадает в диапазон около
          ±10{NN}% от измеренного расхода энергии, чем ряд старых популярных
          формул. Это не делает его точным для каждого человека, но объясняет,
          почему его часто используют как практическую стартовую оценку.
        </p>

        <h2>Точность и ограничения</h2>
        <div className="callout">
          <p>
            Расчёт остаётся ориентировочным: у отдельных людей отклонение от
            измеренного обмена может составлять около <strong>10{NN}% и более</strong>.
          </p>
        </div>
        <p>
          Для бытового калькулятора это нормальная погрешность. Проблема
          начинается, когда число из формулы принимают за точную лабораторную
          оценку.
        </p>
        <ArticleCardGrid>
          <ArticleCard title="Спортсмены с высокой мышечной массой">
            Формула может занижать обмен, потому что мышечная ткань
            метаболически активнее жировой.
          </ArticleCard>
          <ArticleCard title="Пожилые люди (65+)">
            С возрастом снижается мышечная масса, поэтому формула может слегка
            завышать реальный BMR.
          </ArticleCard>
          <ArticleCard title="Дети и подростки">
            Для них используют специальные педиатрические уравнения; формула
            Миффлина — Сан Жеора для этой группы не валидировалась.
          </ArticleCard>
          <ArticleCard title="Заболевания обмена веществ">
            Реальный обмен может заметно отличаться от расчётного, поэтому
            цифру из калькулятора нельзя считать окончательной нормой.
          </ArticleCard>
        </ArticleCardGrid>

        <AdSlot id="ad-mifflin-mid" />

        <YmylWhenDoctorBlock />

        <h2>Часто задаваемые вопросы</h2>

        <ArticleFaq
          items={[
            {
              question: "Нужно ли запоминать саму формулу?",
              answer:
                "Нет. Для большинства людей полезнее понимать логику: что такое BMR, что именно он показывает и почему результат потом всё равно уточняется по фактической динамике веса.",
            },
            {
              question: "Нужно ли учитывать состав тела?",
              answer: (
                <>
                  Формула не знает, сколько у вас мышц и жира — она работает
                  только с весом, ростом, возрастом и полом. Если два человека
                  весят одинаково, но один атлет, а другой ведёт сидячий образ
                  жизни, их реальный BMR будет различаться. Для более точного
                  расчёта используют формулу Куннингема, которая требует знания
                  процента жира.
                </>
              ),
            },
            {
              question: "Почему цифра может не совпасть с реальностью?",
              answer:
                "Потому что формула не видит шаги, непроизвольную активность, состав тела, сон, стресс и медицинские факторы. Она даёт хороший старт, но не заменяет наблюдение за собой.",
            },
            {
              question: "Почему формула одна, а у мужчин и женщин цифры разные?",
              answer:
                "В уравнениях используются разные константы. Это попытка учесть усреднённые различия в составе тела у взрослых, а не «лучший» и «хуже» вариант формулы.",
            },
            {
              question: "Насколько доверять полученной цифре?",
              answer: (
                <>
                  Считайте её стартовой точкой для наблюдения. Если при питании
                  на уровне TDEE вес стабилен 2–3{NN}недели — значит, расчёт
                  близок к реальности. Если вес растёт или снижается —
                  скорректируйте калораж и проверьте ещё раз.
                </>
              ),
            },
          ]}
        />

        <div className="article-cta">
          <Link href="/#calc-main">
            Рассчитать по формуле Миффлина онлайн →
          </Link>
        </div>

        <ArticleSources
          intro="Оставил и первоисточники по формуле, и русскоязычный обзор ВОЗ для более мягкого входа в тему."
          items={[
            whoHealthyDietRu,
            mifflinOriginalDoi,
            frankenfieldMifflinDoi,
            faoWhoUnuHumanEnergy2004,
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
            <Link href="/bmr-i-tdee/">
              Что такое BMR и TDEE — полный разбор
            </Link>
          </li>
          <li>
            <Link href="/deficit-kalorij/">
              Дефицит и профицит: сколько и как безопасно
            </Link>
          </li>
          <li>
            <Link href="/norma-vody/">Норма воды в день</Link>
          </li>
        </ul>
      </ArticleShell>
    </>
  );
}
