---
layout: post
title: Such Coffee, Many Caffeine, Wow!
categories: programming
---
Over the past two days I've been at [BACON 2014](http://devslovebacon.com) (it's a wonderful conference, you must go).  At the end I drank far too much coffee and enthusiastically signed up for a lightning talk.  I'll post a link to the talk here when it comes out.

I decided to talk air some of my initial impressions about the current "TDD Is Dead" debates that are going on.  Whilst my thoughts are not fully developed yet, and my talk was almost certainly completely incoherent (as it was largely ad libbed), I think my key conclusions where valid.

In addition, I was very pleased to see that a large proportion of the attendees at BACON 2014 where practicing TDD on a daily basis, on real-world projects.  It's death seems, at least in that community, to have been greatly exaggerated.

## Be Pragmatic, Not Dogmatic

I tend to agree with DHH that you don't always know what you are trying to achieve when you start programming.  Sometimes you want to quickly try a few things out and see where it goes.  See what works best.  It's often difficult to start by writing a test when you don't know the goal.  I seem to recall even Uncle Bob saying that TDD shouldn't replace design; and sometimes that design is best done in code.

Also, not every class or method needs to be completely isolated from everything.  Again, Uncle Bob (as he so often does) wrote a great blog post just the other day about [where and when to mock](http://blog.8thlight.com/uncle-bob/2014/05/10/WhenToMock.html) and even [what sort of mocks are best to use](http://blog.8thlight.com/uncle-bob/2014/05/14/TheLittleMocker.html).

So, be pragmatic.  100% test coverage, with completely decoupled unit tests, is not always a helpful goal and can often force you to do strange things to allow it to be achieved.

## Code Isn't Documentation

DHH has a goal of readability of code over testability of code.  He seems to be saying that TDD forces your hand and leads to code that is 'too decoupled' and not cohesive.  I liked Kent Beck's repost that TDD doesn't force you to do anything.  You are in control of the design.

But, more than that, the most readable code in the world won't be able to overcome there being one million lines of it.  [Steve Losh](http://stevelosh.com/blog/2013/09/teach-dont-tell/) had a wonderful article on how to document code, which basically said that reading the code should be the last resort to understanding your codebase.

Just remember, these are all [individual views](http://codon.com/the-dhh-problem).  I've seen a tree trunk, DHH has seen a snake but we are still yet to properly address the elephant in the room.

I'm sure I'll have many more thoughts on this subject as the debate goes on but writing down their current state will allow me to look back and point and laugh at the silly conclusions I drew early on in the proceedings.

