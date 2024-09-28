---
title: 2024-09-23 Weekly Update
date: 2024-09-23
description: TODO
tag: TODO
author: acv
---

## Finding My Latest Obsidian Files

I've been using Obsidian pretty deeply for about a year now. Recently, I got back into using the popular dataview plug-in for generating indexes of files for different projects. This of dataview as embedded SQL(ish) queries against your Obsidian file metadata.

Using dataview helped me discover a little blogging hack for these weekly updates. I now have a file with query for all the files I've modified over the past week. This makes it really easy for me to see what I've been thinking about without needing to keep any additional notes!

## New (To Me) Python Syntax

This week I came across two Python expressions I hadn't seen before though both are several years old. The first is a shorthand to add dictionaries, the second limits where you can TODO.

### Dictionary Addition

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

### Restricting Positional-Only Function Arguments

The second is a little more involved. The slash symbol `/` can be used to denote function variables that _must_ be positional-only vs keyword arguments.

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

I looked it up and I've been using Python since 2008 which would put me at about Python 2.5 as my first version (which seems right). It's pretty neat to watch the language continue to evolve and change after 16 years.

## My First LazyVim Configuration File

During this sabbatical I've been seriously trying to use Vim, more precisely NeoVim (even more precisely LazyVim) as my main text editor and IDE.

It's been a lot of fun but the learning curve has been _steep_. I finally started to get the hang of navigation after reading most of TODO as well as this cheatsheet from TODO. (As well as some evergreen note taking).

My big jump this week is that I finally got comfortable enough with my setup to create a configuration file. To LazyVim's credit the defaults are so sane that I really didn't have much motivation to change anything for months.

Previously, I had tried to adjust a setting but that in a Python LSP managed dependency which is inherently trickier. I got stuck but did learn about how config files are structured and evaluated.

Finally though I wanted to be able to see my dotfiles in neo-tree sidebar extension. This one was pretty easy set up and my first time writing Lua.

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

## Using Editable Modules in Jupyter Notebooks

This is one of those syntaxes I have to look up every year and just have to throw at the wall for a bit until it works.

```python
# Loads the `autoreload` extension
%load_ext autoreload

# Reload all modules imported with `%aimport` every time before executing the Python code typed. Same as `%autoreload 1`
%autoreload explicit

# Reload all modules (except those excluded by `%aimport`) every time before executing the Python code typed. Same as `%autoreload 2`
%autoreload all

# List modules which are to be automatically imported or not to be imported.
%aimport

# Import modules ‘foo’, ‘bar’ and mark them to be autoreloaded for `%autoreload 1`
%aimport foo, bar
```
