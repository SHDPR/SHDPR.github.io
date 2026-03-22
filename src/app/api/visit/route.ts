import { NextResponse } from "next/server";

import { VIEW_TTL_SECONDS } from "@/lib/constants";
import { getTodayDateString } from "@/lib/dates";
import { redis } from "@/lib/redis";

export async function POST() {
  const key = `blog:daily:visits:${getTodayDateString()}`;
  await redis.incr(key);
  await redis.expire(key, VIEW_TTL_SECONDS);
  return NextResponse.json({ ok: true });
}
