---
title: 2024-08-30 Weekly Update - Web scrapting and prompt engineering 
date: 2024-08-30 
description: Sabbatical Week 8 - some web scraping and prompt engineering
tag: weekly-update, sabbatical, math, proofs, large-language-models, artifical-intelligence
author: acv
---

This is my 3rd weekly sabbatical summary and I'm happy with how this series is shaping up. Writing this week's post started to feel more like the quick and direct process I'm working towards. As with past weeks, I continue to be pleasantly surprised by the amount of engagement these posts generate. This week's post is focused on some advising work I've been doing with some other odds and ends thrown in to round things out. I hope you enjoy it.

If you need a soundtrack while you read, Chance the Rapper dropped [one more summer single](https://open.spotify.com/track/51wZRATIHtYIfb0tMpp3e2?si=3aa644a36f5a46bb) before Labor Day.

## Consulting

My most exiting update this week is that I got to do some hands-on work for two companies. I've been advising to 1-2 companies or investors a week during my sabbatical but this is the first time I gotten to help out with a technical problem. The first was a web scraper and the second is an LLM application.

**Web Scraping:** The first project was a one-off web scraper for a friend's company to help them gather content for a customer demo. I began my startup career working for a security company that ran a large dark web scraper and it was fun to return to that problem space for a few hours. I originally started the project in [Scrapy](https://scrapy.org/) which is a nice structured crawling and scraping framework. But Scrapy started to feel like overkill for this task and so I wrote a simpler script using just requests and [Beautiful Soup](https://beautiful-soup-4.readthedocs.io/en/latest/). This was pretty quick work and ChatGTP helped out a lot by generating the HTML tag selectors I needed.

**Prompt engineering:** The second project I'm working on is an on-going effort to help a pre-seed founder with some generative AI prompt engineering and QA validation. The use case is medical document summarization. This is a really interesting project for me. While I've been using generative AI both locally and via ChatGPT for a nearly a year, this is my first time doing so for a commercial use-case. I'm still in the early stages but already learning a lot.

## Math and CS

I didn't want to completely skip working on any math this week so I'm working on an induction proof of the [Binomial Theorem](https://en.wikipedia.org/wiki/Binomial_theorem). I think I have the shape of the proof but I just need to figure out how to connect the dots. As always, I struggle with deciding when I've reached the point of diminished returns of working on my own vs learning from the answer. Whenever I do wrap this up, the next problem starts a series of Fibonacci related questions which I'm looking forward to.

I didn't get to any LeetCode this week but that was the trade off for doing more software projects than usual.

## Odds and Ends

**Bookmarking Tool:** I made a little bit of progress on my [bookmark tool](https://github.com/acviana/bookmark-thing) project, mostly small updates to the queries and started pushing data up to MotherDuck. This is basically at the point I could start using it to track links.

**Neovim:** I've been using Neovim casually for most of 2024. But, as I've been [telling folks online](https://x.com/AlexVianaPro/status/1829908268929728957), watching me use Neovim is like watching a caveman trying to rub two Teslas together to make fire (the follow-up joke writes itself). I'm slowly getting better at learning the key mappings and installing the extensions I need but what I really need to do is rip off the band-aid and start customizing my setup. Soon!

**Blog Framework:** I've been using my current blog setup for about 2 years now. Which, if you have a blog, you know that means I'm getting the itch to rip it out and start over (and then blog about it). So I've spent a little time trying out different frameworks to see what else is out there. TBD, if I'll actually go through with this!

That's it! Thank you for reading and if you're on the fence about reaching out for any reason, please I'd love to hear from you!
