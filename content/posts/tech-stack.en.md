---
title: "Tech Stack Behind This Blog"
date: "2026-03-22"
datetime: "2026-03-22T12:09:27+09:00"
tags: ["TECH", "DAILY"]
description: "From frontend to database, comments, and deployment — every component explained"
---

Decisions were made one at a time through conversations with Claude AI — and somewhere along the way, a fairly solid stack came together.
Here's an honest look at why each technology was chosen and how it held up in practice.

## Overview

| Area | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Database | Upstash Redis |
| Comments | Giscus (GitHub Discussions) |
| Search | Fuse.js |
| Deployment | Vercel |
| Content | Markdown + gray-matter + remark |

---

## Next.js — Framework

A full-stack React framework built on React.

The key feature is the separation of **server components** and **client components**. Components that fetch data (widgets, post lists, etc.) render on the server, while only interactive elements like buttons run in the browser. This keeps unnecessary JavaScript off the client.

URL structure maps directly to folder structure. Creating `/blog/[slug]` makes a post page; `/api/views/[slug]` becomes a view count API. It feels unfamiliar at first but becomes intuitive quickly.

| Pros | Cons |
|---|---|
| Server/client split enables performance optimization | Learning curve |
| File-based routing is intuitive | Somewhat overkill for a simple blog |
| Perfect integration with Vercel | Relatively long build times |
| TypeScript support out of the box | App Router documentation still lacking |

---

## Tailwind CSS — Styling

A CSS framework where design is built entirely from class names.
Utility classes like `text-sm`, `font-bold`, and `rounded-xl` are combined to build UI without any separate CSS files.

The dark/light theme is implemented with CSS custom properties.

```css
:root, [data-theme="dark"] {
  --bg: #1a1a1a;
  --accent-1: #ff1e63;
}
[data-theme="light"] {
  --bg: #ffffff;
}
```

Changing the `data-theme` attribute swaps all variables at once, updating every color on the page. The theme toggle button does nothing more than flip this attribute.

One catch: in v4, applying custom fonts via CSS class gets overridden by Tailwind's cascade and simply doesn't work. Fonts had to be applied directly through inline `style` props instead.

| Pros | Cons |
|---|---|
| Fast UI development with utility classes | Long class strings reduce readability |
| No CSS file management overhead | v4 still has frequent breaking changes |
| Responsive design is intuitive | Custom fonts require extra care |

---

## Fonts

Since this blog exists in both Korean and English, fonts are split between the two.

| Role | Font |
|---|---|
| Post title / body (English) | Playfair Display |
| Blog logo | DM Serif Display |
| Hero heading | Syne |
| General UI (English) | Geist Sans |
| Korean text | Do Hyeon |

Playfair Display was chosen for post body text after building a preview page comparing 12 serif candidates side by side. It struck the right balance between elegance and readability.

---

## Upstash Redis — Database

Used to store post view counts and visitor trends.

Standard Redis causes problems in serverless environments — a new TCP connection must be established on every function invocation, which is expensive. Upstash operates over HTTP, which eliminates this entirely.

The actual usage is straightforward:
- Opening a post increments its view count (`INCR post:views:{slug}`)
- Once a day, the visitor count is tallied (`INCR blog:daily:visits:YYYY-MM-DD`)
- The sidebar sparkline visualizes 14 days of data as an SVG polyline

To prevent inflated counts from repeated refreshes, the browser's localStorage records each visit once per calendar day.

| Pros | Cons |
|---|---|
| Works well in serverless environments | Free tier has request limits |
| HTTP API — no persistent connection needed | Not suited for complex queries |
| Fast response times | Optimized for caching, not durability |

---

## Giscus — Comments

An open-source widget that uses GitHub Discussions as the comment store.

No separate server or database needed. Commenting requires a GitHub account, which felt like a reasonable assumption for a tech blog — and in practice, spam has been nonexistent.

It's embedded automatically at the bottom of every post and syncs with the dark/light theme.

| Pros | Cons |
|---|---|
| No server or DB required, completely free | Requires a GitHub account to comment |
| Spam-free by nature | Dependent on GitHub |
| Theme sync supported | Barrier for non-developer visitors |

---

## Fuse.js — Search

A client-side fuzzy search library.

Clicking the search icon in the header opens a modal that searches post titles and descriptions in real time — no server request, instant results. Typos are tolerated.

With the current number of posts, this approach is ideal. If the post count ever reaches the hundreds, server-side search would be worth considering.

---

## Vercel — Deployment

The deployment platform built by the creators of Next.js. Connect a GitHub repo and every `git push` triggers an automatic build and deploy.

There's one additional feature in use here: the `x-vercel-ip-country` header detects the visitor's country and sets the default language accordingly. Korean visitors see Korean; everyone else sees English.

| Pros | Cons |
|---|---|
| Perfect Next.js integration | High traffic requires paid plan |
| Fully automated deploys from git push | Vendor lock-in |
| Geo-detection and edge features included | Build time limits on free tier |
| Free tier is sufficient for a personal blog | |

---

## Internationalization (i18n) — Custom Built

No external library — built from scratch.

Language is resolved in three steps. If the user has explicitly toggled a language, the cookie takes priority. Without a cookie, Vercel's geo-detection decides. If that's unavailable too, Korean is the default.

Posts are managed as two files: `{slug}.md` (Korean) and `{slug}.en.md` (English). Switching language causes the server to read the appropriate file. It's static file switching, not real-time translation — fast and reliable.

---

## Full Feature List

| Feature | Implementation |
|---|---|
| Dark / Light theme | CSS custom properties, system default on reload |
| Language switch (KO/EN) | Cookie + Vercel geo-detection |
| Post view counts | Upstash Redis INCR |
| Visitor sparkline | Redis 14-day data + SVG |
| Client-side search | Fuse.js fuzzy search |
| Comments | Giscus (GitHub Discussions) |
| Popular posts widget | Sorted by Redis view count |
| Categories / Tags | Markdown frontmatter |
| Sitemap | Auto-generated `/sitemap.xml` |
| Google Search Console | Verification file + sitemap submission |
| Bilingual posts | `.md` + `.en.md` static files |
| SEO meta tags | Next.js metadata API |

---

The one thing this entire stack has in common: **no server to manage**.

A single `git push` deploys worldwide. Redis and Vercel handle the rest.
More than enough for a personal blog — and the cost is zero.
