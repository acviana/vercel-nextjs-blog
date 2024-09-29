---
title: 2024-09-23 Weekly Update
date: 2024-09-23
description: TODO
tag: python, programming, obsidian, vim, weekly-updates
author: acv
---

I didn't get an update out last week because I've been heads down on some projects. But, practicing evergreen note taking has meant that I now have notes that I can easily turn into weekly updates.

## Easier Blogging with Obsidian's Dataview

This dataview query allows you to see all the Obsidian files you've edited in the last week.

```sql
LIST
WHERE file.mtime >= date(today) - dur(1 week)
```

I've been using Obsidian pretty deeply for about a year now. I finally have so much content that organizing it has become challenging so I've started using the popular dataview TODO:link plug-in for generating indexes of files for different projects.

I now have a query for all the files I've modified over the past week without needing to keep any additional notes! This turned into a little blogging hack for these weekly updates. I

## New (To Me) Python Syntax

This week I came across two Python expressions I hadn't seen before, though both are several years old. The first is a shorthand to add dictionaries, the second is a way of marking positional-only arguments in a function.

### Dictionary Addition

The pipe operator can be used to combine to dictionaries `|` like this:

```python
>>> a = {"this": "that"}

>>> b = {"foo": "bar"}

>>> # Regular addition with + doesn't work
... a + b
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'dict' and 'dict'

>>> # Use | instead
... a | b
{'this': 'that', 'foo': 'bar'}
```

This was introduced in [PEP-584 - Add Union Operators to dict](https://peps.python.org/pep-0584/) and released in [Python 3.9](https://docs.python.org/3/whatsnew/3.9.html). Previously you would have had to do something like `{**a, **b}` (assuming you don't want to modify either dictionary).

### Restricting Positional-Only Function Arguments

The second things I learned is that you can use the slash symbol `/` to denote function variables that _must_ be positional-only as opposed to keyword arguments. Here's an example.

```python
>>> def a(arg_1, /, arg_2):
...     print(arg_1, arg_2)
...

>>> a("this", "that")
this that

>>> # This is fine
... a("this", arg_2="that")
this that

>>> # This is not
... a(arg_1="this", arg_2="that")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: a() got some positional-only arguments passed as keyword arguments: 'arg_1'
```

This was introduced in [Python 3.8](https://docs.python.org/3/whatsnew/3.8.html#positional-only-parameter) back in 2009 along with the "walrus" operator (`:=`).

I looked it up and I've been using Python since 2008 which would put me at about Python 2.5 as my first version (which seems right). It's pretty neat to watch the language continue to evolve and change after 16 years, even if I am late to the party sometimes.

## My First LazyVim Configuration File

During this sabbatical I've been seriously trying to use Vim, more precisely NeoVim (even more precisely LazyVim) as my main text editor and IDE. This week I finally added my first configuration file.

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

It's been a lot of fun but the learning curve has been _steep_. I finally started to get the hang of navigation after reading most of TODO as well as this cheatsheet from TODO. (As well as some evergreen note taking).

My big jump this week is that I finally got comfortable enough with my setup to create a configuration file. To LazyVim's credit the defaults are so sane that I really didn't have much motivation to change anything for months.

Previously, I had tried to adjust a setting but that in a Python LSP managed dependency which is inherently trickier. I got stuck but did learn about how config files are structured and evaluated.

Finally though I wanted to be able to see my dotfiles in neo-tree sidebar extension. This one was pretty easy set up and my first time writing Lua.

Here is my first example config in `~/.config/nvim/lua/plugins/neo-tree.lua`

## Using Editable Modules in Jupyter Notebooks

A development pattern I often find myself using is editing a Python module while also importing and using that module in an Jupyter notebook. Here's how you do that.

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

In part, this comes from by background bouncing back and forth between data science and data engineering work. So I both appreciate the utility of notebooks but also dislike the coding habits they encourage. So I'll either find myself taking notebook and iteratively moving to a module, or using a notebook to interact with the output of a module I've developed.

In either case, to do this you need to tell the Jupyter server to refresh the module that it's loaded into memory. If you're just doing this once you can just restart the server. But if you're doing it constantly you can set a flag to force module reloading. This is one of those syntaxes I have to look up every year and just have to throw at the wall for a bit until it works.
