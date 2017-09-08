---
layout: post
title: MVVM - Creating New Windows
description: An example of how to allow the creation of new windows using the MVVM pattern without the ViewModel needing to know about the View.
categories: programming
extra_styles: syntax.css
---

I recently saw a post on [StackExchange](http://programmers.stackexchange.com/questions/330842/in-mvvm-should-viewmodel-or-view-be-responsible-for-creating-new-views) about creating new windows in an MVVM-compatible way. This seems to me to be a common cause of confusion.

My interpretation of MVVM is that the `ViewModel` should not know about the `View`. As windows, and related UI elements, are clearly a part of the `View`, it seems to me that creating them should be a responsibility of the `View`.

That said, what we want is for a `Command` in the `ViewModel` to result in a new window being created. For example, an `OpenFileDialog`. The requirement of the `ViewModel`, however, is for a filename. The `ViewModel` shouldn't care that a new dialog window will be created to prompt the user for this filename.

When creating a `ViewModel` it is often useful to assume you have two views: a GUI and a command-line interface. In this instance, the GUI request for a filename would spawn an open file dialog and the command-line version would have a text prompt.

Let's look at a concrete example.

The `ViewModel` needs an interface that is specific to its requirements. In this case, it wants a filename.

```csharp
public interface FilenameProvider
{
    string GetFilename();
}
```

Our `View` could be a GUI, in which case the implementation of this interface could look something like:

```csharp
public class GuiFilenameProvider : FilenameProvider
{
    public string GetFilename()
    {
        var ofd = new OpenFileDialog {Title = "File", Filter = "All Files|*.*"};
        return ofd.ShowDialog(Application.Current.MainWindow) == true ? ofd.FileName : null;
    }
}
```

However, if we were working on a command-line version of our application, a different implementation of the interface would be needed. For example:

```csharp
public class CommandLineFilenameProvider : FilenameProvider
{
    public string GetFilename()
    {
        Console.WriteLine("Give me a file: ");
        return Console.ReadLine();
    }
}
```

The `ViewModel` doesn’t care where it gets the filename from, as long as it gets one. It would just have access to the interface and use it when it needs a filename. Something like the following:

```csharp
public class MyViewModel : Presenter
{
    private readonly FilenameProvider _filenameProvider;
    private readonly MyModel _model;

    public MyViewModel(FilenameProvider filenameProvider, MyModel model)
    {
        _filenameProvider = filenameProvider;
        _model = model;
    }

    public ICommand DoSomethingCommand => new Command(() =>
    {
        var filename = _filenameProvider.GetFilename();
        if (filename != null)
            _model.DoSomethingWithFilename(filename);
    });
}
```

The `ViewModel` doesn’t know that the filename is being provided by a GUI or by a command-line interface.

It should be possible to use this type of pattern in most cases, where the effect of a command in the `ViewModel` is the creation of a new window. To me, the one obvious exception to this is where you just want to create a new instance of a window with no additional side effects.  In this case, this feels like an entirely `View`-based action and the creation of the window should be handled there.
