---
title: 2024-09-09 Weekly Update
date: 2024-09-09
description: TODO
tag: weekly-update, sabbatical, programming, large-language-models, artifical-intelligence
author: acv
---

### Evergreen Notes

As I mentioned last week I've been interested in TODO's concept of "Evergreen Notes". I've tried to put this into practice and regularly refine my notes of my talking points for my job interviews. It's still early but I think I like this iterative approach to refining my understanding of a discrete topic and not just dumping information into yet another unlinked and unread note document.

### LLMs and Pipelines

I'm digging deeper on the LLM-based medical document summarization tool that I'm helping a local founder with. As I mentioned last week, I'm using ChatGTP and the Instructor library. What's most striking to me about working with LLMs is ... how familiar it all feels. 

While the iteration process of prompt engineering is novel, much of the scaffolding for the project are very familiar data engineering problems. I want to make it really easy for us to run experiments and understand the results. Which means I spend my time thinking about data schemas, validation and serialization, and function parameters. Which is not that different that any other data pipeline.

Of course, the LLM are producing incredible results, but it's all in a mostly familiar framework. Which leads me to my next point.

### Taste in Programming

Last week this article was making the rounds on HackerNews from TODO arguing that part GitHub "won" at least in part because it had good taste. You can disagree with that conclusion but I still the think the idea of "taste" is important.

I've been thinking more about my personal "taste" when it comes to writing code. In part this is because I'm writing more code that usual. But more specifically I'm at that interesting stage of a project where I'm scaling out the code and making design decisions that shape the project. There are a lot of best practices and paradigms to choose from but there's also a certain element of taste at play.

By "taste" I don't quite mean programming techniques like TDD or language features like types. I mean something closer to your personal definition of "good".

I think actually the most helpful reference here the men's fashion commentator DieWorkWear TODO:Link. One the points he continuously makes is that "good taste" is about well-execute coherent ideas. If you want to look like a cowboy, or a 90s rapper, or landed gentry then your outfit should coherently convey that. (Of course you can choose the break all the rules, but this only tends to go well when you intimately understand the rules you are breaking)

I think it's the same with code, coherent ideas well executed. As my codebase grows, I find myself asking more and more "why am I doing this?" and maybe more importantly "is it consistent with my other decisions in this codebase?".

Odds and Ends

 - As I mentioned above DieWorkWear is  obviously a great follow if you have any interest in men's fashion. But he's also an example of overall great analysis especially in how to combine technical details (this is how a sport coat is assembled) with big-picture framing (this is the purpose of a sport coat).
 - This is a another Hacker News post from last month I enjoyed, ["Markov chains are Funnier than LLMs"](https://emnudge.dev/blog/markov-chains-are-funny/). In part because I enjoy meta-analysis of comedy (I'm really fun at parties). But, I also enjoyed the technical point that Markov chains produce distributions of outcomes (the edges of which an be inadvertently funny) but LLMs only produce the mean outcome (which is not funny). 
