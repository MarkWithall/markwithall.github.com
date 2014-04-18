---
layout: post
title: Save All Excel Worksheets As Tab Separated Text
categories: programming
extra_styles: syntax.css
---
Quite often I have to save worksheets in Excel as tab-separated text or CSV.  I have managed to get it down to 8 clicks to perform this task for a single worksheet.  At the point I had to do this for 40 spreadsheets with 4 worksheets in each, I decided that enough was enough.

I started off by writing a simple macro that saved all the worksheets in the active workbook to the desktop.  I then placed it in my PERSONAL.XLSB (which is an incredibly useful place to put macros that you want to use on multiple spreadsheets as it’s always there; hidden in the background).

{% highlight vb.net %}
Sub SaveAllAsTsv()

    Dim WS As Excel.Worksheet
    Dim SaveToDirectory As String
    Dim filename As String

    SaveToDirectory = CreateObject("WScript.Shell").specialfolders("Desktop")

    For Each WS In ActiveWorkbook.Worksheets
        filename = SaveToDirectory & "\" & WS.Name & ".txt"
        WS.SaveAs filename, xlText, Local:=True
    Next

End Sub
{% endhighlight %}

One interesting point to note is the `Local:=True` argument to the SaveAs method.  This makes sure that the formatting of, e.g. dates, is exported as it is presented in the worksheet rather than using whatever default the SaveAs method decides upon.

This approach worked fine for a while but then I started to have spreadsheets with far more worksheets than I actually wanted to export.  Copying them from the desktop was a bit of a pain too.  I, therefore, went back to the macro and expanded upon it to allow selection of the destination folder and the option whether to save each worksheet.

{% highlight vb.net %}
Sub SaveAllAsTsv()

    Dim WS As Excel.Worksheet
    Dim SaveToDirectory As String
    Dim Filename As String

    'Get folder to save to
    With Application.fileDialog(msoFileDialogFolderPicker)
        .Title = "Output Folder"
        .AllowMultiSelect = False
        If .Show <> -1 Then Exit Sub
        SaveToDirectory = .SelectedItems(1)
    End With

    'Choose which worksheets to save
    For Each WS In ActiveWorkbook.Worksheets
        Select Case MsgBox("Save " & WS.Name & "?", vbQuestion + vbYesNoCancel)
            Case vbYes
                Filename = SaveToDirectory & "\" & WS.Name & ".txt"
                WS.SaveAs Filename, xlTextWindows, Local:=True
            Case vbCancel
                Exit Sub
            Case vbNo
        End Select
    Next

End Sub
{% endhighlight %}

This works fine for now.  I imagine that at some point I’m going to get annoyed with clicking ‘Yes’ or ‘No’ for each worksheet and will have to upgrade to a single list of all worksheets with checkboxes up front.  I’ll leave this extension as an exercise for the reader.
