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
        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <div className="mt-4">
        {results.length === 0 ? (
          <p className="text-sm text-gray-400">No posts found.</p>
        ) : (
          results.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
