/**
 * Разметка для `next/og` ImageResponse (OG + Twitter).
 * ИИ: только inline styles; без внешних CSS и без `className` Tailwind.
 */
import { siteContent } from "@/content/site";

export function OgBrandMarkup() {
  const line =
    siteContent.description.length > 138
      ? `${siteContent.description.slice(0, 135)}…`
      : siteContent.description;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 56,
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "linear-gradient(145deg, #141414 0%, #0a0a0a 45%, #0c1208 100%)",
      }}
    >
      <div
        style={{
          fontSize: 54,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#daf97a",
          lineHeight: 1.08,
          maxWidth: 1000,
        }}
      >
        {siteContent.shortName}
      </div>
      <div
        style={{
          marginTop: 26,
          fontSize: 25,
          lineHeight: 1.42,
          color: "#a3a3a3",
          maxWidth: 940,
        }}
      >
        {line}
      </div>
      <div
        style={{
          marginTop: 34,
          fontSize: 17,
          color: "#525252",
        }}
      >
        Калькулятор TDEE · ИМТ · вода · материалы по питанию
      </div>
    </div>
  );
}
