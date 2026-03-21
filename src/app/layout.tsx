import type { Metadata } from "next";
import { DM_Serif_Display, Do_Hyeon, Geist, Geist_Mono, Syne } from "next/font/google";

import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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

export const metadata: Metadata = {
  title: "SHDPR Blog",
  description: "Personal blog by SHDPR",
};

// Runs before first paint — reads localStorage or system preference and sets
// data-theme on <html> to prevent any flash of wrong theme.
const themeInitScript = `
(function() {
  var saved = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} ${syne.variable} ${doHyeon.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <main className="flex-1 min-w-0">{children}</main>
            <Sidebar />
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
