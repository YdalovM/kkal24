# Архитектура `med_calcul`

Цель: человек или ИИ быстро находят, **где править логику**, **где копирайт**, и **какие зависимости касать осторожно**.

## Карта каталогов

```text
app/                    маршруты: RootLayout → SiteShell; page.tsx — композиция
  */page.tsx            статьи: metadata + контент, оболочка ArticleShell
  globals.css           токены темы, skip-link, article-prose
components/
  calorie/              CalorieCalculator; форма — `CalorieFormCard` (классы `CALORIE_TOOL_*` в `calorie-field-classes.ts`); результат, RecalcToast, мобильная плашка TDEE
  home/                 HomeInteractiveShell, SmoothHashLink, TrustAndFaqSection
  layout/               SiteShell, SiteSidebar, SiteFooter, ArticleShell, Breadcrumbs, AdSlot, CalcAnchorLink
  mini/                 ИМТ, вода, темп веса (дефицит+профицит в одном якоре); MiniCalculators — сетка и id
  seo/                  JsonLd
content/
  site.ts               бренд, SEO-строки, навигация (calcQuickLinks + articleNavLinks)
  seo-routes.ts         title/description/keywords и каноникалы по статьям
  calculator-ux.ts      RU-строки UI калькулятора; дефицит — синхрон с DEFICIT_ROWS
  trust-public.ts       блок доверия на главной; FAQ = источник для JSON-LD FAQPage
contexts/               MainFormToMiniSync: рост/вес/TDEE → мини-калькуляторы
constants/              лимиты формы, PAL; ui-behavior — тайминги тостов/подсказок
hooks/                  useCalorieCalculator; useLocationHash — hash для сайдбара на главной
lib/                    чистая логика без React; nav-path — нормализация путей для активных ссылок
scripts/                постобработка статического экспорта (например `strip-favicon-query.mjs` после `next build`)
docs/                   этот файл
```

## Слои (сверху вниз)

| Слой | Путь | Назначение |
|------|------|------------|
| Маршруты Next | `app/` | `layout.tsx` — метаданные, шрифты, `SiteShell`. Статьи — композиция + `metadata`. |
| Общий layout | `components/layout/` | **Постоянный сайдбар** (`SiteSidebar` + `content/site.ts`), футер с дублем ссылок (SEO), статьи — `ArticleShell` + `Breadcrumbs` + при необходимости `AdSlot`. |
| Виджеты UI | `components/calorie/`, `components/mini/` | Отображение и локальный UI-state. **Формулы не внедрять** — только вызовы из `lib/`. |
| Состояние клиента | `hooks/` | Оркестрация калькулятора: URL, storage, тост; `useLocationHash` для подсветки якоря. |
| Домен | `lib/` | Чистые функции, без `window` / React. `nav-path.ts` — сравнение путей для активной ссылки. |
| Константы продукта | `constants/` | Лимиты полей, PAL, ключи storage. `ui-behavior.ts` — длительности `aria-live`. |
| Тексты | `content/*.ts` | Данные и строки; **`site.ts` — единственный источник списков ссылок** сайдбара и футера. |
| Синхронизация | `contexts/main-form-to-mini-sync.tsx` | После расчёта: рост/вес + `lastTdee` для мини-блоков. |

## Зависимости (инварианты)

- `lib/` не импортирует `components/`, `hooks/`, `app/`.
- `constants/` не импортирует React.
- `content/` — по умолчанию только данные; без тяжёлых зависимостей.
- `components/layout/SiteLayoutFrame.tsx` — клиентский (бургер и выезд меню); `SiteSidebar.tsx` — клиентский из‑за `onNavigate`/`onClick`. Якоря на главной: `lib/nav-path.ts`, `hooks/useLocationHash.ts`, `CalcAnchorLink`, `SmoothHashLink`.

## Расширение (чеклист)

- **Новая формула BMR / PAL**: `lib/calories.ts`, при необходимости `lib/calorie-result.ts`.
- **Новое поле формы**: `constants/calculator.ts` → `lib/shareUrl.ts` → `lib/calorie-form-validation.ts` → `useCalorieCalculator.ts` → `CalorieFormCard.tsx` → при необходимости класс в `calorie-field-classes.ts` (`CALORIE_TOOL_*`).
- **Новый ряд таблицы дефицита**: `lib/calories.ts` (`DEFICIT_ROWS`) + **две** строки в `calculator-ux.ts` (`deficitLabelsTdee`, `deficitLabelsBmr`).
- **Новый мини-калькулятор**: `lib/mini-calculations.ts` + компонент в `components/mini/` + обёртка с `id` в `MiniCalculators.tsx` + запись в `siteContent.calcQuickLinks` + при необходимости контекст. Похудение/набор в одном месте меню — расширять блок `#mini-balance`, а не дублировать якоря.
- **Новая статья (URL)**: `app/<slug>/page.tsx` (`metadata`, `ArticleShell`, контент), строка в `siteContent.articleNavLinks`, запись в `content/seo-routes.ts`, URL попадёт в `app/sitemap.ts` через ключи `articleSeoByPath`.
- **Дефицит + профицит (справка)**: один маршрут `app/deficit-kalorij/page.tsx`; якоря в тексте `#deficit`, `#profic`. Отдельный URL под набор не заводить — плодит дубли и путает меню.
- **Новый якорь на главной**: согласовать `app/page.tsx`, `MiniCalculators.tsx` (или другой блок) и `calcQuickLinks` в `content/site.ts`.

## Навигация и якоря (важно для ИИ)

- Калькуляторы в сайдбаре и футере ведут на `/#<id>`; на главной скролл плавный (`SmoothHashLink` через `CalcAnchorLink`).
- **Постоянный сайдбар**: `SiteShell` → `SiteLayoutFrame` (клиент) → `<aside>` + `SiteSidebar`; на `md+` колонка слева. На узких экранах шапка с названием и бургером, меню в выезжающей панели (`SiteLayoutFrame.tsx`).
- Классы компактных ссылок футера: `components/layout/footer-nav-link-classes.ts` (`footerNavLinkClass`).

## Комментарии для ИИ и будущих правок

- В прикладных файлах допустимы короткие блоки `ИИ: …` у неочевидных мест (синхронизация URL, порядок массивов, несколько файлов для одного якоря).
- Магические тайминги UI — только **`constants/ui-behavior.ts`**.
- Публичный экспорт виджета калорий: `components/calorie/index.ts` → `CalorieCalculator`.
- Общие layout-компоненты реэкспортируются из `components/layout/index.ts`.

## Именование

- Домен: `kebab-case.ts`, смысл в имени (`calorie-result.ts`).
- Хуки: `useCalorieCalculator.ts`, `useLocationHash.ts`.

## Визуальная тема

Токены в `app/globals.css`: угольный фон, `surface` / `elevated`, текст `fg` / `fg-muted`, акцент `accent` для CTA. Уровень активности — кастомный listbox `ActivityLevelSelect`, не нативный `<select>`. Класс `article-prose` — типографика статей без плагина typography.

## Мобильная вёрстка и safe-area

- Главный калькулятор: при показе результата нижний отступ обёртки в `CalorieCalculator` — чтобы текст не прятался под фиксированную `CalorieMobileTdeeBar`; у самой плашки в inline-стилях учтены `safe-area-inset-*` (вырез, «домой»).
- В `layout.tsx` задано `viewport.viewportFit: "cover"`, чтобы работали `env(safe-area-inset-*)` на iPhone.
- Класс **`.app-gutter-x`** — горизонтальные поля контента (не уже 1rem / 1.5rem на md и с учётом выреза).
- **`.skip-to-main`** — переход к основному блоку (`#site-primary` в `SiteShell`); не удалять без замены.
- CSS-переменная **`--app-scroll-anchor-offset`** — `scroll-margin-top` для якорей на главной (`#calc-main`, `#mini-balance`, `#mini-bmi`, `#mini-water`, блок доверия `#o-servise`). Sticky-шапки нет; при смене вёрстки синхронизировать с `rootMargin` в `CalorieMobileTdeeBar`.
- Таблицы в статьях: селектор `.article-prose > table` — горизонтальный скролл только у таблицы; длинный текст в ячейках переносится.

## Технический SEO (база)

| Файл / модуль | Назначение |
|---------------|------------|
| `content/site.ts` | Бренд, глобальные title/description/keywords, навигация. |
| `content/seo-routes.ts` | Title, description, keywords и OG-тексты **по каждой статье** + `ArticleCanonicalPath`. |
| `lib/seo-page-metadata.ts` | `buildHomeMetadata()`, `buildArticleMetadata()` — canonical, hreflang `ru-RU`/`x-default`, OG article:*, Twitter `summary_large_image`. |
| `lib/seo-constants.ts` | Дефолтные ISO-даты для статей, пока в `articleSeoByPath` не заданы свои. |
| `lib/seo-article-jsonld.ts` | JSON-LD `WebPage` + `Article` (даты, publisher), `@id` сайта как на главной. |
| `lib/seo-home-jsonld.ts` | JSON-LD на главной: `WebSite`, `WebPage`, `WebApplication` (`isAccessibleForFree`), `FAQPage` из `trust-public`. |
| `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `lib/og-image-brand.tsx` | Дефолтное превью 1200×630 для соцсетей. |
| `app/favicon.ico`, `app/icon.png` | Статические иконки; после `npm run build` скрипт `scripts/strip-favicon-query.mjs` убирает `?` из href в HTML (см. комментарий в скрипте). |
| `content/trust-public.ts` | Доверие на главной; FAQ совпадает с JSON-LD. |
| `components/home/TrustAndFaqSection.tsx` | Рендер; якорь `#o-servise` (`sectionId` в trust-public). |
| `lib/site-url.ts` | Базовый URL: `NEXT_PUBLIC_SITE_URL` или `VERCEL_URL`. |
| `app/layout.tsx` | `metadataBase`, шаблон `title`, общие robots/OG locale; **без** глобального canonical `/`. |
| `app/page.tsx` | `export const metadata = buildHomeMetadata()` — полный title главной, canonical `/`. |
| `app/not-found.tsx` | 404, `robots: { index: false }`. |
| `app/robots.ts`, `app/sitemap.ts` | `robots.txt`; sitemap + `alternates.languages` (`ru-RU`, `x-default`). |
| `app/manifest.ts` | Web app manifest (`categories` для PWA/витрин). |
| `components/seo/JsonLd.tsx` | Вставка `<script type="application/ld+json">`. |
| `.env.example` | Пример переменных для продакшена. |

Прод: задать `NEXT_PUBLIC_SITE_URL`. Опционально: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Пошаговый VPS/Timeweb: **`docs/DEPLOY.md`**.

**Новая статья:** запись в `content/seo-routes.ts` (путь в union + объект в `articleSeoByPath`), маршрут `app/.../page.tsx` с `buildArticleMetadata` и `buildArticleWebPageJsonLd`, ссылка в `site.ts` — sitemap подхватит ключи из `articleSeoByPath`.
