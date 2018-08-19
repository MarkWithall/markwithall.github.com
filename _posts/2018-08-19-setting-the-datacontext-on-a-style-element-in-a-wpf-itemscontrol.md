---
layout: post
title: Setting The DataContext On A Style Element In A WPF ItemsControl
description: How to set the datacontext on a style element, given that the standard way doesn't work.
categories: programming
extra_styles: syntax.css
---

A short post, mostly just to remind myself how to do this when I forget.

If we have the following style in, for example, a `DataGrid`:

```xml
<Style TargetType="DataGridRow">
    <Setter Property="Background" Value="Green" />
    <Style.Triggers>
        <DataTrigger Binding="{Binding IsBlue}" Value="True">
            <Setter Property="Background" Value="Blue" />
        </DataTrigger>
    </Style.Triggers>
</Style>
```

We get the following error message: `Cannot resolve property "IsBlue" in data context of type '...'` where `...` is the type of the data context for the `DataGrid` rather than the data context for the row item.

To remove the error, we need to set the data context for the style. What we'd like to be able to do is:

```xml
<Style TargetType="DataGridRow" d:DataContext="{d:DesignInstance ViewModels:ItemPresenter}">
    <Setter Property="Background" Value="Green" />
    <Style.Triggers>
        <DataTrigger Binding="{Binding IsBlue}" Value="True">
            <Setter Property="Background" Value="Blue" />
        </DataTrigger>
    </Style.Triggers>
</Style>
```

Unfortunately, this gives the error message: `The property "DataContext" does not exist in the "http://schemas.microsoft.com/expression/blend/2008" namespace.`

What actually needs to be done is:

```xml
<Style TargetType="DataGridRow">
    <d:Style.DataContext>
        <x:Type Type="ViewModels:ItemPresenter" />
    </d:Style.DataContext>

    <Setter Property="Background" Value="Green" />
    <Style.Triggers>
        <DataTrigger Binding="{Binding IsBlue}" Value="True">
            <Setter Property="Background" Value="Blue" />
        </DataTrigger>
    </Style.Triggers>
</Style>
```

More verbose but actually works.
