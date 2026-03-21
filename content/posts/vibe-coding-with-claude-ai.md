---
title: "Claude AI로 블로그 만들기"
date: "2026-03-22"
tags: ["TECH"]
description: "코딩 지식이 전혀 없어도 나만의 웹사이트를 만들 수 있습니다"
---

이 블로그 자체가 그 증거입니다.

웹 개발을 배운 적이 없습니다. Next.js가 뭔지, Tailwind가 뭔지, Redis가 뭔지 몰랐습니다. 그런데 Claude AI와 대화만으로 이 블로그를 완성했습니다. 오늘은 그 과정을 솔직하게 공유합니다.

## 어떻게 시작했나

처음엔 막막했습니다. "블로그를 만들고 싶다"는 말 한 마디로 시작했습니다. Claude가 기술 스택을 제안했고, 저는 그냥 승인했습니다.

코드 한 줄 직접 쓰지 않았습니다.

## 실제로 주고받은 대화들

실제 대화 예시입니다. 이게 전부입니다.

```
나:  검색창에서 포스트를 클릭할 때 제목 부분만 클릭돼요.
     카드 어디를 눌러도 이동하게 해주세요.

Claude: PostCard 전체를 <Link>로 감쌌습니다. 확인해보세요.
```

```
나:  조회수가 전혀 올라가지 않아요.

Claude: Vercel 서버리스 환경에서 서버가 자신에게 HTTP 요청을 보내는
        방식이 작동하지 않습니다. Redis SDK를 서버 컴포넌트에서
        직접 호출하도록 변경했습니다.
```

```
나:  강아지 아바타를 넣고 싶어요. 귀엽고 사실적으로.

Claude: 10가지 골든 리트리버 후보를 만들었습니다. 골라주세요.

나:  마음에 안 들어요. 실제 제 사진을 써줘요. 이 파일이에요.
     배경을 흰색으로 바꾸고 얼굴을 더 크게 해줘요.
```

```
나:  한국어↔영어 전환 버튼을 상단에 넣고 싶어요.
     테마 변경 버튼이랑 비슷하게 생긴 걸로요.

Claude: 쿠키 기반 언어 감지 시스템을 구현합니다.
        (이후 14개 파일 동시 수정)
```

## 커밋 로그로 보는 블로그 발전 과정

아래는 실제 Git 커밋 기록입니다. 대화 한 번 = 커밋 하나.

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

실제로 부딪히며 배운 팁들입니다.

**스크린샷을 적극 활용하세요**

"이상해 보여"보다 스크린샷 한 장이 훨씬 정확합니다. UI 문제는 말보다 보여주는 게 빠릅니다. 저는 거의 모든 UI 요청에 스크린샷을 첨부했습니다.

**원칙을 처음부터 정해두세요**

저는 세 가지 원칙을 정했습니다: 설계 먼저 → 승인 후 코딩 / 모르면 물어보기 / 모든 변경은 Git 커밋. Claude는 대화가 바뀌어도 이 원칙을 기억하고 따릅니다.

**해결책이 아니라 현상을 설명하세요**

"조회수 API를 SDK로 바꿔줘"가 아니라 "조회수가 안 올라가요"라고 하면 됩니다. 원인 분석과 해결책은 Claude가 찾습니다.

**마음에 안 들면 바로 말하세요**

아바타를 다섯 번 다시 만들었습니다. Claude는 지치지 않습니다. 즉각적인 피드백이 가장 효율적입니다.

**배포 환경을 미리 알려주세요**

"Vercel에 올릴 거야"처럼 환경을 말해두면 그에 맞는 코드를 짜줍니다. 환경 차이로 생기는 버그를 미리 막을 수 있습니다.

## 결론

코딩을 몰라도 됩니다. 대신 **무엇을 원하는지** 명확히 알면 됩니다.

좋은 질문을 하는 사람이 좋은 결과를 얻습니다.

이 블로그는 지금도 Claude와 함께 발전하고 있습니다.
