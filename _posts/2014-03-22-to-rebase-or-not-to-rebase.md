---
layout: post
title: To Rebase Or Not To Rebase?
categories: programming
---
Some thoughts on the relative merits of rebasing a branch before merging when working with a DVCS like Mercurial or Git.

## Merge

![](/images/merge.png)

### Pros
* Simple to perform
* Maintains the original context of the source branch
* Easy to find points where merge conflict resolution failed

###Cons
* Can’t bisect to find cause of bugs (requires linear history)

  - Non-linear histories mean that working and non-working versions can be interleaved making it unlikely that bisect will end up at the revision that caused the bug
* Difficult to read the history

##Rebase

![](/images/rebase.png)

Rebase means different things to different people.  Let me start by clarifying what I mean.  This is best done with a picture (see above).  When I say rebase, I mean moving the whole branch to the top of the tree without moving all changesets onto the default branch or flattening into a single changeset (two common alternative meanings, particularly in the Git world).  This means that we lose the minimum of information.

### Pros
* Can easily track down cause of bugs using bisect
* Simple to read history with clearly defined tasks

### Cons
* Hard to find where merge conflict resolution failed
  - But can partly be done by reordering the changesets by time
  - Or better, if there is a conflict, rebase using the patch queue and name the commits that resolve conflicts explicitly
  - This is less of an issue if you have good test coverage
* Can only be done with local changesets (i.e. before pull or push); hence can prevent collaboration on a branch

Personally, I tend to favour the rebase approach as I’m somewhat OCD about having a pretty looking graph of the history.

