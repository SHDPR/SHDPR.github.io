import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

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

  const views = await redis.incr(`post:views:${slug}`);
  return NextResponse.json({ views });
}
