import { ImageResponse } from "next/og";
import { siteContent } from "@/content/site";
import { OgBrandMarkup } from "@/lib/og-image-brand";

export const dynamic = "force-static";

export const alt = `${siteContent.shortName} — расчёт калорий, TDEE, ИМТ и статьи`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Twitter card `summary_large_image` использует тот же кадр, что и Open Graph. */
export default function TwitterImage() {
  return new ImageResponse(<OgBrandMarkup />, { ...size });
}
