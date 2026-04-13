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
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "ru",
    categories: ["health", "lifestyle", "utilities"],
    /** Статический `app/favicon.ico` (копия в `out/`); см. `scripts/strip-favicon-query.mjs` для URL без query. */
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
        purpose: "any",
      },
    ],
  };
}
