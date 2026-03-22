import type { Metadata } from "next";
import {
  DM_Serif_Display,
  Do_Hyeon,
  Geist,
  Geist_Mono,
  Playfair_Display,
  Syne,
} from "next/font/google";

import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VisitorTracker from "@/components/VisitorTracker";
import { BASE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doHyeon = Do_Hyeon({
  variable: "--font-korean",
  subsets: ["latin"],
  weight: "400",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: "700",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: "italic",
  weight: "400",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "blog@shdpr",
    template: "%s — blog@shdpr",
  },
  description:
    "기술, 여행, 커리어, 일상에 관한 SHDPR의 블로그 / Personal blog by SHDPR about tech, travel, career, and life.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    siteName: "blog@shdpr",
    type: "website",
    locale: "ko_KR",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Runs before first paint — uses system preference only (no localStorage).
const themeInitScript = `
(function() {
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = prefersDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} ${syne.variable} ${doHyeon.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="SHDPR Blog RSS Feed"
          href={`${BASE_URL}/feed.xml`}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Wave shelf — fixed behind every page */}
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "560px",
            zIndex: -1,
            pointerEvents: "none",
          }}
          viewBox="0 0 1440 560"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            className="bg-wave"
            d="M0,0 L1440,0 L1440,430 C1200,512 900,475 600,455 C300,435 140,496 0,478 Z"
          />
        </svg>
        <VisitorTracker />
        <Header lang={lang} />
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <main className="flex-1 min-w-0">{children}</main>
            <Sidebar lang={lang} />
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
