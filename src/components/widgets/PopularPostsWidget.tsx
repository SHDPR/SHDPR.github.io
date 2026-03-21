import Link from "next/link";

import { getAllPostsMeta } from "@/lib/posts";

async function getViewCounts(): Promise<Record<string, number>> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const res = await fetch(`${baseUrl}/api/views`, { cache: "no-store" });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export default async function PopularPostsWidget() {
  const posts = getAllPostsMeta();
  const views = await getViewCounts();

  const sorted = [...posts].sort((a, b) => (views[b.slug] ?? 0) - (views[a.slug] ?? 0)).slice(0, 3);

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>
        Popular Posts
      </h3>
      {sorted.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          No posts yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block text-sm font-medium transition-colors duration-200 hover:text-[var(--accent-1)]"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </Link>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {views[post.slug] ?? 0} views
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
