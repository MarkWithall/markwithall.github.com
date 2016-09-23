---
layout: post
title: The World's Simplest C# WPF MVVM Example
categories: programming
extra_styles: syntax.css
---
The interesting thing to me about MVVM (Model-View-ViewModel), is that the Model should know about nothing else, the ViewModel should only know about the Model (not the View), and the View should only know about the ViewModel (and not the Model).

One thing that I’ve wanted to do for quite some time now, is to create a very simple MVVM example for C# WPF.  As this post will show, I’ve finally gotten around to it.

_Simple_, in this case, has a few caveats (as one might expect).  I wouldn’t want to write a completely trivial example that didn’t do anything.  With that in mind, let me lay out the ground rules.

__Model__: This can be really simple, the goal here is for the ViewModel not to have to do any of the business logic.

__ViewModel__: This should essentially delegate everything to the Model except for exposing data for the View.

__View__: This should just bind to the ViewModel and make stuff look pretty.

The example application should have the following features:
* Some user input
* A list of something
* Some user action (e.g. a button) that can be invoked both via the mouse and a keyboard shortcut

With those goals in mind, the application we are going to write will allow the user to enter some text in a _TextBox_ and then press a button (or key) and have that text magically transformed into uppercase.  A history of previous conversions will be recorded and presented in a _ListBox_ for posterity.  Exciting, eh?

## The MVVM Framework

The first thing that we are going to do is to create a minimal MVVM framework for us to use in the rest of the application.  There are two important components of the framework.

The first is a base class for ViewModel classes.  This handles the implementation of the _INotifyPropertyChanged_ interface.  This interface allows update messages to be passed to the View.  It should also be noted that all ViewModel classes that are bound to by the View should implement this (even if the values don't change from the ViewModel) as there is a known memory leak that may occur if they don't (see [the Microsoft support article](http://support.microsoft.com/kb/938416/en-us)).

The simplest implementation is as follows:

```c#
public class ObservableObject : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    protected void RaisePropertyChangedEvent(string propertyName)
    {
        var handler = PropertyChanged;
        if (handler != null)
            handler(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

This can be expanded in various ways.  For example, we could add checking that the property name exists for the given class.

The second component is an implementation of the _ICommand_ interface.  This is what commands in the View are bound to.  There is no default implementation, so we must roll our own.

The simplest implementation is as follows:

```c#
public class DelegateCommand : ICommand
{
    private readonly Action _action;

    public DelegateCommand(Action action)
    {
        _action = action;
    }

    public void Execute(object parameter)
    {
        _action();
    }

    public bool CanExecute(object parameter)
    {
        return true;
    }

#pragma warning disable 67
    public event EventHandler CanExecuteChanged;
#pragma warning restore 67
}
```

One thing to note is that _CanExecute_ always returns true.  Don't you just hate it when a button or a menuitem is greyed-out for no apparent reason?  Don't do it!  Much better to allow the button to be clicked and then give some informative feedback as to why the intended action cannot be carried out.

Now we have our minimal MVVM framework, we can move on to create our application.

## The Model

Our model is simple; consisting of a single _TextConverter_ class.  To <del>avoid the annoyance of Resharper whinging that the _ConvertText_ method can be made static</del> allow the _TextConverter_ class to conform to the [Open/Closed Principle](http://en.wikipedia.org/wiki/Open/closed_principle), I've made the string conversion a parameter.

```c#
public class TextConverter
{
    private readonly Func<string, string> _convertion;

    public TextConverter(Func<string, string> convertion)
    {
        _convertion = convertion;
    }

    public string ConvertText(string inputText)
    {
        return _convertion(inputText);
    }
}
```

## The ViewModel

We also only have a single _Presenter_ class in our ViewModel.  This is, however, slightly more complex than the Model.

```c#
public class Presenter : ObservableObject
{
    private readonly TextConverter _textConverter
        = new TextConverter(s => s.ToUpper());
    private string _someText;
    private readonly ObservableCollection<string> _history
        = new ObservableCollection<string>();

    public string SomeText
    {
        get { return _someText; }
        set
        {
            _someText = value;
            RaisePropertyChangedEvent("SomeText");
        }
    }

    public IEnumerable<string> History
    {
        get { return _history; }
    }

    public ICommand ConvertTextCommand
    {
        get { return new DelegateCommand(ConvertText); }
    }

    private void ConvertText()
    {
        if (string.IsNullOrWhiteSpace(SomeText)) return;
        AddToHistory(_textConverter.ConvertText(SomeText));
        SomeText = string.Empty;
    }

    private void AddToHistory(string item)
    {
        if (!_history.Contains(item))
            _history.Add(item);
    }
}
```

Notice that we are inheriting from our MVVM framework _ObservableObject_, which provides our implementation of the _INotifyPropertyChanged_ interface.  Our presenter is exposing three properties that the View can bind to.  We'll look at them one at a time.

The _SomeText_ property is the text that the user will enter.  The getter returns the current value of the property.  The View will get this value when it is first bound and then it will only change when it receives a property change notification.  When the setter is called with a new value, the property backing field is updated and then the event is raised to inform observers that the value has changed.

The _History_ property is the list of previous converted values.  It is backed by an _ObservableCollection_, which essentially does everything for us.  Whenever we add something to it, the View is notified, so it can update.

The final property is _ConvertTextCommand_.  This returns an _ICommand_ using our _DelegateCommand_ class from our framework.  This can be bound to such things as buttons and key presses in the View.  We've hooked it up to call our _ConvertText_ method when executed.  This method uses our _TextConverter_ field (which we've set up to convert text to uppercase) and then adds the converted value to the history list.  Finally, it clears the value of _SomeText_ (which will, of course, notify the View).  One last thing to note is that _History_ is going to be bound to a _ListBox_, which can do strange things when selecting an item where there are duplicates.  This is the reason for not adding duplicate strings to the history here.

_[Update 2016-09-23: added handling for the case when_ SomeText _is null; which would crash the application. Thanks to [ajeebkp23](https://github.com/MarkWithall/worlds-simplest-csharp-wpf-mvvm-example/issues/1) for pointing this out.]_

That's all of the coding out of the way with, now we can move on to 'drawing' the UI.

## The View

The nice thing about WPF for me is that we can define the entire user interface in XML, without having to write a single line of code.  We just need to bind widgets to the ViewModel to read and write data.

```xml
<UserControl ...>

    <UserControl.InputBindings>
        <KeyBinding Key="Enter" Command="{Binding ConvertTextCommand}"/>
    </UserControl.InputBindings>
    
    <StackPanel Height="336">
        <Label Foreground="Blue" Margin="5,5,5,0">Text To Convert</Label>
        <TextBox Text="{Binding SomeText, UpdateSourceTrigger=PropertyChanged}" Margin="5"/>
        <Label Foreground="Blue" Margin="5,5,5,0">History</Label>
        <ListBox ItemsSource="{Binding History}" Height="200" Margin="5"/>
        <Button Command="{Binding ConvertTextCommand}" Margin="5">Convert</Button>
    </StackPanel>
    
</UserControl>
```

As you can see above, widgets such as labels and textboxes are just XML elements.  The _Text_ attribute of the _TextBox_ has been bound to _SomeText_ in our presenter and the _ItemsSource_ attribute of the _ListBox_ has been bound to _History_.  Notice that the _ConvertTextCommand_ property has been bound to two things, the _KeyBinding_ and the _Button_.  We needn't have stopped there.  We could have bound it to an item in a menu too.  In fact, we can bind anything as many times as we like, allowing us to have several different ways of displaying the same data.  We could, for example, have a list of numbers in our ViewModel that is bound both to a table of data and to a chart.

Before we move on to the definition of the _Window_ that the _UserControl_ sits in, I want to take a quick look at the code behind for this control.

```c#
public partial class ConverterControl
{
    public ConverterControl()
    {
        InitializeComponent();
    }
}
```

Notice that there is absolutely nothing superfluous in it whatsoever.  There's no code to read and write the text in the textbox; no event handlers to process button clicks. Everything is done through binding to the ViewModel.  You literally can't have less code in the _.xaml.cs_ file.  This makes our application much easier to write tests for.

Our final piece of UI description is the main window.

```xml
<Window ...
        Title="Converter"
        MinWidth="300"
        ResizeMode="NoResize"
        SizeToContent="WidthAndHeight">
    
    <Window.DataContext>
        <ViewModel:Presenter/>
    </Window.DataContext>
    
    <View:ConverterControl/>
    
</Window>
```

This has two points of interest.  Firstly, we are specifying that the context for the Window is an instance of the _Presenter_ class in our ViewModel (which will be created for us when the window is created).  Secondly, we are specifying that the UI is made up of a _ConverterControl_ that we defined above, which will inherit that data context.

And that is basically it.  All together around 35 real lines of C# code and about 18 lines of XAML.

The full code is available on [github](https://github.com/MarkWithall/worlds-simplest-csharp-wpf-mvvm-example).

