import Link from "next/link";

import PostCard from "@/components/PostCard";
import { getAllPostsMeta } from "@/lib/posts";


export default function Home() {
  const posts = getAllPostsMeta().slice(0, 5);

  return (
    <div>
      {/* Hero */}
      <section className="py-16">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Welcome to my corner of the internet
        </p>
        <h1 className="text-5xl font-bold mb-6 gradient-text leading-tight">SHDPR</h1>
        <p className="text-lg leading-relaxed max-w-xl" style={{ color: "var(--text-muted)" }}>
          I write about things I find interesting — tech, travel, career, and everyday life. No
          fixed schedule, just honest words when I have something worth saying.
        </p>
      </section>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* Recent posts */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Recent Posts
          </h2>
          <Link
            href="/blog"
            className="text-sm transition-colors duration-200 hover:text-[var(--accent-1)]"
            style={{ color: "var(--text-muted)" }}
          >
            All posts →
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No posts yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
