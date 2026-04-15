/**
 * Главная: композиция, `<main>`, JSON-LD через `buildHomeJsonLd`.
 * ИИ: метаданные — `buildHomeMetadata()`; тексты героя и виджетов — `content/calculator-ux.ts`.
 * Расчёты и URL формы — `CalorieCalculator` / `useCalorieCalculator`.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { CalorieCalculator } from "@/components/calorie";
import {
  HomeInteractiveShell,
  MealPlanHomePromo,
  TrustAndFaqSection,
} from "@/components/home";
import { DeferredMiniCalculators } from "@/components/mini/DeferredMiniCalculators";
import { JsonLd } from "@/components/seo/JsonLd";
import { calculatorUx } from "@/content/calculator-ux";
import { siteContent } from "@/content/site";
import { buildHomeJsonLd } from "@/lib/seo-home-jsonld";
import { buildHomeMetadata } from "@/lib/seo-page-metadata";
import styles from "@/app/page.module.css";

export const metadata: Metadata = buildHomeMetadata();

/** Якорь `#calc-main` / `#calc-extra`: заголовки внутри виджетов, не дублируем h2 над ними. */
function CalculatorSection({
  anchorId,
  children,
}: {
  anchorId?: string;
  children: ReactNode;
}) {
  const scrollClass = anchorId ? " scroll-mt-[var(--app-scroll-anchor-offset)]" : "";
  return (
    <div id={anchorId} className={`flex flex-col gap-6${scrollClass}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const { hero } = calculatorUx;

  return (
    <main className="box-border min-h-screen min-w-0 w-full overflow-x-clip">
      <JsonLd data={buildHomeJsonLd()} />
      <div className="app-gutter-x mx-auto min-w-0 max-w-3xl py-8 sm:py-10 md:py-16">
        <header className="border-b border-border pb-10 text-center md:text-left">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
            {hero.kicker}
          </p>
          <h1 className="mt-3 text-balance text-[clamp(1.5rem,5.5vw+0.6rem,2.25rem)] font-bold leading-tight tracking-tight text-fg sm:text-4xl sm:leading-none">
            {hero.titleLeading}{" "}
            <span className={`text-accent ${styles.heroAccent}`}>
              {hero.titleAccent}
            </span>{" "}
            {hero.titleTrailing}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-fg-muted md:mx-0 md:text-base">
            {hero.lead}
          </p>
        </header>

        <HomeInteractiveShell>
          <div
            className={`calculator-shell mt-8 min-w-0 rounded-2xl border border-white/[0.08] bg-surface/85 p-4 transition-[border-color,box-shadow] duration-300 sm:mt-10 sm:p-5 md:bg-surface/50 md:backdrop-blur-sm md:p-8 ${styles.calculatorShell}`}
          >
            <div className="flex flex-col gap-10 sm:gap-14 md:gap-16">
              <CalculatorSection anchorId="calc-main">
                <div className="min-w-0">
                  <Suspense
                    fallback={
                      <div className="rounded-xl border border-border bg-elevated/80 p-8 text-center text-sm text-fg-muted">
                        Загрузка…
                      </div>
                    }
                  >
                    <CalorieCalculator />
                  </Suspense>
                </div>
              </CalculatorSection>

              <MealPlanHomePromo />

              <div
                className={`h-px w-full ${styles.sectionDivider}`}
                aria-hidden
              />

              <CalculatorSection anchorId="calc-extra">
                <div className="min-w-0">
                  <DeferredMiniCalculators />
                </div>
              </CalculatorSection>
            </div>
          </div>
        </HomeInteractiveShell>

        <TrustAndFaqSection />

        {/* Перекрёстные ссылки — внутренняя перелинковка для SEO */}
        <nav
          aria-label="Калькуляторы и материалы"
          className="mt-12 border-t border-border pt-8"
        >
          {siteContent.calcPageLinks.length > 0 ? (
            <>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-fg-subtle">
                Калькуляторы
              </p>
              <ul className="mb-8 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:grid-cols-3">
                {siteContent.calcPageLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="touch-manipulation flex min-h-11 items-center rounded-lg border border-border bg-elevated/60 px-3 py-2.5 text-xs leading-snug text-fg-muted transition-[border-color,background-color,color,transform] duration-200 [hyphens:auto] hover:-translate-y-px hover:border-accent/50 hover:bg-accent/[0.06] hover:text-fg motion-reduce:hover:translate-y-0"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-fg-subtle">
            Полезные материалы
          </p>
          <p className="mb-4 max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted">
            {calculatorUx.materialsNavIntro}
          </p>
          <ul className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:grid-cols-3">
            {siteContent.articleNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="touch-manipulation flex min-h-11 items-center rounded-lg border border-border bg-elevated/60 px-3 py-2.5 text-xs leading-snug text-fg-muted transition-[border-color,background-color,color,transform] duration-200 [hyphens:auto] hover:-translate-y-px hover:border-accent/50 hover:bg-accent/[0.06] hover:text-fg motion-reduce:hover:translate-y-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
