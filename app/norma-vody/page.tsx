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
  efsaWaterDrv2010,
  whoDrinkingWaterEn,
  whoHealthyDietRu,
} from "@/content/external-references";
import { buildArticleWebPageJsonLd } from "@/lib/seo-article-jsonld";
import { buildArticleMetadata } from "@/lib/seo-page-metadata";
import { NN } from "@/lib/typography";

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
            Универсальных «двух литров всем» нет. В быту ориентир чаще задают
            как <strong>30–35 мл на кг</strong> массы тела в сутки.
          </p>
          <p>
            Но жара, спорт, грудное вскармливание и некоторые болезни меняют
            потребность. Поэтому расчёт — это только отправная точка.
          </p>
        </ArticleLeadSummary>

        <AdSlot id="ad-water-top" />

        <h2>Что считать нормой</h2>
        <ArticleCardGrid>
          <ArticleCard eyebrow="Что входит" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Вода, чай, кофе, супы и часть жидкости из еды.
          </ArticleCard>
          <ArticleCard eyebrow="Что не подходит" className="bg-elevated/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Слепое правило «2 литра всем» без учёта веса, климата и нагрузки.
          </ArticleCard>
        </ArticleCardGrid>
        <p>
          В официальных справочниках нормы чаще дают не в мл/кг, а как{" "}
          <strong>общую воду за сутки</strong>. Например, EFSA приводит
          ориентиры порядка 2,0{NN}л для женщин и 2,5{NN}л для мужчин, включая
          жидкость из напитков и еды.
        </p>

        <h2>Ориентир 30–35 мл на кг</h2>
        <ArticleHighlight eyebrow="Пример">
          <p className="mt-3 rounded-xl border border-border/70 bg-page/40 px-4 py-4 text-sm font-medium leading-7 text-fg">
            70 кг × 35 мл = 2{NN}450 мл в сутки
          </p>
          <p className="mt-4 text-sm leading-6 text-fg-muted">
            Это около <strong className="text-fg">2,4–2,5 л</strong> общей жидкости
            в день, а не обязательно только чистой воды.
          </p>
        </ArticleHighlight>

        <ArticleCardGrid>
          <ArticleCard
            title="50 кг"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                1,5–1,75 л
              </span>
            }
          />
          <ArticleCard
            title="60 кг"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                1,8–2,1 л
              </span>
            }
          />
          <ArticleCard
            title="70 кг"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                2,1–2,45 л
              </span>
            }
          />
          <ArticleCard
            title="80 кг"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                2,4–2,8 л
              </span>
            }
          />
          <ArticleCard
            title="90 кг"
            className="sm:col-span-2"
            aside={
              <span className="rounded-lg border border-border/70 bg-page/35 px-2.5 py-1 text-sm font-semibold text-accent">
                2,7–3,15 л
              </span>
            }
          />
        </ArticleCardGrid>

        <h2>Что увеличивает потребность в воде</h2>
        <ArticleCardGrid>
          <ArticleCard title="Физическая активность">
            При длительной или интенсивной нагрузке потери пота заметно растут,
            поэтому пить часто нужно больше обычного.
          </ArticleCard>
          <ArticleCard title="Жара и влажность">
            Потоотделение возрастает, и потребность легко увеличивается ещё на 0,5–1 л и более.
          </ArticleCard>
          <ArticleCard title="Соль и белок">
            Высокосолевая и высокобелковая еда повышает нагрузку на водный обмен.
          </ArticleCard>
          <ArticleCard title="Грудное вскармливание">
            Потребность обычно увеличивается, ориентировочно ещё примерно на 700 мл в сутки.
          </ArticleCard>
        </ArticleCardGrid>

        <AdSlot id="ad-water-mid" />

        <h2>Признаки недостатка воды</h2>
        <ArticleCardGrid columns={3}>
          <ArticleCard title="Тёмная моча">
            Светло-жёлтый цвет обычно спокойнее, чем тёмно-жёлтый.
          </ArticleCard>
          <ArticleCard title="Вялость и головная боль">
            Недостаток жидкости может снижать концентрацию и общее самочувствие.
          </ArticleCard>
          <ArticleCard title="Редкое мочеиспускание">
            Если мочеиспускание стало заметно реже обычного, это повод посмотреть,
            хватает ли жидкости.
          </ArticleCard>
        </ArticleCardGrid>
        <div className="callout">
          <p>
            Практичный бытовой ориентир от NHS — не ждать сильной жажды, а
            следить, чтобы моча чаще была бледно-жёлтой, а не тёмной.
          </p>
        </div>

        <h2>Когда общие расчёты не подходят</h2>
        <div className="callout">
          <p>
            При болезнях почек, сердечной недостаточности, отёках неясного
            происхождения или приёме мочегонных препаратов нормы воды должен
            определять врач.
          </p>
        </div>
        <p>
          Кроме того, значительная часть воды поступает с едой: овощи, фрукты,
          супы и молочные продукты могут давать заметную долю суточной жидкости.
        </p>

        <YmylWhenDoctorBlock />

        <h2>Часто задаваемые вопросы</h2>
        <ArticleFaq
          items={[
            {
              question: "Кофе и чай считаются?",
              answer:
                "Да. При умеренном потреблении вода из этих напитков учитывается. Алкоголь — другая история: он действительно может обезвоживать.",
            },
            {
              question: "Можно ли выпить слишком много воды?",
              answer:
                "Да, хотя в обычной жизни это редкость. Особенно это актуально при очень больших объёмах за короткое время, например на длинных дистанциях.",
            },
            {
              question: "Нужно ли добирать именно чистую воду?",
              answer:
                "Не всегда. Часть жидкости приходит с едой и напитками, поэтому расчёт не равен автоматически количеству чистой воды из бутылки.",
            },
          ]}
        />

        <div className="article-cta">
          <Link href="/#calc-extra">Рассчитать норму воды онлайн →</Link>
        </div>

        <ArticleSources
          intro="Оставил международные справочные источники и русскоязычный обзор ВОЗ как базу для бытовых ориентиров."
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
