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
  const results = query.trim() === "" ? posts : fuse.search(query).map((r) => r.item);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search posts"
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
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "80px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "640px",
              backgroundColor: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              overflow: "hidden",
              maxHeight: "70vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Search input */}
            <div style={{ padding: "16px", borderBottom: "1px solid var(--border)" }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>

            {/* Results */}
            <div
              style={{
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {results.length === 0 ? (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  No posts found.
                </p>
              ) : (
                results.map((post) => (
                  <div key={post.slug} onClick={close}>
                    <PostCard post={post} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
