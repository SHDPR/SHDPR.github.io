---
title: "이 블로그를 만든 기술 스택"
date: "2026-03-22"
tags: ["TECH"]
description: "프론트엔드부터 DB, 댓글, 배포까지 — 모든 구성 요소를 정리했습니다"
---

이 블로그를 만들면서 선택한 기술들, 그리고 각 선택의 이유를 정리했습니다.
코딩을 모르는 상태에서 시작했지만, 돌아보면 꽤 탄탄한 스택이 갖춰졌습니다.

## 전체 구조 한눈에 보기

| 영역 | 기술 |
|---|---|
| 프레임워크 | Next.js 15 (App Router, TypeScript) |
| 스타일링 | Tailwind CSS v4 |
| 데이터베이스 | Upstash Redis |
| 댓글 | Giscus (GitHub Discussions) |
| 검색 | Fuse.js |
| 배포 | Vercel |
| 콘텐츠 | Markdown (.md) + gray-matter + remark |

---

## 프레임워크 — Next.js

React 기반의 풀스택 웹 프레임워크입니다. 서버 컴포넌트와 클라이언트 컴포넌트를 구분해서 사용할 수 있고, 파일 기반 라우팅으로 URL 구조를 폴더 구조로 표현합니다.

이 블로그에서는 App Router 방식을 사용합니다.
- `/` — 홈 (최근 포스트 목록)
- `/blog/[slug]` — 개별 포스트
- `/tags/[tag]` — 태그별 포스트
- `/api/views/[slug]` — 조회수 API
- `/api/visit` — 방문자 카운터 API

| 장점 | 단점 |
|---|---|
| 서버/클라이언트 컴포넌트 구분으로 성능 최적화 | 학습 곡선이 있음 |
| 파일 기반 라우팅으로 구조가 직관적 | App Router와 Pages Router 혼재로 혼란 가능 |
| Vercel과 완벽하게 통합됨 | 단순한 블로그엔 과할 수 있음 |
| TypeScript 기본 지원 | 빌드 시간이 상대적으로 김 |

---

## 스타일링 — Tailwind CSS v4

유틸리티 클래스 기반의 CSS 프레임워크입니다. 별도의 CSS 파일 없이 HTML 클래스만으로 디자인을 완성할 수 있습니다.

다크/라이트 테마는 CSS 커스텀 변수(`--bg`, `--surface`, `--accent-1` 등)로 구현했고, `data-theme` 속성으로 전환합니다.

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

| 장점 | 단점 |
|---|---|
| 클래스만으로 빠른 UI 구현 | 클래스명이 길어지면 가독성 저하 |
| CSS 파일 관리 부담 없음 | 커스텀 폰트 적용 시 인라인 style 필요 (v4 이슈) |
| 반응형 디자인이 직관적 | v4는 아직 변경사항이 많음 |

---

## 폰트

| 역할 | 폰트 |
|---|---|
| 포스트 제목 / 본문 | Playfair Display (영문 세리프) |
| 블로그 로고 | DM Serif Display |
| 히어로 제목 | Syne |
| UI 전반 | Geist Sans |
| 한국어 | Do Hyeon |

영문 포스트에는 Playfair Display를 적용해 세리프 감성을 살렸습니다.
Tailwind v4의 CSS 캐스케이드 이슈로 인해 폰트는 CSS 클래스가 아닌 인라인 `style` 속성으로 적용했습니다.

---

## 데이터베이스 — Upstash Redis

서버리스 환경에 최적화된 Redis 호스팅 서비스입니다. HTTP 기반 API로 동작해 Vercel Edge 환경에서도 사용할 수 있습니다.

이 블로그에서 Redis를 사용하는 용도:
- **포스트 조회수** — `post:views:{slug}` 키로 INCR
- **일별 방문자 수** — `blog:daily:visits:YYYY-MM-DD` 키로 INCR
- **방문자 추이 스파크라인** — 14일치 데이터를 SVG로 시각화

보안을 위해 조회수 API는 요청 slug를 실제 포스트 목록과 대조 검증합니다.
방문자 중복 카운팅은 localStorage (`visited:daily:YYYY-MM-DD`)로 하루 1회만 집계합니다.

| 장점 | 단점 |
|---|---|
| 서버리스 환경과 궁합이 좋음 | 무료 플랜에 요청 수 제한 있음 |
| HTTP API라 SDK 없이도 사용 가능 | 영속성보다 캐시에 최적화된 구조 |
| 응답 속도가 빠름 | 복잡한 쿼리 불가 |

---

## 댓글 — Giscus

GitHub Discussions를 댓글 저장소로 사용하는 오픈소스 위젯입니다.
별도 DB 없이 GitHub 계정만 있으면 댓글을 달 수 있고, 스팸이 없습니다.

포스트 페이지 하단에 `<Comments />` 컴포넌트로 삽입되며, 다크/라이트 테마와 연동됩니다.

| 장점 | 단점 |
|---|---|
| 별도 서버/DB 불필요 | GitHub 계정이 있어야 댓글 가능 |
| 스팸이 사실상 없음 | GitHub에 의존적 |
| 테마 연동 지원 | 일반 사용자에겐 진입 장벽 |
| 완전 무료 | |

---

## 검색 — Fuse.js

클라이언트 사이드 퍼지 검색 라이브러리입니다. 서버 요청 없이 브라우저에서 포스트를 실시간으로 검색합니다.

헤더의 검색 버튼을 누르면 모달이 열리고, 포스트 제목과 description을 대상으로 검색합니다.

| 장점 | 단점 |
|---|---|
| 서버 요청 없음 (빠름) | 포스트가 많아지면 초기 로딩 데이터 증가 |
| 퍼지 검색 (오타 허용) | 본문 전체 검색은 별도 구현 필요 |
| 설치와 사용이 간단 | |

---

## 배포 — Vercel

Next.js를 만든 회사의 배포 플랫폼입니다. GitHub 연동 후 `git push`만 하면 자동으로 빌드 및 배포가 됩니다.

이 블로그에서 Vercel을 활용하는 방식:
- **자동 배포** — main 브랜치 push → 자동 빌드 → 라이브 반영
- **지역 감지** — `x-vercel-ip-country` 헤더로 접속 국가를 파악해 기본 언어 자동 설정 (KR → 한국어, 그 외 → 영어)
- **환경 변수 관리** — Redis 토큰 등 민감 정보를 안전하게 보관

| 장점 | 단점 |
|---|---|
| Next.js와 완벽한 통합 | 트래픽 많으면 유료 전환 필요 |
| git push만으로 자동 배포 | 빌드 시간 초과 시 제한 있음 |
| 지역 감지 등 부가 기능 제공 | 벤더 종속성 |
| 무료 플랜으로 개인 블로그 충분 | |

---

## 국제화 (i18n)

별도 라이브러리 없이 직접 구현했습니다.

**언어 결정 순서:**
1. `lang` 쿠키 (사용자가 직접 선택한 경우)
2. Vercel `x-vercel-ip-country` 헤더 (KR이면 한국어, 그 외 영어)
3. 기본값: 한국어

**포스트 이중 언어:**
- `{slug}.md` — 한국어 (기본)
- `{slug}.en.md` — 영어

언어 토글 버튼은 헤더에 🇰🇷 / 🇺🇸 플래그 이모지로 표시됩니다.

---

## 콘텐츠 관리 — Markdown

포스트는 `/content/posts/` 폴더에 `.md` 파일로 저장됩니다.
프론트매터(frontmatter)로 메타데이터를 관리합니다.

```markdown
---
title: "포스트 제목"
date: "2026-03-22"
tags: ["TECH"]
description: "한 줄 요약"
---
본문 내용...
```

`gray-matter`로 프론트매터를 파싱하고, `remark`로 Markdown을 HTML로 변환합니다.

---

## 구현된 기능 전체 목록

| 기능 | 구현 방식 |
|---|---|
| 다크/라이트 테마 | CSS 커스텀 변수 + localStorage |
| 언어 전환 (KO/EN) | 쿠키 + Vercel 지역 감지 |
| 포스트 조회수 | Upstash Redis INCR |
| 방문자 추이 스파크라인 | Redis 14일 데이터 + SVG |
| 클라이언트 검색 | Fuse.js 퍼지 검색 |
| 댓글 | Giscus (GitHub Discussions) |
| 인기 포스트 위젯 | Redis 조회수 기준 정렬 |
| 카테고리/태그 | 마크다운 프론트매터 |
| Sitemap | `/sitemap.xml` 자동 생성 |
| Google Search Console | 소유권 인증 파일 + sitemap 제출 |
| 이중 언어 포스트 | `.md` + `.en.md` 정적 파일 |
| SEO 메타태그 | Next.js metadata API |

---

이 스택의 공통된 특징은 **서버리스**입니다.
별도의 서버를 운영하지 않아도, git push 하나로 전 세계에 배포되고 Redis와 Vercel이 나머지를 처리합니다.
개인 블로그를 운영하기에 충분하고, 비용은 거의 0원입니다.
