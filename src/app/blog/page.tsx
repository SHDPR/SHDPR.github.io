import PostCard from "@/components/PostCard";
import { BASE_URL } from "@/lib/constants";
import { getLang, t } from "@/lib/i18n";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  alternates: { canonical: `${BASE_URL}/blog` },
};

export default async function BlogPage() {
  const lang = await getLang();
  const posts = getAllPostsMeta(lang);
  const tr = t(lang);

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-2 gradient-text">{tr.blog_heading}</h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        {tr.blogCount(posts.length)}
      </p>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
