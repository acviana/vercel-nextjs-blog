Title: Working with NumPy Arrays and SQL
Date: 2014-04-07
Tags: python, code, psf
Slug: numpy-arrays-and-sql
Author: Alex C. Viana
Category: Work

Lately I've been doing a lot (millions) of calculations involving small NumPy arrays of HST PSFs. Naturally, I wanted to save the output of these calculations to for later analysis. I put all the results in a MySQL database so I could easily select subsets of the data for future work (by filter, image, date, etc.). However, sometimes the outputs of these calculations are arrays themselves. This left me searching for a good way to save these NumPy arrays to a SQL database. 

Before I dive into this it's worth noting that there are non-SQL storage options that are specifically designed for use cases like this such as [PyTables](http://www.pytables.org/moin) or [HDF5](http://en.wikipedia.org/wiki/Hierarchical_Data_Format). But, my project was already pretty tightly integrated with SQLAlchemy and I wasn't concerned with having readable, hierarchical, or queryable array information, which are the strengths of these other storage systems as I understand them. The queries I'm going to write are going to be constructed on other fields and the data is only going to analyzed once it had been read back in as a Numpy array in Python. So, all I really needed was a way to go between NumPy and some SQL data type.  

### Starting with Strings

So my first thought was to just flatten the array into a string and then write that to the database as a `VARCHAR` field. So something like this:

```python
a = np.array([[1,2],[3,4]])
``` 

Which gives us:

```python
[[1 2]
 [3 4]]
```

And then transform it into something like this:

```python
'1,2,3,4'
```

And then I would just code up some logic in Python that would know to convert it back into a 2x2 array. The problem is then you start getting really awkward obtuse Python like this:

```python
string_array = str(numpy_array.flatten().tolist())[1:-1]
```

And on top of that you have to convince yourself that you are always reading and writing your strings in the correct order in terms of left/right and up/down, which means writing more tests. This quickly started to not feel right to me, especially if the end result was a human-readable SQL field that was never going to be read by a human while in the database.

### Moving to Bytecode

After some digging and things I switched to bytecode. This isn't human readable (which is fine) but it easily and consistently goes in and out of numpy arrays with built-in methods and sits nicely in a SQL `BLOB` field. Writing looks like this:

```python
byte_array = numpy_array.tostring()
```
Which gives me:

```python
\x01\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x03\x00\x00\x00\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00'
```

And converting back to numpy is just as easy:

```python
numpy_array = numpy.fromstring(byte_array)
```

Ta-Da! This does what I wanted and in my opinion has that intangible "pythonic" feel to it. The default NumPy datatype is `numpy.float64` but you can specify others with the `dtype` parameter. While this solution met my needs that are probably many other ways to accomplish this, feel free to tell me about them in the comments.

