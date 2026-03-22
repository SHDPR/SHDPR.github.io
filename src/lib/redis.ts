import { Redis } from "@upstash/redis";

/** Shared Redis client — import this instead of instantiating per-file. */
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
