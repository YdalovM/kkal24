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
  mifflinOriginalDoi,
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";
import { NN, NB } from "@/lib/typography";

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
            Уравнение <strong>Миффлина — Сан Жеора (1990)</strong> оценивает{" "}
            <strong>BMR</strong> — калории в полном покое — по полу, весу, росту
            и возрасту. Для <strong>TDEE</strong> результат умножают на
            коэффициент активности <strong>PAL</strong> (см.{" "}
            <Link href="/bmr-i-tdee/">статью про BMR и TDEE</Link>).
          </p>
          <p>
            У современных взрослых это уравнение в среднем ближе к измерениям,
            чем классический Харрис — Бенедикт; всё равно запас по точности
            порядка <strong>10–15{NN}%</strong> считается нормальным.
            Уравнения и пример — ниже.
          </p>
        </ArticleLeadSummary>
        <p>
          Формулу разработали Марк Миффлин и Сатхи Сан Жеор и опубликовали в
          Journal of the American Dietetic Association.
        </p>

        <AdSlot id="ad-mifflin-top" />

        <h2>Уравнения для мужчин и женщин</h2>
        <p>
          Формула учитывает пол, возраст, рост и вес — это стандартный набор
          предикторов в популяционных уравнениях BMR. Долю мышц, жира, генетику
          и болезни уравнение «из коробки» не видит, поэтому индивидуальная
          ошибка остаётся.
        </p>
        <table>
          <thead>
            <tr>
              <th>Пол</th>
              <th>Формула BMR (ккал/сутки)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Мужчины</td>
              <td>10 × вес(кг) + 6,25 × рост(см) − 5 × возраст(лет) + 5</td>
            </tr>
            <tr>
              <td>Женщины</td>
              <td>10 × вес(кг) + 6,25 × рост(см) − 5 × возраст(лет) − 161</td>
            </tr>
          </tbody>
        </table>
        <p>
          Разница в{NB}константах (+5 для мужчин, −161 для женщин) отражает
          физиологические различия в{NB}составе тела: мужчины в{NB}среднем
          имеют большую долю мышечной ткани, которая требует больше энергии в
          покое.
        </p>

        <h2>Пример расчёта</h2>
        <p>
          Женщина, 32 года, рост{NN}165{NN}см, вес{NN}62{NN}кг:
        </p>
        <p>
          BMR = 10 × 62 + 6,25 × 165 − 5 × 32 − 161 = 620 + 1{NN}031,25 − 160 −
          161 = <strong>1{NN}330{NN}ккал/сут</strong>.
        </p>
        <p>
          Это энергия только «на существование». Чтобы получить реальную
          суточную норму с{NB}учётом активности (TDEE), BMR умножают на
          коэффициент PAL — подробнее в{NB}статье{" "}
          <Link href="/bmr-i-tdee/">про BMR и TDEE</Link>.
        </p>

        <h2>Почему Миффлин, а не Харрис — Бенедикт</h2>
        <p>
          Формула Харриса — Бенедикта (1919) создавалась на значительно более
          стройных людях начала XX{NN}века. Исследование 2005 года (Frankenfield
          et al., Journal of the American Dietetic Association) показало, что
          уравнение Миффлина — Сан Жеора точнее предсказывает измеренный обмен
          у{NB}современных взрослых с{NB}нормальным и{NB}избыточным весом: средняя
          ошибка — около 10{NN}%, что является приемлемым для практического
          использования.
        </p>

        <h2>Точность и ограничения</h2>
        <div className="callout">
          <p>
            Расчёт — ориентировочный: индивидуальный обмен может отличаться от
            формульного примерно на <strong>10–15{NN}%</strong> в обе стороны.
          </p>
        </div>
        <ul>
          <li>
            <strong>Спортсмены с высокой мышечной массой</strong> — формула
            занижает обмен, так как мышечная ткань метаболически активнее
            жировой.
          </li>
          <li>
            <strong>Пожилые люди (65+)</strong> —{NB}с возрастом снижается
            мышечная масса, формула может немного завышать реальный BMR.
          </li>
          <li>
            <strong>Дети и подростки</strong> — для них используются специальные
            педиатрические уравнения; Миффлин — Сан Жеора{NB}не валидировалась
            для этой группы.
          </li>
          <li>
            <strong>Заболевания обмена веществ</strong> — реальный обмен может
            существенно отличаться от расчётного.
          </li>
        </ul>

        <AdSlot id="ad-mifflin-mid" />

        <YmylWhenDoctorBlock />

        <h2>Часто задаваемые вопросы</h2>

        <h3>Нужно ли учитывать состав тела?</h3>
        <p>
          Формула не знает, сколько у вас мышц и жира — она работает только с
          весом, ростом, возрастом и полом. Если два человека весят одинаково,
          но один атлет, а другой ведёт сидячий образ жизни, их реальный BMR
          будет различаться. Для более точного расчёта используют формулу
          Куннингема, которая требует знания процента жира.
        </p>

        <h3>Как применять BMR на практике?</h3>
        <p>
          BMR — это только первый шаг. Умножьте его на коэффициент физической
          активности (PAL) и получите TDEE — суточную энергетическую
          потребность. Именно от TDEE отталкиваются при составлении рациона.
        </p>

        <h3>Насколько доверять полученной цифре?</h3>
        <p>
          Считайте её стартовой точкой для наблюдения. Если при питании на
          уровне TDEE вес стабилен 2–3{NN}недели — значит, расчёт близок к
          реальности. Если вес растёт или снижается — скорректируйте калораж и
          проверьте ещё раз.
        </p>

        <div className="article-cta">
          <Link href="/#calc-main">
            Рассчитать по формуле Миффлина онлайн →
          </Link>
        </div>

        <ArticleSources
          intro="Оригинальная статья с уравнением, сравнение с другими формулами BMR и отчёт по суточной энергии."
          items={[
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
