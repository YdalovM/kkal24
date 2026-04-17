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
  frankenfieldMifflinDoi,
  mifflinOriginalDoi,
  nhsCaloriesOverview,
  whoHealthyDietRu,
  whoOverweightRu,
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";
import { NN } from "@/lib/typography";

export const metadata: Metadata = buildArticleMetadata(
  "/norma-kalorij-dlya-zhenshchin-i-muzhchin/",
);

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  {
    label: "Норма калорий для женщин и мужчин",
    href: "/norma-kalorij-dlya-zhenshchin-i-muzhchin/",
  },
];

export default function CaloriesBySexPage() {
  return (
    <>
      <JsonLd
        data={buildArticleWebPageJsonLd(
          "/norma-kalorij-dlya-zhenshchin-i-muzhchin/",
        )}
      />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
        <h1>Норма калорий для женщин и мужчин: почему расчёт отличается</h1>
        <ArticleWhatIsBlurb path="/norma-kalorij-dlya-zhenshchin-i-muzhchin/" />
        <ArticleLeadSummary>
          <p>
            Разные цифры в калькуляторе для женщин и мужчин — не ошибка, а
            следствие того, как устроены популяционные формулы вроде{" "}
            <Link href="/mifflin-san-zheor/">
              Миффлина — Сан Жеора
            </Link>
            . Пол — один из параметров, но итоговую норму формируют также
            возраст, рост, вес и активность.
          </p>
          <p>
            Поэтому вопрос «сколько калорий нужно женщине» или «сколько калорий
            нужно мужчине» без остальных данных слишком общий. Для практики
            полезнее смотреть не на усреднённые диапазоны, а на свою расчётную
            оценку.
          </p>
        </ArticleLeadSummary>

        <AdSlot id="ad-calories-sex-top" />

        <h2>Почему формула показывает разные значения</h2>
        <p>
          В бытовом смысле причина в среднем составе тела: у мужчин чаще выше
          доля мышечной массы, а мышечная ткань расходует больше энергии в
          покое, чем жировая. Поэтому в формуле для взрослых используются
          разные константы.
        </p>
        <p>
          На практике калькулятор считает не «по полу отдельно», а по набору
          полей сразу: <strong>вес</strong>, <strong>рост</strong>,{" "}
          <strong>возраст</strong>, <strong>пол</strong> и затем{" "}
          <strong>коэффициент активности</strong>. Именно поэтому миниатюрной
          женщине с высокой повседневной активностью иногда нужно больше
          калорий, чем крупному мужчине с сидячим режимом.
        </p>
        <div className="callout">
          <p>
            Пол влияет на расчёт, но не определяет его целиком. Одинаковый рост,
            вес и активность могут значить больше, чем само деление на женщин и
            мужчин по названию.
          </p>
        </div>

        <h2>Что именно считается нормой калорий в день</h2>
        <p>
          Обычно в разговорной речи под нормой понимают{" "}
          <Link href="/bmr-i-tdee/">TDEE</Link> — суточный расход энергии с
          учётом образа жизни. Это не только «обмен в покое», но и бытовая
          активность, шаги, тренировки и часть затрат на переваривание пищи.
        </p>
        <p>
          Поэтому вопрос «сколько калорий в день нужно женщине» или «сколько
          калорий в день нужно мужчине» без роста, веса, возраста и активности
          всегда слишком общий. Коридоры из популярных статей могут дать лишь
          грубую прикидку, но для реального рациона удобнее считать свою цифру.
        </p>

        <h2>Пол влияет, но не отменяет рост, вес и возраст</h2>
        <ArticleCardGrid>
          <ArticleCard title="Пол">
            Меняет константу в формуле BMR у взрослых.
          </ArticleCard>
          <ArticleCard title="Вес">
            Чем больше масса тела, тем выше расход энергии в покое.
          </ArticleCard>
          <ArticleCard title="Рост">
            Более высокий рост обычно повышает расчётную норму.
          </ArticleCard>
          <ArticleCard title="Возраст">
            С возрастом BMR обычно постепенно снижается.
          </ArticleCard>
          <ArticleCard title="Активность" className="sm:col-span-2">
            Влияет уже на TDEE: шаги, работа, тренировки и общий быт в течение дня.
          </ArticleCard>
        </ArticleCardGrid>
        <p>
          Из-за этого сравнивать себя с «подругой такого же веса» или
          «знакомым мужчиной моего роста» мало полезно: даже при похожих данных
          итоговую норму легко сдвигают возраст и реальная активность.
        </p>

        <AdSlot id="ad-calories-sex-mid" />

        <h2>Как читать разницу на практике</h2>
        <ArticleCardGrid columns={3}>
          <ArticleCard title="Поддержание">
            Ориентир — около TDEE, дальше корректировка по фактическому весу и самочувствию.
          </ArticleCard>
          <ArticleCard title="Похудение">
            <>
              Обычно отталкиваются от TDEE и задают умеренный{" "}
              <Link href="/deficit-kalorij/">дефицит</Link>, а не ищут
              «универсальную норму для женщин» или «для мужчин».
            </>
          </ArticleCard>
          <ArticleCard title="Набор">
            К TDEE добавляют умеренный плюс, особенно если цель — не только вес на весах.
          </ArticleCard>
        </ArticleCardGrid>

        <h2>Частые ошибки при сравнении норм</h2>
        <ArticleCardGrid columns={1}>
          <ArticleCard title="Ошибка 1" tone="warn">
            Брать цифры «из таблицы для женщин/мужчин» без учёта роста, веса и возраста.
          </ArticleCard>
          <ArticleCard title="Ошибка 2" tone="warn">
            Выбирать слишком высокий коэффициент активности только из-за пары тренировок в неделю.
          </ArticleCard>
          <ArticleCard title="Ошибка 3" tone="warn">
            Путать <strong className="text-fg">BMR</strong> с полной нормой в день.
          </ArticleCard>
          <ArticleCard title="Ошибка 4" tone="warn">
            Считать, что разница между женщинами и мужчинами важнее, чем сон, шаги, стресс и точность порций.
          </ArticleCard>
        </ArticleCardGrid>
        <div className="callout">
          <p>
            Хороший практический тест: если при питании около расчётной нормы вес
            стабилен 2–3{NN} недели, стартовая цифра близка к реальности. Если вес
            заметно уходит вверх или вниз — норму уточняют, а не спорят с полом в
            формуле.
          </p>
        </div>

        <YmylWhenDoctorBlock />

        <h2>Часто задаваемые вопросы</h2>
        <ArticleFaq
          items={[
            {
              question: "Правда ли, что женщинам всегда нужно намного меньше калорий?",
              answer:
                "Не всегда. В среднем расчёты у женщин часто ниже, но решает не один пол, а вся комбинация параметров. Активная женщина может иметь TDEE выше, чем мужчина меньшего роста с сидячим режимом.",
            },
            {
              question: "Почему калькулятор для женщин и мужчин один, а не два разных?",
              answer:
                "Потому что логика расчёта общая: меняется только часть формулы, связанная с полом. Разводить это на два почти одинаковых калькулятора смысла нет.",
            },
            {
              question: "Можно ли ориентироваться на усреднённые диапазоны из статей?",
              answer:
                "Только как на грубый фон. Для реального питания полезнее получить личную стартовую оценку и затем уточнить её по фактическому результату за несколько недель.",
            },
            {
              question: "Если цель похудеть, пол важнее дефицита?",
              answer:
                "Нет. Пол влияет на исходную норму, но снижение веса определяется дефицитом относительно вашей собственной траты энергии.",
            },
          ]}
        />

        <div className="article-cta">
          <Link href="/#calc-main">
            Рассчитать норму калорий для женщин и мужчин онлайн →
          </Link>
        </div>

        <ArticleSources
          intro="Ниже — базовые источники по формулам BMR и суточным энергозатратам у взрослых: оставил и первоисточники на английском, и официальные русскоязычные обзоры ВОЗ для быстрого чтения."
          items={[
            whoOverweightRu,
            whoHealthyDietRu,
            mifflinOriginalDoi,
            frankenfieldMifflinDoi,
            faoWhoUnuHumanEnergy2004,
            nhsCaloriesOverview,
          ]}
        />

        <h2>Связанные материалы</h2>
        <ul>
          <li>
            <Link href="/#calc-main">Калькулятор калорий на главной</Link>
          </li>
          <li>
            <Link href="/mifflin-san-zheor/">
              Формула Миффлина — Сан Жеора
            </Link>
          </li>
          <li>
            <Link href="/bmr-i-tdee/">BMR и TDEE: что это и чем отличаются</Link>
          </li>
          <li>
            <Link href="/deficit-kalorij/">
              Дефицит калорий для похудения и профицит для набора
            </Link>
          </li>
        </ul>
      </ArticleShell>
    </>
  );
}
