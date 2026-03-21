import PostCard from "@/components/PostCard";
import { getAllPostsMeta } from "@/lib/posts";

export default function Home() {
  const posts = getAllPostsMeta().slice(0, 5);

  return (
    <div style={{ position: "relative" }}>
      {/* Deep shelf wave — homepage only, fixed behind viewport top */}
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "420px",
          zIndex: -1,
          pointerEvents: "none",
        }}
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          className="bg-wave"
          d="M0,0 L1440,0 L1440,320 C1200,385 900,355 600,340 C300,325 140,372 0,358 Z"
        />
      </svg>
      {/* Hero */}
      <section className="pt-0 pb-10">
        <h1
          className="text-5xl font-bold gradient-text leading-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Counting
          <br />
          Sand Grains
        </h1>
      </section>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* Recent posts */}
      <section className="pt-6 pb-12">
        <div className="mb-8">
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            최근 포스트
          </h2>
        </div>
        {posts.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            포스트가 없습니다.
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
