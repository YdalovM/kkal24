import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon через `next/og` (без отдельного .ico в репозитории).
 * ИИ: при появлении бренд-гайда замените на статический `app/icon.png`.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#b8e943",
          color: "#0a0a0a",
          fontSize: 20,
          fontWeight: 800,
        }}
      >
        К
      </div>
    ),
    { ...size },
  );
}
