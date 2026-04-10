import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: `Запрошенный адрес отсутствует на сайте ${siteContent.shortName}.`,
  robots: { index: false, follow: true },
};

/**
 * Клиентский 404 не индексируем; ссылка на главную с калькулятором.
 */
export default function NotFound() {
  return (
    <main className="app-gutter-x mx-auto flex min-w-0 max-w-3xl flex-1 flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-medium text-fg-subtle">404</p>
      <h1 className="mt-2 text-balance text-xl font-semibold text-fg">
        Такой страницы нет
      </h1>
      <p className="mt-3 max-w-md text-pretty text-sm text-fg-muted">
        Проверьте адрес или вернитесь на главную — там калькулятор калорий и
        дополнительные инструменты.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-6 text-sm font-semibold text-on-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        На главную
      </Link>
    </main>
  );
}
