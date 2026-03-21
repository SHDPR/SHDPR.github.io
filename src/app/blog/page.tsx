import SearchBar from "@/components/SearchBar";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata = { title: "Blog — SHDPR" };

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      <SearchBar posts={posts} />
    </div>
  );
}
