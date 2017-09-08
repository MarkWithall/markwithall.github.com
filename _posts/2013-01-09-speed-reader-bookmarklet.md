---
layout: post
title: Speed Reader Bookmarklet
description: A bookmarklet that allows you to read the selected text from a website by flashing words rapidly, one at a time.
categories: programming
---
The other day on [TWiT](http://twit.tv/) I heard about an iPad app called [Read Quick](http://readquickapp.com/).  I thought that this sounded like a brilliant idea and wouldn't it be great if one could just select some text in a webpage, press a button and have the same thing happen.

After some consideration, I decided that it couldn't be too hard to write a bookmarklet to do something similar.  All that would be required would be to get the selected text, split it into words and then loop through the list of words displaying one at a time.

It didn't take very long to write.  I then threw it on github for the world to play with.  It can be found [here](http://www.markwithall.com/speedreader/).  The source can be found [here](https://github.com/markwithall/speedreader/).

There is still plenty to do to make the tool better: it doesn't look very pretty, it's not been testing on most browsers (only Chrome and Safari, so far) and you can't configure it in any way (particularly the speed, which is fixed at 400 words per minute).

Hopefully, over the next week, I'll have sufficient time to tidy it up a bit and test it on other browsers but even in it's current state, I'm already finding it an invaluable tool.

