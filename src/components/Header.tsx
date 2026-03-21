import Link from "next/link";

import { Lang, t } from "@/lib/i18n";
import { getAllPostsMeta } from "@/lib/posts";

import LanguageToggle from "./LanguageToggle";
import SearchButton from "./SearchButton";
import ThemeToggle from "./ThemeToggle";

export default function Header({ lang }: { lang: Lang }) {
  const posts = getAllPostsMeta(lang);
  const tr = t(lang);

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
          <nav
            className="flex gap-6 text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            <Link
              href="/blog"
              className="transition-colors duration-200 hover:text-[var(--accent-1)]"
            >
              {tr.nav_blog}
            </Link>
            <Link
              href="/tags"
              className="transition-colors duration-200 hover:text-[var(--accent-1)]"
            >
              {tr.nav_tags}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <SearchButton posts={posts} lang={lang} />
            <LanguageToggle lang={lang} />
            <ThemeToggle />
            <a
              href="https://github.com/SHDPR/SHDPR.github.io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="github-btn flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
