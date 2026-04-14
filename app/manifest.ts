import type { MetadataRoute } from "next";
import { siteContent } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteContent.title,
    short_name: siteContent.shortName,
    description: siteContent.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0c0f",
    theme_color: "#0a0c0f",
    lang: "ru",
    categories: ["health", "lifestyle", "utilities"],
    /** PNG из `app/icon.png` (тот же рисунок, что и `app/favicon.ico`). */
    icons: [
      {
        src: "/icon.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
