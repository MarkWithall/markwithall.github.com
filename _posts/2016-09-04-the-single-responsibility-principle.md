---
layout: post
title: The Single Responsibility Principle
description: The Single Responsibility Principle is seemingly the simplest of the SOLID principles, But what does it actually mean in practice?
categories: programming
extra_styles: syntax.css
---

[The Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) is seemingly the simplest of the SOLID principles, I’ve spent quite some time trying to get my head around what it actually means in practice.  The 'official' description is as follows:

> "A class should have only one reason to change." - Robert C Martin

I’ve come to the conclusion that a class can have one of three main types of responsibility:

* Calculation
* Communication
* Construction

## Calculation

A class that performs some calculation.

```c#
public class Calculation
{
    public int Add(int a, int b)
    {
        return a + b;
    }

    public int Subtract(int a, int b)
    {
        return a - b;
    }
}
```

Reason to change: different calculation.

## Communication

A class that manages communication between other classes.

```c#
public class Communication
{
    private readonly IDataSource _source;
    private readonly Calculation _calc;

    public Communication(IDataSource source, Calculation calc)
    {
        _source = source;
        _calc = cal;
    }

    public void PerformAdd()
    {
        var result = _calc.Add(_source.A, _source.B);
        _source.AddResult = result;
    }

    public int PerformSubtract()
    {
        var result = _calc.Add(_source.A, _source.B);
        _source.SubtractResult = result;
    }
}

public interface IDataSource
{
    int A { get; }
    int B { get; }
    int AddResult { set; }
    int SubtractResult { set; }
}
```

Reason to change: dependencies change API.

## Construction

A class that creates other classes.

```c#
public class Construction
{
    public Communication CreateCommunication(SourceType type)
    {
        var source = CreateDataSource(type);
        var calc = CreateCalculation();
        return new Communication(source, calc);
    }

    private IDataSource CreateDataSource(SourceType type)
    {
        switch(type)
        {
            case SourceType.DB:
                return new DatabaseSource();
            case SourceType.CSV:
                return new CSVSource();
            default:
                throw new ArgumentException("Unknown type");
        }
    }

    private Calculation CreateCalculation()
    {
        return new Calculation();
    }
}

public enum SourceType
{
    DB,
    CSV
}
```

Reason to change: classes being constructed change constructors.

