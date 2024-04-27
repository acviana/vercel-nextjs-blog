---
title: Fumbling Into Floats
date: 2024-05-01
description: Down a rabbit hole of floating point numbers
tag: TODO
author: acv
---

## What Do I Mean?

Recently, I was working on a little side project where I needed to implement a formula for an [incremental mean](https://math.stackexchange.com/a/106720) in Python. I ended up with this:

```python
def incremental_mean(mean: float, observation: float, n: int) -> float:
    return mean + ((observation - mean) / n)
```

I then used it to calculate a "running mean" of a list of numbers, meaning the $n$th mean in my output list was the mean of the first $n$ numbers in the input list. I then compared the result of my loop using my incremental mean against one using the `mean` function from the Python Standard Library.

```python
%%timeit
[statistics.mean(input_list[0 : index + 1]) for index in range(len(input_list))
]
433 ms ± 62.2 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)

%%timeit
rolling_incremental_mean(input_list)
513 µs ± 28.1 µs per loop (mean ± std. dev. of 7 runs, 1,000 loops each)
```
Fantastic, nearly 1000x faster! Great, we're done (we were not done).

## Small Detail, Is It Right?

Everything seemed to be working just fine in the larger project with the faster incremental formula. But while I was debugging something else I decided to return to this function just to double-check. I compared the results between the standard library and my output and the `assert` failed.

No surprise probably a typo! I looped over the two numbers and checked them all pairwise, it made it through a few dozen numbers and before failing. That's even weirder, shouldn't it always be right or wrong? 

I tried plotting the residuals between the two methods and saw this

![incremental mean residuals](../../public/images/incremental-mean-residuals.png)

That's weird ... why are the errors quantized? Oh right ... floats. The errors were on the order of $1e^{-15}$. There must be some rounding approximation in the standard library `mean` function or something. 

## Down the Rabbit Hole

I really wanted to get back to my main project, but now my interest was piqued. Could I _prove_ that this was just rounding errors on floating point math?

To start with, how many values were there?

```python
>>>len(residuals)
1000

>>>len(set(residuals))
18
```
OK, only 18 distinct values out of 1000. That's not that the many, let's take a look.

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

It turns out you can figure this out!
```python
>>>import sys
>>>sys.float_info

sys.float_info(max=1.7976931348623157e+308, max_exp=1024, max_10_exp=308, min=2.2250738585072014e-308, min_exp=-1021, min_10_exp=-307, dig=15, mant_dig=53, epsilon=2.220446049250313e-16, radix=2, rounds=1)
```

The value we care about is `epsilon=2.220446049250313e-16`, which is one of, but not the smallest number in our list of spacings.
