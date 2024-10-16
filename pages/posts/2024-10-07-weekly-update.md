---
title: 2024-10-07 Weekly Update - Levenshtein, Hamming, and Jaccard Distances
date: 2024-10-07
description: Sabbatical Week 15 - General metric spaces, Levenshtein, Hamming, and Jaccard distances plus links on Python 3.13, inline funtions, and The MANIAC
tag: weekly-update, python, math
author: acv
---

This week as part of my consulting work I’ve been working on evaluation metrics for LLM-powered text extraction. Essentially, trying to quantify if the LLM grabbed the right text from a document. This means diving into more depth on some common text comparison algorithms. These were largely familiar with me but I hadn't had a change to use them on a real engineering problem before. Here are my notes.

TODO: Music is Beloiz

### String Metrics

See: <https://en.wikipedia.org/wiki/String_metric>

Formally, all the string metrics measures here are proper metric spaces in the mathematical sense, meaning they satisfy the 4 properties of a metric space.

A metric space is a set $M$ together with a notion of distance $d$ between set elements that must satisfy the following four conditions:

- Distance from a point to itself is zero: $d(x,x) = 0$
- **Positivity:** The distance function always returns a positive value for any two distinct points: $x \neq y \Rightarrow d(x,y) > 0$
- **Symmetry:** The distance function is symmetric: $d(x,y) = d(y,x)$
- **The Triangle Inequality:** The following property holds: $d(x,z) \leq d(x,y) + d(y,z)$

### Levenshtein Distance

Reference: <https://en.wikipedia.org/wiki/Levenshtein_distance>

The Levenshtein distance between two words is the minimum number of single-character edits (insertions, deletions or substitutions) required to change one word into the other. For example:

```
L(bat, cat) = 1

bat : 0
cat : 1 (b -> c)

L(bat, egg) = 3

bat : 0
eat : 1 (b -> e)
egt : 2 (a -> g)
egg : 3 (T -> g)
```

The Levenshtein distance can be normalized by dividing by the length of the longer of the two text strings. This results in a range of $[0,1]$.

### Hamming Distance

Reference: <https://en.wikipedia.org/wiki/Hamming_distance>

Unlike the Levenshtein distance the Hamming distance is only used to compare strings of the same length. As a result it only measure the number of _substitutions_. So it is the number of positions at which the two strings are different.

Similar to the Levenshtein distance, the Hamming distance can be normalized by dividing by the length of the strings.

### Jaccard Distance

Reference: <https://en.wikipedia.org/wiki/Jaccard_index>

The Jaccard _distance_ is the complement of the Jaccard _coefficient_ (or index), that is, $1 - J(A,B)$. Where the Jaccard coefficient is the ratio of the intersection of two sets over their union:

$$
J(A,B) = \frac{|{A \cap B}|}{|A \cup B|}
$$

For text comparisons set elements can be defined in different ways leading to different results. For example, by characters, by words, or by n-grams.

### Levenshtein Distance

The Levenshtein distance is the number of edits, inserts, and TODO required to transform two strings to completely match. TODO: recursive vs dynamic algorithms.

Because your Levenshtien distance can be as high as the number of characters in your string it makes sense to scale this metric when comparing acorss strings of different lengths. One way to do this is is to divide by the length of the longer string. This produces a measures that is between 0 and 1 and is called the normalized Levenshtein distance.

If your strings are the same length then you can also use the related Hamming Distance. This metric only uses TODO and (as a result) is only used to compare two strings of the same length. TODO: Book?

Jacarrd Similarity
Precision
Recall

### Odds and Ends

Here are some other things that have caught my interest this week.

- **Python 3.13 features:** Python 3.13 was released TODO. I recently wrote about some new (to me) Python features I had missed so I was curious to check out what’s new in this release. I found a nice overview on this [Real Python Podcast episode](https://realpython.com/podcasts/rpp/223/) which includes links to all the relevant feature PEPs.
- **Inline Functions:** In another call-back to a recent post I was talking about “taste” in programming, which I loosely defined as being something a little more granular than TODO. This [post on inline functions](http://number-none.com/blow/john_carmack_on_inlined_code.html) from John Carmack and the associated [Hacker News discussion](https://news.ycombinator.com/item?id=41758371) and when to be inconsistent is exactly the kind of thing I’ve been thinking about.
- **The MANIAC:** I’ve been working on this audiobook about the life and impact of John von Neumann TODO.
