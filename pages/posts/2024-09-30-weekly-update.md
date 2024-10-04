---
title: 2024-09-30 Weekly Update - TODO
date: 2024-09-30
description: TODO
tag: TODO
author: acv
---

### Removing Sensitive Data From Git

The other day I was working too fast trying to live-fix a bug on a call with a consulting client and I ended up accidentally committing an API key to our repo and pushing the change. Fortunately, we're the only two people who have access to the repo, but still I wanted to properly scrub it from the repo.

Since the last time I've had to do this the recommended tool has gone from `git-filter-branch` t0 `git-filter-repo`. I had a pretty easy time finding suggestions on how to delete a word/file from the history but had a harder time finding a command to _verify_ that the text was removed.

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

### Odds and Ends

I updated my blog dependencies including bumping the blog framework to Nextra v3.0. TODO:PR This required massaging some configuration files but overall was not too bad. Most importantly, it seems to have fixed a bug where some new posts were not being added to the main post feed.

### New Tools I'm using

Over the course of this sabbatical I've been exploring some new tooling and have changed my preferences for a surprising number of tools.

| Category        | Old         | New        | Notes                               |
| --------------- | ----------- | ---------- | ----------------------------------- |
| Terminal        | iTerm2      | Kitty      | GPU acceleration for LazyVim        |
| Terminal Prompt | Tide        | None       | Never set it up and didn't miss it  |
| IDE             | SublimeText | LazyVim    | Trying to live more in the terminal |
| Theme           | Dracula     | TokyoNight | Time for an aesthetic change        |
| Git             | CLI         | LazyGit    | Great UI and terminal-based         |

I've also really updated my Python tool chain. I've dropped Poetry in favor of Astral's uv project and will probably soon do the same with Pyenv.
