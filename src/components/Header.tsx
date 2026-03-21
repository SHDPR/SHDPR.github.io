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
        <Link href="/" style={{ position: "relative", display: "inline-block" }}>
          {/* Shadow layer */}
          <span
            style={{
              position: "absolute",
              top: "4px",
              left: "4px",
              width: "100%",
              height: "100%",
              background: "#FF1E63",
              borderRadius: "4px",
              opacity: 0.5,
            }}
          />
          {/* Main box */}
          <span
            style={{
              position: "relative",
              display: "block",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "4px 12px",
              borderRadius: "4px",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "20px",
              color: "var(--text-primary)",
            }}
          >
            shdpr
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link
              href="/blog"
              className="transition-colors duration-200 hover:text-[var(--accent-1)]"
            >
              블로그
            </Link>
            <Link
              href="/tags"
              className="transition-colors duration-200 hover:text-[var(--accent-1)]"
            >
              태그
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
