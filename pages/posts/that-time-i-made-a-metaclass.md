Title: That Time I Made a Metaclass
Date: 2013-12-04
Tags: code, python, database
Slug: that-time-i-made-a-metaclass
Author: Alex C. Viana
Category: Work

> "If you don't know what a metaclass is you don't need to use one."  
> - David Beazley

I was shooting some messages back and forth this morning with some current and former coworkers on Twitter on the topic of Python Metaclasses. One coworker said metaclasses was something he'd never really got around to using. I mentioned that I had used them exactly once to generate database Object Relational Models (ORMs). My second coworker said that was a common use case and that it would be nice to see an example. Since a tech blog is a shining example of a hammer searching for a nail I immediately got to work on this post.

### Some Background

I took David Beazley's Python Master class in 2009 (?) and I still remembered the quote from the start of this post, so for years I didn't worry about metaclasses because I knew I didn't need them. Finally though, I did need them.

One of my favorite Python modules, despite its near vertical learning curve, is the [SQLAlchemy](http://www.sqlalchemy.org/) database toolkit. One of the features in this module is a very nice Object Relational Mapper (ORM) which maps database tables to Python classes. The ORM can be used in a number of ways and I prefer to use what's called the [Declarative Base](http://docs.sqlalchemy.org/en/rel_0_9/orm/extensions/declarative.html) syntax. The basic idea is that you create a parent class called `Base` that contains information about your database connection and metadata. All your ORM classes are then child classes of `Base` and you use them to work with your tables. Here is a basic example:

```python
class MyTable(Base):
	"""Defines a SQLAlchemy ORM"""

	def __init__(self, init_dict):
		self.__dict__.update(init_dict)

	__tablename__ = 'my_table'
	id = Column(Integer, primary_key=True, index=True)
	foo1 = Column(String(50))
	foo2 = Column(String(50))
	foo3 = Column(String(50))
	...
```

You could imagine an application that would need to dynamically define several of these tables, but you don't have to because I'm about to tell you about one. 

### My Problem

The most common image file format in astronomy is called [FITS](http://en.wikipedia.org/wiki/FITS). FITS files have multiple layers (called "extensions") each with it's own set of metadata (called "headers"). For one of my projects we have over a million FITS files and we index these files with a MySQL database that maps the header keywords in the extensions to fields in SQL tables. We have about a dozen different file types, each with a handful of extensions, and each of those has 10s of header keywords. If you spelled out every ORM explicitly with a class and an attribute for every column like we do above we would literally have thousands of rows of ORM definitions. I'm a big proponent of the DRY principle (Don't Repeat Yourself) for the sake of readability and maintainability so this was a pretty big red flag in my opinion. 

### My Solution

Notice that we don't need to dynamically create many instances of the same class. Instead we need to dynamically create many class definitions. This is the specific need the drove me to use a metaclass.I ended up with something like the code snippet below. 

```python
def orm_factory(class_name):
	"""Creates SQLA ORM Classes."""
	def __init__(self, init_dict):
		self.__dict__.update(init_dict)

	class_attributes_dict = {}
	class_attributes_dict['__init__'] = __init__
	class_attributes_dict['id'] = Column(Integer, primary_key=True, index=True)
	class_attributes_dict['__tablename__'] = class_name.lower()s
	class_attributes_dict.__update__(get_column_defs(class_name))

	return type(class_name.upper(), (Base,), class_attributes_dict)
```
You could then call `orm_factory` like this:

```python
Class1 = orm_factory('Class1')
Class2 = orm_factory('Class2')
Class3 = orm_factory('Class3')
...
```

And there you have your classes, dynamically created using metaclasses.

### Solution Breakdown

Let's walk through this. First, let's look at the last line for the `orm_factory` function. This is maybe the "craziest" part of the whole function. That's because `type` is actually a metaclass constructor. That's right, the thing that tells you `type(1)` is `int` is also used as a metaclass constructor to maintain backward comparability [^1]. (If you want to tickle your brain check the type of type). To really wrap your head around metaclasses and type check out Jake VanderPlas's [excellent post](http://jakevdp.github.io/blog/2012/12/01/a-primer-on-python-metaclasses/) on the subject. 

The basic idea is you pass `type` the string name you would to give the constructed class, a tuple of parent classes, and a dictionary of any other attributes for the class. Looking up the code block you'll see that I create a dictionary for these attributes called `class_attribute_dict`. 

Notice I'm doing a little bit of magic by creating a `get_column_defs()` function. This function will dynamically add the appropriate column definitions, for example by pulling them from the FITS headers. The implementation of this function isn't import to the topic of this post, what matters is that these is some dynamic aspect to the column definition (and hence the class creation) that necessitates the use of a metaclass. 

Also, notice that the attributes in  `class_attribute_dict` includes an `__init__` method defined as a function. This is one of those weird moments in python when you define a function _inside_ of another function. We do this because we're never going to use the `__init__` function outside of the `orm_factory` function it's nested in so there is no reason to globally scope it. In this case we define `__init__` just like it was a method with a reference to `self` and everything. Even though there is nothing special about this function it will still take on the properties of a method after it's passed to type. I personally think is pretty cool and give you some insight into how classes are built.

So that's my example of metaclasses. It took me a couple of long days to figure this all out but I learned a lot about the inner workings of Python in the process. It's not so hard once you see it, but it's also not something I anticipate having to do again soon.

[^1]: I swear I read this somewhere but I'm still hunting for the source.