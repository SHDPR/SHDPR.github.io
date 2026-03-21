"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ViewTracker({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    fetch(`/api/views/${slug}`, { method: "POST" }).then(() => router.refresh());
  }, [slug, router]);

  return null;
}
