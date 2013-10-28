---
layout: post
title: TDD vs Productivity
categories: programming
---
Today I encountered this programmers.stackexchange post on [TDD vs Productivity](http://programmers.stackexchange.com/questions/86636/tdd-vs-productivity) and had some thoughts on common misconceptions about TDD and unit testing.

* If you don't end up with 100% test coverage, you haven't done TDD properly(tm) - this is because you shouldn't write any production code without a failing test and you should only write the minimum to make the test pass.
* You shouldn't be testing 3rd party code, so TDD still applies to library intensive software like game programming just as much as any other, as you won't be testing the OpenGL/DirectX functionality only the calls to the API.
* If you are writing lots of tests for a class, you probably aren't abiding by the single-responsibility principle - in most cases, classes that only do one thing shouldn't need many tests to cover its behaviour.
* Refactoring shouldn’t change behaviour - if you want to change behaviour write a test for the new behaviour or modify tests that now don't represent the desired behaviour of the software.
* Unit tests only tell you when you have a bug, not when you don't.
* When people say they don’t test UI, what they should mean is that they don’t test what the UI looks like; they should still be testing what it does.  Also, see point 1.

I may add items to this list as I think of them.  Also, I reserve the right to change my mind if superior data are discovered.

