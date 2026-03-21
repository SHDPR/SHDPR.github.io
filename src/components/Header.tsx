import Link from "next/link";

import { getAllPostsMeta } from "@/lib/posts";

import SearchButton from "./SearchButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const posts = getAllPostsMeta();

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
        borderColor: "var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight gradient-text">
          SHDPR
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link
              href="/tags"
              className="transition-colors duration-200 hover:text-[var(--accent-1)]"
            >
              Tags
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <SearchButton posts={posts} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
