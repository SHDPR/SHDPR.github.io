import Link from "next/link";

import { Lang, t } from "@/lib/i18n";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export default function CategoryWidget({ lang }: { lang: Lang }) {
  const tags = getAllTags();
  const tr = t(lang);

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h3
        className="text-xs font-bold mb-3 uppercase tracking-widest"
        style={{ color: "var(--text-primary)" }}
      >
        {tr.category_title}
      </h3>
      {tags.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {tr.category_empty}
        </p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            const count = getPostsByTag(tag).length;
            return (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1.5 rounded-md transition-all duration-200 tag-pill"
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
