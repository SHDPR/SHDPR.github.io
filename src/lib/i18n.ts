export const translations = {
  ko: {
    nav_blog: "블로그",
    nav_tags: "태그",
    about_role: (yrs: number) => `${yrs}년차 SSD 펌웨어 엔지니어`,
    category_title: "카테고리",
    category_empty: "카테고리가 없습니다.",
    popular_title: "인기 포스트",
    popular_empty: "포스트가 없습니다.",
    recent_title: "최근 포스트",
    recent_empty: "포스트가 없습니다.",
    blog_heading: "전체 포스트",
    tags_heading: "태그",
    tags_subtitle: "태그별 포스트 보기",
    tags_empty: "태그가 없습니다.",
    search_placeholder: "포스트 검색...",
    search_empty_prompt: "검색어를 입력하세요...",
    search_aria: "포스트 검색",
    search_close_aria: "검색 닫기",
    comments_heading: "댓글",
    lang_aria: "언어 변경",
    blogCount: (n: number) => `총 ${n}개의 포스트`,
    searchNoResults: (q: string) => `"${q}" 검색 결과가 없습니다.`,
    tagPageHeading: (tag: string) => `#${tag} 태그 포스트`,
  },
  en: {
    nav_blog: "Blog",
    nav_tags: "Tags",
    about_role: (yrs: number) => `${yrs}-Year SSD Firmware Engineer`,
    category_title: "Categories",
    category_empty: "No categories yet.",
    popular_title: "Popular Posts",
    popular_empty: "No posts yet.",
    recent_title: "Recent Posts",
    recent_empty: "No posts yet.",
    blog_heading: "All Posts",
    tags_heading: "Tags",
    tags_subtitle: "Browse posts by tag",
    tags_empty: "No tags yet.",
    search_placeholder: "Search posts...",
    search_empty_prompt: "Type something to search...",
    search_aria: "Search posts",
    search_close_aria: "Close search",
    comments_heading: "Comments",
    lang_aria: "Change language",
    blogCount: (n: number) => `${n} post${n !== 1 ? "s" : ""}`,
    searchNoResults: (q: string) => `No results for "${q}".`,
    tagPageHeading: (tag: string) => `#${tag} posts`,
  },
} as const;

export type Lang = keyof typeof translations;

export async function getLang(): Promise<Lang> {
  const { cookies, headers } = await import("next/headers");

  // 1. Explicit user preference (cookie) always wins
  const cookieLang = (await cookies()).get("lang")?.value;
  if (cookieLang === "en" || cookieLang === "ko") return cookieLang;

  // 2. Geo-detect via Vercel's x-vercel-ip-country header
  const country = (await headers()).get("x-vercel-ip-country");
  if (country && country !== "KR") return "en";

  // 3. Korea or undetectable → Korean
  return "ko";
}

export function t(lang: Lang) {
  return translations[lang];
}
