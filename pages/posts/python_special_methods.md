Title: Special Methods in Python
Date: 2017-03-15
Category: Python
Tags: python, presentations
Slug: special-methods-in-python
Authors: Alex C. Viana

_This post is intended to accompany a presentation I gave to the [Baltimore Python Meetup](https://www.meetup.com/baltimore-python/events/238058777/) on Wednesday, March 15th 2017._

_This post assumes some familiarity with object-oriented programming as it relates to classes and inheritance in Python._

The purpose of this post is to explore Python's [special methods](https://docs.python.org/3/reference/datamodel.html#special-method-names), also called "magic", "built-in", "double underscore", or "dunder" methods. A common example is the `__init__` method. These methods are considered special because they are referenced by Python to determine class behavior. Note that the double underscore notation is just a naming convention for indicating which methods Python considers special. Adding a double underscore to any other method (e.g. `__foo__`) doesn't give it any special properties.

### Special Methods

To explore how these methods work we're going to pretend we're building a Scrabble-type game. A natural object for this type of project would be an object that encapsulates a word and it's score. Let's start with a super basic class:

	In [1]: class ScrabbleWord():
	    ...:     pass
	    ...:
	In [2]: my_word = ScrabbleWord()
	In [3]: my_word.word = 'cat'
	In [4]: my_word.score = 5

We start with an "empty" class, and manually assigned it two attributes, a word, and a score which I calculated by consulting a table of scrabble letter values. Using Python's `dir()` function we can inspect the attributes and methods on the `my_word` object.

	In [1]: dir(my_word)
	Out[1]: ['__class__', '__delattr__', '__dict__', '__doc__',
	 '__format__', '__getattribute__', '__hash__', '__init__',
	 '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__',
	 '__setattr__', '__sizeof__', '__str__', '__subclasshook__',
	 '__weakref__', 'score', 'word']

At the very end, we can see the `score` and `word` attributed I added as well as about a dozen other methods and attributes which all Python classes have. These other attributes, which all happen to be special attributes and methods, came from the Python base class. These are the minimum set of methods that Python will need to call to be able to use an object so it injects them into all its classes. Let's start looking at what we can do with these special methods.

### The \_\_init\_\_ Method

One of the first things we can change about our `ScrabbleWord` class is that we have to manually add the the word and the score. Since we will always want to do this for every class instance we should just make it part of the object creation.

To define the way an object is created (also referred to as "instantialized") we can create an `__init__` method. If we look at the output of the `dir()` function though we can see that `ScrabbleWord` already has an `__init__` method. Because we are replacing an existing method inherited from the parent class, this is called operator overloading. In this case the parent, implicit in our class definition, is the Python base class for all objects.

As it turns out, all classes have an `__init__` method. This is because Python always uses the `__init__` method to create class instances. This is an example of what we mean when we say `__init__` is a "special" method; these methods are referenced by Python to determine class behavior. Our replacement looks like this:

	class ScrabbleWords(object):

	    letter_values = {
	        'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 'g': 2, 'h': 4,
	        'i': 1, 'j': 8, 'k': 5, 'l': 1, 'm': 3, 'n': 1, 'o': 1, 'p': 3,
	        'q': 10, 'r': 1, 's': 1, 't': 1, 'u': 1, 'v': 4, 'q': 10,
	        'w': 4, 'x': 8, 'y': 4, 'z': 10
	    }

	    def __init__(self, word):
	        self.word = word
	        self.score = sum([
	            ScrabbleWords.letter_values[letter] for letter in self.word]
	        )


Our `__init__` method now takes an argument called `word` which it assigns as an attribute to the class. I added a class attribute called `letter_values` that is accessed as an attribute on the class,  i.e. `ScrabbleWords.letter_values`. This attribute is a dictionary that maps letters to their Scrabble score. `__init__` uses this dictionary in a list comprehension to turn the input word into a list of letter scores, sum those up, and then assign the sum to the `score` attribute. Calling the class now looks like this:

	In [1]: my_word = ScrabbleWords('cat')

	In [2]: my_word.word
	Out[2]: 'cat'

	In [3]: my_word.score
	Out[3]: 5

Not bad, we now provide the word at the same time as we create the object and both the word the calculated score are saved on the object. Let's see what else we can do.

### The \_\_repr\_\_ and \_\_str\_\_ and Methods

Let's take a look at what happens when we try to inspect or print our class instance [^1].

	In [1]: my_word
	Out[1]: <__main__.ScrabbleWord instance at 0x1084c80e0>

	In [2]: print(my_word)
	Out[2]: <__main__.ScrabbleWord instance at 0x1084c80e0>

This tells us that the `my_word` object is an instance of the `ScrabbleWord` class from the `__main__` namespace and is located at memory address `0x1084c80e0`. While this is all correct it's the default representation of any Python object and that information is not as useful as it could be for building our Scrabble game

We can make the results more descriptive by overloading the `__repr__` and `__str__` methods to fit our use case. This could look like this.

    def __repr__(self):
        return '{}: {} points'.format(self.word, self.score)

    def __str__(self):
        return '{}: {} points'.format(self.word, self.score)

Now interacting with our object will look like this:

	In [1]: my_word
	Out[1]: cat: 5 points

	In [2]: print(my_word)
	cat: 5 points

You can read more about the difference between the `__repr__` and `__str__` methods in this [Stack Overflow Question](https://stackoverflow.com/questions/1436703/difference-between-str-and-repr-in-python).

### The \_\_eq\_\_ and Other Operator Methods

At some point we're probably going to want some type of score optimization algorithm for our game, maybe for a simple computer opponent. To do that it would be helpful to have a way of comparing the value of two `ScrabbleWord` objects. Right now we can do that manually by explicitly comparing the `score` attribute.

	In [1]: cat_word  = ScrabbleWords('cat')

	In [2]: dog_word = ScrabbleWords('dog')

	In [3]: cat_word
	Out[3]: cat: 5 points

	In [4]: dog_word
	Out[4]: dog: 5 points

	In [5]: cat_word.score == dog_word.score
	Out[5]: True

	In [6]: cat_word.score > dog_word.score
	Out[6]: False

But if we start to implicitly compare the words Python doesn't know we mean to compare the score and we get unexpected behavior.

	In [5]: cat_word == dog_word
	Out[5]: False

	In [8]: cat_word > dog_word
	Out[8]: True

It turns out we can define the behavior of these comparison operators `==`, `!=`, `<`, `>`, `<=`, and `>=` using the `__eq__`, `__ne__`, `__lt__`, `__gt__`, `__le__`, and `__ge__` respectively. If we want to make our comparisons implicitly use the score attribute to prevent us from having to write it out every time our definitions could look like this:

    def __eq__(self, y):
        if self.score == y.score:
            return True
        else:
            return False

    def __ne__(self, y):
        if self.score != y.score:
            return True
        else:
            return False

    def __lt__(self, y):
        if self.score < y.score:
            return True
        else:
            return False

    def __gt__(self, y):
        if self.score > y.score:
            return True
        else:
            return False

    def __le__(self, y):
        if self.score <= y.score:
            return True
        else:
            return False

    def __ge__(self, y):
        if self.score >= y.score:
            return True
        else:
            return False

Now using our object would go like this:

	In [1]: cat_word == dog_word
	Out[1]: True

	In [2]: cat_word != dog_word
	Out[2]: False

	In [3]: cat_word < dog_word
	Out[3]: False

	In [4]: cat_word > dog_word
	Out[4]: False

	In [5]: cat_word <= dog_word
	Out[5]: True

	In [6]: cat_word >= dog_word
	Out[6]: True

It's worth pointing out what's happening here. Taking the `__eq__` method as an example. Where Python sees the `==` operator between two instance of our `ScrabbleWords` class it'll evaluate the `__eq__` method to determine the result.

But looking at our code and you can see the comparison being performed is `self.score == y.score` which is something like `<int> == <int>`. So what determines the answer of _that_ statement? Because everything in python is an object, including integers, Python uses the integer classes `__eq__` method to evaluate this.

### The \_\_iter\_\_ and \_\_len\_\_ and Methods

When we play a word on the board in Scrabble we might care about how long a word is (to see if it'll fit on the board) and we might need to look at a word letter-by-letter (to evaluate things like bonus letter scores). If we try to do either of these things with Our class in it's current state we'll see neither are not supported.

	In [1]: len(cat_word)
	---------------------------------------------------------------------------
	AttributeError                            Traceback (most recent call last)
	<ipython-input-48-7ee5d4e3efb8> in <module>()
	----> 1 len(cat_word)

	AttributeError: ScrabbleWords instance has no attribute '__len__'

	In [2]: [letter for letter in cat_word]
	---------------------------------------------------------------------------
	TypeError                                 Traceback (most recent call last)
	<ipython-input-49-b747de29668a> in <module>()
	----> 1 [letter for letter in cat_word]

	TypeError: iteration over non-sequence

Again we can get around this by directly accessing the attribute we what to work with, in this case the `word` attribute.

	In [1]: len(cat_word.word)
	Out[1]: 3

	In [2]: [letter for letter in cat_word.word]
	Out[2]: ['c', 'a', 't']

But, following the theme of this post, we can do this implicitly with the special methods, in this case the `__len__` and `__iter__` methods.

    def __iter__(self):
        for letter in self.word:
            yield letter

    def __len__(self):
        return len(self.word)

Now our class works like this:

	In [43]: len(cat_word)
	Out[43]: 3

	In [44]: [letter for letter in cat_word]
	Out[44]: ['c', 'a', 't']

### Conclusion

Python special methods become increasingly important as you start working on more involved projects. Either you will be writing your own libraries, in which case these are common "pythonic" programming patterns. Or even if you are leveraging existing libraries, at some point you will need to understand exactly what some special methods are doing in order to understanding some bug or quirk in the library.

Just doing some quick poking around on the github repos for some of my favorite open source projects turns up a couple of examples of classes with lots of special methods in the wild: [BaseRowProxy](https://github.com/zzzeek/sqlalchemy/blob/master/lib/sqlalchemy/engine/result.py#L42) in SQLAlchemy, [SiteRegistry](https://github.com/astropy/astropy/blob/master/astropy/coordinates/sites.py#L26) in Astropy.

[^1]: Note I'm using the Python 3 style print statement. To use this in Python 2 run `from __future__ import print_function`

