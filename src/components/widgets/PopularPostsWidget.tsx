import { Redis } from "@upstash/redis";
import Link from "next/link";

import { Lang, t } from "@/lib/i18n";
import { getAllPostsMeta } from "@/lib/posts";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

function getLast30Days(): string[] {
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().slice(0, 10);
  });
}

async function get30DayViewCounts(slugs: string[]): Promise<Record<string, number>> {
  if (slugs.length === 0) return {};
  const days = getLast30Days();
  // Build all keys: post:daily:views:{slug}:{date} for every slug × day
  const allKeys = slugs.flatMap((slug) => days.map((day) => `post:daily:views:${slug}:${day}`));
  try {
    const counts = await redis.mget<number[]>(...allKeys);
    const result: Record<string, number> = {};
    slugs.forEach((slug, si) => {
      result[slug] = days.reduce((sum, _, di) => sum + (counts[si * 30 + di] ?? 0), 0);
    });
    return result;
  } catch {
    return {};
  }
}

export default async function PopularPostsWidget({ lang }: { lang: Lang }) {
  const posts = getAllPostsMeta(lang);
  const views = await get30DayViewCounts(posts.map((p) => p.slug));
  const tr = t(lang);

  const sorted = [...posts]
    .sort((a, b) => (views[b.slug] ?? 0) - (views[a.slug] ?? 0))
    .slice(0, 10);

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h3
        className="text-xs font-bold mb-3 uppercase tracking-widest"
        style={{ color: "var(--text-primary)" }}
      >
        {tr.popular_title}
      </h3>
      {sorted.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {tr.popular_empty}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-center justify-between gap-2 text-sm font-medium transition-colors duration-200 hover:text-[var(--accent-1)]"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-playfair), var(--font-korean), serif",
                }}
              >
                <span>{post.title}</span>
                <span
                  className="flex items-center gap-1 text-xs shrink-0"
                  style={{ color: "var(--text-muted)" }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {views[post.slug] ?? 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
