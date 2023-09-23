---
title: Finite Dimensiona Vector Spaces Ch. 1 Problem 2(c)
description: Working through problem 2(c) from chapter 1 of Halmos's "Finite Dimensional Vector Spaces"
author: acv
date: 2023-09-23
tag: blog, math
---

I'm 9 months into my self-directed study of math and I wanted to start writing about some of the problems I enjoyed working on. First up is problem 2(c) from [Paul Halmos's](https://en.wikipedia.org/wiki/Paul_Halmos) foundational 1942 text *"Finite Dimensional Vector Spaces"*. 

I was excited by this problem because of the technique I had to use to solve it. It's the first to me I've been given a problem that can't be solved in the original domain, but can be solved the mapping your set to a new domain with different properties. It's a technique I've seen before, but never one I've been asked to implement myself.
## The Setup

The first two parts of this problem are quick to verify and on-par with what you would see in any other introductory abstract algebra text covering [fields](https://en.wikipedia.org/wiki/Field_(mathematics). 

Briefly, the set of all positive integers ($\mathbb{Z}_+$) is not a field because there is no additive inverse ($\nexists -x \in \mathbb{Z}_{+}$ such that  $x + (-x) = 0$ for $\forall x \in \mathbb{Z}_{+}$). 

Similarly, the set of all integers ($\mathbb{Z}$), while it does have an additive inverse, is still not a field because there is no multiplicative inverse ($\nexists x^{-1} \in \mathbb{Z}$ such that  $xx^{-1} = 1$ for $\forall x \in \mathbb{Z}$). 

This is all pretty standard stuff but Part (c) was interesting to me though.
## The Problem

> Can the answers to the question be changed by re-defining addition or multiplication (or both)?

After have no luck with my usual bag of tricks (modulo addition, trig functions, even/odd numbers) I found some help on [Math Stackexchange](https://math.stackexchange.com/a/1356925/1141983) .

We can, in fact, redefine addition (here $\oplus$ instead of $+$) and multiplication ($\odot$ instead of $\cdot$) such that $\mathbb{Z}_{+}$ (or $\mathbb{Z}$) are fields $\mathfrak{F}(\mathbb{Z}_+,\oplus,\odot)$. 

We want to take advantage of the fact that the rational numbers ($\mathbb{Q}$) *are* a field. Note that $\mathbb{Z}_{+}$ is infinite but has the same cardinality as $\mathbb{Q}$ -- they are both [countably infinite](https://en.wikipedia.org/wiki/Countable_set) (written as $\aleph_{0}$). Using this fact, we can define a function $f: \mathbb{Z}_+ \rightarrow \mathbb{Q}$ . That is, a [bijection](https://en.wikipedia.org/wiki/Bijection) (a mapping that is one-to-one and onto) that maps each member of $\mathbb{Z}_{+}$ onto a unique member of $\mathbb{Q}$. 

Then we can use our function $f$ (and its inverse $f^{-1}$) to build a new definition of addition and multiplication for $x \in \mathbb{Z}_+$ such that it now meets the [properties of a field](https://en.wikipedia.org/wiki/Field_(mathematics)#Classic_definition):
$$
\begin{align}
&\oplus : f^{-1}(f(x) + f(y)) & \\
&\odot : f^{-1}(f(x) \cdot f(y)) & 
\end{align}
$$
## Why It Works

These new definitions of addition and multiplication satisfy the properties of a field by moving our binary functions to $\mathbb{Q}$, performing the operation, and then mapping the result back to $\mathbb{Z}_{+}$. Note that we never actually define the function, and there could be infinitely many such mappings, it's just enough to show that it exists.

The general technique here is to use a function ($f$) to map a set ($\mathbb{Z}_{+}$ or $\mathbb{Z}$) into a codomain ($\mathbb{Q}$), using the properties we need in the new codomain (additive and multiplicative inverse), and then using an inverse function  ($f^{-1}$) to return to the original space ($\mathbb{Z}_{+}$ or $\mathbb{Z}$).

Conceptually, this idea of mapping to a new space with useful properties reminds me of related techniques from other areas of applied math. For example, a [Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform) to transform a waveform from time-space to function-space, or a [Laplace transform](https://en.wikipedia.org/wiki/Laplace_transform) to go from a real-space to a complex-space. 
## Why It's Interesting

Like most people, most of my math career has been focused on *calculation*, I was given formulas and told to apply them. The motivation and reasoning behind the techniques was explained, which is how I recognized some of the parallels I pointed out.  But these were always presented a tools to be used, not general techniques that we could also apply. 

So to wrap things up, even though this is an elementary result it got me excited because this is the type deeper mathematical tool set I would like to build.
