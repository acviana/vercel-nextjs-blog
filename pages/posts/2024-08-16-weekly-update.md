---
title: 2024-08-16 Weekly Update
date: 2024-08-16
description: sabbatical, math, computer-science, proofs, duckdb
tag: weekly-update
author: acv
---

Let most people with a blog, I struggle to get content out the door. From the beginning my goal with this blog was to write more frequent short content - too long for a tweet but too short for an essay. But I quickly reverted to natural discursive writing style and completionist tendencies. 

So to work on that I'm trying a weekly update format. I'm drawing direct inspiration from Simon Willison's "[weeknotes](https://simonwillison.net/tags/weeknotes/)" as well as John D. Cook's short-form technical [blogging](https://www.johndcook.com/blog/).

### I'm on Sabbatical

The biggest update is that I've left my former job and I'm about 6 weeks into a sabbatical of sorts. I've been focusing my energy on "sharpening my tools" (taken from [this tweet](https://x.com/JohnDCook/status/1824425328409792685)), networking with interesting folks, and just generally resetting and refocusing while looking for my next role. What follows is some of what I've been up to.

### Mathematical Induction Proofs

For the past nearly 2 years I've made a concerted effort to study math again. I spent 2023 working through Sheldon Axler's modestly titled "Linear Algebra Done Right" (4th Edition). The material, an algebraic approach to linear algebra that largely eschews the use of the determinant, was eye opening. But, I was getting too bogged down in the mechanics of completing the proofs. So this year I took a step "back" and have been working through John Hammack's "The Book of Proof (3rd Edition)" (I even submitted a small typo!). 

Currently, I'm working through the chapter on mathematical induction. I got stuck this week on a problem that implies the divergence of the Harmonic Series, But, I think I've just about unwound my confusion.

### CS Fundamentals with LeetCode

In keeping with my interest in learning fundamentals I've also been working through basic CS problems on LeetCode. Because I don't have a CS degree there are a lot of fundamental CS problems I've only read about and conceptually understand, but never worked through, e.g. linked lists. I used to shrug these off as being academic problems, and maybe they are, but I've had a surprising amount of fun solving them. I feel like I'm closing some important gaps in my knowledge.

This week I've been working on Binary Search Trees. Coincidentally, this involves a lot of recursion with complements the math proofs I'm working on (graph theory examples are coming later this chapter).

### Building a Bookmark Tool with DuckDB

I've also been feeling the itch to do something more applied so I started working on [a small bookmarking tool](https://github.com/acviana/bookmark-thing) to keep track of interesting links. I decided to do this in [DuckDB](https://duckdb.org/) which is a tool I've wanted to dig into more. It's also giving me a chance to check out MotherDuck, their hosted service. 

Right now the "app" is just a series of SQL queries while I prototype out the different operations I want to perform. I have some more I want to add, specifically around tag manipulations. Shortly, I want to turn this into a python CLI app with the [Typer](https://typer.tiangolo.com/) library. 

One thing I've been pleasantly surprised by is the number of convenience functions in DuckDB and how pythonic some of the syntax is - there are even [list comprehensions](https://duckdb.org/2023/08/23/even-friendlier-sql.html#list-comprehensions)! 

This mostly comes up in the context that I want my data model to have "tags", which is a classic many-to-many relationship in a normalized OLTP model. But DuckDB allows list type columns so I decided to try those out and so far so good. The types of counts and CRUD operations I want to do seem to be well-supported. 

### Networking

I finally shared on LinkedIn that I'm between jobs and looking to use this time to network and as a result I've had tons of interesting meetings. Just this week alone I've talked to a couple of VCs, the investment arm of a family office, the tech transfer office of a national lab, a local data science director, a stealth mode founder of a database company, and a few local CTOs. It's been a blast! I'm meeting a ton of smart people and it's helping me better understand what I want to be working on.

