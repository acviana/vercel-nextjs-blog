---
title: Git Surgery
date: 2025-04-29
description: Rebuilding and checking a git branch
tag: programming, git
author: acv
---

I recently had to perform some "git surgery" to rebuild the `main` branch of a repository I was working on. The goal was to recreate the branch with the exact same code but a corrected commit history. This gave me the opportunity to use Git in a few ways I hadn’t before. I took extensive notes to convince myself—and others—that the process worked, which became the basis for this post.

## Context

The short backstory is that we had a few commits in the project trunk that needed to be removed. These problematic commits were squashed patches of diffs that had _also_ been correctly merged earlier as unsquashed merge commits. As a result, the branch technically had all the right code, but nearly all the changes were attributed to just two squashed commits. That meant the `git log` was technically accurate, but `git blame` became almost useless.

With a combination of branching, merging, and cherry-picking, I was able to create what I believed was a clean, corrected branch. But how do you _verify_ that?

## Comparing Branch Heads

The first thing I wanted to check was that the content at the branch tips was identical. Normally, when comparing files, I might use `diff` or compare `md5` hashes. But since we’re working within Git, we can compare the branches directly:

```bash
# Check the diff against main—there should be no changes:
> git diff --stat develop-new..main

# Also check against a previous commit on main to confirm that a diff *would* show something
> git diff --stat develop-new..main~1
```

This obviously isn’t a new command, but previously I’d only used `git diff` on individual files or within a single branch.

## Comparing the Git Log

This part was a bit trickier. I needed to confirm that the Git history looked correct. The first step was to manually inspect the log:

```bash
# The graph should look clean and include all expected commits
> git log --graph --oneline --pretty=format:"%h %ad %s" --date=short
```

I’m not sure there’s a more analytical way to verify this than just reading through and making sure the history makes sense. But there _is_ a way to be more precise when checking whether the commits we intended to exclude actually stayed out:

```bash
# These commits should only exist on main—not on the new branch
> git branch --contains 48d14a0
> git branch --contains 4915a48
```

These commands scan the entire commit tree and list which branches contain the specified commits, helping confirm they weren’t accidentally included in the clean branch.

## Git Blame

After confirming that the file contents were identical and the unwanted commits were removed, the last check was to ensure the blame history was corrected. I picked a random file that I knew should have a large number of different commits. As with the `git log`, you can inspect this visually—but here, there's also a more quantitative approach:

```bash
# Count the unique commits that appear in the file's blame output
> git blame .github/workflows/publish-image.yml | awk '{print $1}' | sort | uniq -c | sort -nr

> git blame main -- .github/workflows/publish-image.yml | awk '{print $1}' | sort | uniq -c | sort -nr
```

This counts how many lines are attributed to each commit. The cleaned-up branch should show a more diverse history—exactly what we were aiming for.

At this point, I was finally convinced we could replace the `main` branch with this new corrected one.

Thanks for reading, if you enjoyed this article you should check out this post which touches on [cleaning git history](/posts/2024-09-30-weekly-update.md).
