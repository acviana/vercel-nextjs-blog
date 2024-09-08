---
title: 2024-09-06 Weekly Update
date: 2024-09-06
description: Structured outputs for LLMs and prooving the binomial theorem
tag: TODO
author: acv
---

## Math: Proof of the Binomial Theorem

I finally gave in an looked up the answer to the proof of the binomial theorem I was working on in Hammack's 
"The Book of Proof". I had the right set-up but never cracked the middle step. But even after looking at the answer I wasn't following how to make the jump. Because this is a famous proof, I felt confident asking ChatGTP for help. Again, I was genuinely surprised. Not only did ChatGTP produce what appears to be a correct proof, it was also able to expand on the step that was confusing me. You can find the transcript of the chat here TODO.

It's becoming clear that TODO.

I'm glad I now understand this proof, but that being said I go back and forth on if this is a good use of my time. Should I be putting this much effort into being able to apply these techniques or should I be staying higher level and trying to cover more material? While there's something to be said for learning for it's own sake it would probably be more helpful in my career to be working on something more applied like a standard data science technique. 

Regardless, I do think I could be better about capping the amount of time I spend working on any one problem before getting help. The point is to learn, not have a stroke of genius, and I can be more efficient here.

## LLMs for Document Summarization

My big project this week has been helping a pre-seed founder with some prompt engineering for an LLM-based medical summarization tool. The first thing I added to the project is to start treating each LLM run as an _experiment_. This means that for every run we need to store not only the results but all the metadata needed to recreate the results such as the model, the data inputs, the prompts, etc. 

Once I had that output format down I tried to compare a few results. It only took me a few minutes to realize we needed structured LLM outputs! Fortunately, I had been keeping up with LLM model tools and I know that the Instructor package, built on top of Pydantic, was the go-to solution for this. You can read more in the Instructor documentation. 

I'll give a quick overview, let's use dentistry as an example. You typical unstructured text output might look like this:

```
The patient came in on Nov. 3rd for a cleaning and we found one cavity.
```

The point here isn't if the summary is right or wrong, the point is that because this is unstructured/human-readable response it's not clear how to we would assess the accuracy of this output _at scale_. For example, if we had 1k records and 5 different prompts we wanted to try, how would be parse and compare all those outputs?

We can get a lot closer to scalable solution just by enforcing a structured response. For example the above response could become:

```json
{
	"proceedure_date": "2022-11-03",
	"proceedure_type": "cleaning",
	"has_cavity": true 
}
 ```

This model is something we could build automated testing and scoring around! 

## Odds and Ends

- Updated the node dependency on this blog which fixed some issues with recent posts appearing in the blog index.
- Started actually saving more bookmarks to the my DuckDB bookmark app. Here are some of my favorites from this week.
- 
