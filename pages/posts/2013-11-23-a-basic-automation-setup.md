Title: A Basic Automation Setup for Astronomy: Part 1
Date: 2013-11-23
Tags: code, devops
Slug: a-basic-automation-setup
Author: Alex C. Viana
Category: Work

For one of my projects at work I engineered an automation platform for one of our instrument teams. This platform allows us to automatically execute 20+ daily scripts, written in a variety of programming languages, as data is coming down from the telescope. All the scripts for our team, from the downloading the data, copying and indexing the data in an SQL database, running in-house scripts, and system self-diagnostics run on the same automation platform. Adding a script to this platform requires as little as 4 lines of code. Our codebase is updated with hourly builds from our team of 6 developers and all execution and maintenance is performed via a service account on a Linux Red Hat virtual machine.

This is going to be a series of posts where I'm going to cover all the odds and ends I had to stick together to build this system. This is far from a generalized solution but hopefully you can learn from my mistakes and build something to suit your own needs faster and better than I did.

As an aside, this is what I consider to be the DevOps side of my job. It's only in the last year that this has become part of my work and it's only now that I'm starting to identify this as a valuable skill in response to a hard problem. Previously, I was just embarrassed I kept breaking things. But looking back on it, automating this system in this way is one of the hardest things I've done in my job. I'm fortunate I have a team that didn't tell me to stop wasting my time and do it the old way by running everything by hand. And now that it's up and running I haven't had to fix it in weeks.

In this first post we'll just cover combining the automated execution solution (cron) with the environment configuration solution (Ureka).

### Cron: Running Your Code

At the heart of our system, like many automation solutions, is the Unix job scheduler [cron](http://en.wikipedia.org/wiki/Cron). There are other applications our team considered using to fill this role such as [Condor](http://research.cs.wisc.edu/htcondor/) a distributed computing platform, [Jenkins CI](http://jenkins-ci.org/) a java-based web frontend for continuous integration, [launchd](http://en.wikipedia.org/wiki/Launchd) an OSX job scheduler, and even [Celery](http://www.celeryproject.org/) a distributed job queue. In the end we chose cron because, once we got it working, it was the most direct and simple solution for our architecture. However, as you'll see later, that simplicity made it incredibly difficult to use with IRAF/PyRAF. But first let's start with some cron basics.

If you look at some cron tutorials you'll see that cron jobs are scheduled with a syntax like this:

    :::
    00 11 * * * my_script.py

This will execute `my_script.py` every day at 11 am. This is nothing you can't find in any cron tutorial but here are some tricks I found useful that I had to dig around for a little bit. You can also run multiple scripts sequentially on one line by separating them with a semicolon (`;`) like this:

	00 11 * * * my_first_script.py; my_second_script.py

Each script will run once after the preceding script finishes regardless of the preceding script's exit status. Alternatively, you can make the execution of the second script dependent on the successful completion of the first script with a double ampersand (`&&`) like this:

	00 11 * * * my_first_script.py && my_second_script.py

Now cron is likely going to try to be helpful by emailing you any outputs from your code. The recipient of this email can be defined by setting the `MAILTO` variable before the job definitions like this:

	MAILTO = 'my_team_list@my_institution.edu'
	00 11 * * * my_first_script.py && my_second_script.py

You can also define any other variables or alias you want in this same manner. But let's say that you only want to hear from cron when something breaks. You can do this by redirecting `STDOUT` just as you would from the command line:

	MAILTO = 'my_team_list@my_institution.edu'
	00 11 * * * my_first_script.py && my_second_script.py > /dev/null

Now you will only get an email when something gets passed to `STDERR`. For our setup, this is all the cron syntax we needed to understand. Now onto setting up you environment.

### Ureka: Setting Up Your Environment

Right now you might be thinking, _"My environment is already set up! Right?"_. This is when using cron starts to become a little non-trivial; cron does not know about your [enviorment variables](http://stackoverflow.com/questions/2229825/where-can-i-set-environment-variables-that-crontab-will-use), like _any_ of them. In a lot of applications this is not a big deal, you can just define some environment variables just like I defined `MAILTO` above, and you're set. 

But, if you're in astronomy one of your default software tools is likely IRAF/PyRAF. This takes installing software and declaring environment variables to an entirely new level of difficulty. I spent _weeks_ working on the problem of getting cron to run in an IRAF/PyRAF compatible environment without any success. I tried half a dozen different approaches and talked to several people, all of who confessed to giving up due to the same complication. In the end, I partnered with one of our best IT people and we came up with a solution. The first step of that solution is to use Ureka. 

[Ureka](http://ssb.stsci.edu/ureka/) is a software package developed by STScI and Gemini. From the website:

> Ureka is a collection of useful astronomy software that is generally centered around Python and IRAF. The software provides everything you need to run the data reduction packages provided by STScI and Gemini.  

Ureka is great, it builds a completely isolated IRAF and Python environment in minutes and loads or unloads the environment with a single command. You can run ds9, IRAF, PyRAF, and Python. Plus Python comes loaded with IPython, the IPython notebook, matplotlib, numpy, scipy, and pandas. If you need more than that you can immediately run `pip install` because your paths have already been set up for you. You're on your own for IDL though.

Whether you're like me and work on an institute machine with pre-built libraries or if you're running everything on your own machine and have root, Ureka is worth looking into because it _just works_. I spent a lot of time learning to use package managers, building from source into different prefixes, virtualenv, and the ins and outs of pip, but when I got a new virtual machine last month I used Ureka and literally set up everything I needed in 3 commands. I was sold.

So now we have our automation tool, cron, and our environment setup with Ureka. Now it's time to combine them.

### Cron + Ureka: Automatic Environment Setup

Like we just saw, you can run more than one script on a single line in cron. You can start the Ureka environment with the command `ur_setup` and exit with `ur_forget`. So I _thought_ the following command would have been enough to run our scripts:

  	00 11 * * * ur_setup && my_second_script.py > /dev/null

But it doesn't work. Somehow this does not run `my_second_script.py` using the environment set up by `ur_setup`, my guess is that each script is launched in an independent shell that doesn't propagate variables back to the parent cron environment. This independence is generally a desirable feature so that makes sense, though it makes life hard in our case. This is where everyone I talked to crashed and burned when trying to use cron to automate astronomy software, whether they were using Ureka or not. But eventually one of our IT specialists worked out a wrapper script:

	:::sh
	#!/bin/tcsh
	ur_setup
	"$*"

It's non-intuitive at first but what it does it runs `ur_setup` and then takes a script name as a command line argument and runs that script. Because this is all done in the same shell session the script is launched in the Ureka environment - _finally_. I can't tell you how happy I was to finally get this to work. The execution looks like this:

  	00 11 * * * cron_setup.sh my_second_script.py > /dev/null

### Done, Right?

That was a bit of a long post, and you might be tempted to call it quits and just run with this setup, but I would encourage you not to. We still have to talk about a deployment solution for your code using your version control system (because your code is version controlled right?), using Python to wrap code written in other languages, using the Python logging module to generate logs. Doesn't that sound nice? I'll put the link to all that right [here] once it's ready.
