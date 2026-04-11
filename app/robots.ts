import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  /** Для Яндекса в `Host:` нужен только хост без схемы (не `https://…`). */
  let host: string | undefined;
  try {
    host = new URL(base).host;
  } catch {
    host = undefined;
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    ...(host ? { host } : {}),
  };
}
