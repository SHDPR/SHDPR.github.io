import Link from "next/link";

import { getAllPostsMeta } from "@/lib/posts";

export default function LatestPostsWidget() {
  const posts = getAllPostsMeta().slice(0, 3);

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>
        Latest Posts
      </h3>
      {posts.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          No posts yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block text-sm font-medium transition-colors duration-200 hover:text-[var(--accent-1)]"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </Link>
              <time className="text-xs" style={{ color: "var(--text-muted)" }}>
                {post.date}
              </time>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
