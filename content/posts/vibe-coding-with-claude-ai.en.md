---
title: "Building a Blog with Claude AI"
date: "2026-03-22"
tags: ["TECH"]
description: "You can build your own website with no prior coding knowledge"
---

This blog itself is the proof.

I had never done web development. I didn't know what Next.js, Tailwind, or Redis were. Yet I built this blog entirely through conversation with Claude AI. Here's an honest account of how it went.

## How It Started

I didn't know where to begin. It started with a single sentence: "I want to build a blog." Claude suggested the tech stack, and I just said yes.

I didn't write a single line of code myself.

## What the Actual Conversations Looked Like

Here are real examples. This is all it took.

```
Me:     When I click a post in the search, only the title is clickable.
        Make it so clicking anywhere on the card navigates to the post.

Claude: Wrapped the entire PostCard in a <Link>. Take a look.
```

```
Me:     The view count isn't going up at all.

Claude: In a Vercel serverless environment, a server can't reliably
        make HTTP requests to itself. I've changed it to call Redis
        directly from the server component using the SDK.
```

```
Me:     I want a dog avatar. Cute and realistic.

Claude: Here are 10 golden retriever candidates. Pick one.

Me:     I don't like any of them. Use my actual photo. Here's the file.
        Replace the background with white and make the face bigger.
```

```
Me:     I want a Korean/English toggle button in the header.
        Something similar to the theme toggle button.

Claude: Implementing a cookie-based language detection system.
        (14 files modified simultaneously)
```

## The Commit Log: Blog Progress in Real Time

Here's the actual Git commit history. One conversation = one commit.

```
feat: bilingual posts with static .en.md translation files
feat: add i18n (KO/EN toggle), fix avatar, add robots.txt for Google
feat: sitemap, security fix, and avatar image processing
feat: show view count as eye icon + number inline with post title
feat: apply Do Hyeon font for Korean UI text
feat: apply Syne font to blog title with two-line break
fix:  refresh server components after view increment
fix:  resolve TypeScript errors from Prettier reordering
i18n: translate all UI labels to Korean
chore: deepen homepage wave from 30% to 40% viewport height
chore: change category buttons from pill to rectangle shape
chore: reduce padding above recent posts section
```

From "build me a blog" to now: 30+ commits. Time taken: around 6 hours.

## Tips for Using Claude AI Faster and Smarter

Lessons learned from actually doing this.

**Use screenshots liberally**

A single screenshot beats a paragraph of description. UI problems especially — showing is always faster than explaining. I attached a screenshot to almost every UI request.

**Set your principles upfront**

I defined three rules from the start: design first → approve before coding / ask when unsure / every change gets a Git commit. Claude remembers and follows these even across separate conversations.

**Describe symptoms, not solutions**

Say "the view count isn't incrementing" not "change the API to use the SDK." Let Claude diagnose the cause and find the fix.

**Give feedback immediately**

I had the avatar rebuilt five times. Claude doesn't get tired. Instant feedback is the most efficient workflow.

**Tell Claude your deployment environment early**

Saying "this will run on Vercel" upfront means Claude writes environment-appropriate code from the start. It prevents a whole class of bugs that only show up in production.

## Conclusion

You don't need to know how to code. You just need to know **what you want**.

The people who ask better questions get better results.

This blog is still evolving — with Claude.
