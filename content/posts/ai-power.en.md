---
title: "Experiencing the Power of AI Firsthand"
date: "2026-03-22"
datetime: "2026-03-22T15:00:00+09:00"
tags: ["TECH", "DAILY"]
description: "Two Days with Claude AI"
---

I'm a junior SSD firmware engineer with three years of experience at companies like Samsung and SK Hynix.
I write code for a living, but firmware is a fairly niche embedded domain — one that never really gave me a reason to get close to AI.

The code I work with follows standard C/C++ conventions on the surface, but most of the control flow is tightly coupled to in-house HW IP modules developed entirely within the company.
Since the behavior and limitations of these IPs have never been made public, AI's vast training data offers little advantage here.
We could theoretically process and document internal knowledge for AI training, but the semiconductor industry is tied to national security projects, meaning handling confidential documents is a bureaucratic headache at best.
On top of that, we recently adopted an in-house compiler for performance and cost optimization — so the AI is now working with a coding style it has never encountered before. It can make educated guesses, but the kind of seamless "vibe coding" people talk about is still a long way off in our environment.

That said, the atmosphere at work has been quietly shifting lately.
AI proficiency has emerged as a key internal KPI, and the company has started actively supporting tools like Cursor IDE. For a long time, I was skeptical about whether AI could genuinely help in our domain, and security restrictions made it hard to experiment. But with the company now backing it, ignoring AI started to feel like swimming against the tide.

So I decided to start here — with this blog — as a toy project to get comfortable working alongside AI.
Web programming is something most CS graduates have touched at some point, but five years out of university, I was effectively starting from scratch. I couldn't remember which frameworks were popular, how deployments worked, or even how I used to handle git.
From that blank slate, I opened VSCode, subscribed to Claude AI Pro, installed the Claude extension, and started a conversation.

First, we established a set of working principles and agreed on coding conventions and standards — not unlike creating a Cursor Rules file.
Then we took a top-down approach to architecture, deciding on the stack and APIs the blog would use.
After that, everything from environment setup to actual coding moved forward with little more than a single "Proceed."

It wasn't without hiccups. When instructions were vague — the "you should be able to figure this out" moments — AI occasionally went off in an unexpected direction. But the thing that impressed me most over the past few days wasn't accuracy or raw coding ability. It was tireless productivity. The AI churned out code faster than I could review it, and I started to notice that the bottleneck in our workflow wasn't the AI — it was me.

This post was written the same way.
I gave Claude the topic, the general flow, and a few key sentences and examples. It drafted the post. I reviewed it, flagged what needed expanding or adjusting, and Claude revised. Three or four rounds of that, and the piece I had in mind was done.

I'd heard plenty of times that Claude was good at coding. What I didn't expect was just how much better than expected it would actually be.
