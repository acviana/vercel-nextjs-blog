Title: An Intro to Regex
Date: 2017-05-10
Category:
Tags:presentations
Slug: an-intro-to-regex
Authors: Alex C. Viana

<center>
![alt text](https://dl.dropboxusercontent.com/s/7yhsckbmoairs7o/mother-and-daughter-talk-e1447834530360.jpg?dl=0)
</center>

# How to Talk to your Analysts about Regex

**Alex Viana - 05/05/17**

_The following is a presentation I gave to some non-techincal collegues at work to help them get started on reading and writing regex expressions. Sharing in case others find it useful as well._

Regular Expressions (Regexs) are a way of defining search patterns that can be applied to text. Throughout this document regexes will be written in Python syntax, quoted and preceded by a letter `r`, like this `r"a regex pattern"`, to differentiate it from raw text, like this `"some raw text"`.

A regex can be as simple as a literal match like this:

	r"match this string exactly"

Which would only match against the literal text `"match this string exactly"`. By assigning special properties to certain characters regex can also search for text that matches complicated patters like this:

	r"10\.(6[4-9]|[7-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(1?\d\d?|2[0-4]\d|25[0-5])\.(1?\d\d?|2[0-4]\d|25[0-5])"

This [regex](https://stackoverflow.com/questions/39884618/regex-to-find-a-range-in-an-ip-address) would match against an IP address range that begins with `10.`, has a second octect in in the 64-255 range, and accepts any values for the third and fourth octets.

Complicated regex patterns like this can be pretty inscrutable even when they are working correctly and hence the old joke:

> You have a problem. You try to solve it with Regular Expressions. Now you have two problems.

Still, regexes are very useful and you can get a lot of mileage out of just a few parts of the regex syntax.

### Testing Regexes

I highly recommend using the [Regex101 website](regex101.com) to test regexes, both to understand existing expressions and to test expressions you are writing. Try it out to play with the example searches in this tutorial.

### Special Characters

As we saw, matching string literals, i.e. patterns that have only one possible match, is trivial:

	Regex: r"this"
	Matches: "this"
	Misses: "that"

The regex syntax is largely built around assigning special properties to punctuation marks. As a result, if you ever want to literally search for any of these characters you will have to *escape* those characters with a backslash (`\`). So if you wanted to search for a backslash you would have to escape the backslash like this:

	Regex: r"\\"
	Matches: "\"
	Misses: "Something else"

Pretty meta right? Similarly if you wanted to search for `"google.com"`:

	Regex: r"google\.com"
	Matches: "google.com"
	Misses: "anything else"

### Replacing a Single Character

String literals without special characters aren't very useful thought, the power of regex comes from matching patterns. One of the simplest regex patterns is a period (`.`), which means "match any single character in this position". For example:

	Regex: r"1.3"
	Matches: "123", "1.3"
	Misses: "13"

Because the period is a special character, as we saw in the last section you would have to escape it if you literally wanted to search for `"1.3"`.

	Regex: r"1\.3"
	Matches: "1.3"
	Misses: "123"

We can constrain the possible characters we match on by using square brackets (`[]`). For example if we only wanted to match on the numbers 1, 2, or 3:

	Regex: r"1[123]3"
	Matches: "113", "123", "133"
	Misses: "13", "143"

A common pattern in regex is matching against any letter. This can be done by specifying a range like this `[1-3]`. So any lowercase letter would be `[a-z]`, uppercase would be `[A-Z]`, both would be `[a-zA-Z]`, and adding letters would be `[a-zA-Z0-9]`.

	Regex: r"[a-zA-Z0-9]"
	Mathes: Any uppercase letter, lowercase letter, or number
	Misses: "!!!"

### Replacing Multiple Characters

Using just square brackets will match only character one time, we can also match against a character or set of characters repeatedly by using the curly braces `{}`, where the number in the curly braces indicates the number of times, or range of times, to match.

For starters we can rewrite our last regex which, matches only once, as `r"1[123]{1}3"` and produce the same search results (try it!).

Repeating the set match twice then looks like this:

	Regex: r"1[123]{2}3"
	Matches: "1113", "1123", "1333"
	Misses: "1243"

We can also repeat a variable number of times. To repeat a set between x and y times looks like `{x,y}`. For example this regular expression will match from the set `[123]` either once or twice (but not zero times).

	Regex: r"1[123]{1,2}3"
	Matches: "113", "123", "133", "1113", "1123", "1333"
	Misses: "13", "143", "1243"

### Word Boundaries

Another useful pattern is defining the boundaries of what you want to match against. You can do this with any string literal like we did in the section on replacing a single character where the search terms were all bound by a `1` and a `3`. You could bound a match with whitespace using a space ` `. More generally you can use the `\b` for any word break. For example

	Regex: r"\bthis\b"
	Matches: "that this that"
	Misses: "thatthisthat"

### Logical Operators

The vertical bar (`|`) is a logical or operator. For example:

	Regex: r"tyler|perry"
	Matches: "Katie Perry", "Steve Tyler", "Tyler Perry", "Perry Como"
	Misses: "something else"

### Next Steps

There are a lot more you can do with regexes and a lot more syntax to learn but hopefully this was a useful starting point.

If you *really* want to dive into the deep end check out one of my favorite regex problems, trying to write a regex that [matches any valid URL](https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url)

Congratulations, you now have two problems!
