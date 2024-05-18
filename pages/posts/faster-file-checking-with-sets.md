Title: Faster File Existence Testing with Sets
Date: 2014-01-19
Tags: python, code
Slug: faster-file-checking-with-sets
Author: Alex C. Viana
Category: Work

### It's Time to Think about Performance

Lately at work I've been thinking a lot about the performance of my code.  In the past most of my work fell into one of two performance categories: (roughly) overnight or (roughly) right now. In either case I didn't really care about performance. Either the task was going to take so long I had time to go do something else, in which case I didn't care if it took 1 hour or 10. Or it was going to be done fast enough I could immediately start iterating on the results, again in which case I didn't really care if was going to take 1 second or 10. I think this is indicative of the scientific computing mindset where you are both the programmer and the user: fast means fast enough for _you_. 

But recently my datasets have been getting bigger (which is awesome) which has forced me to be more careful about my programming. I'm routinely finding my scripts out-growing both of my performance "categories" and either taking several minutes to run or several days. Both scenarios leave _me_ waiting around, which is the real problem. While I always try, to the best of my abilities, to write high-quality code my time is more scarce and expensive than CPU time. This means that I optimize my time, not the CPU's. However, when I _do_ find myself waiting around for some code to run, it's time to roll up my sleeves and find some speedups.

The work I do is very I/O intensive involving lots of databases and data files. I/O is extremely [expensive](https://gist.github.com/hellerbarde/2843375) in terms of latency so reducing trips to the disk can yield sizable speedups. Here's an example I found today that includes an introduction to a handy (and I would argue underutilized) Python type called sets.

### The Slow Way

I was working on a project where I wanted to verify that all the files I had listed in a database actually existed in my file system [^1]. To do this I wrote a SQL query in SQLAlchemy to grab all the file names listed in the database. Then I looped over the the records returned by the query and used `os.path.exists` to test the existence of each file in the file system.

```python
%%timeit
for record in database_query:
    if os.path.exists(record.fits_file) == False:
        print 'Missing {}'.format(record.fits_file)
```

There were 3,096 iterations (records) in this loop and the IPython `%%timeit` cell magic gave the following result:

```
1 loops, best of 3: 103 s per loop
```

This is a bit too long of a wait for me. It's long enough for me to get distracted by Facebook or maybe writing a blog post. I kid but task switching _does_ have a real [mental overhead](http://www.codinghorror.com/blog/2006/09/the-multi-tasking-myth.html). I'm not advocating optimizing every task that makes you sit around for a few minutes, but in this case the solution was trivial and applicable to lots of my projects.

### The Fast Way

It occurred to me that I was making 3,096 separate trips to the disk. It's my understanding that there is some overhead for each disk read so I thought maybe it would be faster to read everything I needed at once and then work with the result in memory. To do this I used `glob` and create a list of all the files in my file system I wanted to check my query against. This gave me all the data I wanted in memory from one SQL query and one `glob` command. That reduced the problem to a membership testing problem and Python has a great built-in type for this, [sets](http://docs.python.org/2/tutorial/datastructures.html#sets). Sets are unordered [hash tables](https://en.wikipedia.org/wiki/Hash_table) which means their average performance for a lookup operation is the holy grail of speed, `O(1)`. Incorporating all this into my code looks like this:

```python
%%timeit
file_set = set(glob.glob(file_search_string))
for record in database_query:
    if record.fits_file in file_set == False:
        print 'Missing {}'.format(record.fits_file)
```

It turns out I was right, this is almost a full order of magnitude faster than my original code.

```
1 loops, best of 3: 10.6 s per loop
```

### Caveats

So I think the principles behind this speed up are solid but, as always, your mileage my vary and there are some caveats I can think of.

First of all, the file system I am searching is a network file system that I'm connecting to over VPN, this makes each disk read exceptionally expensive. Secondly, the `glob` operation is very expensive, almost all the run time is spent in that step. So if you're only checking a few files it might be faster to just look them up one-by-one than to use wildcards to scan a file tree. I'm not sure where the tipping point is, but it's certainly worthwhile if you're checking every file like I am.

I've just starting thinking about these topics so if I missed something in my code or my explanation I would love to hear about it the comments.

[^1]: If you're wondering why I want to do this, yes, it's because I screwed up and put the wrong files in the database.