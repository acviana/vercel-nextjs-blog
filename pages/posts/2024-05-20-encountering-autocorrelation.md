---
title: Encountering Autocorrelation
date: 2024-05-15
description: Trying to understand autoregression from the ground up
tag: autoregression, machine-learning, math
author: acv
---

I was recently asked to run a ballpark forecast for a metric that we report as a weekly sum. I grabbed the data and ran a quick linear regression using some Python tools I wrote on top of the TODO package. Unfortunately, the confidence interval made the forecast too uncertain to be useful. 

But, it occurred to me that while we report the data as a weekly snapshot, my dataset was made up of sliding 7-day windows with one data point per day. 

_Wouldn't it be better to use a rolling 7-day sum?_

Sure enough, the confidence interval was _much_ tighter. In the back of my mind though, there were alarm bells going off.

_This seems too easy, something must be wrong?_ 

But the regression line seemed like a perfect fit to the data and afterall I was just using all the data in the dataset.

I mentioned this to a coworker later and he mentioned something about "autoregression" and the little I knew about ARIMA flashed into my head.

_ohhh, right_

## Building TODO

Hands-on and motivated intuition have always been so important to my own learning process. I knew this was the perfect chance to really learn about autocorrelation. As the saying goes, spreadsheets are at worst the second-best solution to any problem, so I started with a spreadsheet.

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


