---
layout: post
title: A Simple Event Aggregator / Message Bus In C#
categories: programming
extra_styles: syntax.css
---
Most, if not all, mainstream MVVM frameworks provide some sort of event aggregator/message bus.  This makes communication between viewmodels easier than doing it manually via events or callback injection (both of which require too much knowledge of either the sender or receiver and tend to be the cause of accidental memory leaks).

Fortunately, it is straightforward to create a simple event aggregator.  We can define the API using the following set of interfaces.

## `ISubscriber<TMessage>`

{% highlight c# %}
public interface ISubscriber<in TMessage>
{
    void HandleMessage(TMessage message);
}
{% endhighlight %}

This allows a class to implement multiple event handlers without the need to switch on the message type.

## `ISubscriberStore`

{% highlight c# %}
public interface ISubscriberStore
{
    void Add<TMessage>(ISubscriber<TMessage> subscriber);
    IEnumerable<ISubscriber<TMessage>> Subscribers<TMessage>();
}
{% endhighlight %}

No `Remove` method, as subscriptions will be stored as weak references and are cleaned up on calls to Subscribers.

## `IMessageAggregator`

{% highlight c# %}
public interface IMessageAggregator
{
    void Subscribe<TMessage>(ISubscriber<TMessage> subscriber);
    void Publish<TMessage>(TMessage message);
}
{% endhighlight %}

No `Unsubscribe` method, as subscriptions are stored as weak references and are cleaned up on calls to publish.

Notice that messages can be anything, though it is probably sensible to wrap them in a well named class.

As an aside, I don’t generally go in for naming interfaces with an ‘I’ prefix.  There are many arguments in favour of this on the Interweb.  However, for libraries, where one doesn’t know who is using it (or how), I prefer the explicit approach.

## Test Plan

### SubscriberStore

1. `SubscriberStore` implements `ISubscriberStore`
2. Add adds a subscriber to the underlying dictionary list for the particular message type
3. `Subscribers` returns all subscribers for the given message type
4. `Subscribers` removes all dead subscribers for the given message type
5. `Subscribers` doesn’t return null subscribers

### MessageAggregator

1. `MessageAggregator` implements `IMessageAggregator`
2. `Subscribe` adds to the underlying `ISubscriberStore`
3. `Publish` calls `HandleMessage` on all subscribers for the given message type

Also, an integration/acceptance test that has multiple publishers and subscribers (implementing multiple types each) is probably warranted.

The actual implementation details of these classes is left as an exercise for the reader but will hopefully be the subject of a later video.

