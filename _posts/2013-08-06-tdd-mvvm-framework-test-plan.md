---
layout: post
title: TDD MVVM Framework Test Plan
categories: programming
---
Just out of interest, I was experimenting with TDDing (if that’s a real phrase) a basic MVVM framework in C#.  The following is the rough sequence of tests for test-driving the implementation that I ended up using.

WPF makes use of two main interfaces: `INotifyPropertyChanged` for notifying the UI of updates to properties that it is bound to, _e.g._ the value in a `TextBox`; and `ICommand` for executing commands when, _e.g._ a `Button` is pressed.

Here are the sequence of tests for the two main classes in the framework.

## ObservableObject : INotifyPropertyChanged

1. `ObservableObject` implements `INotifyPropertyChanged`
2. `RaisePropertyChangedEvent` with property name fires event
3. `RaisePropertyChangedEvent` with property name passes name through to handler
4. `RaisePropertyChangedEvent` with name of non-existent property throws `ArgumentException` (in Debug only)
5. `RaisePropertyChangedEvent` with multiple property names fires event for each
6. `RaisePropertyChangedEvent` with no observers does not throw exception

## DelegateCommand : ICommand

1. `DelegateCommand` implements `ICommand`
2. `CanExecute` returns `True`
3. `Execute` runs stored `Action`
4. `Execute` with null does not throw exception

I’m unsure as to the necessity of testing that the classes implement the required interfaces but it is technically a requirement of the implementation.

At some point in the near future, I hope to record a video of this development.
