---
layout: post
title: Fluent APIs And The Law Of Demeter
categories: programming
extra_styles: syntax.css
---
In object oriented programming the [Law of Demeter](http://en.wikipedia.org/wiki/Law_of_Demeter
) states that a class shouldn’t reach through associated classes into the details of other classes beyond.  This is often stated as “use only one dot”.  This formulation, on the face of it, seems to have worrying implications for the use of [fluent APIs](http://en.wikipedia.org/wiki/Fluent_interface
), such as [.NET LINQ](https://msdn.microsoft.com/en-us/library/bb397926.aspx
).

Below is a simple example with two levels.  The first represents a train and the second the details of each stop that the train makes.  The Law of Demeter says that if we are playing with trains, we shouldn’t be able to see the details of stops, i.e. something that has a train, shouldn’t look at departure times.

##First Level Interface

{% highlight c# %}
public interface ITrain
{
    int Id { get; }
    IEnumerable<IStop> Stops { get; }
}
{% endhighlight %}

##Second Level Interface

{% highlight c# %}
public interface IStop
{
    string Name { get; }
    TimeSpan? DepartureTime { get; }
    TimeSpan? ArrivalTime { get; }
}
{% endhighlight %}

Here are two example methods that take a list of trains and use LINQ to filter them in some manner.  Both return a list of stops but the first complies with the Law of Demeter and the second does not.

##Legal Usage

{% highlight c# %}
public IEnumerable<IStop> Legal(IEnumerable<ITrain> trains)
{
    return trains
        .Where(train => train.Id < 100)
        .OrderBy(train => train.Id);
        .Select(train => train.Stops.First());
}
{% endhighlight %}

Whilst there are many dots used in the above code, nothing reaches through the `ITrain` interface and into the details of the `ILocation` interface.  Hence, the Law of Demeter is complied with.

##Illegal Usage

{% highlight c# %}
public IEnumerable<IStop> Illegal(IEnumerable<ITrain> train)
{
    return trains
        .Select(train => train.Stops.First())
        .OrderBy(stop => stop.DepartureTime)
}
{% endhighlight %}

Here there are in fact fewer dots used than in the legal example above.  However, we are reaching through into the details of the `ILocation` interface (accessing the `DepartureTime` property that the Law of Demeter says we shouldn’t know about).

As we have shown above, it is perfectly possible to comply with the Law of Demeter whilst using fluent APIs but it is necessary to be careful when doing so.
