import SearchBar from "@/components/SearchBar";
import { getAllPostsMeta } from "@/lib/posts";


export const metadata = { title: "Blog — SHDPR" };

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-2 gradient-text">All Posts</h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        {posts.length} {posts.length === 1 ? "post" : "posts"} total
      </p>
      <SearchBar posts={posts} />
    </div>
  );
}
