---
title: 2024-08-23 Weekly Update
date: 2024-08-23
description: Some in-person events plus more proofs, LeetCode, and DuckDB
tag: weekly-update, sabbatical, math, computer-science, proofs, duckdb
author: acv
---

> ... the most important thing is to have fun!
> \- Feedback on my last post 

> Unpopular opinion I agree with- learning should not be fun. 
> \- Andrej Karpathy [Twitter](https://x.com/udayan_w/status/1824715943919886338)
>

Last week I wrote my [first weekly update](https://www.acviana.com/posts/2024-08-16-weekly-update). My only goal was to write something up without belaboring it too much. I was pleasantly surprised to get a wide range of positive feedback from readers (I have readers!?!). 

This included encouragement to continue writing from colleagues ranging from investors to former coworkers. I got a thank you from someone I gave helpful career advice to years ago at a conference, connected with someone looking for career advice, and got a couple of intros of folks in my network. I'm humbled and appreciative for all the engagement.

This week, my goals is to see if I can start to make a habit of these updates while I'm on sabbatical. I'm hoping they get easier each week as I build on what I've written before. 

This week I'll be talking about more math proofs, some LeetCode, my bookmark tool side project, some networking events, and my job search. If you need a soundtrack while you read, may I suggest "[Retreat](https://open.spotify.com/track/3diGyW1Q9dHoE9Qk1u4hXe?si=ec57d6a97b08411a)" a 2023 jazz/funk scorcher by Chicago-based saxophonist Isaiah Collier.

## Math

One of the trade-offs I made this week is that I didn't put much time into math work.

I wrapped up the proof I was working on last week which asks you to show that the [harmonic series](https://en.wikipedia.org/wiki/Harmonic_series_(mathematics)), summed up to $1/2^n \geq 1 + n/2$. This in effect shows that the Harmonic series is unbounded. I got reasonably close to the solution on my own but was missing the final technique to complete the proof. Once I read the answer I got it, but I spent a little more time with the proof until I felt like the missing technique was a logical conclusion and not a flash of insight. This problem in particular, because it's about proving a bound, is a nice set up for the theory of calculus chapters which make up the last 3rd of the book. If you're interested, I was able to eventually nudge ChatGPT to the [correct proof](https://chatgpt.com/share/2913baf6-1b56-445d-bcd2-58ce6ede57fd). 

The other bit of math study I did was wrap up my notes and a few of the problems from Wasserman's "[All of Statistics](https://www.amazon.com/All-Statistics-Statistical-Inference-Springer/dp/1441923225)". This included finishing up a proof on the continuity of probabilities (again, ChatGPT can walk you through [the proof](https://chatgpt.com/share/6a0590d6-edb5-473c-bf7f-3dd0348d1995)).  Working through this book feels like a bit more of a grind. I'm not sure if it's the subject matter or the book but I'm on the fence on if I'm going to continue working on this right now.

## Programming

I did some more LeetCode problems this week and focused on two areas. The first was going back and doing some "medium" difficultly problems in string manipulation and the other one was working through more "easy" dynamic programming problems. 

I'm getting better at solving these problems but they're taking more time because I'm now more interested in making sure I really understand all the standard CS techniques. Usually this means doing a problem 2 or 3 times to make sure I can get all the memory and runtime optimizations. This is hard, but it feels like I'm getting the "point" of each exercise.

Just like with my math proofs I'm getting much better at efficiently learning and not just beating my head against the wall when I'm stuck. What that looks like for me is aggressively cutting the problem down until I have identified a missing technique, then checking the answers to find that technique, then trying to apply it from memory. 

To be clear, I still get _very_ frustrated when I get stuck! But time boxing myself, taking breaks, and focusing on the big picture helps me keep my cool. 

## Bookmark Thing

I made a little more progress on my eloquently named [bookmark thing](https://github.com/acviana/bookmark-thing) side project. This started as an excuse to play with DuckDB some more while tracking interesting links. Because DuckDB is an OLAP database I wanted to see if I could just throw everything into one flat denormalized table. 

I wanted use some of the list parsing functions to modify the tag list associated with each entry. This was working fine until I tried to perform an update on a tag list and started getting unexpected constraint errors. After some digging I realized that currently duckdb treats list updates as an insert followed by an update, which is known to cause these types of errors. If you're interested you can check out the relevant [GitHub issue](https://github.com/duckdb/duckdb/issues/11915) and the documentation [explanation](https://duckdb.org/docs/sql/data_types/list#updating-lists).

Instead of trying to figure out a work around (such as handling this in the application code) I decided to just revert to a typical normalized database model and build a denormalized view on top of that. 

This new schema has the drawback this database is now more of an OLTP workload, instead of the OLAP workload DuckDB is optimized for. But that's fine, I'm still getting more exposure to DuckDB. I have some ideas for other datasets and other projects I could try that are a better fit for DuckDB's strengths. 

I now have working versions of my schema creation as well as the CRUD queries I want to run. I'm eager to get this wrapped up in a Typer CLI interface but I think next week I'll be interacting with my code in SQL while moving it to MotherDuck, DuckDB's hosted offering.

Overall, this project is reaffirming my belief in aggressively using your prototypes as much as possible before writing additional code.

## Odds and ends

- I finally [updated](https://github.com/acviana/vercel-nextjs-blog/pull/22) the Twitter card template from the blog default.
- I really feel like I'm starting to hit my stride with using ChatGTP to work on what Charlie Marsh called "side quests" - stuff like the changing the Twitter card. I've been squashing tons of small annoying bugs and warnings this way and it's starting to become my go-to.
- Lastly been listening to Martin Kleppmann's excellent "[Designing Data-Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)". I finished up the chapters on database replication and partitioning and started the chapter on transactions. I'm learning a lot more than I thought I would by listening to a technical book! That being said, I know I'm only retaining a fraction of the material, but it's more than the 0% I would get by just looking at the book on my shelf and thinking "I should read that".

## Networking

This week I started putting more time into networking and exploring job opportunities. In particular going to in-person events and sending out more applications.

I went to two in-person events last week. The first was the monthly meetup of the [Chicago AI Tinkerers](https://chicago.aitinkerers.org/). This was an awesome event hosted by Drive Capital. I saw some cool demos and made a couple of great connections. The second was a meta-meetup of tech organizations at [mHUB](https://www.mhubchicago.com/), one of our local hard-tech innovation spaces. This was organized around the DNC convention happening downtown and was intended to be a showcase of the Chicago hard tech ecosystem. I got to meet companies working on sharing commercial import/export data, infrastructure for recycling, energy optimization platforms, and even other hard-tech incubators. I also met one of my "neighbors" in my coworking space and got to learn about what they're working on.

Lastly, after talking to so many folks over the last few weeks, I finally feel like I'm at a point where I'm ready to start sending out general applications to job openings. I think my ideal job still rhymes with "I'll know it when I see it", but I feel like I'll be able to spot it and jump on it.

Again, if you want to chat about opportunities or talk shop, please reach out.