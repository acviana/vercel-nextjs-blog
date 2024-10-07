---
title: 2024-09-09 Weekly Update - Evergreen notes, LLMs, programming taste
date: 2024-09-09
description: Sabbatical Week 11 - evergreen notes, LLMs, and programming taste 
tag: weekly-update, sabbatical, programming, large-language-models, artifical-intelligence
author: acv
---

I feel like this weekly update experiment is coming along. Even though I'm a little late on this week's update I still feel:

 1. motivated to share
 2. able to knock out some quick notes
 3. without being a perfectionist
 4. confident enough to share

In part this is from the positive encouragement I receive every week - thank you!

If you need a soundtrack while you read, may I recommend ["Obra Akyedzi"](https://open.spotify.com/track/7qK7Bk0ksb05zFPUv8pgag?si=46231c7421ce473e) an upbeat afrobeat track by Ghanaian [Ebo Taylor](https://en.wikipedia.org/wiki/Ebo_Taylor) with production by Ali Shaheed Muhammad (A Tribe Called Quest).

Here's what I've been up to.

### Evergreen Notes

As I mentioned last week I've been interested in Andy Matuschak's concept of ["Evergreen Notes"](https://notes.andymatuschak.org/z5E5QawiXCMbtNtupvxeoEX). In short, he feels notes should be:

- atomic
- concept-oriented
- densely linked
- ontological
- written for yourself first

I've tried to put this into practice by regularly refining my talking points for my job interviews. It's still early, but I think I like this approach. It feels more like refining my understanding of discrete topics and not just dumping information into yet another unlinked and unread note.

### LLMs and Pipelines

My main focus this week has been helping a local founder with creating a data pipeline for an LLM-based medical document summarization tool. As I mentioned last week, I'm using ChatGTP, Python, and the Instructor library for most of this work. What's most striking to me so far about working with LLMs is how ... familiar it all feels.

While the iteration process of prompt engineering is novel, much of the scaffolding for the project centers around familiar data engineering problems. For example, I want to make it really easy for us to run experiments and understand the results. Of course, the LLM is doing incredible and novel work, but most of the work to enable that is familiar data pipelining. This means I spend my time thinking about data schemas, validation and serialization, and function parameters.

Which leads me to my next point.

### Taste in Programming

Last week [this article](https://blog.gitbutler.com/why-github-actually-won/) was making the rounds on HackerNews by GitHub Co-founder Scott Chacon. He argued that part GitHub "won" because:

 1. It was at the right place at the right time
 2. it had good taste

You can disagree with that conclusion but I still think it's important to develop your personal sense of programming "taste". By taste I don't quite mean programming techniques like TDD or language features like types. I mean something closer to your personal definition of "good".

Lately I've been thinking more about my own taste in programming. In part, this is because I'm writing more code that usual. More specifically, this LLM project has given me a playground where I can both set the style guide and have complete architectural control. At the same time, unlike a toy project, the codebase is starting to get big enough that I'm starting to notice my own inconsistencies and eccentricities. Things like variable names, function scope, abstractions, etc.

There are a lot of best practices and paradigms to choose from, but there's also a certain element of taste at play. This Medium article on "[Data pipeline recipes in Python](https://medium.com/@iftimiealexandru/data-pipeline-recipes-in-python-8561e07b2556)" gives a good sense of some of the design decisions I'm talking about. But most helpful reference I have here is actually not a technical one.

Instead, I've found myself thinking about the men's fashion commentator Derek Guy (aka [@DieWorkWear](https://x.com/dieworkwear)). One the points he continuously makes is that "good taste" is about well-executed coherent ideas. If you want to look like a cowboy, or a 90's rapper, or landed gentry then your outfit should coherently convey that. (Of course you can choose the break all the rules, but this only tends to go well when you intimately understand the rules you are breaking)

I think it's the same with code, you want coherent ideas well executed. As my codebase grows, I find myself asking more and more "why am I doing this?" and maybe more importantly "is it consistent with my other decisions in this codebase?".

### Odds and Ends

- As I mentioned above Derek Guy (aka [@DieWorkWear](https://x.com/dieworkwear)) is obviously a great follow if you have any interest in men's fashion. But his writing is also an overall excellent example of analysis, especially in how he combines technical details ("this is how a sport coat is constructed") with big-picture framing ("this is the purpose of a sport coat").
- Here's another Hacker News post from last month I enjoyed, ["Markov chains are Funnier than LLMs"](https://emnudge.dev/blog/markov-chains-are-funny/). I enjoyed this in part because I enjoy meta-analysis of comedy (I'm really fun at parties). But, I also enjoyed the technical point that Markov chains produce distributions of outcomes (the edges of which an be inadvertently funny) but LLMs only produce the mean outcome (which is not funny).
