---
layout: post
title: Thoughts On Test Driven Development
categories: programming
extra_styles: syntax.css
---
_Except from a conversation with [Matthew T. Atkinson](http://mta.agrip.org.uk/) on the 27th of March 2013.  A discussion on how to do TDD ‘properly’ and why it’s hard to be disciplined about following the approach._

For TDD one must write ONE test that fails and then make it pass before moving on to the next test.

That's not quite true.  One should do the following:

{% highlight vb.net %}
10 "write the simplest, meaningful failing test"
20 "write the minimum production code to make it pass"
30 "refactor so the code is nice"
40 goto 10
{% endhighlight %}

Refactoring should not be delayed; there would be no need to delay it as the code is arguably ‘complete’ at this point (as it does everything that the tests say it should do).

I must say that I'm not very good at following the above.  It's hard.  There's a lot of temptation to take shortcuts; to write more general code than is necessary to make the test pass, etc.

The traditional TDD approach is to work from the bottom up; developing the model classes that one expects to need.

The 'British' way is to work top-down; starting with a skeleton framework of the whole app and filling in the details as you go in thin, vertical slices of functionality.  This leads to less cruft I would imagine.  This is less popular.  I would imagine that this is because it requires much more upfront setup of your testing framework, as to even write the first test you have to write a lot of support code.

I recommend the book "[Growing Object-Oriented Software, Guided By Tests](http://www.growing-object-oriented-software.com/)" as a good book on that approach.  It gets a bit dull later on but the early stuff is very informative.

The top-down approach is called the 'London' method and the bottom-up the 'Classic' or sometimes ‘Chicago’ or ‘Detroit’; as discussed on [stackexchange](http://programmers.stackexchange.com/questions/123627/what-are-the-london-and-chicago-schools-of-tdd).

I suspect that TDD discipline is much easier in a pair-programming setting.


