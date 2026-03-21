import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

import { getAllPostsMeta } from "@/lib/posts";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  const posts = getAllPostsMeta();
  const keys = posts.map((p) => `post:views:${p.slug}`);

  if (keys.length === 0) return NextResponse.json({});

  const counts = await redis.mget<number[]>(...keys);
  const result: Record<string, number> = {};
  posts.forEach((p, i) => {
    result[p.slug] = counts[i] ?? 0;
  });

  return NextResponse.json(result);
}
