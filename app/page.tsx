/**
 * Главная: композиция, `<main>`, JSON-LD через `buildHomeJsonLd`.
 * ИИ: метаданные — `buildHomeMetadata()`; тексты секций — `content/calculator-ux.ts`.
 * Расчёты и URL формы — `CalorieCalculator` / `useCalorieCalculator`.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { CalorieCalculator } from "@/components/calorie";
import {
  HomeInteractiveShell,
  SmoothHashLink,
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

function accentTitle(title: string, highlight: string) {
  const i = title.indexOf(highlight);
  if (i < 0) {
    return <>{title}</>;
  }
  return (
    <>
      {i > 0 ? title.slice(0, i) : null}
      <span className="text-accent">{highlight}</span>
      {title.slice(i + highlight.length)}
    </>
  );
}

function SectionStep({
  step,
  title,
  titleHighlight,
  description,
  accent,
  /** Якорь навигации (`#id`): весь блок шага, включая заголовок, попадает в зону прокрутки. */
  anchorId,
  children,
}: {
  step: string;
  title: string;
  /** Если задано с `accent`, подсвечиваем эту подстроку целиком. */
  titleHighlight?: string;
  description?: string;
  accent?: boolean;
  anchorId?: string;
  children: ReactNode;
}) {
  const stepRing = accent
    ? `border-accent/55 bg-accent/[0.12] text-accent ${styles.stepRingAccent}`
    : "border-border bg-elevated text-fg-muted";

  return (
    <div
      id={anchorId}
      className={`flex flex-col gap-6${anchorId ? " scroll-mt-[var(--app-scroll-anchor-offset)]" : ""}`}
    >
      <div className="flex min-w-0 gap-3 sm:gap-4 md:items-start">
        <span
          className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums ${stepRing}`}
          aria-hidden
        >
          {step}
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-base font-semibold tracking-tight text-fg md:text-lg">
            {accent
              ? accentTitle(
                  title,
                  titleHighlight ??
                    (title.includes(" ")
                      ? title.slice(0, title.indexOf(" "))
                      : title),
                )
              : title}
          </h2>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-fg-muted">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Home() {
  const { hero, sections } = calculatorUx;

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
          <nav
            className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row md:mx-0"
            aria-label="Быстрый переход по странице"
          >
            <SmoothHashLink
              href="#calc-main"
              className={`touch-manipulation flex min-h-12 w-full flex-col justify-center rounded-xl border border-accent/55 bg-accent/[0.14] px-5 py-2.5 text-left text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex sm:w-auto ${styles.jumpPrimary}`}
            >
              <span className="text-sm font-semibold">
                {hero.jumpMainLabel}
              </span>
              <span className="text-xs text-fg-muted">{hero.jumpMainHint}</span>
            </SmoothHashLink>
            <SmoothHashLink
              href="#calc-extra"
              className={`touch-manipulation flex min-h-12 w-full flex-col justify-center rounded-xl border border-border bg-elevated/80 px-5 py-2.5 text-left text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex sm:w-auto ${styles.jumpSecondary}`}
            >
              <span className="text-sm font-semibold">
                {hero.jumpExtraLabel}
              </span>
              <span className="text-xs text-fg-muted">
                {hero.jumpExtraHint}
              </span>
            </SmoothHashLink>
          </nav>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-xs leading-relaxed text-fg-subtle md:mx-0">
            {hero.onPageStrip}
          </p>
        </header>

        <HomeInteractiveShell>
          <div
            className={`calculator-shell mt-8 min-w-0 rounded-2xl border border-white/[0.08] bg-surface/85 p-4 transition-[border-color,box-shadow] duration-300 sm:mt-10 sm:p-5 md:bg-surface/50 md:backdrop-blur-sm md:p-8 ${styles.calculatorShell}`}
          >
            <div className="flex flex-col gap-10 sm:gap-14 md:gap-16">
              <SectionStep
                step={sections.mainStep}
                title={sections.mainTitle}
                description={sections.mainDescription}
                anchorId="calc-main"
              >
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
              </SectionStep>

              <div
                className={`h-px w-full ${styles.sectionDivider}`}
                aria-hidden
              />

              <SectionStep
                step={sections.extraStep}
                title={sections.extraTitle}
                titleHighlight={sections.extraTitleHighlight}
                description={sections.extraDescription}
                accent
                anchorId="calc-extra"
              >
                <div className="min-w-0">
                  <DeferredMiniCalculators />
                </div>
              </SectionStep>
            </div>
          </div>
        </HomeInteractiveShell>

        <TrustAndFaqSection />

        {/* Перекрёстные ссылки на статьи — внутренняя перелинковка для SEO */}
        <nav
          aria-label="Статьи и материалы"
          className="mt-12 border-t border-border pt-8"
        >
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
