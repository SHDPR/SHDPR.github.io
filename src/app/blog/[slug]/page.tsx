import { notFound } from "next/navigation";

import Comments from "@/components/Comments";
import TagBadge from "@/components/TagBadge";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return { title: `${post.title} — SHDPR` };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) notFound();

  return (
    <article className="py-10">
      <header className="mb-12">
        <time
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          {post.date}
        </time>
        <h1 className="text-4xl font-bold mt-3 mb-4 gradient-text leading-tight">{post.title}</h1>
        {post.description && (
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
        <hr className="mt-8" style={{ borderColor: "var(--border)" }} />
      </header>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <h2 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          Comments
        </h2>
        <Comments />
      </div>
    </article>
  );
}
