import { notFound } from "next/navigation";

import PostCard from "@/components/PostCard";
import { getLang, t } from "@/lib/i18n";
import { getPostsByTag, getAllTags } from "@/lib/posts";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  return { title: `#${tag} — SHDPR` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag, lang);
  const lang = await getLang();
  const tr = t(lang);

  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        <span style={{ color: "var(--text-muted)" }}>{tr.tagPageHeading(tag)}</span>
      </h1>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
