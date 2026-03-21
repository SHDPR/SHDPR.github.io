import { notFound } from "next/navigation";

import PostCard from "@/components/PostCard";
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
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-gray-500">#{tag}</span> 태그 포스트
      </h1>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
