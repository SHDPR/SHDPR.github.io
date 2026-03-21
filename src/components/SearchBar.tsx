"use client";

import Fuse from "fuse.js";
import { useMemo, useState } from "react";


import { PostMeta } from "@/lib/posts";

import PostCard from "./PostCard";

interface SearchBarProps {
  posts: PostMeta[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.4,
      }),
    [posts],
  );

  const results = useMemo(() => {
    if (query.trim() === "") return posts;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, posts]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input w-full px-4 py-3 rounded-xl text-sm"
      />
      <div className="mt-6 flex flex-col gap-4">
        {results.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No posts found.
          </p>
        ) : (
          results.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
