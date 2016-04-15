---
layout: post
title: How to extract text from a Microsoft Word document in C#
categories: programming
extra_styles: syntax.css
---
Earlier this week, I had cause to extract the text from a Microsoft Word document.  Some naughty people had decided that the best way to export a CSV file from their application, was to save it as text in a .doc file.  May [my dog](https://www.facebook.com/HarryTheRottweiler) have mercy on their sole!

One could approach this problem in a nice complicated way, using [IFilter](http://www.codeproject.com/Articles/13391/Using-IFilter-in-C) for example, but I’ve taken the brave decision to assume that someone using software that exports Word documents will have a copy of Word to hand (risky!).  This allows the much simpler solution of using Interop.

The first step is to add <code>Microsoft.Office.Interop.Word</code> to project references.

We don’t want that nasty Interop stuff leaking all over the place, so I’ve created a nice simple little class that hides it away with a nicer interface.  Notice, I’ve made the class implement IDisposable, so that we can encapsulate the whole usage of Word in a using block; making the scope completely obvious.

```c#
using Microsoft.Office.Interop.Word;

public class WordApplication : IDisposable
{
    private readonly Application _application;
    private Document _document;

    public WordApplication()
    {
        _application = new ApplicationClass();
    }

    public void Open(string docFilename)
    {
        object docFilenameAsObject = docFilename;
        _document = _application.Documents.Open(ref docFilenameAsObject);
    }

    public void SaveAsText(string outputTxtFilename)
    {
        object outputTxtFilenameAsObject = outputTxtFilename;
        object formatAsObject = WdSaveFormat.wdFormatText;
        _document.SaveAs(ref outputTxtFilenameAsObject, ref formatAsObject);
    }

    public void Dispose()
    {
        _application.Application.Quit();
    }
}
```

This leaves us with a much nicer API to work with.  We can now simply create a new .txt file from the old .doc as follows.

```c#
public static void ConvertDocToTxt(string docFilename, string txtFilename)
{
    using (var application = new WordApplication())
    {
       application.Open(docFilename);
       application.SaveAsText(txtFilename);
    }
}
```

Obviously, wrapping that in a <code>try/catch</code> block or similar, with appropriate exception handling would be the way forward.  In real life one would also most likely introduce some interface to allow mocking, etc.

To conclude:

Pros

* Simple
* Short
* Supports both .doc and .docx (and probably other formats too)

Cons

* Requires Word
* Slow

_Exercise for the reader: now you can all go away and write a little app to add to a right-click menu item in explorer to convert Word docs to text._

