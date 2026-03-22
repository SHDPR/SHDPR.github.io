import { notFound } from "next/navigation";

import BackToTop from "@/components/BackToTop";
import Comments from "@/components/Comments";
import TagBadge from "@/components/TagBadge";
import ViewTracker from "@/components/ViewTracker";
import { BASE_URL } from "@/lib/constants";
import { getLang, t } from "@/lib/i18n";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang();
  const post = await getPostBySlug(slug, lang).catch(() => null);
  if (!post) return {};

  const url = `${BASE_URL}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages: {
        ko: url,
        en: url,
        "x-default": url,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.datetime,
      modifiedTime: post.datetime,
      locale: lang === "ko" ? "ko_KR" : "en_US",
      authors: ["SHDPR"],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang();
  const post = await getPostBySlug(slug, lang).catch(() => null);
  const tr = t(lang);

  if (!post) notFound();

  const url = `${BASE_URL}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datetime,
    dateModified: post.datetime,
    author: { "@type": "Person", name: "SHDPR", url: BASE_URL },
    publisher: { "@type": "Organization", name: "blog@shdpr", url: BASE_URL },
    url,
    inLanguage: lang === "ko" ? "ko-KR" : "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <article className="py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackToTop />
      <ViewTracker slug={slug} />
      <header className="mb-12">
        <time
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          {post.date}
        </time>
        <h1
          className="text-4xl font-bold mt-3 mb-4 gradient-text leading-tight"
          style={{ fontFamily: "var(--font-playfair), var(--font-korean), serif" }}
        >
          {post.title}
        </h1>
        {post.description && (
          <p
            className="text-lg leading-relaxed"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-playfair), var(--font-korean), serif",
            }}
          >
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
        <hr className="mt-8" style={{ borderColor: "var(--border)" }} />
      </header>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <h2 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          {tr.comments_heading}
        </h2>
        <Comments />
      </div>
    </article>
  );
}
