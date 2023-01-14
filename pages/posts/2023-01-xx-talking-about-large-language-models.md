---
title: "Journal Club: Talking About Large Language Models"
date: 2023/01/13
description: A review of Murray Shanahan's "Talking About Larger Language Models"
tag: jounrnal-club, AI, LLM, ML 
author: acv
---

I want to do more intention self-directed study in 2023. One of the ways I'm working on this is by reading academic and technical papers; and hopefully commenting on them as time and inspiration allows. My first paper of the year is [“Talking About Larger Language Models”](https://arxiv.org/abs/2212.03551) by Murray Shanahan.

This paper defines Large Language Models (LLMs) as "next [text] token prediction" machines. The author argues that, as such, they lack any internal structures that could be mapped to anything like the human experience of "knowing" or "understanding". As a result, we should be careful to refine our language accordingly when talking about these "exotic, mind-like entities" that are poised to become a fixture in our everyday lives.

Let's dive in.

#### Unreasonable Effectiveness

The article starts by pointing out 3 ways in which large language models (LLMs) are “unreasonably” effective. As an aside, this is a reference to Halevy, Norvig, and Pereira's 2009 article ["The Unreasonable Effectiveness of Data"](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/35179.pdf). This is in turn is a reference to Wagner's 1960 article ["The Unreasonable Effectiveness of Mathematics in the Natural Sciences"](https://www.maths.ed.ac.uk/~v1ranick/papers/wigner.pdf) (additional [background](https://en.wikipedia.org/wiki/The_Unreasonable_Effectiveness_of_Mathematics_in_the_Natural_Sciences)). 

The third point is the focus of the article and the most relevant to the understanding LLMs:

> … a great many tasks that demand intelligence in humans can be reduced to next token prediction with a sufficiently performant model.

The more you sit with this statement the more remarkable it becomes. However, in spite of that (or rather because of that) the rest of the article focus on reminding us that this "effectiveness" is **not** in fact anything resembling “intelligence”. 

#### Defining LLMS

Continuing on, we get a definition of LLMs:

>LLMs are generative mathematical models of the statistical distribution of tokens in the vast public corpus of human generated text …

And from there the author reminds us that, under the hood, all LLM systems are doing is something like the following:

>“Here’s a fragment of text. Tell me how this fragment might go on. According to your model of the statistics of human language, what words are likely to come next?”

Reiterating and tying those points together more explicitly:

>There are two important takeaways here. First, the basic function of a large language model, namely to generate statistically likely continuations of word sequences, is extraordinarily versatile. Second, notwithstanding this versatility, at the heart of every such application is a model doing just that one thing: generating statistically likely continuations of word sequences. Having established how LLMs work (probabilistic prediction on sequences of text tokens) the article now focuses on the fact that, by design, LLMs can not “know” or “understand” anything. They say what is likely to come next. 

These concepts are largely preliminary to the main point of the article, which is the limitations of these systems and how our language should reflect this. But as technical reader who is not an AI practitioner, these preliminary definitions are an extremely useful framework to begin to think about all the AI and LLM models news I see everyday.

The remainder of the paper presses the issue that these systems, by nature of their scope, can not be said to think. And further, it's important **not** to reach for convenient idiomatic expressions that suggest they can. This precise language is important for an accurate long-term societal understanding of what these systems are doing.

#### LLMs, Knowledge, and Anthropomorphism

The rest of the paper builds off this foundation to explain how LLMs do not, and not can, represent any type of thinking systems and be said to "understand" or "know" anything. The author provides a nice analogy here:

>An encyclopedia doesn’t literally “know” or “believe” anything, in the way that a human does, and neither does a bare-bones LLM.

The author asserts (and I largely agree to the limited extent my opinion carries any weight here) that this is neither a pedantic nor philosophical point. Instead they are practical considerations of learning to live with 

Yet in their very nature, such systems are fundamentally not like ourselves

“exotic, mind-like entities”

