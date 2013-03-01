---
layout: default
title: Programming
permalink: /programming/
---
Posts
--
{% for post in site.categories.programming %}
* {{ post.date | date: "%Y-%m-%d" }} - [{{post.title}}]({{post.url}})
{% endfor %}

