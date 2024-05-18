Title: The Joy of "Screen"
Date: 2013-11-24
Tags: devops
Slug: the-joy-of-screen
Author: Alex C. Viana
Category: Work

Because I frequently work remotely as well as run long processes I recently gave up my desktop system at work in exchange for a laptop and a couple of virtual machines. I use the laptop for day-to-day work but offload longer computations or automated processes to my VMs. But before I could fully take advantage of this setup  I had to solve a new problem I didn't have to worry about with my desktop, how do I run a process remotely without maintaining an open SSH connection? 

I went to our IT department with this question and my favorite sys admin[^1] turned me onto the joy of [Screen](http://en.wikipedia.org/wiki/GNU_Screen). Since then I've been spreading the word around my branch about this awesome little tool. Screen is a robust little piece of software that allows you to manage your shell session in a variety of ways. Screen can do a lot and it's worth taking the time to read through some tutorials but I'll explain my basic workflow in this post to start a process on a remote host and leave it running after closing the SSH connection. 

First you SSH into you remote machine as normal and then type

    $ screen -ls

This is going to return a list of all the Screen[^2] sessions you have active on your machine. If this is your first time using screen you should see something like `No Sockets found in ...`. Great, now we're going to start up our first Screen session, I'm going to call this one `making_science`, so then I type:

    $ screen -S making_science

And then you'll get a new command line prompt, you are now "in" your Screen session, or as Screen calls it "attached". If you run `screen -ls` again you'll now get something like this:

	there is a screen on:
	        48625.making_science    (Attached)
	1 Socket in blah-blah

Now go ahead and launch your long script, I usually run it in the background by appending script with an ampersand (`&`) like this:

    $ make_some_science.py &

And now we finally get to the good part, we're going to detach the session without killing the process, even if you close the SSH connection. You can do this either by typing `ctrl + a` then `:detach`,  or if you don't have those key bindings, `screen -D`. Anytime you want to check back in one it just reattach your screen session on the same host with `screen -r` and everything will be just as you left it, even your command history. When you're finally done with your session you can just kill it with `exit` and it'll be removed from your list of screens.

Lastly, if like me you're suspicious by nature, you're going to want to check to make sure your process is _actualy_ still running so you don't die a little inside when you come back to work the next morning expecting a pile of fresh data and instead get a stack trace. There are a variety of tools that allow you to do this, the two command line solutions I use are `top` [^3] and `ps`. Either one will list the processed currently running on your machine. I usually start up a process with screen, detach the session, confirm that the process is still running with `top` or `ps` and _then_ close the SSH connection. If I'm feeling extra careful I'll check the log files from another host after closing th SSH to make sure things are still humming along. 

And that's it. Go ask your IT department very nicely if they can build you a VM and then unleash your codebase while you go about your life. Horray! 

[^1]: If you're going to do any serious DevOps work make friends with you IT staff. Ask them for help nicely and thank them profusely. Buy them beers. A good relationship with your sys admins in invaluable to getting sh*t done. This really shouldn't even be a footnote.

[^2]: Screen is inconsistently capitalized in the websites and blogs I saw. I decided to follow the convention in the GNU [docs](https://www.gnu.org/software/screen/) and treat it as a proper noun. I bring this up here because this is the first place in this post where Screen isn't capitalized because it starts a sentence. I also bring it up because I'm a nerd.

[^3]: Depending on your version of `top` you can type `u` on the main screen and then your username to view all the processes being run by your user name. Given that `top` shows all the system processes this helps remove all the ones you don't care about.




