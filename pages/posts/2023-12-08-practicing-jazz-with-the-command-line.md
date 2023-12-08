---
title: Practicing Jazz with the Linux Command Line
description: Using linux command line tools for jazz ear training
author: acv
date: 2023-12-08
tag: blog, programming, artifical-intelligence, large-language-models, music, bash
---

With ChatGPT's help, I wrote a command line script that loops over a play-along jazz track starting at a random point each time. Starting at a random point forces me to develop my ear by finding my place in the chord changes, an important skill in Jazz.

## Some Background

Over the pandemic I started taking jazz piano lessons. Jazz is improvisational music meaning it's not written out ahead of time like classical music. Even though it's improvised there is a guiding structure, mostly in the form of preset chord changes. To keep their place in the music, Jazz musicians need to be able to hear these changes.

One of the ways to build this skill is to play along with backing audio tracks that simulate playing with a band. This is useful practice, but it's easy to just keep in time and play along without really listening and responding.

To develop your ear, you need randomness. So I decided to see if I could write a script to throw me some musical curve balls by starting the track in random places

## Using ChatGTP

Playing an audio file seemed like a good fit for a bash script. I'm sure there are lots of Python libraries I could have used but that felt like overkill.

I chose to use ChatGTP to help me out because bash's syntax is stable and well-documented. It's also an implementation detail and not something I'm not interested in building mastery in. Better to just outsource it to the LLM

## The Script

Here's the first pass from ChatGPT 3.5:

```bash
#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <music_file>"
  exit 1
fi

music_file="$1"

while true; do
  start_time=$(shuf -i 0-$(mpv --no-video --length "$music_file") -n 1)
  mpv --start="$start_time" "$music_file"
done
```

Like many technical questions I ask ChatGPT, the outline of this answer makes sense at first glance. And while it sets you on the right track, but there were a handful of bugs and the script as written didn't run. I essentially "paired" with ChatGPT for about 20 minutes, asking question about bugs, using alternate tools, and adding an escape key to kill the loop.

The final script looks like this, I'll break it down below.

```bash
#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <music_file>"
  exit 1
fi

music_file="$1"
track_length=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$music_file")
echo "Press q twice to quit"

while true; do
  start_time=$(gshuf -i 0-$(echo "$track_length" | cut -d. -f1) -n 1)
  mpv --start="$start_time" "$music_file" --no-audio-display

  read -t 1 -n 1 key
  if [ "$key" == "q" ]; then
    echo "Exiting..."
    break
  fi

done
```

First we check for a command line argument that we assume gives the location of the audio track. Then we use `ffprobe` to get the track length from the metadata, `gshuf` to generate the starting timestamp, and `mpv` to play the track. Finally it listens for `q` to quit the program.

This was a fun little evening project that yielded a useful practice tool as well as some more experience working with LLMs. In the future I might want up the complexity by also having it _stop_ at a random time - but in the meantime I need to practice more first.

