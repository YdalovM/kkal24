/**
 * Корневой layout: шрифты, глобальные meta/viewport, оболочка (постоянный сайдбар + контент + футер).
 * Контент маршрутов — в `children`; метаданные отдельных статей — в их `page.tsx`.
 */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteContent } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import { YandexMetrika } from "@/components/analytics/YandexMetrika";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const siteUrl = getSiteUrl();

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/**
 * Глобальные умолчания. Canonical, полные OG/Twitter и title главной — в `app/page.tsx` (`buildHomeMetadata`).
 * Иначе дочерние маршруты наследуют canonical «/», что ломает индексацию статей.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteContent.title,
    template: `%s — ${siteContent.shortName}`,
  },
  description: siteContent.description,
  applicationName: siteContent.shortName,
  keywords: [...siteContent.keywords],
  openGraph: {
    locale: "ru_RU",
    siteName: siteContent.shortName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    yandex: "95e6516a9f3d4b0e",
    ...(googleVerification ? { google: googleVerification } : {}),
  },
};

/** Масштаб под ширину устройства; maximumScale — чтобы не ломать доступность зума. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
  /** Чтобы `env(safe-area-inset-*)` работали на iPhone с вырезом при `viewport-fit=cover`. */
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-fg antialiased [text-wrap:pretty] selection:bg-[color-mix(in_srgb,var(--app-accent)_32%,transparent)]">
        <SiteShell>{children}</SiteShell>
        <YandexMetrika />
      </body>
    </html>
  );
}
