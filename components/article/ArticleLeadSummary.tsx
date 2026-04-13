import type { ReactNode } from "react";

/** 2–4 предложения «ответ сразу» перед подробной частью статьи. */
export function ArticleLeadSummary({ children }: { children: ReactNode }) {
  return <div className="article-lead-summary">{children}</div>;
}
