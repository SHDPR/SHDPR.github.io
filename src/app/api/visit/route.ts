import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST() {
  const today = new Date().toISOString().slice(0, 10);
  await redis.incr(`blog:daily:visits:${today}`);
  return NextResponse.json({ ok: true });
}
