import Link from "next/link";

import { getLang, t } from "@/lib/i18n";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export const metadata = { title: "Tags — SHDPR" };

export default async function TagsPage() {
  const tags = getAllTags();
  const lang = await getLang();
  const tr = t(lang);

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-2 gradient-text">{tr.tags_heading}</h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        {tr.tags_subtitle}
      </p>
      {tags.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {tr.tags_empty}
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
