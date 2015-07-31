---
layout: post
title: Blurry Rotated Text In WPF
categories: programming
extra_styles: syntax.css
---
Just a short little post today, as I’m going to forget this if I don’t write it down somewhere.

Sometimes when you transform text in WPF it ends up rendering blurred at runtime.  Annoyingly, it will quite often appear fine in Visual Studio’s designer.  Take, for example, the following expander header.

{% highlight xml %}
<Expander.Header>
    <TextBlock Text="Running Dates">
        <TextBlock.LayoutTransform>
            <RotateTransform Angle="-90"/>
        </TextBlock.LayoutTransform>
    </TextBlock>
</Expander.Header>
{% endhighlight %}

It looks fine in the designer

![](/images/blurry_designer.png)

but at runtime it goes blurry

![](/images/blurry_blurry.png)

Adding [`TextOptions.TextFormattingMode`](https://msdn.microsoft.com/en-us/library/system.windows.media.textoptions.textformattingmode(v=vs.100).aspx)`="`[`Display`](https://msdn.microsoft.com/en-us/library/system.windows.media.textformattingmode(v=vs.100).aspx)`"` to the `TextBlock` fixes this by using GDI-compatible font metrics.

{% highlight xml %}
<Expander.Header>
    <TextBlock Text="Running Dates" TextOptions.TextFormattingMode="Display">
        <TextBlock.LayoutTransform>
            <RotateTransform Angle="-90"/>
        </TextBlock.LayoutTransform>
    </TextBlock>
</Expander.Header>
{% endhighlight %}

Now it looks much better at runtime.

![](/images/blurry_fixed.png)

It’s also worth looking at `SnapsToDevicePixels` and `UseLayoutRounding` for similar issues that don’t involve text.

