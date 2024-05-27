Title: Exploring Python's 'in' operator
Date: 2017-02-17
Category: Python
Tags: python
Slug: exploring-pythons-in-operator
Authors: Alex C. Viana
Status: draft

I spent 12 hours on a plane this week traveling between the East Coast and San Fransisco for the RSA conference. I've appreciated the way flying forces me to disconnect and spend a little bit more time on side projects such as this blog. On this particular flight picked up an idea I've been wanting to play with for a while, overloading Python's special object methods.

### Magic Methods

These are the object methods that begin with a double underscore such as `__init__` and are also known as "magic", "double-underscore", or "dunder" methods. These methods define a lot of the inherent behavior of Python objects, including the Python built-ins such as lists and dictionaries. These methods also define how objects interact with operators such as `+` (the `__add__` method) and `<=` (the `__leq__` operator).

Because so much of how Python works is wrapped up in these method I figured messing with them would be a good way to gain a deeper understanding of the language. So I started making little toy classes that implemented these methods in weird ways and everything was going as I expected until I got to the `__contains__` method. The `__contains__` method is the method used to check membership using the `in` operator. For example:

```
In [1]: 'foo' in ['foo', 'bar']
Out[1]: True

In [2]: ['foo', 'bar'].__contains__('foo')
Out[2]: True

In [3]: 1 in ['foo', 'bar']
Out[3]: False

In [4]: ['foo', 'bar'].__contains__(1)
Out[4]: False
```

In each case the `__contains__` method of Python's built-in list object is being called to evaluate the `in` operator. As it turns out this is an over simplification. I realized this when I took my first pass at building my own `__contains__` method and I did something a little weird:

```
class MyObject(object):

    def __contains__(self, y):
        return '__contains__'
```

This is a non-sense method, returning a string instead of a Boolean is unexpected behavior and doesn't make sense in the context of evaluating an object membership. But I just figured it would always evaluate to `False`. A little more exploration showed that there was something special about the `in` operator.

```
In [1]: mo = MyObject()

In [2]: mo.__contains__(1)
Out[2]: '__contains__'

In [3]: mo.__contains__(1) == True
Out[3]: False

In [4]: 1 in mo
Out[4]: True
```

I was expecting `1 in mo` to evaluate to something like `mo.__contains__(1) == True` which evaluates to `__contains__ == True` which should be `False`. Instead I'm got `True`, so there was something I didn't understand going on.

A little but of searching on StackOverflow led me to [this hint](http://stackoverflow.com/a/18753584/1216837):

> First, `in` always casts the result of `__contains__` to a bool

So this answers my question but doesn't really teach me much more about Python. This is the beauty about being on a plane. Normally, if I ran into something like this at work I would just take this answer at face value and moved on. But instead being stuck on a plane I had the time and incentive to go a little further down rabbit hole and read the cpython source.

### Reading the Source

I've only looked at the [cpython source code](https://github.com/python/cpython/tree/2.7) a few times before this. I've never written a line of C in my life but I've been programming long enough that I can kind of squint and make out the flow of most things.

It didn't take me too long to get oriented enough to find an example of how the `__contains__` object is [implemented](https://github.com/python/cpython/blob/2.7/Objects/listobject.c#L438) in an function called `list_contains` in the `listobject.c` file. This function iterates over the object contents calling the c [function](https://github.com/python/cpython/blob/6f0eb93183519024cb360162bdd81b9faec97ba6/Objects/object.c#L727) on each one.

The comment on the `PyObject_RichCompareBool` function reads:

> /* Perform a rich comparison with integer result.  This wraps
   PyObject_RichCompare(), returning -1 for error, 0 for false, 1 for true. */

OK so our casting as of everything as a boolean must happen in here. Digging in a little more this function drops down into the `PyObject_IsTrue` [function](https://github.com/python/cpython/blob/6f0eb93183519024cb360162bdd81b9faec97ba6/Objects/object.c#L1314). And here we finally have our answer. `PyObject_IsTrue` checks if the input is `True`, `False`, `None` and then a handful of sequence types. If none of these are true the function returns `1`, which cascades up to `__contains__` and is then interpreted as `True`.

