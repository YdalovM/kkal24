import type { Metadata } from "next";
import Link from "next/link";
import {
  ArticleLeadSummary,
  ArticleSources,
  YmylWhenDoctorBlock,
} from "@/components/article";
import { ArticleShell, AdSlot } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import { whoBmiRu, whoOverweightEn } from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";

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
      <ArticleLeadSummary>
        <p>
          <strong>ИМТ</strong> = вес (кг) / рост² (м). По шкале <strong>ВОЗ</strong>{" "}
          для взрослых выделяют зоны от дефицита массы до ожирения III степени — в
          таблице ниже.
        </p>
        <p>
          Это <strong>скрининговый</strong> показатель, а не диагноз: мышечная масса,
          возраст, этничность и беременность меняют трактовку. Калькулятор на главной
          даёт число; разбор ограничений — на этой странице.
        </p>
      </ArticleLeadSummary>
      <p>
        Исторически ИМТ удобен для эпидемиологии; в клинике его дополняют другими
        данными.
      </p>

      <AdSlot id="ad-imt-top" />

      <h2>Формула расчёта</h2>
      <p>
        <strong>ИМТ = вес (кг) / рост² (м)</strong>
      </p>
      <p>
        Пример: вес&nbsp;75&nbsp;кг, рост&nbsp;1,75&nbsp;м.
        ИМТ = 75 / (1,75 × 1,75) = 75 / 3,0625 ≈ <strong>24,5</strong>.
      </p>

      <h2>Диапазоны ВОЗ для взрослых</h2>
      <table>
        <thead>
          <tr>
            <th>ИМТ</th>
            <th>Категория ВОЗ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Менее 16,0</td>
            <td>Выраженный дефицит массы</td>
          </tr>
          <tr>
            <td>16,0–17,9</td>
            <td>Умеренный дефицит</td>
          </tr>
          <tr>
            <td>18,0–18,4</td>
            <td>Лёгкий дефицит</td>
          </tr>
          <tr>
            <td>18,5–24,9</td>
            <td>Норма</td>
          </tr>
          <tr>
            <td>25,0–29,9</td>
            <td>Предожирение</td>
          </tr>
          <tr>
            <td>30,0–34,9</td>
            <td>Ожирение I степени</td>
          </tr>
          <tr>
            <td>35,0–39,9</td>
            <td>Ожирение II степени</td>
          </tr>
          <tr>
            <td>40,0 и более</td>
            <td>Ожирение III степени</td>
          </tr>
        </tbody>
      </table>
      <p>
        Пороговые значения приведены в духе классификации ВОЗ; актуальные формулировки
        — на страницах{" "}
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
          href={whoOverweightEn.href}
          className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
          target="_blank"
          rel="noopener noreferrer"
        >
          ВОЗ (EN)
        </a>
        .
      </p>

      <h2>Когда ИМТ вводит в заблуждение</h2>
      <div className="callout">
        <p>
          ИМТ не учитывает состав тела: долю мышц, жира, воды и костную плотность.
          Не используйте его как единственный критерий оценки здоровья.
        </p>
      </div>
      <ul>
        <li>
          <strong>Спортсмены с высокой мышечной массой</strong> — ИМТ может
          попасть в зону «предожирения» при нормальном проценте жира.
        </li>
        <li>
          <strong>Пожилые люди</strong> — с возрастом мышечная масса снижается, и
          «нормальный» ИМТ может скрывать саркопению (дефицит мышц).
        </li>
        <li>
          <strong>Дети и подростки</strong> — для них используются отдельные
          нормативы с центилями; взрослые таблицы не&nbsp;применяются.
        </li>
        <li>
          <strong>Разные группы населения</strong> — для жителей Азии ВОЗ рекомендует
          более низкие пороговые значения (норма до 22,9, а не до 24,9).
        </li>
        <li>
          <strong>Беременность</strong> — ИМТ в этот период не&nbsp;интерпретируется
          по стандартным диапазонам.
        </li>
      </ul>

      <AdSlot id="ad-imt-mid" />

      <h2>Что важнее ИМТ</h2>
      <p>
        Специалисты рекомендуют дополнять ИМТ другими показателями: окружностью
        талии (риск метаболического синдрома при &gt;80&nbsp;см у женщин и &gt;94&nbsp;см
        у&nbsp;мужчин по стандартам IDF), соотношением талия/рост и, при возможности,
        оценкой состава тела.
      </p>

      <h2>Часто задаваемые вопросы</h2>

      <h3>ИМТ 26 — это уже нужно худеть?</h3>
      <p>
        ИМТ в диапазоне 25–29,9 — ориентир для наблюдения, а не диагноз и не
        показание к&nbsp;диете. Врач оценивает в&nbsp;совокупности с&nbsp;анализами,
        состоянием здоровья и образом жизни. Если вес стабилен, самочувствие хорошее
        и нет сопутствующих заболеваний — решение принимается индивидуально.
      </p>

      <h3>Какой ИМТ оптимален для долголетия?</h3>
      <p>
        В ряде крупных наблюдательных исследований минимум смертности чаще
        приходится на ИМТ вблизи «нормального» диапазона ВОЗ, но точные цифры
        расходятся между когортами и методами. Показатель сильно зависит от
        возраста, пола и популяции: у части пожилых людей более высокий ИМТ в
        наблюдении связывали с лучшими исходами («парадокс ожирения») — это не
        повод игнорировать врача и анализы.
      </p>

      <YmylWhenDoctorBlock />

      <div className="article-cta">
        <Link href="/#calc-extra">Рассчитать ИМТ онлайн →</Link>
      </div>

      <ArticleSources
        intro="Официальные страницы ВОЗ по ИМТ и избыточному весу."
        items={[whoBmiRu, whoOverweightEn]}
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
