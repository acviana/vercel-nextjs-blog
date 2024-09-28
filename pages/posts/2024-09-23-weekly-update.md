---
title: TODO
date: TODO
description: TODO
tag: TODO
author: acv
---

## New (To Me) Python Syntax

I came across two new Python statements this week.

I looked it up and I've been using Python since version 2.5 (TODO).

The pipe operator can be used to combine to dictionaries `|` like this:

```python
>>> a = {"this":"that"}

>>> b = {"foo":"bar"}

>>> a+b
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'dict' and 'dict'

>>> a|b
{'this': 'that', 'foo': 'bar'}
```

This was introduced in version TODO, you can read the docs here. TODO. Previously you would have had to do something like TODO.

The second is a little more involved. The slash symbol `/` can be used to separate function variables that must be TODO.

```python
>>> def a(arg_1,/,arg_2):
...     print(arg_1, arg_2)
...

>>> a("this","that")
this that

>>> a(arg_1="this",arg_2="that")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: a() got some positional-only arguments passed as keyword arguments: 'arg_1'
```

## My First LazyVim Configuration File

During this sabbatical I've been seriously trying to use Vim, more precisely NeoVim (even more precisely LazyVim) as my main text editor and IDE.

It's been a lot of fun but the learning curve has been _steep_. I finally started to get the hang of navigation after reading most of TODO as well as this cheatsheet from TODO. (As well as some evergreen note taking).

My big jump this week is that I finally got comfortable enough with my setup to create a configuration file.

Here is my first example config in `~/.config/nvim/lua/plugins/neo-tree.lua`

```lua
return {
  "nvim-neo-tree/neo-tree.nvim",
  opts = {
    filesystem = {
      filtered_items = {
        visible = true,
        show_hidden_count = true,
        hide_dotfiles = false,
        hide_gitignored = true,
        hide_by_name = {
          -- '.git',
          -- '.DS_Store',
          -- 'thumbs.db',
        },
        never_show = {},
      },
    },
  },
}
```

## Finding My Latest Obsidian Files

I've been using Obsidian pretty deeply for about a year now. Recently, I got back into using the popular dataview plug-in for generating indexes of files for different projects. This of dataview as embedded SQL(ish) queries against your Obsidian file metadata.

Using dataview helped me discover a little blogging hack for these weekly updates. I now have a file with query for all the files I've modified over the past week. This makes it really easy for me to see what I've been thinking about without needing to keep any additional notes!
