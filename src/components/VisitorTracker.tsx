"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const key = `visited:daily:${today}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
    fetch("/api/visit", { method: "POST" });
  }, []);

  return null;
}
