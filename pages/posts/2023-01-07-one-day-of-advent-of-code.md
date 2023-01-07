---
title: One Day Of Advent Of Code
date: 01/07/2023
description: Working on Advent of Code and learning to take only what you need from something
tag: dev, 500-words, advent-of-code
author: acv
---

This year I finally accomplished a dream of mine - I _only_ did a single day of the annual [Advent of Code](https://adventofcode.com/) challenge.
While most people aspire to complete the entire 25 day exercise, I've learned Advent of Code is as much about me wrestling with my own perfectionism as it is about solving coding puzzles.

I've been doing Advent of Code for 4 years now.
3 years ago, I did the most I had ever done and I was miserable.
For 13 days AOC was eating up what little time and energy I had after work.
I was caught in a cycle where I was ashamed of myself for not solving the problems more easily.
But, I was unable to step away because I felt like I was so close to finishing. This made me invest even more time which made me even more ashamed.

Last year, I only did 4 days of puzzles but I also stopped trying to solve as many problems as I could.
Part of this is because I stopped feeling like I needed to use AOC to prove my programming ability to myself and others.
This allowed me to start using AOC as a sandbox to try new (to me) Python tools and features like type hints, mypy, and to build out workflows in Make.
I had _way_ more fun working this way and ended up with some tools and patterns I was able to use for the rest of the year.

I discovered that last part, up-to-date knowledge of how to build complete modern python projects, is really valuable to me.
As a then manager and now executive, I'm not coding regularly.
So when I do have a chance to get my hands dirty, for fun or for profit, it's a huge accelerator to have a go-to template to quickly build out a project with up-to-date tools and practices.

I don't mean "template" metaphorically.
I have a [cookiecutter template](https://github.com/acviana/python-project-template/) I use to build my projects and now I use Advent of Code as my chance to give it an annual refresh.

This year, I leaned even more into "doing more with less" and only did one day's worth of puzzles.
I then spent the remaining time making updates to my solution workflow including switching from flake8 to [ruff](https://github.com/charliermarsh/ruff), adding [mypy](https://mypy-lang.org/) into my workflows, and adding a template documentation page with [Sphinx](https://www.sphinx-doc.org/en/master/) driven by docstrings and typehints with [autodoc](https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html).
With the exception of Ruff this was all stuff I'd done before, but had never taken the time to systematize.

I then started porting the ideas I enjoyed into my template.
Checking for bugs in your template can be tricky because the template itself is full of jinja-style template variables (e.g. `{{project-name}}`) so you can't run it directly.
To help with this I created a [new project](https://github.com/acviana/python-project-template-testing) with a `Makefile` that pulls my cookiecutter template and runs a "hello world" build to check for obvious bugs.

I really wish I had the time to do all 25 of the AOC puzzles every year, but the truth is I don't. Instead, I'm glad I've gotten to the point in my life where I have the confidence to make use of something in the way I want to.
