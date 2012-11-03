---
layout: default
title: Miscellaneous
permalink: /misc/
---
Posts
--
{% for post in site.categories.misc %}
* {{ post.date | date: "%Y-%m-%d" }} - [{{post.title}}]({{post.url}})
{% endfor %}

