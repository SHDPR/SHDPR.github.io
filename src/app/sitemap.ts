import { MetadataRoute } from "next";

import { getAllPostsMeta, getAllTags } from "@/lib/posts";

const BASE_URL = "https://shdpr-github-io.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();
  const tags = getAllTags();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.datetime || post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${BASE_URL}/tags/${tag}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tags`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...postEntries,
    ...tagEntries,
  ];
}
