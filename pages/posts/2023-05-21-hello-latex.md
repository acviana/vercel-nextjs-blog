---
title:  Hello, LaTeX!
date: 2023/05/22
description: Playing around with LaTeX formuals for fun
tag: math, meta
author: acv
---

This year I've working on gaining a deeper understanding of AI and ML tools. 
To do this I've been studying a lot of math, specifically [vector spaces](https://en.wikipedia.org/wiki/Vector_space).
As I've been getting increasingly excited about the progress I'm making,
I figured some blog posts were in my future.
This seemed like a good enough reason to go on a side quest to set up equation rendering.

Fortunately, the blogging framework I'm using right now, [Nextra](https://nextra.site/), comes with $\LaTeX$ (nice) support built in.
After migrating some configuration files, I was able get it set up and wanted to do a "little hello" world post with some equations!

So, as a proof-of-concept, here is the definition a subspace, of a core concept I've been studying in Sheldon Axler's text [Linear Algebra Done Right](https://link.springer.com/book/10.1007/978-3-319-11080-6).

### Subspaces

For a vector space $V$ over a field $F$ (nominally either $\mathbb{R}$ the real numbers or $\mathbb{C}$ the complex numbers), the subset $U \subseteq V$ is said to be a _subspace_ of V if and only if ($\Leftrightarrow$) the following 3 conditions are met:

 - **Additive Identity:** The additive identity $0 \in V$ is also $\in U$. That is, $0 \in U \cap V$, where $0$ is an element in $V$ such that $0 + x = x + 0 = x$ for all $x \in V$.
 -  **Closure Under Addition:** For any $x,y \in U$ we also have $x+y \in U$.
 - **Closure Under Scalar Multiplication:** For $a \in F$ and $x \in U$ we have $ax \in U$.

**Update 2023-06-25:** Fixed the definition of a subspace to include the trivial case $U = V$ i.e. $U \subseteq V$ instead of $U \subset V$. Thanks Dad :)