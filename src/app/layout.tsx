import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Fixed background decoration — diagonal triangle with dot grid */}
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 900"
        >
          <defs>
            <pattern id="bg-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.4" className="bg-dot" />
            </pattern>
            <clipPath id="bg-tri-clip">
              <polygon points="780,0 1440,0 1440,900" />
            </clipPath>
          </defs>
          <polygon points="780,0 1440,0 1440,900" className="bg-tri" />
          <rect width="1440" height="900" fill="url(#bg-dots)" clipPath="url(#bg-tri-clip)" />
        </svg>
        <Header />
        <div
          className="flex-1 w-full max-w-5xl mx-auto px-4 py-10"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="flex flex-col lg:flex-row gap-10">
            <main className="flex-1 min-w-0">{children}</main>
            <Sidebar />
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Footer />
        </div>
      </body>
    </html>
  );
}
