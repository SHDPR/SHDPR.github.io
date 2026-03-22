import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const TTL_DAYS = 31 * 24 * 60 * 60; // 31 days in seconds

export async function POST() {
  const today = new Date().toISOString().slice(0, 10);
  const key = `blog:daily:visits:${today}`;
  await redis.incr(key);
  await redis.expire(key, TTL_DAYS);
  return NextResponse.json({ ok: true });
}
