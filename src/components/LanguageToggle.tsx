"use client";

import { useRouter } from "next/navigation";

import { LANG_COOKIE_MAX_AGE } from "@/lib/constants";
import { Lang } from "@/lib/i18n";

export default function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter();

  function toggle() {
    const next = lang === "ko" ? "en" : "ko";
    document.cookie = `lang=${next}; path=/; max-age=${LANG_COOKIE_MAX_AGE}`;
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      aria-label={lang === "ko" ? "언어 변경" : "Change language"}
      title={lang === "ko" ? "Switch to English" : "한국어로 변경"}
      className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 text-lg"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text-muted)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--accent-1)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent-1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
      }}
    >
      {lang === "ko" ? "🇺🇸" : "🇰🇷"}
    </button>
  );
}
