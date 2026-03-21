# CLAUDE.md — Working Principles

These rules apply to every session working on this project.

## Principles

1. **Top-down coding**: Always do an architecture review before any implementation. Present the plan and wait for approval before writing code.
2. **Ask when unsure**: Never assume. Ask the user when not confident about a decision.
3. **Git for every submission**: Every code change must be committed AND pushed via Git. No exceptions. Commit flow: `npm run build` (must pass) → `git add` → `git commit` → `git push`.
4. **Verify after every push**: After every push, visit https://shdpr-github-io.vercel.app (wait for Vercel to redeploy, ~1 min) and confirm the intended change is correctly reflected. Report the result to the user.
5. **Update memory after every task**: After completing any user request, update the relevant memory files in `~/.claude/projects/` to reflect current project state.

## Project Overview

A personal blog built with Next.js, Tailwind CSS, deployed on Vercel.

- **Owner**: SHDPR
- **GitHub repo**: SHDPR/SHDPR.github.io
- **Phase 1**: Read-only blog, markdown files as content
- **Phase 2 (future)**: Admin panel with GitHub OAuth login, no DB (GitHub API for writing posts)

## Tech Stack

- Framework: Next.js (App Router, TypeScript)
- Styling: Tailwind CSS
- Markdown: gray-matter + remark
- Comments: Giscus (GitHub Discussions)
- Search: Fuse.js (client-side)
- Hosting: Vercel

## Content

- Posts live in `/content/posts/*.md`
- Frontmatter fields: `title`, `date`, `tags`, `description`

## Key Directories

| Path | Role |
|---|---|
| `content/posts/` | Markdown blog posts |
| `src/app/` | Pages (each folder = a URL route) |
| `src/components/` | Reusable UI components |
| `src/lib/` | Utility functions (markdown reading, etc.) |
| `public/` | Static assets (images, icons) |
