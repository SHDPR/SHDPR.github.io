import Link from "next/link";

import { getAllTags, getPostsByTag } from "@/lib/posts";

export const metadata = { title: "Tags — SHDPR" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tags</h1>
      {tags.length === 0 ? (
        <p className="text-gray-400 text-sm">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const count = getPostsByTag(tag).length;
            return (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-3 py-1.5 rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition-colors"
              >
                {tag}
                <span className="ml-1.5 text-gray-400 text-xs">{count}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
