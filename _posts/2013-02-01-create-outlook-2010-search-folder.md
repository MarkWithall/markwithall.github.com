---
layout: post
title: Create an Outlook 2010 Search Folder using VBA
categories: programming
extra_styles: syntax.css
---
Earlier this week I discovered that Microsoft Outlook 2010 (and most likely other versions too) isn't very good anything beyond very, very simple searches.  This is even more true of searches used to create Search Folders (which appear to have more limitations on them than the Search box, for no apparent reason).  I, therefore, set about learning VBA, so that I could have more control over the creation of Search Folders.

In this particular case I was wanting to create a Search Folder containing all emails that weren't from one of my company's domains.  This turned out to be surprisingly difficult; as many emails only display the name of the sender and not their address.  The search only appears to search the displayed string, rather than the actual sender address.  This made me sad.

Starting from the top and working our way down, the most difficult part of the exercise was the creation of the filter string.  These are rather SQL-looking beasts.  It turned out that looking at the sender email address is a rather convoluted task that involves comparing the value of "http://schemas.microsoft.com/mapi/proptag/0x0C1F001F" with the string you are interested in.  I’ve absolutely no idea why, as most of the other email header fields have far more sensible names.  Inventing a CreateSearchFolder method that takes the parameters of the Store name, the path of the folder to search in, the filter and the name of the Search Folder to create; we end up with the following:

{% highlight vb %}
Sub AddNotInternalSearchFolder()
    Const PR_SENDER_EMAIL_ADDRESS_W As String
        = "http://schemas.microsoft.com/mapi/proptag/0x0C1F001F"
    
    Dim filter As String
    filter = "NOT (" & PR_SENDER_EMAIL_ADDRESS_W & " LIKE '%@markwithall.com%')" & _
             "AND NOT (" & PR_SENDER_EMAIL_ADDRESS_W & " LIKE '%@markwithall.co.uk%')"
    
    Call CreateSearchFolder("MarkWithall", "'\MarkWithall\Inbox'", filter, "Not Internal")
End Sub
{% endhighlight %}

The method to create a Search Folder is then quite straightforward; remembering, of course, to check that the folder we are creating doesn't already exist.  It's just a simple case of calling the AdvancedSearch method of Application, with the data we just passed, to create a search object and then saving it to the relevant name.

{% highlight vb %}
Sub CreateSearchFolder(storeName As String,
                       folderPath As String,
                       filter As String,
                       folderToCreate As String)
    If SearchFolderExists(storeName, folderToCreate) Then
        MsgBox "Search folder '" & folderToCreate & "' already exists"
    Else
        Dim objSearch As Search
        Set objSearch = Application.AdvancedSearch(folderPath,
                                                   filter,
                                                   True,
                                                   "SearchFolder")
        objSearch.Save (folderToCreate)
        MsgBox "Done!"
    End If
End Sub
{% endhighlight %}

Finally, we just need to implement the check that the Search Folder doesn't already exist.  This just involves looping through the list of Search Folders and checking that none of them have the name we've provided.

{% highlight vb %}
Function SearchFolderExists(storeName As String, folderName As String)
    SearchFolderExists = False
    For Each store In Application.Session.Stores.Item(storeName).GetSearchFolders()
        If store.Name = folderName Then
            SearchFolderExists = True
        End If
    Next
End Function
{% endhighlight %}

And that's it.  Now, in the future, if we require any other complicated Search Folders, it's just a case of modifying the filter string and providing a new name.

The end!  It's a mini adventure.
