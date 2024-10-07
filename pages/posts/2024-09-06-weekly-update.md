---
title: 2024-09-06 Weekly Update - Structured outputs for LLMs and proving the binomal theorem
date: 2024-09-06
description: Sabbatial Week 10 - structured outputs for LLMs and proving the binomial theorem
tag: weekly-update, sabbatical, math, proofs, large-language-models, artifical-intelligence
author: acv
---

This is the summary of what I was up to in the 10th week of my sabbatical. This write-up focuses on math proofs, working with LLMs, and wraps up with some odds and ends. A small update, my work on a web scrapper for a friend's company last week helped them close a customer deal!

I continue to really enjoy connecting with everyone who reaches out after reading these posts. I'm talking to folks about everything from career advice, open roles, kicking around data problems, and just catching up. If you're on the fence, please reach out, I would love to hear from you!

If you need a soundtrack to read to, let me suggest ["Glass, Concrete & Stone"](https://open.spotify.com/track/5JJRxktdvtSjN3AeITJNCs?si=5f4c0c7ed4f341e6) by David Byrne. You might recognize it from the the 3rd season of "The Bear".

## Proving The Binomial Theorem

I finally gave in and looked up the answer to the proof of the binomial theorem I was working on in Hammack's "The Book of Proof". I had the right set-up but never cracked the middle step. But even after looking at the answer I wasn't following how to make the jump.

Because this is a famous proof, I felt confident asking ChatGPT for help. Still, I was genuinely surprised. Not only did ChatGTP produce what appears to be a correct proof (as far as I can tell), when asked it was also able to specifically expand on the step that was confusing me. The trick was connecting the $S_k$ and $S_{k+1}$ statements with a substitution of the form $j = k + 1$. This is is a recurring technique in these induction proofs. In this case, it allows you to change the indexes on a sum and use an identity of the binomial coefficient. You can find the transcript of the chat [here](https://chatgpt.com/share/c22a1c50-aec3-45b5-8d5a-4bfa3a40b625).

If you're interested in LLMs and their ability to work on novel proofs (not just repeat famous ones) you should check out this recent talk by Terence Tao on [AI and Mathematics](https://www.youtube.com/watch?v=e049IoFBnLA).

## The Opportunity Cost of Pure Math

I'm glad I now understand this proof, but I go back and forth on if this level of rigor and completeness is a good use of my time. Should I be putting this much effort into being able to solve these proofs? Or should I be trying to get to "good enough" so I can cover more material? It would probably be more helpful in my career to be working on something more applied like standard data science or statistics techniques. And it would be more enjoyable to "fast forward" to more abstract and complex ideas like vector spaces.

There is an opportunity costs to everything we do. Especially as I get older and my family life is changing, time is more precious than ever. And there is also a part of me that is _embarrassed_ that math doesn't come easier to me and that my progress is so gradual. But at the end of the day, I enjoy the work and I feel much "stronger" mathematically than I did 2 years ago.

In practice, I do think I could be better about capping the amount of time I spend working on any one problem before getting help. I have to remind myself the point is to learn, not have a stroke of genius or reinvent math on my own.

## LLMs for Document Summarization

My big project this week has been helping a pre-seed founder with some prompt engineering for an LLM-based medical summarization tool. The first thing I added to the project was to start treating each LLM run as an _experiment_. This means that for every run we need to store not only the results but all the metadata needed to recreate the results. This means data like the model, the data inputs, the prompts, etc.

Once I had that output format down I tried to compare a few results. It only took me a few minutes to realize we needed structured LLM outputs! Fortunately, I had been keeping up with LLM model tools and I know that the [Instructor package](https://python.useinstructor.com/), built on top of [Pydantic](https://docs.pydantic.dev/latest/), was the go-to solution for this. To quote Jason Liu, the creator of Instructor, ["Pydantic is all you need"](https://x.com/jxnlco/status/1832879090917061076).

I'll give a quick overview of structured outputs and why they're useful. Let's use dentistry as an example. Your typical unstructured text output from a generative LLM might look like this:

```
The patient came in on Nov. 3rd for a cleaning and we found one cavity.
```

The point here isn't if the summary is right or wrong, the point is that because this is an unstructured/human-readable response it's not clear how to we would assess the accuracy of this output _at scale_. For example, if we had 1k records and 5 different prompts we wanted to try, how would be able to parse and compare all those outputs?

We can get a lot closer to a scalable solution just by enforcing a structured response. For example, the above response could become:

```json
{
 "proceedure_date": "2022-11-03",
 "proceedure_type": "cleaning",
 "has_cavity": true 
}
 ```

This model is something we could build automated testing and scoring around! There's still a lot of complexity to be addressed but this framework gives us something stable to build against.

## Odds and Ends

- The web scrapper I worked on last week helped my friend's company win a customer by creating a better search index of the customer content.
- I updated the node dependency on this blog which fixed some issues with recent posts appearing in the blog index ([PR](https://github.com/acviana/vercel-nextjs-blog/pull/26)).
- I started actually saving more bookmarks to the my DuckDB bookmark app. Here are some of my favorites from this week:
 	- [LazyVim for Ambitious Developers](https://lazyvim-ambitious-devs.phillips.codes/) - The missing NeoVim/LazyVim guide I've been looking for!
 	- [Office Hours with a Geometric Group Theorist](https://press.princeton.edu/books/paperback/9780691158662/office-hours-with-a-geometric-group-theorist) - Content like this reminds me why I'm working so hard on my proofs.
 	- [Andy Matuschak on Evergreen Notes](https://notes.andymatuschak.org/About_these_notes?stackedNotes=z5E5QawiXCMbtNtupvxeoEX) - Useful advice on how to take notes that are actually useful for building understanding.
