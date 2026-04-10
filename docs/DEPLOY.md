# Деплой

В `next.config.ts` включён **`output: "export"`**: после `npm run build` готовый сайт лежит в каталоге **`out/`** (чистый статический фронт, без Node на сервере).

## 1. Репозиторий и переменные

- В Git **не** коммитьте `.env` — только **`.env.example`** как шаблон.
- **`NEXT_PUBLIC_SITE_URL`** должен быть задан **на этапе сборки** (в CI / App Platform / локально перед `npm run build`): `https://ваш-домен.ru` без слэша в конце. От него зависят абсолютные ссылки в `sitemap.xml`, `robots.txt` и т.д.

## 2. Timeweb App Platform (статический тариф)

- Тип приложения: **frontend / статика / Next.js без SSR** (как называет панель).
- **Команда сборки:** `npm ci && npm run build` (или `npm run build`).
- **Каталог с результатом:** **`out`** (или `/out` — как в интерфейсе).
- **Команда запуска** для статики обычно не нужна (отдача файлов с CDN/веб-сервера).
- Переменные окружения с префиксом **`NEXT_PUBLIC_`** задайте **до сборки**, иначе в бандл не попадут.

## 3. После публикации

- **Google Search Console** и **Яндекс.Вебмастер** — добавить сайт, проверить `robots.txt` и `sitemap.xml`.
- Убедиться, что открывается **`/sitemap.xml`** и в нём **HTTPS**-URL.
- Опционально: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` в переменных сборки.

---

## 4. VPS с Node (режим `standalone`, по желанию)

Если вернёте в `next.config.ts` **`output: "standalone"`** вместо `export`, сборка даст **`.next/standalone`** + нужно копировать `public` и `.next/static` внутрь standalone, запуск — **`node server.js`** за Nginx. Подробности см. историю коммитов или документацию Next.js по `standalone`.
