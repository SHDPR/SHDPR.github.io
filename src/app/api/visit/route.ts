import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

import { VIEW_TTL_SECONDS } from "@/lib/constants";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST() {
  const today = new Date().toISOString().slice(0, 10);
  const key = `blog:daily:visits:${today}`;
  await redis.incr(key);
  await redis.expire(key, VIEW_TTL_SECONDS);
  return NextResponse.json({ ok: true });
}
