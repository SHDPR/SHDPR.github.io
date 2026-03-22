import PostCard from "@/components/PostCard";
import { getLang, t } from "@/lib/i18n";
import { getAllPostsMeta } from "@/lib/posts";

export default async function Home() {
  const lang = await getLang();
  const posts = getAllPostsMeta(lang).slice(0, 5);
  const tr = t(lang);

  return (
    <div style={{ position: "relative" }}>
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
