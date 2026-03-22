import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

import { VIEW_TTL_SECONDS } from "@/lib/constants";
import { getAllPostsMeta } from "@/lib/posts";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache valid slugs at module level (refreshed on cold start)
let validSlugs: Set<string> | null = null;

function getValidSlugs(): Set<string> {
  if (!validSlugs) {
    validSlugs = new Set(getAllPostsMeta().map((p) => p.slug));
  }
  return validSlugs;
}

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Reject unknown slugs — prevents arbitrary Redis key injection
  if (!getValidSlugs().has(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const dailyKey = `post:daily:views:${slug}:${today}`;
  const totalKey = `post:views:${slug}`;

  const [views] = await Promise.all([
    redis.incr(totalKey),
    redis.incr(dailyKey).then(() => redis.expire(dailyKey, VIEW_TTL_SECONDS)),
  ]);

  return NextResponse.json({ views });
}
