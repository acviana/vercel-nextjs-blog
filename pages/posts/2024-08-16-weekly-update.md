---
title: 2024-08-16 Weekly Update
date: 2024-08-16
description: Week 6 of my sabbatical - math proofs, LeetCode, DuckDB, and networking
tag: weekly-update, sabbatical, math, computer-science, proofs, duckdb
author: acv
---

Let most bloggers, I have a long backlog of unfinished posts. While I aspire to get concise well-scoped ideas out the door I tend to reverted to my natural discursive writing style and completionist tendencies. 

So to work on that I'm trying a weekly update format. I'm drawing direct inspiration from Simon Willison's "[weeknotes](https://simonwillison.net/tags/weeknotes/)" as well as John D. Cook's short-form technical [blogging](https://www.johndcook.com/blog/).

So here's what I've been up to the past week.

### I'm on Sabbatical

My biggest update is that I've left my former job and I'm about 6 weeks into a sabbatical of sorts. While looking for my next role I've been focusing my energy on "sharpening my tools" (phrasing taken from [this tweet](https://x.com/JohnDCook/status/1824425328409792685)), networking with interesting folks, and just generally resetting and refocusing. Here are some examples of what's been interesting me.

### Mathematical Induction Proofs

For nearly 2 years now I've made a concerted effort to study math again. I spent 2023 working through Sheldon Axler's modestly titled _"Linear Algebra Done Right" (4th Edition)_. The text is an algebraic approach to linear algebra that largely eschews the use of the determinant. I only got a few chapters in but the material was eye-opening. But, as I worked through the book I noticed I was getting too bogged down in the mechanics of completing the proofs and I was losing momentum. 

So this year I took a step "back" and have been working through John Hammack's _"The Book of Proof (3rd Edition)"_. This book focuses on teaching the mechanics of proofs using a range of examples from different areas of math. This book is exactly what I needed as an undergrad and I've been I've gotten a lot more comfortable with the tools needed to work on the math I'm interested in learning (I even submitted a small typo!). 

Currently, I'm working through the chapter on mathematical induction. Most the problems so far have been about elementary number theory or series. I got stuck this week on a problem that implies the divergence of the Harmonic Series, But, I think I've just about unwound my confusion. The rest of the chapter has problems on the Fibonacci sequence, Pascal's triangle, and graph theory. 

### CS Fundamentals with LeetCode

In keeping with my interest in learning fundamentals, I've also been working through basic CS problems on LeetCode, e.g. linked lists. Because I don't have a CS degree there are a lot of fundamental CS problems I've only read about and conceptually understand, but never worked through. I used to shrug these off as being academic problems, and maybe they are, but I've had a surprising amount of fun solving them. I feel like I'm solving chess puzzles but I also feel like I'm closing some important gaps in my knowledge. 

This week I've been working on Binary Search Trees and Binary Search. Coincidentally, this involves a lot of recursion with complements the math proofs I'm working on.

### Building a Bookmark Tool with DuckDB

I've also been feeling the itch to do something more applied so I started working on [a small bookmarking tool](https://github.com/acviana/bookmark-thing) to keep track of interesting links. I decided to do this in [DuckDB](https://duckdb.org/) which is a tool I've wanted to dig into more. It's also giving me a chance to check out MotherDuck, their hosted service. 

Right now the "app" is just a series of SQL queries while I prototype out the different operations I want to perform, mostly CRUD operations and trivial analytics. I have some more queries I want to add, specifically around tag manipulations. Shortly, I want to turn this into a python CLI app with the [Typer](https://typer.tiangolo.com/) library. 

One thing I've been pleasantly surprised by is the number of convenience functions in DuckDB and how pythonic some of the syntax is. There are functions for testing list membership, you can index and slice lists just like in Python, you an declare checks at the column schema level, and there are even [list comprehensions](https://duckdb.org/2023/08/23/even-friendlier-sql.html#list-comprehensions)! 

### Networking

I finally shared on LinkedIn that I'm between jobs and looking to use this time to network and as a result I've had tons of interesting meetings. Just this week alone I've talked to:

 - A couple of VCs who want to connect me to portfolio companies
 - The investment arm of a family office
 - The tech transfer office of a national lab
 - A local data science director
 - A founder of a stealth mode database company
 - A few local CTOs
 
 It's been a blast! I'm meeting a ton of smart people and it's helping me better understand what I want to be working on.

If _you_ want to chat about anything related to tech, please reach out.
