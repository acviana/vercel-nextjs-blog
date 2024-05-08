---
title: Encountering Autocorrelation
date: 2024-05-15
description: Trying to understand autoregression from the ground up
tag: autoregression, machine-learning, math
author: acv
---

I was recently asked to run a ballpark forecast for a weekly sum. I grabbed the data and ran a quick linear regression using some Python tools I wrote on top of the TODO package. Unfortunately, the confidence interval made the forecast too uncertain to be useful. 

But, it occurred to me that my dataset was made up of weekly snapshots and the weekly start dates are arbitrary. Wouldn't it be better to use a rolling 7-day sum? Sure enough, the confidence interval was _much_ tighter. Now in the back of my mind there were alarm bells going off, this seems to easy, something must be wrong. 

I mentioned this to a coworker later and he mentioned something about "autoregression". I knew enough about autoregression from ARIMA that I immediately realized this was the shape of the problem. TODO: Autocorrelation  

## Building TODO

Hands-on and motivated intuition have always been so important to my own learning process. I knew this was the perfect chance to really learn about autoregression. As the saying goes, spreadsheets are at worst the second-best solution to any problem, so I started with a spreadsheet.

To start I generated 100 points on a straight line plus some random noise. I then calculated a linear regression with the TODO function and subtracted this from the raw data to find the residuals. The results looked like this:

TODO

TODO

Then I went and did the same thing against the same data but this time using a rolling 7-day window. Now the results look like this:

TODO 

TODO

If you've been staring at data for a while those errors should jump out at you a being correlated -- which is a problem! But now I wanted to quantify this, could I use something with the correlation coefficient? Maybe with some lag between the points?   

## Hitting the Books

At this point, I felt like I was starting to reinvent the wheel. I went to my most/least favorite online bookseller and had a copy to TODOs TODO by the next morning.

Here is the first line in the book:

> TODO

I found this equal parts encouraging and forehead slapping :P.  


