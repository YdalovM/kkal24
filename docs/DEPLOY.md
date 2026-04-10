# Деплой на VPS (Timeweb и аналоги)

Стек: **Node.js 20+**, **Next.js** в режиме **`output: "standalone"`**, перед фронтом — **Nginx** (TLS, прокси на Node).

## 1. Репозиторий и секреты

- В Git **не** коммитьте `.env` — только **`.env.example`** как шаблон.
- На сервере создайте `.env` из примера и задайте **`NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru`** (ровно тот URL, который открывается в браузере, без слэша в конце).

## 2. Сборка на сервере

```bash
cd /var/www/med_calcul   # или ваш путь
git pull
npm ci
npm run build
```

После `standalone`-сборки Next кладёт сервер в **`.next/standalone`**. Нужно **один раз после каждого build** (или в CI-скрипте) скопировать статику:

```bash
cp -r public .next/standalone/
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/static
```

Запуск процесса (из корня проекта, где лежит `.next`):

```bash
cd .next/standalone
HOSTNAME=0.0.0.0 PORT=3000 node server.js
```

Для постоянной работы используйте **systemd** или **PM2** с `working_directory` на `.next/standalone` и тем же `node server.js`, либо запуск из корня с переменной окружения — главное, чтобы рядом были `public` и `.next/static` внутри `standalone`, как выше.

## 3. Nginx

- Сертификат **Let’s Encrypt** (на Timeweb часто есть авто SSL в панели).
- `proxy_pass` на `http://127.0.0.1:3000` (или ваш `PORT`).
- Редирект **HTTP → HTTPS**.
- Выберите **один** канонический хост: только `www` или только без `www`; второй вариант — **301** на канонический. Значение **`NEXT_PUBLIC_SITE_URL`** должно совпадать с каноном.

Пример фрагмента `location /`:

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 4. После публикации

- **Google Search Console** и **Яндекс.Вебмастер** — добавить сайт, проверить `robots.txt` и `sitemap.xml`.
- Убедиться, что открывается **`/sitemap.xml`** и в нём **HTTPS**-URL.
- Опционально: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` в `.env` и пересборка.

## 5. Docker (по желанию)

Можно обернуть шаги `build + copy + node server.js` в Dockerfile; для Timeweb Cloud с готовым Next.js иногда проще нативный Node — смотрите тариф и документацию хостинга.
