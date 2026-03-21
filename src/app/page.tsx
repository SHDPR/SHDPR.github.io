import Link from "next/link";

import PostCard from "@/components/PostCard";
import { getAllPostsMeta } from "@/lib/posts";

export default function Home() {
  const posts = getAllPostsMeta().slice(0, 5);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">SHDPR</h1>
      <p className="text-gray-500 mb-10">Thoughts on tech, travel, and everything in between.</p>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <Link href="/blog" className="text-sm text-gray-500 hover:text-black transition-colors">
            All posts →
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="text-gray-400 text-sm">No posts yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </section>
    </div>
  );
}
