---
title:  Hello, Manjaro!
date: 2023/07/12
description: First steps with Arch
tag: linux, arch, manjaro, dev
author: acv
---

# Hello, Manjaro!!

Hello from a fresh Manjaro Linux install on my 2014 Macbook Air 6,2! 

This is my first time running an Arch-based Linux distro and my first time running Linux on Apple hardware. I wrote out a few thoughts on picking Manjaro and getting everything setup.

But first, let's talk about dorking around with Linux distros while everyone else is playing with AI.

## Under Pressure

If you're even moderately connected to the more "online" parts of the tech world, it's hard not to feel pressure to constantly be doing more.
Pressure to build a public persona, pressure to ship, pressure to be up-to-date, pressure to get the next job, pressure to join "the discourse", to monetize your side hustle, to turn your project into a company. 

I was thinking about this pressure as I was an hour into sitting cross-legged on the floor tethered to my router with a 3-foot Ethernet cable trying to set up a Wi-Fi drivers on an 8 year-old machine when I have **four** other perfectly good laptops around the house. 
As I finally got the Wi-Fi icon to light up I couldn't help thinking ...

> I did it! ... But should I have?

The rest of the tech world is exploring a brave new world of AI and LLMs. 
I've got work I could be doing for my job or math I could be studying to further my career. 
Instead, I'm losing the feeling in my legs while tweaking Linux settings _and then_ doubling down on that decision by blogging about it for the 2 (maybe) people who read this blog.

My point is that playing with Linux is not what productivity culture tells me I should be doing.
But, I think it's important to learn to let go of that. 
This is something [I've written about before](https://vercel-nextjs-blog-acviana.vercel.app/posts/2023-01-01-i-love-computers), but sometimes, it's nice just to fiddle for the sake of fiddling. 
To write for the sake of writing.
To practice both as a craft, or if nothing else just so the ideas will stop rattling around in my head. 

So let's talk about messing around with Linux, AI will still be there when we get back.

## Going Beyond Ubuntu

The machine I set this up on is an old MacBook Air that hasn't been used in a few years. 
It's about 8 years old at this point, which is well-past the hardware cutoff for the latest MacOS updates. 
But, with the right OS, a quardcore i5 CPU and 4 GB of RAM is more than enough for the programming and websurfing I do. 
So I decided to give this machine a second life as Linux box, but which flavor?

Ubuntu was my first choice. I have been running it for 10+ years across two older IMB/Lenovo laptops so I was comfortable with it and I knew it met my needs. 
At first I was worried it wouldn't work well on Apple hardware, but from what I've read that doesn't seem to be an issue.
And in case it isn't obvious from the MacBook model date, this is still an Intel-based CPU. 
So I'm not worried about compiling against the new generation of Apple CPUs, just general hardware support.

But, as I mentioned, this machine only has 4 GB of memory. 
That _barely_ meets the required minimums for my standard Ubuntu + Gnome desktop setup. 
I could address this by running a lighter-weight Ubuntu distro like Xubuntu or Kubuntu. 
Or, if I wanted to stay in the Debian family, I got an old laptop up and running for my dad on ZornOS last year.

But, none of those felt like compelling options to me. 
I was doing this purely for fun and after 10 years on Ubuntu I wanted to try something completely new.

## Settling on Manjaro and Arch
  
When I first started running Linux on my own machines Ubuntu felt like the front-runner for folks who just wanted something FOSS "that just worked" in a desktop environment. 
But as I was looking around now in 2023 it seemed like there were a lot more well-supported options that had taken the same "batteries included" approach. 
On distro that I had never heard of seemed to be on everyone's list: Manjaro.

Manjaro (man-JAR-o), is a popular and relatively user-friendly distro based on Arch Linux. 
This immediately caught my eye because Arch Linux is a notoriously difficult distro to set up. 
It comes with essentially nothing included, not even a desktop, so you start from a command line and you have to really know your way around Linux to set it up. 
The payoff is a high level of customization. 
Manjaro tries to bridge that gap by providing a user-friendly Arch setup.

Honestly, they had me at notoriously difficult. I decided to give Manjaro a shot.

## First Steps with Manjaro

All-in-all this was a pretty easy system to get set up.
The one major exception, as I mentioned in the beginning of the post, was getting the Wi-Fi drivers to work. 
But that likely has nothing to do with Manjaro or Arch; Apple hardware is proprietary. 
As I understand it, that means that they do not release open-source drivers for some of their hardware such as the webcam and, crucially, their wireless network card.

The solution to this is install the OS with a wired connection and then install the drivers needed to support the Broadcom network hardware on my machine. Fortunately, this is a well-documented problem on the Manjaro / Arch message boards and after about 90 minutes I had a working Wi-Fi connection. 

The steps are well-documented elsewhere but just to give you sense of the scale of solution I had to:

1. Figure out how to read the system configuration with `inxi`.
2. Decide I wanted to go with the boardcom-dkms driver (`broadcom-wl-dkms` and `wpa_supplicanat`).
3. Learn how to use pacman (the Arch package manager).
4. Find my kernal version and install the corresponding linux header files.
5. Use `ip link set` to enable the network interface.

And then it worked! So not terrible, but definitely something you need at least intermediate Linux knowledge to troubleshoot. And this is an issue if you're running this on a Mac.

All-in-all a fun weekend project and a decent excuse to crank out a blog post. Thanks for reading!
