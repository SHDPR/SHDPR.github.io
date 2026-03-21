import Link from "next/link";

import { getAllTags, getPostsByTag } from "@/lib/posts";

export const metadata = { title: "Tags — SHDPR" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-2 gradient-text">Tags</h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        Browse posts by topic
      </p>
      {tags.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          No tags yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const count = getPostsByTag(tag).length;
            return (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="tag-pill px-4 py-2 rounded-full text-sm font-medium"
              >
                {tag}
                <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
