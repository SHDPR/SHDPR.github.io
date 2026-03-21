"use client";

import Fuse from "fuse.js";
import { useEffect, useRef, useState } from "react";

import { PostMeta } from "@/lib/posts";

import PostCard from "./PostCard";

interface SearchButtonProps {
  posts: PostMeta[];
}

export default function SearchButton({ posts }: SearchButtonProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = new Fuse(posts, { keys: ["title", "description", "tags"], threshold: 0.4 });
  const results = query.trim() === "" ? [] : fuse.search(query).map((r) => r.item);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="포스트 검색"
        className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--accent-1)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent-1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            backgroundColor: "var(--bg)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top bar: input + close */}
          <div className="max-w-3xl mx-auto w-full" style={{ padding: "24px 24px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="포스트 검색..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input flex-1 px-4 py-3 rounded-xl text-sm"
              />
              <button
                onClick={close}
                aria-label="검색 닫기"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Results */}
          <div
            className="max-w-3xl mx-auto w-full"
            style={{ flex: 1, overflowY: "auto", padding: "24px" }}
          >
            {query.trim() === "" ? (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                검색어를 입력하세요...
              </p>
            ) : results.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                &ldquo;{query}&rdquo; 검색 결과가 없습니다.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {results.map((post) => (
                  <div key={post.slug} onClick={close}>
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
