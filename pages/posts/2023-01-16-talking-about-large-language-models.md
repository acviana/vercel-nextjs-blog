---
title: "Journal Club: Talking About Large Language Models"
date: 2023/01/16
description: Notes on Murray Shanahan's "Talking About Larger Language Models"
tag: jounrnal-club, artifical-intelligence, large-language-models, machine-learning, papers
author: acv
---

I want to do more intention self-directed study in 2023.
One of the ways I'm working on this is by reading academic and technical papers.
Taking notes on what I'm reading gives me some more direction and helps organize my thoughts.
Hopefully, I'll continue commenting on articles as time and inspiration allows. 

My first paper of the year is [“Talking About Large Language Models”](https://arxiv.org/abs/2212.03551) by Murray Shanahan.
It was a good first pick!
The topic of Large Language Models (LLMs) is basically inescapable in tech right now and the fact that the article is fairly philosophical and less technical in nature made it an accessible entry point for trying to understand these systems.
Overall, I think the article gives a useful framing of LLM systems that I'll continue to use as I try to understand LLMs and AI generally.

What follows are my notes but the paper itself isn't that long so you should consider reading the original if this seems interesting to you.

With apologies to [Raymond Carver](https://en.wikipedia.org/wiki/What_We_Talk_About_When_We_Talk_About_Love), let's dive in.

### What We Talk About When We Talk About Talking About Large Language Models

The paper stars by reminding us that despite the incredible and evolving accomplishments of LLMs they are fundamentally still "next [text] token prediction" machines.
As such, they lack any internal structures that could be mapped to anything like the human experience of "knowing" or "understanding".
Because LLMs and other forms of "exotic, mind-like entities"  are poised to become a fixture in our everyday lives we need to be precise in talking about what these systems are actually doing, both as practitioners and in the general public.

### Unreasonable Effectiveness

The article starts by pointing out 3 ways in which large language models (LLMs) are “unreasonably” effective.
As an aside, this is a reference to Halevy, Norvig, and Pereira's 2009 article ["The Unreasonable Effectiveness of Data"](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/35179.pdf). 
This is in turn is a reference to Wagner's 1960 article ["The Unreasonable Effectiveness of Mathematics in the Natural Sciences"](https://www.maths.ed.ac.uk/~v1ranick/papers/wigner.pdf) (additional [background](https://en.wikipedia.org/wiki/The_Unreasonable_Effectiveness_of_Mathematics_in_the_Natural_Sciences)). 

The third of there three points is the focus of the article and the most relevant to the understanding LLMs:

> … a great many tasks that demand intelligence in humans can be reduced to next token prediction with a sufficiently performant model.

The more you sit with this statement the more remarkable it becomes! 
However, in spite of this (or rather because of this) the rest of the article focuses on reminding us that this "effectiveness" is **not** in fact anything resembling “intelligence”. 

### Defining LLMS

Continuing on, we get a definition of LLMs:

>LLMs are generative mathematical models of the statistical distribution of tokens in the vast public corpus of human generated text …

And from there the author reminds us that, under the hood, all LLM systems are doing is something like the following:

>Here’s a fragment of text. Tell me how this fragment might go on. According to your model of the statistics of human language, what words are likely to come next?

Reiterating and tying those points together more explicitly:

>There are two important takeaways here. First, the basic function of a large language model, namely to generate statistically likely continuations of word sequences, is extraordinarily versatile. Second, notwithstanding this versatility, at the heart of every such application is a model doing just that one thing: generating statistically likely continuations of word sequences. Having established how LLMs work (probabilistic prediction on sequences of text tokens) the article now focuses on the fact that, by design, LLMs can not “know” or “understand” anything. They say what is likely to come next. 

These concepts are largely preliminary to the main point of the article, which is the limitations of these systems and how our language should reflect this. 
But, as technical reader who is not an AI practitioner, these preliminary definitions are an extremely useful framework to begin to think about all the AI and LLM models news I see everyday.

### LLMs, Knowledge, and Anthropomorphism

The remainder of the paper presses the issue that these systems, by nature of their scope, can not be said to "think" or "know". 
And further, it's important **not** to reach for convenient idiomatic expressions that suggest they can. 
This precise language is important for an accurate long-term societal understanding of what these systems are doing.

The author provides a nice analogy to illustrate these limitations:

>An encyclopedia doesn't literally “know” or “believe” anything, in the way that a human does, and neither does a bare-bones LLM.

The author supports this position by arguing that LLMs operate in a context completely outside of that of human "communicative intent"; meaning it knows nothing about person asking the question, people in general, or the effect of its response.
The author then preempts the argument that such knowledge could arise as an emergent phenomenon from a neural network like system because sequence prediction (the essence of LLMs) will never contain a notion of communicative intent. 
I'm omitting the details because neither argument is particularly lengthy and interested readers would be better served to read the source material.

### Wrapping Up

To conclude, the author asserts (and I largely agree) that these arguments are neither pedantic nor purely philosophical.
LLMs, AI, and other “exotic, mind-like entities” are not going anywhere and nor are they well understood. The linguistic choices we make now could potentially impact the ability of practitioners, law makers, and the general public to reason about the limitations and abilities of these new and exciting systems.

This paper was an interesting and relevant start to the year and I'm glad I found time to jot down my thoughts. I'm hoping the next paper I pick will come from the citations in this paper so I can start to build a deeper understanding of this space.
