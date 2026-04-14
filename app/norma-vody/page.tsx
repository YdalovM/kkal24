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
  efsaWaterDrv2010,
  whoDrinkingWaterEn,
  whoHealthyDietRu,
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";

export const metadata: Metadata = buildArticleMetadata("/norma-vody/");

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Норма воды", href: "/norma-vody/" },
];

export default function WaterPage() {
  return (
    <>
      <JsonLd data={buildArticleWebPageJsonLd("/norma-vody/")} />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
      <h1>Норма воды в день</h1>
      <ArticleWhatIsBlurb path="/norma-vody/" />
      <ArticleLeadSummary>
        <p>
          Универсальных «двух литров всем» нет: ориентир чаще задают как{" "}
          <strong>30–35&nbsp;мл на кг</strong> массы тела в сутки{" "}
          <strong>суммарно</strong> по всей жидкости (вода, чай, супы, вода из еды).
        </p>
        <p>
          Жара, спорт, грудное вскармливание и ряд болезней сдвигают норму вверх или
          вниз. Ниже — таблица и признаки обезвоживания; при отёках, болезнях почек
          и сердца ориентиры задаёт только врач.
        </p>
      </ArticleLeadSummary>
      <p>
        Фраза «пейте 2 литра в день» часто упрощает картину: у части людей это
        разумно, у части — избыточно или недостаточно без учёта контекста.
      </p>

      <AdSlot id="ad-water-top" />

      <h2>Модель расчёта: 35 мл на кг веса</h2>
      <p>
        Один из наиболее распространённых ориентиров — 30–35&nbsp;мл воды на
        1&nbsp;кг массы тела в сутки. Это включает всю поступающую жидкость:
        воду, чай, кофе, супы и воду из продуктов питания.
      </p>
      <p>
        Пример: человек весом 70&nbsp;кг × 35&nbsp;мл = 2&nbsp;450&nbsp;мл/сут
        ≈ 2,4–2,5&nbsp;л общей жидкости.
      </p>
      <table>
        <thead>
          <tr>
            <th>Вес (кг)</th>
            <th>Ориентир 30 мл/кг</th>
            <th>Ориентир 35 мл/кг</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>50</td>
            <td>1,5 л</td>
            <td>1,75 л</td>
          </tr>
          <tr>
            <td>60</td>
            <td>1,8 л</td>
            <td>2,1 л</td>
          </tr>
          <tr>
            <td>70</td>
            <td>2,1 л</td>
            <td>2,45 л</td>
          </tr>
          <tr>
            <td>80</td>
            <td>2,4 л</td>
            <td>2,8 л</td>
          </tr>
          <tr>
            <td>90</td>
            <td>2,7 л</td>
            <td>3,15 л</td>
          </tr>
        </tbody>
      </table>

      <h2>Что увеличивает потребность в воде</h2>
      <ul>
        <li>
          <strong>Физическая активность</strong> — при тренировке средней
          интенсивности теряется 0,5–1&nbsp;л в час в виде пота.
        </li>
        <li>
          <strong>Жаркая погода и высокая влажность</strong> — потоотделение
          возрастает, потребность увеличивается на 0,5–1&nbsp;л и более.
        </li>
        <li>
          <strong>Высокобелковая или высокосолевая диета</strong> — почкам
          требуется больше воды для выведения продуктов обмена.
        </li>
        <li>
          <strong>Больничная или жаркая среда</strong> — повышенная температура
          воздуха ускоряет потери жидкости.
        </li>
        <li>
          <strong>Кормление грудью</strong> — норма увеличивается примерно на
          700&nbsp;мл/сут.
        </li>
      </ul>

      <AdSlot id="ad-water-mid" />

      <h2>Признаки недостаточного потребления воды</h2>
      <p>
        Жажда — уже поздний сигнал: к её появлению организм успевает потерять
        около 1–2&nbsp;% жидкости. Более ранние ориентиры:
      </p>
      <ul>
        <li>Тёмно-жёлтая моча (светло-жёлтая — норма, почти прозрачная — перебор).</li>
        <li>Снижение концентрации, головная боль, вялость.</li>
        <li>Редкие мочеиспускания (менее 3–4 раз в сутки).</li>
      </ul>

      <h2>Ограничения расчёта</h2>
      <div className="callout">
        <p>
          При заболеваниях почек, сердечной недостаточности, отёках неясного
          происхождения или приёме мочегонных препаратов нормы потребления воды
          должны определять только врач. Не ориентируйтесь на общие расчёты.
        </p>
      </div>
      <p>
        Кроме того, значительная часть воды поступает с едой: овощи, фрукты,
        супы, молочные продукты. При смешанном питании это может составлять
        800&nbsp;мл–1&nbsp;л в&nbsp;сутки, то есть «чистой» воды нужно меньше,
        чем показывает расчёт.
      </p>

      <YmylWhenDoctorBlock />

      <h2>Часто задаваемые вопросы</h2>

      <h3>Кофе и чай считаются?</h3>
      <p>
        Да. Диуретический эффект кофеина при умеренном потреблении (2–3 чашки)
        незначителен и не&nbsp;«отменяет» воду из этих напитков. Алкоголь — иначе:
        он действительно обезвоживает.
      </p>

      <h3>Можно ли выпить слишком много воды?</h3>
      <p>
        Да, хотя это редкость в обычной жизни. Гипонатриемия (разбавление натрия
        в крови) возникает при очень больших объёмах жидкости за короткое время.
        Практически это касается прежде всего марафонцев и спортсменов на
        сверхдлинных дистанциях.
      </p>

      <div className="article-cta">
        <Link href="/#calc-extra">Рассчитать норму воды онлайн →</Link>
      </div>

      <ArticleSources
        intro="Справочные значения потребления воды — у международных организаций; на бытовом уровне ориентиры всё равно индивидуальны."
        items={[efsaWaterDrv2010, whoDrinkingWaterEn, whoHealthyDietRu]}
      />

      <h2>Связанные материалы</h2>
      <ul>
        <li>
          <Link href="/#calc-main">Калькулятор калорий на главной</Link>
        </li>
        <li>
          <Link href="/bmr-i-tdee/">BMR и TDEE</Link>
        </li>
        <li>
          <Link href="/deficit-kalorij/">Дефицит и профицит калорий</Link>
        </li>
        <li>
          <Link href="/imt/">ИМТ — справка</Link>
        </li>
        <li>
          <Link href="/o-proekte/">О проекте и методологии</Link>
        </li>
      </ul>
    </ArticleShell>
    </>
  );
}
