---
title: The Crystal Programming Language
date: 2022/09/06
description: A quick peek at at the Crystal programming language
tag: 100-words, dev, crystal
author: acv
---

I recently came across a Hacker News thread on the [Crystal programming language](https://crystal-lang.org/) that piqued my interest. Reading around, it seems to hit many of the language features I'm interested in.

From what I can gather, Crystal is an imperative, compiled, and statically-typed language with a syntax heavily influenced by Ruby. 
Types can often be inferred by the compiler resulting in a syntax more similar to dynamic languages while static typing leads to more efficient compiled code.

Here's a sample webserver from their documentation page:

```crystal
# A very basic HTTP server
require "http/server"

server = HTTP::Server.new do |context|
  context.response.content_type = "text/plain"
  context.response.print "Hello world, got #{context.request.path}!"
end

puts "Listening on http://127.0.0.1:8080"
server.listen(8080)
```

This syntax looks very clean to me. It's just different enough to Python to be interesting but not so much that I couldn't quickly be productive.

Maybe I'll try it out on one or two Advent of Code puzzles this year.

Thanks for reading, please enjoy this recording of a [Beethoven late string quartet (No. 12, Op. 127)](https://open.spotify.com/track/6Q8v1qifgM8zIyBbie5MM4?si=ccd8cd41b0cd4e32) by the LeSalle Quartet.