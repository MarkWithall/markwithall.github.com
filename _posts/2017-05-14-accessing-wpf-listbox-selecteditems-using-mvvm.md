---
layout: post
title: Accessing WPF ListBox SelectedItems using MVVM
categories: programming
extra_styles: syntax.css
---

A common problem that people face using the Model-View-ViewModel (MVVM) pattern is handling multiple selected items in a `ListBox` with extended selection mode turned on.

Let's have a look at an example.

## The ViewModel

We have a list of items in an `ObservableCollection` (so that the _View_ updates if we modify the content of the collection). We also have a placeholder for some command that will operate on the selected items.

```c#
public class MainPresenter : Presenter
{
    public ObservableCollection<ItemPresenter> Items { get; }
        = new ObservableCollection<ItemPresenter>
    {
        new ItemPresenter("A"),
        new ItemPresenter("B"),
        new ItemPresenter("C"),
        new ItemPresenter("D")
    };

    public ICommand DoStuffCommand => new Command(param => { … });
}
```

For this example, each item is just a wrapped string. The item itself looks like this.

```c#
public class ItemPresenter : Presenter
{
    private readonly string _value;

    public ItemPresenter(string value)
    {
        _value = value;
    }

    public override string ToString()
    {
        return _value;
    }
}
```

## The View

The basic _View_ is a `ListBox`, with the selection mode set to extended (so we can select multiple items using ctrl/shift click or the keyboard equivalents). We also have a button that we'd like to perform an action on the selected items.

```xml
<ListBox ItemsSource="{Binding Items}" SelectionMode="Extended" />
<Button Command="{Binding DoStuffCommand}">Do Stuff</Button>
```

## The MVVM Framework

For completeness, here is the implementation of a basic _ViewModel_ base class and a simple `ICommand` implementation.

```c#
public abstract class Presenter : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    protected void RaisePropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

```c#
public class Command : ICommand
{
    private readonly Action<object> _action;

    public event EventHandler CanExecuteChanged { add { } remove { } }

    public Command(Action<object> action)
    {
        _action = action;
    }

    public bool CanExecute(object parameter) => true;

    public void Execute(object parameter)
    {
        _action?.Invoke(parameter);
    }
}
```

## How We'd Like To Do It

In an ideal world, we'd like to bind an `ObservableCollection` directly to the `SelectedItems` property of the `ListBox`. Alas, this is not currently possible.

In `MainPresenter`:

```c#
public ObservableCollection<ItemPresenter> SelectedItems { get; }
    = new ObservableCollection<ItemPresenter>();
```

In `MainWindow.xaml`:

```xml
<ListBox ItemsSource="{Binding Items}"
         SelectionMode="Extended"
         SelectedItems="{Binding SelectedItems}" />
```

## One-way To Presenter

If we only care about setting the selected items from the _View_ and operating on it when a command it executed, we can do this relatively simply.

First we need to give the `ListBox` a name.

```xml
<ListBox x:Name="ListBox" ItemsSource="{Binding Items}" SelectionMode="Extended" />
```

And then we can add a command parameter that points at the `ListBox` `SelectedItems` property. The property is an `IList` (non-generic) containing `ItemPresenter` references.

```xml
<Button Command="{Binding DoStuffCommand}"
        CommandParameter="{Binding ElementName=ListBox, Path=SelectedItems}">Do Stuff</Button>
```

Now our command will receive the list of selected `ItemPresenter` objects as a parameter and we can do as we wish with them.

## Two-way Binding

If we want two-way binding, things get a little more messy.

Firstly, we need to add a property to `ItemPresenter` to store the selected state of the item.

```c#
private bool _isSelected;
public bool IsSelected
{
    get { return _isSelected; }
    set
    {
        _isSelected = value;
        RaisePropertyChanged();
    }
}
```

And then we have to find a way of binding that property to the _View_. The easiest way to do this is to create a style for a `ListBoxItem` and bind the `IsSelected` property there.

```xml
<ListBox ItemsSource="{Binding Items}" SelectionMode="Extended">
    <ListBox.ItemContainerStyle>
        <Style TargetType="ListBoxItem">
            <Setter Property="IsSelected" Value="{Binding IsSelected}" />
        </Style>
    </ListBox.ItemContainerStyle>
</ListBox>
```

Now we can set the selected items from the _ViewModel_ as well as from the View.

When we execute the command, we can access the selected items using a short LINQ query:

```c#
Items.Where(i => i.IsSelected);
```

## Update

[David Hewson](https://twitter.com/TaiShaBi) has kindly pointed out that this two-way binding workaround doesn't play nicely with virtualization of the `ListBox`.

There are two options available here. Firstly, we could disable virtualization on the `ListBox`.

```xml
<ListBox VirtualizingStackPanel.IsVirtualizing="False" ... />
```

This is fine, as long as we aren't expecting the list of items to grow too large.

A second, more extreme workaround is to override the 'select all' command for the `ListBox` and set the selected items via the _ViewModel_. This involves intercepting Ctrl+A and calling a command on the _ViewModel_.

```c#
public ICommand SelectAllCommand => new Command(_ =>
{
    foreach (var item in Items)
    {
        item.IsSelected = true;
    }
});
```

```xml
<ListBox.InputBindings>
    <KeyBinding Gesture="Ctrl+A" Command="{Binding SelectAllCommand}" />
</ListBox.InputBindings>
```
