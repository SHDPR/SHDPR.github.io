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
        카테고리
      </h3>
      {tags.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          카테고리가 없습니다.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const count = getPostsByTag(tag).length;
            return (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200 tag-pill"
              >
                {tag}
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent-1) 15%, transparent)",
                    color: "var(--accent-1)",
                  }}
                >
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
