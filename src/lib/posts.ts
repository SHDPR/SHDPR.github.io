import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { Lang } from "./i18n";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function readPostFile(
  slug: string,
  lang: Lang,
): { data: matter.GrayMatterFile<string>["data"]; content: string } {
  const langPath = path.join(postsDirectory, `${slug}.${lang}.md`);
  const defaultPath = path.join(postsDirectory, `${slug}.md`);
  const filePath = lang !== "ko" && fs.existsSync(langPath) ? langPath : defaultPath;
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return { data, content };
}

export function getAllPostsMeta(lang: Lang = "ko"): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((name) => name.endsWith(".md") && !name.includes(".en."))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const { data } = readPostFile(slug, lang);

      return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        tags: data.tags ?? [],
        description: data.description ?? "",
      } as PostMeta;
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string, lang: Lang = "ko"): Promise<Post> {
  const { data, content } = readPostFile(slug, lang);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    tags: data.tags ?? [],
    description: data.description ?? "",
    contentHtml,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPostsMeta("ko");
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string, lang: Lang = "ko"): PostMeta[] {
  return getAllPostsMeta(lang).filter((post) => post.tags.includes(tag));
}
