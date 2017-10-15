---
layout: post
title: DDD North 2017 Review
description: My review of the talks I went to at DDD North 2017 in Bradford.
categories: programming
---

Yesterday I attended my third [DDD North](https://www.dddnorth.co.uk). This year was at the University of Bradford, which had the added bonus of free parking. It again provided an excellent opportunity to catch up with my colleagues from the North.

Looking back to [last year's review](/programming/2016/10/02/dddnorth-review.html), I appear to have chosen very similar talk topics to attend.

## Thinking Functionally in C#. 

This talk was by [John Stovin](https://twitter.com/johnstovin). It was a much more in depth talk than I was expecting and inspired many interesting thoughts. For example, the suggestion that a properly pure function shouldn't even throw an exception. Instead of:

```c#
public static void DoSomethingWithMinutes(int mins)
{
    if (mins < 0 && 59 < mins) throw new ArgumentException();
    // ...
}
```

We should restructure such that the function doesn't need to throw:

```c#
public static void DoSomethingWithMinutes(MinuteComponent mins)
{
    // ...
}

public class MinuteComponent
{
    private readonly int _mins;

    public static MinuteComponent FromInt(int mins)
    {
        if (mins < 0 && 59 << mins) throw new ArgumentException();
        return new MinuteComponent(mins);
    }

    private MinuteComponent(int mins)
    {
        _mins = mins;
    }

    // ...
}
```

It also provoked the thought that there is some trade-off between the use of F# matches and the [open-closed principle](https://en.wikipedia.org/wiki/Open/closed_principle); requiring many updates if there is an addition to a union type. The suggestion was that [monads](https://en.wikipedia.org/wiki/Monad_(functional_programming)) may be a solution to this but I don't know enough about them at the moment.

Other things to look into include: reactive extensions (like LINQ but for events) and finding out if C#7 can be used from Visual Studio 2015 in any sensible manner.

## Teaching an old dog new tricks

This talk was by [Ismail Mayat](https://twitter.com/ismailmayat). As I'm a big fan of clean code and TDD, this talk was a must. There were many good quotes and anecdotes in the talk, in particular Venkat Subramaniam's "We cannot be agile if our code sucks". It was also interesting to find out that the NASA Mercury probe had been developed in Smalltalk using what was basically TDD.

## Scaling Agile in your Organisation with the Spotify Model

This talk was by [Stephen Haunts](https://twitter.com/stephenhaunts). I went to his talk last year as well, so he's clearly doing something right in his marketing. This prompted me, yet again, to look at [Derbyshire DotNet](https://www.meetup.com/Derbyshire-Dot-Net/); something that I didn't do after last year's talk. I'm sure I'll say the same thing again next year. Also, [Hack24](http://www.hack24.co.uk) in Nottingham was an interesting discovery.

The concept of "internal open source" was an interesting one and something that we do where I work but didn't have a name for. I must also look into [Launch Darkly](https://launchdarkly.com) for feature flag management.

## Async in C# - The Good, the Bad and the Ugly

This talk was by [Stuart Lang](https://twitter.com/stuartblang). I went to an async/await talk last year too but have not made much use of it over the past year. Hopefully, having attended another talk on the subject I will be inspired to try a bit harder to incorporate the ideas over the next year. [SharpLab](https://sharplab.io), a tool for examining the Roslyn-generated code was another interesting discovery as was [vs-threading](https://github.com/microsoft/vs-threading) from Microsoft.

## Interactive APIs with GraphQL

This talk was by [Sam Hogarth](https://twitter.com/samhogy). The final talk of the day was on GraphQL, which I've been meaning to find out about for a while, as an alternative to REST. One of the main advantages over REST is that the values in the data are typed. Also, it is much easier to be more specific about the data you want to be returned without having to do a lot of work setting up extra end points to query like in REST. [GraphiQL](https://github.com/graphql/graphiql) was an interesting looking tool for developing GraphQL.

Overall, another excellent day out. Many ideas where inspired and hopefully I'll be able to put them all to good use.
