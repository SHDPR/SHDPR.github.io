import PostCard from "@/components/PostCard";
import { getLang, t } from "@/lib/i18n";
import { getAllPostsMeta } from "@/lib/posts";

export default async function Home() {
  const lang = await getLang();
  const posts = getAllPostsMeta(lang).slice(0, 5);
  const tr = t(lang);

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
          height: "560px",
          zIndex: -1,
          pointerEvents: "none",
        }}
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          className="bg-wave"
          d="M0,0 L1440,0 L1440,430 C1200,512 900,475 600,455 C300,435 140,496 0,478 Z"
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
          <h2
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--text-primary)" }}
          >
            {tr.recent_title}
          </h2>
        </div>
        {posts.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {tr.recent_empty}
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
