---
title: "Claude AI로 블로그 만들기"
date: "2026-03-22"
datetime: "2026-03-22T04:00:53+09:00"
tags: ["TECH", "DAILY"]
description: "코딩 지식이 전혀 없어도 나만의 웹사이트를 만들 수 있다"
---

이 블로그 자체가 그 증거다.

웹 개발을 따로 배워본 적이 없다. Next.js가 뭔지, Tailwind가 뭔지, Redis가 뭔지 몰랐다.
그런데 Claude AI와 대화만으로 이 블로그를 완성했다.
오늘은 그 과정을 솔직하게 공유한다.

## 어떻게 시작했나

그냥 "블로그를 만들고 싶다"는 말 한 마디로 시작했다.
Claude가 기술 스택을 제안했고, 나는 그냥 승인했다.

코드 한 줄 직접 쓰지 않았다.

## 실제로 주고받은 대화들

실제 대화 예시다. 이게 전부다.

```
나:  검색창에서 포스트를 클릭할 때 제목 부분만 클릭돼요.
     박스 내 어디를 눌러도 이동하게 해주세요.

Claude: PostCard 전체를 <Link>로 감쌌습니다. 확인해보세요.
```

```
나:  포스트 조회수가 전혀 올라가지 않아요.

Claude: Vercel 서버리스 환경에서 서버가 자신에게 HTTP 요청을 보내는
        방식이 작동하지 않습니다. Redis SDK를 서버 컴포넌트에서
        직접 호출하도록 변경했습니다.
```

```
나:  한국어↔영어 전환 버튼을 상단에 넣고 싶어요.
     테마 변경 버튼이랑 비슷하게 생긴 걸로요.

Claude: 쿠키 기반 언어 감지 시스템을 구현합니다.
        (이후 14개 파일 동시 수정)
```

## 커밋 로그로 보는 블로그 발전 과정

아래는 실제 Git 커밋 기록이다. 대화 한 번 = 커밋 하나.

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
chore: reduce padding above 최근 포스트 section
```

처음 "블로그 만들어줘"부터 지금까지 총 30개 이상의 커밋. 걸린 시간은 약 6시간.

## Claude AI를 더 빠르고 스마트하게 쓰는 법

실제로 부딪히며 배운 팁들이다.

**스크린샷을 적극 활용하라** — "이상해 보여"보다 스크린샷 한 장이 훨씬 정확하다. UI 문제는 말보다 보여주는 게 빠르다. 거의 모든 UI 요청에 스크린샷을 첨부했다.

**원칙을 처음부터 정해두라** — 세 가지 원칙을 미리 정했다: 항상 탑-다운 설계 선행, 코딩 전에 승인 과정 밟기 / 모르면 물어보기 / 모든 변경은 Git 커밋. 이 원칙은 대화가 바뀌어도 기억하고 따른다.

**해결책이 아니라 현상을 설명하라** — "조회수 API를 SDK로 바꿔줘"가 아니라 "조회수가 안 올라가요"라고 하면 된다. 원인 분석과 해결책은 Claude가 찾는다.

**마음에 안 들면 바로 말하라** — 아바타 이미지만 다섯 번 다시 만들었다. Claude는 지치지 않는다.

**배포 환경을 미리 알려두라** — "Vercel에 올릴 거야"처럼 환경을 말해두면 그에 맞는 코드를 짜준다. 환경 차이로 생기는 버그를 미리 막을 수 있다.

## 결론

코딩을 몰라도 된다. 대신 **무엇을 원하는지** 명확히 알면 된다.
좋은 질문을 하는 사람이 좋은 결과를 얻는다.

이 블로그는 지금도 Claude와 함께 발전하고 있다.
