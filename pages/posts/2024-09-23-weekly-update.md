---
title: 2024-09-23 Weekly Update
date: 2024-09-23
description: TODO
tag: python, programming, obsidian, vim, weekly-updates
author: acv
---

I didn't get an update out last week because I've been heads down on some projects. But, more time hands-on coding and practicing evergreen note taking means that I now have ready-to-go content for weekly updates.

## Easier Blogging with Obsidian's Dataview

I've been using Obsidian pretty deeply for about a year now and I finally have so much content that organizing it has become challenging. To help with that I've started using the popular [dataview plug-in](https://blacksmithgu.github.io/obsidian-dataview/) to generate indexes of files for different projects.

Obsidian files are fundamentally and transparently markdown files and dataview lets you query your file metadata using a SQL-ish dialect. For example, this dataview query I figured out this week allows you to see all the Obsidian files you've edited in the last week.

```sql
LIST
WHERE file.mtime >= date(today) - dur(1 week)
```

This is useful because looking at all the files I modified in a week is great blogging hack for these weekly updates.

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

My big jump this week is that I finally got comfortable enough with my setup to create a configuration file. To LazyVim's credit, the defaults are so sane that I really didn't have much motivation to change anything for months.

Configuration files in LazyVim are fundamentally Lua functions that return maps with the configuration settings. LazyVim's functionality is built around an ecosystem of plugins so to configure your settings you need to know 1) which plugin is controlling the setting you want to configure and then 2) the configuration schema for that particular package.

This is all kinda of steep but really not that bad once you get the hang of it. For example here is the config file I wrote to to display hidden dot files in neotree, the sidebar tree view plugin.

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

A somewhat eccentric development pattern I often find myself using is editing a Python module while also importing and using that same module in an Jupyter notebook.

To me, this allows you to have the data exploration tools of a notebook along with the best-practice and tooling of a normal Python project. So as I'm working on a project I might start migrating functions from my notebook into my module so I'm just working at the "end" of a growing pipeline of transformations.

To do this you need to tell the Jupyter server to refresh the already loaded module. If you're just doing this once you can just restart the notebook server. But if you're doing it constantly you can set a flag to force module reloading. This is one of those syntaxes I have to look up every year and just have to throw at the wall for a bit until it works so I finally decided to take some notes.

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

I think this development pattern should manage to upset everyone; data scientists won't want the hassle of pushing data down to a module and developers won't want to use a notebook environment. But to me, it's the best of both worlds.
