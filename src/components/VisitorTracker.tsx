"use client";

import { useEffect } from "react";

import { getTodayDateString } from "@/lib/dates";

export default function VisitorTracker() {
  useEffect(() => {
    const today = getTodayDateString();
    const key = `visited:daily:${today}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
    fetch("/api/visit", { method: "POST" });
  }, []);

  return null;
}
