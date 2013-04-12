---
layout: post
title: How Big Is Your Endian?
categories: programming
---
I have finally discovered some of the advantages and disadvantages of the two main endian-nesses for data representation.  This isn’t something I’ve really thought about before but it’s actually quite interesting when you find out.

Big-endian (the firstianness of this endian should not be interpreted as any sort of favouritism whatsoever towards this particular representation)
* Human-readable, i.e. reading from left to right tells you what the data is
* Testing for sign, i.e. the leftmost bit is the positivity/negativity

Little-endian (the secondness of this endian should in no way indicate the lack of joy derived from its usage)

* Easily truncate-able, i.e. conversion from 32-bits to 16- or 8- just involves taking the first n bits

There’s also a middle-endian, apparently, though I doubt anyone knows why.

So, now we know.

As always, see [the ‘pedia](http://en.wikipedia.org/wiki/Endianness) for further details.

