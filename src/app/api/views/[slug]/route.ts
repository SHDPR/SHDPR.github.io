import { NextResponse } from "next/server";

import { VIEW_TTL_SECONDS } from "@/lib/constants";
import { getTodayDateString } from "@/lib/dates";
import { getAllPostsMeta } from "@/lib/posts";
import { redis } from "@/lib/redis";

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

  const today = getTodayDateString();
  const dailyKey = `post:daily:views:${slug}:${today}`;
  const totalKey = `post:views:${slug}`;

  const [views] = await Promise.all([
    redis.incr(totalKey),
    redis.incr(dailyKey).then(() => redis.expire(dailyKey, VIEW_TTL_SECONDS)),
  ]);

  return NextResponse.json({ views });
}
