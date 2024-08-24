---
title: 2024-08-23 Weekly Update
date: 2024-08-23
description: Some in-person events plus more proofs, LeetCode, and DuckDB
tag: weekly-update, sabbatical, math, computer-science, proofs, duckdb
author: acv
---

> ... the most important thing is to have fun

Last week I wrote my first weekly update. My only goal was to get something out the door without belaboring it too much. I was pleasantly surprised to get a lot of positive feedback from readers (!!!). This included encouragement to keep writing from colleagues ranging from a VC to former coworkers. I got a thank you from someone I gave helpful career advice to years ago at a conference, connected with someone looking for career advice, and got a couple of intros of folks in my network. I'm humbled and appreciative for all the connections.

This week, let's see if I can start to make a habit of these updates, at least while I'm on sabbatical. If you need a soundtrack while you read, may I suggest this scorcher by Chicago-based saxophonist TODO.


> Unpopular opinion I agree with- learning should not be fun. [Twitter](https://x.com/udayan_w/status/1824715943919886338)

## Math

One of the trade-offs I made this week is that I didn't make much time for math. But I still managed to internalize two proofs. 

The first was the proof I was working on last week which asks you so show that the harmonic series, summed up to $1/2^n \geq 1 + 1/n$. This in turn shows that the Harmonic series is unbounded. I got reasonably close to the solution on my own but was missing the finial technique to complete the proof. One I read the answer I got it but I spent a little more time with this one until I felt like I could really TODO. This problem in particular is a nice set up for the theory of calculus chapters which make up the last 3rd of the book.

The second was a proof of the fundamental theorem of the continuity of probabilities from Wasserman's "All of Statistics" TODO. This is an important theorem that allows us to connect discrete and continuous random variables and underpins stochastic calculus TODO in the same way that the fundamental the theorem of calculus does for the real numbers in general TODO. Conveniently this proof relies on the mathematical induction.

## Programming

I did another handful of LeetCode problems this week. One theme was going back starting to do some "medium" difficultly problems in string manipulation and the other one working through more "easy" dynamic programming problems. 

I'm starting to slow down a little bit because I'm getting less interesting in solving the problem (this is getting easier) and more interested in making sure I really understand all the standard CS techniques. Usually this means doing a problem 2 or 3 times to make sure I can get all the memory and runtime optimizations. J

Just like with my math proofs I'm getting much better at efficiently learning and not just beating my head against the wall when I'm stuck. What that looks like for me is aggressively cutting the problem down until I have identified a missing technique, then checking the answers to find that technique, then trying to apply it from memory.

I've been listening to Dan TODO's excellent TODO and just finished the chapter on database replication and started the chapter on database sharding. 

## Bookmark Thing

I made a little more progress on my eloquently named "bookmark thing" side project. 

This started as an excuse to play with DuckDB and because DuckDB is an OLAP database I wanted to see if I could just throw everything into one flat denormalized table. I wanted use some of the list parsing functions to work with the tag list I want to add to each entry. This was working fine until I tried to perform an update on a tag list and started getting constraint errors. After some digging I realized that, as of v1.TODO, duckdb treats list updates as an insert followed by an update, which is known to cause these types of errors. 

Instead of trying to figure out a hacky work around (such as handling this in the application code) I decided to just revert to a typical normalized database model. I now have working versions of my schema creation as well as the CRUD queries I want to run. I'm eager to get this wrapped up in a Typer CLI interface but I think next week I'll be interacting with my code in SQL while moving it to MotherDuck, DuckDB's hosted offering.

This new schema have the drawback this database is now more of an OLTP workload instead of the OLAP workload DuckDB is made for. But that's fine, I'm still getting more exposure to DuckDB. I have some ideas for other datasets I could use that are a better fit for DuckDB's strengths. 

Overall, this project is reaffirming my belief in aggressively using your prototypes as much as possible before writing additional code.

## Networking

This week I started putting more time into networking and exploring job opportunities. In the past weeks I'd been doing a lot of Zoom calls and coffees to meet up with folks both about jobs as well as talk shop and give feedback. This week I tried some new avenues.

This week I put some time into attending some events. The first was the TODO's session of the Chicago AI tinkerers. The second was a meta-meetup of different groups at mHUB, out of our local hard-tech innovation spaces. I got to meet companies working on import/export data, infrastructure for recycling, energy optimization, and even other hard-tech incubators.

I've also started booking time to meet with talent teams at VC firms, think of these as like "meta" applications. 

Lastly, for a number of reasons, I finally feel like I'm at a point where I'm ready to start sending out general applications to job openings. I think what I'm looking for still has a lot of "I'll know it when I see it", but I feel like I'll be able to spot it and jump on it.
