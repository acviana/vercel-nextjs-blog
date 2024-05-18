Title: Setting Up Pelican with GitHub Pages
Date: 2017-02-25
Category: Python
Tags: python, pelican, github
Slug: setting-up-pelican-with-github-pages
Authors: Alex C. Viana

This is a short post about how I set up my pelican project to deploy with GitHub pages. Specifically, I want to version control both the output static pages that are being served as well as the source Markdown files used to generate the output. What I ended up isn't novel but it did take me a while to wrap my head around and wasn't highlighted in any of the documentation or blog posts I found so I wanted to share. Hopefully, it can save you some time.

# Introduction

[Pelican](docs.getpelican.com/) is a static blogging tool written in Python that generates static webpages from Markdown. [GitHub Pages](https://pages.github.com/) is a site hosting feature from GitHub that will serve the content of a repo in your account named `$USERNAME.github.io` to that same URL - super easy. This makes for a great blogging workflow, just write some Markdown, peep the output, commit, push, done! The only complication in setting up this workflow is that you project actually contains two different types of content, the source and the output, which you want to store separately.

# The Problem

The problem I ran into is that when you run the pelican quickstart command you get a file tree that looks roughly like this.

```
   ├── Makefile
   ├── content/
   ├── output/
   ├── pelicanconf.py
   └── publishconf.py
```

With most new projects you just initialize a new repo at the root level and go. But, I didn't want everything in the same place. I didn't want the source Markdown files, config files, etc. to be served to my GitHub pages site, I only want the contents of the `output/` folder. At the same time though, I do want to keep track of the source Markdown files. These are critical if I ever want to regenerate the output files to do something like fix a typo or change the site theme.

What's worse is that I already _had_ two repos set up like this on GitHub from when I was last actively blogging. But over the course of the 3 years I had forgotten Pelican workflow, missed a few releases, and changed laptops so I was struggling to remember how to reconnect them. I tried playing around with having two parallel projects with GitHub submodules, git branches, symbolic links, and shell scripting to sync the files over but all of these felt really hacky. Finally, I remembered what I had done.

# My Solution

What I ended up doing was cloning my pages git repo into the `content/` folder and the source file repo into the `output/` folder.

```
   ├── Makefile
   ├── content/
   │   ├── 2013/
   │   ├── 2014/
   │   ├── 2017/
   │   ├── images
   │   ├── pages
   │   └── .git
   ├── output/
   │   ├── index.html
   │   ├── ...
   │   └── .git
   ├── pelicanconf.py
   └── publishconf.py
```

It seems obvious in hindsight but because it's a break from the traditional model of one repo per project that it took a while for me to think of it.

# Sources

So initially, about 4 years ago, I modeled a lot of my pelican configuration and setup around [this post](https://jakevdp.github.io/blog/2013/05/07/migrating-from-octopress-to-pelican/) by Jake Vanderplas. Rereading it now I recognized lots of the configuration decisions I had made in the past but couldn't find anything about how he set up his repos. Finally, I think what I must have done all those years ago is looked at his [github source](https://github.com/jakevdp/PythonicPerambulations) for his blog and copied the pattern from there.

Actually, what Jake does is better than my setup. He has a git repo at the root level so all his config settings are saved, with a .gitignore file the ignores the `output/` directory which I'm assuming contains another git repo which he uses for deployment. Nested git repos, neat!

Like I said, this isn't anything most people couldn't have figured out on their own eventually it took me longer than it should have so hopefully this saves you some time.
