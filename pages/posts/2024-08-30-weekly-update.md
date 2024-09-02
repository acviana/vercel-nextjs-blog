---
title: 2024-08-30 Weekly Update
date: 2024-08-30 
description: Week 8 of my sabbatical - TODO
tag: weekly-update, sabbatical, math, proofs, duckdb, large-language-models, artifical-intelligence
author: acv
---

This is my 3rd weekly sabbatical summary. I'm pleased that this week started to feel more like the quick and direct wriring process I'm hoping to cultivate with these summaries. As with past weeks, I continue to be plesently surprised by the amount of engagement these posts generate. 

If you need a soundtrack while you read, Chance the Rapper dropped [one more summer single](https://open.spotify.com/track/51wZRATIHtYIfb0tMpp3e2?si=3aa644a36f5a46bb) before Labor Day.

## Consulting

The most exiting update this week is that I got to do some hands-on work for two companies in addition to my self-study and side projects. I've been giving advice to 1-2 companies or investors a week during my sabbatical but this is the first time I gotten to help out with a technical problem. The first was a webscrapper and the second is an LLM applicaion.

**Web Scrapping:** The first technical project one-off web scrapper for a friend's company to help them gather content for a customer demo. I started my career in startups working for a security compny that ran a larger dark web scrapper so it was fun to return to that problem space for a few hours. I originally started the project in [Scrapy](https://scrapy.org/) which is a nice structured crawling and scraping framework. But Scrapy started to feel like overkill for the task and so I wrote a simpler script using just requests and [Beautiful Soup](https://beautiful-soup-4.readthedocs.io/en/latest/). This was pretty quick work and ChatGTP helped out a lot by giving the me HTML tag selectors.

**Prompt engineering:** The second project is an on-going effort to helpa pre-seed founder with some generative AI prompt engineering and QA validation. The context is anspecific use case for medical document summarization. This is a really interesteing project for me. I've been using generative AI both locally and via ChatGPT for a nearly a year but this is my first time getting to do so for a commericial use-case. I'm early but already learning a lot.

## Math and CS

Not wanting to completely skip working on any math this weekend I'm working on a proof of the [Binomial Theorem](https://en.wikipedia.org/wiki/Binomial_theorem). I think I have the shape of the proof but I just need to figure out some trick to connect the dots. As always, I struggle with deciding when I've reached the point of diminished returns on trying to work through these on my own. Next problem starts a series of Fibonacci related questions I'm looking forward to.

I didn't get to any LeetCode this week but that was the trade off for doing more coding than usual.

## Odds and Ends

**Bookmarking Tool:** I made a little bit of progress on my [bookmark tool](https://github.com/acviana/bookmark-thing) project, mostly small updates to the queries and started pushing data up to MotherDuck. 

**Neovim:** I've been using Neovim casually for most of 2024. But, as I've been [telling folks](https://x.com/AlexVianaPro/status/1829908268929728957), watching me use Neovim is like watching a caveman trying to rub two Teslas together to make fire. I'm slowly getting better at learnin the key mappings and installing the extensions I need but what I really need to do is rip off the bandaid and start customizing my setup.

**Blog Framework:** I've been using my current blog setup for about 2 years now. Which, if you have a blog you know means I'm getting the itch to rip it out and start over (and then blog about it). So I've spent a little time trying out different frameworks to see what else is out there. TBD, if I'll actually go through with it.

That's it! Thank you for reading and if you're on the fence about reaching out for any reason, please do!
