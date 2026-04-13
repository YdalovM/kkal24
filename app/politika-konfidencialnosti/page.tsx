import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteContent } from "@/content/site";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";

export const metadata: Metadata = buildArticleMetadata("/politika-konfidencialnosti/");

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Политика конфиденциальности", href: "/politika-konfidencialnosti/" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={buildArticleWebPageJsonLd("/politika-konfidencialnosti/")} />
      <ArticleShell breadcrumbs={BREADCRUMBS}>
        <h1>Политика конфиденциальности — kkal24.ru</h1>
        <p>
          Действует для сайта <strong>kkal24.ru</strong> (далее — «Сервис»). Цель
          документа — в понятной форме описать, какие данные могут обрабатываться при
          посещении страниц, в том числе в связи с аналитикой и рекламой.
        </p>

        <h2>1. Кто оператор</h2>
        <p>
          Оператором обработки сведений, которые вы сами вводите в калькуляторы на
          Сервисе, являетесь вы: расчёты выполняются в браузере, а при сохранении
          параметров в ссылке — данные остаются у вас в адресной строке. Отдельно
          ниже описана обработка данных при использовании счётчика Яндекс.Метрики и
          при показе рекламы (когда вы их подключите).
        </p>

        <h2>2. Яндекс.Метрика</h2>
        <p>
          Если на Сервисе включён счётчик{" "}
          <a
            href="https://yandex.ru/legal/metrica_termsofuse/"
            className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
            rel="noopener noreferrer"
          >
            Яндекс.Метрики
          </a>
          , компания Яндекс может получать обезличенные сведения о визитах (например
          просмотры страниц, переходы, тип устройства, регион в обобщённом виде).
          Это нужно, чтобы владелец сайта понимал нагрузку и популярность разделов.
          Политика Яндекса по Метрике — по ссылке выше.
        </p>

        <h2>3. Реклама (Яндекс РСЯ и аналоги)</h2>
        <p>
          На страницах могут размещаться рекламные блоки партнёрских сетей (в том
          числе{" "}
          <a
            href="https://yandex.ru/legal/rules_ads/"
            className="text-fg-muted underline decoration-border underline-offset-2 hover:text-fg"
            rel="noopener noreferrer"
          >
            рекламная сеть Яндекса
          </a>
          ). Для подбора и учёта показов рекламы могут использоваться файлы cookie и
          иные технологии сети; состав данных определяется политикой соответствующей
          площадки. Файл <Link href="/ads.txt">ads.txt</Link> публикуется для
          прозрачности отношений с рекламными системами.
        </p>

        <h2>4. Данные калькулятора</h2>
        <p>
          Введённые вами рост, вес, возраст и другие поля{" "}
          <strong>не отправляются на наш сервер</strong> для хранения: расчёт
          выполняется локально. Если вы копируете или отправляете кому-либо ссылку с
          параметрами в адресе — эти значения становятся видимыми так же, как любой
          другой URL. Подробнее — на странице{" "}
          <Link href="/o-proekte/">О проекте</Link>.
        </p>

        <h2>5. Изменения</h2>
        <p>
          Текст может обновляться при смене состава инструментов (Метрика, реклама).
          Актуальная редакция всегда на этой странице; дата проверки текстов
          Сервиса по методике калькуляторов указана в футере сайта (
          {siteContent.contentRevision}).
        </p>

        <h2>6. Связанные страницы</h2>
        <ul>
          <li>
            <Link href="/o-proekte/">О проекте и ограничениях расчётов</Link>
          </li>
        </ul>
      </ArticleShell>
    </>
  );
}
