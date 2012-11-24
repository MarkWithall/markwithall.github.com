---
layout: post
title: How to partition a list in C#
categories: programming
---
Just to test out how the syntax highlighting works for posting blog entries, here's a short piece of code that I wrote a whilte ago to parition a list into fixed-size blocks.

```c#
public static IEnumerable<IEnumerable<T>> Partition<T>(this IEnumerable<T> list, int size)
{
    while (list.Any()) { yield return list.Take(size); list = list.Skip(size); }
}
```

And for extra credit, here are some extensions to make it work for strings too.

```c#
public static IEnumerable<string> Partition(this string str, int size)
{
    return str.Partition<char>(size).Select(AsString);
}

public static string AsString(this IEnumerable<char> charList)
{
    return new string(charList.ToArray());
}
```

These were originally posted by me on [stackoverflow](http://stackoverflow.com/questions/1396048/c-sharp-elegant-way-of-partitioning-a-list/9601647#9601647).

