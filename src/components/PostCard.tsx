import Link from "next/link";

import { PostMeta } from "@/lib/posts";

import TagBadge from "./TagBadge";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card rounded-xl p-5">
      <time className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        {post.date}
      </time>
      <h2 className="mt-2 text-lg font-bold" style={{ color: "var(--text-primary)" }}>
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors duration-200 hover:text-[var(--accent-1)]"
        >
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {post.description}
        </p>
      )}
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
