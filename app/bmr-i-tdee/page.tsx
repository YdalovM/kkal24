import type { Metadata } from "next";
import Link from "next/link";
import {
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
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";

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
          <strong>BMR</strong> — ориентир обмена в покое; <strong>TDEE</strong> = BMR
          × <strong>PAL</strong> (коэффициент активности). От TDEE обычно отталкиваются
          при поддержании, снижении или наборе веса.
        </p>
        <p>
          Любая формула даёт лишь приближение: индивидуальная норма часто отличается
          на порядка <strong>10–15&nbsp;%</strong>. Таблица PAL и примеры — ниже.
        </p>
      </ArticleLeadSummary>
      <p>
        Прежде чем составлять рацион или считать дефицит, имеет смысл зафиксировать
        обе цифры и затем смотреть на динамику веса 2–3 недели.
      </p>

      <AdSlot id="ad-bmr-top" />

      <h2>BMR — базальный метаболизм</h2>
      <p>
        <strong>BMR (Basal Metabolic Rate)</strong> — энергия, которую организм
        расходует в состоянии полного покоя: на дыхание, поддержание температуры
        тела, работу сердца, почек и других органов. Грубо говоря — это минимум
        калорий, необходимый для выживания в положении лёжа без движения.
      </p>
      <p>
        BMR не включает никакую физическую активность — ни прогулки, ни
        тренировки, ни даже переваривание пищи. Термический эффект питания в
        бытовых оценках часто упрощают до порядка ~10&nbsp;% от калорийности
        суточного рациона (не от BMR) — величина грубая и зависит от состава еды.
      </p>
      <p>
        Рассчитывается по формуле с&nbsp;учётом пола, возраста, роста и веса.
        Среди распространённых уравнений для взрослых чаще используют{" "}
        <Link href="/mifflin-san-zheor/">Миффлина — Сан Жеора</Link>: в обзорах
        у современных взрослых оно в среднем ближе к измерениям, чем старые
        формулы вроде Харриса — Бенедикта, но для конкретного человека разброс
        всё равно остаётся.
      </p>

      <h2>TDEE — суточная потребность в калориях</h2>
      <p>
        <strong>TDEE (Total Daily Energy Expenditure)</strong> — полные суточные
        энергозатраты с учётом образа жизни и физической активности. Рассчитывается
        по простой формуле:
      </p>
      <p>
        <strong>TDEE = BMR × PAL</strong>
      </p>
      <p>
        Где <strong>PAL (Physical Activity Level)</strong> — коэффициент
        физической активности. Чем активнее образ жизни, тем выше PAL и тем
        больше калорий нужно организму.
      </p>

      <h2>Таблица коэффициентов активности PAL</h2>
      <table>
        <thead>
          <tr>
            <th>Уровень активности</th>
            <th>Кто подходит</th>
            <th>PAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Минимальная</td>
            <td>Лежачий режим, восстановление после болезни</td>
            <td>1,2</td>
          </tr>
          <tr>
            <td>Сидячая работа</td>
            <td>Офис, редкие прогулки (1–2 дня в неделю)</td>
            <td>1,375</td>
          </tr>
          <tr>
            <td>Умеренная</td>
            <td>Тренировки 3–5 дней в неделю + активный быт</td>
            <td>1,55</td>
          </tr>
          <tr>
            <td>Высокая</td>
            <td>Тренировки 6–7 дней или физический труд</td>
            <td>1,725</td>
          </tr>
          <tr>
            <td>Очень высокая</td>
            <td>Профессиональный спорт, тяжёлый физический труд</td>
            <td>1,9</td>
          </tr>
        </tbody>
      </table>
      <p>
        Большинство городских жителей попадают в диапазон 1,375–1,55. Если вы
        ходите в зал 3 раза в неделю, но при этом весь день сидите — PAL скорее
        1,4–1,5, чем 1,725.
      </p>

      <AdSlot id="ad-bmr-mid" />

      <h2>Как использовать TDEE на практике</h2>
      <ul>
        <li>
          <strong>Поддержание веса</strong> — питайтесь на уровне TDEE. Если
          вес стабилен 2–3&nbsp;недели, вы попали в свою реальную норму.
        </li>
        <li>
          <strong>Снижение веса</strong> — создайте умеренный{" "}
          <Link href="/deficit-kalorij/">дефицит калорий</Link> относительно
          TDEE (обычно 300–500&nbsp;ккал/сут).
        </li>
        <li>
          <strong>Набор массы</strong> — добавьте 200–400&nbsp;ккал к TDEE.
          Более высокий профицит ускоряет прирост жира.
        </li>
      </ul>

      <p className="text-sm text-fg-muted">
        <strong>О точности.</strong> PAL сложно оценить «на глаз»: два человека с
        одинаковым TDEE по формуле могут по-разному тратить энергию из-за состава
        тела, непроизвольной активности, сна и стресса. Имеет смысл трактовать TDEE
        как стартовую точку и корректировать по реакции веса.
      </p>

      <YmylWhenDoctorBlock />

      <h2>Часто задаваемые вопросы</h2>

      <h3>BMR и основной обмен — это одно и то же?</h3>
      <p>
        В быту — да, эти термины используют как синонимы. Строго говоря, BMR
        измеряется при полном покое натощак в нейтральной температуре, а
        основной обмен (resting metabolic rate, RMR) — чуть менее строгие
        условия. Практическая разница небольшая — около 10–15&nbsp;%.
      </p>

      <h3>Меняется ли BMR со временем?</h3>
      <p>
        Да. С возрастом (примерно от 30 лет) базальный обмен постепенно снижается —
        в среднем на 1–2&nbsp;% за десятилетие. Это связано с уменьшением мышечной
        массы. Силовые тренировки замедляют этот процесс.
      </p>

      <h3>Почему вес не меняется, хотя ем «по норме»?</h3>
      <p>
        Скорее всего, реальная норма немного выше или ниже расчётной. Начните с
        TDEE, понаблюдайте 2–3&nbsp;недели и скорректируйте на основе реального
        результата — это точнее любой формулы.
      </p>

      <div className="article-cta">
        <Link href="/#calc-main">Рассчитать BMR и TDEE онлайн →</Link>
      </div>

      <ArticleSources
        intro="Методология суточной энергии и сравнение уравнений BMR — в международных отчётах и обзорах."
        items={[faoWhoUnuHumanEnergy2004, frankenfieldMifflinDoi, nhsCaloriesOverview]}
      />

      <h2>Связанные материалы</h2>
      <ul>
        <li>
          <Link href="/#calc-main">Калькулятор калорий на главной</Link>
        </li>
        <li>
          <Link href="/mifflin-san-zheor/">Формула Миффлина — Сан Жеора</Link>
        </li>
        <li>
          <Link href="/deficit-kalorij/">Дефицит и профицит: сколько и как безопасно</Link>
        </li>
        <li>
          <Link href="/imt/">Индекс массы тела (ИМТ)</Link>
        </li>
      </ul>
    </ArticleShell>
    </>
  );
}
