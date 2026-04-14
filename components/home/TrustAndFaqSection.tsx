import { trustPublicContent } from "@/content/trust-public";

/**
 * Блок E-E-A-T‑уровня для главной: прозрачность методики, ограничения, FAQ, источники.
 * Рендер на сервере; якорь `trustPublicContent.sectionId` — цель для ссылки из футера.
 */
export function TrustAndFaqSection() {
  const t = trustPublicContent;

  return (
    <section
      id={t.sectionId}
      className="scroll-mt-[var(--app-scroll-anchor-offset)] pt-10 text-sm leading-relaxed text-fg-muted"
      aria-labelledby={`${t.sectionId}-heading`}
    >
      <h2
        id={`${t.sectionId}-heading`}
        className="text-base font-semibold tracking-tight text-fg md:text-lg"
      >
        {t.title}
      </h2>
      <p className="mt-3 max-w-2xl text-pretty">{t.lead}</p>

      <h3 className="mt-8 font-medium text-fg">{t.methodologyTitle}</h3>
      <p className="mt-2 max-w-2xl text-pretty">{t.methodologyBody}</p>

      <h3 className="mt-8 font-medium text-fg">{t.limitationsTitle}</h3>
      <ul className="mt-2 max-w-2xl list-disc space-y-1.5 pl-5 marker:text-accent/80">
        {t.limitationsList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3 className="mt-8 font-medium text-fg">{t.faqTitle}</h3>
      <div className="mt-4 max-w-2xl space-y-3">
        {t.faq.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-border bg-elevated/40 shadow-sm transition-[border-color,box-shadow] duration-200 open:border-accent/35 open:shadow-[0_0_0_1px_color-mix(in_srgb,var(--app-accent)_16%,transparent)]"
          >
            <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page [&::-webkit-details-marker]:hidden sm:min-h-0 sm:py-3.5">
              <span
                className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-page/50 text-fg-dim transition-[transform,color,border-color] group-open:rotate-90 group-open:border-accent/35 group-open:text-accent motion-reduce:transition-none motion-reduce:group-open:rotate-0"
                aria-hidden
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-fg">
                {item.q}
              </span>
            </summary>
            <div className="border-t border-border/60 px-4 pb-4 pl-[3.25rem] pt-3">
              <p className="text-sm leading-relaxed text-fg-muted">{item.a}</p>
            </div>
          </details>
        ))}
      </div>

      <h3 className="mt-10 font-medium text-fg">{t.sourcesTitle}</h3>
      <ul className="mt-3 max-w-2xl space-y-4">
        {t.sources.map((block) => (
          <li key={block.topic} className="rounded-lg border border-border/70 bg-elevated/30 px-3 py-3">
            <p className="text-xs font-medium text-fg">{block.topic}</p>
            <ul className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
              {block.variants.map((v) => (
                <li key={v.href} className="flex items-center gap-2">
                  <span className="inline-flex min-w-[2rem] justify-center rounded border border-border/80 bg-page/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fg-subtle">
                    {v.lang}
                  </span>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent underline decoration-accent/35 decoration-1 underline-offset-2 hover:decoration-accent"
                  >
                    {v.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
