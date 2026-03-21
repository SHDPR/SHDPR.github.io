import Link from "next/link";

import { getAllTags, getPostsByTag } from "@/lib/posts";

export default function CategoryWidget() {
  const tags = getAllTags();

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>
        Browse by Category
      </h3>
      {tags.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          No categories yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {tags.map((tag) => {
            const count = getPostsByTag(tag).length;
            return (
              <li key={tag}>
                <Link
                  href={`/tags/${tag}`}
                  className="flex items-center justify-between text-sm transition-colors duration-200 hover:text-[var(--accent-1)]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span>{tag}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-md"
                    style={{ backgroundColor: "var(--bg)", color: "var(--text-muted)" }}
                  >
                    {count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
