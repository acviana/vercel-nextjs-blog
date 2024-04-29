---
title: Fumbling Into Floats
date: 2024-05-01
description: Down a rabbit hole of floating point numbers
tag: coding, math
author: acv
---

## What Do You Mean?

Recently, I was working on a side project writing a [multi-armed bandit simulator](https://github.com/acviana/multiarmed-bandit-simulation/tree/main). This requires iteratively appending to a series of numbers and updating the mean. It turns out that instead recalculating the mean of the entire series you can do this in a computationally efficient way by implementing an [incremental mean](https://math.stackexchange.com/a/106720). Here what that looks like in Python:

```python
def incremental_mean(mean: float, observation: float, n: int) -> float:
    return mean + ((observation - mean) / n)
```

The benefit of using this incremental mean formula for this is that each incremental calculation is $\mathcal{O}(1)$ while calculating the mean of the entire series would be $\mathcal{O}(n)$. To see this I benchmarked this with a series of 1000 randomly generated floats, once using my incremental mean formula and once using the `statistics.mean` function from the Python Standard Library.

```python
%%timeit
[statistics.mean(input_list[0 : index + 1]) for index in range(len(input_list))
]
433 ms ± 62.2 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)

%%timeit
rolling_incremental_mean(input_list)
513 µs ± 28.1 µs per loop (mean ± std. dev. of 7 runs, 1,000 loops each)
```
Fantastic, it's nearly 1000x faster! Great, we're done. 

_We were not done_

## What the Float?!?

Everything seemed to be working fine in the larger project with the faster incremental formula so I moved on. But, while I was debugging a different error I decided to return to this function just to double-check. I tried to run an `assert` against the two outputs from my benchmark to confirm they're the same and it failed.

_No surprise, probably a typo!_ 

So then I looped over the two outputs and checked them all pairwise, it made it through a few dozen numbers before failing.

_That's weird, shouldn't it always be right or wrong?_ 

Then tried plotting the residuals (difference) between the two outputs and got this graph

![incremental mean residuals](../../public/images/incremental-mean-residuals.png)

_That's weird ... why are the errors quantized? Shouldn't they be - oh right, floats._ 

## We All Float On Alright

Here's what I thought was going on, to first order.

Numbers are infinite but computers are decidedly finite. This means any computational (physical) representation of the number line is going to have certain constraints. The most common representation computers use are called [floating-point numbers](https://en.wikipedia.org/wiki/Floating-point_arithmetic), or "floats". This represents every number as some real number of finite length raised to an exponent like this $123.456e^{10}$. 

Now here's where the constraints come in. Because the number of digits in the prefix to the exponent (also called the "mantissa") is limited, it means we can only construct a finite number of mantissas _per exponent_. That means that as the exponents get smaller, the numbers we can represent get closer and closer. The exponents themselves have a limited range (much less than the range of the mantissa) which means at some point we get to the smallest interval we can express in our floating point system.  

I'm hand-waiving away some details here but that's what went through my mind the first time I saw the graph of my residuals. I noticed the errors were on the order of $1e^{-15}$. This is effectively zero for my purposes, and figured I must have hit the floating point limit. I assumed there must be some rounding approximation in the standard library `statistics.mean` function or something.

Regardless of the details, my function was correct so I could just stop there. 

_I did not stop there._

## Down the Rabbit Hole

I really wanted to get back to my main project, but now my interest was piqued. Could I _prove_ that this was just rounding errors on floating point math?

To start with, I confirmed that both the outputs had 1000 distinct values, that seems normal. Now, how many different residual values were there?

```python
>>>len(residuals)
1000

>>>len(set(residuals))
18
```
OK, only 18 distinct values out of 1000, so the issue is being introduced when I subtract the two outputs. 18 isn't that many, let's take a look.

```python
>>>sorted(set(residuals))
  [-6.661338147750939e-16,
 -4.440892098500626e-16,
 -3.3306690738754696e-16,
 -2.220446049250313e-16,
 -1.1102230246251565e-16,
 -3.469446951953614e-18,
 0.0,
 5.551115123125783e-17,
 1.1102230246251565e-16,
 2.220446049250313e-16,
 3.3306690738754696e-16,
 4.440892098500626e-16,
 6.661338147750939e-16,
 8.881784197001252e-16,
 1.1102230246251565e-15,
 1.3322676295501878e-15,
 1.5543122344752192e-15]
```
Many of those seem suspiciously evenly spaced at something like $1.11e^{-16}$. You can see this more clearly if you plot them on a number line.

![Incremental mean residuals on a 1d number line](../../public/images/floating-point-residuals-1d.png)

We can calculate the distances between points to make sure they're really the same.

```python
>>>residuals_set = sorted(set(residuals))
>>>set([
    residuals_set[i] - residuals_set[i + 1] 
    for i in range(len(residuals_set) - 1)
])

{-2.220446049250313e-16,
 -1.1102230246251565e-16,
 -1.0755285551056204e-16,
 -5.551115123125783e-17,
 -3.469446951953614e-18}
```

That seems promising, there are only 5 distinct distances. Maybe the smallest of those is the minimum floating point step size?

## An Epsilon of Difference

It turns out you can figure out the float properties of your system with the `sys.float` command.

```python
>>>import sys
>>>sys.float_info

sys.float_info(
    max=1.7976931348623157e+308, 
    max_exp=1024, 
    max_10_exp=308, 
    min=2.2250738585072014e-308, 
    min_exp=-1021, 
    min_10_exp=-307, 
    dig=15, 
    mant_dig=53, 
    epsilon=2.220446049250313e-16, 
    radix=2, 
    rounds=1
)
```

The value we care about is `epsilon=2.220446049250313e-16`. This value is one of our list of spacings, but not the smallest one. The Python docs define `float_info.epsilon` as:

> difference between 1.0 and the least value greater than 1.0 that is representable as a float.

OK, that seems consistent with the idea that we're hitting the lower limit of what we can represent with floats. Seems like a good place to stop!

_We're not stopping._

## Epsilon Families

If you squint at the list of distinct residuals you might notice a pattern that many of them are offset by the `float_info.epsilon` value. Actually, it looks like there are two "families" of residuals, each coming at intervals of `epsilon`, but with one family offset but 1/2 `epsilon`. This plot helps show that. 

![Floating Point Residual by Epsilon Family](../../public/images/floating-point-residuals-by-epsilon-family.png)

The families are color coded in both figures. On the top they all appear on the same number line. On the bottom figure they are separated for clarity. 

There are still two points that don't fit into that scheme.

