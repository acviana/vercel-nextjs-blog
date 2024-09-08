---
title: 2024-09-06-weekly-update
date: TODO
description: TODO
tag: TODO
author: acv
---

## Math: Proof of the Binomial Theorem

I finally gave in an looked up the answer to the proof of the binomial theorem I was working on. I had the answer set up correctly but still didn't understand a middle step. This is a famous enough proof that I felt confident asking ChatGTP for a proof. I _still_ didn't understand and asked it to explain the step I was confused about. Now I finally understood it.

Unsure if this is a good use of my time. Should I be putting this much effort into these techniques or should I be staying higher level and trying to cover more material. I do think I should be better about capping the amount of time I spend working on any one problem before getting help. The point is to learn, not have a stroke of genius. I can be more efficient here.

## LLMs for Document Summarization

This week I've also been helping a pre-seed founder with some prompt engineering for an LLM-based medical summarization tool for lawyers. The first thing I worked on is treating each LLM run as an _experiment_. This means that for every run we needed all the metadata to recreate the results such as the model, the data inputs, the prompts, etc. 


Once I had that output format down I tried to compare a few results. It only took me a few minutes to realize we needed structured LLM outputs. You can read all about this in the documentation for Jason TODOs Instructor library TODO. I'll give a quick overview, let's use dentistry as an example. You typical unstructured text output might look like this:

```
The patient came in on Nov. 3rd for a cleaning and we found one cavity.
```

The point here isn't if the summary is right or wrong, the point is that because this is unstructured/human-readable response it's not clear how to we would assess the accuracy of this output _at scale_. For example, if we had 1k records and 5 different prompts we wanted to try, what would we do?

We can get a lot closer to scalable solution just by enforcing a structured response. For example the above response could become:

```json
{
	"proceedure_date": "2022-11-03",
	"proceedure_type": "cleaning",
	"has_cavity": true 
}
 ```

This model is something we could build automated testing and scoring around.

## Odds and Ends

- Updated the node dependency on this blog TODO
- Started actually saving more bookmarks to the my DuckDB bookmark app. Here are some of my favorites from this week.
- 
