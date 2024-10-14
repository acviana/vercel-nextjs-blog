---
title: 2024-10-07 Weekly Update TODO
date: 2024-10-07
description: TODO
tag: TODO
author: acv
---

This week as part of my consulting work I’ve been working on evaluation metrics for LLM-powered text extraction. Essentially, trying to quantify if the LLM grabbed the right text from a document. This means diving into more depth on some common text comparison algorithms. These were largely familiar with me but I hadn't had a change to use them on a real engineering problem before. Here are my notes.

TODO: Music is Beloiz

### Levenshtein Distance

The Levenshtein distance is the number of edits, inserts, and TODO required to transform two strings to completely match. TODO: recursive vs dynamic algorithms.

Because your Levenshtien distance can be as high as the number of characters in your string it makes sense to scale this metric when comparing acorss strings of different lengths. One way to do this is is to divide by the length of the longer string. This produces a measures that is between 0 and 1 and is called the normalized Levenshtein distance.

If your strings are the same length then you can also use the related Hamming Distance. This metric only uses TODO and (as a result) is only used to compare two strings of the same length. TODO: Book?

Jacarrd Similarity
Precision
Recall
