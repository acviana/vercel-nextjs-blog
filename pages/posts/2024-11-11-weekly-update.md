---
title: 2024-11-11 Weekly Update - Python, Inverse Machine Learning, Set Cardinality
date: 2024-11-11
description: Sabbatical Week 20 - Python structural pattern matchin and package logging, uv in Docker, inverse reinforcement learning, and Cantor's theory of cardinality
tag: weekly-update, python, math
author: acv
---

took a few weeks off to focus on some other projects but this week I’m back to blogging and I’ve got a blend of programming, machine learning, and math content for you.

This is a longer one, so if you need some music settle into anything by [Linenoise.io](https://linenoise.io/).

### Python Structural Pattern Matching

When I first saw structural pattern matching (i.e. `match` and `case` keywords) I glossed over them as equivalent to if/else statements. After reading this [great article from Real Python](https://realpython.com/structural-pattern-matching/#finding-practical-uses-for-pattern-matching) (more than once) I see there’s a lot more depth here. In particular I learned about deconstruction in pattern matching (similar to `*args`), conditional pattern execution, and applications to complex nested data structures. I’m not sure how often I would reach for this but it’s definitely something I want to experiment with in the future.

On the topic of better understanding something I’ve seen for a while …

### Logging for Python Packages

The Python logging module is not the easiest API to grok, but it does have a lot of useful properties once you understand how to hold the tool. It’s also one of those tools where I’ve inherited a setup more than I’ve had to set it up myself. So this week I spent some time digging best practices are for instrumenting logging.

The [Python standard library docs](https://docs.python.org/3/howto/logging.html#configuring-logging-for-a-library) are pretty rich in examples, patterns, and anti-patterns for logging. I learned a lot of things but my biggest “ah-ha moment” was understanding that logs inherit configurations (e.g. a handler) on import from whatever configuration is executed first. That means that you need to align your logger configurations with the entry point(s) to your code. So for example maybe you define a logger on your main pipeline entry and another in the module’s `if __name__ == ”__main__”:` block if it can be run as a stand-alone script.

Speaking of learning to setup tools I normally inherit instead of configuring …

### UV in Docker

Like most people in the Python ecosystem uv is my new go-to tool for Python dependency and environment management. First it replaced Poetry for me, and then pyenv, and so now I want to understand how to effectively use it in a Docker container. Astral’s [example project](https://github.com/astral-sh/uv-docker-example) as well as this article by [Hynek Schlawack](https://hynek.me/articles/docker-uv/) are a great place to get started. But knowing my interest in fundamentals I can tell this is going to lead me to a deeper dive on Docker.

While you’re at it you should also check out this [uv cheatsheet](https://bsky.app/profile/brohrer.bsky.social/post/3l7lkivbsia2m) which translate commands from other tools (pip, vent, poetry) to their equivalent in uv. This framing helped some of the new commands “click” for me.

OK let’s talk about some math!

### Inverse Reinforcement learning

I was talking to a local founder and they mentioned “inverse reinforcement learning” (IRL). I had spent some time this year working (unsuccessfully) on reproducing an experiment for Sutton’s “Reinforcement Learning” textbook so I felt (barely) confident enough to ask them to explain IRL. Fortunately, I was able to get it right away — studying the fundamentals, even briefly, always pays off!

In traditional reinforcement learning you are trying to optimize agent behavior to optimize a known reward function, for example in a multi-armed bandit problem. In IRL you are given agent behaviors and instead have to find the reward function that explains the agent behaviors. This [article](https://thegradient.pub/learning-from-humans-what-is-inverse-reinforcement-learning/) has a good summary as well as citations to foundational papers in the area.

OK one more topic related to applying fundamentals I’ve been studying!

### Cantor’s Theory of Cardinality

I’m enjoying this [second lecture](https://youtu.be/9_xG0AGRa-w?si=RZvyNmB7eKzeutQr) from the MIT open courseware on analysis. This lecture is about using bijections to compare the cardinality of sets, specifically infinite sets. It concluded with Cantor’s proof that there are more real numbers than integers. This builds nicely on the proof work I’ve been doing all year out of “The Book of Proof”, enough so that I was able to follow along while cooking dinner.

Not sure other folks would enjoy this lecture, if you already know the material it’s probably too slow and if you’re not familiar with it (or planning to put in some serious study) it’s probably too fast. But it’s a well-done resource.

### Odds and Ends

Updates on some books and audiobooks:

- I finished “The MANIAC” audiobook which I thought was fantastic. I especially loved the dark overtones in the bridge to AlphaGo in the last section of the book. It makes a great compliment to the more neutral biography “The Man from the Future: The Visionary Life of John von Neumann” which I listened to earlier this year.
- I’m now listening to “A Mind At Play: How Claude Shannon Invented The Information Age”, which is more, maybe I’d call it folksy in tone ”The MANIC”. Give a lot of insight into the transition in Electrical Engineering from essential tinkerers and craftsman to the modern form which is so intertwined with physics and mathematics.
- I’m trying to read “The Missing Billionaires” which is essentially a book-long study of the application of the Kelley Criterion as a risk management tool. I’m making glacial progress (a few pages as I nod off at night) but the book is great if you’re interested in something partway between quantitative finance and personal investing advice.
