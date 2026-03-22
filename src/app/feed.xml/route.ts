import { BASE_URL, RSS_CACHE_MAX_AGE_SECONDS } from "@/lib/constants";
import { getAllPostsMeta } from "@/lib/posts";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPostsMeta("ko");

  const items = posts
    .map((post) => {
      const pubDate = new Date(post.datetime || post.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SHDPR Blog</title>
    <link>${BASE_URL}</link>
    <description>기술, 여행, 커리어, 일상에 관한 SHDPR의 블로그 / Personal blog by SHDPR about tech, travel, career, and life.</description>
    <language>ko</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": `s-maxage=${RSS_CACHE_MAX_AGE_SECONDS}, stale-while-revalidate`,
    },
  });
}
