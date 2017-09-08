---
layout: post
title: DDD North 2014 Review
description: My review of the talks I went to at DDD North 2014 in Leeds.
categories: programming
---
It's been a while but yesterday has presented me with the motivation to write another post.  It's also getting close to the end of the year and I'm running rather short of my target of twelve articles.

Yesterday (October 17th 2014) I got up in the middle of the night, two hours before I went to bed, and made the long trip to Yorkshire.  I went to [DDD North 2014](http://www.dddnorth.co.uk) in Leeds.

Overall I had a great, if somewhat tiring, day.  There were many interesting talks and discussions with people.  Though, I was slightly disappointed that many of the talks I was most interested in were running in parallel.  Below I've summarised the particular talks that I went to.

## Write your own compiler in 24 hours

This talk was by [Phillip Trelford](https://twitter.com/ptrelford).  He went through the writing of a series of interpretters/compilers for increasingly complex languages.  He started with logo, showing some pretty patterns generated.  Then he moved on to Small Basic, expanding upon the original language with parameterised functions and giving an example of [FizzBuzz](http://en.wikipedia.org/wiki/Fizz_buzz) implemented in the language.  And finally, ending with an implementation of C#.  One interesting thing that I found out was that C# has an almost one-to-one mapping with the op codes in the VM.

The main thing to take away from the talk was not to reinvent the wheel and leverage existing tools and technologies.  All of the examples in the talk were given in F#.  I'm not that familiar with the language but as the code was very short it was relatively easy to understand.

## Brownfield Refactoring

This talk was by [Dominic Finn](https://twitter.com/CleverFinn).  He presented a great set of hand-drawn slides, which we very entertaining.  I went into this talk expecting to hear some Feathers-style discussion of working with legacy code but was instead greeted with a refreshing angle of how to manage the process from a people perspective.  One particularly interesting point mentioned was to examine where your software is in it's overall lifecycle and analyse whether it really is worth expending the effort required to improve it.  The recommendation was that when your product goes into decline, get your best developers off it and onto something new.  Then maybe even outsource the maintenance of the declining product.  Another recommendation was to make UI changes very gradually, so as not to upset your users.

## Join the Dark Side - Why developers should choose management

This talk was by [Ceri Shaw](https://twitter.com/cerishaw).  She addressed such issues as why do we need developers in management and why would they want to be.  She said that one of the reasons we end up with bad managers was that it was seen as a career progression.

Types of managers were roughly divided into two categories: 'team leads' who were responsible for getting the best out of the team as a whole and 'line managers' who were responsible for getting the best out of individuals.  She suggested that a good way into management was through mentoring and that one of the most rewarding aspects was seeing improvements in the team.  She did stress that as a manager from a technical background it was important to keep up with coding skills but that there was a trade off as the more management the less coding.  It was also stressed the importance of keeping yourself off the critical path, so at crunch time you could focus on organisational issues.

Many other useful pieces of advice were put forward too that this article doesn't have room for.  The talk ended with the recommendation of the book [Behind Closed Doors](http://www.amazon.co.uk/Behind-Closed-Doors-Management-Programmers/dp/0976694026) amongst others.

## Visual Studio CodedUI: Improving Resilience in your Automated tests

This talk was by [Riccardo Viglianisi](https://twitter.com/captainshmaser).  A shorter talk but with a lot of lively discussion afterwards.  The main focus was on the trade off between using automatically generated UI Maps, which are rather fragile, and hand-coded tests, which have a steep learning curve.  Another recommendation was not to use the threading library for timing as it interferes with the running of the tests; playback engine should be used instead.  Annoyingly, the coded UI tests aren't available for Visual Studio Professional but a third-party library is available from Telerik for less than the cost of Ultimate Edition.

## Micro Services: conquer monoliths, before they own you

This talk was by [Kiran Singh](https://twitter.com/Roarkiran).  I was rather flagging at this point.  The speaker told of the benefits of microservices such as independent deployability and that working with distinct services lowers cognitive load.  He also gave some advice for working with microservices, such as the need for good integration testing and that building microservices requires something of a culture change for the organisation not just a software change.  For more details, read Martin Fowler's [microservices article](http://martinfowler.com/articles/microservices.html).  He gave a couple of case studies and reminded me that I still haven't read [The Black Swan](http://www.amazon.co.uk/Black-Swan-Impact-Highly-Improbable-ebook/dp/B002RI99IM/).

Many, many thanks are due to the people who ran and sponsored the event.  The day ended with drinks and dinner with some colleagues in Veritas (a pub whose menu knows not the word bland).

