Title: The Moving Target Pipeline
Date: 2013-11-18
Tags: mtpipeline, milestones, wfc3, acs, hst, jwst, wfpc2
Slug: mtpipeline-ddrf
Author: Alex C. Viana
Category: Work


A few weeks ago I was awarded an research grant to continue working on a prototype software pipeline for HST moving target (solar system) observations. The grant came from an internal source called the Director's Discretionary Research Fund (DDRF). My project, called the Moving Target Pipeline, was fully funded at $21,000 and allows me to buy back 25% of my time for one year to work on the project. Here is the proposal abstract:

> "We propose a moving target pipeline for the WFC3 and ACS instruments based our existing WFPC2 software to produce properly drizzled FITS images, dynamically scaled preview images, and predicted ephemeris positions. Such a pipeline is relevant to ongoing HST scientific observations, the Hubble Legacy Archive (HLA), and serves to lay the design groundwork for JWST’s moving target processing. We request funds to support a senior RIA for our software development activities. [^1]"

Continuing from the proposal:

> "Our WFPC2 pipeline addresses the 4 main issues that impede performing Solar System astronomy with HST archival data: (1) identifying cosmic rays, (2) drizzling, (3) scaled preview images, and (4) identifying incidental ephemeris observations."

This image gives an attractive visual of what we can already accomplish for WFPC2 data and will expand to the WFC3 and ACS cameras:

<img style="width: 800px; max-width: 100%; height: auto;" alt="Oops, something broke." src="/images/mtpipeline-mars-before-after.png" />

You can find the full proposal [here](https://www.dropbox.com/s/04m5rboqkkmzuvm/2013_Fall_DDRF_Proposal_No_Recs.pdf). Our project will be open source and available on GitHub. It will be an extension of our existing work on a citizen science project for WFPC2 which you can browse [here]('https://github.com/STScI-Citizen-Science/MTPipeline'). This builds off a number of other grants and [existing work](http://archive.stsci.edu/prepds/planetpipeline/index.html) in this area [^2].

I hope that this phase of the project will be useful for planetary scientists using HST.

[^1]: Full disclosure, I misspelled "activities" in the actual abstract. *facepalm*
[^2]: Humblebrag / scavenger hunt, spot the astronaut co-investigator in the parent proposal :-)