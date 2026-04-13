import type { Metadata } from "next";
import Link from "next/link";
import {
  ArticleLeadSummary,
  ArticleSources,
  YmylWhenDoctorBlock,
} from "@/components/article";
import { ArticleShell } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  efsaWaterDrv2010,
  faoWhoUnuHumanEnergy2004,
  frankenfieldMifflinDoi,
  mifflinOriginalDoi,
  whoBmiRu,
  whoOverweightEn,
} from "@/content/external-references";
import { siteContent } from "@/content/site";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";

export const metadata: Metadata = buildArticleMetadata("/o-proekte/");

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "О проекте", href: "/o-proekte/" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildArticleWebPageJsonLd("/o-proekte/")} />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
      <h1>О проекте</h1>
      <ArticleLeadSummary>
        <p>
          <strong>kkal24.ru</strong> — бесплатный информационный сервис: калькулятор
          суточной нормы калорий (TDEE), КБЖУ, ИМТ, воды и блок «темп веса» без
          регистрации. Цель — дать понятные <strong>ориентиры</strong>, а не диагноз
          или план лечения: расчёты в браузере, без хранения ваших полей на нашем
          сервере.
        </p>
        <p>
          Аудитория не ограничена РФ: методика опирается на международные обзоры и
          рекомендации (ВОЗ, FAO/WHO/UNU, EFSA и др.); ниже указаны ссылки на
          первоисточники. Тексты и формулы проверяет редакция.
        </p>
      </ArticleLeadSummary>
      <p>
        Если нужна персональная медицинская или диетологическая помощь — обратитесь
        к специалисту очно; сайт её не заменяет.
      </p>

      <h2>Что умеет сервис</h2>
      <ul>
        <li>
          Рассчитывает <strong>BMR</strong> (базальный обмен) и{" "}
          <strong>TDEE</strong> (суточную норму калорий) по формуле{" "}
          <Link href="/mifflin-san-zheor/">Миффлина — Сан Жеора</Link>.
        </li>
        <li>
          Показывает ориентировочное распределение <strong>КБЖУ</strong>{" "}
          (калории, белки, жиры, углеводы) на основе общепринятых пропорций.
        </li>
        <li>
          Строит таблицу дефицита калорий с расчётом темпа изменения веса —
          подробнее в статье{" "}
          <Link href="/deficit-kalorij/">про дефицит и профицит</Link>.
        </li>
        <li>
          Считает <Link href="/imt/">ИМТ</Link> и{" "}
          <Link href="/norma-vody/">норму воды</Link>.
        </li>
        <li>
          Сохраняет данные в URL — можно поделиться ссылкой или вернуться к
          результатам позже.
        </li>
      </ul>

      <h2>Используемые формулы</h2>
      <p>
        Основной расчёт — формула Миффлина — Сан Жеора (1990), см.{" "}
        <a
          href={mifflinOriginalDoi.href}
          className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
          target="_blank"
          rel="noopener noreferrer"
        >
          оригинальную публикацию (DOI)
        </a>
        . Для сравнения с другими уравнениями у взрослых — обзор{" "}
        <a
          href={frankenfieldMifflinDoi.href}
          className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Frankenfield et&nbsp;al., 2005 (DOI)
        </a>
        .
      </p>
      <p>
        Коэффициенты активности <strong>PAL</strong> — ориентиры из отчёта{" "}
        <a
          href={faoWhoUnuHumanEnergy2004.href}
          className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
          target="_blank"
          rel="noopener noreferrer"
        >
          FAO/WHO/UNU (2004)
        </a>{" "}
        и согласованные с ними шкалы в калькуляторе. <strong>ИМТ</strong> — формула
        и пороговые зоны в духе классификации{" "}
        <a
          href={whoBmiRu.href}
          className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
          target="_blank"
          rel="noopener noreferrer"
        >
          ВОЗ (RU)
        </a>
        , см. также{" "}
        <a
          href={whoOverweightEn.href}
          className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
          target="_blank"
          rel="noopener noreferrer"
        >
          обзор ВОЗ (EN)
        </a>
        . <strong>Вода</strong> — модель 30–35&nbsp;мл/кг в сутки как практический
        ориентир; см.{" "}
        <a
          href={efsaWaterDrv2010.href}
          className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
          target="_blank"
          rel="noopener noreferrer"
        >
          EFSA по потреблению воды
        </a>
        .
      </p>

      <h2>Важные ограничения</h2>
      <p>
        Все расчёты — <strong>ориентировочные</strong>. Индивидуальный обмен
        веществ может отличаться от формульного на ±10–15&nbsp;%. Формулы
        разработаны для здоровых взрослых и не&nbsp;применимы напрямую при:
      </p>
      <ul>
        <li>беременности и лактации;</li>
        <li>заболеваниях щитовидной железы, почек, печени, сахарном диабете;</li>
        <li>приёме гормональных препаратов или диуретиков;</li>
        <li>расстройствах пищевого поведения;</li>
        <li>возрасте до 18 лет (педиатрические нормы отличаются);</li>
        <li>профессиональном спорте и экстремальных нагрузках.</li>
      </ul>
      <p>
        Результаты сервиса не&nbsp;являются медицинской рекомендацией.
        В&nbsp;перечисленных ситуациях и при любых сомнениях обратитесь к&nbsp;врачу
        или дипломированному диетологу.
      </p>

      <h2>Персональные данные</h2>
      <p>
        Сервис не&nbsp;собирает и не&nbsp;хранит введённые в калькуляторы параметры
        (рост, вес, возраст и т.&nbsp;п.) на своём сервере: расчёт выполняется в
        браузере. Параметры могут оказаться только в адресной строке — если вы
        сами поделитесь ссылкой.
      </p>
      <p>
        Для аналитики посещаемости и (после подключения) показа рекламы могут
        использоваться инструменты партнёров (например Яндекс.Метрика, рекламная
        сеть) с обезличенной статистикой и технологиями вроде cookie — как описано
        в{" "}
        <Link href="/politika-konfidencialnosti/">политике конфиденциальности</Link>
        .
      </p>

      <h2>Редакция</h2>
      <p>
        Тексты и методология последний раз приводились к одному виду в{" "}
        {siteContent.contentRevision}. Ответственный за редакцию и проверку
        материалов по смыслу и формулам:{" "}
        <strong>Удалов Михаил Анатольевич</strong>. Если вы заметили фактическую
        ошибку или хотите предложить улучшение — сообщите автору проекта удобным
        для вас способом.
      </p>

      <YmylWhenDoctorBlock />

      <ArticleSources
        intro="Первоисточники и международные обзоры, на которые опирается калькулятор и статьи."
        items={[
          mifflinOriginalDoi,
          frankenfieldMifflinDoi,
          faoWhoUnuHumanEnergy2004,
          whoBmiRu,
          whoOverweightEn,
          efsaWaterDrv2010,
        ]}
      />

      <h2>Связанные материалы</h2>
      <ul>
        <li>
          <Link href="/mifflin-san-zheor/">Формула Миффлина — Сан Жеора</Link>
        </li>
        <li>
          <Link href="/bmr-i-tdee/">Что такое BMR и TDEE</Link>
        </li>
        <li>
          <Link href="/deficit-kalorij/">Дефицит и набор веса</Link>
        </li>
        <li>
          <Link href="/imt/">Индекс массы тела</Link>
        </li>
        <li>
          <Link href="/norma-vody/">Норма воды в день</Link>
        </li>
        <li>
          <Link href="/politika-konfidencialnosti/">Политика конфиденциальности</Link>
        </li>
      </ul>
    </ArticleShell>
    </>
  );
}
