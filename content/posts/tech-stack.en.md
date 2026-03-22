---
title: "Tech Stack Behind This Blog"
date: "2026-03-22"
tags: ["TECH"]
description: "From frontend to database, comments, and deployment — every component explained"
---

Here's a breakdown of every technology used to build this blog, and the reasoning behind each choice.
I started with zero web development knowledge — but looking back, the stack turned out to be solid.

## Overview

| Area | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Database | Upstash Redis |
| Comments | Giscus (GitHub Discussions) |
| Search | Fuse.js |
| Deployment | Vercel |
| Content | Markdown (.md) + gray-matter + remark |

---

## Framework — Next.js

A full-stack React framework. It separates server and client components for performance, and uses file-based routing where folder structure maps directly to URL structure.

This blog uses the App Router:
- `/` — Home (recent posts)
- `/blog/[slug]` — Individual post
- `/tags/[tag]` — Posts by tag
- `/api/views/[slug]` — View count API
- `/api/visit` — Visitor counter API

| Pros | Cons |
|---|---|
| Server/client split enables performance optimization | Learning curve for beginners |
| File-based routing is intuitive | App Router vs Pages Router confusion |
| Perfect integration with Vercel | May be overkill for a simple blog |
| TypeScript support out of the box | Relatively long build times |

---

## Styling — Tailwind CSS v4

A utility-first CSS framework. Design is applied entirely through HTML class names — no separate CSS files needed.

Dark/light theme is implemented with CSS custom properties (`--bg`, `--surface`, `--accent-1`, etc.), toggled via a `data-theme` attribute.

```css
:root, [data-theme="dark"] {
  --bg: #1a1a1a;
  --accent-1: #ff1e63;
}
[data-theme="light"] {
  --bg: #ffffff;
  --accent-1: #ff1e63;
}
```

| Pros | Cons |
|---|---|
| Fast UI development with utility classes | Long class strings reduce readability |
| No CSS file management overhead | Custom fonts require inline style (v4 issue) |
| Responsive design is intuitive | v4 still has breaking changes |

---

## Fonts

| Role | Font |
|---|---|
| Post title / body | Playfair Display (English serif) |
| Blog logo | DM Serif Display |
| Hero heading | Syne |
| General UI | Geist Sans |
| Korean text | Do Hyeon |

Playfair Display is applied to English posts for a refined editorial feel.
Due to a Tailwind v4 CSS cascade issue, fonts are applied via inline `style` props rather than CSS classes.

---

## Database — Upstash Redis

A serverless-optimized Redis hosting service. It operates over HTTP, making it compatible with Vercel's Edge environment without persistent connections.

Redis is used for:
- **Post view counts** — INCR on key `post:views:{slug}`
- **Daily visitor counts** — INCR on key `blog:daily:visits:YYYY-MM-DD`
- **Visitor sparkline** — 14-day data rendered as an SVG chart

For security, the view count API validates each slug against the known post list before incrementing.
Duplicate visits are prevented via localStorage (`visited:daily:YYYY-MM-DD`), counting once per day.

| Pros | Cons |
|---|---|
| Works well in serverless environments | Free tier has request limits |
| HTTP API — no persistent connection needed | Optimized for caching, not complex queries |
| Fast response times | No relational queries |

---

## Comments — Giscus

An open-source widget that uses GitHub Discussions as the comment store.
No separate database or server needed — anyone with a GitHub account can comment, and spam is essentially nonexistent.

It's embedded as a `<Comments />` component at the bottom of each post, and syncs with the dark/light theme.

| Pros | Cons |
|---|---|
| No server or DB required | Requires a GitHub account to comment |
| Spam-free by nature | Dependent on GitHub |
| Theme sync supported | Barrier for non-technical visitors |
| Completely free | |

---

## Search — Fuse.js

A client-side fuzzy search library. Posts are searched in the browser without any server requests.

Clicking the search icon in the header opens a modal that searches post titles and descriptions in real time.

| Pros | Cons |
|---|---|
| No server request — instant results | More posts = larger initial data payload |
| Fuzzy matching tolerates typos | Full-body search requires additional implementation |
| Simple to set up | |

---

## Deployment — Vercel

The deployment platform built by the creators of Next.js. After connecting a GitHub repo, every `git push` triggers an automatic build and deploy.

Vercel features used in this blog:
- **Auto-deploy** — push to main → build → live in ~1 minute
- **Geo-detection** — `x-vercel-ip-country` header sets the default language (KR → Korean, others → English)
- **Environment variables** — Redis tokens and secrets stored securely

| Pros | Cons |
|---|---|
| Perfect Next.js integration | High traffic requires paid plan |
| Fully automated deploys from git push | Build time limits on free tier |
| Geo-detection and edge features included | Vendor lock-in |
| Free tier is sufficient for a personal blog | |

---

## Internationalization (i18n)

Implemented without any external library.

**Language resolution order:**
1. `lang` cookie (user's explicit choice)
2. Vercel `x-vercel-ip-country` header (KR → Korean, others → English)
3. Default: Korean

**Bilingual posts:**
- `{slug}.md` — Korean (default)
- `{slug}.en.md` — English

The language toggle in the header shows 🇰🇷 / 🇺🇸 flag emojis.

---

## Content — Markdown

Posts are stored as `.md` files in `/content/posts/`. Metadata is managed through frontmatter.

```markdown
---
title: "Post Title"
date: "2026-03-22"
tags: ["TECH"]
description: "One-line summary"
---
Post content here...
```

`gray-matter` parses the frontmatter, and `remark` converts Markdown to HTML.

---

## Full Feature List

| Feature | Implementation |
|---|---|
| Dark / Light theme | CSS custom properties + localStorage |
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

The common thread across this entire stack is **serverless**.
No server to manage — a single `git push` deploys worldwide, and Redis + Vercel handle the rest.
More than enough for a personal blog, and the cost is effectively zero.
