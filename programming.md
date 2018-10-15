---
layout: default
title: Programming
permalink: /programming/
---
{% for post in site.categories.programming %}
    {% capture currentyear %}{{post.date | date: "%Y"}}{% endcapture %}
        {% if currentyear != year %}
## {{ currentyear }}
        {% capture year %}{{currentyear}}{% endcapture %}
    {% endif %}
* [{{post.title}}]({{post.url}})
{% endfor %}

