---
layout: post
title: Labelled TextBox In WPF
categories: programming
extra_styles: syntax.css
---
As is so often is the case, StackOverflow has provided another [interesting question](http://stackoverflow.com/q/23389148/1245027) that reminded me of an issue I encounter from time to time.  The question is about how to have a sequence of labelled textboxes, such that everything is nicely aligned.  The question references [an answer](http://stackoverflow.com/a/1015418/1245027) that the OP doesn’t like as it potentially adds some performance overhead.  I don’t think that any overhead in that solution is likely to be an issue in practice though.

I’d like to walk through a thought process that might get you to something similar to the referenced answer.

## The Basic Approach

Firstly, let’s look at how one might approach this problem in a ‘one off’ case; where reuse isn’t an issue.

{% highlight c# %}
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="Auto"/>
        <ColumnDefinition Width="*"/>
    </Grid.ColumnDefinitions>

    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="Auto"/>
    </Grid.RowDefinitions>

    <TextBlock Grid.Row="0" Grid.Column="0">Thing1</TextBlock>
    <TextBox Grid.Row="0" Grid.Column="1" Text="{Binding Thing1}"/>

    <TextBlock Grid.Row="1" Grid.Column="0">Thing2</TextBlock>
    <TextBox Grid.Row="1" Grid.Column="1" Text="{Binding Thing2}"/>

    <TextBlock Grid.Row="2" Grid.Column="0">Thing3</TextBlock>
    <TextBox Grid.Row="2" Grid.Column="1" Text="{Binding Thing3}"/>
</Grid>
{% endhighlight %}

This is clearly quite a verbose solution and there must be a better way if we are going to be doing this sort of thing a lot.  And we are.  Another annoyance with this approach is the need to renumber everything if we want to insert a row or column.  It would be nice to have something more akin to HTML tables.

## What Would We Like To Write?

Before we try and solve the problem, it might be a good idea to think in the abstract of what we would like to be able to write in an ideal world.  It’s probably going to look something along the lines of this:

{% highlight c# %}
<LayoutGroup>
    <LabelledTextBox Label="Thing1" Text="{Binding Thing1}"/>
    <LabelledTextBox Label="Thing2" Text="{Binding Thing2}"/>
    <LabelledTextBox Label="Thing3" Text="{Binding Thing3}"/>
</LayoutGroup>
{% endhighlight %}

It would be difficult to get more concise than that and still retain the expressiveness of what we want to do.

## How Near Can We Get To This?

So how are we going to go about this?  Let us start at the bottom and look at how we could create a ‘LabelledTextBox’ control.  The XAML is pretty straightforward, and is similar to what we started with above but we’ve now added a `SharedSizeGroup` to allow things to line up properly (assuming we are nested in something with `Grid.IsSharedSizeScope` set to `True`).

## LabelledTextBox.xaml

{% highlight c# %}
<Grid x:Name="Root">
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="Auto" SharedSizeGroup="Labels"/>
        <ColumnDefinition Width="*"/>
    </Grid.ColumnDefinitions>

    <TextBlock Grid.Column="0" Text="{Binding Label}"/>
    <TextBox Grid.Column="1" Text="{Binding Text}"/>
</Grid>
{% endhighlight %}

## LabelledTextBox.xaml.cs

That’s all well and good but where are we getting these `Label` and `Text` properties to bind to?  Here we need to introduce some Dependency Properties.  This allows the user of the `LabelledTextBox` to bind to `Label` and `Text` and for the control to use them too.  Note that we have to set the `DataContext` of the `Grid` to the control, so that we can bind to our own `Label` and `Text` properties but we leave the top-level `DataContext` of the control in the broader context, so that other things can bind to our `Label` and `Text` properties too.

{% highlight c# %}
public partial class LabelledTextBox
{
    public static readonly DependencyProperty LabelProperty = DependencyProperty
        .Register("Label",
                typeof (string),
                typeof (LabelledTextBox),
                new FrameworkPropertyMetadata("Unnamed Label"));

    public static readonly DependencyProperty TextProperty = DependencyProperty
        .Register("Text",
                typeof (string),
                typeof (LabelledTextBox),
                new FrameworkPropertyMetadata("", FrameworkPropertyMetadataOptions.BindsTwoWayByDefault));

    public LabelledTextBox()
    {
        InitializeComponent();
        Root.DataContext = this;
    }

    public string Label
    {
        get { return (string)GetValue(LabelProperty); }
        set { SetValue(LabelProperty, value); }
    }

    public string Text
    {
        get { return (string)GetValue(TextProperty); }
        set { SetValue(TextProperty, value); }
    }
}
{% endhighlight %}

## LayoutGroup.cs

Finally, we need to create a container control that has shared size scope.  We can doing this by creating a subclass of `StackPanel` and then setting `Grid.IsSharedSizeScope` to `True`.

{% highlight c# %}
public class LayoutGroup : StackPanel
{
    public LayoutGroup()
    {
        Grid.SetIsSharedSizeScope(this, true);
    }
}
{% endhighlight %}

## Usage

This gives us the ability to put it all together in the following way that is very similar to our initial desired solution (with the exception of references to the namespace path of the controls).

{% highlight c# %}
<Views:LayoutGroup>
    <Views:LabelledTextBox Label="Thing1" Text="{Binding Thing1}"/>
    <Views:LabelledTextBox Label="Thing2" Text="{Binding Thing2}"/>
    <Views:LabelledTextBox Label="Thing3" Text="{Binding Thing3}"/>
</Views:LayoutGroup>
{% endhighlight %}

One could, of course, go a step further and have a `Command` property that allows a button to be shown, e.g. for the purpose of selecting files.  And even have the button hidden if no command is bound to it.  I’ll leave this and the many other possible extensions as an exercise for the reader.

