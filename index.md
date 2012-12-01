---
permalink: /
layout: default
title: Mark Withall
---

Hello and welcome to my website.  My name is Mark (see above).  I'm a software engineer by day and, well, quite often a software engineer by night too really.  But I also write novels, record music, play darts and poker, travel the world, watch films, read and do all sorts of other things that I can't think of at the moment.  Below is a list of my blog posts with my thoughts on various idiosyncratic corners of the world.  Enjoy.

Posts
--

{% for post in site.posts %}
* {{post.date | date: "%Y-%m-%d"}} - [{{post.title}}]({{post.url}}) ({{post.categories}})
{% endfor %}

