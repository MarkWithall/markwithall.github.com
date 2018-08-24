---
layout: post
title: Creating C DLLs for use with C#
description: Creating a DLL in C and then accessing it from C# has always seemed like a daunting task. I decided to give it a go and found it to be surprisingly straightforward.
categories: programming
extra_styles: syntax.css
---
To me, creating a DLL in C and then accessing it from C# (for example, when we need more performance or to use less memory) has always seemed like a rather daunting task. This week, I decided to give it a go and found it to be surprisingly straightforward.

## Creating a C DLL

We shall start with nearly the simplest thing we could possibly imagine in C:

```c
__declspec(dllexport) int Add(int a, int b)
{
    return a + b;
}
```

The `__declspec(dllexport)` says export this function in the DLL.

The following compiles `test.c` into `test.dll` (making sure to use the Developer Command Prompt or call `vcvarsall.bat` before starting):

```shell
> cl /Za /LD test.c
```

Note the `/Za` flag makes sure you are working in strict C (rather than C++). Without it, you would need to add some code to avoid name mangling:

```c++
extern "C"
{
    __declspec(dllexport) int Add(int a, int b)
    {
        return a + b;
    }
}
```

If you prefer to be more precise, you can do the following:

```shell
> cl /Wall /WX /O2 /Za /LD test.c
```

This adds all of the warnings you could possibly ever want (`/Wall /WX`) and optimises the code (`/O2`).

## Accessing the C DLL functions from C#

To access the function from C# (assuming that the DLL is in the current path, such as the same folder as the C# exe):

```c#
[DllImport("test.dll")]
private static extern int Add(int a, int b);
```

This can then be used as a normal C# method. For example (testing using NUnit):

```c#
[Test]
public void TestAdd()
{
    Assert.AreEqual(42, Add(13, 29));
}
```

The process gets slightly more complicated for strings, structs and pointers to things but that's a story for another day.
