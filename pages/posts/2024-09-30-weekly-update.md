---
title: 2024-09-30 Weekly Update - TODO
date: 2024-09-30
description: TODO
tag: TODO
author: acv
---

### Removing Sensitive Data From Git

The other day I was working with a consulting client trying to live-fix a bug on a call. I was going too fast and I ended up accidentally committing an API key to our repo and pushing the change. Fortunately, we're the only two people who have access to the repo, but I still wanted to properly scrub it from the repo.

I haven't had to scrub a git history for a private key in a few years. Since then, the recommended tool has gone from `git-filter-branch` to `git-filter-repo` (TODO: Docs). I had a pretty easy time finding suggestions on how to delete a word/file from the history but I had a harder time finding a command to _verify_ that the text was removed.

I've captured both in here and subbed `<REDACTED>` for the sensitive text.

```bash
# Check that the API key is in fact in the repo history
bash-3.2$ git log -S <REDACTED> main --name-only --pretty=format: | sort -u
template_notebook.ipynb

# Replace all references to the API key in all commits to ADD_API_KEY
bash-3.2$ uv run git-filter-repo --force --replace-text <(echo "<REDACTED>==>ADD_API_KEY")
Parsed 22 commits
New history written in 0.03 seconds; now repacking/cleaning...
Repacking your repo and cleaning out old unneeded objects
HEAD is now at 27440ad Replaced unmaintained pdfminer with pdfminer.six (#11)
Enumerating objects: 76, done.
Counting objects: 100% (76/76), done.
Delta compression using up to 10 threads
Compressing objects: 100% (35/35), done.
Writing objects: 100% (76/76), done.
Total 76 (delta 42), reused 69 (delta 39), pack-reused 0 (from 0)
Completely finished after 0.10 seconds.

# Check that the API references are gone
bash-3.2$ git log -S "<REDACTED>" main --name-only --pretty=format: | sort -u

# Confirm that they have been replaced by ADD_API_KEY
bash-3.2$ git log -S "ADD_API_KEY" main --name-only --pretty=format: | sort -u
template_notebook.ipynb

# Always scared when I run this one ...
bash-3.2$ git push origin -f main:main
Enumerating objects: 76, done.
Counting objects: 100% (76/76), done.
Delta compression using up to 10 threads
Compressing objects: 100% (32/32), done.
Writing objects: 100% (76/76), 90.13 KiB | 90.13 MiB/s, done.
Total 76 (delta 42), reused 76 (delta 42), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (42/42), done.
To <REDACTED>
 + 4da8e1f...27440ad main -> main (forced update)
```

Hopefully this is not something I need to do for a few more years but I figured it was worth capturing in some notes.

### Odds and Ends

**Blog Version Update:** I updated my blog dependencies including bumping the blog framework to Nextra v3.0. TODO:PR This required massaging some configuration files but overall was not too bad. Most importantly, it seems to have fixed a bug where some new posts were not being added to the main post feed.

### New Tools I'm using

Over the course of this sabbatical I've been exploring some new tooling. There's a lot of reasons for this  including doing more hands-on work and setting up a new laptop. In the process I've changed my preferences for a surprising number of tools. I threw the main ones in a table below:

| Category        | Old         | New        | Notes                               |
| --------------- | ----------- | ---------- | ----------------------------------- |
| Terminal        | iTerm2      | Kitty      | GPU acceleration for LazyVim        |
| Terminal Prompt | Tide        | None       | Never set it up and didn't miss it  |
| IDE             | SublimeText | LazyVim    | Trying to live more in the terminal |
| Theme           | Dracula     | TokyoNight | Time for an aesthetic change        |
| Git             | CLI         | LazyGit    | Great UI and terminal-based         |
| Python Projects | Poetry      | Astral uv  | The solution we've been waiting for |

Some themes here are working more in the terminal with Kitty and LazyVim. I still love the Fish shell but went for a more stripped back prompt over my previous powerline9000 inspired configuration. Lastly, like everyone else I've been joining the Astral bandwagon and moving my workflow over to uv from Poetry (and pipenv before that). I suspect I'll migrate off of pyenv in a few weeks as I get more comfortable with uv.

Updates like these are one of the reasons that I don't backup my dotfiles. First of all, I don't tend to use tool that require a ton of configuration out of the box. But more to the point, having to configure each of my machines separately ensures helps me discover new tools, drop tools that I don't miss, and makes sure I really understand my tools well enough to troubleshoot them.
